import { Component } from '@angular/core';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-projects';

  public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            searchText: qpb.stringParam('q'),
            numberOfItems: qpb.numberParam('count'),
        });
    }
}
