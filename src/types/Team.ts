import { Field } from "../field";

export interface TeamContext {
    image: Field<"image", string>;
    username: Field<"username", string>;
    url: Field<"url", string>;
    id: Field<"id", string>;
}

export const teamContext: Record<keyof TeamContext, any> = {
    image: "image",
    username: "username",
    url: "url",
    id: "id",
};
