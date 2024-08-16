import { auth, db, collection, doc, addDoc, getDocs, query, where, orderBy } from "./config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const userProfile = document.querySelector('#user-profile');
const blogForm = document.querySelector('#blog-form');
const myBlogs = document.querySelector('#my-blogs');
const title = document.querySelector('#title');
const content = document.querySelector('#content');


// Date & Time
const date = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthName = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();
const formattedDate = `${monthName}, ${day} ${year}`;
const time = date.getMilliseconds();


// check auth and render profile

let userData = {};
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                userData = doc.data();
            });

            console.log('userData: ', userData);

            if (userData.uid) {
                gettingBlogs(); 
            } else {
                console.error("userData.uid is null");
            }

            userProfile.innerHTML = `
            <div class="dropdown dropdown-end">
                <div class="flex items-center">
                    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                       <div class="w-8 rounded-full border border-white">
                           <img src="${userData.profilePic}" alt="profile-pic">
                        </div>
                    </label>
                 <p class="text-lg text-white font-medium"> ${userData.name}</p>
                </div> -->

                 <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                         <li><button> <a href="./dashboard.html"> Dashboard </a> </button></li>
                         <li><button id="logout-btn"> Log Out </button></li>
                    </ul>
                </div>
            `;




             // logout function
             const logoutBtn = document.querySelector('#logout-btn');
             logoutBtn.addEventListener('click', () => {
                 signOut(auth).then(() => {
                     window.location = 'index.html';
                 }).catch((error) => {
                     console.error("Logout error:", error);
                 });
             });
 
         } else {
             console.error("No user data found!");
         }
     } else {
         window.location = 'index.html';
     }
 });


 // Blog Posting //

blogForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const blogPost = {
        title: title.value,
        content: content.value,
        time: time,
        date: formattedDate,
        userData
    };
    
    addDoc(collection(db, "Blog Posts"), blogPost)
        .then((doc) => {
            console.log('Document Posted =>', doc.id);
            gettingBlogs();
            title.value = '';
            content.value = '';
        })
        .catch((error) => {
            console.error("Error posting document:", error);
        });
});

// Call blogs  //
let allBlogs = [];

async function gettingBlogs() {
    allBlogs = [];

    if (!userData.uid) {
        console.error("userData.uid is undefined");
        return;
    }

    const q = query(collection(db, "Blog Posts"), where("userData.uid", "==", userData.uid), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        allBlogs.push({ ...doc.data(), docId: doc.id });
    });
    renderingBlogs();
    console.log(allBlogs);
    
}


function renderingBlogs() {
    myBlogs.innerHTML = '';

    allBlogs.forEach((blog, index) => {
        myBlogs.innerHTML += `
            <div class="w-[70%] my-6 p-5 rounded-lg shadow-gray-200 shadow-lg bg-white">
                <div class="flex">
                    <div>
                        <img class="blog-profile-pic rounded-md" src="${blog.userData.profilePic}" alt="profile-pic">
                    </div>
                    <div class="pl-4">
                        <h2 class="leading-6 text-lg font-semibold">${blog.title}</h2>
                        <p class="mt-1 text-sm font-medium text-[#3f3f3f]">${blog.userData.name} - ${blog.date}</p>
                    </div>
                </div>
                <div class="py-5">
                    <p class="text-[15px] text-[#757575]">${blog.content}</p>
                </div>
                <div>
                    <button class="text-sm text-[#7749F8] mr-3 edit-btn" data-index="${index}">Edit</button>
                    <button class="text-sm text-[#7749F8] delete-btn" data-index="${index}">Delete</button>
                </div>
            </div>
        `;
    });


    // 
    // Update and Remove 
    // 
    
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', editBlog);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteBlog);
    });
}

async function editBlog(event) {
    const index = event.target.getAttribute('data-index');
    const newTitle = prompt("Enter new title:", allBlogs[index].title);
    const newContent = prompt("Enter new content:", allBlogs[index].content);

    if (newTitle && newContent) {
        try {
            await updateDoc(doc(db, "Blog Posts", allBlogs[index].docId), {
                title: newTitle,
                content: newContent
            });
            console.log("Blog updated successfully.");
            gettingBlogs(); 
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    }
}

async function deleteBlog(event) {
    const index = event.target.getAttribute('data-index');
    const confirmDelete = confirm("Are you sure you want to delete this post?");

    if (confirmDelete) {
        try {
            await deleteDoc(doc(db, "Blog Posts", allBlogs[index].docId));
            console.log("Blog deleted successfully.");
            gettingBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    }
}




