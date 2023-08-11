import * as query from "../src";

const client = new query.Client();
const repl = client.replById("942579c7-fafd-406f-be58-98e4458cc8ed", (repl) => [
    repl.title,
    repl.tags((tag) => [tag.id]),
    repl.lang((lang) => [lang.displayName]),
    repl.iconUrl,
    repl.url,
]);

repl.then((repl) => {
    console.log(`Repl ${repl.title}`);
    console.log(`Tags: ${repl.tags.map((t) => "#" + t.id).join(", ")}`);
    console.log(`Language: ${repl.lang.displayName}`);
    console.log(`Icon: ${repl.iconUrl}`);

    console.log("--- fetching by url ---");
    const repl2 = client.replByURL(repl.url, (repl) => [repl.likeCount]);

    repl2.then((repl2) => {
        console.log(`Likes: ${repl2.likeCount}`);
    });
});
