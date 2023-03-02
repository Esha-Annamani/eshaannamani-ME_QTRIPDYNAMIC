import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let cityData= await fetch(`${config.backendEndpoint}/cities`);
    let cities= await cityData.json();
    return cities;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divEle=document.getElementById("data");
  divEle.className="row row-cols-1 row-cols-sm-2 row-cols-xl-4";
  let divEle1=document.createElement("div");
  divEle1.className="col";
  divEle1.innerHTML=`<a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <img src=${image} class="img-fluid rounded" alt=${id}>
      <div class="tile-text text-center">
        <h6>${city}</h6>
        <p>${description}</p>
      </div>
    </div>
  </a>`
  divEle.appendChild(divEle1);
}

export { init, fetchCities, addCityToDOM };
