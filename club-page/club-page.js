// import???
import * as crud from './crud.js';



// apply button == fetch request of type post, sending data
// body == json obj you send to server

// event button == get request --> in header/query of the fetch request --> will send the club name

// clubName = response.clubName 

const clubName = "dummy variable";

// inject clubname and picture + video

    const url = new URL("milfs.com/get-club");

    myUrlWithParams.searchParams.append("club", clubName);

    // let response = await fetch(url, {
    //     method: 'GET'
    // });

    // response = await response.json();

const response = await crud.getUrl(url);
// picture and vid wil be urls to the image/vid
if(response["club-image"] === undefined ){
    const pictureUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.beamliving.com%2Fstories%2Ffunny-2021-memes&psig=AOvVaw2NVTobAEeszJ7jwlMvX1mP&ust=1650500485036000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJj8pM2vofcCFQAAAAAdAAAAABAQ";
    console.log("club image doesn't exist");
    // alert message...
}else{
    const pictureUrl = response["club-image"];
}

// video
if(response["club-video"] === undefined ){
    const videoUrl = "https://www.tiktok.com/@dukeandjones/video/7083884496465988869?is_copy_url=1&is_from_webapp=v1";
    console.log("club video doesn't exist");
    // alert message...
}else{
    const videoUrl = response["club-video"];
}

// club description will be text

if(response["club-description"] === undefined ){
    const clubDescription = "Club description doesn't exist";
    console.log("Club description doesn't exist");
    // alert message...
}else{
    const clubDescription = response["club-description"];
}

const pageClubName = document.getElementById("club-name");
const pageMedia = document.getElementById("media");
const pageDescription = document.getElementById("club-description");

pageClubName.innerHTML = clubName;
pageDescription.innerHTML = clubDescription;

// append image
const image = document.createElement("IMG");
image.src = pictureUrl;
image.classList.add("left");
image.id = "dog-pic";
pageMedia.appendChild(image);

// append video
const video = document.createElement("video");
video.src = videoUrl;
video.classList.add("right");
video.id = "dog-vid";
video.autoplay = true;
pageMedia.appendChild(video);

//'/test/?test=test'

// post req needs body
// yuval's server.js comment says how post req expects body/fields keys in its json object




// let response = await fetch(url);
// if(response.ok){ // if HTTP status is 200 or 299
//     let json = await response.json();

// } else {
//     alert("HTTP Error: " + response.status);
// }

const applyButton = document.getElementById("apply");

applyButton.addEventListener('click',  async (e) => {
    const name = document.getElementById('apply-name').value;
    const grade = document.getElementById('apply-grade').value;
    const experience = document.getElementById('apply-experience').value;

    // need to set it to a variable?
    await crud.submitApplication(name, grade, experience);
});

