import React, { useState } from 'react';

export default function Users () {
  const [username, setUsername] = useState('')
  const [isValid, setValid] = useState(true)

  function handleNameChange(ev) {
    ev.preventDefault()
    console.log('ev.target.value ', ev.target.value)
    const name = ev.target.value 
    setValid(validateUser(name))
    setUsername(name)  
  }

  function validateUser(name) { 
    return name.length > 4
  }

  function createUser() {
    if(isValid) {
      fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username
        })
      })
    }
  }


  return (
    <form>
        <label htmlFor='username'>
            <input 
                type='text' 
                value={username} 
                onChange={handleNameChange} 
            />
        </label>
        <button onClick={createUser}>Create account</button>
        { isValid ? '' : <span>At least 4 characters</span> }
    </form>
  )
}