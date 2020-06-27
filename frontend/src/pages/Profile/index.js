import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const ngoName = localStorage.getItem('ngoName')
  const ngoId = localStorage.getItem('ngoId')

  const history = useHistory()

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ngoId,
        },
      })
      .then((response) => {
        setIncidents(response.data)
      })
  }, [ngoId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId,
        },
      })
      setIncidents(incidents.filter((incident) => incident.id !== id))
    } catch (err) {
      alert('Error, please try again')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Welcome, {ngoName}</span>
        <Link className='button' to='/incidents/new'>
          New incident
        </Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>

      <h1>Reported incidents</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>INCIDENT:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIPTION:</strong>
            <p>{incident.description}</p>

            <strong>VALUE:</strong>
            <p>
              {Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'EUR',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type='button'
            >
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
