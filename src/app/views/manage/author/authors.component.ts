import { Component,OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthorService } from "./crude/author.service";
import { Author } from "./crude/author";
import { Router } from '@angular/router';
import { Product } from '../product/crude/product';


@Component({
  templateUrl: 'authors.component.html'
})
export class AuthorsComponent implements OnInit {
  
  authors: Observable<Author[]>;
  author: Author = new Author();

  constructor(private authorService: AuthorService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.authors = this.authorService.getAuthorList();
  }

  deleteAuthor(id: number) {
    this.authorService.deleteAuthor(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
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

