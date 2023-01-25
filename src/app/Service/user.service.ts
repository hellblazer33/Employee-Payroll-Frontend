import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpservice: HttpClient) {
  }
  addemployee(data: any) {

    return this.httpservice.post("http://localhost:3000/employee", data)
  }

  employeeget() {
  
    return this.httpservice.get('http://localhost:3000/employee')
  }

  editemployee(data:any,id:any) {
 
    return this.httpservice.put("http://localhost:3000/employee/"+id,data)
  }
  
  
  deleteemployee(data:any) {
    
    
    return this.httpservice.delete("http://localhost:3000/employee/"+data)
  }
}