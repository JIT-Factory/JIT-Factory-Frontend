const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    console.log("왜 안됨");
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );
};
