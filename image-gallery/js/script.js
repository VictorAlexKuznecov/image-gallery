const searchBtn = document.querySelector(".btn-search");
const closeBtn = document.querySelector(".btn-close");
const searchInput = document.querySelector(".input-search");
const gallery = document.querySelector(".gallery");
const galleryItems = document.querySelectorAll(".gallery__item");
const galleryContainer = document.querySelector(".gallery__wrapper");
const tagList = document.querySelectorAll(".tags__item");
const tagsWrapper = document.querySelector(".tags__wrapper");
let defaultValue = "Beautiful";
// API
const userId = "6PfX8OT6oObgKvZELHNX4_jrElfH9ysdE-7P6E3b2us";

searchInput.focus();

// close
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  searchInput.focus();
});

// search
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  galleryContainer.innerHTML = "";
  getData();
});

// enter
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    galleryContainer.innerHTML = "";
    getData();
  }
});
async function getData() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${userId}&count=12&query=${
      searchInput.value ? searchInput.value : "nature"
    }`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);

    renderData(data);
  }
}
getData();

function renderData(arr) {
  arr.forEach(({ urls, user }, index) => {
    galleryContainer.innerHTML += `
                  <article class="gallery__item">
                    <img
                      class="gallery__image"
                      src="${urls.regular}"
                      alt="image"
                    />
                    <div class="gallery__item-description">
                      <div class="photographer">
                        <img class="photographer__image" src="${arr[index].user.profile_image.medium}" alt="photographer">
                        <span class="photographer__name"> ${arr[index].user.name}</span>
                      </div>
                      <a class="btn-download" download href="${arr[index].links.download}" target="_blank">
                        <img class="btn-download__image" src="./img/download.svg" alt="download">
                        <span class="btn-download__text">Download</span>
                      </a>
                    </div>
                  </article>`;
  });
}

// tags

tagList.forEach((item) => {
  item.addEventListener("click", () => {
    tagList.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.add("active");
    defaultValue = item.textContent;
    tagsWrapper.innerHTML = "";
    getDataCompactGallery();
  });
});

async function getDataCompactGallery() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${userId}&count=9&query=${defaultValue}&orientation=squarish`
  );
  if (response.ok) {
    const data = await response.json();
    renderDataCompactGallery(data);
  }
}
getDataCompactGallery();
function renderDataCompactGallery(dataArr) {
  dataArr.forEach((item) => {
    tagsWrapper.innerHTML += `
                  <article class="tags__element">
                    <img
                      class="tags__image"
                      src="${item.urls.regular}"
                      alt="image"
                    />
                    <div class="tags__description">
                      <div class="tags__title">${item.user.name}</div>
                      <div class="tags__text">${item.alt_description}</div>
                    </div>
                  </article>`;
  });
}
