import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  password = '';
  email = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  register() {
    this.http.post(environment.baseUrl + 'user/signup', {
      email: this.email,
      password: this.password
    }).subscribe(
      response => {
        console.log(response);
      }
    );

  }
}
