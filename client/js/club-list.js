
const initialResponse = await getClubList();
// response:
// {club_names: [], club_descs: []}

const response = parseResponse(initialResponse);

const list = document.getElementById('club-list');

render(list);

function parseResponse(res) {
        let newres = {"club_names": [], "club_descs": []};
        for(let i = 0; i < res.length; i++) {
            if ("club" in res[i])
                newres["club_names"].push(res[i]["club"])
            if ("club-description" in res[i])
                newres["club_descs"].push(res[i]["club-description"])
        }
        return newres;
}

// Renders the club list
function render(element) {
    element.innerHTML = '';
    for(let i = 0; i < response.club_names.length; ++i) {
        const div = document.createElement('div');
        div.classList.add('list-item');
        div.value = response.club_names[i];
        div.innerText = response.club_names[i] + '\n' + response.club_descs[i];
        element.appendChild(div);
        div.addEventListener("click", async () => await goToClubPage(response.club_names[i]));
    }
}

async function goToClubPage(name) {

    const url = new URL("https://only-clubs.herokuapp.com/club-page.html");

    url.searchParams.append('club', name);

    window.location.href = url.href;
}

async function getClubList() {
    const url = new URL('https://only-clubs.herokuapp.com/all-clubs');

    const response = await fetch(url, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
}