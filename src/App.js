import React,{useState,useContext,useEffect} from 'react'
import Main from './components/main/Main'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import Profile from "./components/main/Favorite";
import './index.css'
import Signup from "./components/authentification/components/SignUp"
import Signin from "./components/authentification/components/SignIn"
import  {FirebaseContext} from  "./components/authentification"



const App=()=>{
 const [user,setUser]=useState(null)
  const firebase = useContext(FirebaseContext) ;
// useEffect(()=>{setUser(firebase.getUser())},firebase.getUser())
console.log(user)

 
  return (
    <div className="App">
      <Main user={user } setUser={setUser} /> 
    
  
     </div>
  );
  }

export default App;