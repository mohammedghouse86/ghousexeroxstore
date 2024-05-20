import React, { useState,useContext } from 'react'
import RequestContext from "../Context/request_contex/requestContext";

 const Alerts = () => {
    const context = useContext(RequestContext);
    const {alert,setAlert} = context; {/* WE ONLY NEED ADD NOTE from CONTEX API Which is in noteState.js*/}
    return (
      <div style={{ height: '50px', margin: '20px', width: '100vw' }}>
        {alert.status && (
          <div className={`alert alert-success alert-dismissible`} role="alert" style={{ height: '50px', textAlign: 'top', alignSelf:'center' }}>
            <strong>{alert.message}</strong> 
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
      </div>
    );
  }
  export default Alerts
