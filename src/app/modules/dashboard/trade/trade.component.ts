import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
})
export class TradeComponent implements OnInit {
  data;
  account_verified = 'Pending';
  constructor(
    private dashboard: DashboardService,
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
}
