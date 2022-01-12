const firebaseConfig = {
    apiKey: "AIzaSyAep2M-CLanZ0yZDRj5FN1Vrw8pb1p7MmY",
    authDomain: "letschat-55ee7.firebaseapp.com",
    databaseURL: "https://letschat-55ee7-default-rtdb.firebaseio.com",
    projectId: "letschat-55ee7",
    storageBucket: "letschat-55ee7.appspot.com",
    messagingSenderId: "1023919834357",
    appId: "1:1023919834357:web:41a057a35e93b06d5ff1bc",
    measurementId: "G-E3K60X2JTT"
  };
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        likes: 0
    });
    document.getElementById("msg").value = "";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
       console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
       like = message_data['likes'];
       name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'> </h4>";
       message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
       like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
       span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span> </button> <hr>";
       row = name_with_tag + message_with_tag + like_button + span_with_tag;
       document.getElementById("output").innerHTML += row;
 } });  }); }
getData();

function updateLike(message_id){
 console.log("click on like button-" + message_id);
 button_id = message_id;
 likes = document.getElementById(button_id).value;
 updated_likes = Number(likes) + 1;
 console.log(updated_likes);
 firebase.database().ref(room_name).child(message_id).update({
       likes: updated_likes
 });
}