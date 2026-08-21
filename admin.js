import {
    ref,
    onValue,
    update
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

const usersTable =
    document.getElementById("usersTable");

const totalUsers =
    document.getElementById("totalUsers");

const totalBalance =
    document.getElementById("totalBalance");

const logoutBtn =
    document.getElementById("logoutBtn");


// ================================
// AUTH CHECK
// ================================

watchAuth(function(user){

    if(!user){

        window.location.href =
            "login.html";

        return;
    }

    loadUsers();

});


// ================================
// LOAD USERS
// ================================

function loadUsers(){

    const usersRef =
        ref(database,"users");


    onValue(
        usersRef,
        function(snapshot){

            const users =
                snapshot.val();


            usersTable.innerHTML = "";


            if(!users){

                totalUsers.textContent = "0";
                totalBalance.textContent = "0";

                usersTable.innerHTML = `
                    <tr>
                        <td colspan="5">
                            No users found.
                        </td>
                    </tr>
                `;

                return;
            }


            const userList =
                Object.entries(users);


            totalUsers.textContent =
                userList.length;


            let balanceTotal = 0;


            userList.forEach(
                function([uid,user]){

                    const balance =
                        Number(user.balance || 0);


                    balanceTotal += balance;


                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            ${escapeHtml(
                                user.name || "Unknown"
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                user.email || "-"
                            )}
                        </td>

                        <td>
                            Rs.
                            ${balance.toLocaleString()}
                        </td>

                        <td>
                            ${escapeHtml(
                                user.createdAt || "-"
                            )}
                        </td>

                        <td>

                            <input
                                type="number"
                                min="0"
                                value="${balance}"
                                id="balance-${uid}"
                            >

                            <button
                                class="action-btn"
                                data-uid="${uid}">
                                Save
                            </button>

                        </td>
                    `;


                    usersTable.appendChild(row);

                }
            );


            totalBalance.textContent =
                balanceTotal.toLocaleString();


            document
                .querySelectorAll(".action-btn")
                .forEach(
                    function(button){

                        button.addEventListener(
                            "click",
                            function(){

                                updateBalance(
                                    button.dataset.uid
                                );

                            }
                        );

                    }
                );

        },
        function(error){

            console.error(error);

            alert(
                "Unable to load users."
            );

        }
    );

}


// ================================
// UPDATE BALANCE
// ================================

async function updateBalance(uid){

    const input =
        document.getElementById(
            "balance-" + uid
        );


    if(!input){
        return;
    }


    const newBalance =
        Number(input.value);


    if(
        Number.isNaN(newBalance) ||
        newBalance < 0
    ){

        alert(
            "Enter a valid balance."
        );

        return;
    }


    try{

        await update(
            ref(
                database,
                "users/" + uid
            ),
            {
                balance:newBalance
            }
        );


        alert(
            "Balance updated successfully."
        );

    }catch(error){

        console.error(error);

        alert(
            "Unable to update balance."
        );

    }

}


// ================================
// HTML SECURITY
// ================================

function escapeHtml(value){

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");
}


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
                    "Logout failed."
                );

            }

        }
    );

}
