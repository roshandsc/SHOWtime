import React, { useState } from 'react';

export const ReminderCard = ({ onToggle }) => {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    if (onToggle) onToggle(nextState);
  };

  return (
    <div className="reminder-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
          🔔
        </div>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>Show Reminder</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Get notified before the show</div>
        </div>
      </div>

      <label className="toggle-switch">
        <input type="checkbox" checked={enabled} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ReminderCard;
