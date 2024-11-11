const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const submitButton = document.getElementById("submitButton");
let users = [];
async function fetchUsers() {
  const response = await fetch("/api/users"); 
  users = await response.json();
  displayUsers();
}

function displayUsers() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "user-item";
    li.innerHTML = `
            <span>${user.name} - ${user.email} - ${user.dob}</span>
            <div>
                <button onclick="editUser('${user.id}')">Edit</button>
                <button onclick="deleteUser('${user.id}')">Delete</button>
            </div>
        `;
    userList.appendChild(li);
  });
}

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;

  const user = { name, email, dob };

  if (userId) {
   
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  } else {

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
  }

  userForm.reset();
  document.getElementById("userId").value = "";
  submitButton.innerText = "Add User";
  fetchUsers();
});
function editUser(id) {
  const user = users.find((u) => u.id === id);
  document.getElementById("userId").value = user.id;
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("dob").value = user.dob;
  submitButton.innerText = "Update User";
}
async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: "DELETE" });
  fetchUsers();
}
fetchUsers();
