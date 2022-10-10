import React, { useEffect } from 'react'

const Test = () => {
    const checkTest = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8000/api/seed", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
    }
    useEffect(() => {
     checkTest()
    }, [])
    
  return (
    <div>Test</div>
  )
}

export default Test