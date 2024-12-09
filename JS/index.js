let inputSearch = document.getElementById("input-search");

let btnSearch = document.getElementById("search");

let errorMsg = document.getElementById("error-data");

let loadScreen = document.getElementById("loading");

let btnShow = document.getElementById("show-lists");

let showList = document.getElementById("list-data");



btnShow.addEventListener("click", function () {
  showList.classList.toggle("active");
 
  
  
});

const items = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
  "parsley",
  "dill",
  "rosemary",
  "oregano",
  "cinnamon",
  "saffron",
  "green bean",
  "bean",
  "chickpea",
  "lentil",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blackberry",
  "blackcurrant",
  "blueberry",
  "boysenberry",
  "cherry",
  "coconut",
  "fig",
  "grape",
  "grapefruit",
  "kiwifruit",
  "lemon",
  "lime",
  "lychee",
  "mandarin",
  "mango",
  "melon",
  "nectarine",
  "orange",
  "papaya",
  "passion fruit",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "quince",
  "raspberry",
  "strawberry",
  "watermelon",
  "salad",
  "pizza",
  "pasta",
  "popcorn",
  "lobster",
  "steak",
  "bbq",
  "pudding",
  "hamburger",
  "pie",
  "cake",
  "sausage",
  "tacos",
  "kebab",
  "poutine",
  "seafood",
  "chips",
  "fries",
  "masala",
  "paella",
  "som tam",
  "chicken",
  "toast",
  "marzipan",
  "tofu",
  "ketchup",
  "hummus",
  "chili",
  "maple syrup",
  "parma ham",
  "fajitas",
  "champ",
  "lasagna",
  "poke",
  "chocolate",
  "croissant",
  "arepas",
  "bunny chow",
  "pierogi",
  "donuts",
  "rendang",
  "sushi",
  "ice cream",
  "duck",
  "curry",
  "beef",
  "goat",
  "lamb",
  "turkey",
  "pork",
  "fish",
  "crab",
  "bacon",
  "ham",
  "pepperoni",
  "salami",
  "ribs",];


let itemContainer =''

  for(let i =0 ; i<items.length ; i++){

    
 itemContainer+= `
 
<h5 onclick="show('${items[i]}')" >${items[i]}</h5>
 
 
 `
    
  }

  document.getElementById("list-data").innerHTML = itemContainer
 

function show(item){

    getRecipes((item));
}



inputSearch.addEventListener("input", function (e) {
  if (e.data === null) {
    errorMsg.classList.add("d-none");
  }
});
inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getRecipes(inputSearch.value);
  }
});

btnSearch.addEventListener("click", function () {
  getRecipes(inputSearch.value);
});

getRecipes("pizza");

let allRecipes = [];

async function getRecipes(meal) {
  try {
    loadScreen.classList.remove("d-none");

    let respone = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${meal}`
    );

    let final = await respone.json();

    allRecipes = final.recipes;

   

    loadScreen.classList.add("d-none");

    displayData();
  } catch (error) {
    console.log("Error", error);

    errorMsg.classList.remove("d-none");
  } finally {
    loadScreen.classList.add("d-none");
  }
}

function displayData() {
  let container = "";

  for (let i = 0; i < allRecipes.length; i++) {
    container += `
    
    <div class="col-md-3">

        <div class="card" height="100px">
          <img class="card-img-top" height="200px" src="${
            allRecipes[i].image_url
          }" alt="Title" />
          <div class="card-body">
            <h4 class="card-title">${allRecipes[i].title
              .split(" ", 2)
              .join(" ")}</h4>
            <button onclick="showData(${
              allRecipes[i].recipe_id
            })"  data-bs-toggle="modal" data-bs-target="#staticBackdrop"class="btn btn-info" >Show Details</button>
          </div>
        </div>
        

      </div>

    
    
    `;
  }

  document.getElementById("rowData").innerHTML = container;
}

async function showData(id) {
  try {
    loadScreen.classList.remove("d-none");

    let respone = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );

    let final = await respone.json();


    loadScreen.classList.add("d-none");

    document.getElementById("body-data").innerHTML = `
    
      <img class="w-100"  src="${final.recipe.image_url}" alt="">

        <h3>${final.recipe.title}</h3>
    
    
    `;
  } catch (error) {
    loadScreen.classList.add("d-none");
  }
}







































































