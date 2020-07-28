import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SliderService } from "./crude/slider.service";
import { Slider } from "./crude/slider";
import { Router } from '@angular/router';

@Component({
  templateUrl: 'slider.component.html'
})
export class SliderComponent  implements OnInit {

  
  sliders: Observable<Slider[]>;
  slider: Slider = new Slider();

  constructor(private sliderService: SliderService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.sliders = this.sliderService.getSliderList();
  }

  deleteSlider(id: number) {
    this.sliderService.deleteSlider(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
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
