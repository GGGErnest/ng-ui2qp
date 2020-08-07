import {Inject, Injectable} from '@angular/core';
import {IUi2QpRouter} from '../interfaces/router';
import {ParamMap, Params, QueryParamsHandling, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {isEmpty} from '../helpers/empty-helper';
import {setValueInPath, traverse} from '../helpers/object-helpers';
import {IUi2QpLogger, UI2QP_LOGGER_INJ_TOK} from '../interfaces/logger';

@Injectable()
export class Ui2QpRouter implements IUi2QpRouter {

  constructor(@Inject(UI2QP_LOGGER_INJ_TOK) private logger: IUi2QpLogger, private router: Router) {

    this.logger.debug('Ui2QpRouter.constructor');
    this.logger.debug('Params passed into the function', router);
  }

  public getUrl(): string {

    this.logger.debug('Ui2QpRouter.getUrl');
    this.logger.trace('returnedValue: ', this.router.url);

    return this.router.url;
  }

  public getQueryParamMapObservable(): Observable<ParamMap> {

    this.logger.debug('Ui2QpRouter.getQueryParamMapObservable');
    this.logger.debug('returnedValue: ', this.router.routerState.root.queryParamMap);

    return this.router.routerState.root.queryParamMap;
  }

  public getQueryParamMap(): Params {

    this.logger.debug('Ui2QpRouter.getQueryParamMap');
    this.logger.debug('returnedValue: ', (this.router.routerState.root.snapshot.queryParamMap as any).params);

    // The queryParamMap object returned by the activated router snapshot has an extra property
    // that encapsulates the actual queryParam object
    return (this.router.routerState.root.snapshot.queryParamMap as any).params;
  }

  public updateQps(queryParams: Params, replaceState: boolean, queryParamsHandling?: QueryParamsHandling): Promise<boolean> {

    this.logger.debug('Ui2QpRouter.getQueryParamMap');
    this.logger.debug('Params passed into the function', queryParams, replaceState);
    this.logger.trace('Updating the query params');

    return this.router.navigate([], {
      relativeTo: this.router.routerState.root,
      queryParams,
      replaceUrl: replaceState,
      queryParamsHandling
    });
  }

  getObjectFromQp(params: object): object {

    this.logger.info('Ui2QpRouter.getObjectFromQp');
    this.logger.debug('Params passed into the function', params);
    this.logger.info('Deserializing an Object from the Qps provided');

    if (!isEmpty(params)) {

      this.logger.trace('The provided QPs are not empty');

      const object = {};

      this.logger.trace('Creating object from the Qp provided');

      Object.keys(params).forEach((key: string) => {
        const value = params[key];
        setValueInPath(key.split('.'), value, object);
      });

      this.logger.debug('Returned Value: ', object);
      return object;
    }
  }

  getQpFromObject(object: object): Params {

    this.logger.debug('Ui2QpRouter.getQpFromObject');
    this.logger.debug('Params passed into the function', object);
    this.logger.info('Serializing the Object provided to Qps');

    const queryParams: Params = {};

    const exec = (path: string[], property: any, data: object) => {

      this.logger.trace('Function executed in each of the properties of the object to serialize into QPs');
      this.logger.trace('Arguments passed into the function: ', path, property, data);

      if (!isEmpty(property)) {

        const keyName = path.join('.');
        data[keyName] = property;

        this.logger.trace('Current property: ', property);
        this.logger.trace('Designated QP name for this property is: ', keyName);
      }
    };

    this.logger.trace('Serializing the object to Qps');

    traverse(object, exec, queryParams);

    this.logger.debug('Returned Value: ', queryParams);

    return queryParams;
  }

  public getCurrentNavigation() {
    this.logger.debug('Ui2QpRouter.getCurrentNavigation');
    this.logger.debug('Returned Value: ', this.router.getCurrentNavigation());
    return this.router.getCurrentNavigation();
  }
}
