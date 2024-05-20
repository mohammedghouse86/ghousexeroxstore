import React, { useState, useContext } from 'react';
import RequestContext from "../Context/request_contex/requestContext";


const PdfToBase64Converter = () => {
  let json_1
  const [base64String, setBase64String] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState(''); // Add state for the description input
  const context = useContext(RequestContext);
  const { username, setUsername } = context;
  const convertPdfToBase64 = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = function (event) {   
        let base_64String = event.target.result.split(',')[1];
        base_64String = "data:application/pdf;base64,"+ base_64String
        setBase64String(base_64String);
        setErrorMessage('');
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('Please select a PDF file.');
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update state when description input changes
  };

  const uploadRequest = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/auth/getuser", {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token')
      }});
    json_1 = await response.json();
    setUsername(json_1.name)
    console.log('name=',json_1.name);

    if(base64String){
      console.log("username",username, "description",description, "pdf", base64String);
      const response = await fetch("http://localhost:7000/upload", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Ensure the content type is set
      },
      body: JSON.stringify({
        "username": username,
        "description": description,
        "pdf": base64String
      })});
      
    const json_2 = await response.json();
    console.log(json_2)
    }

  }

  return (
    <div>
      <h2>Upload a PDF File</h2>
      <input type="file" accept="application/pdf" onChange={convertPdfToBase64} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h3>Base64 Output</h3>
      <textarea /*className ="invisible"*/ value={base64String} rows="10" cols="80" readOnly />
      <form onSubmit={uploadRequest}>
      <input
          type="text"
          placeholder="Enter your requirement"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      <button type="submit">UPLOAD REQUEST</button></form>
    </div>
  );
};

export default PdfToBase64Converter;
