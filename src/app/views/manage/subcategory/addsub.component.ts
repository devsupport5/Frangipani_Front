import { Subcategory } from './crude/subcategory';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute,Router } from '@angular/router';
import { SubcategoryService } from './crude/subcategory.service';

@Component({
  templateUrl: 'addsub.component.html'
})
export class AddsubComponent implements OnInit  {

  id: number;
  subcategory: Subcategory = new Subcategory();
  submitted = false;
  categorys: Observable<Subcategory[]>;
  

  constructor(private route: ActivatedRoute,private categoryService: SubcategoryService,
    private router: Router) { }

   reloadData() {
    this.categorys = this.categoryService.getCategorysList();
  }
   

  ngOnInit() {
    this.reloadData();
    this.subcategory = new Subcategory();
    this.id = this.route.snapshot.params['id'];
    this.categoryService.getCategory(this.id)
      .subscribe(data => {
        console.log("call-----------"+data)
        this.subcategory = data;
      }, error => console.log(error));

  }

  newCategory(): void {
    this.submitted = false;
    this.subcategory = new Subcategory();
  }
 
  save() {
    this.categoryService.createCategory(this.subcategory)
      .subscribe(data => console.log(data), error => console.log(error));
    this.subcategory = new Subcategory();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/subcategory']);
  }
 
}
