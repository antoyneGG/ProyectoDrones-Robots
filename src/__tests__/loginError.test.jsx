import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useRouter } from 'next/router';
import Login from '../pages/index'; // Importa el componente de inicio de sesión

// Simula una lista de usuarios
const mockUsers = [
  { username: 'admin', password: 'admin' }, // Usuario correcto
];

// Mockear useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login Component', () => {
  it('should display error message on incorrect login', async () => {

    // Renderiza el componente
    const { getByPlaceholderText, getByRole, getByText } = render(<Login users={mockUsers} />);
    
    // Ingresa credenciales incorrectas
    fireEvent.change(getByPlaceholderText('User'), { target: { value: 'user' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'incorrect_password' } });
    
    // Realiza el inicio de sesión
    fireEvent.click(getByRole('button', { name: 'Login' }));
    
    // Espera a que se muestre el mensaje de error
    await waitFor(() => {
      expect(getByText('Login failed!')).toBeInTheDocument(); // Importa la función getByText
    });
  });

  it('should redirect to home page on successful login', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({
      push: pushMock,
    });

    // Renderiza el componente
    const { getByPlaceholderText, getByRole, getByText, queryByRole} = render(<Login users={mockUsers} />);
    
    // Ingresa credenciales correctas
    fireEvent.change(getByPlaceholderText('User'), { target: { value: 'admin' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'admin' } });
    
    const consoleSpy = jest.spyOn(console, 'log');
    // Realiza el inicio de sesión 
    fireEvent.click(getByRole('button', { name: 'Login' }));
    expect(consoleSpy).toHaveBeenCalledWith('Inicio de sesión exitoso');
    
    // Espera a que se redirija a la página de inicio
    await waitFor(() => {
      // Verifica si se encuentra algún elemento que indica que hemos sido redirigidos a la página de inicio
      expect(useRouter().push).toHaveBeenCalledWith('/home');
    });
  });
});
