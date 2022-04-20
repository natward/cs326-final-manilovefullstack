// change me
const URL = "milfs.com/";

// const club_bttn = document.getElementsByClassName("club");
const hyperlink = document.getElementById("signin-signup-myuser");
const data = { user: 'example', pass: 'password' };

if(localStorage.getItem("accset") === null){
  hyperlink.innerHTML = "Sign-up/Sign-in"
  hyperlink.href = URL+"signin.html";
}
else{
  hyperlink.innerHTML = "My User"
  hyperlink.href = URL+"myUser.html";
}





// club_bttn.addEventListener("click", async (e) => {
//   let res = await fetch('https://milfs.com/get-fields', {
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