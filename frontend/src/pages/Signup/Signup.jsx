import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await register(formData);
      toast.success('Account created successfully! Welcome to ShowTime.');
      navigate('/');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#08090d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 500px', gap: '40px', alignItems: 'center' }}>

        {/* Left Side Movie Collage Banner */}
        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '40px', background: 'linear-gradient(135deg, #131422 0%, #08090d 100%)', minHeight: '620px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80")', backgroundSize: 'cover', opacity: 0.15, pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: '#e50914', filter: 'blur(150px)', opacity: 0.4, pointerEvents: 'none' }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
              <div style={{ width: '28px', height: '28px', background: '#e50914', transform: 'rotate(45deg)', borderRadius: '4px' }}></div>
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>Show<span style={{ color: '#e50914' }}>Time</span></div>
                <div style={{ fontSize: '0.65rem', color: '#9ca3af', letterSpacing: '1px' }}>YOUR MOVIE EXPERIENCE</div>
              </div>
            </div>

            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#fff', lineHeight: '1.25', marginBottom: '16px' }}>
              Create Your Account.<br />Unlock VIP Movie Perks.<br /><span style={{ color: '#e50914' }}>Join ShowTime.</span>
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '420px', marginBottom: '32px' }}>
              Join millions of moviegoers, earn rewards on every ticket, and get early access to blockbusters.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🎬</span> Thousands of Movies
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🏢</span> Top Theatres Near You
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🛡️</span> Secure Bookings
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
              <span style={{ color: '#e50914' }}>⭐</span> Trusted by millions of movie lovers
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="u1" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #08090d' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="u2" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #08090d', marginLeft: '-6px' }} />
              <span style={{ background: '#e50914', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px', marginLeft: '6px' }}>5M+</span>
            </div>
          </div>
        </div>

        {/* Right Side Signup Card */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px 32px' }}>
          {/* Login / Sign Up Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
            <button onClick={() => navigate('/login')} style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', color: '#9ca3af', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </button>
            <button style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', color: '#e50914', fontSize: '1rem', fontWeight: 800, borderBottom: '2px solid #e50914', cursor: 'pointer' }}>
              Sign Up
            </button>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>Join ShowTime! 🍿</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 20px' }}>Create an account to manage bookings & rewards</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px', fontWeight: 600 }}>Confirm</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ width: '100%', marginTop: '6px', padding: '12px', borderRadius: '10px', background: '#e50914', border: 'none', color: '#fff', fontSize: '0.92rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(229,9,20,0.4)' }}
            >
              {submitting ? 'Creating Account...' : 'Sign Up ➔'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px', color: '#9ca3af', fontSize: '0.8rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e50914', textDecoration: 'none', fontWeight: 700 }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
