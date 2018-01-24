<script type="text/javascript">
$( document ).ready(function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ["Ene-17", "Feb-17", "Mar-17", "Abr-17", "May-17", "Jun-17", "Jul-17", "Ago-17", "Sep-17", "Oct-17", "Nov-17", "Dic-17", "Ene-18", "Feb-18", "Mar-18"],
          datasets: [{
              label: "Sonora Norte",
              backgroundColor: 'rgba(0,155,255,0.8)',
              borderColor: 'rgba(87,96,101,0.9)',
              data: [ 26.12, 24.55, 23.52, 23.50, 22.33, 24.39, 25.56, 25.19, 23.88, 24.56, 24.81, 25.54, 26.98, 26.53, 25.47]
          }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Mes'
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Precio mensual de cerdo en granja [$/Kg]'
              }
          }]
        },
      }
    });

    var ctxb = document.getElementById('myChartb').getContext('2d');
    var chartb = new Chart(ctxb, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
          labels: ["Ene-17", "Feb-17", "Mar-17", "Abr-17", "May-17", "Jun-17", "Jul-17", "Ago-17", "Sep-17", "Oct-17", "Nov-17", "Dic-17", "Ene-18", "Feb-18", "Mar-18"],
          datasets: [{
              label: "Sonora Sur",
              backgroundColor: 'rgba(0,155,255,0.8)',
              borderColor: 'rgba(87,96,101,0.9)',
              data: [26.17, 24.71, 23.64, 23.41, 22.34, 24.46, 25.63, 25.32, 23.96, 24.76, 24.95, 25.68, 27.10, 26.73, 25.56],
          }]
      },

      // Configuration options go here
      options: {
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Mes'
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                  display: true,
                  labelString: 'Precio mensual de cerdo en granja [$/Kg]'
              }
          }]
        },
      },
      responsive: true
    });

});
</script>

    <div class="row">
      <h1>Sonora</h1>
      <div class="col-sm-10 col-sm-offset-1">
        <canvas id="myChart" width="600" height="400"></canvas>
        <canvas id="myChartb" width="600" height="400"></canvas>
      </div>
    </div>
