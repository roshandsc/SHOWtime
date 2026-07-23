import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#08090d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', color: '#fff' }}>
      <div style={{ maxWidth: '1100px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 500px', gap: '40px', alignItems: 'center' }}>

        {/* Left Side Movie Collage Banner */}
        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', padding: '40px', background: 'linear-gradient(135deg, #131422 0%, #08090d 100%)', minHeight: '560px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.06)' }}>
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
              The Best Movies.<br />The Best Experience.<br /><span style={{ color: '#e50914' }}>Every Time.</span>
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '0.92rem', lineHeight: '1.6', maxWidth: '420px', marginBottom: '32px' }}>
              Book your tickets easily, enjoy exclusive offers and experience the magic of cinema.
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

        {/* Right Side Login Card */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px 32px' }}>
          {/* Login / Sign Up Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '28px' }}>
            <button style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', color: '#e50914', fontSize: '1rem', fontWeight: 800, borderBottom: '2px solid #e50914', cursor: 'pointer' }}>
              Login
            </button>
            <button onClick={() => navigate('/signup')} style={{ flex: 1, paddingBottom: '12px', background: 'none', border: 'none', color: '#9ca3af', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
              Sign Up
            </button>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', margin: '0 0 6px' }}>Welcome Back! 👋</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '0 0 24px' }}>Login to continue your movie journey</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Email or Phone Number</label>
              <input
                type="text"
                placeholder="Enter your email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', fontWeight: 600 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ accentColor: '#e50914' }} /> Remember Me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.info('Password reset link sent to your email.'); }} style={{ color: '#e50914', textDecoration: 'none', fontWeight: 600 }}>
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ width: '100%', marginTop: '8px', padding: '12px', borderRadius: '10px', background: '#e50914', border: 'none', color: '#fff', fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(229,9,20,0.4)' }}
            >
              {submitting ? 'Logging in...' : 'Login ➔'}
            </button>
          </form>

          <div style={{ textAlign: 'center', margin: '20px 0', color: '#64748b', fontSize: '0.8rem', position: 'relative' }}>
            <span>or</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button style={{ width: '100%', padding: '10px', borderRadius: '10px', background: '#181a29', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span>🔍</span> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
