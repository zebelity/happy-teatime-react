import axios from "axios"
import { useState } from "react"
import "./LoginPage.css"

export default function LoginPage({ onLogin }) {

  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    axios.post('/api/login', formData)
      .then(res => {
        const { token, user } = res.data
    
        //store it in local storage
        localStorage.setItem("token", token)
        localStorage.setItem('username', user.username)
        
        onLogin(user)
      })
      .catch(err => {
        console.log(err.response.data)
        setError(err.response.data.message)
      })
  }

  return (
    <section className="login-page">
      <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}
      
      <form className="login-form" onSubmit={handleSubmit} action="">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="text" name="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name="password" id="password"/>
      
        <button type="submit">Login</button>
      </form>
    </section>
  )
}