// ============================================
// FIREBASE
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// ============================================
// CONFIGURAÇÃO DO FIREBASE
// ============================================

const firebaseConfig = {

    databaseURL:
        "https://estacionamento-fdc5f-default-rtdb.firebaseio.com/"

};


// Inicializa Firebase

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// ============================================
// REFERÊNCIA DO LED
// ============================================

const ledRef = ref(database, "led");


// ============================================
// ELEMENTOS DO LED
// ============================================

const statusPanel =
    document.getElementById("status-panel");

const ledIndicator =
    document.getElementById("led-indicator");

const btnOn =
    document.getElementById("btn-on");

const btnOff =
    document.getElementById("btn-off");


// ============================================
// LIGAR LED
// ============================================

btnOn.addEventListener("click", () => {

    set(ledRef, true);

});


// ============================================
// DESLIGAR LED
// ============================================

btnOff.addEventListener("click", () => {

    set(ledRef, false);

});


// ============================================
// MONITORAMENTO DO LED
// ============================================

onValue(ledRef, (snapshot) => {

    const estadoLed = snapshot.val();


    if (estadoLed === true) {

        statusPanel.textContent =
            "LED LIGADO";

        statusPanel.style.color =
            "#39ff14";

        ledIndicator.classList.add("ligado");

        ledIndicator.classList.remove("desligado");

    }

    else {

        statusPanel.textContent =
            "LED DESLIGADO";

        statusPanel.style.color =
            "#ff304f";

        ledIndicator.classList.add("desligado");

        ledIndicator.classList.remove("ligado");

    }

});


// ============================================
// VAGAS
// ============================================

// Quantidade de vagas

const totalVagas = 4;


// Atualiza uma vaga

function atualizarVaga(numero, ocupada) {

    const vaga =
        document.getElementById(`vaga${numero}`);


    if (!vaga) return;


    const status =
        vaga.querySelector(".vaga-status");


    if (ocupada === true) {

        // VAGA OCUPADA

        vaga.classList.add("ocupada");

        vaga.classList.remove("livre");

        status.textContent =
            "OCUPADA";

    }

    else {

        // VAGA LIVRE

        vaga.classList.add("livre");

        vaga.classList.remove("ocupada");

        status.textContent =
            "LIVRE";

    }

}


// ============================================
// MONITORAR AS 4 VAGAS
// ============================================

const vagas = [];


// Cria referência para cada vaga

for (let i = 1; i <= totalVagas; i++) {

    const vagaRef =
        ref(database, `vaga${i}`);

    vagas.push(vagaRef);


    onValue(vagaRef, (snapshot) => {

        const valor = snapshot.val();

        atualizarVaga(i, valor === true);

        atualizarContadores();

    });

}


// ============================================
// CONTADORES
// ============================================

function atualizarContadores() {

    let ocupadas = 0;


    for (let i = 1; i <= totalVagas; i++) {

        const vaga =
            document.getElementById(`vaga${i}`);


        if (vaga.classList.contains("ocupada")) {

            ocupadas++;

        }

    }


    const livres =
        totalVagas - ocupadas;


    document.getElementById("total-vagas")
        .textContent = totalVagas;


    document.getElementById("vagas-ocupadas")
        .textContent = ocupadas;


    document.getElementById("vagas-livres")
        .textContent = livres;

}
