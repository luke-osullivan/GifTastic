var initTopic = ["pizza", "pasta", "candy", "chocolate"];
var data;
var pauseId;
var animateId;

function showGif() {
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=MiVwtydsGWLtrFoJnkN9DK4EewgaAkfU&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function (response) {
    data = response.data;
    var viewDiv = $("<div class=view-div>");
    for (var i = 0; i < data.length; i++) {
      let topicDiv = $("<div class = topicDiv>");
      const pTopic = $('<p>').text('Topic: ' + topic);
      const rating = data[i].rating;
      const pRating = $("<p>").text("Rating: " + rating);
      topicDiv.append(pTopic);
      topicDiv.append(pRating);
      
      const source1 = data[i].images.fixed_height_still.url;
      const pausedImage = $("<img>");
      pausedImage.attr("src", source1);
      pausedImage.addClass("pauseGifs");
      pausedImage.attr('id', topic + i + 'pause');
      pausedImage.attr('dataInfo', topic + i);
      topicDiv.append(pausedImage);

      const source2 = data[i].images.fixed_height.url;
      const animatedImage = $("<img>");
      animatedImage.attr("src", source2);
      animatedImage.addClass("animateGifs");
      animatedImage.attr('id', topic + i + 'animate');
      animatedImage.attr('dataInfo', topic + i);
      topicDiv.append(animatedImage);
      viewDiv.append(topicDiv);
  }
  $("#topic-order").prepend(viewDiv);
  $('.animateGifs').hide();
});
}

function renderButtons() {

$("#button").empty();

for (let i = 0; i < initTopic.length; i++) {
  const a = $("<button>");
  a.addClass("topic");
  a.attr("data-name", initTopic[i]);
  a.text(initTopic[i]);
  $("#button").append(a);
}
}

$("#add-topic").on("click", function(event) {
  event.preventDefault();
  const topic = $("#input").val().trim();
  if (topic) {
    initTopic.push(topic);
    $("#input").val("");
    renderButtons();
  }
});

$(document).on("click", ".topic", showGif);

renderButtons();

$(document).on("click", '.pauseGifs', function(event) {
  pauseId = '#' + event.target.attributes.dataInfo.value + 'pause';
  animateId = '#' + event.target.attributes.dataInfo.value + 'animate';
  $(pauseId).hide();
  $(animateId).show();
});

$(document).on("click", '.animateGifs', function(event) {
  pauseId = '#' + event.target.attributes.dataInfo.value + 'pause';
  animateId = '#' + event.target.attributes.dataInfo.value + 'animate';
  $(pauseId).show();
  $(animateId).hide();
});