import React, { useState, useEffect } from 'react';
// import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend (mock data for now)
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'hotel_admin', status: 'pending' },
      { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'hotel_admin', status: 'approved' },
    ];
    setUsers(mockUsers);
  }, []);

  // Approve a hotel admin
  const approveHotelAdmin = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: 'approved' } : user
      )
    );
    alert(`User ${userId} approved as Hotel Admin.`);
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                {user.role === 'hotel_admin' && user.status === 'pending' && (
                  <button onClick={() => approveHotelAdmin(user.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;