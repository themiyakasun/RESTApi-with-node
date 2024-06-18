import React, { useState } from 'react';

const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');

  const handleInputChange = (e, setter) => setter(e.target.value);

  const validateInputs = () => {
    if (!firstName || !lastName || !age) {
      alert('All fields are required');
      return false;
    }
    if (isNaN(age) || age <= 0) {
      alert('Age must be a number');
      return false;
    }
    return true;
  };

  const submitUser = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      const userData = {
        firstName,
        lastName,
        age: parseInt(age, 10),
      };

      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to add user');
          }
        })
        .then((data) => {
          console.log(data);
          alert('User added successfully');
        })
        .catch((err) => {
          console.log(err);
          alert('Failed to add user');
        });
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      AddUser
      <form onSubmit={submitUser}>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => handleInputChange(e, setFirstName)}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => handleInputChange(e, setLastName)}
        />
        <input
          type='text'
          placeholder='Age'
          value={age}
          onChange={(e) => handleInputChange(e, setAge)}
        />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
