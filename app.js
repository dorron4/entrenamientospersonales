/**
 * App Logic & State Management
 * Platform: entrenamientopersonales.aitordorronsoro.es
 */

// Initialize Database in LocalStorage if it doesn't exist
const DB_VERSION = "1.0";
const DEFAULT_STATE = {
    clients: [
        { id: "c_aitor", name: "Aitor", lastName: "Dorronsoro", email: "aitordorronsoro@gmail.com", phone: "674501115", dateCreated: "2026-06-16" },
        { id: "c1", name: "Juan", lastName: "Pérez García", email: "juan@gmail.com", phone: "600123456", dateCreated: "2026-05-10" },
        { id: "c2", name: "María", lastName: "García López", email: "maria@gmail.com", phone: "611987654", dateCreated: "2026-06-01" },
        { id: "c3", name: "Carlos", lastName: "Sánchez Torres", email: "carlos@gmail.com", phone: "622111222", dateCreated: "2026-06-05" }
    ],
    workouts: [
        // Workouts for Aitor (c_aitor)
        { 
            id: "w_aitor_1", 
            clientId: "c_aitor", 
            title: "Fuerza y Acondicionamiento A", 
            date: "2026-06-16", 
            notes: "¡Sesión de prueba programada para hoy! Centrarse en la técnica y calentar de forma progresiva.",
            exercises: [
                { name: "Sentadilla Trasera Barra", series: 4, reps: "6", weight: "85" },
                { name: "Press de Banca Plano", series: 4, reps: "8", weight: "70" },
                { name: "Dominadas Lastradas", series: 3, reps: "8", weight: "10" }
            ] 
        },
        // Workouts for Juan (c1)
        { 
            id: "w1", 
            clientId: "c1", 
            title: "Fuerza Empujes (Torso)", 
            date: "2026-06-15", 
            notes: "Calentar bien manguito rotador. Descanso de 2 min entre series pesadas.",
            exercises: [
                { name: "Press de Banca Plano", series: 4, reps: "8", weight: "65" },
                { name: "Press Militar Barra", series: 4, reps: "6", weight: "40" },
                { name: "Aperturas Mancuernas", series: 3, reps: "12", weight: "14" },
                { name: "Extensiones Tríceps Polea", series: 3, reps: "15", weight: "20" }
            ] 
        },
        { 
            id: "w2", 
            clientId: "c1", 
            title: "Fuerza Tracciones (Espalda/Bíceps)", 
            date: "2026-06-17", 
            notes: "Foco en la contracción escapular en remo y tracciones verticales.",
            exercises: [
                { name: "Dominadas Lastradas", series: 4, reps: "6", weight: "10" },
                { name: "Remo con Barra", series: 4, reps: "8", weight: "55" },
                { name: "Pullover Polea Alta", series: 3, reps: "12", weight: "25" },
                { name: "Curl de Bíceps Alterno", series: 3, reps: "12", weight: "12" }
            ] 
        },
        { 
            id: "w3", 
            clientId: "c1", 
            title: "Fuerza Pierna Enfoque Cuádriceps", 
            date: "2026-06-19", 
            notes: "Mantener el torso lo más vertical posible en las sentadillas.",
            exercises: [
                { name: "Sentadilla Trasera Barra", series: 4, reps: "6", weight: "90" },
                { name: "Prensa Inclinada", series: 4, reps: "10", weight: "160" },
                { name: "Extensiones Cuádriceps", series: 3, reps: "15", weight: "45" },
                { name: "Zancadas Búlgaras Mancuernas", series: 3, reps: "10", weight: "16" }
            ] 
        },
        // Workouts for María (c2)
        { 
            id: "w4", 
            clientId: "c2", 
            title: "Fullbody Tono & Fuerza", 
            date: "2026-06-16", 
            notes: "Circuito dinámico. Controlar respiración en CORE.",
            exercises: [
                { name: "Sentadilla Goblet", series: 3, reps: "12", weight: "20" },
                { name: "Flexiones de Brazos", series: 3, reps: "10", weight: "0" },
                { name: "Peso Muerto Rumano Mancuernas", series: 3, reps: "12", weight: "16" },
                { name: "Remo Mancuerna a una mano", series: 3, reps: "12", weight: "12" },
                { name: "Plancha Abdominal", series: 3, reps: "45s", weight: "0" }
            ] 
        }
    ],
    invoices: [
        { id: "i_aitor_1", clientId: "c_aitor", concept: "Mensualidad de Prueba Junio 2026", amount: 150, date: "2026-06-01", status: "paid" },
        { id: "i1", clientId: "c1", concept: "Mensualidad Mayo 2026", amount: 150, date: "2026-05-01", status: "paid" },
        { id: "i2", clientId: "c1", concept: "Mensualidad Junio 2026", amount: 150, date: "2026-06-01", status: "pending" },
        { id: "i3", clientId: "c2", concept: "Mensualidad Junio 2026", amount: 150, date: "2026-06-01", status: "paid" },
        { id: "i4", clientId: "c3", concept: "Entrenamiento Personalizado Trimestre", amount: 400, date: "2026-06-05", status: "pending" }
    ],
    progress: [
        // Progress logs for Aitor (c_aitor)
        { id: "p_aitor_1", clientId: "c_aitor", date: "2026-06-01", exercise: "Press de Banca Plano", weight: 65, reps: 8, rpe: 8, notes: "Buen ritmo" },
        { id: "p_aitor_2", clientId: "c_aitor", date: "2026-06-08", exercise: "Press de Banca Plano", weight: 67.5, reps: 8, rpe: 8, notes: "Excelente control" },
        { id: "p_aitor_3", clientId: "c_aitor", date: "2026-06-15", exercise: "Press de Banca Plano", weight: 70, reps: 8, rpe: 8.5, notes: "Récord personal de prueba" },
        // Progress logs for Juan (c1) - Press de Banca
        { id: "p1", clientId: "c1", date: "2026-05-15", exercise: "Press de Banca Plano", weight: 60, reps: 8, rpe: 8, notes: "Buen control" },
        { id: "p2", clientId: "c1", date: "2026-05-22", exercise: "Press de Banca Plano", weight: 62.5, reps: 8, rpe: 8.5, notes: "Última rep costó un poco" },
        { id: "p3", clientId: "c1", date: "2026-06-01", exercise: "Press de Banca Plano", weight: 62.5, reps: 10, rpe: 8, notes: "Excelente" },
        { id: "p4", clientId: "c1", date: "2026-06-08", exercise: "Press de Banca Plano", weight: 65, reps: 8, rpe: 9, notes: "Nueva RM de repeticiones" },
        // Progress logs for Juan (c1) - Sentadilla
        { id: "p5", clientId: "c1", date: "2026-05-12", exercise: "Sentadilla Trasera Barra", weight: 80, reps: 6, rpe: 7.5, notes: "Rodillas firmes" },
        { id: "p6", clientId: "c1", date: "2026-05-19", exercise: "Sentadilla Trasera Barra", weight: 85, reps: 6, rpe: 8, notes: "Buena profundidad" },
        { id: "p7", clientId: "c1", date: "2026-06-05", exercise: "Sentadilla Trasera Barra", weight: 90, reps: 6, rpe: 8.5, notes: "Gran entreno" }
    ]
};

// Database utility class
class AppDatabase {
    static init() {
        if (!localStorage.getItem("trainer_db")) {
            localStorage.setItem("trainer_db", JSON.stringify(DEFAULT_STATE));
        } else {
            // Asegurar que Aitor esté en la base de datos si ya existía antes en LocalStorage
            const db = JSON.parse(localStorage.getItem("trainer_db"));
            const hasAitor = db.clients.some(c => c.email.toLowerCase() === "aitordorronsoro@gmail.com");
            if (!hasAitor) {
                db.clients.unshift({
                    id: "c_aitor",
                    name: "Aitor",
                    lastName: "Dorronsoro",
                    email: "aitordorronsoro@gmail.com",
                    phone: "674501115",
                    dateCreated: "2026-06-16"
                });
                
                // Añadir datos de prueba iniciales para Aitor
                db.workouts.unshift({ 
                    id: "w_aitor_1", 
                    clientId: "c_aitor", 
                    title: "Fuerza y Acondicionamiento A", 
                    date: "2026-06-16", 
                    notes: "¡Sesión de prueba programada para hoy! Centrarse en la técnica y calentar de forma progresiva.",
                    exercises: [
                        { name: "Sentadilla Trasera Barra", series: 4, reps: "6", weight: "85" },
                        { name: "Press de Banca Plano", series: 4, reps: "8", weight: "70" },
                        { name: "Dominadas Lastradas", series: 3, reps: "8", weight: "10" }
                    ] 
                });

                db.invoices.unshift({ 
                    id: "i_aitor_1", 
                    clientId: "c_aitor", 
                    concept: "Mensualidad de Prueba Junio 2026", 
                    amount: 150, 
                    date: "2026-06-01", 
                    status: "paid" 
                });

                db.progress.unshift(
                    { id: "p_aitor_1", clientId: "c_aitor", date: "2026-06-01", exercise: "Press de Banca Plano", weight: 65, reps: 8, rpe: 8, notes: "Buen ritmo" },
                    { id: "p_aitor_2", clientId: "c_aitor", date: "2026-06-08", exercise: "Press de Banca Plano", weight: 67.5, reps: 8, rpe: 8, notes: "Excelente control" },
                    { id: "p_aitor_3", clientId: "c_aitor", date: "2026-06-15", exercise: "Press de Banca Plano", weight: 70, reps: 8, rpe: 8.5, notes: "Récord personal de prueba" }
                );

                localStorage.setItem("trainer_db", JSON.stringify(db));
            }
        }
    }

    static get() {
        this.init();
        return JSON.parse(localStorage.getItem("trainer_db"));
    }

    static save(data) {
        localStorage.setItem("trainer_db", JSON.stringify(data));
    }

    static addClient(client) {
        const db = this.get();
        db.clients.push(client);
        this.save(db);
    }

    static deleteClient(clientId) {
        const db = this.get();
        db.clients = db.clients.filter(c => c.id !== clientId);
        // Also cascade delete their workouts, invoices and progress to keep DB clean
        db.workouts = db.workouts.filter(w => w.clientId !== clientId);
        db.invoices = db.invoices.filter(i => i.clientId !== clientId);
        db.progress = db.progress.filter(p => p.clientId !== clientId);
        this.save(db);
    }

    static addWorkout(workout) {
        const db = this.get();
        db.workouts.push(workout);
        this.save(db);
    }

    static deleteWorkout(workoutId) {
        const db = this.get();
        db.workouts = db.workouts.filter(w => w.id !== workoutId);
        this.save(db);
    }

    static addInvoice(invoice) {
        const db = this.get();
        db.invoices.push(invoice);
        this.save(db);
    }

    static toggleInvoiceStatus(invoiceId) {
        const db = this.get();
        const invoice = db.invoices.find(i => i.id === invoiceId);
        if (invoice) {
            invoice.status = invoice.status === "paid" ? "pending" : "paid";
            this.save(db);
            return invoice;
        }
        return null;
    }

    static deleteInvoice(invoiceId) {
        const db = this.get();
        db.invoices = db.invoices.filter(i => i.id !== invoiceId);
        this.save(db);
    }

    static addProgress(log) {
        const db = this.get();
        db.progress.push(log);
        this.save(db);
    }
}

// App State Model
const AppState = {
    currentUser: null,  // { id, role: 'admin'|'client', name, email, phone }
    activeView: 'dashboard',
    currentCalendarDate: new Date(),
    selectedCalendarDate: new Date(),
    progressChart: null
};

// Quotes Generator
const MOTIVATIONAL_QUOTES = [
    "El único entrenamiento malo es el que no se hizo.",
    "La fuerza no viene de la capacidad física, sino de una voluntad indomable.",
    "Tu cuerpo puede soportar casi cualquier cosa, es a tu mente a la que tienes que convencer.",
    "No te compares con los demás. Compárate con la persona que eras ayer.",
    "La disciplina es hacer lo que debes hacer, incluso cuando no quieres hacerlo.",
    "Cada entrenamiento cuenta. Escribe tu historia repetición tras repetición.",
    "Tus límites actuales están esperando a ser superados.",
    "Ciencia, constancia y sudor. No hay secretos ni atajos hacia el éxito."
];

