import { FieldArray, TransformFields } from './field.mjs';
import { UserContext } from './types/User.mjs';
import { CurrentUserContext } from './types/CurrentUser.mjs';
import { ReplContext } from './types/Repl.mjs';
import './types/Team.mjs';
import './types/Language.mjs';
import './types/Tag.mjs';

declare class Client {
    private sid?;
    constructor(sid?: string | undefined);
    private doQuery;
    /**
     * Fetches an user by their username.
     * @param username The username of the user.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    userByUsername<T extends (ctx: UserContext) => FieldArray>(username: string, getFields: T): Promise<TransformFields<ReturnType<T>>>;
    /**
     * Fetches an user by their id.
     * @param id The id of the user.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    userById<T extends (ctx: UserContext) => FieldArray>(id: number, getFields: T): Promise<TransformFields<ReturnType<T>>>;
    /**
     * Fetches a repl by its id.
     * @param replId The id of the repl.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    replById<T extends (ctx: ReplContext) => FieldArray>(replId: string, getFields: T): Promise<TransformFields<ReturnType<T>>>;
    /**
     * Fetches a repl by its url.
     * @param replUrl The url of the repl.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    replByURL<T extends (ctx: ReplContext) => FieldArray>(replUrl: string, getFields: T): Promise<TransformFields<ReturnType<T>>>;
    /**
     * Fetches the currently logged in user. (only if sid was passed in)
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    currentUser<T extends (ctx: CurrentUserContext) => FieldArray>(getFields: T): Promise<TransformFields<ReturnType<T>>>;
    /**
     * Create a paginated version of a query.
     * @param query A function which takes in the last cursor and returns the queried data.
     * @param getPageInfo Function to extract pageInfo from the data returned from graphql.
     * @returns A promise that resolves to an object that manages the pages.
     */
    paginated<T extends Promise<any>>(query: (cursor?: string) => T, getPageInfo: (result: Awaited<T>) => {
        nextCursor: string | undefined;
        hasNextPage: boolean;
    }): Promise<{
        current: () => Awaited<T>;
        next: () => Promise<{
            success: true;
            data: Awaited<T>;
        } | {
            success: false;
            error: string;
        }>;
        back: () => {
            success: true;
            data: Awaited<T>;
        } | {
            success: false;
            error: string;
        };
    }>;
}

export { Client };
