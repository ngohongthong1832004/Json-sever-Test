import './App.css';
import { useState,useEffect ,useRef } from 'react';
function App() {
  
  const [api,setApi] = useState([])
  const [inputValue, setInputValue] = useState('')
  const apiHTTP = "http://localhost:3333/posts"
  const fetchAPI = ()=>{
    console.log("call API")
    fetch(apiHTTP)
      .then((response) => response.json())
      .then((data) => setApi(data));
  }

  useEffect(()=>{ 
    fetchAPI()
  },[])

  const inputRef = useRef()
  console.log(api)

  // const handleFetch = () =>{
      
  // }
  const form = {
    title : inputRef.current?.value
  }
  // console.log(inputRef.value)
  const  handleADD = ()=>{
    fetch(apiHTTP , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(form),
      })
      setInputValue('')
      inputRef.current.focus()
      setTimeout(()=>{  
          fetchAPI()
      },0)
  }
  const handleDELETE = (id) => {
    fetch(`${apiHTTP}/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
    },
    })
    // .then(response => response.json())
    // .then(data => console.log("data :",data))
    setTimeout(()=>{  
      fetchAPI()
    },0)
  }
  const   handleUPGRADE = ()=>{
    console.log("handleDELETE")
  }


  return (
    <div className="App">
      <h1>LEARN JSONsever</h1>

      <label>Title </label>
        <input ref = {inputRef} value={inputValue} onChange = { e => setInputValue(e.target.value)} />
        <button style={{margin : '5px'}}  onClick = {handleADD}>ADD Data</button>
      <ul>
        {/* <button style={{margin : '5px'}}  onClick = {handleFetch}>Fetch Data</button> */}

        {api.map( item => <div key={item.id}>
          <h4> {item.title}</h4>
          <button style={{margin : '5px'}}  onClick = {() => handleUPGRADE(item.id)}>UPGRADE Data</button>
          <button style={{margin : '5px'}}  onClick = {() => handleDELETE(item.id)}>DELETE Data</button>
        </div>)}
      </ul>
    </div>
  );
}

export default App;
