import { useState } from 'react';
import { useRouter } from 'next/router';


const Login = ({users}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const router = useRouter()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }; 

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la verificación del usuario en la base de datos
    // utilizando una llamada a una API o cualquier otro método adecuado
    let checkUser = users.find(usr => usr.username === username)
    console.log(checkUser)
    // Por simplicidad, supongamos que el usuario se llama "admin" y la contraseña es "admin"
    if (checkUser != null && username === checkUser.username && password === checkUser.password) {
      // El inicio de sesión es exitoso, puedes realizar alguna acción como redirigir a otra página
      setLoginError(false);
      console.log('Inicio de sesión exitoso');
      router.push('/home')
    } else {
      // El inicio de sesión falló
      setLoginError(true);
      console.log('Inicio de sesión fallido');
    }
  };

  return (
    <div className="page-login">
      <div className="ui centered grid container">
        <div className="nine wide column">
          {loginError && (
            <div className="ui icon warning message">
              <i className="lock icon"></i>
              <div className="content">
                <div className="header">
                  Login failed!
                </div>
                <p>You might have misspelled your username or password!</p>
              </div>
            </div>
          )}
          <div className="ui fluid card">
            <div className="content">
              <form className="ui form" onSubmit={handleLogin}>
                <div className="field">
                  <label>User</label>
                  <input
                    type="text"
                    name="user"
                    placeholder="User"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="pass"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button className="ui primary labeled icon button" type="submit">
                  <i className="unlock alternate icon"></i>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {

  const res = await fetch('http://localhost:3000/api/users')
  const users = await res.json()
  console.log(users)
  
  return {
      props: {
          users
      }
  }
}

export default Login;
