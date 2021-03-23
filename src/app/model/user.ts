export interface User {
  uid: string
  email: string
  displayName?: string
  firstName?: string
  lastName?: string
  initials?: string
  password?: string
  newsletter?: boolean
  stripeTokenId?: string
  subscription?: string
  stripeCustomerId?: string
  registeredDevices?: RegisteredDevice[]
}

interface RegisteredDevice {
  name: string
  serial: string
  uuid?: string
}
