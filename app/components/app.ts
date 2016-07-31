// app/app.ts 

/** 
 ** First, we need to: 
 **  1a. import the Component class from @angular/core library
 **  1b. import the bootstrap method from @angular/platform-browser-dynamic to load our web app
 */ 
import { Component } from '@angular/core';                // 1a
import { bootstrap } from '@angular/platform-browser-dynamic';   // 1b
import { MainPage } from './main-page';  

/**
 ** 2a. Pass in the name for the HTML class selector (<my-app></my-app>)
 ** 2b. Set the styles of our component using the styles options
 ** 2c. Define our component's template inline, rather than using the templateUrl option to access an external file. 
 **/ 
@Component({
    // 2a
    selector: 'my-app',
    // 2c
    template: `
    <div class = "main">    
        <main-page></main-page>
    </div>
    `,
    directives: [MainPage] 
})



/** 
 ** 3a. export our component so that it can be imported to othr files
 **
 **/
export class AppComponent {
    componentName: 'AppComponent'
}
bootstrap(AppComponent);
