import React from 'react';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="btn btn-secondary btn-sm"
      >
        ← Previous
      </button>
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', padding: '0 8px' }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="btn btn-secondary btn-sm"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
