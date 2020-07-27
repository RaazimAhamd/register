import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private user = new BehaviorSubject<any>({});
  private imgUser = new BehaviorSubject<any>({});
  private isEdit= new BehaviorSubject<any>({});

  constructor(private http : HttpClient) { }

   addDetail(user){
     
    this.user.next(user);
    
    console.log('serviceeeeeeeeeeee',user);
   }


   getDetails(): Observable<any>{

    return this.user.asObservable();

   }

   addImage(imgUser){
    this.imgUser.next(imgUser);
    console.log('imgcontent',imgUser);
  }

  getImage(): Observable<any>{

   return this.imgUser.asObservable();

  }

  setEdit(edit){
    this.isEdit.next(edit);
    console.log("eeditttt",edit);
  }

  getEdit(): Observable<any>{
   return this.isEdit.asObservable();
  }


  
}
