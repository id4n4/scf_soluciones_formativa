// cSpell:disable
// MARK: Const
const initialPlants = [
  { id: 1, name: "Potus", category: "Interior", price: 8.5 },
  { id: 2, name: "Monstera", category: "Interior", price: 24.9 },
  { id: 3, name: "Lavanda", category: "Exterior", price: 6 },
  { id: 4, name: "Rosal trepador", category: "Exterior", price: 15.75 },
  { id: 5, name: "Aloe vera", category: "Cactus", price: 7.2 },
  { id: 6, name: "Cactus de Navidad", category: "Cactus", price: 9.95 },
];

let plants = JSON.parse(localStorage.getItem("plantas")) || initialPlants;

const searchInput = document.getElementById("buscador");
const categoryFilterSelect = document.getElementById("filtro-categoria");
const counter = document.getElementById("contador");
const plantList = document.getElementById("lista-plantas");
const formPlant = document.getElementById("form-planta");
const inputName = document.getElementById("nombre");
const selectCategory = document.getElementById("categoria");
const inputPrice = document.getElementById("precio");
const errorContainer = document.getElementById("errores");

// MARK: Print plants
const printPlants = (list) => {
  plantList.innerHTML = "";
  counter.textContent = "";
  if (list.length === 0) {
    const emptyMessage = document.createElement("span");
    emptyMessage.textContent = "No hay plantas que coincidan con tu busqueda.";
    emptyMessage.classList.add("vacio");
    plantList.appendChild(emptyMessage);
    return;
  }
  for (let plant of list) {
    const card = document.createElement("article");
    card.classList.add("tarjeta");

    const nameElement = document.createElement("h3");
    nameElement.textContent = plant.name;

    const categoryElement = document.createElement("span");
    categoryElement.textContent = plant.category;
    categoryElement.classList.add("categoria");

    const priceElement = document.createElement("p");
    priceElement.textContent = formatPrice(plant.price);
    priceElement.classList.add("price");

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("borrar");
    btnDelete.textContent = "X";
    btnDelete.addEventListener("click", () => {
      deleteCard(plant.id);
    });

    card.append(nameElement, categoryElement, priceElement, btnDelete);
    plantList.appendChild(card);
  }

  counter.textContent = `Mostrando ${list.length} de ${plants.length} plantas`;
};

const formatPrice = (price) => {
  return `${price.toFixed(2)} €`;
};

printPlants(plants);

const debounce = (fn, delay = 300) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// MARK: filter function
const applyPlantFilters = () => {
  const name = searchInput.value.trim().toLocaleLowerCase();
  const category = categoryFilterSelect.value;
  const filteredPlants = plants.filter((plant) => {
    const matchesCategory = category === "Todas" || plant.category === category;
    const matchesName = plant.name.toLocaleLowerCase().includes(name);
    return matchesCategory && matchesName;
  });
  localStorage.setItem("plantas", JSON.stringify(filteredPlants));
  printPlants(filteredPlants);
};

const searchPlant = debounce(() => {
  applyPlantFilters();
});

// MARK: Filter events
searchInput.addEventListener("input", () => {
  searchPlant();
});

categoryFilterSelect.addEventListener("change", () => {
  applyPlantFilters();
});

// MARK: Form
const addPlant = (e) => {
  e.preventDefault();
  const name = inputName.value.trim();
  const category = selectCategory.value;
  const price = Number(inputPrice.value.trim().replace(",", "."));
  const errors = [];

  if (!name) errors.push("El nombre es obligatorio");
  if (!category) errors.push("Elige una categoría");
  if (!Number.isFinite(price) || price <= 0) {
    errors.push("El precio debe ser un número mayor que 0.");
  }

  errorContainer.replaceChildren(
    ...errors.map((message) => {
      const error = document.createElement("p");
      error.textContent = message;
      return error;
    }),
  );

  if (errors.length > 0) return;

  const id = Math.max(0, ...plants.map((plant) => plant.id)) + 1;
  plants.push({ id, name, category, price });
  formPlant.reset();
  applyPlantFilters();
};

formPlant.addEventListener("submit", addPlant);

// MARK: delete
const deleteCard = (id) => {
  plants = plants.filter((plant) => plant.id !== id);
  applyPlantFilters();
};
