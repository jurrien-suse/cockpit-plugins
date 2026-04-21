// Grab the HTML elements
const adminMessage = document.getElementById("admin-message");
const userMessage = document.getElementById("user-message");

// 1. Create a permission object to check for admin (superuser) access
const adminPermission = cockpit.permission({ admin: true });

// 2. Function to show the correct text based on the permission
function displayUserStatus() {
    // adminPermission.allowed can be true, false, or null (while loading)
    if (adminPermission.allowed === true) {
        adminMessage.style.display = "block";
        userMessage.style.display = "none";
    } else if (adminPermission.allowed === false) {
        adminMessage.style.display = "none";
        userMessage.style.display = "block";
    }
}

// 3. Listen for changes (e.g., when you click the "Administrative Access" button)
adminPermission.addEventListener("changed", displayUserStatus);

// 4. Run the check immediately to set the initial state
displayUserStatus();
