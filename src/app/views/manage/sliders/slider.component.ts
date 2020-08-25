import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SliderService } from "./crude/slider.service";
import { Slider } from "./crude/slider";
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'slider.component.html'
})
export class SliderComponent  implements OnInit {

  
  sliders: Observable<Slider[]>;
  slider: Slider = new Slider();
  projectName : string;

  constructor(private ngxLoader: NgxUiLoaderService,private sliderService: SliderService,
    private router: Router) {}

  ngOnInit() {
    this.ngxLoader.start();
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData() {
    this.sliders = this.sliderService.getSliderList();
    this.ngxLoader.stop();
  }

  deleteSlider(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.sliderService.deleteSlider(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
    }   
  }

  updateSliderStatus(id: number){ 
    this.sliderService.getSlider(id).subscribe(data => {
    this.slider = data;

     if(this.slider.isActive==0)
       this.slider.isActive = 1;
     else
       this.slider.isActive = 0;
        
       this.slider.id = id;
      this.sliderService.updateSliderStatus(id,this.slider);
   }, error => console.log(error));
 }

  sliderDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateSlider(id: number){
    this.router.navigate(['slider/update', id]);
  } 

}
