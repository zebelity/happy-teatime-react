import axios from "axios"
import { useState } from "react"


export default function LoginPage({ onLogin }) {

  const [formData, setFormData] = useState({
    email:'',
    password: ''
  })

  const [error, setError] = useState('')

  function handleChange(e) {
    //console.log(e.target.name) to know which one we work on and use [] cause it's dynamic
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
    axios.post('/api/login', formData)
      .then(res => {
        let token = res.data
        console.log(token)
        //store it in local storage
        localStorage.setItem
        ("token", token)
        
        onLogin(formData)
      })
    .catch(err => {
      console.log(err.response.data)
      setError(err.response.data.message)
    })
  }

  return (
    <section className="login-page">
      <h1>Login</h1>

        {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} action="">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="text" name="email" id="email"/>

        <label htmlFor="password">Password</label>
        <input onChange={handleChange} type="password" name="password" id="password"/>
      
        <button type="submit">Login</button>
      </form>
    </section>
  )
}