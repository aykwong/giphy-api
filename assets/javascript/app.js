var button = {
  giphy: ["Apple", "Banana", "Mango", "Durian"],
  omdb: ["Frozen", "Inception", "Iron Man", "The Matrix"]
};

//Creates the buttons depending on the active tab, empties and recreates as necessary
function create() {
  $(".card-body").empty();
  if ($(".nav-link:first").hasClass("active")) {
    console.log("inside 1");
    var array = button.giphy;
    var type = "giphy";
  } else {
    console.log("inside 2");
    var array = button.omdb;
    var type = "omdb";
  }
  let topicHolder = $.trim($("#topicsInput").val());
  if (topicHolder !== "") {
    array.push(topicHolder);
    console.log(array);
  }
  for (let count = 0; count < array.length; count++) {
    var topicButton = $(`<button class="choice ${type}">`);
    $(topicButton).addClass("btn btn-outline-dark");
    $(topicButton).attr("data-name", array[count]);
    $(topicButton).text(array[count]);
    $(".card-body").append(topicButton);
  }
  $("#topicsInput").val("");
}

//Utilizes the giphy website and outputs the content into the HTML page
function giphy() {
  let search = $(this).attr("data-name");
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=jKcKvRwB8fihgLsGnwfLTndJmcbs6v67&q=${search}&limit=10&lang=en`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (let number = 0; number < response.data.length; number++) {
      let source = response.data[number];
      let gif = $('<div class="group">');
      let rating = $("<p>").text(`Rating: ${source.rating.toUpperCase()}`);
      let image = $(
        `<img src="${source.images.fixed_height_still.url}" alt="${
        source.title
        }" />`
      );
      $(image).attr("state", "still");
      $(image).attr("data-still", source.images.fixed_height_still.url);
      $(image).attr("data-animate", source.images.fixed_height.url);
      $(gif).append(rating);
      $(gif).prepend(image);
      $("#output").prepend(gif);
    }
  });
}

//Utilizes the OMDB website and outputs the content into the HTML page
function omdb() {
  let search = $(this).attr("data-name");
  let queryURL = `https://www.omdbapi.com/?t=${search}&apikey=ad83c563`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    let movie = $("<div>");
    let source = $(`<h3 class="title">`).text(response.Title);
    let released = $(`<p class="released">`).text(response.Released);
    let rating = $(`<p class="rating">`).text(response.Rating);
    let plot = $(`<p class="plot">`).text(response.Plot);
    let poster = $(`<img src="${response.Poster}" alt="${response.Title}" />`);

    $(movie).append(source, released, rating, plot, poster);
    $("#output").prepend(movie);
  });
}

//Animates the giphys when user clicks on the image
function animate() {
  let state = $(this).attr("state");
  $(this).attr("state", "animate");
  $(this).attr("src", $(this).attr("data-animate"));
  if (state === "animate") {
    $(this).attr("state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
}

//Changes the tab CSS and satisfies conditions for array choice, proceeds with button creation
function active() {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  create();
}

//Prevents page from refreshing on Submit button, proceeds with button creation
function preventRefresh(event) {
  event.preventDefault();
  create();
}

//Creates pre-set buttons on page load
$(document).ready(create);

//Creates buttons from user input
$("#add-topic").on("click", preventRefresh);

//Run in intended API server/website
$(document).on("click", ".giphy", giphy);
$(document).on("click", ".omdb", omdb);

//Runs animate function on image click
$("#output").on("click", "img", animate);

//Changes the button array and nav-tab on click
$(".card").on("click", ".nav-link", active);
