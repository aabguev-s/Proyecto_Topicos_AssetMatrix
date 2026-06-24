"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./src/app");
const db_1 = require("./src/config/db");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
(0, db_1.connectDB)().then(() => {
    app_1.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
});
//# sourceMappingURL=server.js.map