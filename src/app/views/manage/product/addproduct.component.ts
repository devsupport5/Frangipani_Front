import { Product } from './crude/product';
import { Category } from '../category/crude/category';
import { Author } from '../author/crude/author';
import { Currency } from '../currency/crude/currency';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from './crude/product.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService } from 'ngx-ui-loader';
 
@Component({
  templateUrl: 'addproduct.component.html'
})
export class AddProductComponent  implements OnInit  {

  id: number;
  product: Product = new Product();
  submitted = false;
  categorys: Observable<Category[]>;
  authors: Observable<Author[]>;
  currencys: Observable<Currency[]>;
  subcategorys: Observable<Category[]>;

  imageChangedEvent: any = '';
  imageChangedEvent1: any = '';
  imageChangedEvent2: any = '';
  imageChangedEvent3: any = '';
  imageChangedEvent4: any = '';
  croppedImage: any = '';
  croppedImage1: any = '';
  croppedImage2: any = '';
  croppedImage3: any = '';
  croppedImage4: any = '';
  
  flag: number = 0;
  flag1: number = 0;
  flag2: number = 0;
  flag3: number = 0;
  flag4: number = 0;

  categoryIdError: any = 0;
  categoryIdMsg: any = '';
  bookTitleNameError: any = 0;
  bookTitleNameMsg: any = '';
  priceError: any = 0;
  priceNameMsg: any = '';
  title: string;

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private productService: ProductService,
    private router: Router) { }

   reloadData() {
    this.categorys = this.productService.getCategorys();
    this.authors = this.productService.getAuthors();
    this.currencys = this.productService.getCurrencys();
  }
   

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.subcategorys = this.productService.getSubCategorys(value);
    this.setFlags();
  }


  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
    this.product = new Product();
    this.id = this.route.snapshot.params['id'];

    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }

    if(this.id!=undefined){
    this.productService.getProduct(this.id)
      .subscribe(data => {
        console.log("call-----------"+data);
        this.product = data;
        this.subcategorys = this.productService.getSubCategorys(data.categoryId);
        console.log(this.product.authorId);        
      }, error => console.log(error));
      this.ngxLoader.stop();
    }else{
      this.ngxLoader.stop();
    }
      console.log("id--------->>"+this.id)
      
      if(this.product){
        this.product.categoryId = 0;
        this.product.subCategoryId = 0;
        this.product.currencyId = 0;
        this.product.authorId = 0;
      }

  }







  newCategory(): void {
    this.submitted = false;
    this.product = new Product();
  }
 
  save() {
    this.productService.createProduct(this.product)
      .subscribe(data => {
        console.log(data)
        if(data!=null)
            this.gotoList();
      }, error => console.log(error));
    this.product = new Product();
    //this.gotoList();
  }

  setFlags(){
    this.categoryIdError = 0;
    this.bookTitleNameError = 0;
    this.priceError = 0;
  }


  onSubmit() {
 


console.log("conditin :::"+this.product.categoryId)
    if(!this.product.categoryId || this.product.categoryId==0){
      this.categoryIdError = 1;
      this.categoryIdMsg = "Please select category";     
      console.log("inside if");
      document.getElementById("categoryId").focus();
    }else if(!this.product.bookTitle){
      this.bookTitleNameError = 1;
      this.bookTitleNameMsg = "Book title cannot be empty";
      console.log("inside if");
      document.getElementById("bookTitle").focus();
    }else if(!this.product.originalPrice){
      this.priceError = 1;
      this.priceNameMsg = "Book price cannot be empty";
      console.log("inside if");
      document.getElementById("originalPrice").focus();
    }else if(!parseFloat(this.product.originalPrice+"")){
      this.priceError = 1;
      this.priceNameMsg = "Price only numeric";
      console.log("inside if");
      document.getElementById("originalPrice").focus();
    }else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save(); 
      }  

   // this.submitted = true;
    //this.save();    
  }

  gotoList() {
    this.router.navigate(['/product']);
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.product.image = reader.result.toString();
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  onFileChanged(event) {
    console.log("This is call file")
    this.getBase64(event);
  }

fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}



imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
    this.product.image = this.croppedImage;
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


fileChangeEvent1(event: any): void {
  this.imageChangedEvent1 = event;
}

imageCropped1(event: ImageCroppedEvent) {
  this.croppedImage1 = event.base64;
  console.log(this.croppedImage1);
  this.product.image1 = this.croppedImage1;
}

imageLoaded1() {
  this.flag1 = 1;
}

fileChangeEvent2(event: any): void {
  this.imageChangedEvent2 = event;
}

imageCropped2(event: ImageCroppedEvent) {
  this.croppedImage2 = event.base64;
  console.log(this.croppedImage2);
  this.product.image2 = this.croppedImage2;
}

imageLoaded2() {
  this.flag2 = 1;
}


fileChangeEvent3(event: any): void {
  this.imageChangedEvent3 = event;
}

imageCropped3(event: ImageCroppedEvent) {
  this.croppedImage3 = event.base64;
  console.log(this.croppedImage3);
  this.product.image3 = this.croppedImage3;
}

imageLoaded3() {
  this.flag3 = 1;
}


fileChangeEvent4(event: any): void {
  this.imageChangedEvent4 = event;
}

imageCropped4(event: ImageCroppedEvent) {
  this.croppedImage4 = event.base64;
  console.log(this.croppedImage4);
  this.product.image4 = this.croppedImage4;
}

imageLoaded4() {
  this.flag4 = 1;
}

}
