import React,{useState,useContext} from 'react' ; 
import './popup-form/popup.css'
import Articles from './Article';
import Navbar from './Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import { Container } from './popup-form/Container';
import {FirebaseContext} from '../authentification/'
import Favorite from './Favorite'
function Main({user,setUser}) {
  
    const firebase = useContext(FirebaseContext) ; 
    console.log(user)
  const[subreddit, setSubreddit]=useState('memes');
  const[popup, setPopup]=useState(false);
  const onSubmit = (event) => {
  event.preventDefault(event);
  
};


    return ( <div className="main" style={{height : "auto" }}>
      
        <Router>
       
   
   <Navbar subreddit={subreddit} setSubreddit={setSubreddit} popup={popup} setPopup={setPopup} user={user} setUser={setUser} firebase={firebase} /> 

       
       
   <Container user={user} setUser={setUser}  onSubmit={onSubmit} popup={popup} setPopup={setPopup} firebase={firebase} /> 
       
      <Switch>
      <Route exact path="/">
      <Articles subreddit={subreddit} user={user} setUser={setUser} firebase={firebase}  media={""} />  
          </Route>
         
        
         
          
          <Route exact path="/images">
      <Articles user={user} subreddit={subreddit} firebase={firebase} setUser={setUser} media={"image"} /> 
          </Route>
          <Route exact path="/videos">
      <Articles user={user}  subreddit={subreddit} setUser={setUser} firebase={firebase}  media={"video"} />  
          </Route>
          { user ? <Route exact path="/favorites">
     <Favorite firebase={firebase}  setUser={setUser}  user={user}/> 
          </Route> : null
           }
    
    
      </Switch>
       
     


</Router>
       
        </div>
    )
    }

export default Main
