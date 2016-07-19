if(typeof pollOptions !== 'undefined') {
  var ctx = $("#pollChart");
  var labels = []
  var values = [];
  var bgcolors = [];

  pollOptions.forEach(function(option) {
    labels.push(option.name);
    values.push(option.votes);
  });

  values.forEach(function(val) {
    bgcolors.push(randomColor({
      luminosity: 'bright',
      hue: 'red'
    }));
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
    options: {
      animation: {
        animateScale: true
      },
      legend: {
        position: 'bottom',
      }
    }
  });
}
