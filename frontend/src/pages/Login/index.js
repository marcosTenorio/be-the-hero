import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

import api from '../../services/api'

import './styles.css'

export default function Login() {
  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', { id })

      localStorage.setItem('ngoId', id)
      localStorage.setItem('ngoName', response.data.name)

      history.push('/profile')
    } catch (err) {
      alert('Error, please try again')
    }
  }

  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <input
            placeholder='Your ID'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className='button' type='submit'>
            Go
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Sign up
          </Link>
        </form>
      </section>

      <img src={herosImg} alt='Heroes' />
    </div>
  )
}
