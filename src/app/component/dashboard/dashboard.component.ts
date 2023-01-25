import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar' 



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private user: UserService,public dialog: MatDialog,private snackBar:MatSnackBar) { }
  users: any;
  
  

  ngOnInit(): void {
    this.getdetails();
  }



  getdetails() {
    this.user.employeeget().subscribe((result: any) => {
      console.log(result);
      this.users = result
      
    })

  }
    
  onDelete(user:any){
    this.user.deleteemployee(user).subscribe((result:any)=>{
        console.log(result);
        console.log("Emp deleted")
        this.snackBar.open("User Deleted in", "OK", {
          duration:4000,
        })
        window.location.reload();
        

  })

  
}

openDialog(user:any): void {
const dialogRef = this.dialog.open(UpdateComponent, {
  width: '1800px',
  height:'1200px',
  data:user
});
dialogRef.afterClosed().subscribe((result:any) => {
  console.log('The dialog was closed');
  window.location.reload();
 
});
}


  

}

  


  
