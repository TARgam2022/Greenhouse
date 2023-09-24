import { Component } from '@angular/core';

@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
export class TempChartComponent {
  chartType = 'line';

  chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }
}
