const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/": "/pages/main.html",
    /* Routes Personaggi */
    "/personaggi": "/pages/personaggi.html",
    "/personaggi/rufus": "/pages/personaggi/rufus.html",
    "/personaggi/medb": "/pages/personaggi/medb.html",
    "/personaggi/john": "/pages/personaggi/john.html",
    "/personaggi/jason": "/pages/personaggi/jason.html",
    "/personaggi/victor": "/pages/personaggi/victor.html",
    "/personaggi/vincent": "/pages/personaggi/vincent.html",
    /* Routes Equipaggio */
    "/equipaggio": "/pages/equipaggio.html",
    /* Routes Png */
    "/png": "/pages/png.html",
    /* Routes Porti */
    "/porti": "/pages/porti.html",
    /* Routes Isole */
    "/isole": "/pages/isole.html",
    /* Routes Bestiario */
    "/bestiario": "/pages/bestiario.html",
    /* Routes Handout */
    "/handouts": "/pages/handouts.html",
    /* Routes Diario */
    "/diario": "/pages/diario_del_capitano.html",
    /* Routes Appunti */
    "/appunti": "/pages/appunti_nautici.html",
    /* Routes Bottino */
    "/bottino": "/pages/bottino.html",
    /* Routes Varie */
    "/varie": "/pages/varie.html",
    /* Routes Scheda interattiva */
    //"/scheda": "/pages/scheda.html"
}

const handleLocation = async () => {
    const path = window.location.pathname;
    let route = routes[path];
    if (route === undefined) route = routes['/'];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    if (path == "/") {
        document.getElementById("main-page").className = "col-12";
    } else {
        document.getElementById("main-page").className = "content col-12";
    }

    if (path == "/scheda") {
        document.getElementById("mainTopNavBar").hidden = true;
        document.getElementById("schedaTopNavBar").hidden = false;
    } else {
        document.getElementById("mainTopNavBar").hidden = false;
        document.getElementById("schedaTopNavBar").hidden = true;
    }


}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();