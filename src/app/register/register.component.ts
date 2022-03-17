import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: any;
  password: any;
  confPassword: any;
  apiUrl = environment.apiUrl;
  regError: boolean;
  regSuccess: boolean;
  message: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.regError = false;
    this.regSuccess = false;
  }

  register() {
    if (this.username && this.password && this.confPassword) {
      this.regError = false;
      if (this.password === this.confPassword) {
        if (this.password.length < 8) {
          this.regError = true;
          this.message = "Password must contain atleast 8 characters!";
        }
        else {
          let body = {
            'username': this.username,
            'password': this.password
          };
          this.http.post(this.apiUrl + "api/v1/register", body).subscribe((data) => {
            if (data['status'] == 201) {
              this.regSuccess = true;
              this.message = data['message'];
              setTimeout(() => {
                this.router.navigateByUrl('/login');
              }, 3000);
            }
            else {
              this.regError = true;
              this.message = data['message'];
            }
          });
        }
      }
      else {
        this.regError = true;
        this.message = "Passwords do not match!";
      }
    }
    else {
      this.regError = true;
      this.message = "Please provide all the details!";
    }

  }

}
