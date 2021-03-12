// Navbar
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

// Dynamically generating the random button

let btnDiv = $("#btn-wrapper");

let randomBtnTaco = $("<button>");
randomBtnTaco.text("Give me a random taco recipe!");
randomBtnTaco.attr("class", "random-btn");
randomBtnTaco.attr("id", "random-btn-taco");
btnDiv.append(randomBtnTaco);

let modal = document.getElementById("random-taco-modal");
let btn = document.getElementById("random-btn-taco");
let yesBtn = document.getElementById("yes-btn");
let noBtn = document.getElementById("no-btn");

// Event listeners to display and close the modal

btn.onclick = function () {
  modal.style.display = "block";
}

//Clear local storage if desired
let hofList = $("#taco-list");
let clearStorageBtn = $("<button>");
clearStorageBtn.text("Clear Taco Hall Of Fame");
clearStorageBtn.attr("class", "random-btn");
btnDiv.append(clearStorageBtn);

clearStorageBtn.on("click", function () {
  localStorage.setItem("savedTacos", null);
  hofList.children().remove();

})

// Script for the button that generates a random taco

  let tacoBaseLayer = $("#base-layer");
  let tacoBaseLayerLink = $("#base-layer-link");

  let tacoCondiment = $("#condiment");
  let tacoCondimentLink = $("#condiment-link");

  let tacoMixin = $("#mixin");
  let tacoMixinLink = $("#mixin-link");

  let tacoSeasoning = $("#seasoning");
  let tacoSeasoningLink = $("#seasoning-link");

  let tacoShell = $("#shell");
  let tacoShellLink = $("#shell-link");

  randomBtnTaco.on("click", function () {

    let requestRandomTaco = "http://taco-randomizer.herokuapp.com/random/";

    fetch(requestRandomTaco)
      .then(function(response) {
        return response.json();
      })

      .then(function(response) {

        tacoBaseLayer.text(response.base_layer.name);
        tacoBaseLayer.attr("style", "color: blue; font-weight: bold; text-decoration: underline;");
        tacoBaseLayerLink.attr("href", response.base_layer.url);
        tacoBaseLayerLink.attr("target", "_blank");

        tacoCondiment.text(response.condiment.name);
        tacoCondiment.attr("style", "color: blue; font-weight: bold; text-decoration: underline;");
        tacoCondimentLink.attr("href", response.condiment.url);
        tacoCondimentLink.attr("target", "_blank");
     
        tacoMixin.text(response.mixin.name);
        tacoMixin.attr("style", "color: blue; font-weight: bold; text-decoration: underline;");
        tacoMixinLink.attr("href", response.mixin.url);
        tacoMixinLink.attr("target", "_blank");

        tacoSeasoning.text(response.seasoning.name);
        tacoSeasoning.attr("style", "color: blue; font-weight: bold; text-decoration: underline;");
        tacoSeasoningLink.attr("href", response.seasoning.url);
        tacoSeasoningLink.attr("target", "_blank");

        tacoShell.text(response.shell.name);
        tacoShell.attr("style", "color: blue; font-weight: bold; text-decoration: underline;");
        tacoShellLink.attr("href", response.shell.url);
        tacoShellLink.attr("target", "_blank");
      })

      .then (function(response) {
        return response;
      })

  })

  // User can decide whether or not to save a search to local storage

  yesBtn.onclick = function () {
    console.log("User clicked yes");
    saveTaco();
    modal.style.display = "none";
  }
  noBtn.onclick = function() {
    modal.style.display = "none";
  }

  let savedTacosArray = JSON.parse(localStorage.getItem("savedTacos"));

// Function that stores selected random taco responses in local storage

  function saveTaco() {

    let requestRandomTaco = "http://taco-randomizer.herokuapp.com/random/";

    fetch(requestRandomTaco)
      .then(function(response) {
        return response.json();
      })

      .then(function(response) {

        let newSave = $('<li>');
        newSave.text(response.base_layer.name + ", " + response.condiment.name + ", " + response.mixin.name + ", " + response.seasoning.name + ", " + response.shell.name);
        newSave.addClass("hof-list-items");
        hofList.append(newSave);

        let tacoInfo = {
          baseName: response.base_layer.name,
          condimentName: response.condiment.name,
          mixinName: response.mixin.name,
          seasoningName: response.seasoning.name,
          shellName: response.shell.name
        }

        if (savedTacosArray == null) {
          savedTacosArray = [tacoInfo];
          console.log(savedTacosArray);
          localStorage.setItem("savedTacos", JSON.stringify(savedTacosArray));
      
        } else {
          savedTacosArray.push(tacoInfo);
          console.log(savedTacosArray);
          localStorage.setItem("savedTacos", JSON.stringify(savedTacosArray));
        }

      })

    $(function() {
      $("#taco-list").sortable({
        placeholder: "ui-state-highlight"
      });
      $("taco-list").disableSelection();
    } );

  }

  // Display saved searches on page load

  displayHallOfFame();

  function displayHallOfFame() {
    let retrievedTacoSearches = JSON.parse(localStorage.getItem("savedTacos"));

    if (savedTacosArray != null) {
      for (let i = 0; i < retrievedTacoSearches.length; i++) {
        let listItem = retrievedTacoSearches[i];
        let createdLi = $('<li>');
        createdLi.text(listItem.baseName + ", " + listItem.condimentName + ", " + listItem.mixinName + ", " + listItem.seasoningName + ", " + listItem.shellName);
        createdLi.addClass("hof-list-items");
        hofList.append(createdLi);
      }

      $(function() {
        $("#taco-list").sortable({
          placeholder: "ui-state-highlight"
        });
        $("taco-list").disableSelection();
      } );

    }

  }
