import './App.css';
import { useState,useEffect } from 'react';
function App() {
  
  const [api,setApi] = useState([])

  const apiHTTP = "http://localhost:3333/"

  useEffect(()=>{
    fetch(`${apiHTTP}posts`)
    .then((response) => response.json())
    .then((data) => setApi(data));
  },[])


  console.log(api)



  return (
    <div className="App">
      <h1>LEARN JSONsever</h1>
      <ul>
        {api.map( item => <h4 key={item.id}> {item.title}</h4>)}
      </ul>
      <button style={{margin : '5px'}}>ADD Data</button>
      <button style={{margin : '5px'}}>UPGRADE Data</button>
      <button style={{margin : '5px'}}>DELETE Data</button>
    </div>
  );
}

export default App;
