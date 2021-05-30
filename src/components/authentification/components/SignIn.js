import React, { useState } from "react";
import { Link } from "react-router-dom";
import './forms.css'


const SignIn = (props) => {
  
  
  const firebase=props.firebase ; 
 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [error, setError] = useState(null);




    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
          setPassword(value);
        }
    };
    const handleSubmit=event=>
    {
      event.preventDefault();
       
      firebase.SigninUser(email,password).then(user=>
        {
         
          props.close() ;
          setEmail('')
    setPassword('')
    setError(null)
  props.setUser(user) 
  
  
 
  
        }).catch(error=>{
          setError(error.message)
          
  
        })
      
     
    }

return (
  <div className="sign">
    
    
    
      <form className="sign-form" onSubmit={ handleSubmit }>
      <h1>Welcome Back </h1>
      {error !== null && (
          <div className="error"><i class="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}
        <input
        
          required
          type="email"
          className="inputs email"
          name="userEmail"

          value = {email}
          placeholder="Email"
          class="userEmail"
          onChange = {(event) => onChangeHandler(event)}
        />
        
        <input
       
        autoComplete="off"
         required
          type="password"
          className="inputs password"
          name="userPassword"
          
         value = {password}
          placeholder="Password"
         class="userPassword"
          onChange = {(event) => onChangeHandler(event)}
        />
        <button  className="sign-btn" type="submit" onClick = {handleSubmit} >
          Login
        </button>
      <br></br>
       
          <span 
          onClick={()=>{firebase.SignInWithGoogle() ;  }}
          ><i class="fab fa-google-plus-g"></i>  Or sign in with google   </span>
     
      
     
      {/* <p className="text-center my-3">
        Don't have an account?{" "}
        <Link to="signUp" className="signinhere">
          Sign up here
        </Link>{" "} */}
        <br />{" "}
        <Link to = "passwordReset" >
         <p className="forgotpassword">Forgot Password? </p> 
        </Link>
      {/* </p> */}
      </form>
    </div>
  
);
};
export default SignIn;