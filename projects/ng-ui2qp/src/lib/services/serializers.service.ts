import {Inject, Injectable} from '@angular/core';
import {BUILD_IN_SERIALIZERS} from '../serializers/serializers';
import {SerializeFunc, Serializer} from '../types/serializer';
import {NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK} from '../types/settings';
import * as CryptoJS from 'crypto-js';
import {isEmpty} from '../helpers/empty-helper';

@Injectable()
export class Ui2QpSerializersService {
  /**
   * Map that contains all the registered serializers
   */
  private registered = new Map<string, any>();

  /**
   * Creates a new Ui2QpSerializersService which is used to register and deregister serializers
   */
  constructor(@Inject(UI2QP_SETTINGS_INJ_TOK) private settings: NgUI2QpSettings) {
    this.registerBuiltInSerializers();
  }

  /**
   * Register all built-in serializers
   */
  private registerBuiltInSerializers() {
    BUILD_IN_SERIALIZERS.forEach((serializer: Serializer) => {
      this.registered.set(serializer.type, serializer.serializerFunc);
    });

    // This built-in serializer is placed here because has a dependency with the settings
    const encryptedFunction = () => {
      const key = this.settings.cryptoSecretKey;
      return (plainText: string) => {
        if (!isEmpty(plainText)) {
          return CryptoJS.AES.encrypt(plainText, key).toString();
        }
        return plainText;
      };
    };

    this.registered.set('encrypted', encryptedFunction());
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
