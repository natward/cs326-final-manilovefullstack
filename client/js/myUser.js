
const clubs = document.getElementById("clubs-list");
const friends = document.getElementById("friends-list");
<<<<<<< HEAD
const url = "https://only-clubs.herokuapp.com/get-fields";
=======
let response = [];

const url = new URL("https://only-clubs.herokuapp.com/get-fields");
>>>>>>> 519a650debcdd676bc76744ff95de0c424e5fad9
async function init(){
    if(localStorage.getItem("accset") === null){
        location.href="https://only-clubs.herokuapp.com/signin.html"
    }
    else{
        response = await fetch(url, {
            method: "POST",
            body: {
                user: localStorage.getItem("user"),
                pass: localStorage.getItem("pass"),
            }
        });
        response = await response.json();
    }   
}

init();

<<<<<<< HEAD
for(let i=0; i< response['clubs'].length; i++){
    const newListElement= document.createElement("li");
    newListElement.setAttribute("id",response['clubs'][i]);
    newListElement.setAttribute("class","clubsAndFriends");
    clubs.appendChild(newListElement);
    const specificClub = document.getElementById(response['clubs'][i]);
    specificClub.innerHTML = response['clubs'][i];
    specificClub.addEventListener("click", async (e)=> {
        const urlClub = "https://only-clubs.herokuapp.com/get-club";
        urlClub.searchParams.append("club", specificClub);
        urlClub.searchParams.append("red", true);
        let responseClub = await fetch(urlClub, { method: 'GET', redirect: 'follow' });
    });
=======
if (Object.keys(response).length === 0) {
    location.href = "https://only-clubs.herokuapp.com/club-list.html";
>>>>>>> 519a650debcdd676bc76744ff95de0c424e5fad9
}
else {
    for(let i=0; i< response['clubs'].length; i++){
        const newListElement= document.createElement("li");
        newListElement.setAttribute("id",response['clubs'][i]);
        newListElement.setAttribute("class","clubsAndFriends");
        clubs.appendChild(newListElement);
        const specificClub = document.getElementById(response['clubs'][i]);
        specificClub.innerHTML = response['clubs'][i];
        specificClub.addEventListener("click", async (e)=> {
            const urlClub = new URL("https://only-clubs.herokuapp.com/get-club");
            urlClub.searchParams.append("club", specificClub);
            urlClub.searchParams.append("red", true);
            let responseClub = await fetch(urlClub, { method: 'GET', redirect: 'follow' });
        });
    }
}
