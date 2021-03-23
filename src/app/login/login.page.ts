import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { environment } from '../../environments/environment'
import { AuthService } from '../services/auth.service'
import { NotificationService } from '../services/notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    email: [environment.user.email, [Validators.required, Validators.email]],
    password: [environment.user.password, Validators.required],
  })

  public get email() {
    return this.loginForm.get('email')
  }
  public get password() {
    return this.loginForm.get('password')
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit() {}

  submitLogin() {
    this.notification.presentLoading()
    return this.auth.signIn(this.loginForm.value).finally(() => {
      this.notification.dismissLoading()
    })
  }

  sendPasswordReset() {
    if (!this.email.value) {
      return this.notification.showToastError('Please enter a valid email!')
    }
    this.auth.resetPassword(this.email.value)
  }
}
