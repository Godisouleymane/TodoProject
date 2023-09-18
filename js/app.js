let myChart = document.getElementById('myDoughnutChart');
let myDoughnutChart = new Chart(myChart, {
  type: 'doughnut',
  data: {
    labels: [], 
    datasets: [{
      data: [100, 20, 49], 
      backgroundColor: ['red', 'green', 'blue'], 
      borderColor: [],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
   },
   
 });