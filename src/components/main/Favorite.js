import React ,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;

function Favorite(props) {
 
        const [favs,setFav]=useState([])

          
      
        const fetchArticles=async()=>{
     const d= await  props.firebase.getFavorites().onSnapshot((doc) => {
              
                setFav(doc.data().favorites) ;
                
               
            }) ;
        }
      
      
        useEffect(() => {
            fetchArticles();
            setFav(favs) ; 
          }, [])
                 
       
                console.log("Articles : " , favs) ;
            
     
        
    return (
        
      <div>{      <div className="articles">
      {

          favs.map((fav,index)=>
       {
            <div  key={index} className="article">
           <h1 style={{"color" : " white"}}> grbzilktvz </h1>
       <h3>{ fav["title"]}</h3>

       <a href={"https://reddit.com" + fav["url"] } target="_blank" rel="noreferrer">
   <div className="images"> 
      {fav.mediType=="video"?
       <div className="video" > <video controls autoplay loop preload="auto" style={{width: "200px", height: "250px" }}>
       <source   raw_json="1" src={fav["media"]}></source>
       </video> </div> :
       fav["mediType"]=="image"?
       <img src={fav["media"]} alt=""   width="200" height="250"  />: 
       fav["mediType"]=="article"? <button type="button" className="btnArt" > Click to read more </button> :null} 
       </div> </a>    </div> } )
     }
     </div> 
        
        
        
        
         } </div>   ) }
        
      
           
               
        
       
       


export default Favorite ; 