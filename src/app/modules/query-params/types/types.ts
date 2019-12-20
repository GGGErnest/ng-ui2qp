// type of notification that is passed to the QueryParamsFormGroup in
// order to execute different types of actions
export declare type QpNotificationType = 'add' | 'patch-value' | 'get-value';

export declare type QpSerializeFunc = (value: any) => any;

export declare type QpDeserializeFunc = (value: any, defaultValue: any) => any;
