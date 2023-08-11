import { Field } from '../field.js';

interface LanguageContext {
    id: Field<"id", string>;
    icon: Field<"icon", string>;
    displayName: Field<"displayName", string>;
}
declare const languageContext: Record<keyof LanguageContext, any>;

export { LanguageContext, languageContext };
