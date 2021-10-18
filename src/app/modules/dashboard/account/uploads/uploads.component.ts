import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PnotifyService } from 'src/app/services/pnotify.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {


  imageUploadForm: FormGroup;

  companyLogo$: Observable<SafeUrl>;
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

  id_card_front: File = null;
  id_card_back: File = null;
  utility_bill: File = null;

  id_front = null
  id_back = null
  utility = null


  uploads = [];

  account_verified = 'Pending';
  userName = localStorage.getItem('userDetails')
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder,
    private notify: PnotifyService,
     private dashboard: DashboardService,
     private spinner: NgxSpinnerService) { 
    this.imageUploadForm = this.fb.group({
      utility_bill: ['']
    });
  }

  ngOnInit() {
  this.spinner.show();
    this.dashboard.ReloadNeeded.subscribe(
      () => {
        this.getUpload();
        this.getAccount();
        
      }
    );

    this.getUpload();
    this.getAccount();
  }

  public changePicture1(event) {
    this.imageToUpload1 = <File>event.target.files[0];
    if (this.imageToUpload1) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.userImage1 = event.target.result;
        this.imgURL1 = this.userImage1;
        this.uploadedImage1 = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(this.imgURL1));
        // this.cdr.detectChanges();
      };
      // return this.uploadLogo();
    }
  }

  public changePicture2(event) {
    this.imageToUpload2 = <File>event.target.files[0];
    if (this.imageToUpload2) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.userImage2 = event.target.result;
        this.imgURL2 = this.userImage2;
        this.uploadedImage2 = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(this.imgURL2));
        // this.cdr.detectChanges();
      };
      // return this.uploadLogo();
    }}

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
    this.imageToUpload1 = files.item(0);
    this.imageToUpload2 = files.item(0);
    this.imageToUpload3 = files.item(0);
  }

  private getUpload() {
    this.dashboard.getDoc().subscribe(
      (data: any[]) => {
    this.uploads = data;
    this.spinner.hide();
     }
        

      
 
    )}

    private getAccount() {
      this.dashboard.getAccount().subscribe((data: any[]) => {
        if (data) {
          this.account_verified = data['0'].owner.user_status;
        }
      });
      this.spinner.hide();
    }


  onDrop() {
    this.spinner.show();
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.imageUploadForm.get('profile_picture').setValue(file);
    // }
    const formData = new FormData();
    formData.append('id_card_front', this.imageToUpload1);
    formData.append('id_card_back', this.imageToUpload2);
    formData.append('utility_bill', this.imageToUpload3);
    this.dashboard.uploadDoc(formData).subscribe(
      res => {
        this.notify.notifySuccess();
        this.spinner.hide();
      });
    }
}
