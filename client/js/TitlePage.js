
const URL = "https://only-clubs.herokuapp.com";

const hyperlink = document.getElementById("signin-signup-myuser");

if(localStorage.getItem("accset") === null){
  hyperlink.innerHTML = "Sign-up/Sign-in"
  hyperlink.href = URL+"/signin.html";
}
else{
  hyperlink.innerHTML = "My User"
  hyperlink.href = URL+"/myUser.html";
}
