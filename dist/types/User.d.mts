import { Field, FieldArray, TransformFields } from '../field.mjs';
import { ReplContext } from './Repl.mjs';
import './Language.mjs';
import './Tag.mjs';

type Resolve<T> = T extends Function ? T : {
    [K in keyof T]: T[K];
};
interface UserContext {
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
    followers<T extends (ctx: UserContext) => FieldArray>(getFields: T, options?: {
        after?: string;
        count?: number;
    }): Field<"followers", Resolve<{
        items: TransformFields<ReturnType<T>>[];
    } & {
        pageInfo: {
            nextCursor: string;
            hasNextPage: boolean;
        };
    }>>;
    publicRepls<T extends (ctx: ReplContext) => FieldArray>(getFields: T, options?: {
        after?: string;
        count?: number;
    }): Field<"publicRepls", Resolve<{
        items: TransformFields<ReturnType<T>>[];
    } & {
        pageInfo: {
            nextCursor: string;
            hasNextPage: boolean;
        };
    }>>;
}
declare const userContext: Record<keyof UserContext, any>;

export { UserContext, userContext };
