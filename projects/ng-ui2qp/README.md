# ng-ui2qp

Angular library that synchronizes UI component's state with the Browser's query params, improving the user experience allowing the creation of shareable links.

## Description
 
The lib provides a way of synchronizing UI components' state into query parameters(QPs) using a declarative and familiar approach because it extends Angular ReactiveForms. Using the library's features improves the user experience. Think about the following use cases:
 
* Accidentally or intentionally refreshing the page will keep the last state of the app which prevents the user lose the data entered. In mobiles, refreshing the page accidentally happens very commonly.
* If you want to bookmark or share specific states of the application, you could do it simply copying the url and sending it to who you want or bookmarking the page which guarantees you to restore the page exactly how was.

## Advantages

Here are some advantages the lib provides over its peers:
- Extends ReactiveForms API, which makes the library features very familiar and easy to assimilate.
- Allows saving and restoring whatever model(or state), including deeply nested models.
- It's compatible with Angular Validations.
- Allows dynamically add and remove parts of the model, or replace it for a new one if needed.

## Full documentation

Check out the online [docs](https://gggernest.github.io/ng-ui2qp) for a full understanding of all the features the library provides.

## Installation

The library supports Angular Schematics so just run the following command:

``
ng add ng-ui2qp
``

or just use npm:
    
``
npm i ng-ui2qp
``

### Import Ui2QpModule

Import the module in the AppModule of the app

``
NgUi2QpModule
``

The above code imports the NgUi2Qp module with the default settings, here they are:

``
{
  autoUpdating: {enabled: true, debounce: 500},
  replaceState: true,
  logLevel: LogLevel.Off,
  cryptoSecretKey: 'Th3M0st5ecureS3cretK3Y'
}
``

## How to use

### Inject the Ui2QpBuilder service in the component

``
constructor(private ui2QpBuilder: Ui2QpBuilder) {
  ...
}
``

### Create a Ui2QpGroup and its controls, like it's done when using ReactiveForms

``
const model = this.ui2QpBuilder.group(
  {
    firstName: this.ui2QpBuilder.control(),
    lastName: this.ui2QpBuilder.control()
  }
);
``

### Instantiate a Ui2QpRoot object and link it to the created model

``
const root = this.ui2QpBuilder.root(model);
``

It's possible to do both previous steps in one, here is how:

``
const root = this.ui2QpBuilder.root(
  this.ui2QpBuilder.group({
    firstName: this.ui2QpBuilder.control(),
    lastName: this.ui2QpBuilder.control(),
  })
);
``

**ATTENTION:**
The Ui2QpRoot holds a subscription to the "valueChanges" observable of the model if the "autoUpdating" setting was enabled, which means the "destroy" method in the Ui2QpRoot must be executed within the "onDestroy" lifecycle-hook of the component where was created, doing it prevents memory leaks.

### Bind the model with the template

``
<ng-container [formGroup]="root.model">
    <input formControlName="firstName">
    <input formControlName="lastName">
</ng-container>
``

That's all :)
 
# Limitations

Please keep in mind that for compatibility matters between browsers, we recommend the URL's length doesn't get beyond 2,083 characters because that could cause some unexpected behavior in old browsers. Please read this for more information.

