const signup_bttn = document.getElementById("signup");
const signin_bttn = document.getElementById("signin");

signup_bttn.addEventListener("click", (e) => {
    location.href = "./signup.html";
});

signin_bttn.addEventListener("click", async (e) => {
    const spireid = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    // send spireid and password to backend
    console.log(spireid);
    console.log(password);

    let res = await fetch("http://localhost:5050/signin", {
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

    location.href = "./TitlePage.html";
});