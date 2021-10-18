import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-access-payment',
  templateUrl: './access-payment.component.html',
  styleUrls: ['./access-payment.component.css']
})
export class AccessPaymentComponent implements OnInit, AfterViewInit {
  widgetId = '';
  settings: any = {};
  @ViewChild( 'containerDiv', { static: false } ) containerDiv: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // const script = document.createElement( 'script' );
    // script.src = 'https://www.blockonomics.co/js/pay_button.js';
    // script.async = true;
    // script.id = this.widgetId;
    // script.innerHTML = JSON.stringify( this.settings );
    // this.containerDiv.nativeElement.appendChild( script );
    // const brandingDiv = document.createElement( 'div' );

//  if(!window.btcpay){    var head = document.getElementsByTagName('head')[0];   
//     var script = document.createElement('script');   script.src='https://btcpaymerchant.com/modal/btcpay.js';   
//     script.type = 'text/javascript';   head.append(script);}
//     function onBTCPayFormSubmit(event){    var xhttp = new XMLHttpRequest();
//           xhttp.onreadystatechange = function() {        if (this.readyState == 4 && this.status == 200) 
//             {            if(this.status == 200 && this.responseText){              
//                 var response = JSON.parse(this.responseText);            
//                     window.btcpay.showInvoice(response.invoiceId);            }        }    };  
//                       xhttp.open("POST", event.target.getAttribute('action'), true);  
//                         xhttp.send(new FormData( event.target ));}
  }

}
