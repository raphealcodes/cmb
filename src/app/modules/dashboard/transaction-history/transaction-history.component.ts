import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  data;
  dataInv: any[] = [];
  account_verified = 'Pending';
  constructor(
    private dashboard: DashboardService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(() => {
      this.getAccount();
      this.getInvoice();
    });
    this.getAccount();
    this.getInvoice();
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

  private getInvoice() {
    this.dashboard.getInvoices().subscribe((data: any[]) => {
      this.dataInv = data;
      if (this.data) {
        // this.account_verified = data['0'].owner.user_status;
      }
    });
    this.spinner.hide();
  }
}
