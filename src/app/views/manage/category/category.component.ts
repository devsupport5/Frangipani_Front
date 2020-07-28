import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryService } from "./crude/category.service";
import { Category } from "./crude/category";
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  
  categorys: Observable<Category[]>;
  category: Category = new Category();


  private baseUrlstatus = 'http://localhost:8080/springboot-crud-rest/api/cat/categorys';

  constructor(private categoryService: CategoryService,
    private router: Router,private http: HttpClient) {}

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
     this.category = data;

      if(this.category.isActive==0)
        this.category.isActive = 1;
      else
        this.category.isActive = 0;
         
        this.category.id = id;
       this.categoryService.updateCategoryStatus(id,this.category);
    }, error => console.log(error));
  }

  categoryDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCategory(id: number){
    this.router.navigate(['category/update', id]);
  }

}
