// Builds the three "LESS IS MORE" rows behind the phones.
// Row 1 moves left to right, row 2 right to left, row 3 left to right.
(function () {
  var marquee = document.getElementById("marquee");
  if (!marquee) return;

  var PHRASE = "Less is more";
  var REPEATS = 6;
  var DIRECTIONS = ["right", "left", "right"];

  function makeHalf() {
    var half = document.createElement("div");
    half.className = "marquee-half";
    for (var i = 0; i < REPEATS; i++) {
      var span = document.createElement("span");
      span.textContent = PHRASE;
      half.appendChild(span);
    }
    return half;
  }

  DIRECTIONS.forEach(function (direction) {
    var row = document.createElement("div");
    row.className = "marquee-row " + (direction === "left" ? "left" : "right");

    var track = document.createElement("div");
    track.className = "marquee-track";
    // Two identical halves so the loop is seamless.
    track.appendChild(makeHalf());
    track.appendChild(makeHalf());

    row.appendChild(track);
    marquee.appendChild(row);
  });
})();

(function(){var p=document.getElementById('uniPop');if(!p)return;
setTimeout(function(){p.hidden=false;},5000);
document.getElementById('uniClose').addEventListener('click',function(){p.hidden=true;});
document.getElementById('uniBtn').addEventListener('click',function(){p.hidden=true;});})();
