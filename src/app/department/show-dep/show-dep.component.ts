import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

        
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  APIUrl = "http://localhost:1050/api";
  constructor(private service:SharedService) { }
 
  DepartmentList:any=[];

    ModalTitle:string;
    ActivateAddEditDepComp:boolean;
    dep:any;


  ngOnInit(): void {
    this.getData();
  }


    addClick(){
     this.dep={
       DepartmentId:0,
       DepartmentName:"",

     }
     this.ModalTitle="Add Department";
     this.ActivateAddEditDepComp=true;
  }

  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.getData();
  }
  
     getData(){
      this.dep={
        DepartmentId:0,
        DepartmentName:"",
 
      }
    this.service.getDepList().subscribe(data=>{
     this.DepartmentList=data;
  });
  }

}





