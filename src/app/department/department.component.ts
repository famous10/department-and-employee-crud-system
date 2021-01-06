import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
 private APIUrl = "http://localhost:1050/api";
  constructor(private service:SharedService ) { }
  @Input() 

  dep:any;

  DepartmentId:string;

  DepartmentName:string;

  DepartmentIdFilter:string="";

  DepartmentNameFilter:string="";

  DepartmentListWithoutFilter:any=[];

  DepartmentList:any=[];
  
  ModalTitle:string;

  ActivateAddEditDepComp:boolean;

    

  ngOnInit(): void {
    this.loadDep();
    this.dep={
      DepartmentId:0,
      DepartmentName:"",
    }

    this.DepartmentId=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
  }


    addClick() {
     this.dep={
       DepartmentId:0,
       DepartmentName:"",
     }
     this.ModalTitle="Add Department";

     this.ActivateAddEditDepComp=true;
     
  }

  editClick(item){
    this.dep = item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
  
      this.service.deleteDepList(item.DepartmentId).subscribe(res=> {
       console.log(res);
          
     });
    }    
  
  }
  closeClick(){
    this.ActivateAddEditDepComp=false;
    this.refreshDepList();
  }

  loadDep(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
      this.DepartmentListWithoutFilter=data;
   });
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
     this.DepartmentList=data;
     this.DepartmentListWithoutFilter=data;
  });
}
   FilterFn(){
     var DepartmentIdFilter = this.DepartmentIdFilter;
     var DepartmentNameFilter = this.DepartmentNameFilter;

     var DepartmentList = this.DepartmentListWithoutFilter.filter(function (el){
       return el.DepartmentId.tostring().toLowerCase().includes(
         DepartmentIdFilter.toString().trim().toLowerCase()
       )&&
       el.DepartmentName.tostring().toLowerCase().includes(
         DepartmentNameFilter.toString().trim().toLowerCase()
       )
     });
   }
   
   sortResult(prop,asc){
      this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
        if(asc){
         return(a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 : 0);
        }else{
          return(b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 : 0);
        }
      })
   }
   
  addDepartment() {
    if (this.DepartmentName == '') return;
    var val = {DepartmentId:this.DepartmentId,
               DepartmentName:this.DepartmentName};
               this.service.addDepList(val).subscribe(res=> {
                alert(res)
              
               }); 
               if(val){
  
                 var modal =  document.getElementById("exampleModal");
                 modal.style.display = "none"
                
                    
               }        
  }

  updateDepartment() { 
   
    var val = { 
                DepartmentId: this.dep.DepartmentId,
                DepartmentName: this.DepartmentName
              };

    this.service.updateDepList(val).subscribe(res=> {
        alert(res)
    });
  }
}
