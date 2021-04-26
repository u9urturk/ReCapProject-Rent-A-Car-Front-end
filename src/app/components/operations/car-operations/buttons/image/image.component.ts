import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { ImageUrl } from 'src/app/models/imageUrlModel';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() car: CarDetail;
  imageForm: FormGroup;
  carImages: CarImage[] = []
  imageId: number;
  imageUrls: ImageUrl[] = [];
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private carImageService: CarImageService) { }

  ngOnInit(): void {
    this.createForm();
    this.getCarImageDataByCarId();

  }
  reloadPage() {
    window.location.reload();
  }

  // Image Upload 
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

      formData.append("carId", this.car.carId);
      formData.append("image", this.imageForm.get('image')?.value);

      this.carImageService.imageAdd(formData).subscribe(response => {
        this.toastr.success(response.message)
        setTimeout(() => this.reloadPage(), 1000)
      }, responseError => {
        this.toastr.info(responseError.error.message)
      })
    } else {
      this.toastr.error("Geçersiz Kullanım")
    }


  }



  setCurrentImageId(id: number) {
    this.imageId = id;
    console.log(this.imageId)
  }

  // Image Delete
  deleteImage() {
    //console.log(this.imageId)
    if (this.imageId != 0) {
      var formData: any = new FormData();
      formData.append("id", this.imageId)

      this.carImageService.imageDelete(formData).subscribe(response => {
        this.toastr.success(response.message)
        setTimeout(() => this.reloadPage(), 1000)
      }, responseError => {
        this.toastr.error(responseError.error.message)
      })
    }else{
      this.toastr.warning("Varsayılan Fotoğraf Silinemez","Dikkat ! ")
    }


  }
  //----------------------------------------------------------------

  //Image Update
  updateImage() {
    if (this.imageForm.valid) {
      var formData: any = new FormData();
      formData.append("id", this.imageId);
      formData.append("image", this.imageForm.get("image")?.value);

      this.carImageService.imageUpdate(formData).subscribe(response => {
        this.toastr.success(response.message);
        setTimeout(() => this.reloadPage(), 1000)
      }, responseError => {
        this.toastr.warning(responseError.error.message)
      })

    } else {
      this.toastr.error("Geçersiz Kullanım")
    }

  }

  //----------------------------------------------------------------

  getCarImageDataByCarId() {
    this.carImageService.getCarImagesByCarId(this.car.carId).subscribe(response => {
      this.carImages = response.data;
      //console.log(response.data);
      this.getCarImageUrl();
    })
  }

  getCarImageUrl() {
    this.carImages.forEach(image => {
      this.imageUrls.push({
        url: this.carImageService.getCarImageUrl(image.id),
        imageId: image.id
      })
    });

    //console.log(this.imageUrls);

  }

}
