import { Field, FieldArray, TransformFields } from "../field";
import { PostContext, postContext } from "./Post";
import { UserContext, userContext } from "./User";

export interface CommentContext {
    id: Field<"id", number>;
    user<T extends (ctx: UserContext) => FieldArray>(getFields: T): Field<"user", TransformFields<ReturnType<T>>>;
    body(markdown?: boolean): Field<"body", string>;
    replies<T extends (ctx: CommentContext) => FieldArray>(
        getFields: T,
    ): Field<"replies", TransformFields<ReturnType<T>>[]>;
    post<T extends (ctx: PostContext) => FieldArray>(getFields: T): Field<"post", TransformFields<ReturnType<T>>>;
}

export const commentContext: Record<keyof CommentContext, any> = {
    id: "id",
    user: <T extends (ctx: UserContext) => FieldArray>(getFields: T) => `user { ${getFields(userContext).join(" ")} }`,
    body: (markdown?: boolean) => `body(removeMarkdown: ${markdown ?? false})`,
    replies: (getFields: (ctx: CommentContext) => FieldArray) => `replies { ${getFields(commentContext).join(" ")} }`,
    post: (getFields: (ctx: PostContext) => FieldArray) => `post { ${getFields(postContext).join(" ")} }`,
};
