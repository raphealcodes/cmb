import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-economic-calender',
  templateUrl: './economic-calender.component.html',
  styleUrls: ['./economic-calender.component.css']
})
export class EconomicCalenderComponent implements OnInit, AfterViewInit {
    // allows for loading with any symbol
    @Input() symbol = '';
    settings: any = {};
    // id for being able to check for errors using postMessage
    widgetId = '';

    // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
    @ViewChild( 'containerDiv', { static: false } ) containerDiv: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void
  {
   this.settings = {
    colorTheme: 'light',
    isTransparent: false,
    width: '710',
    height: '600',
    locale: 'en',
    importanceFilter: '-1,0,1'
   };
   const script = document.createElement( 'script' );
   script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
   script.async = true;
   script.id = this.widgetId;
   script.innerHTML = JSON.stringify( this.settings );
   this.containerDiv.nativeElement.appendChild( script );
   const brandingDiv = document.createElement( 'div' );
   brandingDiv.innerHTML = `
 <div class="tradingview-widget-copyright">
 <a href='https://www.tradingview.com/markets/currencies/economic-calendar/' rel="noopener" target="_blank">
 <span class="blue-text">Economic; Calendar < /span></a > by; TradingView
       </div>
 `;

}

}
