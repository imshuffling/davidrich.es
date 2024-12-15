export default function imageBlur(imageUrl): any {
    return fetch(
        imageUrl
    ).then(async (res) => {
        return Buffer.from(await res.arrayBuffer()).toString("base64");
    });
}