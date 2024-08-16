import { auth } from "./config.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";


const userProfile = document.querySelector('#user-profile');
const loginForm = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');



onAuthStateChanged(auth, (user) => {
    if (user) {
        // window.location = 'dashboard.html'
    }
    else {
        userProfile.innerHTML = `

        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-8 rounded-full">
                    <img src="./images/user-icon.png" alt="profile-pic">
                </div>
            </label>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><button> <a href="./login.html"> Login </a> </button></li>
                <li><button> <a href="./signup.html"> Register </a> </button></li>
            </ul>
        </div>
        `
    }
});

        // xxxxx

// userProfile.innerHTML = `

//         <div class="dropdown dropdown-end">
//             <label tabindex="0" class="btn btn-ghost btn-circle avatar">
//                 <div class="w-8 rounded-full">
//                     <img src="./assets/user-icon.png" alt="profile-pic">
//                 </div>
//             </label>
//             <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//                 <li><button> <a href="./login.html"> Login </a> </button></li>
//                 <li><button> <a href="./signup.html"> Register </a> </button></li>
//             </ul>
//         </div>
//         `

        //xxxxxx


        
// User Login 
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            window.location = 'dashboard.html'
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            error.innerHTML = 'Invalid Login Credentials.';
        });
});


