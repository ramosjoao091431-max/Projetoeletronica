// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    databaseURL: "https://estacionamento-fdc5f-default-rtdb.firebaseio.com/"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referência ao "led" no banco
const ledRef = ref(database, "led");

// Elementos do HTML
const statusPanel = document.getElementById("status-panel");
const btnOn = document.getElementById("btn-on");
const btnOff = document.getElementById("btn-off");

// LIGAR
btnOn.addEventListener("click", () => {
    set(ledRef, true);
});

// DESLIGAR
btnOff.addEventListener("click", () => {
    set(ledRef, false);
});

// Atualização em tempo real
onValue(ledRef, (snapshot) => {
    const estadoLed = snapshot.val();

    if (estadoLed === true) {
        statusPanel.textContent = "LED LIGADO";
        statusPanel.classList.add("ligado");
        statusPanel.classList.remove("desligado");
    } else {
        statusPanel.textContent = "LED DESLIGADO";
        statusPanel.classList.add("desligado");
        statusPanel.classList.remove("ligado");
    }
});
