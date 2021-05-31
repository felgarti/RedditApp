import React ,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;
import '../../index.css'
function Favorite(props) {
 
        const [favs,setFav]=useState([])

      
        const fetchArticles=async()=>{

     const d= await  props.firebase.getFavorites().onSnapshot((doc) => {
              
                setFav(doc.data().favorites) ;
                
               
            }) ;
        }
      
      
        useEffect(() => {
            fetchArticles();
           
          }, [])
                 
       
                console.log("Articles : " , favs) ;
            
     
        
    return ( <div className="articles"> 
      {  favs.map(element=>
        {
            return <div className="article"> 
            <a href={"https://reddit.com" + element.url} style={{ "text-decoration":" none"}} >
                <h3  style={{"color" : "orangered" }} >{element.title}</h3>
            {element.mediaType=="image" || element.mediaType=="gif"  ? <img src={element.media} style={{width: "200px", height: "250px" }} /> :null }
            {element.mediaType=="video" ? <video controls autoplay loop preload="auto" style={{width: "200px", height: "250px" }}>
             <source   raw_json="1" src={element.media}></source>
             </video> :null }
             {element.mediaType=="article"  ? <button type="button" className="btnArt" > Click to read more </button> :null }
             </a> 
             </div>
        })}
    </div>
        
   ) }
        
      
           
               
        
       
       


export default Favorite ; 