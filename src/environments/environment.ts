// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDdHkeyJMtIXxDhNWT_Z5vtEPSTC7bmQA0',
    authDomain: 'screenfictionnetworkfirestore.firebaseapp.com',
    databaseURL: 'https://screenfictionnetworkfirestore.firebaseio.com',
    projectId: 'screenfictionnetworkfirestore',
    storageBucket: 'screenfictionnetworkfirestore.appspot.com',
    messagingSenderId: '199717180397'
  }
};

