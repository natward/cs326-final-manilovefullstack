
const response = getClubList();
// response:
// {club_names: [], club_descs: []}

const list = document.getElementById('club-list');

render(list);

// Renders the club list
function render(element) {
    element.innerHTML = '';
    for(let i = 0; i < response.club_names.length; ++i) {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.value = response.club_names[i];
        div.innerText = response.club_names[i] + '\n' + response.club_descs[i];
        element.appendChild(div);
    }
}

document.getElementById('list-item').addEventListener("click", goToClubPage);

async function goToClubPage() {
    const names = response.club_names;
    const nameToFind = document.getElementById('list-item').value;
    const name = names.find(
        function(str) {
            return str === nameToFind;
        }
    );
    const url = new URL("milfs.com/get-club");

    myUrlWithParams.searchParams.append('club', name);
    myUrlWithParams.searchParams.append('red', true);

    await fetch(url, {
        method: 'GET',
        redirect: 'follow'
    });
}

async function getClubList() {
    const url = new URL('milfs.com/all-clubs');

    const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow'
    });
    const data = await response.json();
    return data;
}