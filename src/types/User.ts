import { Field, FieldArray, TransformFields } from "../field";
import { PostContext, postContext } from "./Post";
import { ReplContext, replContext } from "./Repl";
import { SocialContext, socialContext } from "./Social";
type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };

export interface UserContext {
    username: Field<"username", string>;
    image: Field<"image", string>;
    id: Field<"id", number>;
    bio: Field<"bio", string>;
    fullName: Field<"fullName", string>;
    firstName: Field<"firstName", string>;
    lastName: Field<"lastName", string>;
    url: Field<"url", string>;
    userSubscriptionType: Field<"userSubscriptionType", string | null>;
    followerCount: Field<"followerCount", number>;
    followCount: Field<"followCount", number>;
    socials<T extends (ctx: SocialContext) => FieldArray>(
        getFields: T,
    ): Field<"socials", TransformFields<ReturnType<T>>[]>;
    pinnedRepls<T extends (ctx: ReplContext) => FieldArray>(
        getFields: T,
    ): Field<"pinnedRepls", TransformFields<ReturnType<T>>[]>;
    posts<T extends (ctx: PostContext) => FieldArray>(
        getFields: T,
        options?: { after?: string; count?: number; order?: "old" | "new" },
    ): Field<
        "posts",
        Resolve<
            { items: TransformFields<ReturnType<T>>[] } & { pageInfo: { nextCursor: string; hasNextPage: boolean } }
        >
    >;
    followers<T extends (ctx: UserContext) => FieldArray>(
        getFields: T,
        options?: { after?: string; count?: number },
    ): Field<
        "followers",
        Resolve<
            { items: TransformFields<ReturnType<T>>[] } & { pageInfo: { nextCursor: string; hasNextPage: boolean } }
        >
    >;
    publicRepls<T extends (ctx: ReplContext) => FieldArray>(
        getFields: T,
        options?: { after?: string; count?: number },
    ): Field<
        "publicRepls",
        Resolve<
            { items: TransformFields<ReturnType<T>>[] } & { pageInfo: { nextCursor: string; hasNextPage: boolean } }
        >
    >;
}

export const userContext: Record<keyof UserContext, any> = {
    username: "username",
    image: "image",
    id: "id",
    bio: "bio",
    fullName: "fullName",
    firstName: "firstName",
    lastName: "lastName",
    url: "url",
    userSubscriptionType: "userSubscriptionType",
    followerCount: "followerCount",
    followCount: "followCount",
    socials: (getFields: (ctx: SocialContext) => FieldArray) => `socials { ${getFields(socialContext).join(" ")} }`,
    pinnedRepls: (getFields: (ctx: ReplContext) => FieldArray) => `pinnedRepls { ${getFields(replContext).join(" ")} }`,
    posts: (
        getFields: (ctx: PostContext) => FieldArray,
        options?: { after?: string; count?: number; order?: "old" | "new" },
    ) =>
        `posts(${options?.after ? `after: ${options.after}, ` : ""}order: "${options?.order ?? "new"}", count: ${
            options?.count ?? 3
        }) { items { ${getFields(postContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
    followers: (getFields: (ctx: UserContext) => FieldArray, options?: { after?: string; count?: number }) =>
        `followers(count: ${options?.count ?? 10}, after: ${JSON.stringify(
            options?.after ?? null,
        )}) { items { ${getFields(userContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
    publicRepls: (getFields: (ctx: ReplContext) => FieldArray, options?: { after?: string; count?: number }) =>
        `publicRepls(count: ${options?.count ?? 10}, after: ${JSON.stringify(
            options?.after ?? null,
        )}) { items { ${getFields(replContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
};
