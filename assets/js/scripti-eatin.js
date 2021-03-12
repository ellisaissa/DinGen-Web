$(document).ready(function () {
    $(".nav-toggler").each(function (_, navToggler) {
      var target = $(navToggler).data("target");
      $(navToggler).on("click", function () {
        $(target).animate({
          height: "toggle",
        });
      });
    });
  });

let btnContainer = $("#btn-container");

// Search Button is dynamically generated

let searchBtn = $("<button>");
searchBtn.text("Search for Recipes");
searchBtn.attr('class', "random-btn");
searchBtn.attr("id", "search-btn-eatin");
btnContainer.append(searchBtn);

// Opening and closing the modal

let modal = document.getElementById("recipe-modal");
let btn = document.getElementById("search-btn-eatin");
let closeBtn = document.getElementsByClassName("close") [0];
let recipeContainer = $('#recipe-results');

btn.onclick = function () {
  recipeContainer.html("");
  modal.style.display = "block";
}
closeBtn.onclick = function() {
  modal.style.display = "none";
  recipeContainer.html("");

}

// Fetching the data from the API

let recipeName = $('.recipe-name');
let recipeLink = $('.recipe-link');
let userSearch = $('#user-search-input');

searchBtn.on('click', runSearchResults);

function runSearchResults (event) {
  event.preventDefault();

  if(userSearch.val() == null) {
    return;
    } else {
    fetchRecipes(userSearch.val());
  }
}

  function fetchRecipes (userSearch) {
    let requestRecipesUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userSearch;
    console.log(requestRecipesUrl);

    fetch(requestRecipesUrl) 
      .then(function (response) {
        return response.json();
      })

      .then(function (response) {
        console.log(response);

        let modalTitle = $('<h1>');
        modalTitle.text("RECIPES");
        modalTitle.attr("style", "font-weight: bold; color: white; font-size: 36px; text-decoration: underline; margin-bottom: 10%; text-align: center;");
        recipeContainer.append(modalTitle);

        for (let i = 0; i < response.meals.length; i++) {

          console.log(response.meals[i].strMeal);

          let mealOption = $('<h3>');
          mealOption.text(response.meals[i].strMeal);
          mealOption.addClass("meal-option-names");
          recipeContainer.append(mealOption);

          console.log(response.meals[i].strSource);

          let mealUrl = $('<a>');
          mealUrl.attr("href", response.meals[i].strSource);
          mealUrl.addClass("meal-links");
          mealUrl.text("CLICK HERE FOR FULL RECIPE");
          mealUrl.attr("target", "_blank");
          recipeContainer.append(mealUrl);
        }

      })

    }