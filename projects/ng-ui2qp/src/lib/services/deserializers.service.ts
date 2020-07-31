import {Inject, Injectable} from '@angular/core';
import {Deserializer} from '../types/deserializer';
import {NgUI2QpSettings, UI2QP_SETTINGS_INJ_TOK} from '../types/settings';
import * as CryptoJS from 'crypto-js';
import {BUILT_IN_DESERIALIZERS} from '../serializers/deserializers';

@Injectable()
export class Ui2QpDeserializersService {
  /**
   * Map that contains all the registered deserializers
   */
  private registered = new Map<string, any>();

  /**
   * Creates a new Ui2QpDeserializersService which is used to register and deregister deserializers
   */
  constructor(@Inject(UI2QP_SETTINGS_INJ_TOK) private settings: NgUI2QpSettings) {
    this.registerBuiltInDeserializers();
  }

  /**
   * Register all built-in deserializers
   */
  private registerBuiltInDeserializers() {
    BUILT_IN_DESERIALIZERS.forEach((deserializer: Deserializer) => {
      this.registered.set(deserializer.type, deserializer.deserializerFunc);
    });

    // This built-in deserializer is placed here because has a dependency with the settings

    const encryptedFunction = () => {
      const key = this.settings.cryptoSecretKey;
      return (cipherText: string, defaultValue: any) => {
        const decryptValue = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
        if (!decryptValue) {
          return defaultValue;
        }
        return decryptValue;
      };
    };

    this.registered.set('encrypted', encryptedFunction());
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
