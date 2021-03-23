import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { User } from '../../model/user'
import { AuthService } from '../../services/auth.service'
import { NotificationService } from '../../services/notification.service'
import { AlertController } from '@ionic/angular'
import { DbService } from 'src/app/services/db.service'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  user: User
  detailsForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: NotificationService,
    public alertController: AlertController
  ) {
    this.detailsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      newsletter: [false],
    })
  }

  ngOnInit() {
    this.auth.user$.subscribe((userData) => {
      this.user = userData

      this.detailsForm.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: '*******',
        newsletter: userData.newsletter,
      })

      this.detailsForm.get('firstName').disable()
      this.detailsForm.get('lastName').disable()
      this.detailsForm.get('email').disable()
      this.detailsForm.get('password').disable()
    })
  }

  updateNewsletter() {
    this.user.newsletter = !this.user.newsletter
    this.auth.updateUserNewsletter(this.user)
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message:
        'We will send you an email with further instructions on how to reset your password',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            this.auth.resetPassword(this.user.email)
          },
        },
      ],
    })

    await alert.present()
  }

  submitDetails() {
    this.notification.presentLoading()
    return this.auth.emailSignUp(this.detailsForm.value).finally(() => {
      this.notification.dismissLoading()
    })
  }
}
