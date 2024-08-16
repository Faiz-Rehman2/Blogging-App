// import { auth, db, storage, collection, addDoc } from "./config.js";
// import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import { onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


// const signupForm = document.querySelector('#signup-form');
// const firstName = document.querySelector('#first-name');
// const lastName = document.querySelector('#last-name');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');
// const confirmPassword = document.querySelector('#confirm-password');
// let profilePic = document.querySelector('#profile-pic');
// // export const userProfile = document.querySelector('#user-profile');
// // let error = document.querySelector('#error');
// // let loadingModal = document.querySelector('#loading-modal');


// // SignUp User
// signupForm.addEventListener('submit', async(e) => {
//     e.preventDefault();

//     if (password.value === confirmPassword.value) {
//         // error.innerHTML = ''
//         // loadingModal.showModal();

//         // 

//         try {

//             const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
//             const user = userCredential.user;
//             console.log(user);
            
//             const file = profilePic.files[0];
//             const storageRef = ref(storage, `${encodeURIComponent(email.value)}`);
            
//             let imageURL = "";
            
//             if (file) {
                
//                 const snapshot = await uploadBytes(storageRef, file);
//                 imageURL = await getDownloadURL(snapshot.ref);
//             }
            
//             await setDoc(doc(db, "users", user.uid), {
//                 name: firstName.value + ' ' + lastName.value,
//                 email: email.value,
//                 imageURL: imageURL, 
//                 uid: user.uid,
//                 createdAt: new Date()
//             });
            
//             console.log("User data and image URL saved in Firestore!");
//             window.location='./login.html'
//             }
//             catch(error) {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               console.error(errorMessage);
//             } 


//     }
//     else {
//         error.innerHTML = "Please enter same password!"
//     }


// });









// // User Register
//         // createUserWithEmailAndPassword(auth, email.value, password.value)

//         //     .then((userCredential) => {
//         //         const user = userCredential.user;

//         //         // Uploading Profile Picture
//         //         profilePic = profilePic.files[0]
//         //         const storageRef = ref(storage, email.value);

//         //         uploadBytes(storageRef, profilePic).then(() => {

//         //             // GEtting Profile Picture URL
//         //             getDownloadURL(storageRef).then((url) => {

//         //                 // Add User to DB
//         //                 const userData = {
//         //                     name: firstName.value + ' ' + lastName.value,
//         //                     email: email.value,
//         //                     uid: user.uid,
//         //                     profilePic: url
//         //                 }
//         //                 addDoc(collection(db, "users"), userData)
//         //                     .then(() => {
//         //                         console.log('User Added to BD');
//         //                         window.location = 'dashboard.html';
//         //                     })
//         //                     .catch((rej) => {
//         //                         console.log(rej);
//         //                     });
//         //             });
//         //         });
//         //     })
//         //     .catch((error) => {
//         //         const errorCode = error.code;
//         //         const errorMessage = error.message;
//         //         // console.error(errorMessage);
//         //     });
















import { auth, db, storage } from "./config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const signupForm = document.querySelector('#signup-form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const profilePic = document.querySelector('#profile-pic');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        let imageURL = "";
        const file = profilePic.files[0];
        if (file) {
            const storageRef = ref(storage, `profile_pics/${user.uid}`);
            const snapshot = await uploadBytes(storageRef, file);
            imageURL = await getDownloadURL(snapshot.ref);
        }

        await setDoc(doc(db, "users", user.uid), {
            name: `${firstName.value} ${lastName.value}`,
            email: email.value,
            profilePic: imageURL,
            uid: user.uid,
            createdAt: new Date()
        });

        console.log("User data saved in Firestore!");
        window.location = 'login.html';
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        alert(`Error during sign-up: ${error.message}`);
    }
});



