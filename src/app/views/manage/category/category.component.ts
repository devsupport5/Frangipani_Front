import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryService } from "./crude/category.service";
import { Category } from "./crude/category";
import { Router } from '@angular/router';


@Component({
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  
  categorys: Observable<Category[]>;

  constructor(private categoryService: CategoryService,
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

  categoryDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCategory(id: number){
    this.router.navigate(['category/update', id]);
  }

}
