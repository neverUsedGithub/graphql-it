import { Field, FieldArray, TransformFields } from "../field";
import { ReplContext, replContext } from "./Repl";
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
    followers: (getFields: (ctx: UserContext) => FieldArray, options?: { after?: string; count?: number }) =>
        `followers(count: ${options?.count ?? 10}, after: ${JSON.stringify(
            options?.after ?? null,
        )}) { items { ${getFields(userContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
    publicRepls: (getFields: (ctx: ReplContext) => FieldArray, options?: { after?: string; count?: number }) =>
        `publicRepls(count: ${options?.count ?? 10}, after: ${JSON.stringify(
            options?.after ?? null,
        )}) { items { ${getFields(replContext).join(" ")} } pageInfo { nextCursor hasNextPage } }`,
};
