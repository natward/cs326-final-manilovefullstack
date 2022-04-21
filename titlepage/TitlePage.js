// change me
const URL = "https://only-clubs.herokuapp.com/";

// const club_bttn = document.getElementsByClassName("club");
const hyperlink = document.getElementById("signin-signup-myuser");

if(localStorage.getItem("accset") === null){
  hyperlink.innerHTML = "Sign-up/Sign-in"
  hyperlink.href = URL+"signin.html";
}
else{
  hyperlink.innerHTML = "My User"
  hyperlink.href = URL+"myUser.html";
}





// club_bttn.addEventListener("click", async (e) => {
//   let res = await fetch('https://https://only-clubs.herokuapp.com/get-fields', {
//     method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });
//   // Either receive:
//   // Fields object: {clubs: [], friends: []}
//   // or receive
//   // Error object which contains {error: "...", code: *some integer code*}
//   res = res.json();
//   if ("error" in res) {
//     alert(res["error"])
//   } else {
//     // *use fields to do something with them for this user*
//   }
// });