import RequestContext from "./requestContext";
import { useState, useEffect} from "react";
const RequestState = (props) => {
  // Here Ghouse Mohammed is hard coading all the user noted instead of getting it from the API
  const host = `http://localhost:7000`
  const mongoDB_user_uploaded_requests = [{"_id": "6648b732bd22f3b087f9b890",
  "username": "ghouse",
  "description": "print 5 copies",
  "pdfContentType": "application/pdf",
  "date": "2024-05-18T14:12:02.719Z"}];
  const [user_requests, setRequests] = useState(mongoDB_user_uploaded_requests);

    // Log user_requests whenever it changes
    useEffect(() => {
      console.log('Updated user_requests:', user_requests);
    }, [user_requests]);

  //FETCHING ALL NOTES FUNCTION
  const getRequests = async () => {  

    // API-CALL
    if (localStorage.getItem('token')){try {
      const response = await fetch(`${host}/fetchallrequests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res_json = await response.json();
      console.log('Fetched requests:', res_json); // Log the fetched data
      setRequests(res_json);
      console.log('After setRequests', res_json , user_requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }
};

  // with the below code we can use these user uploaded notes using the usecontext hook
  return (<RequestContext.Provider value={{ user_requests, getRequests}}>{props.children}</RequestContext.Provider>)
  }

  export default RequestState