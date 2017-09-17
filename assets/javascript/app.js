var funnies = ["Stephen Colbert", "Seinfeld"];

      $(document).on("click", ".funny", function() {
        $("#gifs-view").empty();
        var funnyClicked = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          funnyClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
          console.log(funnyClicked)
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var animatedGif = results[i].images.fixed_height.url;
              var stillGif = results[i].images.fixed_height_still.url
              var funnyImage = $("<img>");
              funnyImage.attr("src", stillGif);
              funnyImage.attr("data-still", stillGif);
              funnyImage.attr("data-animated", animatedGif);
              funnyImage.attr("data-state", "still");
              funnyImage.addClass("funnyResult");
              gifDiv.append(p);
              gifDiv.append(funnyImage);
              $("#gifs-view").prepend(gifDiv);
            }
          });
      });

      $(document).on("click", ".funnyResult", function(){
        var state = $(this).attr("data-state");
        if (state == "still"){
          $(this).attr("src", $(this).data("animated"));
          $(this).attr("data-state", "animated");
        }
        else{
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      });

      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < funnies.length; i++) {
          var a = $("<button>");
          a.addClass("funny");
          a.attr("data-name", funnies[i]);
          a.text(funnies[i]);
          $("#buttons-view").append(a);
        }
      }

      renderButtons();

      $("#add-funny").on("click", function(event) {
        event.preventDefault();
        var funny = $("#funny-input").val().trim();
        funnies.push(funny);
        console.log(funnies)
        renderButtons();
      });
