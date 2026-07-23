import React, { useState } from 'react';
import Input from '../../common/Input/Input';
import { useToast } from '../../../hooks/useToast';

export const Settings = ({ user }) => {
  const [name, setName] = useState(user?.name || 'Demo User');
  const [email, setEmail] = useState(user?.email || 'user@showtime.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const toast = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile settings updated successfully!');
  };

  return (
    <div style={{ background: 'var(--color-card)', padding: '32px', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-card-border)', maxWidth: '600px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>Account Settings</h3>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit" className="btn btn-primary btn-md" style={{ width: 'fit-content', marginTop: '12px' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
