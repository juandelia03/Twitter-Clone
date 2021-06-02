<template>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
    rel="stylesheet"
  />
  <div class="Login-page" v-if="email === ''">
    <LoginImg :style="{ display: display2 }" />
    <Login
      @registercard="registercard"
      @logcard="logcard"
      :style="{ display: display2 }"
    />
    <LoginForm :style="{ display: display }" @login="login" />
    <RegisterForm :style="{ display: display3 }" @register="register" />
  </div>

  <div v-else class="container">
    <Sidebar />
    <div class="feed">
      <Feed class="tweet-form" @submited="newTweet" />
      <div class="tweets">
        <Tweet
          @liked="liked(index)"
          @deltetwt="delet(index)"
          class="tweets-feed"
          v-for="(tweet, index) in tweetsdb"
          :key="tweet.idT"
          :text="tweet.mainText"
          :time="tweet.day"
          :user="tweet.username"
          :likesNum="tweet.likesNum"
        />
      </div>
    </div>
    <Search class="search" />
  </div>
</template>

<script>
var database = firebase.database();
var postListRef = firebase.database().ref("tweets");
import firebase from "firebase";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Tweet from "./components/Tweet";
import LoginImg from "./components/LoginImg";
import Login from "./components/Login";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import db from "./db";
export default {
  name: "App",
  components: {
    Sidebar,
    Feed,
    Search,
    Tweet,
    LoginImg,
    Login,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      mainText: "",
      day: "",
      username: "",
      tweets: [],
      tweetsdb: [],
      email: "",
      password: "",
      display: "none",
      display2: "flex",
      display3: "none",
      likes: ["god"],
    };
  },
  methods: {
    //Function to create Tweets
    newTweet(text, index) {  
      //Check if there is any text to tweet
      if (text === "") {
        return;
      }
      //Asign each information of the tweet with corresponding data
      else {
        this.mainText = text;
        var today = new Date();
        var time =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          today.getHours() +
          ":" +
          today.getMinutes();
        this.day = time;
        // If no user is given give a default
        if (this.username === "") {
          this.username = "Unknown User";
        }
        //Create a var which contains current data
        var idN = Math.floor(Math.random() * 100);
        var id = idN.toString();
        //Create the object tweet and append it to the tweets array
        this.tweets.unshift({
          mainText: text,
          day: time,
          username: this.username,
          idT: id,
          likes: this.likes,
          likesNum: 0,
        });
        //Send Data to firebase
        postListRef.push(this.tweets[0]);
        //Create the tweet object which will be displayed with the firebase data and append it to a new array
        this.tweetsdb = [];
        var ref = firebase.database().ref("/tweets"); //Refer to the directory in firebase
        ref.once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => { //Get the key and data of each object in /tweets
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            this.tweetsdb.unshift({  //Append the data in the displayed tweets
              mainText: childData.mainText,
              day: childData.day,
              username: childData.username,
              idT: childData.idT,
              likes: childData.likes,
              likesNum: childData.likesNum,
            });
          });
        });
      }
    },

    //function to delete Tweets
    delet(index) {
      this.tweetsdb.splice([index], 1); //remove the tweet selected by index from the displayed twwets
      var keys = [];   //Every Firebase Object Key will be stored in here
      var ref = firebase.database().ref("/tweets"); //Look in the /tweets route in firebase
      ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => { // Get the key and data of each object in /tweets
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          keys.unshift(childKey); //Append each key in the keys array
        });
        firebase
          .database()
          .ref("/tweets/" + keys[index]) //Look in the route twwets for the selected tweet by key,
          .remove();           //the key is accesed by index in the keys array
      });
    },
    //Function to open the log screen when Login is clicked
    logcard() { 
      if (this.display === "none") {
        this.display = "flex";
        this.display2 = "none";
      }
    },
    //Auth function from firebase
    login(LoginData) {
      firebase
        .auth()
        .signInWithEmailAndPassword(LoginData.email, LoginData.password) //Login with the LoginData emited
                                                                        //from LoginForm.vue
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          this.display = "none"; //get rid of the Login Page
          this.display2 = "flex"; //Acces the twitter page
          this.email = LoginData.email;  
          this.username = LoginData.email.replace("@gmail.com", ""); //Defining the username using the email Data
          //display the data stored in firebase once logged in
          var ref = firebase.database().ref("/tweets");
          ref.once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              this.tweetsdb.unshift({
                mainText: childData.mainText,
                day: childData.day,
                username: childData.username,
                idT: childData.idT,
                likes: childData.likes,
                likesNum: childData.likesNum,
              });
            });
          });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    },
    //Likes system function
    liked(index) {
      var username = this.username; 
      var keys = []; //Store the firebase key of every tweet
      var obj = []; //Storing every user who liked the tweet
      var length = []; //Amount of likes
      var users = [];
      var ref = firebase.database().ref("/tweets");
      ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          keys.unshift(childKey); //Store every key in keys array
          obj = Object.values(childData.likes); //Storing every user who liked the tweet
          length = Object.keys(childData.likes).length; //Storing the amount of likes in each tweets
          users = Object.values(childData.likes); 
        });
        if (obj.includes(username)) { //checking if the loged user already liked the tweet
          return;                      //If already liked then it must be disliked
        } else { //If not liked then add a like
          firebase
            .database()
            .ref("/tweets/" + keys[index] + "/likes") //acces the likes route
            .push(username); //add the username so intstead of liking twice next time it's clicked tweet 
                            //gets unliked

          firebase
            .database()
            .ref("/tweets/" + keys[index] + "/likesNum") //acces the likesNum route
            .set(length);   //set the amount to the length of the users who liked the post array

          this.tweetsdb[index].likesNum = length; //change tha value likesNum in the object which is displayed
        }
      });
    },
    //When click register open the register window function
    registercard() {
      this.display2 = "none";
      this.display3 = "flex";
    },
    register(Registerdata) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          Registerdata.email,
          Registerdata.password
        )
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          this.display2 = "flex";
          this.display3 = "none";
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },
  },
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

.tweet-form {
  background: white;
  margin-bottom: 10px;
  width: 600px;
}
.tweets-feed {
  background-color: white;
}
.feed {
  border-style: solid;
  border-width: 1px;
  border-color: #ebeef0;
  background: #f7f9fa;
}
.tweets {
  border-style: solid;
  border-color: #ebeef0;
  border-width: 1px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 0px;
}
.Login-page {
  display: flex;
}
</style>
