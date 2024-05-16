import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Importa esta extensión para habilitar expect(...).toBeInTheDocument
import '@testing-library/jest-dom'
import HomePage from '../pages/list_usr'; // Importa la página de listado de usuarios
import UserPage from '../pages/users/[username]/index'; // Importa la página de usuario individual

const mockUsers = [
  { _id: 1, username: 'user1', password: 'password1', email: 'user1@example.com' },
  { _id: 2, username: 'user2', password: 'password2', email: 'user2@example.com' },
];

// Mockear useRouter para cada página
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({ query: {username: 'user1'}, back: jest.fn() }), // Mockear useRouter para devolver un objeto con query vacío y back como una función vacía
}));

describe('HomePage', () => {
  it('renders user cards with correct information', async () => {
    const { getByText, getByRole } = render(<HomePage users={mockUsers} />);
    
    expect(getByText('user1')).toBeInTheDocument();
    expect(getByText('user2')).toBeInTheDocument();
    expect(getByText('Email: user1@example.com')).toBeInTheDocument();
    expect(getByText('Email: user2@example.com')).toBeInTheDocument();
    
    // Verifica si los botones de "Ver" y "Editar" están presentes
  });
});

describe('UserPage', () => {
  it('renders user information and allows deletion', async () => {
    const mockUser = { username: 'user1', password: 'password1', email: 'user1@example.com' };
    const { getByText, getByRole } = render(<UserPage user={mockUser} />);

    expect(getByText('user1')).toBeInTheDocument();
    expect(getByText('password1')).toBeInTheDocument();
    expect(getByText('user1@example.com')).toBeInTheDocument();

    // Verifica si el botón "Eliminar" está presente
    expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('allows deletion after confirmation', async () => {
    const mockUser = { username: 'user1', password: 'password1', email: 'user1@example.com' };
    const { getByText, getByRole } = render(<UserPage user={mockUser} />);

    // Simula hacer clic en el botón "Eliminar"
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    // Verifica si el cuadro de confirmación aparece
    expect(getByText('Are you sure to delete the User user1')).toBeInTheDocument();

    // Simula hacer clic en el botón de confirmación
    fireEvent.click(getByText('OK'));
    const consoleSpy = jest.spyOn(console, 'log');
    expect(consoleSpy).toHaveBeenCalledWith('Deleted.');
    // Espera a que se realice la eliminación y se cierre el cuadro de confirmación
    await waitFor(() => {
      expect(getByText('user1')).not.toBeInTheDocument(); // El usuario ya no debería estar en la página
    });
  });
});
