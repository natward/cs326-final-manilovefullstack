const signin_bttn = document.getElementById("signin");
const signup_bttn = document.getElementById("signup");
const url = "https://only-clubs.herokuapp.com";


signin_bttn.addEventListener("click", (e) => {
    location.href = url+"/signin.html";
});

signup_bttn.addEventListener("click", async (e) => {
    const spireid = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    // send spireid and password to backend
    console.log(spireid);
    console.log(password);

<<<<<<< HEAD
    let res = await fetch("/signup", {
=======
    let res = await fetch(url+"/signup", {
>>>>>>> 519a650debcdd676bc76744ff95de0c424e5fad9
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            "user": spireid,
            "pass": password
        })
    });
    res = res.json();
    if ("error" in res)
        alert(`${res["error"]}`)
    else {
        localStorage.setItem("accset", true);
        localStorage.setItem("user", spireid);
        localStorage.setItem("pass", password);
    }
    location.href = url+"/myUser.html";
});