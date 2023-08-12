import { Field, FieldArray, TransformFields } from "../field";
import { UserContext, userContext } from "./User";

export interface CommentContext {
    id: Field<"id", number>;
    user<T extends (ctx: UserContext) => FieldArray>(getFields: T): Field<"user", TransformFields<ReturnType<T>>>;
    body(markdown?: boolean): Field<"body", string>;
}

export const commentContext: Record<keyof CommentContext, any> = {
    id: "id",
    user: <T extends (ctx: UserContext) => FieldArray>(getFields: T) => `user { ${getFields(userContext).join(" ")} }`,
    body: (markdown?: boolean) => `body(removeMarkdown: ${markdown ?? false})`,
};
