# formio-ionic4
Formio working with ionic4
https://ionicframework.com/docs/building/android#running-with-cordova

install ionic cli globally
```npm i -g ionic```

There are two different pre-made forms in this repo. One uses S3 images, the other uses base64 images. Please change the JSON file that is used in getFormioForm() to:

form.example s3.json => form with S3 file uploads

form.example.json => form with base64 file uploads

These forms will need slight tweaks to work with your setup e.g. machineName


If you want to use S3 images, you will need to provide the correct information for the generation of the JWT:

formioProjectId = 'your project id';

formioRoleId = 'a role that is authorised to use your form';

formioSecret = 'the secret key to your bucket';

formId = 'your form id';

url = 'your project url';


# How to run the project
1. ```npm install```
2. ```npm run dev:build```
on ios
```ionic cordova run ios```
on android
```ionic cordova run android```


# Ionic info
```ionic info```

```Ionic:

  Node                          : node/v12.6.0
  Ionic CLI                     : 5.4.8
  Ionic Framework               : @ionic/angular 4.11.10
  @angular-devkit/build-angular : 0.803.23
  @angular-devkit/schematics    : 8.3.23
  @angular/cli                  : 8.3.23
  @ionic/angular-toolkit        : 2.1.2

Cordova:

   Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
   Cordova Platforms : not available
   Cordova Plugins   : not available

Utility:

   cordova-res : 0.6.0 (update available: 0.9.0)
   native-run  : 0.2.9 (update available: 0.3.0)

System:

   Android SDK Tools : 26.1.1
   ios-deploy        : 1.9.2
   ios-sim           : 8.0.2
   NodeJS            : v12.6.0
   npm               : 6.13.1
   OS                : macOS Mojave
   Xcode             : Xcode 10.1 Build version 10B61

```
