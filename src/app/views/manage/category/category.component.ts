import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { CategoryService } from "./crude/category.service";
import { Category } from "./crude/category";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  
  categorys: Observable<Category[]>;
  category: Category = new Category();
  projectName : string;

  config: any;
  collection = [];
  /*items = [];
  pageOfItems: Array<any>;*/

  

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private router: Router,private http: HttpClient) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 5,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );
    }

    pageChange(newPage: number) {
      this.router.navigate(['category'], { queryParams: { page: newPage } });
    }


  ngOnInit() {
    this.reloadData();
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
 
  }


  
  

  reloadData() {
    console.log("call Reload data");  
    //this.categorys = this.categoryService.getCategorysList();
    this.categoryService.getCategorysList().subscribe(res => {
      this.collection = res;
    });
    
  }

   
  deleteCategory(id: number) {

    if(confirm("Are you sure to delete ")) {
      this.categoryService.deleteCategory(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      }
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
