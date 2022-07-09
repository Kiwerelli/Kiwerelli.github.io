const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    //"/": "pages/main.html",
    //"/": "pages/gallery.html",
    "/": "pages/pathfinderlookup.html",
    "/map_4k": "pages/map_4k.html",
    "/map_8k": "pages/map_8k.html",
    "/parchment_4k": "pages/parchment_4k.html",
    "/porto_caperia": "pages/porto_caperia.html",
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();