import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import {MatSliderModule} from '@angular/material/slider';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatChipsModule} from '@angular/material/chips';
import{MatChipList} from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';




export interface Interest {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent implements OnInit {

  // @ViewChild(MatSliderModule) slider: MatSliderModule;
  constructor(  private router:Router, private fb:FormBuilder, private data:DataService, private _sanitizer: DomSanitizer, private http:HttpClient) { }

  sliderValue = 1;
  optionValue;
  address = ['Home','Company'];
  url: any;
  name: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // interest: Interest[] = [];
  interest: Interest[][] = [[],[]];
  public user;
  // public razim;
  // public data;
  isEdit;
  selectedstate;
  selectedcountry;
  selectedaddress;
  state = ['Tamilnadu','Kerala','Andhra'];
  country = ['India','China','Bangladesh'];
  
  //image
  // imageSrc;
  ExteriorPicFile: any;
  //base64s 
  ExteriorPicString: string;
  //json
  finalJson = {};
  currentId: number = 0;

  addPictures() {
    this.finalJson = {
      "ExteriorPicFile": this.ExteriorPicString
    }
  }
  public picked(event, field) {
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
 if (field == 1) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); //turn into base64
      }
    }
    else {
      alert("No file selected");
    }
  }


  handleInputChange(files) {
    var file = files;
    var reader = new FileReader();
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    let id = this.currentId;
        this.ExteriorPicString = base64result;

        // this.log();
  }
  log() { 
    // for debug
    console.log('1', this.ExteriorPicString);
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    if ((value || '').trim()) {
    const control = <FormArray>this.regForm.controls.interest;
    control.push(this.fb.control(value.trim()));
    }
 
    if (input) {
    input.value = '';
    }
    }
    
    remove(i: number) {
    let control = <FormArray>this.regForm.controls.interest;
    control.removeAt(i);
    }



  onSelectFile(event) { // called each time file input changes
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
  }


  ngOnInit(): void {

    this.setForm();
  }

  regForm = this.fb.group({
    firstname: ['',[Validators.required,Validators.maxLength(20), Validators.pattern('[a-zA-Z\s]+$')]],
    lastname: ['',[Validators.required,Validators.maxLength(20), Validators.pattern('[a-zA-Z\s]+$')]],
    age: [''],
    email: ['',[Validators.email,Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    phone: ['',[Validators.required,Validators.pattern('^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$')]],
    state: [''],
    address: [''],
    homestreet: [''],
    homecity:[''],
    compbuilding:[''],
    compcity:[''],
    country: [''],
    // interest: [''],
    interest: this.fb.array([]),
    subs:[''],
    image:['']
  });

  showAge() {
    let result;
    switch (this.sliderValue) {
      case 1:
        result = '13-19';
        break;
      case 2:
        result = '20-29';
        break;
      case 3:
        result = '20-45';
        break;
      case 4:
        result = '45&above';
        break;

    }
    return `${result}`;
  }

  setForm(){
    this.data.getEdit().subscribe((datas)=>{
      this.isEdit=datas;
      console.log("setform check",this.isEdit)
    })
    
    if(this.isEdit){
      this.data.getDetails().subscribe((item)=>{
        console.log("item console check",item);
        this.user=item
      });
      this.regForm.get('firstname').setValue(this.user.firstname);
      this.regForm.get('lastname').setValue(this.user.lastname);
      this.sliderValue = this.user.age;
      this.regForm.get('email').setValue(this.user.email);
      this.regForm.get('phone').setValue(this.user.phone);
      this.regForm.get('homestreet').setValue(this.user.homestreet);
      this.regForm.get('homecity').setValue(this.user.homecity);
      this.regForm.get('compbuilding').setValue(this.user.compbuilding);
      this.regForm.get('compcity').setValue(this.user.compcity);
      // this.regForm.get('interest').setValue(this.user.interest);
      
      this.regForm.get('subs').setValue(this.user.subs);
      this.selectedstate = this.user.state;
      this.selectedcountry = this.user.country;
      this.selectedaddress = this.user.address;
      // const control = <FormArray>this.regForm.controls.interest;
      // control.push(this.fb.array({['hai']['hello']}));
      // [{interest: ['Dwayne Jhonson','Tom cruise']}];

      for(let interest of this.user.interest){    
            
        const control = <FormArray>this.regForm.controls.interest;
        control.push(this.fb.array([interest]));
        
      }
      

    console.log("streetcheclk",this.user.interest)
    }
  }
  onSubmit(){
    const item = this.regForm.value;
    const images = this.ExteriorPicString;
    console.log(this.regForm.value);
    this.data.addDetail(item);
    this.data.addImage(images);
    this.router.navigate(['/display']);
  }

}
