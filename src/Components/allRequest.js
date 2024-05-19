import React, { useEffect, useContext } from 'react'
import RequestContext from "../Context/request_contex/requestContext";
import RequestItem from './RequestItem.js';

const AllRequest = () => {
  const context = useContext(RequestContext);
  const { user_requests, getRequests } = context;


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getRequests();
      console.log('this is all the requests = ', user_requests);
    }
  }, [])

  return (
    <div className='row row-cols-5'>
      {user_requests.map((requests_1, i) => {
        //console.log('this is the request _id=');
        //console.log(requests_1);
        return (
          <RequestItem key={requests_1._id} request={requests_1} />
        );
      })}
    </div>
  )
}

export default AllRequest
