var button = {
  topics: ["Apple", "Banana", "Mango", "Durian"],
  omdb: ["Frozen", "Inception", "Ironman", "Matrix"]
};

function create() {
  if ($(".nav-link:first").hasClass("active")) {
    console.log("inside 1");
    var array = button.topics;
  } else {
    console.log("inside 2");
    var array = button.omdb;
  }
  let topicHolder = $.trim($("#topicsInput").val());
  $(".card-body").empty();
  if (topicHolder !== "") {
    button.topics.push(topicHolder);
  }
  for (let count = 0; count < array.length; count++) {
    let topicButton = $('<button class="choice">');
    $(topicButton).addClass("btn btn-outline-dark");
    $(topicButton).attr("data-name", array[count]);
    $(topicButton).text(array[count]);
    $(".card-body").append(topicButton);
  }
  $("#topicsInput").val("");
}

function giphy() {
  let search = $(this).attr("data-name");
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=jKcKvRwB8fihgLsGnwfLTndJmcbs6v67&q=${search}&limit=10&lang=en`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
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

function omdb() {
  let search = $(this).attr("data-name");
  let queryURL = `http://www.omdbapi.com/?t=${search}&apikey=ad83c563`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    let source = $(`<p class="title">`).text(response.Title);
    console.log(response.title);
    console.log(source);
    let released = $(`<p class="released">`).text(response.Released);
    let rating = $(`<p class="rating">`).text(response.Rating);
    let plot = $(`<p class="plot">`).text(response.Plot);
    let poster = $(`<img src="${response.Poster}" alt="${response.Title}" />`);

    $("#output").prepend(source, released, rating, plot, poster);
  });
}

function animate() {
  let state = $(this).attr("state");
  $(this).attr("state", "animate");
  $(this).attr("src", $(this).attr("data-animate"));
  if (state === "animate") {
    $(this).attr("state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
}

function active() {
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  create();
}

$(document).ready(create);

$("#add-topic").on("click", create);

$(document).on("click", ".choice", giphy});

$("#output").on("click", "img", animate);

$(".card").on("click", ".nav-link", active);
