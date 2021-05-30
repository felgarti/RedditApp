import React, { useState } from "react";
import { Link } from "react-router-dom";
import './forms.css'

const SignUp = (props) => {
  const firebase = props.firebase ; 
  console.log(props)
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit=event=>
  {
    
    event.preventDefault();
    firebase.SignupUser(email,password).then( (user)=>
      {  
        console.log(user)
        props.setUser(user) 
        firebase.profileUpdate(displayName)  ; 
        
        setEmail('')
        setPassword('')
        setDisplayName('')
        props.close() ;
      }).catch((error)=>{
          setError(error.message) }) 
  }
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    
    <div className="sign">
     
      
        
        <form  className="sign-form" onSubmit={(event)=> handleSubmit(event) }>
       
        <h1 >Join us  </h1>
        {error !== null && (
          <div className="error"><i class="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <input
          autoComplete="" required
            type="text"
            className="inputs username"
            name="displayName"
            value={displayName}
            placeholder="Username"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          
          <input
          autoComplete=""
           required
            type="email"
            className="inputs email"
            name="userEmail"
            value={email}
            placeholder="Email"
            class="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          
          <input
           required
            type="password"
            className="inputs password"
            name="userPassword"
            value={password}
            placeholder="Password"
            class="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <br></br>
          <button type="submit" 
            className="sign-btn" onClick={(event)=> handleSubmit}>
            Sign up
          </button>
      <br></br>
          <span
           onClick={()=>{firebase.SignInWithGoogle() ;  }}
          ><i class="fab fa-google-plus-g"></i>  or sign up with google   </span>
       
        {/* <p >
          Already have an account?{" "}
          <Link to="/" className="signinhere">
            Sign in here
          </Link>
        </p> */}
        </form>
      </div>
   
  );
};
export default SignUp;