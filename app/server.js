const app = require("./src/app");

const _PORT= process.env.NODE_DOCKER_PORT;

const server = app.listen(_PORT, () => {
    console.log(`Server ShopBee is running with ${_PORT}`);
});
