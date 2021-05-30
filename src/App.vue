<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <div class="Login-page" v-if="email === ''" >
    <LoginImg :style="{display:display2}"/>
    <Login @registercard="registercard" @logcard="logcard" :style="{display:display2}"/>
    <LoginForm :style="{display:display}" @login="login"/>
    <RegisterForm :style="{display:display3}" @register="register" />
  </div>


  <div v-else class="container" >
    <Sidebar />
    <div class="feed">
    <Feed class="tweet-form" @submited="newTweet"/>
    <div class="tweets">
    <Tweet  @deltetwt="delet(index)" class="tweets-feed" v-for=" (tweet,index) in tweetsdb" :key="tweet.idT"
    :text="tweet.mainText"
    :time="tweet.day"
    :user="tweet.username"
    /> 
    </div>
    </div>
    <Search class="search" />
    <div style="position:absolute;left:100px;bottom:100px;">
      <p>{{this.username}}</p>
    </div>
  </div>

</template>

<script>
var database = firebase.database()
var postListRef = firebase.database().ref('tweets');
import firebase from "firebase"
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Tweet from "./components/Tweet";
import LoginImg from "./components/LoginImg"
import Login from "./components/Login"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import db from "./db"
export default {
  name: "App",
  components: { Sidebar, Feed, Search,Tweet,LoginImg,Login,LoginForm,RegisterForm },
  data(){
    return{
      mainText:"",
      day:"",
      username:"",
      tweets:[],
      tweetsdb:[],
      email:"",
      password:"",
      display:"none",
      display2:"flex",
      display3:"none",
    }
    
  },
  methods:{
    newTweet(text){
      //Check if there is any text to tweet
      if(text === ""){
        return
      }
      //Asign each information of the tweet with corresponding data
      else{
      this.mainText=text
      var today = new Date
      var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() ;
      this.day = time
     // If no user is given give a default
      if(this.username === ""){
        this.username = "Unknown User"
      }
      var idN = Math.floor(Math.random() * 100)
      var id = idN.toString()
      this.tweets.unshift({mainText:text,day:time,username:this.username,idT:id})
      //Send Data to firebase
      postListRef.push(this.tweets[0])
      
      this.tweetsdb=[]
      var ref = firebase.database().ref("/tweets")
      ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      this.tweetsdb.unshift({mainText:childData.mainText,day:childData.day,username:childData.username,idT:childData.idT})
  
  });

});

        
    

      }
      
      
      },
      delet(index){
        this.tweetsdb.splice(this.tweets[index],1)
        
      },

      logcard(){
        if (this.display === "none") {
          this.display = "flex"
          this.display2 = "none"
        }
      },
      login(LoginData){
        firebase.auth().signInWithEmailAndPassword(LoginData.email, LoginData.password)
        
        
      .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      this.display="none"
      this.display2="flex"
      this.email=LoginData.email
      this.username=LoginData.email.replace("@gmail.com","")
      //display the data in firebase
      var ref = firebase.database().ref("/tweets")
      ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      this.tweetsdb.unshift({mainText:childData.mainText,day:childData.day,username:childData.username,idT:childData.idT})
  });

});
      // ...
      })
      .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      });
      
      },
      registercard(){
        this.display2="none"
        this.display3="flex"
      },
      register(Registerdata){
        //this.email = Registerdata.email
        //this.username = Registerdata.user
      firebase.auth().createUserWithEmailAndPassword(Registerdata.email, Registerdata.password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    this.display2="flex"
    this.display3="none"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..    
  });
      }

    },
  }

</script>

<style>
* {
  font-family: "Roboto", "sans-serif";
  margin: 0;
}
.container {
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
}

.tweet-form{
  background: white;
  margin-bottom: 10px;
  width: 600px;
}
.tweets-feed{

  background-color:white ;
}
.feed{
  border-style: solid;
  border-width: 1px;
  border-color: #ebeef0;
  background: #f7f9fa;
}
.tweets{
  border-style: solid;
  border-color: #ebeef0;
  border-width: 1px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 0px;
}
.Login-page{
  display: flex;
  
}
</style>
