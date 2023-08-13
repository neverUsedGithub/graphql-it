import { Field, FieldArray, TransformFields } from "../field";
import { BoardContext, boardContext } from "./Board";
import { CommentContext, commentContext } from "./Comment";
import { OldCommentContext, oldCommentContext } from "./OldComment";
import { ReplContext, replContext } from "./Repl";
import { UserContext, userContext } from "./User";

export interface PostContext {
    id: Field<"id", number>;
    timeCreated: Field<"timeCreated", string>;
    isPinned: Field<"isPinned", string>;
    title: Field<"title", string>;
    isAnnouncement: Field<"isAnnouncement", string>;

    // New posts
    replComment<T extends (ctx: CommentContext) => FieldArray>(
        getFields: T,
    ): Field<"replComment", TransformFields<ReturnType<T>> | null>;
    repl<T extends (ctx: ReplContext) => FieldArray>(getFields: T): Field<"repl", TransformFields<ReturnType<T>>>;
    user<T extends (ctx: UserContext) => FieldArray>(getFields: T): Field<"user", TransformFields<ReturnType<T>>>;
    recentReplComments<T extends (ctx: CommentContext) => FieldArray>(
        getFields: T,
    ): Field<"recentReplComments", TransformFields<ReturnType<T>>[]>;

    // Old posts
    url: Field<"url", string>;
    preview(opts?: { markdown?: boolean; length?: number }): Field<"preview", string>;
    commentCount: Field<"commentCount", number>;
    board<T extends (ctx: BoardContext) => FieldArray>(
        getFields: T,
    ): Field<"board", TransformFields<ReturnType<T>> | null>;
    recentComments<T extends (ctx: OldCommentContext) => FieldArray>(
        getFields: T,
        count: number,
    ): Field<"recentComments", TransformFields<ReturnType<T>>[]>;
}

export const postContext: Record<keyof PostContext, any> = {
    id: "id",
    timeCreated: "timeCreated",
    isPinned: "isPinned",
    title: "title",
    isAnnouncement: "isAnnouncement",

    // New posts
    replComment: <T extends (ctx: CommentContext) => FieldArray>(getFields: T) =>
        `replComment { ${getFields(commentContext).join(" ")} }`,
    repl: <T extends (ctx: ReplContext) => FieldArray>(getFields: T) => `repl { ${getFields(replContext).join(" ")} }`,
    user: <T extends (ctx: UserContext) => FieldArray>(getFields: T) => `user { ${getFields(userContext).join(" ")} }`,
    recentReplComments: <T extends (ctx: CommentContext) => FieldArray>(getFields: T) =>
        `recentReplComments { ${getFields(commentContext).join(" ")} }`,

    // Old posts
    url: "url",
    preview: (opts?: { markdown?: boolean; length?: number }) =>
        `preview(removeMarkdown: ${opts?.markdown ?? false}${opts?.length ? `, length: ${opts.length}` : ""})`,
    commentCount: "commentCount",
    board: <T extends (ctx: BoardContext) => FieldArray>(getFields: T) =>
        `board { ${getFields(boardContext).join(" ")} }`,
    recentComments: <T extends (ctx: OldCommentContext) => FieldArray>(getFields: T, count: number) =>
        `recentComments(count: ${count}) { ${getFields(oldCommentContext).join(" ")} }`,
};
