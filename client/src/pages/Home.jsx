import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../styles/style.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

import headerImage from '../assets/images/header4.png';
import donateImage from '../assets/images/donate-image.png';

const StatCard = ({ icon, end, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div className="stat-card" ref={ref}>
      <i className={`fas ${icon} fa-3x`}></i>
      <h3>{inView ? <CountUp end={end} duration={2} /> : '0'}+</h3>
      <p>{label}</p>
    </div>
  );
};

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <img src={headerImage} alt="Donate Blood, Save Lives banner" />
        </div>
        <div className="hero-buttons">
          {/* Updated Buttons */}
          <Link to="/register" className="btn">
            Become a Donor
          </Link>
          <Link to="/request" className="btn alt">
            Need Blood?
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>What You Can Do</h2>
          <div className="feature-cards">
            <div className="card">
              <i className="fas fa-user-plus fa-2x"></i>
              <h3>Register as a Donor</h3>
              <p>Fill out a simple form to become a lifesaving donor and track your donations.</p>
            </div>
            <div className="card">
              <i className="fas fa-hand-holding-medical fa-2x"></i>
              <h3>Request Blood</h3>
              <p>Need blood urgently? Request online and our network will respond immediately.</p>
            </div>
            <div className="card">
              <i className="fas fa-tint fa-2x"></i>
              <h3>View Blood Availability</h3>
              <p>Check real-time availability of blood types across partner hospitals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-cards">
            <StatCard icon="fa-users" end={1000} label="Donors Registered" />
            <StatCard icon="fa-heartbeat" end={750} label="Lives Saved" />
            <StatCard icon="fa-hand-holding-heart" end={500} label="Blood Donations" />
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="why-donate">
        <div className="container">
          <div className="why-donate-content">
            <div className="text-content">
              <h3>Why Should I Donate Blood?</h3>
              <p>
                Blood is the most precious gift that anyone can give to another person — the gift of life. A decision to
                donate your blood can save a life, or even several if your blood is separated into its components — red
                cells, platelets, and plasma — which can be used individually for patients with specific conditions.
                Safe blood saves lives and improves health. Blood transfusion is needed for:
              </p>
              <ul>
                <li>
                  Women with complications of pregnancy, such as ectopic pregnancies and hemorrhage before, during, or
                  after childbirth.
                </li>
                <li>Children with severe anemia often resulting from malaria or malnutrition.</li>
                <li>People with severe trauma following man-made and natural disasters.</li>
                <li>Many complex medical and surgical procedures and cancer patients.</li>
              </ul>
              <p>
                It is also needed for regular transfusions for people with conditions such as thalassemia and sickle
                cell disease and is used to make products such as clotting factors for people with hemophilia. There is
                a constant need for regular blood supply because blood can be stored for only a limited time before use.
                Regular blood donations by a sufficient number of healthy people are needed to ensure that safe blood
                will be available whenever and wherever it is needed.
              </p>
            </div>
            <div className="image-content">
              <img src={donateImage} alt="Why donate blood" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What People Are Saying</h2>
          <div className="testimonial-cards">
            <div className="card">
              <p>"Thanks to the blood donors, I recovered from a life-threatening surgery!"</p>
              <h4>- John Doe</h4>
            </div>
            <div className="card">
              <p>"My child received a life-saving transfusion. Thank you!"</p>
              <h4>- Sarah Smith</h4>
            </div>
            <div className="card">
              <p>"Donating blood is the best way to give back to the community."</p>
              <h4>- Michael Brown</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Blood Donation Management System. Designed by Adan Misbah Mohamud</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;