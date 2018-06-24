var button = {
  topics: ["apple", "banana", "mango", "durian"],
  create: function(event) {
    event.preventDefault();
    let fruit = $.trim($("#topicsInput").val());
    $("#topics-view").empty();
    if (fruit !== "") {
      button.topics.push(fruit);
    }
    for (let count = 0; count < button.topics.length; count++) {
      let topicButton = $('<button class="choice">');
      $(topicButton).addClass("topics");
      $(topicButton).attr("data-name", button.topics[count]);
      $(topicButton).text(button.topics[count]);
      $("#topics-view").append(topicButton);
    }
    $("#topicsInput").val("");
  }
};

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

function animate() {
  let state = $(this).attr("state");
  $(this).attr("state", "animate");
  $(this).attr("src", $(this).attr("data-animate"));
  if (state === "animate") {
    $(this).attr("state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  }
}

$("#add-topic").on("click", button.create);

$(document).on("click", ".topics", giphy);

$("#output").on("click", "img", animate);
