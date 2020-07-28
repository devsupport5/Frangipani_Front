import { Slider } from './crude/slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { SliderService } from './crude/slider.service';



@Component({
  templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit  {

  id: number;
  category: Slider = new Slider();
  submitted = false;
   

  constructor(private route: ActivatedRoute,private sliderService: SliderService,
    private router: Router) { }


     

  ngOnInit() {
    this.category = new Slider();
    this.id = this.route.snapshot.params['id'];
    this.sliderService.getSlider(this.id)
      .subscribe(data => {
        console.log(data)
        this.category = data;
      }, error => console.log(error));


       

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

  save() {
    this.sliderService.createSlider(this.category)
      .subscribe(data => console.log(data), error => console.log(error));
    this.category = new Slider();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/slider']);
  }
 
}
