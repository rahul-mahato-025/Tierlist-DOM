document.addEventListener("DOMContentLoaded", () => {
  const showModal = document.querySelector("#show-modal button");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModal = document.getElementById("close-modal");
  const urlInput = document.getElementById("img-url");
  const uploadInput = document.getElementById("img-upload");
  const addImgbtn = document.getElementById("add-img-btn");
  const imgPool = document.getElementById("image-pool");
  const tierlistContainer = document.getElementById("tierlist-container");

  let id = 0;
  const tierData = [
    { name: "S", color: "#FF757B" },
    { name: "A", color: "#FFBC73" },
    { name: "B", color: "#FFFF67" },
    { name: "C", color: "#35FF6C" },
    { name: "D", color: "#6AC1FF" },
  ];

  function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.parentElement.id);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, dropElement) {
    const id = event.dataTransfer.getData("text");
    const draggedItem = document.getElementById(id);
    draggedItem.className = "tier-img";
    dropElement.appendChild(draggedItem);
    event.dataTransfer.clearData();
  }

  function handleAddImg() {
    let src = "";
    if (!urlInput.value && !uploadInput.files[0]) {
      alert("Please add an image url or upload an image");
      return;
    } else if (urlInput.value) {
      src = urlInput.value;
      urlInput.value = "";
    } else if (uploadInput.files[0]) {
      const file = uploadInput.files[0];
      src = URL.createObjectURL(file);
      uploadInput.value = "";
    }

    const div = document.createElement("div");
    div.classList.add("image-pool_img");
    div.id = id++;
    div.setAttribute("draggable", true);
    const image = document.createElement("img");
    image.src = src;
    div.appendChild(image);
    div.addEventListener("dragstart", (e) => handleDragStart(e, id));
    imgPool.insertAdjacentElement("afterbegin", div);

    modalOverlay.style.display = "none";
  }

  function addEventListenersToElements() {
    addImgbtn.addEventListener("click", handleAddImg);
    urlInput.addEventListener("change", (e) => (uploadInput.value = ""));
    uploadInput.addEventListener("change", (e) => (urlInput.value = ""));

    showModal.addEventListener("click", () => {
      modalOverlay.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });
  }

  function drawTiers() {
    tierData.forEach((tier) => {
      const tierDiv = document.createElement("div");
      tierDiv.className = "tier";

      const span = document.createElement("span");
      span.textContent = tier.name;

      const nameDiv = document.createElement("div");
      nameDiv.className = "tier-name";
      nameDiv.style.backgroundColor = tier.color;
      nameDiv.appendChild(span);

      const tierContentDiv = document.createElement("div");
      tierContentDiv.className = "tier-content";
      tierContentDiv.addEventListener("dragover", handleDragOver);
      tierContentDiv.addEventListener("drop", (e) =>
        handleDrop(e, tierContentDiv)
      );

      tierDiv.appendChild(nameDiv);
      tierDiv.appendChild(tierContentDiv);

      tierlistContainer.appendChild(tierDiv);
    });
  }

  function initialize() {
    drawTiers();
    addEventListenersToElements();
  }

  initialize();
});
