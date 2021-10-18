import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PnotifyService } from 'src/app/services/pnotify.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  data: any[];
  dataSummary: any;
  account_verified: boolean = true;
  firstPayment = true;
  length: any;
  show = false;
  invoice = false;
  blogForm: FormGroup;


  companyImage: SafeUrl;

  dob;
  myUrl;
  userImage1: SafeUrl;
  userImage2: SafeUrl;
  userImage3: SafeUrl;
  isOptional = false;
  profilePicture$: Observable<SafeUrl>;
  profileImage: SafeUrl;
  imageToUpload1: File = null;
  imageToUpload2: File = null;
  imageToUpload3: File = null;
  imgURL1;
  imgURL2;
  imgURL3;
  pictureAvailable;
  btnCaption;
  uploadedImage1;
  uploadedImage2;
  uploadedImage3;
  invoices: any[];
  constructor(private dashboard: DashboardService
    , private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private notify: PnotifyService, private fb: FormBuilder,) { 
      this.blogForm = this.fb.group({
        title: [''],
        link: ['']
      });
    }
  ngOnInit() {
    this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
           this.getAccount();
           this.getAccountSummary();
           this.getInvoice();
        
      }
    );
    this.getAccount();
    this.getAccountSummary();
    this.getInvoice();
  }

  activate(id: any, event: any) {
    // console.log(id);
    const data: any = {
      user_status: event
    };
    this.dashboard.activateUser(id, data).subscribe(
      res => {
      //   console.log(res);
      }
    )
  }

  showAccount = () => this.show = !this.show;
  showInvoice = () => this.invoice = !this.invoice;
  public changePicture3(event) {

      
    this.imageToUpload3 = <File>event.target.files[0];
    if (this.imageToUpload3) {
      
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.userImage3 = event.target.result;
        this.imgURL3 = this.userImage3;
        this.uploadedImage3 = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(this.imgURL3));
        // this.cdr.detectChanges();
      };
      // return this.uploadLogo();
    }
  }

  handleFileImage(files: FileList) {

    this.imageToUpload3 = files.item(0);
  }

  onDrop() {
    this.spinner.show();
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.imageUploadForm.get('profile_picture').setValue(file);
    // }
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('link', this.blogForm.get('link').value);
    formData.append('image', this.imageToUpload3);
    // console.log(formData);
    this.dashboard.postBlog(formData).subscribe(
      res => {
        this.notify.notifySucces();
        this.spinner.hide();
      });
    this.show = false;
    this.blogForm.reset();
    }


  

   private getAccount() {
    this.dashboard.getUser().subscribe(
      (data: any[]) => {
     this.data = data;
     this.length = data.length;
     if(this.data) {
    // this.account_verified = data['0'].is_account_verified;
    // this.firstPayment = data['0'].owner.is_first_payment;
     }
        }

      
 
    )
    this.spinner.hide();}

    private getInvoice() {
      this.dashboard.getInvoice().subscribe(
        (data: any[]) => {
       this.invoices = data;
      //  this.length = data.length;
       if(this.data) {
      // this.account_verified = data['0'].is_account_verified;
      // this.firstPayment = data['0'].owner.is_first_payment;
       }
          }
  
        
   
      )
      this.spinner.hide();}

    private getAccountSummary() {
      this.dashboard.getUserSummary().subscribe(
        (data: any[]) => {
       this.dataSummary = data;
       this.length = data.length;
       if(this.data) {
      // this.account_verified = data['0'].is_account_verified;
      // this.firstPayment = data['0'].owner.is_first_payment;
       }
          }
  
        
   
      )
      this.spinner.hide();}

}
