//Storage - holds the initially holds choices of gifs to generate. Will then store all the user inputed choices
var funnies = ["Stephen Colbert", "Seinfeld"];

//Generate Buttons - Generates buttons with the users input once button is clicked
      $(document).on("click", ".funny", function() {
        $("#gifs-view").empty();
        var funnyClicked = $(this).attr("data-name"); //assigns the value of the button to the variable
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          funnyClicked + "&api_key=dc6zaTOxFJmzC&limit=10"; //inputs the value stored in variable into the giphy query
          console.log(funnyClicked)
        $.ajax({
            url: queryURL, //searches the giphy api for gifs related to the value stored in "funnyClicked" variable
            method: "GET" //Gets gifs from the giphy api
          })
        //Once the search is done, sends results to through this function
          .done(function(response) {
            console.log(response);
            var results = response.data; //Stores results

            //For Loop that will limit how many gifs will be displayed
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>"); //generates a div in the html file called "item"
              var rating = results[i].rating; // holds the rating of gif
              var p = $("<p>").text("Rating: " + rating); //will display the rating with the gif on the html file
              var animatedGif = results[i].images.fixed_height.url; //grabs url of the animated version of gif
              var stillGif = results[i].images.fixed_height_still.url //grabs url of the still version of gif
              var funnyImage = $("<img>"); //creates an img tag for gif on the html file
              funnyImage.attr("src", stillGif); // display still image of gif
              funnyImage.attr("data-still", stillGif); //stores still image of gif for data status
              funnyImage.attr("data-animated", animatedGif); //stores animated image of gif for data status
              funnyImage.attr("data-state", "still"); //
              funnyImage.addClass("funnyResult");
              gifDiv.append(p);
              gifDiv.append(funnyImage);
              $("#gifs-view").prepend(gifDiv);
            }
          });
      });

      $(document).on("click", ".funnyResult", function(){
        var state = $(this).attr("data-state");
        if (state == "still"){ //if data-state is still, switch to animated
          $(this).attr("src", $(this).data("animated"));
          $(this).attr("data-state", "animated");
        }
        else{ //else switch to still
          $(this).attr("src", $(this).data("still"));
          $(this).attr("data-state", "still");
        }
      });
//Function that generates buttons on html file
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < funnies.length; i++) {
          var a = $("<button>");
          a.addClass("funny");
          a.attr("data-name", funnies[i]); //data-name holds the user input that will be used to search in the giphy api
          a.text(funnies[i]);
          $("#buttons-view").append(a); //appends the buttons view div to display gifs
        }
      }
//Calls the renderButtons function
      renderButtons();

//Button for adding user input on the html page 
      $("#add-funny").on("click", function(event) {
        event.preventDefault(); //prevents the page from reloading with updating information
        var funny = $("#funny-input").val().trim();
        funnies.push(funny);
        console.log(funnies)
        renderButtons(); //calls renderButton function to generate users new button
      });
