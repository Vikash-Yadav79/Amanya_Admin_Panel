import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './SideBar.css';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <Nav className="flex-column">
        <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        <Nav.Link href="#users">Users</Nav.Link>
        <Nav.Link href="#settings">Settings</Nav.Link>
        <Nav.Link href="#reports">Reports</Nav.Link>
        <Nav.Link href="#reports">Customers</Nav.Link>
        <Nav.Link href="#reports">Reports</Nav.Link>
        <Nav.Link href="#reports">Reports</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
