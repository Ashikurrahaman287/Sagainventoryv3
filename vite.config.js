"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const vite_1 = require("vite");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_1.default)()],
    build: {
        target: "chrome110",
        minify: false,
        outDir: "dist",
        rollupOptions: {
            external: ["electron"],
        },
    },
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "client/src"),
            "@shared": path_1.default.resolve(__dirname, "shared"),
        },
    },
});
