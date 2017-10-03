import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { LoginModal } from './login.component';

@Directive({
    selector: '[loginmodalwrapper]',
})
export class loginModalWrapper {
    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}
    
    public createDialog(dialogComponent: { new(): LoginModal }): ComponentRef<LoginModal> {

        console.log('View container is ', this.viewContainer)

        this.viewContainer.clear();

        let dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);
        
        dialogComponentRef.instance.close.subscribe(() => {
            dialogComponentRef.destroy();
        });

        return dialogComponentRef;
    }
}