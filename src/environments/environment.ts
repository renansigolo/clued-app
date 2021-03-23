// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDwrCwBDH3O09OrBnsWYgRhJcSANIRHg1g',
    authDomain: 'cluedtv-76443.firebaseapp.com',
    databaseURL: 'https://cluedtv-76443.firebaseio.com',
    projectId: 'cluedtv-76443',
    storageBucket: 'cluedtv-76443.appspot.com',
    messagingSenderId: '417892602383',
    appId: '1:417892602383:web:00839ce3ed89cc19',
  },
  user: {
    email: 'renan.sigolo@gmail.com',
    password: 'Clued@8D',
  },
  stripe: {
    planId: 'plan_GaPpWvhFmjn9c9',
    key: 'pk_test_FMpJ8N5PdRCExyMWfX9rPH2r00luLlGqmL',
  },
  vimeo: {
    api: 'https://api.vimeo.com',
    token: '68ebcf1551b2024c186e6a1d00abfe92',
  },
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
