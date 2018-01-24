
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
              label: "Coahuila",
              backgroundColor: 'rgba(0,155,255,0.9)',
              borderColor: 'rgba(87,96,101,1)',
              data: [16.92,
18.83,
17.03,
18.64,
19.65,
16.83,
18.50,
21.20,
21.88,
18.94,
20.92,
19.24,
20.46,
19.26,
18.81]
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
                  labelString: 'PRECIO MENSUAL DE HUEVO [$/Kg]'
              }
          }]
        },
      }
  });

});
</script>

    <div class="row">
      <h1>Coahuila</h1>
      <div class="col-sm-12">
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>

