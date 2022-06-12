const contentIncludes = {
    "nav_personaggi": "includes/nav_personaggi.html",
    "nav_mappe": "includes/nav_mappe.html",
    "nav_citta": "includes/nav_citta.html",
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


//window.onload = loadContent;

//loadContent();
//fetchJSON();
