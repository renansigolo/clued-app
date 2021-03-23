import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      displayName: [''],
      initials: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      newsletter: [false],
      subscription: ['basic'],
      // registeredDevices: [this.auth.getDeviceInfo()]
    })
  }

  get firstName() {
    return this.signupForm.get('firstName').value
  }
  get lastName() {
    return this.signupForm.get('lastName').value
  }

  displayName() {
    const firstName = this.firstName
    const lastName = this.lastName
    return `${firstName} ${lastName}`
  }

  async submitSignUp() {
    try {
      this.signupForm.patchValue({ displayName: this.displayName() })
      this.signupForm.patchValue({
        initials: this.auth.getInitials(this.firstName, this.lastName),
      })
      await this.auth.emailSignUp(this.signupForm.value)
    } catch (error) {
      return
    }
    this.router.navigate(['/plans'])
  }
}
