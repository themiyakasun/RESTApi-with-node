import React from 'react';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/users' element={<Users />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/edit-user/:id' element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
