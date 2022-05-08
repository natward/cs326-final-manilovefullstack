const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const clubName = urlParams.get('club');

const response = await getClubUrl(clubName);

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

const applyButton = document.getElementById("apply");

applyButton.addEventListener('click',  async (e) => {
    const name = document.getElementById('apply-name').value;
    const grade = document.getElementById('apply-grade').value;
    const experience = document.getElementById('apply-experience').value;

    await crud.submitApplication(name, grade, experience);

    document.getElementById('apply-name').value = "";
    document.getElementById('apply-grade').value = "";
    document.getElementById('apply-experience').value = "";
});

const eventButton = document.getElementById("events");

eventButton.addEventListener('click',  async (e) => {
    await crud.goToEvents(clubName);
});

 async function getClubUrl(clubName){
    const url = new URL('https://only-clubs.herokuapp.com/get-club');

    myUrlWithParams.searchParams.append("club", clubName);
    myUrlWithParams.searchParams.append("red", false);

    const response = await fetch(url.href);
    const data = await response.json();
    return data;
}

 async function submitApplication(name, grade, experience){
    const response = await fetch(`/apply`, {
        method: 'POST',
        data: {
            "name": name,
            "grade": grade,
            "experience": experience,
        }
    });
    // const data = await response.json();
    // return data;
}

 async function goToEvents(clubName) {

    const url = new URL('https://only-clubs.herokuapp.com/get-events');

    myUrlWithParams.searchParams.append("club", clubName);
    myUrlWithParams.searchParams.append("red", true);

    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow'
    });
    const data = await response.json();
    return data;
  }