import app from 'firebase/app'
import 'firebase/auth'
import "firebase/firestore"


class Firebase  
{
    constructor()
    {
      
        app.initializeApp({
            apiKey: "AIzaSyCGl5NXcvHWWMOJOUbnbDaT3emDtTm6bMM",
            authDomain: "argarti-7cde7.firebaseapp.com",
            projectId: "argarti-7cde7",
            storageBucket: "argarti-7cde7.appspot.com",
            messagingSenderId: "475608311331",
            appId: "1:475608311331:web:0aa644de0904bd26e27396",
            measurementId: "G-CN744ZBE2N"
          });

            this.auth=app.auth() ;
            this.db=app.firestore() ; 
          
      
    }
   getUser()
   {
       if(this.auth.currentUser !== undefined )
        return this.auth.currentUser ; 
        
   }
  SignInWithGoogle()
   {
    this.google = new app.auth.GoogleAuthProvider();
  
      this.auth.signInWithPopup(this.google).then(result=>console.log(result.user))
        //   this.auth
        // .getRedirectResult()
        // .then((result) => {
        
        //   this.state.user = result.user;
        //  console.log(this.state.user)}    )
        //  .catch(error=>console.log(error.message))
    
     
   

    }
    addFavorite(title , url , media , mediaType )
    {
        this.db.collection('user').doc(this.auth.currentUser.uid).update(
            {
                favorites: app.firestore.FieldValue.arrayUnion({title: title , url : url , media : media , mediaType : mediaType})
            }
        )
    }
    removeFavorite(title , url , media , mediaType )
    {
        this.db.collection('user').doc(this.auth.currentUser.uid).update(
            {
                favorites: app.firestore.FieldValue.arrayRemove({title: title , url : url , media : media , mediaType : mediaType})
            }
        )

    }
    getFavorites()
    {
       return this.db.collection('user').doc(this.auth.currentUser.uid) ;  }
     profileUpdate(username)
    {
        this.auth.currentUser.updateProfile({displayName : username})
        this.db.collection('user').doc(this.auth.currentUser.uid).set({
            userName: username,
            
            userID : this.auth.currentUser.uid,
            
            favorites:[]

        })
    }
    SignupUser=(email,password)=>
    {
      
        return this.auth.createUserWithEmailAndPassword(email,password)
        
    }
    SigninUser=(email,password)=>
    {
        
       return  this.auth.signInWithEmailAndPassword(email,password)
    }
    SignoutUser=()=>
    {
        return this.auth.signOut()
    }
}

export default Firebase ; 