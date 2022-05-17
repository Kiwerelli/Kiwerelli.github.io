// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyNav()};

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNav() {
    // Get the navbar
    var navbar = document.getElementById("mainTopNavBar");
    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

// Filtra tabella
function filterTabs(idFilter, idTable) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(idFilter);
    filter = input.value.toUpperCase();
    table = document.getElementById(idTable);
    tr = table.getElementsByTagName("tr");
    
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 * DB wannabe per il caricamento "dinamico" dei dati
 * Funzione di routing e rimando alle specifiche per pagina
 */
function fetchJSON() {
    content = window.location.pathname
    switch (content) {
        case '/':
            fetchJSON_main();
            break;
        case '/parchment_4k':
            break;
        default:
            break;
    }
}

/**
 * Fetch in home della pagina main
 */
function fetchJSON_main() {
    fetchJSON_personaggi();
    fetchJSON_citta();
}

function fetchJSON_personaggi() {
    fetch("./model/personaggi.json").then(response => {
        return response.json();
    }).then(jsondata => {
        var content = "";
        jsondata.personaggi.forEach(element => {
            content += "<tr>"
            content += "<td>" + element.nome + "</td>"
            content += "<td>" + element.cognome + "</td>"
            content += "<td>" + element.classe + "</td>"
            content += "</tr>"
        });
        document.getElementById("bodyTabellaPersonaggi").innerHTML = content;
    });
}

function fetchJSON_citta() {
    fetch("./model/citta.json").then(response => {
        return response.json();
    }).then(jsondata => {
        var content = "";
        jsondata.citta.forEach(element => {
            content += "<tr>"
            content += "<td>" + element.nome + "</td>"
            content += "<td>" + element.plotAperti + "</td>"
            content += "</tr>"
        });
        document.getElementById("bodyTabellaCitta").innerHTML = content;
    });
}