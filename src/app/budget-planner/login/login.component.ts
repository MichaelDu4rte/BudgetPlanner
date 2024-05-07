import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm : any;
  registerForm : any;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb : FormBuilder, private router: Router) {}

  // init
  ngOnInit() {

    // validate login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,]],
      password: ['', [Validators.required]]
    })

    // validate register form
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  //toggleform
  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  } 

  //login
  login() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
      
    } else {
      alert("Dados invalidos")
    }
  }

  // register
  register() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000)

      this.router.navigate(['/budget-planner/login']);

    } else {
      alert("Dados invalidos")
    }
  }

}

