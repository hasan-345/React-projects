import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
 const [length,setLength] = useState(12)
 const [number,setNumber] = useState(false);
 const [char,setChar] = useState(false);
 const [password,setPassword] = useState("")

const passwordGenerator = useCallback(()=>{
    
   let pass = "";
   let str = "QWETYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
   if(number) str += "0123456789";
    if(char) str += "~!@#$%^&*()_+}{:|<";

    for(let i = 1; i<=length; i++){
     
      pass += str[Math.floor(Math.random()* str.length )];
    }
  setPassword(pass)
},[length,number,char])

useEffect(()=>{
passwordGenerator()
},[length,number,char])

const pass = useRef();
const [copied,setCopied] = useState(false);
const copyPassword= ()=>{
  pass.current?.select();
  pass.current?.setSelectionRange(0,length);
  window.navigator.clipboard.writeText(password);
  if(window.navigator.clipboard.writeText(password)){
    setCopied(true)
  }else{
    setCopied(false)
  }
  setTimeout(()=>{
  setCopied(false)
  },1000)
}
  return (
    <div className='parent'>
      {copied?<div className='copy show'><i className='bx tick bxs-check-circle'></i> Password is copied</div>:<div className='copy'><i className='bx tick bxs-check-circle'></i> Password is copied</div>} 
    <h1>Password Generator</h1>
   <div className='container'>
    
           <div className="password-gen">
            <div className="display">
              <input type="text" ref={pass} value={password} placeholder='password' readOnly />
              <button onClick={copyPassword}>Copy</button>
            </div>
            <div className="bottom">
              
              <input type="range" name="" id="" min={6} max={25} value={length} onChange={(e)=>{setLength(e.target.value)}} />
              length <p> {length} </p>
              <label htmlFor="char">                                                     
                <input type="checkbox" defaultChecked={char} name="" id ="char" onChange={()=>{setChar((prev)=> !prev)}} />
                Charactors
              </label>
              <label htmlFor="num">
               <input type="checkbox" name="" id="num"  onChange={()=>{setNumber((prev)=> !prev)}} defaultChecked={number} />
               Numbers
              </label>
            </div>
           </div>
           <button className='btn' onClick={passwordGenerator}>Generate Password</button>
   </div>
   </div>
  )
}

export default App
