import {Injectable} from '@angular/core';
import {BUILD_IN_SERIALIZERS_MAP} from '../serializers/serializers';
import {SerializeFunc, Serializer} from '../types/serializer';

@Injectable({
  providedIn: 'root'
})
export class Ui2QpSerializersService {
  /**
   * Map that contains all the registered serializers
   */
  private registered = BUILD_IN_SERIALIZERS_MAP;

  /**
   * Creates a new Ui2QpSerializersService which is used to register and deregister serializers
   */
  constructor() {
  }

  /**
   * Register a new serializer
   * @param serializer Serializer to register
   */
  register(serializer: Serializer): void {
      this.registered.set(serializer.type, serializer.serializerFunc);
  }

  /**
   * Deregister a Serializer
   * @param type Type of the serializer to deregister
   */
  deregister(type: string): boolean {
    return this.registered.delete(type);
  }

  /**
   * Returns a SerializeFunc that correspond to the serialize type provided
   * @param type Serialize type
   */
  getSerializer(type: string): SerializeFunc {
    return this.registered.get(type);
  }
}
