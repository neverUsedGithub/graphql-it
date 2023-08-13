import * as query from "../src";

const client = new query.Client();
const repl = client.replByURL("https://replit.com/@JustCoding123/Follower-Tree", (repl) => [
    repl.title,
    repl.tags((tag) => [tag.id]),
    repl.lang((lang) => [lang.displayName]),
    repl.iconUrl,
    repl.url,
    repl.id,
    repl.comments((comment) => [
        comment.body(),
        comment.user((user) => [user.username]),
        comment.replies((comment) => [comment.id]),
    ]),
]);

repl.then((repl) => {
    console.log(`Repl ${repl.title}`);
    console.log(`Tags: ${repl.tags.map((t) => "#" + t.id).join(", ")}`);
    console.log(`Language: ${repl.lang.displayName}`);
    console.log(`Icon: ${repl.iconUrl}`);

    console.log(`Some of the repl's comments:`);
    for (const comment of repl.comments.items) {
        console.log(` - @${comment.user.username}: ${comment.body} (${comment.replies.length} replies)`);
    }

    console.log("--- fetching by id ---");
    const repl2 = client.replById(repl.id, (repl) => [repl.likeCount]);

    repl2.then((repl2) => {
        console.log(`Likes: ${repl2.likeCount}`);
    });
});
