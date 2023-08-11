import * as query from "../src";

const client = new query.Client();
const USERNAME = "JustCoding123";

const user = client.userByUsername(USERNAME, (user) => [
    user.username,
    user.image,
    user.url,
    user.userSubscriptionType,
    user.followerCount,
    user.publicRepls(repl => [
        repl.title
    ], { count: 5 })
]);

user.then((user) => {
    console.log(`User @${user.username} (${user.userSubscriptionType})`);
    console.log(`Follower count: ${user.followerCount}`);
    console.log(`URL: https://replit.com${user.url}`);
    console.log(`Profile Picture: ${user.image}`);

    console.log(`Some of @${user.username}'s recent repls:`);
    for (const repl of user.publicRepls.items) {
        console.log(` - ${repl.title}`)
    }
});
