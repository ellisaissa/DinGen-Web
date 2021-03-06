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

  // Script for the button that generates a random restaurant response

  let btnDiv = $("#btn-test");

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

  let randomBtnTaco = $("<button>");
  randomBtnTaco.text("Forget it, I just want tacos");
  randomBtnTaco.attr('class', "random-taco");
  btnDiv.append(randomBtnTaco);

  randomBtnTaco.on("click", function () {
    console.log("Click event works");
    let requestRandomTaco = "http://taco-randomizer.herokuapp.com/random/";

    fetch(requestRandomTaco)
      .then(function(response) {
        return response.json();
      })

      .then(function(response) {
        console.log(response);

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
  })