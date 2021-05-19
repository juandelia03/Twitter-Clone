<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <div class="container">
    <Sidebar />
    <div class="feed">
    <Feed class="tweet-form" @submited="newTweet"/>
    <Tweet class="tweets-feed" v-bind:user="username" v-bind:time="day" v-bind:text="mainText"/>
    </div>
    <Search class="search" />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Tweet from "./components/Tweet"
export default {
  name: "App",
  components: { Sidebar, Feed, Search,Tweet },
  data(){
    return{
      mainText:"",
      day:"",
      username:""
    }
    
  },
  methods:{
    newTweet(text){
      this.mainText=text
      var today = new Date
      var time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() ;
      this.day = time
      console.log(this.day)
      if(this.username === ""){
        this.username = "unknown User"
      }
      console.log(this.username)
    }
  }
};
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
}
.tweets-feed{
  margin-top: 10px;
  background-color:white ;
}
</style>
