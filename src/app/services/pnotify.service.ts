import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';
@Injectable({
  providedIn: 'root'
})
export class PnotifyService {
  pnotify = undefined;

  constructor() {
    this.pnotify = this.getPNotify();
  }

  getPNotify = () => {
    // tslint:disable-next-line: no-unused-expression
    PNotifyButtons;
    // tslint:disable-next-line: no-unused-expression
    PNotifyConfirm ;

    return PNotify;
  }

  notify = (title: string): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.notice({
      title: `Welcome ${title}!`,
      stack: stackTopModal,
      width: '400px',
      // text: `${text}`,
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifyD = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.success({
      // title: 'Wallet Deposited',
      stack: stackTopModal,
      text: 'Deposit in progress, waiting for your approval',
      width: '270px',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }


  notifyWI = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.success({
      // title: 'Wallet Deposited',
      stack: stackTopModal,
      text: 'Withdraw requested',
      width: '270px',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifySuccess = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.success({
      // title: 'Wallet Deposited',
      stack: stackTopModal,
      text: 'File Upload Successfully',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifySucces = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.success({
      // title: 'Wallet Deposited',
      stack: stackTopModal,
      text: 'Post Upload Successfully',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifyTrans = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.success({
      // title: 'Wallet Deposited',
      stack: stackTopModal,
      text: 'Personal Data Updated',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifyW = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.notice({
      title: `Kindly Input code sent to your email!`,
      stack: stackTopModal,
      // text: `${text}`,
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      // icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notifyResendOTP = (): any => {
    const stackTopModal = {
      dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
      // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
      firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
      // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
      push: 'top', // Each new notice will appear at the bottom of the screen,
      modal: false, // When a notice appears in this stack, a modal overlay will be created.
      overlayClose: false, // When the user clicks on the overlay, all notices in this stack will be closed.
    };
    this.pnotify = this.getPNotify();
    this.pnotify.notice({
      title: `Code sent to your email!`,
      stack: stackTopModal,
      // text: `${text}`,
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      // icons: 'fontawesome4',
      // type: `${type}`
    });
  }

  notAllowed = (title: string) => {
    this.pnotify = this.getPNotify();
    this.pnotify.alert({
      title: `${title}`,
      position: 'top',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      timer: 5000,

    });
  }

  notError = (title: string) => {

const stackTopModal = {
  dir1: 'down', // With a dir1 of "up", the stacks will start appearing at the bottom.
  // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
  firstpos1: 25, // The notices will appear 25 pixels from the bottom of the context.
  // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
  push: 'top', // Each new notice will appear at the bottom of the screen,
  modal: true, // When a notice appears in this stack, a modal overlay will be created.
  overlayClose: true, // When the user clicks on the overlay, all notices in this stack will be closed.
};
this.pnotify = this.getPNotify();
this.pnotify.error({
      title: title ? 'Error' : `Oops!`,
      position: 'top',
      hide: false,
      text:  title ? `${title}` : `No network! reload`,
      stack: stackTopModal,
      addClass: 'custom',
      cornerclass: 'ui-pnotify-sharp',
      styling: 'bootstrap4',
      icons: 'fontawesome4',
      // modules: {
      //   Confirm: {
      //     confirm: true,
      //     focus: null,
      //     buttons: [
      //       {
      //         text: 'Ok',
      //         textTrusted: false,
      //         addClass: '',
      //         primary: true,
      //         // Whether to trigger this button when the user hits enter in a single line
      //         // prompt. Also, focus the button if it is a modal prompt.
      //         promptTrigger: true,
      //         click: (notice, value) => {
      //           notice.close();

      //         }
      //       }
      //     ]
      //   }
      // }

    });
  }

}
