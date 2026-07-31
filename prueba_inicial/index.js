const formName = document.getElementById("form-name");

formName.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("🚀 ~ formData:", Object.fromEntries(formData.entries()));
});
