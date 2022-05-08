<<<<<<< HEAD
const URL = "https://only-clubs.herokuapp.com";
=======

const URL = "https://only-clubs.herokuapp.com";

>>>>>>> 519a650debcdd676bc76744ff95de0c424e5fad9
const hyperlink = document.getElementById("signin-signup-myuser");

if(localStorage.getItem("accset") === null){
  hyperlink.innerHTML = "Sign-up/Sign-in"
  hyperlink.href = URL+"/signin.html";
}
else{
  hyperlink.innerHTML = "My User"
<<<<<<< HEAD
  hyperlink.href = URL+"myUser.html";
}
=======
  hyperlink.href = URL+"/myUser.html";
}
>>>>>>> 519a650debcdd676bc76744ff95de0c424e5fad9
