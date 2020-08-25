import { Subcategory } from './crude/subcategory';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute,Router } from '@angular/router';
import { SubcategoryService } from './crude/subcategory.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'addsub.component.html'
})
export class AddsubComponent implements OnInit  {

  id: number;
  subcategory: Subcategory = new Subcategory();
  submitted = false;
  categorys: Observable<Subcategory[]>;
  
  parentIdError: any = 0;
  parentIdMsg: any = '';
  subcategoryNameError: any = 0;
  subcategoryNameMsg: any = '';
  title: string;
 
  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private categoryService: SubcategoryService,
    private router: Router) { }

   reloadData() {
    this.categorys = this.categoryService.getCategorysList();
  }
   
 
  ngOnInit() {
    this.ngxLoader.start();
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
    this.subcategory = new Subcategory();
    this.id = this.route.snapshot.params['id'];

    if(this.id==undefined){
      this.title = "Add";
    }else{
      this.title = "Update";
    }

    if(this.id!=undefined){
    this.categoryService.getCategory(this.id)
      .subscribe(data => {
        console.log("call-----------"+data)
        this.subcategory = data;
        this.ngxLoader.stop();
      }, error => console.log(error));
    }else{
      this.ngxLoader.stop();
    }
      this.subcategory.parentId = 0;
      if(localStorage.getItem("categoryId")!=null){
        console.log("This is calll----------------------"+localStorage.getItem("categoryId")) 
       this.subcategory.parentId = Number(localStorage.getItem("categoryId"));
     }
  }

  onOptionsSelected(value:number){
    console.log("the selected value is " + value);
    localStorage.setItem("categoryId",value+"");  
    this.setFlags();  
}

  newCategory(): void {
    this.submitted = false;
    this.subcategory = new Subcategory();
  }
 
  save() {
    this.categoryService.createCategory(this.subcategory)
      .subscribe(data => {
        console.log(data)
        if(data!=null)
            this.gotoList();
      }, error => console.log(error));
      localStorage.setItem("categoryId",this.subcategory.parentId+"");
    this.subcategory = new Subcategory();
    //this.gotoList();
  }

  onSubmit() {

    if(!this.subcategory.parentId || this.subcategory.parentId==0){
      this.parentIdError = 1;
      this.parentIdMsg = "Please select category";
      console.log("inside if");
      document.getElementById("parentId").focus();
    }else if(!this.subcategory.categoryName){
      this.subcategoryNameError = 1;
      this.subcategoryNameMsg = "Sub category name cannot be empty";
      console.log("inside if");
      document.getElementById("categoryName").focus();
    }else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save(); 
      }  

    //this.submitted = true;
    //this.save();    
  }

  setFlags(){
    this.parentIdError = 0;
    this.subcategoryNameError = 0;
  }

  gotoList() {
    this.router.navigate(['/subcategory']);
  }
 
}
