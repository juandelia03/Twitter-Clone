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
    <LoginForm :error="errorMsg" :style="{ display: display }" @login="login" />
    <RegisterForm
      :error="regErrorMsg"
      :style="{ display: display3 }"
      @register="register"
    />
  </div>

  <div v-else :style="{ display: tweetsDisplay }" class="container">
    <Sidebar @logOut="logOut" class="sidebar" :name="username" />
    <div class="feed">
      <Feed
        :name="username"
        :style="{ display: publishDisplay }"
        class="tweet-form"
        @submited="newTweet"
      />
      <div class="tweets">
        <Commentsheader
          v-if="watchingComments == true"
          @backToFeed="backToFeed"
        />
        <Tweet
          @liked="liked(index)"
          @comment="comment(index)"
          @deltetwt="delet(index)"
          @commentsView="commentsView(index)"
          class="tweets-feed"
          v-for="(tweet, index) in tweetsdb"
          :key="tweet.idT"
          :text="tweet.mainText"
          :time="tweet.day"
          :user="tweet.username"
          :likesNum="tweet.likesNum"
          :color="tweet.likeColor"
          :watchingComments="watchingComments"
          :commentsNum="tweet.commentsNum"
          :watchingComment="watchingComments"
        />
      </div>
    </div>
    <Search @search="search" class="search" />
  </div>
  <Answer
    @addComment="addComment"
    @back="backToTweets"
    :style="{ display: answerDisplay }"
    :user="this.answeredTweet.user"
    :text="this.answeredTweet.text"
    :time="this.answeredTweet.day"
    :key="this.answeredTweet.key"
  />
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
import Answer from "./components/Answer.vue";
import db from "./db";
import Commentsheader from "./components/commentsheader.vue";
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
    Answer,
    Commentsheader,
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
      tweetsDisplay: "flex",
      answerDisplay: "none",
      likes: ["god"],
      color: "",
      errorMsg: "",
      regErrorMsg: "",
      answeredTweet: {},
      tempKey: "",
      publishDisplay: "flex",
      watchingComments: false,
    };
  },
  methods: {
    logOut() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.display2 = "none";
      this.display = "flex";
      this.tweetsdb = [];
    },
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
          String(today.getMinutes()).padStart(2, "0");

        this.day = time;
        // If no user is given give a default
        if (this.username === "") {
          this.username = "Unknown User";
        }
        //Create a var which contains current data
        //var idN =
        //  "_" +
        //  Math.random()
        //    .toString(36)
        //    .substr(2, 9);
        var mili = String(today.getMilliseconds()).padStart(3, "0");
        var mins = String(today.getMinutes()).padStart(2, "0");
        var sec = String(today.getSeconds()).padStart(2, "0");
        var idN =
          today.getFullYear() +
          "" +
          (today.getMonth() + 1) +
          "" +
          today.getDate() +
          "" +
          today.getHours() +
          "" +
          mins +
          "" +
          sec +
          "" +
          mili;
        var id = idN.toString();
        //Create the object tweet and append it to the tweets array
        this.tweets.unshift({
          mainText: text,
          day: time,
          username: this.username,
          idT: id,
          likes: this.likes,
          likesNum: 0,
          likeColor: "#607586",
          commentsNum: 0,
        });
        //Send Data to firebase

        firebase
          .database()
          .ref("/tweets/")
          .child(this.tweets[0].idT)
          .set(this.tweets[0]);

        //Create the tweet object which will be displayed with the firebase data and append it to a new array
        this.tweetsdb = [];
        var ref = firebase.database().ref("/tweets"); //Refer to the directory in firebase
        ref.once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            //Get the key and data of each object in /tweets
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            this.tweetsdb.unshift({
              //Append the data in the displayed tweets
              mainText: childData.mainText,
              day: childData.day,
              username: childData.username,
              idT: childData.idT,
              likes: childData.likes,
              likesNum: childData.likesNum,
              likeColor: childData.likeColor,
              commentsNum: childData.commentsNum,
            });
          });
        });
      }
    },

    //function to delete Tweets
    delet(index) {
      if (this.watchingComments == true) {
        alert("You can only delete tweets in the Feed ");
      } else if (this.username == this.tweetsdb[index].username) {
        this.tweetsdb.splice([index], 1); //remove the tweet selected by index from the displayed twwets
        var keys = []; //Every Firebase Object Key will be stored in here
        var ref = firebase.database().ref("/tweets"); //Look in the /tweets route in firebase
        ref.once("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            // Get the key and data of each object in /tweets
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            keys.unshift(childKey); //Append each key in the keys array
          });
          firebase
            .database()
            .ref("/tweets/" + keys[index]) //Look in the route twwets for the selected tweet by key,
            .remove(); //the key is accesed by index in the keys array
        });
      } else {
        alert("This Tweet isn't yours!");
      }
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
          let data = LoginData.email.replace("@gmail.com", "");
          this.username = data.replace(".", "_"); //Defining the username using the email Data
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
                likeColor: childData.likeColor,
                commentsNum: childData.commentsNum,
              });
            });
          });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.errorMsg = errorMessage;
        });
    },
    //Likes system function
    liked(index) {
      var username = this.username;
      var keys = []; //Store the firebase key of every tweet
      var length = []; //Amount of likes
      var ref = firebase.database().ref("/tweets");
      var userstemp = [];
      var bool = [];
      var likesNum = 0;
      var users = [];

      ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          keys.unshift(childKey); //Store every key in keys array
          likesNum = childData.likesNum;
        });
        firebase
          .database()
          .ref("/tweets/" + this.tweetsdb[index].idT + "/likes")
          .once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
              userstemp.push(childData);
              var users = Object.values(userstemp);
              this.bool = users.includes(username);
            });

            if (this.bool == true) {
              var Likes2 = [];
              var Color2 = "";
              //checking if the loged user already liked the tweet
              //If already liked then it must be disliked
              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likes")
                .child(username)
                .remove();

              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likesNum")
                .set(firebase.database.ServerValue.increment(-1));

              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likeColor")
                .set("#607586");

              var LikesRef2 = firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likesNum");
              LikesRef2.on("value", (snapshot) => {
                var Data = snapshot.val();
                Likes2 = Data;
              });
              var Color2ref = firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likeColor");
              Color2ref.on("value", (snapshot) => {
                var Data = snapshot.val();
                Color2 = Data;
              });
              this.tweetsdb[index].likeColor = Color2;
              this.tweetsdb[index].likesNum = this.tweetsdb[index].likesNum - 1;
            } else {
              var Likes = 0;
              var Color = "";
              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likes")
                .child(username) //acces the likes route
                .set(username);

              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likesNum")
                .set(firebase.database.ServerValue.increment(+1));

              firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likeColor")
                .set("#e0245e");

              var LikesRef = firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likesNum");
              LikesRef.on("value", (snapshot) => {
                var Data = snapshot.val();
                Likes = Data;
              });

              var Colorref = firebase
                .database()
                .ref("/tweets/" + this.tweetsdb[index].idT + "/likeColor");
              Colorref.on("value", (snapshot) => {
                var Data = snapshot.val();
                Color = Data;
              });

              this.tweetsdb[index].likesNum = this.tweetsdb[index].likesNum =
                this.tweetsdb[index].likesNum + 1;
              this.tweetsdb[index].likeColor = Color;
              //this.tweetsdb[index].likesNum = users.length; //change tha value likesNum in the object which is displayed
            }
          });
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
          let data = Registerdata.email.replace("@gmail.com", "");
          firebase
            .database()
            .ref("/users/")
            .child(data.replace(".", "_"))
            .child("profilePic")
            .set(
              "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            );
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.regErrorMsg = errorCode;
          // ..
        });
    },
    search(search) {
      if (search === "") {
        this.tweetsdb = [];
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
              likeColor: childData.likeColor,
              commentsNum: childData.commentsNum,
            });
          });
        });
      } else {
        console.log(search);
        const tweetsText = this.tweetsdb.map((tweet) => {
          const tweetText = tweet.mainText;
          return tweetText; //TEXTO DE TODOS LOS TWEETS
        });
        const filteredTexts = tweetsText.includes(search);
        console.log(filteredTexts);
        var result = this.tweetsdb.filter((tweet) => {
          return tweet.mainText.includes(search);
        });
        console.log(result);
        this.tweetsdb = result;
      }
    },
    comment(index) {
      this.tweetsDisplay = "none";
      this.answerDisplay = "flex";
      this.tempKey = this.tweetsdb[index].idT;
      this.answeredTweet = {
        text: this.tweetsdb[index].mainText,
        user: this.tweetsdb[index].username,
        day: this.tweetsdb[index].day,
      };
    },
    backToTweets() {
      this.tweetsDisplay = "flex";
      this.answerDisplay = "none";
    },
    addComment(text) {
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
        String(today.getMinutes()).padStart(2, "0") +
        ":" +
        String(today.getSeconds()).padStart(2, "0");

      this.day = time;
      firebase
        .database()
        .ref("/tweets/" + this.tempKey + "/comments")
        .push({
          text: text,
          user: this.username,
          time: this.day,
          likesNum: -2,
        });
      firebase
        .database()
        .ref("/tweets/" + this.tempKey + "/commentsNum")
        .set(firebase.database.ServerValue.increment(+1));

      this.tweetsdb = [];
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
            likeColor: childData.likeColor,
            commentsNum: childData.commentsNum,
          });
        });
      });

      this.tweetsDisplay = "flex";
      this.answerDisplay = "none";
    },
    commentsView(index) {
      this.publishDisplay = "none";
      const selTweet = this.tweetsdb[index];
      this.tweetsdb = [];
      this.tweetsdb.push(selTweet);
      this.watchingComments = true;
      var ref = firebase
        .database()
        .ref("/tweets/" + selTweet.idT + "/comments");
      ref.once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          console.log(childData);
          this.tweetsdb.push({
            mainText: childData.text,
            day: childData.time,
            username: childData.user,
          });
        });
      });
    },
    backToFeed() {
      this.watchingComments = false;
      this.publishDisplay = "flex";
      this.tweetsdb = [];
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
            likeColor: childData.likeColor,
            commentsNum: childData.commentsNum,
          });
        });
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
  display: flex;
  justify-content: space-evenly;
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
