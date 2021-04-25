import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() carId: number;
  imageForm: FormGroup;
  @Input() carImages:CarImage[] = []
  @Input() add = false;
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.createForm();
    //setTimeout(()=>this.test(),1500)
 
    
  }

  test(){
    console.log(this.carImages)
  }
  reloadPage() {
    window.location.reload();
  }


  selectAdd(){
    this.add = true;
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

      formData.append("carId", this.carId);
      formData.append("image", this.imageForm.get('image')?.value);

      this.carImageService.imageAdd(formData).subscribe(response => {
        this.toastr.success(response.message)
        setTimeout(() => this.reloadPage(),1000)
      }, responseError => {
        this.toastr.info(responseError.error.message)
      })
    } else {
      this.toastr.error("Geçersiz Kullanım")
    }


  }

  getCarImageUrl() {
    const imageUrl: any[] = []
    this.carImages.forEach(image => {
      imageUrl.push({
        url: this.carImageService.getCarImageUrl(image.id),
        imageId: image.id
      })
    });

    console.log(imageUrl)
    
  }

}
