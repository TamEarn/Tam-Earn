import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    auth,
    database
} from "./firebase.js";


// ================================
// REGISTER USER
// ================================

export async function registerUser(name, email, password){

    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    const user =
        userCredential.user;


    await updateProfile(user,{
        displayName:name
    });


    await set(
        ref(database,"users/" + user.uid),
        {
            uid:user.uid,
            name:name,
            email:email,
            balance:0,
            createdAt:new Date().toISOString(),
            adsDate:new Date().toDateString()
        }
    );


    return user;
}


// ================================
// LOGIN USER
// ================================

export async function loginUser(email,password){

    const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return userCredential.user;
}


// ================================
// LOGOUT USER
// ================================

export async function logoutUser(){

    await signOut(auth);
}


// ================================
// AUTH STATE
// ================================

export function watchAuth(callback){

    return onAuthStateChanged(
        auth,
        callback
    );
}
