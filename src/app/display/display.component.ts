import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public user;
  public imgUser;
  public test;
  dispimage;
  url: any;
  isUrl =false;
  isEdit =false;
  
  constructor(private data:DataService, private _sanitizer: DomSanitizer, private router: Router) {}

//   public getSantizeUrl(url : string) {
//     return this.sanitizer.bypassSecurityTrustUrl(url);
// }

  showAge() {
    let result;
    switch (this.user.age) {
      case 1:
        result = 'above 13 years';
        break;
      case 2:
        result = 'above 20 years';
        break;
      case 3:
        result = 'above 30 years';
        break;
      case 4:
        result = 'above 40 years';
        break;
    }
    return `${result}`;
  }

  
  onSelectFile(event) { 
    // called each time file input changes
      this.isUrl = true;
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
  }

  editForm(){
    this.isEdit = true;
    this.router.navigate(['/register']);
    this.data.setEdit(this.isEdit);
    // console.log('second one');
  }



  ngOnInit(): void {

    this.data.getDetails().subscribe((data)=>{
      
      this.user=data;
      console.log('getdetails',this.user);
    });

    this.data.getImage().subscribe((imgdata)=>{
      console.log('imagesssss',imgdata);
      this.imgUser=imgdata;
      this.dispimage= "data:image/jpg;base64,"+this.imgUser;
    });


  }

}
