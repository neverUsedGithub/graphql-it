import { Field } from "../field";

export interface TagContext {
    id: Field<"id", string>;
    isOfficial: Field<"isOfficial", boolean>;
}

export const tagContext: Record<keyof TagContext, any> = {
    id: "id",
    isOfficial: "isOfficial",
};
