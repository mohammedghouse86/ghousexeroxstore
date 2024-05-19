import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  let history = useNavigate();
  const [Credential, SetCredential] = useState({name:"", email: "", password: "" , cpassword:""})
  const Submit_SingUp_Form = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/auth", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: Credential.name, email: Credential.email, password: Credential.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken); 
      history("/");
    }
    else {
      console.log("Invalid credentials");
    }
  }

  const onChange = (e) => {
    SetCredential({ ...Credential, [e.target.name]: e.target.value })
  }

  return (
    <div className="mx-auto p-2" style={{ "width": "80vw" }}>
      <form onSubmit={Submit_SingUp_Form}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label mx-5">Name</label>
          <input type="text" className="form-control mx-5" id="name" aria-describedby="name" onChange={onChange} name="name" value={Credential.name}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label mx-5">Email address</label>
          <input type="email" className="form-control mx-5" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} name="email" value={Credential.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label mx-5">Password</label>
          <input type="password" className="form-control mx-5" id="Password" onChange={onChange} name="password" value={Credential.password} />
          <label htmlFor="exampleInputPassword1" className="form-label mx-5">Confirm Password</label>
          <input type="password" className="form-control mx-5" id="ConfirmPassword" onChange={onChange} name="cpassword" value={Credential.cpassword}/>
        </div>
        <button type="submit" className="btn btn-primary  mx-5">SIGN UP</button>
      </form>
    </div>
  )
}

export default Signup

