import './App.css';
import MenuItemDetail from './components/MenuItemDetail';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from './utils/users_service';

function App() {

  const [user, setUser] = useState(getUser())
  
  function login(user) {
    console.log(user)
    setUser(user)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }


  return (
    <div className="App">
      <nav>
        {user ? 
          <>
          <Link to="/">Home</Link>
          <span>Logged in as {user.email}</span>
          <button onClick={logout} >Logout</button>
          </> : 
          <>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link> 
          </>
        }
      </nav>

      <header>
        <h1>Happy TeaTime App</h1>
      </header> 

      
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/menuItems/:id" element={<MenuItemDetail />}/>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
      </Routes>
      
    </div>
  );
}


export default App;
