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
    <Login @logcard="logcard" :style="{display:display2}"/>
    <LoginForm :style="{display:display}" @login="login"/>
  </div>


  <div v-else class="container" >
    <Sidebar />
    <div class="feed">
    <Feed class="tweet-form" @submited="newTweet"/>
    <div class="tweets">
    <Tweet  @deltetwt="delet(index)" class="tweets-feed" v-for=" (tweet,index) in tweets" :key="tweet.idT"
    :text="tweet.mainText"
    :time="day"
    :user="username"
    /> 
    </div>
    </div>
    <Search class="search" />
  </div>

</template>

<script>

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Tweet from "./components/Tweet";
import LoginImg from "./components/LoginImg"
import Login from "./components/Login"
import LoginForm from "./components/LoginForm"
//import db from "./db "
export default {
  name: "App",
  components: { Sidebar, Feed, Search,Tweet,LoginImg,Login,LoginForm },
  data(){
    return{
      mainText:"",
      day:"",
      username:"",
      tweets:[],
      email:"",
      password:"",
      display:"none",
      display2:"flex",
    }
    
  },
  methods:{
    newTweet(text){
      if(text === ""){
        return
      }
      else{
              this.mainText=text
      var today = new Date
      var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() ;
      this.day = time
     
      if(this.username === ""){
        this.username = "Unknown User"
      }
      var idN = Math.floor(Math.random() * 100)
      var id = idN.toString()
      this.tweets.unshift({mainText:text,day:time,username:"unknown",idT:id})
      }

      
      },
      delet(index){
        this.tweets.splice(this.tweets[index],1)
       
      },

      logcard(){
        if (this.display === "none") {
          this.display = "flex"
          this.display2 = "none"
        }
      },
      login(){
        console.log("login")
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
