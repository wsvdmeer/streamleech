require("dotenv").config();
import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV, TMDB_API_KEY } = process.env;
const dev = NODE_ENV === "development";
const { json } = require("body-parser"); // needed for posts

polka() // You can also use Express
  .use(json())
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => ({
        TMDB_API_KEY,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
