/**
 * @depends cake.js
 * @depends GameContainer.js
 * @depends jquery.min.js
 */

/*
  Snippet for removing value from javascript array.
*/
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while(L && this.length){
        what = a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
};

var are=new Array(33,34,35,36,37,38,39,40);

$(function() {
  $(document).keydown(function(e) {
     var key = e.which;
     if($.inArray(key,are) > -1) {
       e.preventDefault();
       return false;
     }
     return true;
  });
});

init = function() {
  var c = E.canvas(GameContainer.width, GameContainer.height);
  var d = E('div', { id: 'container' });
  d.appendChild(c);
  document.getElementById("game_container").appendChild(d);

  var c2 = E.canvas(80, 50);
  document.getElementById("current_shape_container").appendChild(c2);

  var game = new GameContainer(c, new NextShape(c2));

  ;(function($) {
    if (typeof(Playtomic) !== 'undefined' && Playtomic != null) {
      Playtomic.Log.View("951461", "b039ded4f41e4a97", "079d4a76cbde49baaac6272e783772", document.location);
    }

    $("#new_button").click(function(e) {
      e.preventDefault();

      game.restart();
      game.start();
    });

    $("#save_button").click(function(e) {
      e.preventDefault();

      var score = {
        Name: $("#username").val(),
        Points: game.scores
      };

      if (score.Name !== "" && !!score.Name) {
        if (typeof(Playtomic) !== 'undefined' && Playtomic != null) {
          Playtomic.Leaderboards.Save(score, "highscores", function(response) {

            if (response.Success) {
              update_scores_table();
            } else {
              console.log("You got an error on saving scores!");
            }
          });
        } // end of playtomic block
      }

      $("#game_over").fadeOut();
    });

    $("#close_button").click(function() {
      $("#game_over").fadeOut();

      return false;
    });

    function update_scores_table() {
      var container = $("#scores_table");
      container.html('');

      if (typeof(Playtomic) === 'undefined' || Playtomic == null) return;

      Playtomic.Leaderboards.List("highscores", function(scores, numscores, response) {
        if (response.Success) {
          var html = [];

          for(var i = 0; i < scores.length; i++) {
            if (i === 50) break;

            var score = scores[i];
            html.push("<li>" + score.Name + ": " + score.Points + "</li>");
          }

          container.html(html.join(''));
        } else {
          console.log("You can't get highscores from the playtomic server");
        }
      });
    }

    update_scores_table();
  })($);
};

