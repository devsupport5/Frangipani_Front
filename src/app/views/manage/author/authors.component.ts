import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthorService } from "./crude/author.service";
import { Author } from "./crude/author";
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  templateUrl: 'authors.component.html'
})
export class AuthorsComponent implements OnInit {
  
  authors: Observable<Author[]>;
  author: Author = new Author();
  DispName : string;

  totalPage : string;
  decimalOnly :number;
  config: any;
  collection = [];
  filter : any;

  constructor(private ngxLoader: NgxUiLoaderService,private authorService: AuthorService,
    private route: ActivatedRoute,private router: Router) {
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
    this.router.navigate(['authors'], { queryParams: { page: newPage } });
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.DispName = environment.ProjectName;
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.reloadData();
  }

  reloadData() {
    //this.authors = this.authorService.getAuthorList();
    this.authorService.getAuthorList().subscribe(res => {
      this.collection = res;
      this.totalPage = this.collection.length / this.config.itemsPerPage +"";
      if( this.totalPage.indexOf('.') != -1 ){ //check if has decimal
        this.decimalOnly = parseFloat(Math.abs(this.collection.length / this.config.itemsPerPage).toString().split('.')[1]);

        if(this.decimalOnly > 0)
          this.totalPage =  Math.round(parseFloat(this.totalPage) +1) +"";
    }
      if(this.config.currentPage > Math.round(this.collection.length / this.config.itemsPerPage)){
        this.router.navigate(['category'], { queryParams: { page: this.totalPage } });
      }
      this.ngxLoader.stop();
    });

  }

  deleteAuthor(id: number) {
    if(confirm("Are you sure to delete ")) {
      this.authorService.deleteAuthor(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
      }    
  }

  updateAuthorStatus(id: number){ 
    this.authorService.getAuthor(id).subscribe(data => {
    this.author = data;

     if(this.author.isActive==0)
       this.author.isActive = 1;
     else
       this.author.isActive = 0;
        
       this.author.id = id;
      this.authorService.updateAuthorStatus(id,this.author);
   }, error => console.log(error));
 }

  authorDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updateAuthor(id: number){
    this.router.navigate(['authors/update', id]);
  }

}

