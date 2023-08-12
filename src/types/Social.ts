import { Field } from "../field";

export interface SocialContext {
    id: Field<"id", number>;
    url: Field<"url", string>;
    type: Field<"type", string>;
}

export const socialContext: Record<keyof SocialContext, any> = {
    id: "id",
    url: "url",
    type: "type",
};
