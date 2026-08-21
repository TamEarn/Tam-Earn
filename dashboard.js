```javascript
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

const balanceStat =
    document.getElementById("balanceStat");

const status =
    document.getElementById("status");

const logoutBtn =
    document.getElementById("logoutBtn");


// ================================
// MY PLAN ELEMENTS
// ================================

const myPlan =
    document.getElementById("myPlan");

const myPlanPrice =
    document.getElementById("myPlanPrice");

const myPlanDuration =
    document.getElementById("myPlanDuration");

const myPlanDate =
    document.getElementById("myPlanDate");

const planStatus =
    document.getElementById("planStatus");


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


            // ================================
            // USER NAME
            // ================================

            const name =
                data.name ||
                user.displayName ||
                user.email.split("@")[0];


            welcomeName.textContent =
                name;

            headerUserName.textContent =
                name;


            // ================================
            // BALANCE
            // ================================

            const balance =
                Number(data.balance || 0);


            const formattedBalance =
                balance.toLocaleString();


            if(balanceElement){

                balanceElement.textContent =
                    formattedBalance;

            }


            if(balanceStat){

                balanceStat.textContent =
                    formattedBalance;

            }


            // ================================
            // MY PLAN
            // ================================

            const selectedPlan =
                data.selectedPlan;


            const selectedPrice =
                Number(
                    data.selectedPlanPrice || 0
                );


            const dailyReward =
                Number(
                    data.dailyTaskReward || 0
                );


            const duration =
                Number(
                    data.planDuration || 30
                );


            if(selectedPlan){

                // PLAN NAME

                if(myPlan){

                    myPlan.textContent =
                        selectedPlan;

                }


                // PLAN PRICE

                if(myPlanPrice){

                    myPlanPrice.textContent =
                        "Rs. " +
                        selectedPrice.toLocaleString();

                }


                // DURATION

                if(myPlanDuration){

                    myPlanDuration.textContent =
                        duration +
                        " Days";

                }


                // SELECTED DATE

                if(myPlanDate){

                    if(data.planSelectedAt){

                        const selectedDate =
                            new Date(
                                data.planSelectedAt
                            );


                        myPlanDate.textContent =
                            selectedDate.toLocaleDateString(
                                "en-PK",
                                {
                                    day:"2-digit",
                                    month:"short",
                                    year:"numeric"
                                }
                            );

                    }else{

                        myPlanDate.textContent =
                            "Not Available";

                    }

                }


                // STATUS

                if(planStatus){

                    planStatus.textContent =
                        "Active";

                }


            }else{

                if(myPlan){

                    myPlan.textContent =
                        "No Plan Selected";

                }


                if(myPlanPrice){

                    myPlanPrice.textContent =
                        "Rs. 0";

                }


                if(myPlanDuration){

                    myPlanDuration.textContent =
                        "30 Days";

                }


                if(myPlanDate){

                    myPlanDate.textContent =
                        "Not Selected";

                }


                if(planStatus){

                    planStatus.textContent =
                        "No Plan";

                }

            }


            // ================================
            // ACCOUNT STATUS
            // ================================

            status.textContent =
                "Account connected successfully.";

        },


        function(error){

            console.error(
                "Firebase Database Error:",
                error
            );


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

            logoutBtn.disabled =
                true;

            logoutBtn.textContent =
                "Logging out...";


            try{

                await logoutUser();

                window.location.href =
                    "login.html";

            }catch(error){

                console.error(error);


                logoutBtn.disabled =
                    false;

                logoutBtn.textContent =
                    "Logout";


                alert(
                    "Unable to logout. Please try again."
                );

            }

        }
    );

}
```
