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
  }
};

var state;

function giphy() {
  let search = $(this).attr("data-name");
  let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=jKcKvRwB8fihgLsGnwfLTndJmcbs6v67&q=${search}&limit=10&lang=en`;

  console.log(search);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (let count = 0; count < response.data.length; count++) {
      let unit = '<div class="group"';
      $(unit).attr("state", "still");
      console.log(response.data[count].fixed_height_still.url);
      $(unit).attr("data-still", response.data[count].fixed_height_still.url);
      $(unit).attr("data-animate", response.data[count].fixed_height.url);
      $(unit).text("Rating: " + response.data[count].rating);
      $(unit).html(
        `<img src="${response.data[count].fixed_height.url}" alt="${
          response.data[count].title
        }" />`
      );
      $(".output").append(unit);
    }
  });
}

$("#add-topic").on("click", button.create);

$(document).on("click", ".topics", giphy);
