import { Field } from "../field";

export interface BoardContext {
    id: Field<"id", string>;
    name: Field<"name", string>;
    color: Field<"color", string>;
}

export const boardContext: Record<keyof BoardContext, any> = {
    id: "id",
    name: "name",
    color: "color",
};
