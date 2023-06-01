
import React, { useState } from 'react';
import axios from "axios";
import './pagecss.css';
  
const Hyst = () => {


  const [info, setinfo] = useState({})
  
  const [email , setemail] = useState("") 
  
  const url='http://localhost:8080/triplog/id/'+email

  const search = (event) => {
    //this is the part that takes your input in the text box and spits it into the api to get a return
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
       setinfo(response.data)
        console.log(response.data)
        
      })
      setemail('')
    }


  } 






  return (

    <div>
      <title>Past weather</title>
      
      <h1>Input Email to find trips</h1>
      
     
      <div className="search">
        <input
        //this is the text box you enter
        value={email}
        onChange={event => setemail(event.target.value)}
        onKeyPress={search}
        placeholder='enter email to find trip'
        type="text"/>

      </div>
      
      
      {info.group ? <h1>group: {info.group}</h1> : null}
      {info.timeout ? <h1>check out time: {info.timeout} </h1> : null}
      {info.timein ? <h1>check in time: {info.timein} </h1> : null}
      {info.id ? <h1>trip id: {info.id} </h1> : null}

      


    </div>
    
    
  );
};
  
export default Hyst;