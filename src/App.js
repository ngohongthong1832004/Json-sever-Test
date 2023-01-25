import './App.css';
import { useState,useEffect ,useRef, useLayoutEffect } from 'react';
function App() {
  const [api,setApi] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputSearchValue, setInputSearchValue] = useState('')
  const apiHTTP = "http://localhost:3333/posts"

  
  useLayoutEffect(()=>{ 
    fetchAPI()
  },[])


  const fetchAPI = ()=>{
    console.log("call API")
    fetch(apiHTTP)
      .then((response) => response.json())
      .then((data) => setApi(data));
  }
  const inputRef = useRef()
  const inputSearchValueRef = useRef()
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
      },100)
  }
  const handleDELETE = (id) => {
    fetch(`${apiHTTP}/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
    },
    })
    setTimeout(()=>{  
      fetchAPI()
    },100)
  }
  const   handleUPGRADE = ()=>{
    console.log("handleDELETE")
  }
  const handleFind  = ()=>{
    fetch(`${apiHTTP}?title=${inputSearchValue}`)
    .then(res => res.json())
    .then(data => setApi(data))
    setInputSearchValue('')
    // inputSearchValueRef.focus()
  }
  const handleComplete = () => {
    console.lofindg("")
  }

  return (
    <div className="App">
      <h1>LEARN JSONsever</h1>
        <label>Find Job</label>
        <input ref = {inputSearchValueRef} value={inputSearchValue} onChange = { e => setInputSearchValue(e.target.value)} />
        <button style={{margin : '5px'}}  onClick = {handleFind}>Find</button>
        <div style={{padding : "10px"}}>-----------------------------</div>
        <label>Job name </label>
        <input ref = {inputRef} value={inputValue} onChange = { e => setInputValue(e.target.value)} />
        <button style={{margin : '5px'}}  onClick = {handleADD}>Add To List</button>
      <ul>
        {/* <button style={{margin : '5px'}}  onClick = {handleFetch}>Fetch Data</button> */}

        {api.map( item => <div key={item.id}>
          <h4>{item.title}</h4>
          <span style={{color :"blue",padding : "10px"}}>{item.id}</span>
          <button style={{margin : '5px',backgroundColor : "green"}}  onClick = {() => handleUPGRADE(item.id)}>UPGRADE</button>
          <button style={{margin : '5px',backgroundColor : "red"}}  onClick = {() => handleDELETE(item.id)}>DELETE</button>
          <button style={{margin : '5px',backgroundColor : "aqua"}}  onClick = {() => handleComplete(item.id)}>Complete</button>
        </div>)}
      </ul>
    </div>
  );
}

export default App;
