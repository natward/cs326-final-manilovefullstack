const signup_bttn = document.getElementById("signup");
const signin_bttn = document.getElementById("signin");

signup_bttn.addEventListener("click", (e) => {
    location.href = "./signup.html";
});

signin_bttn.addEventListener("click", (e) => {
    const spireid = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    // send spireid and password to backend
    console.log(spireid);
    console.log(password);

    location.href = "./TitlePage.html";
});