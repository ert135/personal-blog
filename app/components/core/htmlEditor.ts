import {Component, 
        ViewChild, 
        NgModule, 
        EventEmitter, 
        Output,
        Input
     } from '@angular/core';


@Component({
  selector: 'htmleditor',
  template: `
  <ckeditor
    [(ngModel)]="text"
    [config]="{uiColor: '#424242'}"
    (change)="onChange($event)"
    (ready)="onReady($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    debounce="500">
  </ckeditor>
  `
})
export class HtmlEditor {

    @Input() text;
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