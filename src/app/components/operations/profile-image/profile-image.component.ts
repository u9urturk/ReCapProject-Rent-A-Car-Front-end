import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileImage } from 'src/app/models/ProfileImage';
import { ProfileImageService } from 'src/app/services/profile-image.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {
  userId: number;
  imageForm: FormGroup;
  profileImage!: ProfileImage;
  profileImageUrl: string = ""
  update = false;
  add = false;
  constructor(private fb: FormBuilder,
    private profileImageService: ProfileImageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserId()
    this.getProfileImage();
    this.createForm();
  }

  reloadPage() {
    window.location.reload();
  }

  selectUpdate(){
    this.update = true;
    this.add = false;
  }

  selectAdd(){
    this.add = true;
    this.update = false;
  }

  // Profile  Upload 
  createForm() {
    this.imageForm = this.fb.group({
      image: [null, Validators.required],
    })
  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.imageForm.patchValue({
      image: file
    });
    this.imageForm.get('image')?.updateValueAndValidity()
  }

  addImage() {
    //console.log(this.imageForm.value)
    if (this.imageForm.valid) {
      var formData: any = new FormData();

      formData.append("userId", this.userId);
      formData.append("image", this.imageForm.get('image')?.value);

      this.profileImageService.imageAdd(formData).subscribe(response => {
        this.toastr.success(response.message)
        setTimeout(() => this.reloadPage(),1000)
      }, responseError => {
        this.toastr.info(responseError.error.message)
      })
    } else {
      this.toastr.error("Geçersiz Kullanım")
    }


  }

  //----------------------------------------------------------------
  // Image Delete
  deleteImage() {
    var formData: any = new FormData();
    formData.append("id", this.profileImage.id)

    this.profileImageService.imageDelete(formData).subscribe(response => {
      this.toastr.success(response.message)
      setTimeout(() => this.reloadPage(),1000)
    }, responseError => {
      this.toastr.error(responseError.error.message)
    })

  }
  //----------------------------------------------------------------

  //Image Update
  updateImage() {
    if (this.imageForm.valid) {
      var formData: any = new FormData();
      formData.append("id", this.profileImage.id);
      formData.append("image", this.imageForm.get("image")?.value);

      this.profileImageService.imageUpdate(formData).subscribe(response=>{
        this.toastr.success(response.message);
        setTimeout(() => this.reloadPage(),1000)
      },responseError=>{
        this.toastr.warning(responseError.error.message)
      })

    }else{
      this.toastr.error("Geçersiz Kullanım")
    }

  }

  //----------------------------------------------------------------

  // Get Profile Image
  getProfileImage() {
    this.profileImageService.getProfileImagesByUserId(this.userId)
      .subscribe((response) => {
        this.profileImage = response.data[0];
        this.profileImageUrl = this.profileImageService.getProfileImageUrl(this.profileImage.id)
      })
  }
  //----------------------------------------------------------------
  getUserId() {
    this.userId = Number(localStorage.getItem("userId"))
  }

}
