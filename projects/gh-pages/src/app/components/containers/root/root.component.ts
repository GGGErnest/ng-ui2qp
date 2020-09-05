import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  createRootCode = {
    withoutModel: `// Assuming ui2QpBuilder is a reference of Ui2QpBuilder that was injected in the component
    const root: Ui2QpRoot  = this.ui2QpBuilder.root();`,
    withModel: `// Assuming ui2QpBuilder is a reference of Ui2QpBuilder that was injected in the component
    const root: Ui2QpRoot  = this.ui2QpBuilder.root(
        this.ui2QpBuilder.group({
         firstName: this.ui2QpBuilder.control(),
         lastName: this.ui2QpBuilder.control(),
        }));`
  };

  modelBindingCode = `// Assuming the "root" property is a Ui2QpRoot accessible where this code is executed
    this.root.model = <Ui2QpGroup instance>;`;

  nestedModelExampleCode = `// The comments are the Qps will be added to the URL for a model with this structure
    {
      firstname: this.ui2QpBuilder.control(),                   //firstname=Yazbel
      lastname: this.ui2QpBuilder.control(),                    //lastname=Cordova
      address: this.ui2QpBuilder.group({
       houseNumber: this.ui2QpBuilder.control({type:'number'}), //address.houseNumber=12
       street: this.ui2QpBuilder.control(),                     //address.street=MoritzburgerStr
       country:this.ui2QpBuilder.control(),                     //address.country=Germany
       state:this.ui2QpBuilder.control(),                       //address.state=Brandenburg
       })
     }`;

  flatModelExampleCode = `// The comments are the Qps will be added to the URL for a model with this structure
    {
      firstname: this.ui2QpBuilder.control(),                   //firstname=Yazbel
      lastname: this.ui2QpBuilder.control(),                    //lastname=Cordova
     }`;
  constructor() {
  }

  ngOnInit(): void {
  }

}
