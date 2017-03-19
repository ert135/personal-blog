import {Component, 
        ViewChild, 
        NgModule, 
        EventEmitter, 
        Output } from '@angular/core';


@Component({
  selector: 'htmleditor',
  template: `
  <ckeditor
    [(ngModel)]="ckeditorContent"
    [config]="{uiColor: '#99000'}"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
  </ckeditor>
  `
})
export class HtmlEditor {

    @Output() textUpdated = new EventEmitter();
    @Output() submit = new EventEmitter();

    private ckeditorContent: string;


    constructor(){
    this.ckeditorContent = `<p></p>`;
    }

    private onChange(event) {
        this.textUpdated.emit(event);
    }

    private onReady() {

    }

    private onFocus() {

    }

    private onBlur() {

    }
}