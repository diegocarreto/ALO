
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
              label: "Nuevo León",
              backgroundColor: 'rgba(0,155,255,0.9)',
              borderColor: 'rgba(87,96,101,1)',
              data: [72.89,
67.64,
68.52,
69.65,
71.57,
73.18,
71.06,
71.88,
76.33,
80.86,
82.78,
71.08,
71.62,
73.60,
77.68]
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
                  labelString: 'PRECIO MENSUAL DE CAPRINOS [$/Kg]'
              }
          }]
        },
      }
  });

});
</script>

    <div class="row">
      <h1>Nuevo León</h1>
      <div class="col-sm-12">
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>

