/* * /
const contentIncludes = {
    //"nav_personaggi": "includes/nav_personaggi.html",
    //"nav_mappe": "includes/nav_mappe.html",
    //"nav_citta": "includes/nav_citta.html",
}

const loadContent = async () => {
    for (const [key, value] of Object.entries(contentIncludes)) {
        fetchData(key, value);
    }
};

async function fetchData(key, value) {
    const html = await fetch(value).then((data) => data.text());
    document.getElementById(key).innerHTML = html;
}
/* */

const loadContent = async () => {
    let url = window.location.href;
    url = url.split("/");
    url = url[url.length - 1];
    
    if (url == 'scheda') {
        loadSchedaContent();
    }
}

async function loadSchedaContent() {
    const json = await fetchData("../datiScheda.json").then((data) => {
        loadCharacterCore(data.core);
    });
}

function loadCharacterCore(data) {
    for (const [key, value] of Object.entries(data.character_details)) {
        document.getElementById(key).innerHTML = value;
    }

    data.ability_scores.forEach((element, key) => {
        document.getElementById('ability_' + key).innerHTML = element.ability;
        document.getElementById('total_' + key).innerHTML = element.total;
        document.getElementById('mod_' + key).innerHTML = element.mod;
    });

    for (const [key, value] of Object.entries(data.health)) {
        document.getElementById(key).innerHTML = value;
    }
}

async function fetchData(value) {
    const html = await fetch(value).then((data) =>data.json());
    return html;
}

window.onload = loadContent;