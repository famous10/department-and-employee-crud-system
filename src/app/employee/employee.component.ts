import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service:SharedService ) { }
  @Input() 

  emp:any;

  EmployeeId:string;

  EmployeeName:string;

  Department:string;

  DateOfJoining:string;

  PhotoFileName;

  PhotoFilePath:string;

  EmployeeList:any=[];
  
  ModalTitle:string;

  ActivateAddEditEmpComp:boolean;

  DepartmentList:any=[];

  ngOnInit(): void {
  this.loadDepartmentList();
  this.emp={
    EmployeeId:0,
    EmployeeName:"",
  }
this.refreshEmpList();

  }

  ngOnChanges(): void{
    this.loadDepartmentList();
  this.emp={
    EmployeeId:0,
    EmployeeName:"",
  }
this.refreshEmpList();
  }
  loadDepartmentList(){
    this.service.getAllDeparmentNames().subscribe((data:any)=>{
      this.DepartmentList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
      
    })
  }
  //add click
  addClick() {
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"download.png",
      PhotoFilePath:"",
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
}
//edit click 
  editClick(item) {
   this.emp = item;
   this.ModalTitle="Edit Employee";
   this.ActivateAddEditEmpComp=true;
  }
  //the delete click event
  deleteClick(item){
   if(confirm('Are you sure??')){
   
     this.service.deleteEmpList(item.EmployeeId).subscribe(res=> {
      console.log(res);
    });

   
   }    
  
  }
  closeClick(){
   this.ActivateAddEditEmpComp=false;
   this.refreshEmpList();
  }
  refreshEmpList(){
   this.service.getEmpList().subscribe(data=>{
    this.EmployeeList=data;
  });
  }
  //add employee
  addEmployee() {
    if (this.EmployeeName== '') return;
   var val = {
              EmployeeId:this.EmployeeId,
              EmployeeName:this.EmployeeName,
              Department:this.Department,
              DateOfJoining:this.DateOfJoining,
              PhotoFileName:this.PhotoFileName,
             };
              this.service.addEmpList(val).subscribe(res=> {
               alert(res)
              });
  }
  //updating employee
  updateEmployee() { 
   var val = { 
              EmployeeId: this.emp.EmployeeId,
              EmployeeName:this.EmployeeName,
              Department:this.Department,
              DateOfJoining:this.DateOfJoining,
              PhotoFileName:this.PhotoFileName,
             };


   
              this.service. updateEmpList(val).subscribe(res=> {
               alert(res)

    });
  }
// uploading of images
  uploadPhoto(event) {

    console.log(event.target.files[0]);

  }

  setImagePath(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      let temp;
      reader.onload = (e) => {
        temp = e.target.result
        this.PhotoFilePath = temp;
      }

      reader.readAsDataURL(event.target.files[0]);
  }
  }
}



