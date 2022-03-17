import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  apiUrl = environment.apiUrl;
  error_message: any;
  error: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('username') && localStorage.getItem('userid')) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    if (this.username && this.password) {
      let body = {
        'username': this.username,
        'password': this.password
      };
      this.http.post(this.apiUrl + 'api/v1/login', body).subscribe((data) =>{
        if(data['message'] == 'success'){
          localStorage.setItem('userid',data['id']);
          localStorage.setItem('username',this.username);
          this.router.navigateByUrl("/home");
        }
        else {
          this.error = true;
          this.error_message = data['message'];
        }
      });
    }
    else {
      alert("Please fill all the details!");
    }
  }

}
