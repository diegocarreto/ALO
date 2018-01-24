
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
              label: "Zacatecas",
              backgroundColor: 'rgba(0,155,255,0.9)',
              borderColor: 'rgba(87,96,101,1)',
              data: [36.00,
36.07,
40.00,
40.00,
40.00,
40.00,
40.00,
38.29,
38.29,
39.16,
39.61,
39.27,
41.42,
40.81,
41.79]
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
                  labelString: 'PRECIO MENSUAL DE BOVINO [$/Kg]'
              }
          }]
        },
      }
  });

});
</script>

    <div class="row">
      <h1>Zacatecas</h1>
      <div class="col-sm-12">
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>

