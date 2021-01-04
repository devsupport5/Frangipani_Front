import { Category } from './crude/category';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CategoryService } from './crude/category.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  category: Category = new Category();
  submitted = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  flag: number = 0;
  title: string;
  categoryNameError: any = 0;
  categoryNameMsg: any = '';


  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private categoryService: CategoryService,
    private router: Router) { }




  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }

    this.category = new Category();
    this.id = this.route.snapshot.params['id'];
    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }

if(this.id!=undefined){
    this.categoryService.getCategory(this.id)
      .subscribe(data => {
        console.log(data)
        this.category = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    }

  }

  newCategory(): void {
    this.submitted = false;
    this.category = new Category();
  }

  setFlags(){
    this.categoryNameError = 0;
  }

 async save() {
     this.categoryService.createCategory(this.category)
      .subscribe(data => {
          console.log(data);
          if(data!=null)
            this.gotoList();
      } , error => console.log(error));
    this.category = new Category();

  }

  onFileChanged(event) {
    console.log("This is call file")
    this.getBase64(event);
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.category.image = reader.result.toString();
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


 fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
  console.log(this.croppedImage);
  this.category.image = this.croppedImage;
}
imageLoaded() {
  this.flag = 1;
}
cropperReady() {
  /* cropper ready */
}
loadImageFailed() {
  /* show message */
}

  onSubmit() {
    //this.submitted = true;
    //this.save();

    if(!this.category.categoryName){
      this.categoryNameError = 1;
      this.categoryNameMsg = "Category Name cannot be empty";
      console.log("inside if");
      document.getElementById("categoryName").focus();
    }
    else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save();
      }

  }

  gotoList() {
    this.router.navigate(['/category']);
  }

}
