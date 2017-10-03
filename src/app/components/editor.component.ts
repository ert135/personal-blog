import {Component, 
        ViewChild, 
        NgModule, 
        EventEmitter, 
        Output } from '@angular/core';

@Component({
  selector: 'simple-editor',
  template: `
  <div class="editor__container">
        <textarea
            class="editor__text-area"
            [ngModel]="text" 
            (ngModelChange)="onChange($event)"
            [ngModelOptions]="{standalone: true}"
        >
        </textarea>
        <div>
            <button class="editor__submit-button" (click)="submitDetails()">Submit</button>
        </div>
    </div>
  `
})
export class Editor {
    @Output() textUpdated = new EventEmitter();
    @Output() submit = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
       
    }

    onChange(event) {
        this.textUpdated.emit(event);
    }

    submitDetails() {
        this.submit.emit();
    }
}