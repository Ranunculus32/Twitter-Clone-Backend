import "dotenv/config"; // loads environment variables (including .env in root)

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URL;

export default { MONGODB_URI, PORT };
