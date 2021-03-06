
let axios = require("axios");
let path = require("path");
let fsp = require("fs/promises");
let express = require("express");
let root = process.cwd();
let isProduction = process.env.NODE_ENV === "production";

function resolve(p) {
    return path.resolve(__dirname, p);
}


async function createServer() {
    let app = express();
    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite;

    if (!isProduction) {
        vite = await require("vite").createServer({
            root,
            server: {middlewareMode: "ssr"},
        });

        app.use(vite.middlewares);
    } else {
        app.use(require("compression")());
        app.use(express.static(resolve("dist/client")));
    }
    app.get('/favicon.ico', (req, res) => res.status(204));
    app.use("*", async (req, res) => {
        let url = req.originalUrl.split('-')[0].split('/')[1];
        // fetch data of the matched component
        const fetchData = () => {

            return axios.get( `https://my-json-server.typicode.com/helly-15/ssr-db/${url}` ).then( response => {
                return {
                    income: response.data.income,
                    profit: response.data.profit,
                    profile: response.data.profile,
                };
            } )
                .catch(() =>console.log ( 'incorrect url'));
        }
        let componentData = await fetchData();
        console.log ( 'componentData' );
        console.log ( componentData );
        try {
            let template;
            let render;

            if (!isProduction) {
                template = await fsp.readFile(resolve("index.html"), "utf8");
                template = await vite.transformIndexHtml(url, template);
                render = await vite
                    .ssrLoadModule("src/entry.server.tsx")
                    .then((m) => m.render);
            } else {
                template = await fsp.readFile(
                    resolve("dist/client/index.html"),
                    "utf8"
                );
                render = require(resolve("dist/server/entry.server.js")).render;
            }

            let html = template.replace("<!--app-html-->", render(url, componentData));
            res.setHeader("Content-Type", "text/html");
            return res.status(200).end(html);
        } catch (error) {
            if (!isProduction) {
                vite.ssrFixStacktrace(error);
            }
            console.log(error.stack);
            res.status(500).end(error.stack);
        }
    });

    function setNoCache(res) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        res.setHeader("Expires", date.toUTCString());
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Cache-Control", "public, no-cache");
    }

    function setLongTermCache(res) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        res.setHeader("Expires", date.toUTCString());
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }

    const BUILD_PATH = "dist/client";

    app.use(
        express.static(BUILD_PATH, {
            extensions: ["html"],
            setHeaders(res, path) {
                if (path.match(/(\.html|\/sw)$/)) {
                    setNoCache(res);
                } else if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
                    setLongTermCache(res);
                }
            },
        }),
    );
    app.get("*", (req, res) => {
        setNoCache(res);
        res.sendFile(path.resolve(BUILD_PATH, "index.html"));
    });
    return app;
}

createServer().then((app) => {
    app.listen(3000, () => {
        console.log("HTTP server is running at http://localhost:3000");
    });
});
