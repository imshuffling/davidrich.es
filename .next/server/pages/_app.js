const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__6ae7ff._.js");
runtime.loadChunk("server/chunks/ssr/_f7d135._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
