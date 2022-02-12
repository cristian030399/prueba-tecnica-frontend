import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.verifyIsLogged();
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  submit(): void {
    this.authService.auth(this.form.getRawValue()).subscribe(data => {
      this.authService.saveToken(data.token);
      window.location.reload();
    }, err => {
      console.log(err);
    })
  }

  verifyIsLogged() {
    if(this.authService.isLogged()){
      this.router.navigate(['/']);
    }
  }

}
