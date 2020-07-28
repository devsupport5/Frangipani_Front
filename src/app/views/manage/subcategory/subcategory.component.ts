import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SubcategoryService } from "./crude/subcategory.service";
import { Subcategory } from "./crude/subcategory";
import { Router } from '@angular/router';

@Component({
  templateUrl: 'subcategory.component.html'
})
export class SubCategoryComponent implements OnInit {

  
  categorys: Observable<Subcategory[]>;
  subcategorys: Observable<Subcategory[]>;
  subcategory: Subcategory = new Subcategory();

  constructor(private categoryService: SubcategoryService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.categorys = this.categoryService.getCategorysList();
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateCategoryStatus(id: number){ 
    this.categoryService.getCategory(id).subscribe(data => {
    this.subcategory = data;

     if(this.subcategory.isActive==0)
       this.subcategory.isActive = 1;
     else
       this.subcategory.isActive = 0;
        
       this.subcategory.id = id;
      this.categoryService.updateCategoryStatus(id,this.subcategory);
   }, error => console.log(error));
 }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    this.subcategorys = this.categoryService.getSubCategorys(value);
}


  categoryDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCategory(id: number){
    this.router.navigate(['subcategory/update', id]);
  }
}