// Entry point on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    AppDatabase.init();
    checkAuthSession();
    setupEventListeners();
    updateGlobalDate();
});

// Update global header date
function updateGlobalDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = new Date().toLocaleDateString('es-ES', options);
    document.querySelectorAll(".current-date-span").forEach(el => {
        el.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    });
}

// Global UI Toast Notifications
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "circle-check";
    if (type === "error") icon = "circle-alert";
    if (type === "info") icon = "info";

    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto remove
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s forwards";
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3500);
}

// AUTHENTICATION LOGIC
function checkAuthSession() {
    const session = sessionStorage.getItem("trainer_session");
    if (session) {
        AppState.currentUser = JSON.parse(session);
        renderAuthenticatedLayout();
    } else {
        renderLoginView();
    }
}

function handleLogin(email, password, role) {
    if (!email || !password) {
        showToast("Por favor, introduce tu email y contraseña.", "error");
        return;
    }

    const db = AppDatabase.get();

    if (role === "admin") {
        if ((email.toLowerCase() === "admin@entrenador.com" && password === "admin123") || 
            (email.toLowerCase() === "aitordorronsoro@gmail.com" && password === "674501115")) {
            
            const adminAvatar = (db.adminProfile && db.adminProfile.avatar) ? db.adminProfile.avatar : "";
            AppState.currentUser = {
                id: "admin",
                role: "admin",
                name: "Aitor Dorronsoro",
                email: email.toLowerCase(),
                avatar: adminAvatar
            };
            sessionStorage.setItem("trainer_session", JSON.stringify(AppState.currentUser));
            showToast("¡Bienvenido, Aitor! Sesión de administrador iniciada.");
            renderAuthenticatedLayout();
        } else {
            showToast("Credenciales de administrador incorrectas.", "error");
        }
    } else {
        // Client login
        const client = db.clients.find(c => c.email.toLowerCase() === email.toLowerCase() && c.phone.trim() === password.trim());
        
        if (client) {
            AppState.currentUser = {
                id: client.id,
                role: "client",
                name: `${client.name} ${client.lastName}`,
                email: client.email,
                phone: client.phone,
                avatar: client.avatar || ""
            };
            sessionStorage.setItem("trainer_session", JSON.stringify(AppState.currentUser));
            showToast(`¡Hola ${client.name}! Sesión de cliente iniciada.`);
            renderAuthenticatedLayout();
        } else {
            showToast("Usuario (email) o contraseña (teléfono) incorrectos.", "error");
        }
    }
}

function handleLogout() {
    sessionStorage.removeItem("trainer_session");
    AppState.currentUser = null;
    AppState.activeView = 'dashboard';
    
    // Reset view visibility
    document.getElementById("app-container").style.display = "none";
    document.getElementById("login-container").style.display = "flex";
    
    showToast("Has cerrado la sesión correctamente.", "info");
    renderLoginView();
}

// RENDERING FUNCTIONS
function renderLoginView() {
    document.getElementById("app-container").style.display = "none";
    const loginContainer = document.getElementById("login-container");
    loginContainer.style.display = "flex";
    loginContainer.innerHTML = `
        <div class="login-bg-carousel">
            <div class="slide-track">
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_Gym_1_opt.jpg')"></div>
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_Gym_5_opt.jpg')"></div>
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_gym_4_opt.jpg')"></div>
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_Gym_3_opt.jpg')"></div>
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_Gym_2_opt.jpg')"></div>
                <div class="slide-image" style="background-image: url('Im%C3%A1genes/Foto_Gym_1_opt.jpg')"></div>
            </div>
            <div class="login-bg-overlay"></div>
        </div>
        
        <div class="login-card">
            <div class="login-logo">
                <i data-lucide="dumbbell"></i>
                <h1>AITOR DORRONSORO</h1>
                <p>Plataforma de Entrenamiento Personal</p>
            </div>
            
            <div class="login-type-switch">
                <button type="button" class="login-type-btn active" id="btn-login-client" onclick="setLoginRole('client')">Cliente</button>
                <button type="button" class="login-type-btn" id="btn-login-admin" onclick="setLoginRole('admin')">Administrador</button>
            </div>

            <form id="login-form">
                <input type="hidden" id="login-role" value="client">
                
                <div class="form-group">
                    <label id="label-email" for="login-email">Correo Electrónico</label>
                    <div class="input-wrapper">
                        <input type="email" id="login-email" class="form-input" placeholder="ejemplo@correo.com" required>
                        <i data-lucide="mail"></i>
                    </div>
                </div>

                <div class="form-group">
                    <label id="label-password" for="login-password">Contraseña (Teléfono)</label>
                    <div class="input-wrapper">
                        <input type="password" id="login-password" class="form-input" placeholder="Tu número de teléfono registrado" required>
                        <i data-lucide="lock"></i>
                    </div>
                </div>

                <button type="submit" class="btn-primary" style="margin-top: 1.5rem;">
                    <span>Entrar</span>
                    <i data-lucide="log-in"></i>
                </button>
            </form>
        </div>
    `;
    lucide.createIcons();

    // Login Form Submit handler
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const role = document.getElementById("login-role").value;
        handleLogin(email, password, role);
    });
}

// Switch Login Roles in Login View
window.setLoginRole = function(role) {
    document.getElementById("login-role").value = role;
    const clientBtn = document.getElementById("btn-login-client");
    const adminBtn = document.getElementById("btn-login-admin");
    const emailLabel = document.getElementById("label-email");
    const passLabel = document.getElementById("label-password");
    const passInput = document.getElementById("login-password");

    if (role === "admin") {
        clientBtn.classList.remove("active");
        adminBtn.classList.add("active");
        emailLabel.textContent = "Email de Administrador";
        passLabel.textContent = "Contraseña";
        passInput.placeholder = "••••••••";
    } else {
        clientBtn.classList.add("active");
        adminBtn.classList.remove("active");
        emailLabel.textContent = "Correo Electrónico";
        passLabel.textContent = "Contraseña (Teléfono)";
        passInput.placeholder = "Tu número de teléfono registrado";
    }
};

function renderAuthenticatedLayout() {
    document.getElementById("login-container").style.display = "none";
    const appContainer = document.getElementById("app-container");
    appContainer.style.display = "grid";
    
    // Draw Sidebar and View Layout depending on role
    const isAdmin = AppState.currentUser.role === "admin";
    
    // 1. Sidebar HTML
    let menuHTML = "";
    if (isAdmin) {
        menuHTML = `
            <li class="menu-item active" data-view="dashboard">
                <a href="#" onclick="switchView('dashboard')">
                    <i data-lucide="layout-dashboard"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li class="menu-item" data-view="clients">
                <a href="#" onclick="switchView('clients')">
                    <i data-lucide="users"></i>
                    <span>Clientes</span>
                </a>
            </li>
            <li class="menu-item" data-view="workouts">
                <a href="#" onclick="switchView('workouts')">
                    <i data-lucide="dumbbell"></i>
                    <span>Entrenamientos</span>
                </a>
            </li>
            <li class="menu-item" data-view="exercises">
                <a href="#" onclick="switchView('exercises')">
                    <i data-lucide="dumbbell"></i>
                    <span>Ejercicios</span>
                </a>
            </li>
            <li class="menu-item" data-view="invoices">
                <a href="#" onclick="switchView('invoices')">
                    <i data-lucide="receipt"></i>
                    <span>Facturas</span>
                </a>
            </li>
        `;
    } else {
        menuHTML = `
            <li class="menu-item active" data-view="dashboard">
                <a href="#" onclick="switchView('dashboard')">
                    <i data-lucide="layout-dashboard"></i>
                    <span>Mi Panel</span>
                </a>
            </li>
            <li class="menu-item" data-view="calendar">
                <a href="#" onclick="switchView('calendar')">
                    <i data-lucide="calendar"></i>
                    <span>Calendario</span>
                </a>
            </li>
            <li class="menu-item" data-view="exercises">
                <a href="#" onclick="switchView('exercises')">
                    <i data-lucide="dumbbell"></i>
                    <span>Ejercicios</span>
                </a>
            </li>
            <li class="menu-item" data-view="progress">
                <a href="#" onclick="switchView('progress')">
                    <i data-lucide="trending-up"></i>
                    <span>Progreso Fuerza</span>
                </a>
            </li>
            <li class="menu-item" data-view="invoices">
                <a href="#" onclick="switchView('invoices')">
                    <i data-lucide="receipt"></i>
                    <span>Mis Facturas</span>
                </a>
            </li>
        `;
    }

    // Load Sidebar Initials
    const initials = AppState.currentUser.name
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    appContainer.innerHTML = `
        <aside>
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <i data-lucide="dumbbell"></i>
                    <span>${isAdmin ? "DorronMethod Admin" : "DorronMethod"}</span>
                </div>
                <button class="sidebar-toggle" onclick="toggleSidebar()">
                    <i data-lucide="menu"></i>
                </button>
            </div>
            
            <ul class="sidebar-menu">
                ${menuHTML}
            </ul>

            <div class="sidebar-footer">
                <div class="user-profile-widget" onclick="switchView('profile')" style="cursor: pointer;" title="Ver mi perfil">
                    <div id="sidebar-avatar-box">
                        <!-- Rellenado dinámicamente -->
                    </div>
                    <div class="user-info">
                        <div class="user-name" id="sidebar-user-name" title="${AppState.currentUser.name}">${AppState.currentUser.name}</div>
                        <div class="user-role">${isAdmin ? "Administrador" : "Cliente"}</div>
                    </div>
                </div>
                <button class="logout-btn" onclick="handleLogout()">
                    <i data-lucide="log-out"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
        
        <main>
            <header>
                <button class="sidebar-toggle-mobile" onclick="toggleMobileSidebar()">
                    <i data-lucide="menu"></i>
                </button>
                <div class="page-title">
                    <h2 id="header-view-title">Dashboard</h2>
                </div>
                <div class="header-actions">
                    <div class="current-date">
                        <i data-lucide="calendar-days"></i>
                        <span class="current-date-span">Lunes, 15 de Junio de 2026</span>
                    </div>
                </div>
            </header>
            
            <div class="content-area">
                <!-- VIEW WRAPPERS -->
                <div id="view-dashboard" class="view-section active"></div>
                <div id="view-clients" class="view-section"></div>
                <div id="view-workouts" class="view-section"></div>
                <div id="view-calendar" class="view-section"></div>
                <div id="view-exercises" class="view-section"></div>
                <div id="view-progress" class="view-section"></div>
                <div id="view-invoices" class="view-section"></div>
                <div id="view-profile" class="view-section"></div>
            </div>
        </main>
        
        <!-- GLOBAL MODALS CONTAINER -->
        <div id="modal-container" class="modal-overlay"></div>
    `;

    lucide.createIcons();
    updateSidebarFooter();
    
    // Switch to default starting view
    switchView('dashboard');
}

// Toggle desktop sidebar
window.toggleSidebar = function() {
    document.getElementById("app-container").classList.toggle("sidebar-collapsed");
};

// Toggle mobile sidebar
window.toggleMobileSidebar = function() {
    document.getElementById("app-container").classList.toggle("sidebar-open");
};

