import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [county, setCounty] = useState('')

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      county,
    }

    try {
      const response = await api.post('ngos', data)

      alert(`fsdfsdfds ${response.data.id}`)

      history.push('/')
    } catch (err) {
      alert('Error, please try again')
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />
          <h1>Register</h1>
          <p>Spread the word and help people find the cases of your NGO</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
            Log in
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="NGO's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder='Whatsapp'
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />

          <div className='input-group'>
            <input
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              placeholder='county'
              style={{ width: 110 }}
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </div>

          <button className='button' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
