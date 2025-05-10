import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1 className="logo">Blood Donation System</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/request">Request Blood</a></li>
            <li><a href="/profile">Donor Profile</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
