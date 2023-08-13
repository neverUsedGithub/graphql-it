import { Field, FieldArray, TransformFields } from "../field";
import { CommentContext, commentContext } from "./Comment";
import { LanguageContext, languageContext } from "./Language";
import { TagContext, tagContext } from "./Tag";

export interface ReplContext {
    title: Field<"title", string>;
    id: Field<"id", string>;
    iconUrl: Field<"iconUrl", string>;
    url: Field<"url", string>;
    templateLabel: Field<"templateLabel", string>;
    isPrivate: Field<"isPrivate", boolean>;
    isRenamed: Field<"isRenamed", boolean>;
    imageUrl: Field<"imageUrl", string | null>;
    language: Field<"language", string>;
    likeCount: Field<"likeCount", number>;
    timeUpdated: Field<"timeUpdated", string>;
    timeCreated: Field<"timeCreated", string>;
    description: Field<"description", string | null>;
    publicForkCount: Field<"publicForkCount", number>;
    releasesForkCount: Field<"releasesForkCount", number>;
    slug: Field<"slug", string>;
    wasPosted: Field<"wasPosted", boolean>;
    wasPublished: Field<"wasPublished", boolean>;
    publishedAs: Field<"publishedAs", string | null>;
    lang<T extends (ctx: LanguageContext) => FieldArray>(getFields: T): Field<"lang", TransformFields<ReturnType<T>>>;
    tags<T extends (ctx: TagContext) => FieldArray>(getFields: T): Field<"tags", TransformFields<ReturnType<T>>[]>;
    comments<T extends (ctx: CommentContext) => FieldArray>(
        getFields: T,
        options?: { count?: number; after?: string },
    ): Field<
        "comments",
        {
            items: TransformFields<ReturnType<T>>[];
            pageInfo: { nextCursor: string; hasNextPage: boolean };
        }
    >;
}

export const replContext: Record<keyof ReplContext, any> = {
    title: "title",
    id: "id",
    iconUrl: "iconUrl",
    url: "url",
    templateLabel: "templateLabel",
    isPrivate: "isPrivate",
    isRenamed: "isRenamed",
    imageUrl: "imageUrl",
    language: "language",
    likeCount: "likeCount",
    timeUpdated: "timeUpdated",
    timeCreated: "timeCreated",
    description: "description(plainText: true)",
    publicForkCount: "publicForkCount",
    releasesForkCount: "releasesForkCount",
    slug: "slug",
    wasPosted: "wasPosted",
    wasPublished: "wasPublished",
    publishedAs: "publishedAs",
    lang: <T extends (ctx: LanguageContext) => FieldArray>(getFields: T) =>
        `lang { ${getFields(languageContext).join(" ")} }`,
    tags: <T extends (ctx: TagContext) => FieldArray>(getFields: T) => `tags { ${getFields(tagContext).join(" ")} }`,
    comments: (getFields: (ctx: CommentContext) => FieldArray, options?: { after?: string; count?: number }) =>
        `comments(count: ${options?.count ?? 10}, after: ${JSON.stringify(
            options?.after ?? null,
        )}) { items { ${getFields(commentContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
};
