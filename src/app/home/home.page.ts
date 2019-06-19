import { Component } from '@angular/core';

declare var require: any

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form: any;

  ngOnInit() {
    this.form = this.formioForm;
  }

  private get formioForm() {
    const formioJSON = require('./form.example.json');
    const deepCopy = JSON.parse(JSON.stringify(formioJSON));
    return deepCopy;
  }
}
