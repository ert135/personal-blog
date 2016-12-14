export class ModalService {
    // here we hold our placeholder
    private vcRef: ViewContainerRef; 
    // here we hold our injector
    private injector: Injector; 
    // we can use this to determine z-index of multiple modals
    public activeInstances: number = 0;
    
    constructor(private compiler: Compiler) {
    }

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.vcRef = vcRef;
    }

    registerInjector(injector: Injector): void {
        this.injector = injector;
    }

	// update: as of rc6 we have to pass the module as well
    create<T>(module: any, component: any, parameters?: Object):
     	Observable<ComponentRef<T>> {
     	// we return a stream so we can  access the componentref
        let componentRef$ = new ReplaySubject(); 
        // compile the component based on its type and
        // create a component factory
        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
            	// look for the componentfactory in the modulefactory
             	let componentFactory = factory.componentFactories
             		.filter(item => item.componentType === component)[0];
            	// the injector will be needed for DI in 
            	// the custom component
                const childInjector = ReflectiveInjector
                	.resolveAndCreate([], this.injector);
            	// create the actual component
                let componentRef = this.vcRef
                	.createComponent(componentFactory, 0, childInjector);
                // pass the @Input parameters to the instance
                Object.assign(componentRef.instance, parameters); 
                this.activeInstances ++;
                // add a destroy method to the modal instance
                componentRef.instance["destroy"] = () => {
                    this.activeInstances --;
                    // this will destroy the component
                    componentRef.destroy(); 
                };
                // the component is rendered into the ViewContainerRef
                // so we can update and complete the stream
                componentRef$.next(componentRef);
                componentRef$.complete();
            });
        return componentRef$;
    }
}
The Custom modal

As we saw above, every modal component will have a destroy method. That method is dynamically added (see logic above) to the instance of the modalcomponent. This will call the componentRef.destroy() behind the scenes which will safely destroy the component. I also found it convenient to have a closeModal function on the modal as well. Therefore every custom modal component we create should inherit this class:

export class ModalContainer {
    destroy: Function;
    closeModal(): void {
        this.destroy();
    }
}
This means, a custom modal 