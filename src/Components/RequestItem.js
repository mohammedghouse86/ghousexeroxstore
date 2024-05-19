import React from 'react';

const RequestItem = ({ request }) => {
  return (
    <div className="card my-3 mx-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <p className="card-text">{request.username}</p>
        <p className="card-text">{request.description}</p>
        <p className="card-text">{request.pdfContentType}</p>
      </div>
    </div>
  );
};

export default RequestItem;
