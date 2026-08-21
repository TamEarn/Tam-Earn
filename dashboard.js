import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    watchAuth,
    logoutUser
} from "./auth.js";

import {
    database
} from "./firebase.js";


// ================================
// ELEMENTS
// ================================

const welcomeName =
    document.getElementById("welcomeName");

const headerUserName =
    document.getElementById("headerUserName");

const balanceElement =
    document.getElementById("balance");

const status =
    document.getElementById("status");

const logoutBtn =
    document.getElementById("logoutBtn");


// ================================
// AUTH + USER DATA
// ================================

watchAuth(function(user){

    if(!user){

        window.location.href =
            "login.html";

        return;
    }


    const userRef =
        ref(
            database,
            "users/" + user.uid
        );


    onValue(
        userRef,
        function(snapshot){

            const data =
                snapshot.val();


            if(!data){

                status.textContent =
                    "User data not found.";

                return;
            }


            const name =
                data.name ||
                user.displayName ||
                user.email.split("@")[0];


            const balance =
                Number(data.balance || 0);


            welcomeName.textContent =
                name;

            headerUserName.textContent =
                name;

            balanceElement.textContent =
                balance.toLocaleString();


            status.textContent =
                "Account connected successfully.";

        },
        function(error){

            console.error(error);

            status.textContent =
                "Unable to load account data.";

        }
    );

});


// ================================
// LOGOUT
// ================================

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        async function(){

            try{

                await logoutUser();

                window.location.href =
                    "login.html";

            }catch(error){

                console.error(error);

                alert(
                    "Unable to logout. Please try again."
                );

            }

        }
    );

}