// Global Routing
window.switchView = function(viewName) {
    AppState.activeView = viewName;
    
    // Close sidebar on mobile if open
    document.getElementById("app-container").classList.remove("sidebar-open");

    // Toggle active menu items
    document.querySelectorAll(".sidebar-menu .menu-item").forEach(item => {
        if (item.getAttribute("data-view") === viewName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Toggle active section containers
    document.querySelectorAll(".view-section").forEach(sec => {
        sec.classList.remove("active");
    });
    
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) targetSection.classList.add("active");

    // Set Header Title
    let headerTitle = "Dashboard";
    if (viewName === "clients") headerTitle = "Gestión de Clientes";
    if (viewName === "workouts") headerTitle = AppState.currentUser.role === "admin" ? "Programación de Entrenamientos" : "Mis Entrenamientos";
    if (viewName === "calendar") headerTitle = "Calendario de Sesiones";
    if (viewName === "exercises") headerTitle = "Biblioteca de Ejercicios";
    if (viewName === "progress") headerTitle = "Progreso de Fuerza";
    if (viewName === "invoices") headerTitle = AppState.currentUser.role === "admin" ? "Facturación y Cobros" : "Mis Facturas";
    if (viewName === "profile") headerTitle = "Mi Perfil Personal";
    
    document.getElementById("header-view-title").textContent = headerTitle;

    // Render corresponding view contents
    if (AppState.currentUser.role === "admin") {
        renderAdminView(viewName);
    } else {
        renderClientView(viewName);
    }
};

// ==========================================================================
// ADMIN PANEL VIEW CONTROLLERS
// ==========================================================================

function renderAdminView(viewName) {
    const container = document.getElementById(`view-${viewName}`);
    const db = AppDatabase.get();

    if (viewName === "dashboard") {
        // Calculation stats
        const totalClients = db.clients.length;
        
        let totalPaid = 0;
        let totalPending = 0;
        db.invoices.forEach(inv => {
            if (inv.status === "paid") totalPaid += inv.amount;
            else totalPending += inv.amount;
        });

        const totalWorkouts = db.workouts.length;

        // Fetch recent pending invoices
        const recentPending = db.invoices
            .filter(i => i.status === "pending")
            .slice(-4)
            .reverse();

        container.innerHTML = `
            <div class="stats-grid">
                <div class="glass-card stat-card" onclick="switchView('clients')" style="cursor: pointer;" title="Gestionar Clientes">
                    <div class="stat-details">
                        <h3>Clientes Activos</h3>
                        <div class="stat-value">${totalClients}</div>
                    </div>
                    <div class="stat-icon-box lime">
                        <i data-lucide="users"></i>
                    </div>
                </div>
                <div class="glass-card stat-card" onclick="switchView('invoices')" style="cursor: pointer;" title="Gestionar Facturas y Cobros">
                    <div class="stat-details">
                        <h3>Ingresos Cobrados</h3>
                        <div class="stat-value" style="color: var(--accent-emerald)">${totalPaid}€</div>
                    </div>
                    <div class="stat-icon-box emerald">
                        <i data-lucide="badge-euro"></i>
                    </div>
                </div>
                <div class="glass-card stat-card" onclick="switchView('invoices')" style="cursor: pointer;" title="Ver Cobros Pendientes">
                    <div class="stat-details">
                        <h3>Pendiente de Pago</h3>
                        <div class="stat-value" style="color: var(--status-pending)">${totalPending}€</div>
                    </div>
                    <div class="stat-icon-box amber">
                        <i data-lucide="receipt"></i>
                    </div>
                </div>
                <div class="glass-card stat-card" onclick="switchView('workouts')" style="cursor: pointer;" title="Programar y Ver Sesiones">
                    <div class="stat-details">
                        <h3>Sesiones Planificadas</h3>
                        <div class="stat-value">${totalWorkouts}</div>
                    </div>
                    <div class="stat-icon-box lime">
                        <i data-lucide="calendar-check-2"></i>
                    </div>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="users"></i> Directorio Rápido de Clientes</h3>
                        <button class="btn-secondary" onclick="switchView('clients')">Ver Todos</button>
                    </div>
                    <div class="table-responsive">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${db.clients.slice(0, 4).map(c => `
                                    <tr>
                                        <td>
                                            <div class="client-row-avatar">
                                                <div class="avatar">${c.name[0]}${c.lastName[0]}</div>
                                                <span>${c.name} ${c.lastName}</span>
                                            </div>
                                        </td>
                                        <td>${c.email}</td>
                                        <td>${c.phone}</td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="action-btn" title="Ver Entrenamientos" onclick="goToClientWorkouts('${c.id}')"><i data-lucide="dumbbell"></i></button>
                                                <button class="action-btn" title="Ver Facturas" onclick="goToClientInvoices('${c.id}')"><i data-lucide="receipt"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join("")}
                                ${db.clients.length === 0 ? `<tr><td colspan="4" class="empty-state"><p>No hay clientes registrados.</p></td></tr>` : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="clock"></i> Cobros Pendientes</h3>
                    </div>
                    <div class="workout-exercises-list">
                        ${recentPending.map(inv => {
                            const client = db.clients.find(c => c.id === inv.clientId) || { name: "Cliente", lastName: "Eliminado" };
                            return `
                                <div class="workout-exercise-item" style="padding: 10px 14px;">
                                    <div class="exercise-name-meta">
                                        <h5 style="font-size:0.875rem;">${client.name} ${client.lastName}</h5>
                                        <p style="font-size:0.75rem;">${inv.concept}</p>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-weight: 700; color: var(--status-pending);">${inv.amount}€</div>
                                        <button class="btn-primary" style="padding: 2px 6px; font-size: 0.75rem; border-radius: 4px; margin-top: 4px;" onclick="quickMarkPaid('${inv.id}')">Cobrar</button>
                                    </div>
                                </div>
                            `;
                        }).join("")}
                        ${recentPending.length === 0 ? `
                            <div class="empty-state" style="padding: 1.5rem 0;">
                                <i data-lucide="check-circle" style="font-size: 1.5rem; color: var(--accent-emerald)"></i>
                                <p style="font-size: 0.85rem; margin-top: 0.5rem;">¡Al día! No hay facturas pendientes.</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    else if (viewName === "clients") {
        container.innerHTML = `
            <div class="action-bar">
                <div class="search-wrapper">
                    <i data-lucide="search"></i>
                    <input type="text" id="client-search" class="search-input" placeholder="Buscar por nombre o email..." oninput="filterClientTable()">
                </div>
                <button class="btn-primary" onclick="openAddClientModal()">
                    <i data-lucide="plus"></i>
                    <span>Nuevo Cliente</span>
                </button>
            </div>
            
            <div class="glass-card">
                <div class="table-responsive">
                    <table class="custom-table" id="clients-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email (Usuario)</th>
                                <th>Teléfono (Contraseña)</th>
                                <th>Fecha Alta</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="clients-table-body">
                            ${db.clients.map(c => `
                                <tr data-search="${c.name.toLowerCase()} ${c.lastName.toLowerCase()} ${c.email.toLowerCase()}">
                                    <td>
                                        <div class="client-row-avatar">
                                            <div class="avatar">${c.name[0]}${c.lastName[0]}</div>
                                            <strong>${c.name} ${c.lastName}</strong>
                                        </div>
                                    </td>
                                    <td>${c.email}</td>
                                    <td><code>${c.phone}</code></td>
                                    <td>${new Date(c.dateCreated).toLocaleDateString('es-ES')}</td>
                                    <td>
                                        <div class="table-actions">
                                            <button class="action-btn" title="Asignar Entrenamientos" onclick="goToClientWorkouts('${c.id}')"><i data-lucide="dumbbell"></i></button>
                                            <button class="action-btn" title="Enviar Facturas" onclick="goToClientInvoices('${c.id}')"><i data-lucide="receipt"></i></button>
                                            <button class="action-btn delete" title="Eliminar Cliente" onclick="confirmDeleteClient('${c.id}', '${c.name} ${c.lastName}')"><i data-lucide="trash-2"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `).join("")}
                            ${db.clients.length === 0 ? `<tr><td colspan="5" class="empty-state"><i data-lucide="users"></i><p>Aún no has agregado ningún cliente.</p></td></tr>` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    else if (viewName === "workouts") {
        const selectedClientId = container.getAttribute("data-selected-client-id") || (db.clients.length > 0 ? db.clients[0].id : "");
        container.setAttribute("data-selected-client-id", selectedClientId);

        const clientWorkouts = db.workouts.filter(w => w.clientId === selectedClientId).sort((a, b) => new Date(b.date) - new Date(a.date));

        let clientSelectorHTML = `
            <div class="form-group" style="max-width: 300px; margin-bottom: 0;">
                <label for="workout-client-filter">Seleccionar Cliente</label>
                <select id="workout-client-filter" class="progress-exercise-filter" style="width: 100%;" onchange="changeAdminWorkoutClient(this.value)">
                    ${db.clients.map(c => `<option value="${c.id}" ${c.id === selectedClientId ? 'selected' : ''}>${c.name} ${c.lastName}</option>`).join("")}
                </select>
            </div>
        `;

        container.innerHTML = `
            <div class="action-bar">
                ${db.clients.length > 0 ? clientSelectorHTML : '<p class="text-secondary">Debes crear un cliente primero para gestionar entrenamientos.</p>'}
                ${db.clients.length > 0 ? `
                    <button class="btn-primary" onclick="openAddWorkoutModal('${selectedClientId}')">
                        <i data-lucide="plus"></i>
                        <span>Programar Sesión</span>
                    </button>
                ` : ''}
            </div>

            ${db.clients.length > 0 ? `
                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="calendar"></i> Historial de Sesiones Programadas</h3>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Sesión</th>
                                    <th>Ejercicios</th>
                                    <th>Observaciones</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${clientWorkouts.map(w => `
                                    <tr>
                                        <td><strong>${new Date(w.date).toLocaleDateString('es-ES')}</strong></td>
                                        <td><span style="color: var(--accent-lime); font-weight:600;">${w.title}</span></td>
                                        <td>
                                            <div style="font-size:0.85rem; color: var(--text-secondary);">
                                                ${w.exercises.map(e => `${e.name} (${e.series}x${e.reps})`).join(", ")}
                                            </div>
                                        </td>
                                        <td><span style="font-size:0.85rem; max-width:250px; display:inline-block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${w.notes || ''}">${w.notes || 'Sin notas'}</span></td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="action-btn" title="Detalle" onclick="openWorkoutDetailsModal('${w.id}')"><i data-lucide="eye"></i></button>
                                                <button class="action-btn delete" title="Eliminar" onclick="deleteWorkout('${w.id}')"><i data-lucide="trash-2"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join("")}
                                ${clientWorkouts.length === 0 ? `
                                    <tr>
                                        <td colspan="5" class="empty-state">
                                            <i data-lucide="dumbbell"></i>
                                            <p>No hay sesiones programadas para este cliente.</p>
                                        </td>
                                    </tr>
                                ` : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
        `;
    }

    else if (viewName === "invoices") {
        const selectedClientId = container.getAttribute("data-selected-client-id") || (db.clients.length > 0 ? db.clients[0].id : "");
        container.setAttribute("data-selected-client-id", selectedClientId);

        const clientInvoices = db.invoices.filter(i => i.clientId === selectedClientId).sort((a, b) => new Date(b.date) - new Date(a.date));

        // Invoice stats for client
        let totalPaid = 0;
        let totalPending = 0;
        clientInvoices.forEach(i => {
            if (i.status === "paid") totalPaid += i.amount;
            else totalPending += i.amount;
        });

        let clientSelectorHTML = `
            <div class="form-group" style="max-width: 300px; margin-bottom: 0;">
                <label for="invoice-client-filter">Seleccionar Cliente</label>
                <select id="invoice-client-filter" class="progress-exercise-filter" style="width: 100%;" onchange="changeAdminInvoiceClient(this.value)">
                    ${db.clients.map(c => `<option value="${c.id}" ${c.id === selectedClientId ? 'selected' : ''}>${c.name} ${c.lastName}</option>`).join("")}
                </select>
            </div>
        `;

        container.innerHTML = `
            <div class="action-bar">
                ${db.clients.length > 0 ? clientSelectorHTML : '<p class="text-secondary">Debes crear un cliente primero para gestionar facturas.</p>'}
                ${db.clients.length > 0 ? `
                    <button class="btn-primary" onclick="openAddInvoiceModal('${selectedClientId}')">
                        <i data-lucide="plus"></i>
                        <span>Nueva Factura</span>
                    </button>
                ` : ''}
            </div>

            ${db.clients.length > 0 ? `
                <div class="invoice-summary-dashboard">
                    <div class="glass-card" style="padding: 1rem 1.25rem;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Total Facturado</span>
                        <div style="font-size: 1.4rem; font-weight: 800; margin-top:0.25rem;">${totalPaid + totalPending}€</div>
                    </div>
                    <div class="glass-card" style="padding: 1rem 1.25rem;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Total Cobrado</span>
                        <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-emerald); margin-top:0.25rem;">${totalPaid}€</div>
                    </div>
                    <div class="glass-card ${totalPending > 0 ? 'balance-alert-glow' : ''}" style="padding: 1rem 1.25rem;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Pendiente de Cobro</span>
                        <div style="font-size: 1.4rem; font-weight: 800; color: var(--status-pending); margin-top:0.25rem;">${totalPending}€</div>
                    </div>
                </div>

                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="receipt"></i> Relación de Facturas</h3>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="custom-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Concepto</th>
                                    <th>Importe</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${clientInvoices.map(i => `
                                    <tr>
                                        <td>${new Date(i.date).toLocaleDateString('es-ES')}</td>
                                        <td><span style="font-weight: 600;">${i.concept}</span></td>
                                        <td><strong>${i.amount}€</strong></td>
                                        <td>
                                            <span class="badge ${i.status === 'paid' ? 'badge-paid' : 'badge-pending'}">
                                                ${i.status === 'paid' ? 'Cobrada' : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="table-actions">
                                                <button class="action-btn" title="Marcar como ${i.status === 'paid' ? 'Pendiente' : 'Cobrada'}" onclick="toggleInvoiceStatus('${i.id}')">
                                                    <i data-lucide="${i.status === 'paid' ? 'rotate-ccw' : 'check'}"></i>
                                                </button>
                                                <button class="action-btn delete" title="Eliminar" onclick="deleteInvoice('${i.id}')"><i data-lucide="trash-2"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join("")}
                                ${clientInvoices.length === 0 ? `
                                    <tr>
                                        <td colspan="5" class="empty-state">
                                            <i data-lucide="receipt"></i>
                                            <p>No hay facturas registradas para este cliente.</p>
                                        </td>
                                    </tr>
                                ` : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            ` : ''}
        `;
    }
    
    else if (viewName === "exercises") {
        renderExerciseLibraryView(container);
    }
    
    else if (viewName === "profile") {
        renderProfileView(container);
    }

    lucide.createIcons();
}

// Redirect helpers for quick admin dashboard usage
window.goToClientWorkouts = function(clientId) {
    document.getElementById("view-workouts").setAttribute("data-selected-client-id", clientId);
    switchView("workouts");
};

window.goToClientInvoices = function(clientId) {
    document.getElementById("view-invoices").setAttribute("data-selected-client-id", clientId);
    switchView("invoices");
};

window.changeAdminWorkoutClient = function(clientId) {
    document.getElementById("view-workouts").setAttribute("data-selected-client-id", clientId);
    renderAdminView("workouts");
};

window.changeAdminInvoiceClient = function(clientId) {
    document.getElementById("view-invoices").setAttribute("data-selected-client-id", clientId);
    renderAdminView("invoices");
};

// Filter clients table
window.filterClientTable = function() {
    const q = document.getElementById("client-search").value.toLowerCase();
    const rows = document.querySelectorAll("#clients-table-body tr");
    rows.forEach(row => {
        const searchVal = row.getAttribute("data-search");
        if (searchVal && searchVal.includes(q)) {
            row.style.display = "";
        } else if (searchVal) {
            row.style.display = "none";
        }
    });
};

// Quick mark invoice as paid from dashboard
window.quickMarkPaid = function(invoiceId) {
    AppDatabase.toggleInvoiceStatus(invoiceId);
    showToast("Factura cobrada correctamente.");
    renderAdminView("dashboard");
};

// Toggle invoice payment state from list
window.toggleInvoiceStatus = function(invoiceId) {
    const inv = AppDatabase.toggleInvoiceStatus(invoiceId);
    if (inv) {
        showToast(`Factura cambiada a ${inv.status === 'paid' ? 'Cobrada' : 'Pendiente'}.`);
        renderAdminView("invoices");
    }
};

window.deleteInvoice = function(invoiceId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
        AppDatabase.deleteInvoice(invoiceId);
        showToast("Factura eliminada correctamente.");
        renderAdminView("invoices");
    }
};

window.deleteWorkout = function(workoutId) {
    if (confirm("¿Estás seguro de que deseas eliminar esta sesión de entrenamiento?")) {
        AppDatabase.deleteWorkout(workoutId);
        showToast("Entrenamiento eliminado.");
        renderAdminView("workouts");
    }
};

// Add Client Logic
window.openAddClientModal = function() {
    const modal = document.getElementById("modal-container");
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Añadir Nuevo Cliente</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form id="add-client-form">
                <div class="modal-body">
                    <div class="grid-2col">
                        <div class="form-group">
                            <label for="new-name">Nombre</label>
                            <input type="text" id="new-name" class="form-input" placeholder="Nombre" style="padding-left:14px;" required>
                        </div>
                        <div class="form-group">
                            <label for="new-lastname">Apellidos</label>
                            <input type="text" id="new-lastname" class="form-input" placeholder="Apellidos" style="padding-left:14px;" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="new-email">Correo Electrónico (Acceso/Usuario)</label>
                        <input type="email" id="new-email" class="form-input" placeholder="email@ejemplo.com" style="padding-left:14px;" required>
                    </div>
                    <div class="form-group">
                        <label for="new-phone">Teléfono (Contraseña por defecto)</label>
                        <input type="tel" id="new-phone" class="form-input" placeholder="Ej: 600123456" style="padding-left:14px;" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-primary">Registrar Cliente</button>
                </div>
            </form>
        </div>
    `;
    modal.classList.add("active");

    document.getElementById("add-client-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("new-name").value.trim();
        const lastName = document.getElementById("new-lastname").value.trim();
        const email = document.getElementById("new-email").value.trim();
        const phone = document.getElementById("new-phone").value.trim();

        // Unique email check
        const db = AppDatabase.get();
        if (db.clients.some(c => c.email.toLowerCase() === email.toLowerCase())) {
            showToast("Ya existe un cliente registrado con ese correo electrónico.", "error");
            return;
        }

        const newClient = {
            id: "c_" + Date.now(),
            name,
            lastName,
            email,
            phone,
            dateCreated: new Date().toISOString().split('T')[0]
        };

        AppDatabase.addClient(newClient);
        showToast(`Cliente ${name} ${lastName} registrado con éxito.`);
        closeModal();
        renderAdminView("clients");
    });
};

window.confirmDeleteClient = function(clientId, clientName) {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${clientName}? Se borrarán también sus entrenamientos, facturas e historial.`)) {
        AppDatabase.deleteClient(clientId);
        showToast("Cliente eliminado correctamente.");
        renderAdminView("clients");
    }
};

// Add Workout Logic
window.openAddWorkoutModal = function(clientId) {
    const modal = document.getElementById("modal-container");
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 650px;">
            <div class="modal-header">
                <h3>Programar Sesión de Entrenamiento</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form id="add-workout-form">
                <div class="modal-body">
                    <div class="grid-2col">
                        <div class="form-group">
                            <label for="workout-title">Nombre de la Sesión</label>
                            <input type="text" id="workout-title" class="form-input" placeholder="Ej: Fuerza Empujes A" style="padding-left:14px;" required>
                        </div>
                        <div class="form-group">
                            <label for="workout-date">Fecha de Programación</label>
                            <input type="date" id="workout-date" class="form-input" style="padding-left:14px;" value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="workout-notes">Indicaciones / Observaciones</label>
                        <textarea id="workout-notes" class="form-input" placeholder="Anotaciones importantes sobre el entrenamiento, calentamiento, RPE..."></textarea>
                    </div>

                    <!-- EXERCISES BUILDER -->
                    <div class="exercises-builder-container">
                        <div class="builder-header">
                            <span class="builder-title">Ejercicios de la Sesión</span>
                            <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="addExerciseRowToBuilder()">
                                <i data-lucide="plus" style="width:14px; height:14px;"></i> Añadir
                            </button>
                        </div>
                        
                        <div class="exercise-list-builder" id="exercise-builder-list">
                            <!-- Rows go here -->
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-primary">Asignar Entrenamiento</button>
                </div>
            </form>
        </div>
    `;
    modal.classList.add("active");
    lucide.createIcons();

    // Populate with 1 default row
    addExerciseRowToBuilder();

    document.getElementById("add-workout-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("workout-title").value.trim();
        const date = document.getElementById("workout-date").value;
        const notes = document.getElementById("workout-notes").value.trim();

        // Extract exercises
        const rows = document.querySelectorAll(".exercise-row-item");
        const exercises = [];
        rows.forEach(row => {
            const name = row.querySelector(".ex-name").value.trim();
            const series = parseInt(row.querySelector(".ex-series").value) || 0;
            const reps = row.querySelector(".ex-reps").value.trim();
            const time = row.querySelector(".ex-time") ? row.querySelector(".ex-time").value.trim() : "";
            const weight = row.querySelector(".ex-weight").value.trim();

            if (name) {
                exercises.push({ name, series, reps, time, weight });
            }
        });

        if (exercises.length === 0) {
            showToast("Debes añadir al menos un ejercicio.", "error");
            return;
        }

        const newWorkout = {
            id: "w_" + Date.now(),
            clientId,
            title,
            date,
            notes,
            exercises
        };

        AppDatabase.addWorkout(newWorkout);
        showToast("Sesión programada con éxito.");
        closeModal();
        renderAdminView("workouts");
    });
};

window.addExerciseRowToBuilder = function() {
    const list = document.getElementById("exercise-builder-list");
    const row = document.createElement("div");
    row.className = "exercise-row-item";
    row.innerHTML = `
        <input type="text" class="form-input ex-name" placeholder="Ejercicio (ej. Sentadilla)" style="padding-left:10px;" required>
        <input type="number" class="form-input ex-series" placeholder="Series" min="1" value="4" style="padding-left:10px;" required>
        <input type="text" class="form-input ex-reps" placeholder="Reps" style="padding-left:10px;">
        <input type="text" class="form-input ex-time" placeholder="Tiempo (ej. 45s)" style="padding-left:10px;">
        <input type="text" class="form-input ex-weight" placeholder="Kg" style="padding-left:10px;">
        <button type="button" class="action-btn delete" onclick="this.parentElement.remove()" style="width:100%; height:36px;"><i data-lucide="trash"></i></button>
    `;
    list.appendChild(row);
    lucide.createIcons();
    list.scrollTop = list.scrollHeight;
};

// Add Invoice Logic
window.openAddInvoiceModal = function(clientId) {
    const modal = document.getElementById("modal-container");
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Emitir Nueva Factura / Pago</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form id="add-invoice-form">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="invoice-concept">Concepto de Pago</label>
                        <input type="text" id="invoice-concept" class="form-input" placeholder="Ej: Mensualidad Junio 2026 / Sesión suelta" style="padding-left:14px;" required>
                    </div>
                    <div class="grid-2col">
                        <div class="form-group">
                            <label for="invoice-amount">Importe (€)</label>
                            <input type="number" id="invoice-amount" class="form-input" placeholder="150" min="1" style="padding-left:14px;" required>
                        </div>
                        <div class="form-group">
                            <label for="invoice-date">Fecha</label>
                            <input type="date" id="invoice-date" class="form-input" style="padding-left:14px;" value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="invoice-status">Estado Inicial</label>
                        <select id="invoice-status" class="progress-exercise-filter" style="width:100%;">
                            <option value="pending">Pendiente de Pago</option>
                            <option value="paid">Pagada / Cobrada</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn-primary">Generar Factura</button>
                </div>
            </form>
        </div>
    `;
    modal.classList.add("active");

    document.getElementById("add-invoice-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const concept = document.getElementById("invoice-concept").value.trim();
        const amount = parseFloat(document.getElementById("invoice-amount").value);
        const date = document.getElementById("invoice-date").value;
        const status = document.getElementById("invoice-status").value;

        const newInvoice = {
            id: "i_" + Date.now(),
            clientId,
            concept,
            amount,
            date,
            status
        };

        AppDatabase.addInvoice(newInvoice);
        showToast("Factura emitida y guardada correctamente.");
        closeModal();
        renderAdminView("invoices");
    });
};

// Details view workout modal for admin & client
window.openWorkoutDetailsModal = function(workoutId) {
    const db = AppDatabase.get();
    const w = db.workouts.find(work => work.id === workoutId);
    if (!w) return;

    const modal = document.getElementById("modal-container");
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Detalle de Entrenamiento</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="workout-title-row" style="margin-top:0;">
                    <h4>${w.title}</h4>
                    <span class="workout-date-badge"><i data-lucide="calendar"></i> ${new Date(w.date).toLocaleDateString('es-ES')}</span>
                </div>
                ${w.notes ? `<div class="workout-notes">${w.notes}</div>` : ''}
                
                <h5 style="margin-bottom:0.75rem; font-size:1rem; font-weight:700;">Ejercicios Asignados</h5>
                <div class="workout-exercises-list">
                    ${w.exercises.map(e => `
                        <div class="workout-exercise-item">
                            <div class="exercise-name-meta">
                                <h5>${e.name}</h5>
                            </div>
                            <div class="exercise-parameters">
                                <span class="parameter-chip">${e.series} series</span>
                                ${e.reps ? `<span class="parameter-chip">${e.reps} reps</span>` : ''}
                                ${e.time ? `<span class="parameter-chip" style="background:rgba(59,130,246,0.08); border-color:rgba(59,130,246,0.2); color:#60a5fa;">${e.time}</span>` : ''}
                                ${e.weight ? `<span class="parameter-chip" style="background:rgba(16,185,129,0.08); border-color:rgba(16,185,129,0.2);">${e.weight} kg</span>` : ''}
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-primary" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;
    modal.classList.add("active");
    lucide.createIcons();
};

window.closeModal = function() {
    document.getElementById("modal-container").classList.remove("active");
};


// ==========================================================================
// CLIENT PANEL VIEW CONTROLLERS
// ==========================================================================

function renderClientView(viewName) {
    const container = document.getElementById(`view-${viewName}`);
    const db = AppDatabase.get();
    const clientId = AppState.currentUser.id;

    if (viewName === "dashboard") {
        // Fetch client specific workouts, progress, invoices
        const clientWorkouts = db.workouts.filter(w => w.clientId === clientId).sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Find next workout (from today onwards)
        const todayStr = new Date().toISOString().split('T')[0];
        const nextWorkout = clientWorkouts.find(w => w.date >= todayStr);

        const clientInvoices = db.invoices.filter(i => i.clientId === clientId);
        let totalPaid = 0;
        let totalPending = 0;
        clientInvoices.forEach(inv => {
            if (inv.status === "paid") totalPaid += inv.amount;
            else totalPending += inv.amount;
        });

        // Calculate day of the year for the 366 quotes list
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const dailyQuote = MOTIVATIONAL_QUOTES_366[dayOfYear % 366] || MOTIVATIONAL_QUOTES_366[0];

        container.innerHTML = `
            <div class="client-hero-banner">
                <div class="hero-message">
                    <h1>¡Hola de nuevo, ${AppState.currentUser.name.split(" ")[0]}! 💪</h1>
                    <p>Listo para tu sesión de entrenamiento. Sigue sumando.</p>
                </div>
                <div class="hero-quote">
                    "${dailyQuote}"
                </div>
            </div>

            <div class="stats-grid">
                <div class="glass-card stat-card" onclick="switchView('calendar')" style="cursor: pointer;" title="Ir al Calendario">
                    <div class="stat-details">
                        <h3>Siguiente Sesión</h3>
                        <div class="stat-value" style="font-size:1.15rem; font-weight:700; color: var(--accent-lime); margin-top:5px;">
                            ${nextWorkout ? `${new Date(nextWorkout.date).toLocaleDateString('es-ES')} - ${nextWorkout.title}` : 'Sin programar'}
                        </div>
                    </div>
                    <div class="stat-icon-box lime">
                        <i data-lucide="dumbbell"></i>
                    </div>
                </div>
                <div class="glass-card stat-card" onclick="switchView('invoices')" style="cursor: pointer;" title="Ver Mis Facturas">
                    <div class="stat-details">
                        <h3>Invertido en Salud</h3>
                        <div class="stat-value" style="color: var(--accent-emerald)">${totalPaid}€</div>
                    </div>
                    <div class="stat-icon-box emerald">
                        <i data-lucide="badge-euro"></i>
                    </div>
                </div>
                <div class="glass-card stat-card ${totalPending > 0 ? 'balance-alert-glow' : ''}" onclick="switchView('invoices')" style="cursor: pointer;" title="Ver Mis Facturas">
                    <div class="stat-details">
                        <h3>Pendiente de Pago</h3>
                        <div class="stat-value" style="color: var(--status-pending)">${totalPending}€</div>
                    </div>
                    <div class="stat-icon-box amber">
                        <i data-lucide="alert-triangle"></i>
                    </div>
                </div>
            </div>

            <div class="dashboard-grid">
                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="dumbbell"></i> Detalle de Próximo Entrenamiento</h3>
                        ${nextWorkout ? `<button class="btn-secondary" onclick="openWorkoutDetailsModal('${nextWorkout.id}')">Ver Completo</button>` : ''}
                    </div>
                    ${nextWorkout ? `
                        <div class="workout-title-row" style="margin-top:0;">
                            <h4>${nextWorkout.title}</h4>
                            <span class="workout-date-badge"><i data-lucide="calendar"></i> ${new Date(nextWorkout.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        ${nextWorkout.notes ? `<div class="workout-notes">${nextWorkout.notes}</div>` : ''}
                        <div class="workout-exercises-list">
                            ${nextWorkout.exercises.slice(0, 3).map(e => `
                                <div class="workout-exercise-item">
                                    <div class="exercise-name-meta">
                                        <h5>${e.name}</h5>
                                    </div>
                                    <div class="exercise-parameters">
                                        <span class="parameter-chip">${e.series} series</span>
                                        ${e.reps ? `<span class="parameter-chip">${e.reps} reps</span>` : ''}
                                        ${e.time ? `<span class="parameter-chip" style="background:rgba(59,130,246,0.08); border-color:rgba(59,130,246,0.2); color:#60a5fa;">${e.time}</span>` : ''}
                                        ${e.weight ? `<span class="parameter-chip" style="background:rgba(198, 244, 56, 0.05);">${e.weight} kg</span>` : ''}
                                    </div>
                                </div>
                            `).join("")}
                            ${nextWorkout.exercises.length > 3 ? `<p style="font-size:0.85rem; text-align:center; color: var(--text-muted);">Y ${nextWorkout.exercises.length - 3} ejercicios más...</p>` : ''}
                        </div>
                    ` : `
                        <div class="empty-state">
                            <i data-lucide="dumbbell"></i>
                            <p>No tienes entrenamientos planificados para hoy o días futuros.</p>
                        </div>
                    `}
                </div>

                <div class="glass-card balance-widget">
                    <div class="section-card-header">
                        <h3><i data-lucide="wallet"></i> Estado de Cuenta</h3>
                    </div>
                    <div style="text-align: center; padding: 1.5rem 0;">
                        <span style="font-size: 0.85rem; color: var(--text-secondary);">SALDO PENDIENTE</span>
                        <div style="font-size: 2.8rem; font-weight: 800; color: ${totalPending > 0 ? 'var(--status-pending)' : 'var(--accent-emerald)'}; margin: 10px 0;">
                            ${totalPending}€
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); line-height:1.4;">
                            ${totalPending > 0 ? 'Tienes facturas pendientes de abono. Puedes consultar los detalles en la pestaña de facturas.' : '¡Tu cuenta está completamente al día! Gracias.'}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    else if (viewName === "calendar") {
        container.innerHTML = `
            <div class="calendar-layout">
                <div class="calendar-widget">
                    <div class="calendar-header">
                        <button class="calendar-nav-btn" onclick="navigateCalendarMonth(-1)"><i data-lucide="chevron-left"></i></button>
                        <span class="calendar-month-title" id="calendar-month-title">Junio 2026</span>
                        <button class="calendar-nav-btn" onclick="navigateCalendarMonth(1)"><i data-lucide="chevron-right"></i></button>
                    </div>
                    <div class="calendar-grid" id="calendar-grid-cells">
                        <!-- Filled by JS -->
                    </div>
                </div>
                
                <div class="glass-card" id="calendar-workout-details">
                    <div class="empty-state">
                        <i data-lucide="info"></i>
                        <p>Selecciona un día en el calendario que tenga un punto <span style="color:var(--accent-emerald)">●</span> para ver los ejercicios de esa sesión.</p>
                    </div>
                </div>
            </div>
        `;
        renderCalendarGrid();
    }

    else if (viewName === "progress") {
        const clientProgress = db.progress.filter(p => p.clientId === clientId);
        
        // Distinct exercises list for dropdown
        const exercisesList = [...new Set(clientProgress.map(p => p.exercise))];
        if (exercisesList.length === 0) exercisesList.push("Prensa Inclinada", "Sentadilla Trasera Barra", "Press de Banca Plano", "Peso Muerto");

        const selectedExercise = container.getAttribute("data-selected-exercise") || exercisesList[0];
        container.setAttribute("data-selected-exercise", selectedExercise);

        container.innerHTML = `
            <div class="progress-layout">
                <div class="glass-card chart-card">
                    <div class="section-card-header" style="flex-wrap: wrap; gap:1rem;">
                        <h3><i data-lucide="trending-up"></i> Gráfico de Progreso</h3>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            <label for="progress-exercise-filter" style="font-size:0.85rem; color:var(--text-secondary);">Ejercicio:</label>
                            <select id="progress-exercise-filter" class="progress-exercise-filter" onchange="changeProgressExerciseFilter(this.value)">
                                ${exercisesList.map(ex => `<option value="${ex}" ${ex === selectedExercise ? 'selected' : ''}>${ex}</option>`).join("")}
                            </select>
                        </div>
                    </div>
                    <div class="chart-container-inner">
                        <canvas id="progress-chart-canvas"></canvas>
                    </div>
                </div>

                <div class="glass-card">
                    <div class="section-card-header">
                        <h3><i data-lucide="plus-circle"></i> Registrar Medición</h3>
                    </div>
                    <form id="add-progress-log-form">
                        <div class="form-group">
                            <label for="progress-date">Fecha</label>
                            <input type="date" id="progress-date" class="form-input" value="${new Date().toISOString().split('T')[0]}" style="padding-left:14px;" required>
                        </div>
                        <div class="form-group">
                            <label for="progress-exercise">Ejercicio</label>
                            <!-- Use list or custom text -->
                            <input type="text" id="progress-exercise" class="form-input" list="exercise-suggestions" placeholder="Ej: Press de Banca Plano" style="padding-left:14px;" value="${selectedExercise || ''}" required>
                            <datalist id="exercise-suggestions">
                                ${exercisesList.map(e => `<option value="${e}"></option>`).join("")}
                                <option value="Sentadilla Trasera Barra"></option>
                                <option value="Peso Muerto Rumano"></option>
                                <option value="Press Militar Barra"></option>
                                <option value="Dominadas Lastradas"></option>
                            </datalist>
                        </div>
                        <div class="grid-2col">
                            <div class="form-group">
                                <label for="progress-weight">Peso (Kg)</label>
                                <input type="number" step="0.1" id="progress-weight" class="form-input" placeholder="70" style="padding-left:14px;" required>
                            </div>
                            <div class="form-group">
                                <label for="progress-reps">Reps Realizadas</label>
                                <input type="number" id="progress-reps" class="form-input" placeholder="8" style="padding-left:14px;" required>
                            </div>
                        </div>
                        <div class="grid-2col">
                            <div class="form-group">
                                <label for="progress-rpe">Esfuerzo (RPE 1-10)</label>
                                <input type="number" step="0.5" min="1" max="10" id="progress-rpe" class="form-input" placeholder="8" style="padding-left:14px;">
                            </div>
                            <div class="form-group">
                                <label for="progress-notes">Notas</label>
                                <input type="text" id="progress-notes" class="form-input" placeholder="Sin dolor, fácil" style="padding-left:14px;">
                            </div>
                        </div>
                        <button type="submit" class="btn-primary" style="margin-top:0.75rem;">Guardar Marca</button>
                    </form>
                </div>
            </div>

            <div class="glass-card" style="margin-top: 1.5rem;">
                <div class="section-card-header">
                    <h3><i data-lucide="history"></i> Historial de Marcas Registradas - ${selectedExercise}</h3>
                </div>
                <div class="table-responsive progress-log-list">
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Peso Levantado</th>
                                <th>Repeticiones</th>
                                <th>Esfuerzo (RPE)</th>
                                <th>Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clientProgress
                                .filter(p => p.exercise === selectedExercise)
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map(p => `
                                    <tr>
                                        <td><strong>${new Date(p.date).toLocaleDateString('es-ES')}</strong></td>
                                        <td><span style="color: var(--accent-lime); font-weight:700;">${p.weight} kg</span></td>
                                        <td>${p.reps} repeticiones</td>
                                        <td><span class="badge" style="background: rgba(255,255,255,0.04); color: var(--text-primary); border: 1px solid var(--border-color);">${p.rpe || '-'}</span></td>
                                        <td><span style="font-size:0.85rem; color:var(--text-secondary);">${p.notes || '-'}</span></td>
                                    </tr>
                                `).join("")}
                            ${clientProgress.filter(p => p.exercise === selectedExercise).length === 0 ? `
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <p>No hay mediciones registradas para este ejercicio.</p>
                                    </td>
                                </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Load progress chart logic
        setTimeout(() => {
            initProgressChart(selectedExercise);
        }, 50);

        // Bind form log submit
        document.getElementById("add-progress-log-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const date = document.getElementById("progress-date").value;
            const exercise = document.getElementById("progress-exercise").value.trim();
            const weight = parseFloat(document.getElementById("progress-weight").value);
            const reps = parseInt(document.getElementById("progress-reps").value);
            const rpe = parseFloat(document.getElementById("progress-rpe").value) || null;
            const notes = document.getElementById("progress-notes").value.trim();

            const newLog = {
                id: "p_" + Date.now(),
                clientId,
                date,
                exercise,
                weight,
                reps,
                rpe,
                notes
            };

            AppDatabase.addProgress(newLog);
            showToast("Medición registrada y guardada.");
            
            // Set the filtered exercise to the newly added one so it shows up in chart
            container.setAttribute("data-selected-exercise", exercise);
            renderClientView("progress");
        });
    }

    else if (viewName === "invoices") {
        const clientInvoices = db.invoices.filter(i => i.clientId === clientId).sort((a, b) => new Date(b.date) - new Date(a.date));

        let totalPaid = 0;
        let totalPending = 0;
        clientInvoices.forEach(i => {
            if (i.status === "paid") totalPaid += i.amount;
            else totalPending += i.amount;
        });

        container.innerHTML = `
            <div class="invoice-summary-dashboard">
                <div class="glass-card" style="padding: 1rem 1.25rem;">
                    <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Inversión Total</span>
                    <div style="font-size: 1.4rem; font-weight: 800; margin-top:0.25rem;">${totalPaid + totalPending}€</div>
                </div>
                <div class="glass-card" style="padding: 1rem 1.25rem;">
                    <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Total Abonado</span>
                    <div style="font-size: 1.4rem; font-weight: 800; color: var(--accent-emerald); margin-top:0.25rem;">${totalPaid}€</div>
                </div>
                <div class="glass-card ${totalPending > 0 ? 'balance-alert-glow' : ''}" style="padding: 1rem 1.25rem;">
                    <span style="font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase;">Pendiente de Pago</span>
                    <div style="font-size: 1.4rem; font-weight: 800; color: var(--status-pending); margin-top:0.25rem;">${totalPending}€</div>
                </div>
            </div>

            <div class="glass-card">
                <div class="section-card-header">
                    <h3><i data-lucide="receipt"></i> Relación de Recibos y Facturas</h3>
                </div>
                
                <div class="table-responsive">
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Concepto</th>
                                <th>Importe</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clientInvoices.map(i => `
                                <tr>
                                    <td>${new Date(i.date).toLocaleDateString('es-ES')}</td>
                                    <td><span style="font-weight: 600;">${i.concept}</span></td>
                                    <td><strong>${i.amount}€</strong></td>
                                    <td>
                                        <span class="badge ${i.status === 'paid' ? 'badge-paid' : 'badge-pending'}">
                                            ${i.status === 'paid' ? 'Pagada' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="viewMockInvoicePDF('${i.id}')">
                                            <i data-lucide="download" style="width:14px; height:14px;"></i> PDF
                                        </button>
                                    </td>
                                </tr>
                            `).join("")}
                            ${clientInvoices.length === 0 ? `
                                <tr>
                                    <td colspan="5" class="empty-state">
                                        <i data-lucide="receipt"></i>
                                        <p>No tienes facturas emitidas en el sistema.</p>
                                    </td>
                                </tr>
                            ` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    else if (viewName === "exercises") {
        renderClientExercisesView(container, clientId, db);
    }
    
    else if (viewName === "profile") {
        renderProfileView(container);
    }

    lucide.createIcons();
}

// Client filter trigger
window.changeProgressExerciseFilter = function(exercise) {
    document.getElementById("view-progress").setAttribute("data-selected-exercise", exercise);
    renderClientView("progress");
};

// ==========================================================================
// INTERACTIVE CALENDAR ENGINE
// ==========================================================================

window.navigateCalendarMonth = function(offset) {
    AppState.currentCalendarDate.setMonth(AppState.currentCalendarDate.getMonth() + offset);
    renderCalendarGrid();
};

function renderCalendarGrid() {
    const grid = document.getElementById("calendar-grid-cells");
    const monthTitle = document.getElementById("calendar-month-title");
    if (!grid || !monthTitle) return;

    const date = AppState.currentCalendarDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    // Months translation array
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    // Clear grid
    grid.innerHTML = "";

    // Day headers (L, M, X, J, V, S, D)
    const dayHeaders = ["L", "M", "X", "J", "V", "S", "D"];
    dayHeaders.forEach(day => {
        const hCell = document.createElement("div");
        hCell.className = "calendar-day-name";
        hCell.textContent = day;
        grid.appendChild(hCell);
    });

    // Calendar logic
    const firstDayIndex = new Date(year, month, 1).getDay(); // Sun=0, Mon=1...
    // Adjust firstDayIndex to make Monday = 0
    const startDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    // Load client workouts
    const db = AppDatabase.get();
    const clientWorkouts = db.workouts.filter(w => w.clientId === AppState.currentUser.id);

    // 1. Previous month overlapping days
    for (let i = startDayOffset; i > 0; i--) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell other-month";
        cell.textContent = prevLastDay - i + 1;
        grid.appendChild(cell);
    }

    // 2. Current month days
    for (let d = 1; d <= lastDay; d++) {
        const cell = document.createElement("div");
        cell.className = "calendar-day-cell";
        cell.textContent = d;

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        
        // Mark today
        const today = new Date();
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d) {
            cell.classList.add("today");
        }

        // Check if workout exists on this day
        const dayWorkouts = clientWorkouts.filter(w => w.date === dateStr);
        if (dayWorkouts.length > 0) {
            cell.classList.add("has-workout");
        }

        // Selected day indicator
        if (AppState.selectedCalendarDate && 
            AppState.selectedCalendarDate.getFullYear() === year && 
            AppState.selectedCalendarDate.getMonth() === month && 
            AppState.selectedCalendarDate.getDate() === d) {
            cell.classList.add("selected");
            showCalendarWorkoutDetails(dayWorkouts, dateStr);
        }

        cell.onclick = () => {
            document.querySelectorAll(".calendar-day-cell").forEach(c => c.classList.remove("selected"));
            cell.classList.add("selected");
            AppState.selectedCalendarDate = new Date(year, month, d);
            showCalendarWorkoutDetails(dayWorkouts, dateStr);
        };

        grid.appendChild(cell);
    }
}

function showCalendarWorkoutDetails(workouts, dateStr) {
    const detailsContainer = document.getElementById("calendar-workout-details");
    if (!detailsContainer) return;

    if (workouts && workouts.length > 0) {
        detailsContainer.innerHTML = `
            <div class="section-card-header">
                <h3><i data-lucide="dumbbell"></i> Entrenamientos del Día</h3>
            </div>
            <div class="workout-details-box">
                ${workouts.map(w => `
                    <div class="workout-card-detail">
                        <div class="workout-title-row" style="margin-top:0;">
                            <h4>${w.title}</h4>
                            <span class="workout-date-badge"><i data-lucide="clock"></i> ${new Date(w.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        ${w.notes ? `<div class="workout-notes">${w.notes}</div>` : ''}
                        
                        <h5 style="margin-bottom:0.75rem; font-size:0.95rem; font-weight:700;">Ejercicios programados</h5>
                        <div class="workout-exercises-list">
                            ${w.exercises.map(e => `
                                <div class="workout-exercise-item" style="padding:10px 14px;">
                                    <div class="exercise-name-meta">
                                        <h5 style="font-size:0.9rem;">${e.name}</h5>
                                    </div>
                                    <div class="exercise-parameters">
                                        <span class="parameter-chip" style="font-size:0.75rem; padding: 2px 8px;">${e.series} series</span>
                                        ${e.reps ? `<span class="parameter-chip" style="font-size:0.75rem; padding: 2px 8px;">${e.reps} reps</span>` : ''}
                                        ${e.time ? `<span class="parameter-chip" style="font-size:0.75rem; padding: 2px 8px; background:rgba(59,130,246,0.08); border-color:rgba(59,130,246,0.2); color:#60a5fa;">${e.time}</span>` : ''}
                                        ${e.weight ? `<span class="parameter-chip" style="font-size:0.75rem; padding: 2px 8px; background:rgba(198, 244, 56, 0.05);">${e.weight} kg</span>` : ''}
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    } else {
        const formattedDate = new Date(dateStr).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
        detailsContainer.innerHTML = `
            <div class="empty-state">
                <i data-lucide="calendar"></i>
                <p>No tienes entrenamientos programados para el <strong>${formattedDate}</strong>.</p>
                <p style="font-size:0.8rem; margin-top:0.5rem; color: var(--text-muted);">¡Día de descanso activo o recuperación!</p>
            </div>
        `;
    }
    lucide.createIcons();
}

// ==========================================================================
// CHART.JS PROGRESS GRAPH
// ==========================================================================

function initProgressChart(exerciseName) {
    const canvas = document.getElementById("progress-chart-canvas");
    if (!canvas) return;

    const db = AppDatabase.get();
    const clientProgress = db.progress
        .filter(p => p.clientId === AppState.currentUser.id && p.exercise === exerciseName)
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // chronological order

    const labels = clientProgress.map(p => new Date(p.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }));
    const dataWeights = clientProgress.map(p => p.weight);
    const dataReps = clientProgress.map(p => p.reps);

    // Destroy existing chart to prevent garbage canvas drawing overlay
    if (AppState.progressChart) {
        AppState.progressChart.destroy();
    }

    if (clientProgress.length === 0) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        ctx.font = '14px Plus Jakarta Sans';
        ctx.fillText('Registra tus primeras marcas de fuerza para ver el gráfico.', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Initialize Chart.js
    const ctx = canvas.getContext('2d');
    
    // Gradient stroke color
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(198, 244, 56, 0.3)');
    gradient.addColorStop(1, 'rgba(198, 244, 56, 0)');

    AppState.progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso Levantado (Kg)',
                data: dataWeights,
                borderColor: '#c6f438',
                borderWidth: 3,
                backgroundColor: gradient,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: '#c6f438',
                pointBorderColor: '#090a0f',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#161920',
                    titleColor: '#ffffff',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const reps = dataReps[index];
                            const rpe = clientProgress[index].rpe ? ` (RPE ${clientProgress[index].rpe})` : '';
                            return `Carga: ${context.parsed.y} kg × ${reps} reps${rpe}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255,255,255,0.04)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Plus Jakarta Sans',
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255,255,255,0.04)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            family: 'Plus Jakarta Sans',
                            size: 11
                        },
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                }
            }
        }
    });
}

// Mock invoice PDF generator
window.viewMockInvoicePDF = function(invoiceId) {
    const db = AppDatabase.get();
    const inv = db.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const client = db.clients.find(c => c.id === inv.clientId) || { name: "Cliente", lastName: "Registrado", email: "correo@cliente.com" };

    const modal = document.getElementById("modal-container");
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 550px;">
            <div class="modal-header">
                <h3>Comprobante de Pago</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body" style="background: white; color: #1e293b; padding: 2.5rem; border-radius: var(--radius-sm); font-family: 'Courier New', Courier, monospace;">
                <!-- Printable Layout -->
                <div style="display:flex; justify-content:space-between; border-bottom: 2px solid #e2e8f0; padding-bottom:1rem; margin-bottom:1.5rem;">
                    <div>
                        <h4 style="font-weight:800; font-size:1.1rem; color: #0f172a; margin-bottom: 2px;">AITOR DORRONSORO</h4>
                        <p style="font-size:0.75rem; color:#64748b;">Ciencias de la Actividad Física y el Deporte</p>
                        <p style="font-size:0.75rem; color:#64748b;">Gipuzkoa, España</p>
                    </div>
                    <div style="text-align:right;">
                        <h4 style="font-weight:700; color:#475569; font-size:0.9rem;">RECIBO</h4>
                        <p style="font-size:0.75rem; color:#64748b;">REF: ${inv.id.toUpperCase()}</p>
                    </div>
                </div>

                <div style="margin-bottom: 1.5rem; font-size:0.8rem;">
                    <strong style="color:#0f172a;">CLIENTE:</strong>
                    <div style="margin-top: 4px;">${client.name} ${client.lastName}</div>
                    <div>Email: ${client.email}</div>
                </div>

                <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 2rem;">
                    <thead>
                        <tr style="border-bottom: 1px solid #cbd5e1; text-align: left;">
                            <th style="padding: 8px 0; color: #475569;">Fecha</th>
                            <th style="padding: 8px 0; color: #475569;">Descripción</th>
                            <th style="padding: 8px 0; text-align: right; color: #475569;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px dashed #e2e8f0;">
                            <td style="padding: 12px 0;">${new Date(inv.date).toLocaleDateString('es-ES')}</td>
                            <td style="padding: 12px 0;"><strong>${inv.concept}</strong></td>
                            <td style="padding: 12px 0; text-align: right; font-weight:700;">${inv.amount}€</td>
                        </tr>
                    </tbody>
                </table>

                <div style="display:flex; justify-content: space-between; align-items: center; border-top: 2px solid #e2e8f0; padding-top: 1rem; margin-top: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; ${inv.status === 'paid' ? 'background: #d1fae5; color: #065f46;' : 'background: #fef3c7; color: #92400e;'}">
                            ${inv.status === 'paid' ? 'PAGO RECIBIDO' : 'PENDIENTE DE PAGO'}
                        </span>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size:0.8rem; color:#64748b;">Importe Recibido:</span>
                        <div style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">${inv.amount}€</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="window.print()"><i data-lucide="printer"></i> Imprimir</button>
                <button class="btn-primary" onclick="closeModal()">Cerrar</button>
            </div>
        </div>
    `;
    modal.classList.add("active");
    lucide.createIcons();
};

// HELPER: String hashing for deterministic pseudo-random numbers
String.prototype.hashCode = function() {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        const char = this.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// Global Event Listeners setup
function setupEventListeners() {
    // Close modal on escape press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // Close modal on overlay click (but not content click)
    const overlay = document.getElementById("modal-container");
    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
}

// ==========================================================================
// EXERCISE LIBRARY & PROFILES HELPERS
// ==========================================================================

const EXERCISE_LIBRARY = {
    "Press de Banca Plano": {
        description: "Túmbate sobre un banco plano con los pies apoyados en el suelo. Sujeta la barra con un agarre ligeramente superior al ancho de los hombros. Baja la barra de forma controlada hasta tocar la parte media del pecho y empuja hacia arriba extendiendo los brazos por completo sin bloquear los codos.",
        youtubeUrl: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
        image: "Im%C3%A1genes/Foto_Gym_3_opt.jpg"
    },
    "Sentadilla Trasera Barra": {
        description: "Coloca la barra sobre los trapecios (no en el cuello). Con los pies a la anchura de los hombros y puntas ligeramente hacia fuera, desciende flexionando caderas y rodillas como si fueras a sentarte. Mantén el torso erguido y baja hasta que el fémur pase la horizontal. Empuja desde los talones para volver al inicio.",
        youtubeUrl: "https://www.youtube.com/watch?v=F3S3R04_Rnk",
        image: "Im%C3%A1genes/Foto_Gym_1_opt.jpg"
    },
    "Remo con Barra": {
        description: "Flexiona las rodillas ligeramente y realiza una bisagra de cadera manteniendo la espalda recta. Sujeta la barra con agarre prono y tira de ella hacia la parte baja del pecho/abdomen, concentrando la fuerza en los codos y contrayendo las escápulas al final del movimiento.",
        youtubeUrl: "https://www.youtube.com/watch?v=9g0H5z79Ruk",
        image: "Im%C3%A1genes/Foto_Gym_2_opt.jpg"
    },
    "Peso Muerto": {
        description: "Con los pies a la anchura de las caderas, coloca la barra sobre la mitad de tus pies. Flexiona la cadera y rodillas para agarrar la barra. Con la espalda completamente recta y el abdomen contraído, empuja el suelo con las piernas y extiende la cadera para levantarte por completo.",
        youtubeUrl: "https://www.youtube.com/watch?v=r4MzxtBKyNE",
        image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
    },
    "Dominadas Lastradas": {
        description: "Cuélgate de una barra con agarre prono amplio. Contrae el abdomen y tira de tu cuerpo hacia arriba liderando con el pecho, hasta que tu barbilla pase la barra. Baja de forma controlada estirando los brazos por completo.",
        youtubeUrl: "https://www.youtube.com/watch?v=HRV5YKKaeVw",
        image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
    },
    "Press Militar Barra": {
        description: "De pie con los pies a la anchura de los hombros. Sostiene la barra a la altura de las clavículas. Empuja la barra verticalmente por encima de la cabeza hasta bloquear los codos, metiendo la cabeza ligeramente hacia delate al final del recorrido.",
        youtubeUrl: "https://www.youtube.com/watch?v=33M2p_Abt-Y",
        image: "Im%C3%A1genes/Foto_Gym_1_opt.jpg"
    },
    "Aperturas Mancuernas": {
        description: "Túmbate en un banco plano con una mancuerna en cada mano, brazos extendidos sobre el pecho. Abre los brazos en arco manteniendo una ligera flexión en los codos hasta sentir un estiramiento cómodo en los pectorales, luego junta las mancuernas al inicio.",
        youtubeUrl: "https://www.youtube.com/watch?v=e4B2jex9z9s",
        image: "Im%C3%A1genes/Foto_Gym_3_opt.jpg"
    },
    "Extensiones Tríceps Polea": {
        description: "De pie frente a la polea alta. Sujeta la cuerda o barra, mantén los codos pegados a los costados y extiende los brazos hacia abajo contrayendo los tríceps. Vuelve a subir lentamente manteniendo los codos inmóviles.",
        youtubeUrl: "https://www.youtube.com/watch?v=2-Lz_5HwXp4",
        image: "Im%C3%A1genes/Foto_Gym_2_opt.jpg"
    },
    "Curl de Bíceps Alterno": {
        description: "De pie, con una mancuerna en cada mano y los brazos a los lados. Flexiona un codo llevando la mancuerna hacia el hombro mientras giras la palma hacia arriba. Contrae el bíceps y desciende lentamente, luego repite con el otro brazo.",
        youtubeUrl: "https://www.youtube.com/watch?v=y1rAokP9Zf4",
        image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
    },
    "Sentadilla Goblet": {
        description: "Sujeta una mancuerna o pesa rusa pegada al pecho con ambas manos. Coloca los pies a la anchura de los hombros y realiza una sentadilla profunda manteniendo el torso lo más erguido posible y empujando las rodillas hacia fuera.",
        youtubeUrl: "https://www.youtube.com/watch?v=MeIiGibTCIk",
        image: "Im%C3%A1genes/Foto_Gym_1_opt.jpg"
    },
    "Flexiones de Brazos": {
        description: "Colócate en posición de plancha con las manos alineadas bajo los hombros. Baja todo el cuerpo en bloque flexionando los codos hacia atrás (en ángulo de 45 grados con el cuerpo) hasta tocar el suelo con el pecho, y empuja hacia arriba.",
        youtubeUrl: "https://www.youtube.com/watch?v=a3f9jW0mQh0",
        image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
    },
    "Remo Mancuerna a una mano": {
        description: "Apoya una rodilla y la mano del mismo lado sobre un banco plano. Con el torso horizontal y la espalda recta, sujeta una mancuerna con la otra mano y tira de ella hacia la cadera manteniendo el codo pegado al cuerpo.",
        youtubeUrl: "https://www.youtube.com/watch?v=dFzUjAS-p7E",
        image: "Im%C3%A1genes/Foto_Gym_2_opt.jpg"
    },
    "Plancha Abdominal": {
        description: "Apoya los antebrazos en el suelo alineados con los hombros. Extiende las piernas y apoya las puntas de los pies. Mantén el cuerpo en una línea recta desde la cabeza hasta los talones, contrayendo fuertemente el abdomen, glúteos y cuádriceps sin dejar caer la cadera.",
        youtubeUrl: "https://www.youtube.com/watch?v=PVW_gPhgP20",
        image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
    },
    "Extensiones Cuádriceps": {
        description: "Siéntate en la máquina de extensiones, colocando los rodillos sobre la parte baja de las espinillas. Extiende las rodillas por completo levantando el peso de forma controlada y desciende lentamente sin dejar caer el peso bruscamente.",
        youtubeUrl: "https://www.youtube.com/watch?v=YyvSfV9de90",
        image: "Im%C3%A1genes/Foto_Gym_1_opt.jpg"
    },
    "Zancadas Búlgaras Mancuernas": {
        description: "Coloca un pie apoyado detrás de ti sobre un banco o elevación. Con el otro pie delante y una mancuerna en cada mano, desciende flexionando la pierna delantera hasta que el muslo quede paralelo al suelo. Sube empujando con la pierna delantera.",
        youtubeUrl: "https://www.youtube.com/watch?v=2C-uNgKw12c",
        image: "Im%C3%A1genes/Foto_Gym_1_opt.jpg"
    }
};

function renderProfileView(container) {
    const db = AppDatabase.get();
    const isAdmin = AppState.currentUser.role === "admin";
    
    let profileData = {};
    if (isAdmin) {
        if (!db.adminProfile) {
            db.adminProfile = {
                name: "Aitor",
                lastName: "Dorronsoro",
                email: AppState.currentUser.email || "aitordorronsoro@gmail.com",
                phone: "674501115",
                avatar: AppState.currentUser.avatar || "",
                address: "Gipuzkoa, España",
                city: "Donostia"
            };
            AppDatabase.save(db);
        }
        profileData = db.adminProfile;
    } else {
        const client = db.clients.find(c => c.id === AppState.currentUser.id);
        profileData = client || {
            name: AppState.currentUser.name.split(" ")[0],
            lastName: AppState.currentUser.name.split(" ").slice(1).join(" "),
            email: AppState.currentUser.email,
            phone: AppState.currentUser.phone,
            avatar: AppState.currentUser.avatar || "",
            address: "",
            city: ""
        };
    }

    container.innerHTML = `
        <div class="glass-card" style="max-width: 700px; margin: 0 auto;">
            <div class="section-card-header" style="border-bottom: 1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
                <h3><i data-lucide="user"></i> Mis Datos de Perfil</h3>
            </div>
            
            <form id="profile-edit-form" style="display:flex; flex-direction:column; gap:1.25rem;">
                <div style="display:flex; align-items:center; gap:1.5rem; flex-wrap:wrap; margin-bottom:1rem; background:rgba(255,255,255,0.01); padding:1rem; border-radius:var(--radius-sm); border: 1px solid var(--border-color);">
                    <div id="profile-avatar-preview-container" style="position:relative; width:100px; height:100px; border-radius:50%; overflow:hidden; border: 2px solid var(--accent-lime); background:var(--bg-main); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        ${profileData.avatar ? 
                            `<img id="profile-avatar-img" src="${profileData.avatar}" style="width:100%; height:100%; object-fit:cover;">` : 
                            `<span id="profile-avatar-placeholder" style="font-size:2rem; font-weight:700; color:var(--accent-lime);">${profileData.name[0].toUpperCase()}${profileData.lastName ? profileData.lastName[0].toUpperCase() : ''}</span>`
                        }
                    </div>
                    <div style="display:flex; flex-direction:column; gap:0.5rem;">
                        <label for="profile-avatar-input" class="btn-secondary" style="padding:6px 12px; font-size:0.85rem; display:inline-flex; width:fit-content; cursor:pointer;">
                            <i data-lucide="upload" style="width:14px; height:14px;"></i> Subir Nueva Foto
                        </label>
                        <input type="file" id="profile-avatar-input" accept="image/*" style="display:none;" onchange="handleProfileAvatarUpload(this)">
                        <p style="font-size:0.75rem; color:var(--text-muted);">Formatos soportados: JPG, PNG. Tamaño máximo: 2MB.</p>
                    </div>
                </div>
                
                <div class="grid-2col">
                    <div class="form-group">
                        <label for="profile-name">Nombre</label>
                        <input type="text" id="profile-name" class="form-input" style="padding-left:14px;" value="${profileData.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-lastname">Apellidos</label>
                        <input type="text" id="profile-lastname" class="form-input" style="padding-left:14px;" value="${profileData.lastName || ''}" required>
                    </div>
                </div>

                <div class="grid-2col">
                    <div class="form-group">
                        <label for="profile-email">Correo Electrónico</label>
                        <input type="email" id="profile-email" class="form-input" style="padding-left:14px;" value="${profileData.email}" required>
                    </div>
                    <div class="form-group">
                        <label for="profile-phone">Teléfono de Contacto</label>
                        <input type="tel" id="profile-phone" class="form-input" style="padding-left:14px;" value="${profileData.phone || ''}" required>
                    </div>
                </div>

                <div class="grid-2col">
                    <div class="form-group">
                        <label for="profile-address">Dirección de cliente</label>
                        <input type="text" id="profile-address" class="form-input" style="padding-left:14px;" value="${profileData.address || ''}" placeholder="Ej: Calle Gran Vía 12, 3ºB">
                    </div>
                    <div class="form-group">
                        <label for="profile-city">Población</label>
                        <input type="text" id="profile-city" class="form-input" style="padding-left:14px;" value="${profileData.city || ''}" placeholder="Ej: Donostia - San Sebastián">
                    </div>
                </div>

                <button type="submit" class="btn-primary" style="margin-top:1rem; width:fit-content; padding: 10px 24px; align-self: flex-end;">
                    <i data-lucide="save"></i>
                    <span>Guardar Cambios</span>
                </button>
            </form>
        </div>
    `;

    lucide.createIcons();

    // Form submit listener
    document.getElementById("profile-edit-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const updatedDb = AppDatabase.get();
        const name = document.getElementById("profile-name").value.trim();
        const lastName = document.getElementById("profile-lastname").value.trim();
        const email = document.getElementById("profile-email").value.trim();
        const phone = document.getElementById("profile-phone").value.trim();
        const address = document.getElementById("profile-address").value.trim();
        const city = document.getElementById("profile-city").value.trim();

        if (isAdmin) {
            updatedDb.adminProfile = {
                name,
                lastName,
                email,
                phone,
                avatar: AppState.currentUser.avatar || "",
                address,
                city
            };
            AppDatabase.save(updatedDb);
            
            // Update session
            AppState.currentUser.name = `${name} ${lastName}`;
            AppState.currentUser.email = email;
            AppState.currentUser.phone = phone;
            AppState.currentUser.avatar = updatedDb.adminProfile.avatar || "";
            sessionStorage.setItem("trainer_session", JSON.stringify(AppState.currentUser));
        } else {
            const client = updatedDb.clients.find(c => c.id === AppState.currentUser.id);
            if (client) {
                client.name = name;
                client.lastName = lastName;
                client.email = email;
                client.phone = phone;
                client.avatar = AppState.currentUser.avatar || "";
                client.address = address;
                client.city = city;
                
                AppDatabase.save(updatedDb);
                
                // Update session
                AppState.currentUser.name = `${name} ${lastName}`;
                AppState.currentUser.email = email;
                AppState.currentUser.phone = phone;
                AppState.currentUser.avatar = client.avatar || "";
                sessionStorage.setItem("trainer_session", JSON.stringify(AppState.currentUser));
            }
        }

        updateSidebarFooter();
        showToast("Perfil actualizado correctamente.");
    });
}

window.handleProfileAvatarUpload = function(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        showToast("La imagen supera el límite de 2MB.", "error");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        AppState.currentUser.avatar = base64;
        
        // Update form preview
        const container = document.getElementById("profile-avatar-preview-container");
        if (container) {
            container.innerHTML = `<img id="profile-avatar-img" src="${base64}" style="width:100%; height:100%; object-fit:cover;">`;
        }
    };
    reader.readAsDataURL(file);
};

function updateSidebarFooter() {
    if (!AppState.currentUser) return;
    
    const initials = AppState.currentUser.name
        .split(" ")
        .map(n => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
        
    const hasAvatar = AppState.currentUser.avatar;
    const avatarBox = document.getElementById("sidebar-avatar-box");
    if (avatarBox) {
        if (hasAvatar) {
            avatarBox.innerHTML = `<img src="${AppState.currentUser.avatar}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">`;
        } else {
            avatarBox.className = "avatar-initials";
            avatarBox.textContent = initials;
            avatarBox.innerHTML = initials; // Clean fallback
        }
    }
    const nameEl = document.getElementById("sidebar-user-name");
    if (nameEl) {
        nameEl.textContent = AppState.currentUser.name;
        nameEl.title = AppState.currentUser.name;
    }
}

function renderClientExercisesView(container, clientId, db) {
    const clientWorkouts = db.workouts.filter(w => w.clientId === clientId);
    
    // Collect unique exercises with latest values
    const exercisesMap = {};
    clientWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date)).forEach(w => {
        w.exercises.forEach(e => {
            exercisesMap[e.name.trim()] = {
                name: e.name.trim(),
                series: e.series,
                reps: e.reps || "",
                time: e.time || "",
                weight: e.weight || ""
            };
        });
    });
    
    const clientExercises = Object.values(exercisesMap);

    if (clientExercises.length === 0) {
        container.innerHTML = `
            <div class="glass-card empty-state">
                <i data-lucide="dumbbell"></i>
                <p>Aún no tienes ningún ejercicio programado en tus rutinas.</p>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">Cuando tu entrenador te asigne rutinas, aparecerán aquí explicados con sus vídeos correspondientes.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let listHTML = clientExercises.map(ex => {
        const lib = EXERCISE_LIBRARY[ex.name] || {
            description: "Sigue las indicaciones de tu entrenador para la ejecución técnica de este ejercicio.",
            youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name)}`,
            image: "Im%C3%A1genes/Foto_Gym_5_opt.jpg"
        };

        return `
            <tr>
                <td style="width: 80px; padding: 12px;">
                    <div style="width: 60px; height: 60px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-color); background: #0f121d;">
                        <img src="${lib.image}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </td>
                <td style="padding: 12px;">
                    <strong style="font-size: 1rem; color: var(--text-primary); display: block; margin-bottom: 4px;">${ex.name}</strong>
                    <span style="font-size: 0.825rem; color: var(--text-secondary); line-height: 1.4; display: block; max-width: 400px;">${lib.description}</span>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <span class="parameter-chip" style="font-size: 0.8rem; padding: 4px 8px;">${ex.series}</span>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <span class="parameter-chip" style="font-size: 0.8rem; padding: 4px 8px; background: rgba(255,255,255,0.03);">${ex.reps || '-'}</span>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <span class="parameter-chip" style="font-size: 0.8rem; padding: 4px 8px; background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.2); color: #60a5fa;">${ex.time || '-'}</span>
                </td>
                <td style="padding: 12px; text-align: center;">
                    <strong style="color: var(--accent-lime); font-size: 0.9rem;">${ex.weight ? `${ex.weight} kg` : '-'}</strong>
                </td>
                <td style="padding: 12px; text-align: right; width: 160px;">
                    <a href="${lib.youtubeUrl}" target="_blank" class="btn-secondary" style="padding: 6px 12px; font-size: 0.775rem; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.2); color: #f87171; display: inline-flex; align-items: center; gap: 4px; justify-content: center; width: 100%;">
                        <i data-lucide="play" style="width: 12px; height: 12px; fill: #f87171;"></i>
                        <span>Vídeo</span>
                    </a>
                </td>
            </tr>
        `;
    }).join("");

    container.innerHTML = `
        <div class="glass-card" style="padding: 0;">
            <div class="table-responsive">
                <table class="custom-table" style="margin: 0;">
                    <thead>
                        <tr>
                            <th style="padding: 12px; width: 80px;">Imagen</th>
                            <th style="padding: 12px; text-align: left;">Ejercicio y Descripción</th>
                            <th style="padding: 12px; text-align: center; width: 80px;">Series</th>
                            <th style="padding: 12px; text-align: center; width: 100px;">Reps</th>
                            <th style="padding: 12px; text-align: center; width: 100px;">Tiempo</th>
                            <th style="padding: 12px; text-align: center; width: 100px;">Peso</th>
                            <th style="padding: 12px; text-align: right; width: 160px;">Ejecución</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${listHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    lucide.createIcons();
}

function renderExerciseLibraryView(container) {
    const exercises = Object.entries(EXERCISE_LIBRARY);

    let cardsHTML = exercises.map(([name, data]) => {
        return `
            <div class="glass-card exercise-item-card" style="display:flex; flex-direction:column; padding:0; overflow:hidden; gap:0;">
                <div style="height:180px; width:100%; position:relative; overflow:hidden; background:#0f121d;">
                    <img src="${data.image}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div style="padding:1.5rem; display:flex; flex-direction:column; flex-grow:1; gap:0.75rem;">
                    <h4 style="font-size:1.15rem; font-weight:700; margin:0;">${name}</h4>
                    <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.4; flex-grow:1; margin:0;">${data.description}</p>
                    
                    <a href="${data.youtubeUrl}" target="_blank" class="btn-secondary" style="width:100%; justify-content:center; padding:8px 12px; font-size:0.85rem; background:rgba(239,68,68,0.08); border-color:rgba(239,68,68,0.2); color:#f87171; margin-top:0.5rem;">
                        <i data-lucide="play" style="width:14px; height:14px; fill:#f87171;"></i>
                        <span>Vídeo Demostrativo</span>
                    </a>
                </div>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div style="margin-bottom:1.5rem;">
            <p style="color:var(--text-secondary); font-size:0.9rem;">Esta es la biblioteca de ejercicios estándar del sistema. Cuando programas una sesión con uno de estos nombres, tu cliente verá automáticamente las explicaciones y videos correspondientes.</p>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:1.5rem;">
            ${cardsHTML}
        </div>
    `;

    lucide.createIcons();
}

// Global Event Listeners setup
function setupEventListeners() {
    // Close modal on escape press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // Close modal on overlay click (but not content click)
    const overlay = document.getElementById("modal-container");
    if (overlay) {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
}
