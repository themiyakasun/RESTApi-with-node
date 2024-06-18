import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    fetch(`/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const handleEdit = (id) => {
    window.location.href = `/edit-user/${id}`;
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : users.length <= 0 ? (
        <div>No users found</div>
      ) : (
        users.map((user, index) => (
          <table border={1}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th></th>
            </tr>
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <button onClick={() => handleEdit(user._id)}>Edit</button>
              </td>
            </tr>
          </table>
        ))
      )}
    </div>
  );
};

export default Users;
