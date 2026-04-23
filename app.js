import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONFIGURACIÓN (Pega la tuya aquí)
const firebaseConfig = {
  apiKey: "AIzaSyDxU1DHT6RK5ttzsvynlS7gyrN5ThkXD9Q",
  authDomain: "cooptenjo-mundialista.firebaseapp.com",
  databaseURL: "https://cooptenjo-mundialista-default-rtdb.firebaseio.com",
  projectId: "cooptenjo-mundialista",
  storageBucket: "cooptenjo-mundialista.firebasestorage.app",
  messagingSenderId: "748680540417",
  appId: "1:748680540417:web:6cda8f9294c3ef99d4eb00",
  measurementId: "G-RDPDP4EG0C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Estado Global
let currentUser = null;
let usersData = [];

// Router Simple
const router = {
    navigate: (view) => {
        const container = document.getElementById('view-container');
        if (view === 'inicio') {
            container.innerHTML = `
                <div class="card-gradient rounded-[3rem] p-10 text-white shadow-2xl animate-in fade-in">
                    <h2 class="text-5xl font-black mb-8 italic uppercase leading-none">VIVE LA PASIÓN <br><span class="text-yellow-400">COOPTENJO</span></h2>
                    <button class="bg-white text-[#004d3d] px-10 py-4 rounded-2xl font-black">PRONÓSTICOS</button>
                </div>
            `;
        }
        if (view === 'ranking') {
            const list = usersData.sort((a,b) => b.points - a.points).map((u, i) => `
                <div class="flex justify-between p-6 border-b">
                    <span class="font-black text-xl">${i+1}. ${u.name}</span>
                    <span class="text-2xl font-black text-[#004d3d]">${u.points}</span>
                </div>
            `).join('');
            container.innerHTML = `<div class="bg-white rounded-[2rem] shadow-xl overflow-hidden">${list}</div>`;
        }
        lucide.createIcons();
    }
};

window.router = router;

// Manejo de Auth
onAuthStateChanged(auth, (user) => {
    if (user) {
        // En una app real, aquí validarías el login del form contra Firestore
        // Para este ejemplo, simulamos acceso tras "click"
        document.getElementById('loader').classList.add('hidden');
    }
});

// Listener de Usuarios
onSnapshot(collection(db, "users"), (snapshot) => {
    usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if(currentUser) router.navigate('inicio');
});

// Formulario de Login (Simulado para el ejemplo)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-content').classList.remove('hidden');
    currentUser = { name: "Usuario Cooptenjo", points: 0 }; // Simulación
    router.navigate('inicio');
});

// Inicializar iconos
lucide.createIcons();