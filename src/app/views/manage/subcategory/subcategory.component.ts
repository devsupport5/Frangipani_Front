import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { SubcategoryService } from "./crude/subcategory.service";
import { Subcategory } from "./crude/subcategory";
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  templateUrl: 'subcategory.component.html'
})
export class SubCategoryComponent implements OnInit {

  
  categorys: Observable<Subcategory[]>;
  subcategorys: Observable<Subcategory[]>;
  subcategory: Subcategory = new Subcategory();
  projectName : string;

  totalPage : string;
  decimalOnly :number;
  config: any;
  collection = [];
  filter : any;

  constructor(private ngxLoader: NgxUiLoaderService,private categoryService: SubcategoryService,
    private router: Router,private route: ActivatedRoute) {
      this.config = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems:0
      };
      this.route.queryParams.subscribe(
        params => this.config.currentPage= params['page']?params['page']:1 );        
    }

    pageChange(newPage: number) {
      console.log("queryParams :::"+newPage)
      this.router.navigate(['subcategory'], { queryParams: { page: newPage } });
    }


  ngOnInit() {
    this.ngxLoader.start();
    this.projectName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData() {
    this.categorys = this.categoryService.getCategorysList();
    
    
    if(localStorage.getItem("categoryId")!=null){
    
    this.subcategory.parentId =   Number(localStorage.getItem("categoryId"));
    //this.subcategorys = this.categoryService.getSubCategorys(Number(localStorage.getItem("categoryId")));
    
    this.categoryService.getSubCategorys(Number(localStorage.getItem("categoryId"))).subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['subcategory'], { queryParams: { page: this.totalPage } });
      }

    });
        this.ngxLoader.stop();
    }else{
      this.subcategory.parentId = 0;
      this.ngxLoader.stop();
    }
  }

  getSubCategoryList(data:string){
    
console.log("length000-----"+ data.length)
if(data.length > 0){
    this.categoryService.getAllSubCategorys().subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['subcategory'], { queryParams: { page: this.totalPage } });
      }

    });
  }else{ 
    this.collection = [];
  }
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
    localStorage.setItem("categoryId",value+"");
    //this.subcategorys = this.categoryService.getSubCategorys(value);

    this.categoryService.getSubCategorys(value).subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['subcategory'], { queryParams: { page: this.totalPage } });
      }

    });


}

  onChangeCategory(){
  
  }

  categoryDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateCategory(id: number){
    this.router.navigate(['subcategory/update', id]);
  }
}
