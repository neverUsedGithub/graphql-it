# query-it
A basic wrapper for replit's graphql that lets you choose what data you will need.

# Installation
`npm i https://github.com/neverUsedGithub/query-it`

# Example
#### Get some info about a replit user
```ts
import * as query from "../src";

const client = new query.Client();
const USERNAME = "JustCoding123";

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