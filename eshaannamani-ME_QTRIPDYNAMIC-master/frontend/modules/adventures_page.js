
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search);
  const params = new URLSearchParams(search);
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let promise=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    let data=await promise.json();
    // console.log(data);
    return data;
  }catch(err){
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure)=>{
    let divEle=document.getElementById("data");
    divEle.className="row row-cols-2 row-cols-lg-4";
    let divEle1=document.createElement("div");
    divEle1.className="col";
    divEle1.innerHTML=`<a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
    <div class="card activity-card mb-5">
     <div class="category-banner">${adventure.category}</div>
      <img src=${adventure.image} alt=${adventure.name} class="img card-img-top img-fluid" style="width: 100%; height: 200px;" >
      <div class="card-body d-flex justify-content-between">
        <h5>${adventure.name}</h5>
        <p>${adventure.currency}${adventure.costPerHead}</p>
      </div> 
      <div class="card-body d-flex justify-content-between">
        <h5>Duration</h5>
        <p>${adventure.duration}</p>
      </div> 
      </div>
    </a>`
  divEle.appendChild(divEle1);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  low=parseInt(low);
  high=parseInt(high);
  let durlist=[];
  list.forEach((e)=>{
    if(e.duration>low && e.duration<=high){
      durlist.push(e);
    }
  });
  console.log(durlist);
  return durlist;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let catresult=[];
  list.forEach((e)=>{
    categoryList.forEach((cat)=>{
      if(e.category==cat){
        catresult.push(e);
      }
    });
  });
  // console.log(catresult);
  return catresult;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length>0 && filters.duration.length==0){
    list=filterByCategory(list, filters.category);
  }
  else if(filters.category.length==0 && filters.duration.length>0){
    let res=filters.duration.split('-');
    list=filterByDuration(list, res[0], res[1]);
  }
  else if(filters.category.length>0 && filters.duration.length>0){
    let res=filters.duration.split('-');
    list=filterByCategory(list, filters.category);
    list=filterByDuration(list, res[0], res[1]);
  }
  else{
    return list;
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filterOb=JSON.stringify(filters);
  localStorage.setItem('filters',filterOb);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterdata=localStorage.getItem('filters');
  let data = JSON.parse(filterdata);

  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pill
  console.log(filters);
  let categoryOb=document.getElementById("category-list");
  categoryOb.innerHTML="";
  filters.category.forEach((cat)=>{
    let divEle = document.createElement("div");
    divEle.setAttribute('style','border:1px solid orange; border-radius:16px; padding:4px; margin: 4px;')
    divEle.textContent=cat;
    categoryOb.append(divEle);
  });
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
