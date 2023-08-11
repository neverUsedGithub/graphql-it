# query-it
A basic wrapper for replit's graphql that lets you choose what data you will need.

# Installation
`npm i https://github.com/neverUsedGithub/query-it`

# Example
#### Get some info about a replit user
```ts
import * as query from "query-it";

const client = new query.Client();
const USERNAME = "JustCoding123";
const USER_ID = 3485412;

// OR client.userById(USER_ID, ...);
const user = client.userByUsername(USERNAME, (user) => [
    user.username,
    user.image,
    user.url,
    user.userSubscriptionType,
    user.followerCount
]);

user.then((user) => {
    console.log(`User @${user.username} (${user.userSubscriptionType})`);
    console.log(`Follower count: ${user.followerCount}`);
    console.log(`URL: https://replit.com${user.url}`);
    console.log(`Profile Picture: ${user.image}`);
});
```
#### Get info about a repl by its id or url
```ts
import * as query from "query-it";

const client = new query.Client();

// OR client.replByURL("/@JustCoding123/query-it", ...);
const repl = client.replById("942579c7-fafd-406f-be58-98e4458cc8ed", (repl) => [
    repl.title,
    repl.tags(tag => [ tag.id ]),
    repl.lang(lang => [
        lang.displayName
    ]),
    repl.iconUrl
]);

repl.then((repl) => {
    console.log(`Repl ${repl.title}`);
    console.log(`Tags: ${repl.tags.map(t => "#" + t.id).join(", ")}`);
    console.log(`Language: ${repl.lang.displayName}`);
    console.log(`Icon: ${repl.iconUrl}`);
});
```