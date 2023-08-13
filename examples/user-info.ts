import * as query from "../src";

const client = new query.Client();
const USERNAME = "JustCoding123";

const user = client.userByUsername(USERNAME, (user) => [
    user.username,
    user.image,
    user.url,
    user.userSubscriptionType,
    user.followerCount,
    user.id,
    user.pinnedRepls((repl) => [repl.title]),
    user.posts((post) => [post.replComment((comment) => [comment.body()]), post.repl((repl) => [repl.title])], {
        count: 5,
    }),
]);

user.then((user) => {
    console.log(`User @${user.username} (${user.userSubscriptionType})`);
    console.log(`Follower count: ${user.followerCount}`);
    console.log(`URL: https://replit.com${user.url}`);
    console.log(`Profile Picture: ${user.image}`);
    console.log(`Find them at: ${user.url}`);
    console.log(`Pinned repls: ${user.pinnedRepls.map((r) => r.title).join(", ")}`);
    console.log(`Some of @${user.username}'s recent posts:`);

    for (const post of user.posts.items) {
        console.log(` - ${post.repl.title}${post.replComment?.body ? ` - ${post.replComment.body}` : ""}`);
    }

    console.log("--- fetching by id ---");

    const user2 = client.userById(user.id, (user) => [user.publicRepls((repl) => [repl.title], { count: 5 })]);

    user2.then((user2) => {
        console.log(`Some of @${user.username}'s recent repls:`);
        for (const repl of user2.publicRepls.items) {
            console.log(` - ${repl.title}`);
        }
    });
});
