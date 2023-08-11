import { Field } from '../field.mjs';

interface TeamContext {
    image: Field<"image", string>;
    username: Field<"username", string>;
    url: Field<"url", string>;
    id: Field<"id", string>;
}
declare const teamContext: Record<keyof TeamContext, any>;

export { TeamContext, teamContext };
