const CHUNK_PUBLIC_PATH = "server/pages/portfolio/[portfolioItem].js";
const runtime = require("../../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_e29ba1._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__2a03d5._.js");
runtime.loadChunk("server/chunks/ssr/_f7d135._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/pages/portfolio/[portfolioItem].js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/pages/_app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
