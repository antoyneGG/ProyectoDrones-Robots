import { render, fireEvent, waitFor } from '@testing-library/react';
import UserFormPage from '../pages/users/new'; // Importa el componente de creación de usuario
import { useRouter } from 'next/router'

// Mockear useRouter
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({ query: {}, back: jest.fn() }), // Mockear useRouter para devolver un objeto con query vacío y back como una función vacía
}));

describe('UserFormPage Component', () => {
  it('should create a new user', async () => {
    // Mockear fetch para simular la llamada a la API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    // Renderizar el componente
    const { getByLabelText, getByRole, getByPlaceholderText} = render(<UserFormPage />);

    // Llenar el formulario con los datos del nuevo usuario
    fireEvent.change(getByPlaceholderText('Nombre de usuario'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Contrasenia'), { target: { value: 'testPassword' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });

    // Enviar el formulario
    fireEvent.click(getByRole('button', { name: 'Crear' })); 

    // Esperar a que la llamada a la API se realice
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testUser',
          password: 'testPassword',
          email: 'test@example.com',
        }),
      });
    });
  });
});
