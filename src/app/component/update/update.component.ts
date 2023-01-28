
import { Component,Input, OnInit ,Inject,} from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder ,ReactiveFormsModule, FormArray} from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  UpdateForm!: FormGroup;
  submitted = false;
  // salary =0;
  selectedDepartment:any=[]

 users:any
 res:any;
 name:any;
 gender:any;
 department:any;
 profile:any;
 startDate:any;
 salary:any;
 notes:any;
 empID:any;
 Emp:any;

  departmentList:any=[
    {name:"HR", value:'HR', checked:false},
    {name:"Finance", value:'Finance', checked:false},
    {name:"Sales", value:'Sales', checked:false},
    {name:"Engineer", value:'Engineer', checked:false},
    {name:"Others", value:'Others', checked:false},
  ]
  constructor(private formBuilder:FormBuilder,private user: UserService,private snackBar:MatSnackBar,private router: Router,public dialogRef: MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.empID=data.id
    this.name=data.name
    this.gender=data.gender
    this.department=data.department
    this.profile=data.profile
    this.startDate=data.startDate
    this.salary=data.salary
    this.notes=data.notes
    console.log(this.data)
  }

  ngOnInit() {
    this.Emp=this.data.element
    this.UpdateForm = this.formBuilder.group({
      
      department:this.formBuilder.array([],[ Validators.required]),
      
      
  });
  
 
  }

onCheckboxChange(event:any) {
  const depart: FormArray = this.UpdateForm.get('department')as FormArray;

 
  if(event.target.checked){
    
    depart.push(new FormControl(event.target.value));
  }else{
    const index= depart.controls.findIndex(x => x.value === event.target.value);
    depart.removeAt(index);
  }
}

  get f() {return this.UpdateForm.controls;}
  onSubmit(empID:any) {
    this.submitted = true;
    

    if (this.UpdateForm.valid){
      console.log("emp updated successfull");
      let reqdata={
      name: this.name,
      gender:this.gender,
      department:this.UpdateForm.value.department,
      profile:this.profile,
      startDate:this.startDate,
      salary:this.salary,
      notes:this.notes
      }
      
      this.user.editemployee(reqdata,this.empID).subscribe((result:any)=>{
        console.log(result)
        
        // this.router.navigateByUrl('/display').then(() => {

        this.snackBar.open("User updatted in", "OK", {
          duration:4000,
        })
        this.dialogRef.close();  
  
      });
       
          

      }
      
    }
    
    }
  
  
  

 
 
   
 
  

 

