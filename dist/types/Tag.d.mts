import { Field } from '../field.mjs';

interface TagContext {
    id: Field<"id", string>;
    isOfficial: Field<"isOfficial", boolean>;
}
declare const tagContext: Record<keyof TagContext, any>;

export { TagContext, tagContext };
