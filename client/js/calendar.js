// NW: consider sorting eventList by date and time to ensure chronological order?
// might allow users to add events later on (need another page)
// for now still need to get events from server 

// Generate current date
const dateObj =  new Date();
const month = dateObj.getMonth();
const year = dateObj.getFullYear();

// Map month number to name
const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];
const currentMonthName = monthNames[month];
document.getElementById('month').innerHTML = currentMonthName + ' ' + year;

//Get URL from current page and parse for club name
const currentURL = window.location.href;
const params = new URLSearchParams(currentURL);
const clubName = params.get('club');

const response = await getClubObject(clubName);
// response:
// {club_events: [], event_date: [], event_time: [], event_location: [], event_descs: []}

const list = document.getElementById('event-list');
document.getElementById('club-name').innerText = clubName;

render(list);

// Renders the event list
function render(element) {
    element.innerHTML = '';
    for(let i = 0; i < response.club_events.length; ++i) {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.innerText = response.club_events[i] + ': ' + response.event_date[i] + ', '
        + response.event_time[i] + ' @ ' + response.event_location[i] + '\n' + response.event_descs[i];
        element.appendChild(div);
    }
}

//Returns club information given a club name
async function getClubObject(clubName){
    const url = new URL('https://only-clubs.herokuapp.com/get-events');

    myUrlWithParams.searchParams.append('club', clubName);
    myUrlWithParams.searchParams.append('red', false);

    const response = await fetch(url, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
}