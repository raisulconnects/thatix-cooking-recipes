// ``

const foodRendering = document.getElementById("foodRendering");
const topLatestRecipiesTitle = document.getElementById(
  "topLatestRecipiesTitle"
);
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s";

const APICalls = async function (URL) {
  const responce = await fetch(URL);
  const data = await responce.json();

  console.log("APICalls Function Theke: ", data.meals);

  // Checking If The API Even got any Data
  data.meals === "no data found" ? noRecipeAleart() : renderRecipes(data.meals);
};

const renderRecipes = function (arrOfMeals) {
  const meals = arrOfMeals
    .map(function (meal) {
      return `
    <div class="box flex flex-col justify-center items-start w-[400px] h-auto gap-3 shadow-2xl rounded-2xl m-5">

          <img
            src="${meal.strMealThumb}"
            alt="foodImage"
            class="rounded-t-2xl"
          />

          <h1 class="font-semibold pl-3 text-2xl">${meal.strMeal}</h1>

          <p class="text-wrap px-3">
            ${meal.strInstructions.slice(0, 200)}
          </p>

          <button class="ml-60 mb-3 bg-yellow-500 text-white p-4 rounded-2xl">
            View Details
          </button>

    </div>
    `;
    })
    .join("");

  foodRendering.innerHTML = "";
  foodRendering.innerHTML = meals;

  console.log("renderRecipes Function Theke: Rendered");
};

const noRecipeAleart = function () {
  topLatestRecipiesTitle.innerHTML = "";
  topLatestRecipiesTitle.innerHTML = `   
   <h1 class="text-center text-4xl m-4 font-semibold md:text-5xl">
      No Recipes Found
    </h1>
    
       <h1 class="text-center text-4xl m-4 font-semibold md:text-5xl">
      Try Searching with Correct Name
    </h1>
    `;
};

APICalls(URL);
