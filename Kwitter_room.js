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

function welcome_user(){
    user_name = localStorage.getItem("user_name");
    document.getElementById("welcome").innerHTML = "Welcome " + user_name + "!";
}

function addRoom(){
    room_name = document.getElementById("room_name").value;
    localStorage.setItem("room_name", room_name);
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    window.location = "kwitter_page.html"
}
function getData() {firebase.database().ref("/").on('value',
function(snapshot) {document.getElementById("output").innerHTML =
"";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
Room_names = childKey;
//Start code
    row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'> <h3>"+Room_names+"</h3></div> <hr>";
    document.getElementById("output").innerHTML += row;
//End code
});});}
getData();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}