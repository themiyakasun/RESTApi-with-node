import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ firstName: '', lastName: '', age: '' });
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
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const submitUser = (e) => {
    e.preventDefault();
    fetch(`/users/${id}`, {
      method: 'PATCH',
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
          name='firstName'
          value={user.firstName}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={user.lastName}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Age'
          name='age'
          value={user.age}
          onChange={handleInputChange}
        />
        <button type='submit'>Edit User</button>
      </form>
    </div>
  );
};

export default EditUser;
