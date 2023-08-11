export type Field<T extends string, U extends any> = { field: T; type: U };
export type FieldArray = [Field<any, any>, ...Field<any, any>[]];

type ConvertFieldToKey<T> = T extends Field<any, any>
    ? T["field"] extends string
        ? T["field"]
        : never
    : T extends string
    ? T
    : never;

type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };

export type TransformFields<T extends FieldArray> = Resolve<{
    [K in keyof T as ConvertFieldToKey<T[K]>]: T[Exclude<K, number>] extends Field<any, any>
        ? T[Exclude<K, number>]["type"]
        : T[Exclude<K, number>];
}>;
