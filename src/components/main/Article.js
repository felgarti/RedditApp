
import {React , useState,useEffect} from 'react'
import '../../index.css'
import SaveBtn from './SaveBtn'


    const Img=(props)=>{ 
       let  media=props.article.url_overridden_by_dest ;
      ;

        if(media && (media.substr(media.length - 3)==="jpg" || media && media.substr(media.length - 3)==="png" 
        || media.substr(media.length - 3)==="gif"  || media.substr(media.length - 4)==="gifv") )
         { 
            
             if(media.substr(media.length - 4)==="gifv")
             {
               props.setMediaType("video")
                 return(<div className="video" > <video controls autoPlay  loop preload="auto" loop="loop" style={{width: "200px", height: "250px" }}>
                 <source src={media.replace("gifv","mp4")} type="video/mp4"></source>
             </video> </div> );
             }
             

            else {
              if(media.substr(media.length - 3)==="gif"){ props.setMediaType("gif") }else{ props.setMediaType("image")}  ;
              return (<img src={media} alt=""   width="200" height="250"  />)}
     }
    else if((props.article.media != undefined || props.article.secure_media != undefined ) && props.article.media.reddit_video!==undefined)
    {
         if(props.article.media != undefined ){ console.log(props.article.media.reddit_video.fallback_url) ;props.setMediaType("video");
             return( <div className="video" > <video controls autoPlay loop preload="auto" style={{width: "200px", height: "250px" }}>
        <source   raw_json="1" src={props.article.media.reddit_video.fallback_url}></source>
        </video> </div> )
         }
         else 
         { props.setMediaType("video")
             return(<div className="video" > <video controls autoplay loop preload="auto" style={{width: "200px", height: "250px" }}>
             <source   raw_json="1" src={props.article.secure_media.reddit_video.fallback_url}></source>
             </video> </div>)
         }

        
       
    }
    
     else 
     {
      props.setMediaType("article") 
        return (<button type="button" className="btnArt" > Click to read more </button>)
        
     } 
     }
     
function Article(props) {
  const[mediaType,setMediaType]=useState("") ;
 props.setUser(props.user)
 let media ="" ; 
 if(props.article.url_overridden_by_dest) {  media=props.article.url_overridden_by_dest }
  else if(props.article.secure_media!=null) {media=props.article.secure_media.reddit_video.fallback_url } 
  else if(props.article.media!=null)   {  media= props.article.media.reddit_video.fallback_url };
    return (
     
        props.mediaType==="" ||
         props.mediaType==="video" && mediaType ==="video" ||
        props.mediaType==="image" && mediaType ==="image" ||
        props.mediaType==="gif" && mediaType ==="gif"?
        <article>
           <h3>{ props.article.title}</h3>  {props.user?  <SaveBtn  title={props.article.title} mediaType={mediaType} media={media} url={props.article.permalink }  user={props.user} setUser={props.setUser} firebase={props.firebase}/> : null}
            <a href={"https://reddit.com" + props.article.permalink } target="_blank" rel="noreferrer" >
                
           <Img  article={props.article} className="images" mediaType={mediaType} setMediaType={setMediaType}/>
           </a> 
        </article>
          : null 
         
    )
}


function Articles(props) {
    const[articles , setArticles]=useState([]);
    const subreddit =props.subreddit ; 



  useEffect(() => {
    fetch("https://www.reddit.com/r/"+ subreddit +"\\top.json?limit=100").then(res =>
    {
      if(res.status !== 200){
        console.log("ERoRR");
        return;
      }
      res.json().then(data =>
     {
          if(data!=null){
            setArticles(data.data.children);
          }
        })
    })
  }, [subreddit]);
    return (
        <div className="articles">
        {
          (articles !== null) ? articles.map((article ,index) => <Article  firebase={props.firebase} user={props.user} setUser={props.setUser} key={index} mediaType={props.media} article={article.data}/>):''
        }
        </div>
    )
}

export default Articles
