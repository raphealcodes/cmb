import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
declare const TradingView: any;
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit, AfterViewInit {
  // allows for loading with any symbol
  @Input() symbol = '';
  settings1: any = {};
  // id for being able to check for errors using postMessage
  widgetId = '';

  // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
  @ViewChild('containerDiv1', { static: false }) containerDiv1: ElementRef;
  data;
  account_verified = 'Pending';
  constructor(
    private dashboard: DashboardService,
    private _elRef: ElementRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(() => {
      this.getAccount();
    });
    this.getAccount();
  }

  private getAccount() {
    this.dashboard.getAccount().subscribe((data: any[]) => {
      this.data = data;
      if (this.data) {
        this.account_verified = data['0'].owner.user_status;
      }
    });
    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line: no-unused-expression
    new TradingView.widget({
      width: 900,
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
      container_id: 'tradingview_b4281',
    });

    this.settings1 = {
      colorTheme: 'light',
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      largeChartUrl: '',
      isTransparent: false,
      showSymbolLogo: true,
      width: '900',
      height: '660',
      plotLineColorGrowing: 'rgba(33, 150, 243, 1)',
      plotLineColorFalling: 'rgba(33, 150, 243, 1)',
      gridLineColor: 'rgba(240, 243, 250, 1)',
      scaleFontColor: 'rgba(120, 123, 134, 1)',
      belowLineFillColorGrowing: 'rgba(33, 150, 243, 0.12)',
      belowLineFillColorFalling: 'rgba(33, 150, 243, 0.12)',
      symbolActiveColor: 'rgba(33, 150, 243, 0.12)',
      tabs: [
        {
          title: 'Indices',
          symbols: [
            {
              s: 'FOREXCOM:SPXUSD',
              d: 'S&P 500',
            },
            {
              s: 'FOREXCOM:NSXUSD',
              d: 'Nasdaq 100',
            },
            {
              s: 'FOREXCOM:DJI',
              d: 'Dow 30',
            },
            {
              s: 'INDEX:NKY',
              d: 'Nikkei 225',
            },
            {
              s: 'INDEX:DEU30',
              d: 'DAX Index',
            },
            {
              s: 'FOREXCOM:UKXGBP',
              d: 'FTSE 100',
            },
          ],
          originalTitle: 'Indices',
        },
        {
          title: 'Commodities',
          symbols: [
            {
              s: 'CME_MINI:ES1!',
              d: 'S&P 500',
            },
            {
              s: 'CME:6E1!',
              d: 'Euro',
            },
            {
              s: 'COMEX:GC1!',
              d: 'Gold',
            },
            {
              s: 'NYMEX:CL1!',
              d: 'Crude Oil',
            },
            {
              s: 'NYMEX:NG1!',
              d: 'Natural Gas',
            },
            {
              s: 'CBOT:ZC1!',
              d: 'Corn',
            },
          ],
          originalTitle: 'Commodities',
        },
        {
          title: 'Bonds',
          symbols: [
            {
              s: 'CME:GE1!',
              d: 'Eurodollar',
            },
            {
              s: 'CBOT:ZB1!',
              d: 'T-Bond',
            },
            {
              s: 'CBOT:UB1!',
              d: 'Ultra T-Bond',
            },
            {
              s: 'EUREX:FGBL1!',
              d: 'Euro Bund',
            },
            {
              s: 'EUREX:FBTP1!',
              d: 'Euro BTP',
            },
            {
              s: 'EUREX:FGBM1!',
              d: 'Euro BOBL',
            },
          ],
          originalTitle: 'Bonds',
        },
        {
          title: 'Forex',
          symbols: [
            {
              s: 'FX:EURUSD',
            },
            {
              s: 'FX:GBPUSD',
            },
            {
              s: 'FX:USDJPY',
            },
            {
              s: 'FX:USDCHF',
            },
            {
              s: 'FX:AUDUSD',
            },
            {
              s: 'FX:USDCAD',
            },
          ],
          originalTitle: 'Forex',
        },
      ],
    };
    const script1 = document.createElement('script');
    script1.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script1.async = true;
    script1.id = this.widgetId;
    script1.innerHTML = JSON.stringify(this.settings1);
    this.containerDiv1.nativeElement.appendChild(script1);
    const brandingDiv1 = document.createElement('div');
    brandingDiv1.innerHTML = `
    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/" rel="noopener" target="_blank"><span class="blue-text">
    Financial Markets</span></a> by TradingView</div>
  `;
  }
}
