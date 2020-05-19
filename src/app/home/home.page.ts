import * as CryptoJS from 'crypto-js';
import * as FormioOfflineProject from 'formiojs-plugin-offline';
import { Formio } from 'formiojs';
import { Component } from '@angular/core';

declare var require: any
export type SubmissionData = {
  data: any;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form: any;
  formioProjectId = 'formioProjectId';
  formioRoleId = 'formioRoleId';
  formioSecret = 'formioSecret';
  formId = 'formId';
  url = 'url';

  ngOnInit() {
    this.setupFormioOffline();
    this.setFormioToken();
    this.form = this.formioForm;
    this.listenToFormioEvents();
  }

  private listenToFormioEvents() {
    Formio.events.on('offline.queue', (data) => console.log(`Something was queued - ${JSON.stringify(data)}`));
  }

  onSubmit(submissionData: SubmissionData | undefined) {
    const formio = new Formio(this.url);
    formio.saveSubmission(submissionData).then(created => {
      const submissionID = created._id;
      alert(submissionID);
    });
  }

  private get formioForm() {
    const formioJSON = require('./form.example s3.json');
    const deepCopy = JSON.parse(JSON.stringify(formioJSON));
    return deepCopy;
  }

  formioJWTData() {
    return {
      external: true,
      form: {
        _id: this.formId,
      },
      project: {
        _id: this.formioProjectId
      },
      user: {
        _id: 'external',
        data: {
          name: 'Oneserve'
        },
        roles: [
          this.formioRoleId
        ]
      }
    };
  }

  public setFormioToken() {
    const tokenData = this.formioJWTData();
    const token = OsUtil.createSignedJWT(tokenData, this.formioSecret);
    Formio.setToken(token);
  };

  public setupFormioOffline() {
    const formioOfflinePlugin = new FormioOfflineProject(this.url);
    Formio.registerPlugin(formioOfflinePlugin, 'formio-offline');
  }

}


export class OsUtil {
  static base64URLEncode(source: string) {
    // Encode in base64
    let encoded = CryptoJS.enc.Base64.stringify(source);

    // Replace characters to match URL encoding standard
    encoded = encoded.replace(/=+$/, '');
    encoded = encoded.replace(/\+/g, '-');
    encoded = encoded.replace(/\//g, '_');
    return encoded;
  }

  static createSignedJWT(tokenData, tokenSecret) {
    const header = { "alg": "HS256", "typ": "JWT" };
    const utf8Header = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const encodedHeader = OsUtil.base64URLEncode(utf8Header);

    const utf8Data = CryptoJS.enc.Utf8.parse(JSON.stringify(tokenData));
    const encodedData = OsUtil.base64URLEncode(utf8Data);

    const unsignedToken = `${encodedHeader}.${encodedData}`;
    let signature = CryptoJS.HmacSHA256(unsignedToken, tokenSecret);
    signature = OsUtil.base64URLEncode(signature);

    return `${unsignedToken}.${signature}`;
  }
}
