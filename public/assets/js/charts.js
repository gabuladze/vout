var ctx = $("#pollChart");
var labels = []
var values = [];
var bgcolors = [];

var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

pollOptions.forEach(function(option) {
  labels.push(option.name);
  values.push(option.votes);
});

values.forEach(function(val) {
  bgcolors.push(dynamicColors());
});

new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: bgcolors
      }
    ]
  },

});
