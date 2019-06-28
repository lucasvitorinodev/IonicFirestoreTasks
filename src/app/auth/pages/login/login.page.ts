import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FindValueOperator} from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create account'
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create Account' : 'Already have an account';
    !isSignIn
      ? this.authForm.addControl('name', this.nameControl)
      : this.authForm.removeControl('name');
  }

  onSubmit(): void {
    console.log('AuthForm: ', this.authForm.value);
  }

}
