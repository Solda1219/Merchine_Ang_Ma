import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  selector: 'app-dashboard-all',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  loading;
  radioModel: string = 'Month';

  // lineChart1

  ngOnInit(): void {
    // generate random values for mainChart
    this.loading= false;
  }
}
