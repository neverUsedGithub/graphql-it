import { Field, FieldArray, TransformFields } from "../field";
import { UserContext, userContext } from "./User";

export interface OldCommentContext {
    id: Field<"id", number>;
    timeCreated: Field<"timeCreated", number>;
    user<T extends (ctx: UserContext) => FieldArray>(getFields: T): Field<"user", TransformFields<ReturnType<T>>>;
    preview(opts?: { markdown?: boolean; length?: number }): Field<"preview", string>;
}

export const oldCommentContext: Record<keyof OldCommentContext, any> = {
    id: "id",
    timeCreated: "timeCreated",
    user: <T extends (ctx: UserContext) => FieldArray>(getFields: T) => `user { ${getFields(userContext).join(" ")} }`,
    preview: (opts?: { markdown?: boolean; length?: number }) =>
        `preview(removeMarkdown: ${opts?.markdown ?? false}${opts?.length ? `, length: ${opts.length}` : ""})`,
};
