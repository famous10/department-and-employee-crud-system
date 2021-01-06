import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
private APIUrl= "http://localhost:1050/api";
readonly PhotoUrl ="http://localhost:1050/photos";


  constructor( private http:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/department');
  }

  
  addDepList(val:any){
    return this.http.post<any>(this.APIUrl+'/Department', val);
  }

    
  updateDepList(val:any){
    return this.http.put<any>(this.APIUrl+'/Department', val);
  }

    
  deleteDepList(val:any){
    return this.http.delete<any>(this.APIUrl+'/Department/'+val);
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Employee');
  }

  
  addEmpList(val:any){
    return this.http.post<any>(this.APIUrl+'/Employee', val);
  }

    
  updateEmpList(val:any){
    return this.http.put<any>(this.APIUrl+'/Employee', val);
  }

    
  deleteEmpList(val:any){
    return this.http.delete<any>(this.APIUrl+'/Employee/'+val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Employee/SaveFile',val);
  }

  getAllDeparmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Employee/GetAllDepartmentNames');
  }
}
