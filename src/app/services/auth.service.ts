import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage'
import { Observable, of } from 'rxjs'
import { switchMap, map, first } from 'rxjs/operators'
import { User } from '../model/user'
import { NotificationService } from './notification.service'
import { Device } from '@ionic-native/device/ngx'
import { AngularFireFunctions } from '@angular/fire/functions'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>
  paidPlan: string

  public get planSubscription(): string {
    return this.paidPlan
  }

  public set planSubscription(value: string) {
    this.paidPlan = value
  }

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private storage: Storage,
    private aff: AngularFireFunctions,
    private device: Device,
    public notification: NotificationService
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0) + lastName.charAt(0)
  }

  async getUser() {
    return this.auth.authState.pipe(first()).toPromise()
  }

  async emailSignUp(signupPayload: User) {
    try {
      await this.notification.presentLoading()
      const credential = await this.auth.createUserWithEmailAndPassword(
        signupPayload.email,
        signupPayload.password
      )

      const userPayload = {
        uid: credential.user.uid,
        ...signupPayload,
      }

      delete userPayload.password
      delete userPayload.firstName
      delete userPayload.lastName

      this.storage.set('isLoggedIn', 'true')
      return await this.setUserData(userPayload)
    } catch (error) {
      this.notification.showToastError(error.message)
      if (this.auth.currentUser) {
        ;(await this.auth.currentUser).delete()
      }

      throw Error(error)
    } finally {
      this.notification.dismissLoading()
    }
  }

  private async deleteUser(currentUser: firebase.User) {
    const deleteAuthUser = currentUser.delete()
    const deleteDBUser = this.afs.doc(`users/${currentUser.uid}`).delete()
    const userDeleted = await Promise.all([deleteAuthUser, deleteDBUser])
    return userDeleted
  }

  async signIn(signinPayload: User) {
    await this.auth
      .signInWithEmailAndPassword(signinPayload.email, signinPayload.password)
      .then((userCredential) => {
        this.updateUserData(userCredential.user)
        this.storage.set('isLoggedIn', 'true').then(() => {
          return this.router.navigate(['/home'])
        })
      })
      .catch((err) => {
        this.notification.showToastError(err)
      })
  }

  async signOut() {
    await this.auth.signOut().then(() => {
      this.storage.remove('isLoggedIn').then(() => {
        this.router.navigate(['/'])
      })
    })
  }

  private setUserData(userPayload: User) {
    const userRef = this.afs.doc<User>(`users/${userPayload.uid}`)
    return userRef.set(userPayload)
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data = {
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(data, { merge: true })
  }

  updateUserNewsletter(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data = {
      uid: user.uid,
      email: user.email,
      newsletter: user.newsletter,
    }
    return userRef.set(data, { merge: true })
  }

  async setSubscription(sub: string) {
    this.user$.subscribe((user) => {
      this.afs.doc(`users/${user.uid}`).update({ subscription: sub })
    })
  }

  /**
   * Firebase sends an email for the User to reset it's password
   */
  resetPassword(userEmail: string) {
    this.notification.presentLoading()

    this.auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        return this.notification.presentAlert(
          'Email sent',
          'We just sent you an email with a link to create a new password.'
        )
      })
      .catch((err) => {
        return this.notification.presentAlert('Error', err)
      })
      .finally(() => {
        this.notification.dismissLoading()
      })
  }

  /**
   * Return the info of the current device
   */
  getDeviceInfo() {
    const currentDevice = {
      model: this.device.model,
      serial: this.device.serial,
      uuid: this.device.uuid,
    }

    return currentDevice
  }

  /**
   * Return the number of devices registered
   */
  checkDevicesRegistered() {
    const totalDevicesAllowed = 3
    return this.user$.pipe(
      map((user) => {
        return user.registeredDevices.length
      })
    )
  }

  /**
   * TODO
   * Delete the device choosen by the user
   */
  deleteDevice() {
    return this.notification.showToast('Device Successfully Deregistered')
  }

  async createStripeCustomer(uid: string) {
    const stripeCreateCustomer = this.aff.httpsCallable(
      'stripestripeCreateCustomer'
    )
    await stripeCreateCustomer(uid).toPromise()
  }
}
