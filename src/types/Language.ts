import { Field } from "../field";

export interface LanguageContext {
    id: Field<"id", string>;
    icon: Field<"icon", string>;
    displayName: Field<"displayName", string>;
}

export const languageContext: Record<keyof LanguageContext, any> = {
    id: "id",
    icon: "icon",
    displayName: "displayName",
};
