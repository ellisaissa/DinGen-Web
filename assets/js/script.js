// navbar
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

// Modal set up
// id="search-input-taco"
// id="random-taco-btn"

// id="search-input-eatin"
// id="random-eatin-btn"

  let modal = document.getElementById("search-input-eatin search-input-taco");
  let btn = document.getElementById("random-eatin-btn")
  let taco= document.getElementById ("taco-btn");
  let span = document.getElementsByClassName("close") [0];
  btn.click = function () {
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display ="none";
    }
  }

//   API meal db
  function searchApi(query, format) {
    let locQueryUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
  
    if (format) {
      locQueryUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    }
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        // write query to page so user knows what they are viewing
        resultTextEl.textContent = locRes.search.query;
  
        console.log(locRes);
  
        if (!locRes.results.length) {
          console.log('No results found!');
          resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
        } else {
          resultContentEl.textContent = '';
          for (var i = 0; i < locRes.results.length; i++) {
            printResults(locRes.results[i]);
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal, formatInputVal);
  }
