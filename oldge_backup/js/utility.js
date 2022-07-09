function resetFilter(idFilter, idTable) {
    document.getElementById(idFilter).value = '';
    filterTabs(idFilter, idTable);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function start_draggable() {
    sleep(500).then(() => {
        const draggables = document.querySelectorAll('.draggable');
        const containers = document.querySelectorAll('.container');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('touchstart', () => {
                draggable.classList.add('dragging');
            });
        });

        draggables.forEach(draggable => {
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });

            draggable.addEventListener('touchend', () => {
                draggable.classList.remove('dragging');
            });
        });

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');

                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });

            container.addEventListener('touchmove', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.targetTouches[0].clientY);
                const draggable = document.querySelector('.dragging');

                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });
        });

    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function addIniziativa(nameFromJson = "", modFromJson = "") {
    var nomeCreatura = document.getElementById("nomeCreatura").value;
    var modIni = document.getElementById("modIni").value;
    var card = document.createElement("div");

    if (nameFromJson && modFromJson) {
        nomeCreatura = nameFromJson;
        modIni = modFromJson;
    }

    document.getElementById("nomeCreatura").value = "";
    document.getElementById("modIni").value = "";

    card.classList.add('card');
    card.classList.add('draggable');

    var pNomeCreatura = document.createElement("p");
    var pModIni = document.createElement("p");
    var valueIni = document.createElement("p");
    var btnRemove = document.createElement("button");
    var rolledIni = document.createElement("button");
    
    btnRemove.addEventListener('click', function() {
        removeIniziativa(card);
    });

    rolledIni.addEventListener('click', function() {
        rollIni(valueIni, modIni);
    });

    pNomeCreatura.innerHTML = nomeCreatura;
    valueIni.innerHTML = 0;
    pModIni.innerHTML = modIni;
    btnRemove.innerHTML = "Cancella";
    rolledIni.innerHTML = "Rolla Iniziativa";

    card.appendChild(pNomeCreatura);
    card.appendChild(pModIni);
    card.appendChild(valueIni);
    card.appendChild(rolledIni);
    card.appendChild(btnRemove);

    document.getElementById("listaIniziativa").appendChild(card);
    start_draggable();
}

function fetchPersonaggi() {
    fetch("./model/personaggi.json").then(response => {
        return response.json();
    }).then(jsondata => {
        jsondata.personaggi.forEach(element => {
            var nome_completo = element.nome + " " + element.cognome;
            addIniziativa(nome_completo, element.modIni);
        });
    });
}

function removeIniziativa(obj) {
    obj.remove();
}

function rollIni(obj, mod) {
    min = Math.ceil(1);
    max = Math.floor(20);
    var ini = Math.floor(Math.random() * (max - min + 1) + min);
    ini = parseInt(ini) + parseInt(mod);
    obj.innerHTML = ini;
}