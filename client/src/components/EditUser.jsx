import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
        });
        setIsLoading(false);
      });
  });

  const handleInputChange = (e, fieldName) => {
    setUser({ ...user, [fieldName]: e.target.value });
  };
  const submitUser = (e) => {
    e.preventDefault();
    fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update user');
        }
      })
      .then(() => {
        alert('User updated successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('Failed to update user');
      });
  };
  return (
    <div style={{ margin: '20px' }}>
      EditUser
      <form onSubmit={submitUser}>
        <input
          type='text'
          placeholder='First Name'
          value={user.firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={user.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
        />
        <input
          type='text'
          placeholder='Age'
          value={user.age}
          onChange={(e) => handleInputChange(e, 'age')}
        />
        <button type='submit'>Add User</button>
      </form>
    </div>
  );
};

export default EditUser;
