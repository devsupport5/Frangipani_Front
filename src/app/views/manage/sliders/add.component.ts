import { Slider } from './crude/slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SliderService } from './crude/slider.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  category: Slider = new Slider();
  submitted = false;
  title: string;

  sliderNameError: any = 0;
  sliderNameMsg: any = '';
  sliderImageError: any = 0;
  sliderImageMsg: any = '';

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private sliderService: SliderService,
    private router: Router) { }


     

  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.category = new Slider();
    this.id = this.route.snapshot.params['id'];

    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }

    if(this.id!=undefined){
    this.sliderService.getSlider(this.id)
      .subscribe(data => {
        console.log(data)
        this.category = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    }

       

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



  /*onFileChange(event : any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
*/


  newCategory(): void {
    this.submitted = false;
    this.category = new Slider();
  }

  setFlags(){
    this.sliderNameError = 0;
    this.sliderImageError = 0;
  }

  save() {
    this.sliderService.createSlider(this.category)
      .subscribe(data => {
        console.log(data)
        if(data!=null)
            this.gotoList();
      }, error => console.log(error));
    this.category = new Slider();
    //this.gotoList();
  }

  onSubmit() {
    if(!this.category.sliderName){
      this.sliderNameError = 1;
      this.sliderNameMsg = "Slider name can not be empty";
      document.getElementById("sliderName").focus();
      console.log("inside if");
    }else if(!this.category.image){
      this.sliderImageError = 1;
      this.sliderImageMsg = "Plesae select slier image";
      console.log("inside if");
    }else{
      this.submitted = true;
      this.save(); 
    }    
  }

  gotoList() {
    this.router.navigate(['/slider']);
  }
 
}
