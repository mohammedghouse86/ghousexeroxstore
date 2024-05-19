import React from 'react';

const RequestItem = ({ request }) => {

  
  const getPdf = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/requests/${request._id}/pdf`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${request.username}_request.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  const closeRequest = async () => {

    try {
      const response = await fetch(`http://localhost:7000/requests/${request._id}`, {   
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }} catch (error) {
      console.error('Error deleting the request:', error);
    }
  };





  

  return (
    <div className="card my-3 mx-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <p className="card-text">{request.username}</p>
        <p className="card-text">{request.description}</p>
        <p className="card-text">{request.pdfContentType}</p>
        <div className='container'>
          <button type='button' onClick={getPdf}>Get PDF</button>
          <button type='button' className='mx-2' onClick={closeRequest}>Close Request</button>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
