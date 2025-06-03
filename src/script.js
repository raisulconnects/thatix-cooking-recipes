// ``
const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s";

const foodRendering = document.getElementById("foodRendering");
const topLatestRecipiesTitle = document.getElementById(
  "topLatestRecipiesTitle"
);
const searchInputField = document.getElementById("searchInputField");
const searchBtn = document.getElementById("searchBtn");
const modalWindow = document.getElementById("modalWindow");
const closeModalBtn = document.getElementById("closeModalBtn");

const APICalls = async function (URL) {
  const responce = await fetch(URL);
  const data = await responce.json();

  // For Checking if it's okay
  //   console.log("APICalls Function Theke: ", data.meals);

  // Checking If The API Even got any Data
  !data.meals || data.meals === "no data found"
    ? noRecipeAleart()
    : renderRecipes(data.meals);

  // Permanent API CHECK (nijer check korar jonne)
  //   console.log("Permanent API CHECK --> ", data.meals);
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

          <button data-id="${
            meal.idMeal
          }" class="view-details-btn ml-60 mb-3 bg-yellow-500 text-white p-4 rounded-2xl">
            View Details
          </button>

    </div>
    `;
    })
    .join("");

  topLatestRecipiesTitle.innerHTML = "Latest Recipies";
  foodRendering.innerHTML = "";
  foodRendering.innerHTML = meals;

  // For checking if it's rendering properly
  //   console.log("renderRecipes Function Theke: Rendered");
};

const noRecipeAleart = function () {
  foodRendering.innerHTML = "";
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

// Event Handling When Search Button is Pressed
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(
    "Search Button Clicked & Now We'll Do Api Call For: ",
    searchInputField.value
  );

  APICalls(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputField.value}`
  );

  searchInputField.blur();
});

// // Close modal Button
closeModalBtn.addEventListener("click", () => {
  modalWindow.classList.add("hidden");
  console.log("Close Modal Pressed");
});

// Event Deligation Use kora hocche on foodRendering jate view details e click porle bujha jae ke click kortese
foodRendering.addEventListener("click", async function (e) {
  if (e.target.closest(".view-details-btn")) {
    const id = e.target.closest(".view-details-btn").dataset.id;

    // Now We'll Fetch the Food Recipe Using the ID API
    const responce = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await responce.json();
    const meal = await data.meals[0];

    // Now we put fetched info inside modal
    modalWindow.innerHTML = "";
    modalWindow.innerHTML = `
    <div
        class="container w-auto h-auto flex flex-col justify-start gap-3 bg-gray-200 rounded-2xl"
      >
        <img
          src="${meal.strMealThumb}"
          class="w-[600px] mx-auto rounded-b-2xl"
          alt="modalImage"
        />
        <h1 class="font-bold text-4xl mx-auto text-center">${meal.strMeal}</h1>
        <p class="text-wrap mx-auto text-center px-10">
                ${meal.strInstructions.slice(0, 800)}
        </p>


        <button id="terai" class="bg-amber-300 rounded-3xl p-1 text-2xl mx-auto px-5 text-gray-900 m-2">
            Close
        </button>
    </div>
    `;

    // Now we Show the Modal First as it's hidden
    modalWindow.classList.remove("hidden");

    document.getElementById("terai").addEventListener("click", function () {
      modalWindow.classList.add("hidden");
    });
  }
});

// Initial API & Function Call When Page loads
APICalls(URL);
