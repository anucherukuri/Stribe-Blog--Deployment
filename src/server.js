import express from "express";

import cors from "cors";

import listEndpoints from "express-list-endpoints";

import authorsRouter from "./authors/index.js";

import blogsRouter from "./blogs/index.js";

import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

const server = express();

const {PORT = 3001} = process.env

server.use(cors());

server.use(express.json());

server.use(express.static(publicDirectory));

//************************************** CORS ********************************************* */

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL]

server.use(express.static(publicFolderPath))
server.use(loggerMiddleware) // Global middleware
server.use(
  cors({
    origin: function (origin, next) {
      // cors is a global middleware --> for each and every request we are going to be able to read the current origin value
      console.log("ORIGIN: ", origin)
      if (!origin || whitelist.indexOf(origin) !== -1) {
        // indexOf returns -1 when the element is NOT in the array
        console.log("Origin allowed!")
        next(null, true) // origin is in the whitelist --> move next with no errors
      } else {
        console.log("Origin NOT allowed!")
        next(new Error("CORS ERROR!")) // origin is NOT in the whitelist --> trigger an error
      }
    },
  })
)
// server.use(fakeAuthMiddleware) // Global middleware
server.use(express.json()) // If you don't add this configuration to our server (BEFORE the endpoints), all requests' bodies will be UNDEFINED



//************************************** END POINTS ********************************************* */
server.use("/authors", authorsRouter);

server.use("/blogs", blogsRouter);

server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);

console.log(listEndpoints(server));

server.listen(PORT, () => console.log("✅ Server is running on port : ", PORT));

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
