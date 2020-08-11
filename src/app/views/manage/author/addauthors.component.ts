import { Author } from './crude/author';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthorService } from './crude/author.service';


@Component({
  templateUrl: 'addauthors.component.html'
})
export class AddComponent  implements OnInit  {

  id: number;
  author: Author = new Author();
  submitted = false;

  authorNameError: any = 0;
  authorNameMsg: any = '';
  


  constructor(private route: ActivatedRoute,private authorService: AuthorService,
    private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("userName")=="" || localStorage.getItem("userName")==null){
      this.router.navigate(['/login']);
    }
    this.author = new Author();
    this.id = this.route.snapshot.params['id'];
    this.authorService.getAuthor(this.id)
      .subscribe(data => {
        console.log(data)
        this.author = data;
      }, error => console.log(error));

  }

  newCategory(): void {
    this.submitted = false;
    this.author = new Author();
  }


  setFlags(){
    this.authorNameError = 0;
  }

  save() {
    this.authorService.createAuthor(this.author)
      .subscribe(data => console.log(data), error => console.log(error));
    this.author = new Author();
    this.gotoList();
  }


  onFileChanged(event) {
    console.log("This is call file")
    this.getBase64(event);
  }

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      me.author.image = reader.result.toString();
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


  onSubmit() {
   // this.submitted = true;
    //this.save();  
    if(!this.author.authorName){
      this.authorNameError = 1;
      this.authorNameMsg = "Author name cannot be empty";
      console.log("inside if");
    }
    else{
      console.log("Form submitted successfully");
      this.submitted = true;
      this.save(); 
      }     
  }

  gotoList() {
    this.router.navigate(['/authors']);
  }
 
}