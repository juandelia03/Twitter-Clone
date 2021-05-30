import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBcf2YD87DnCSdVeVGYMMrif9JV41Ah7Ec",
  authDomain: "mytwitter-ac0e8.firebaseapp.com",
  databaseURL: "https://mytwitter-ac0e8-default-rtdb.firebaseio.com",
  projectId: "mytwitter-ac0e8",
  storageBucket: "mytwitter-ac0e8.appspot.com",
  messagingSenderId: "221798691156",
  appId: "1:221798691156:web:ca2f76ddd1c1a2300618c1",
  measurementId: "G-6DG2BNS21W"
};

firebase.initializeApp(firebaseConfig);
var db =firebase.database()
console.log(firebase.database().ref("tweets/"))

export{
    db,
}