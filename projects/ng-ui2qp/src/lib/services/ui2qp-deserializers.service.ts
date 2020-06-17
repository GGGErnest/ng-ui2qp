import {Injectable} from '@angular/core';
import {BUILT_IN_DESERIALIZERS_MAP} from '../serializers/deserializers';
import {Deserializer} from '../types/deserializer';

@Injectable({
  providedIn: 'root'
})
export class Ui2QpDeserializersService {
  /**
   * Map that contains all the registered deserializers
   */
  private registered = BUILT_IN_DESERIALIZERS_MAP;

  /**
   * Creates a new Ui2QpDeserializersService which is used to register and deregister deserializers
   */
  constructor() {
  }

  /**
   * Register a new deserializer
   * @param deserializer Deserializer to register
   */
  register(deserializer: Deserializer): void {
    this.registered.set(deserializer.type, deserializer.deserializerFunc);
  }

  /**
   * Deregister a Deserializer
   * @param type Type of the deserializer to deregister
   */
  deregister(type: string): boolean {
    return this.registered.delete(type);
  }

  /**
   * Returns a DeserializeFunc that correspond to the deserialize type provided
   * @param type Deserialize type
   */
  getDeserializer(type: string) {
    return this.registered.get(type);
  }
}
