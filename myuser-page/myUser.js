// when you fetch the info from the server you get an object like this
// {
//     "clubs": [...],
//     "friends": [...]
// }
const clubs = document.getElementById("clubs-list");
const friends = document.getElementById("friends-list");
const response = {
    "clubs": ["bob", "yuval", "people"],
    "friends": ["cap","doodlebob"]
}
// ADD THIS BACK IN LATER
// const url = new URL("milfs.com/get-fields");
// async function init(){
//     if(localStorage.getItem("accset") === null){
//         location.href="../account/signin.html"
//     }
//     else{
//         let response = await fetch(url, {
//             method: "POST",
//             body: {
//                 user: localStorage.getItem("user"),
//                 pass: localStorage.getItem("pass"),
//             }
//         });
//         response = response.json();
//     }   
// }

for(let i=0; i< response['clubs'].length; i++){
    const newListElement= document.createElement("li");
    newListElement.setAttribute("id",response['clubs'][i]);
    newListElement.setAttribute("class","clubsAndFriends");
    clubs.appendChild(newListElement);
    const specificClub = document.getElementById(response['clubs'][i]);
    specificClub.innerHTML = response['clubs'][i];
    specificClub.addEventListener("click", (e)=> {
        window.location.href = ("../club-page/club-page.html");
    });
}
for(let i=0; i< response['friends'].length; i++){
    const newListElement= document.createElement("li");
    newListElement.setAttribute("id",response['friends'][i]);
    newListElement.setAttribute("class","clubsAndFriends");
    friends.appendChild(newListElement);
    const specificFriend = document.getElementById(response['friends'][i]);
    specificFriend.innerHTML = response['friends'][i];
}
