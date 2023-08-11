import fetch from "node-fetch";
import { TransformFields, FieldArray } from "./field";
import { UserContext, userContext } from "./types/User";
import { CurrentUserContext, currentUserContext } from "./types/CurrentUser";
import { ReplContext, replContext } from "./types/Repl";

export class Client {
    constructor(private sid?: string) {}

    private async doQuery(query: string, variables: Record<string, any>) {
        const resp = await fetch("https://replit.com/graphql", {
            method: "POST",
            headers: {
                "User-Agent": "mozilla/5.0",
                referer: "https://replit.com",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                Cookie: this.sid ? `connect.sid=${this.sid}` : "",
            },
            body: JSON.stringify({ query, variables }),
        });
        const data = await resp.json();
        if (data.errors)
            throw new Error(
                `Failed to query.\nQuery: '${query}'\nVariables: ${JSON.stringify(variables)}\nStatus: ${
                    resp.status
                }\n${JSON.stringify(data.errors)}`,
            );
        return data;
    }

    /**
     * Fetches an user by their username.
     * @param username The username of the user.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    async userByUsername<T extends (ctx: UserContext) => FieldArray>(
        username: string,
        getFields: T,
    ): Promise<TransformFields<ReturnType<T>>> {
        const fields = getFields(userContext);

        const query = await this.doQuery(
            `query Query($username: String!) { userByUsername(username: $username) { ${fields.join(" ")} } }`,
            { username: username },
        );

        return query.data.userByUsername;
    }

    /**
     * Fetches an user by their id.
     * @param id The id of the user.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    async userById<T extends (ctx: UserContext) => FieldArray>(
        id: number,
        getFields: T,
    ): Promise<TransformFields<ReturnType<T>>> {
        const fields = getFields(userContext);

        const query = await this.doQuery(`query Query($id: Int!) { user(id: $id) { ${fields.join(" ")} } }`, {
            id: id,
        });

        return query.data.user;
    }

    /**
     * Fetches a repl by its id.
     * @param replId The id of the repl.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    async replById<T extends (ctx: ReplContext) => FieldArray>(
        replId: string,
        getFields: T,
    ): Promise<TransformFields<ReturnType<T>>> {
        const fields = getFields(replContext);

        const query = await this.doQuery(
            `query Query($replId: String!) { repl(id: $replId) { ... on Repl { ${fields.join(" ")} } } }`,
            { replId: replId },
        );

        return query.data.repl;
    }

    /**
     * Fetches a repl by its url.
     * @param replUrl The url of the repl.
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    async replByURL<T extends (ctx: ReplContext) => FieldArray>(
        replUrl: string,
        getFields: T,
    ): Promise<TransformFields<ReturnType<T>>> {
        const fields = getFields(replContext);

        const query = await this.doQuery(
            `query Query($replUrl: String!) { repl(url: $replUrl) { ... on Repl { ${fields.join(" ")} } } }`,
            { replUrl: replUrl },
        );

        return query.data.repl;
    }

    /**
     * Fetches the currently logged in user. (only if sid was passed in)
     * @param getFields Function to select which fields you will need.
     * @returns The requested data.
     */
    async currentUser<T extends (ctx: CurrentUserContext) => FieldArray>(
        getFields: T,
    ): Promise<TransformFields<ReturnType<T>>> {
        const fields = getFields(currentUserContext);
        const query = await this.doQuery(`query Query { currentUser { ${fields.join(" ")} } }`, {});

        return query.data.currentUser;
    }

    /**
     * Create a paginated version of a query.
     * @param query A function which takes in the last cursor and returns the queried data.
     * @param getPageInfo Function to extract pageInfo from the data returned from graphql.
     * @returns A promise that resolves to an object that manages the pages.
     */
    async paginated<T extends Promise<any>>(
        query: (cursor?: string) => T,
        getPageInfo: (result: Awaited<T>) => { nextCursor: string | undefined; hasNextPage: boolean },
    ): Promise<{
        current: () => Awaited<T>;
        next: () => Promise<{ success: true; data: Awaited<T> } | { success: false; error: string }>;
        back: () => { success: true; data: Awaited<T> } | { success: false; error: string };
    }> {
        const first = await query();

        let page = 0;
        let pages = [first];
        let pageInfo = getPageInfo(first);

        return {
            current: () => pages[page],
            next: async () => {
                if (!pageInfo.hasNextPage) return { success: false, error: "no more pages" };
                page++;

                if (page < pages.length) return { success: true, data: pages[page] };

                const nextPage = await query(pageInfo.nextCursor);
                pages.push(nextPage);
                pageInfo = getPageInfo(nextPage);

                return { success: true, data: nextPage };
            },
            back: () => {
                page--;
                if (page < 0) return { success: false, error: "no more pages" };
                return { success: true, data: pages[page] };
            },
        };
    }
}
