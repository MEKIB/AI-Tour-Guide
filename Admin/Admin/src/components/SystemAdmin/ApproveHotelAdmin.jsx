import React, { useState, useEffect } from 'react';
// import './ApproveHotelAdmin.css';

const ApproveHotelAdmin = () => {
  const [pendingHotelAdmins, setPendingHotelAdmins] = useState([]);

  // Fetch pending Hotel Admins from the backend (mock data for now)
  useEffect(() => {
    const mockPendingHotelAdmins = [
      { id: 1, name: 'Hotel Admin A', email: 'hoteladminA@example.com', hotelName: 'Hotel A' },
      { id: 2, name: 'Hotel Admin B', email: 'hoteladminB@example.com', hotelName: 'Hotel B' },
    ];
    setPendingHotelAdmins(mockPendingHotelAdmins);
  }, []);

  // Approve a Hotel Admin
  const approveHotelAdmin = (userId) => {
    setPendingHotelAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => admin.id !== userId)
    );
    alert(`Hotel Admin ${userId} approved.`);
  };

  return (
    <div className="approve-hotel-admin">
      <h1>Approve Hotel Admin Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Hotel Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingHotelAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.hotelName}</td>
              <td>
                <button onClick={() => approveHotelAdmin(admin.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveHotelAdmin;