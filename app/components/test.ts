import {Component} from '@angular/core';

@Component({
    selector: 'test',
    template: '<h1>This is mnty test component</h1>',
})
export class TestComponent { 
    
    constructor(){
        console.log("compomnent made");
    }
}