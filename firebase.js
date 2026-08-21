```javascript
// ============================================
// TAM EARN - FIREBASE CONFIGURATION
// ============================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getDatabase } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {

    apiKey:
        "AIzaSyAQ-FHhexuUfxkcA7zS2iSCLDpAStj3DqI",

    authDomain:
        "tam-earn.firebaseapp.com",

    projectId:
        "tam-earn",

    storageBucket:
        "tam-earn.firebasestorage.app",

    messagingSenderId:
        "451049191421",

    appId:
        "1:451049191421:web:b52ece93f962955e420b94",

    measurementId:
        "G-WPLZVFHDBR"
};


// ============================================
// INITIALIZE FIREBASE
// ============================================

const app =
    initializeApp(firebaseConfig);


// ============================================
// FIREBASE SERVICES
// ============================================

const auth =
    getAuth(app);

const database =
    getDatabase(app);


// ============================================
// EXPORT
// ============================================

export {
    app,
    auth,
    database
};


// ============================================
// CONNECTION MESSAGE
// ============================================

console.log(
    "Tam Earn Firebase initialized successfully."
);
```
