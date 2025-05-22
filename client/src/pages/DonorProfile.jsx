import React, { useState, useEffect, useRef } from 'react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const animationFrameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setName('');
    setEmail('');
    setMessage('');
    triggerEmojiExplosion();
  };

  const closeModal = () => {
    setShowModal(false);
    setEmojis([]);
    cancelAnimationFrame(animationFrameRef.current);
  };

  const triggerEmojiExplosion = () => {
    const numEmojis = 15;
    const newEmojis = Array.from({ length: numEmojis }, (_, i) => ({
      id: i,
      x: Math.random() < 0.5 ? -50 : 450, // Start from left or right
      y: Math.random() < 0.5 ? -25 : 175, // Start from top or bottom
      velocityX: (Math.random() - 0.5) * 5, // Random horizontal speed
      velocityY: (Math.random() - 0.5) * 5, // Random vertical speed
      rotation: Math.random() * 360,
    }));
    setEmojis(newEmojis);

    const animateEmojis = () => {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) => ({
          ...emoji,
          x: emoji.x + emoji.velocityX,
          y: emoji.y + emoji.velocityY,
          rotation: emoji.rotation + 2,
        }))
      );
      animationFrameRef.current = requestAnimationFrame(animateEmojis);
    };

    animationFrameRef.current = requestAnimationFrame(animateEmojis);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return (
    <div
      className="contact-container"
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '40px',
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#333',
        fontSize: '2.5rem',
        fontWeight: 'bold',
      }}>Contact Us</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
            fontSize: '1.1rem',
          }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#333',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
            fontSize: '1.1rem',
          }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#333',
              boxSizing: 'border-box',
            }}
            required
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#555',
            fontSize: '1.1rem',
          }}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#333',
              boxSizing: 'border-box',
              height: '150px',
              resize: 'vertical',
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#0056b3',
            },
          }}
        >
          Send Message
        </button>
      </form>

      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              maxWidth: '400px',
              position: 'relative',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Thank You!</h2>
            <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Your message has been received.</p>
            {emojis.map((emoji) => (
              <span
                key={emoji.id}
                style={{
                  position: 'absolute',
                  left: `${emoji.x}px`,
                  top: `${emoji.y}px`,
                  fontSize: '2rem',
                  transform: `rotate(${emoji.rotation}deg)`,
                }}
              >
                💖
              </span>
            ))}
            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;