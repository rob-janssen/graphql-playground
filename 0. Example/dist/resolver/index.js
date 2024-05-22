"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("./user");
const products_1 = require("./products");
exports.resolvers = [user_1.UsersResolver, products_1.ProductsResolver];
