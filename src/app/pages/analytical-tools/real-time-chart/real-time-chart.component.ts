import { AfterViewInit, Component, OnInit } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-real-time-chart',
  templateUrl: './real-time-chart.component.html',
  styleUrls: ['./real-time-chart.component.css']
})
export class RealTimeChartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

      // tslint:disable-next-line: no-unused-expression
      new TradingView.widget(
      {
      width: 1000,
      height: 610,
      symbol: 'NASDAQ:AAPL',
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_b4281'
    }
      );

  }

}
