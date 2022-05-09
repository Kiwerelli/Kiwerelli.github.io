const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/map_4k": "pages/map_4k.html",
    "/map_8k": "pages/map_8k.html",
    "/parchment_4k": "pages/parchment_4k.html",
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (path !== "/") {
        const route = routes[path];
        const html = await fetch(route).then((data) => data.text());
        document.getElementById("main-page").innerHTML = html;
    }
}
window.onpopstate = handleLocation;
window.route = route;

handleLocation();