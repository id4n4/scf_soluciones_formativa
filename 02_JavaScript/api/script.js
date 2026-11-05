const URL_API = "https://jsonplaceholder.typicode.com/users";

const btnLoad = document.getElementById("btn-cargar");
const state = document.getElementById("estado");
const list = document.getElementById("lista");

function printUsers(users) {
  list.innerHTML = "";
  users.forEach((user) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
      <h3>${user.name}</h3>
      <p>📧 ${user.email}</p>
      <p>📞 ${user.phone}</p>
      <p>🏙️ ${user.address.city}</p>
      <p>🏢 ${user.company.name}</p>
    `;
    list.appendChild(tarjeta);
  });
}

function printStates(totalUsers) {
  state.textContent = `${totalUsers} usuarios cargados`;
}

function loading() {
  state.textContent = "Cargando usuarios...";
  state.classList.add("cargando");
  btnLoad.disabled = true;
  list.innerHTML = "";
}

function loaded() {
  state.classList.remove("cargando");
  btnLoad.disabled = false;
}

async function loadUsers() {
  try {
    loading();
    const response = await fetch(URL_API);
    const data = await response.json();
    printStates(data.length);
    printUsers(data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    state.textContent = "Error al cargar los usuarios";
    state.className = "error";
  } finally {
    loaded();
  }
}

btnLoad.addEventListener("click", () => {
  loadUsers();
});
