const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/": "/pages/pathfinderlookup.html",
    "/personaggi": "/pages/personaggi.html",
    "/personaggi/rufus": "/pages/personaggi/rufus.html",
    "/personaggi/medb": "/pages/personaggi/medb.html",
    "/personaggi/john": "/pages/personaggi/john.html",
    "/personaggi/jason": "/pages/personaggi/jason.html",
    "/personaggi/victor": "/pages/personaggi/victor.html",
    "/personaggi/vincent": "/pages/personaggi/vincent.html",
    "/personaggi/sorumur": "/pages/personaggi/sorumur.html",
}

const handleLocation = async () => {
    const path = window.location.pathname;
    let route = routes[path];
    if (route === undefined) route = routes['/'];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();