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
    setUser(user)
    window.location = '/'
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    window.location = '/'
  }


  return (
    <div className="App">
      <nav>
        <div className='nav-links'>
          <Link className="nav-link" to="/">Home</Link>
          {user ? 
            <div className="user-info">
              <span className='user-email'>Logged in as {user.username}</span>
              <button className='logout-btn' onClick={logout} >Logout</button>
            </div> : 
            <Link className="nav-link" to="/login">Login</Link> 
          }
        </div>
      </nav>

      <header>
        <h1>Happy TeaTime App</h1>
      </header> 
      
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/menuItems/:id" element={<MenuItemDetail user={user} />}/>
        <Route path="/login" element={<LoginPage onLogin={login} />} />
      </Routes>
      
    </div>
  );
}


export default App;
