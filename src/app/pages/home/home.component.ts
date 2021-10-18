import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

declare const TradingView: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  // products: any[];
  data: any[];
	responsiveOptions;
     // allows for loading with any symbol
     @Input() symbol = '';
     settings: any = {};
     settings1: any = {};
     // id for being able to check for errors using postMessage
     widgetId = '';

     // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
     @ViewChild( 'containerDiv', { static: false } ) containerDiv: ElementRef;
     @ViewChild( 'containerDiv1', { static: false } ) containerDiv1: ElementRef;


     products = [
       {
         name: '/assets/images/local.png'
       },
       {
        name: '/assets/images/global.png'
      },
      {
        name: '/assets/images/skrill.png'
      },
      {
        name: '/assets/images/neteller.png'
      },
    
      {
        name: '/assets/images/visa.png'
      },
    
      {
        name: '/assets/images/master.png'
      },
    
      {
        name: '/assets/images/paypal.png'
      },
    
      {
        name: '/assets/images/tether.png'
      },
    
      {
        name: '/assets/images/wallet.png'
      },
    
      {
        name: '/assets/images/unionpay.png'
      },
    
    
     ]

    plans =  [{
      name: 'Basic',
      price: '$250'
    },
    {
      name: 'Silver',
      price: '$1,000'
    },
    {
      name: 'Gold',
      price: '$5,000'
    },
    {
      name: 'Plantinum',
      price: '$25,000'
    }]

  constructor(private _elRef: ElementRef, private dashboard: DashboardService ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit(): void {
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
           
        
      }
    );
    this.getAccount();

  
  }

  private getAccount() {
    this.dashboard.getPost().subscribe(
      (data: any[]) => {
     this.data = data;
    //  this.length = data.length;

        }

      
 
    )
}


  ngAfterViewInit(): void
 {

  this.settings = {
    symbol: [
      {
        proName: 'FOREXCOM:SPXUSD',
        title: 'S&P 500'
      },
      {
        proName: 'FOREXCOM:NSXUSD',
        title: 'Nasdaq 100'
      },
      {
        proName: 'FX_IDC:EURUSD',
        title: 'EUR/USD'
      },
      {
        proName: 'BITSTAMP:BTCUSD',
        title: 'BTC/USD'
      },
      {
        proName: 'BITSTAMP:ETHUSD',
        title: 'ETH/USD'
      }
    ],
    showSymbolLogo: true,
    colorTheme: 'light',
    isTransparent: false,
    displayMode: 'adaptive',
    locale: 'uk'
  };
  const script = document.createElement( 'script' );
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  script.async = true;
  script.id = this.widgetId;
  script.innerHTML = JSON.stringify( this.settings );
  this.containerDiv.nativeElement.appendChild( script );
  const brandingDiv = document.createElement( 'div' );
  brandingDiv.innerHTML = `
<div class="tradingview-widget-copyright">
<a href="https://uk.tradingview.com" rel="noopener" target="_blank">
<span class="blue-text"> Fundamental Data</span></a>
          by TradingView
      </div>
`;



  this.settings1 = {
  colorTheme: 'dark',
    dateRange: '12M',
    showChart: true,
    locale: 'en',
    largeChartUrl: '',
    isTransparent: false,
    showSymbolLogo: true,
    width: '300',
    height: '560',
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
            d: 'S&P 500'
          },
          {
            s: 'FOREXCOM:NSXUSD',
            d: 'Nasdaq 100'
          },
          {
            s: 'FOREXCOM:DJI',
            d: 'Dow 30'
          },
          {
            s: 'INDEX:NKY',
            d: 'Nikkei 225'
          },
          {
            s: 'INDEX:DEU30',
            d: 'DAX Index'
          },
          {
            s: 'FOREXCOM:UKXGBP',
            d: 'FTSE 100'
          }
        ],
        originalTitle: 'Indices'
      },
      {
        title: 'Commodities',
        symbols: [
          {
            s: 'CME_MINI:ES1!',
            d: 'S&P 500'
          },
          {
            s: 'CME:6E1!',
            d: 'Euro'
          },
          {
            s: 'COMEX:GC1!',
            d: 'Gold'
          },
          {
            s: 'NYMEX:CL1!',
            d: 'Crude Oil'
          },
          {
            s: 'NYMEX:NG1!',
            d: 'Natural Gas'
          },
          {
            s: 'CBOT:ZC1!',
            d: 'Corn'
          }
        ],
        originalTitle: 'Commodities'
      },
      {
        title: 'Bonds',
        symbols: [
          {
            s: 'CME:GE1!',
            d: 'Eurodollar'
          },
          {
            s: 'CBOT:ZB1!',
            d: 'T-Bond'
          },
          {
            s: 'CBOT:UB1!',
            d: 'Ultra T-Bond'
          },
          {
            s: 'EUREX:FGBL1!',
            d: 'Euro Bund'
          },
          {
            s: 'EUREX:FBTP1!',
            d: 'Euro BTP'
          },
          {
            s: 'EUREX:FGBM1!',
            d: 'Euro BOBL'
          }
        ],
        originalTitle: 'Bonds'
      },
      {
        title: 'Forex',
        symbols: [
          {
            s: 'FX:EURUSD'
          },
          {
            s: 'FX:GBPUSD'
          },
          {
            s: 'FX:USDJPY'
          },
          {
            s: 'FX:USDCHF'
          },
          {
            s: 'FX:AUDUSD'
          },
          {
            s: 'FX:USDCAD'
          }
        ],
        originalTitle: 'Forex'
      }
    ]
};
  const script1 = document.createElement( 'script' );
  script1.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
  script1.async = true;
  script1.id = this.widgetId;
  script1.innerHTML = JSON.stringify( this.settings1 );
  this.containerDiv1.nativeElement.appendChild( script1 );
  const brandingDiv1 = document.createElement( 'div' );
  brandingDiv1.innerHTML = `
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/" rel="noopener" target="_blank"><span class="blue-text">
  Financial Markets</span></a> by TradingView</div>
`;


 }

}


