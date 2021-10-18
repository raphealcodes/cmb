import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TradingPlatfrom-Frontend';
  userAuthenticated = false;
  userVerify = false;
  authenticatedSub: Subscription;


  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;


  public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(private authservice: AuthService, private idle: Idle, private keepalive: Keepalive, 
    private router: Router, private modalService: BsModalService,) {

 // sets an idle timeout of 5 seconds, for testing purposes.
 idle.setIdle(120);
 // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
 idle.setTimeout(15);
 // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
 idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

 idle.onIdleEnd.subscribe(() => { 
   this.idleState = 'No longer idle.'
  //  console.log(this.idleState);
   this.reset();
 });
 
 idle.onTimeout.subscribe(() => {
   this.childModal.hide();
   this.idleState = 'Timed out!';
   this.timedOut = true;
  //  console.log(this.idleState);
   this.authservice.logoutUser();
   idle.stop();
  //  this.router.navigate(['/']);
 });
 
 idle.onIdleStart.subscribe(() => {
     this.idleState = 'You\'ve gone idle!'
    //  console.log(this.idleState);
     this.childModal.show();
 });
 
 idle.onTimeoutWarning.subscribe((countdown) => {
   this.idleState = 'You will time out in ' + countdown + ' seconds!'
  //  console.log(this.idleState);
 });

 // sets the ping interval to 15 seconds
 keepalive.interval(15);

 keepalive.onPing.subscribe(() => this.lastPing = new Date());

 this.authservice.getAuthenticatedListener().subscribe(userLoggedIn => {
   if (userLoggedIn) {
     idle.watch()
     this.timedOut = false;
     this.reset();
   } else {
     idle.stop();
     this.timedOut = true;
   }
 })


  }


  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    this.authservice.logoutUser();
    // this.router.navigate(['/']);
  }


  inItContents = () => {

    // ============== User Authentication ========================
    this.authservice.automaticAuthenticationData();
    this.userAuthenticated = this.authservice.getAuthenticated();
    this.userVerify = this.authservice.getIsVerify();
    this.authenticatedSub = this.authservice.getAuthenticatedListener()
        .subscribe((isAuthenticated: boolean) => {
          this.userAuthenticated = isAuthenticated;
        });

    this.authenticatedSub = this.authservice.getVerifyListener()
      .subscribe((isVerify: boolean) => {
          this.userVerify = isVerify;
      });
    // ============== End User Authentication ==================
    // console.log(this.userVerify);
    // console.log(this.userAuthenticated);
  }


  ngOnInit() {
      // ==============***********=====================

      this.inItContents();
    // ==============***********=====================
  }
}
