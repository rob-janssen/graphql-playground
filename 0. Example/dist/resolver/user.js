"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersResolver = void 0;
const user_1 = require("../model/user");
exports.UsersResolver = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.find({});
                if (!users)
                    throw new Error("No users found");
                return {
                    success: true,
                    total: users.length,
                    users,
                };
            }
            catch (e) {
                throw e;
            }
        }),
        user: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!args.id)
                    throw new Error("No ID provided.");
                const user = yield user_1.User.findById(args.id);
                if (!user)
                    throw new Error("No user found!");
                return user;
            }
            catch (e) {
                throw e;
            }
        }),
    },
    Mutation: {
        regUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: args.email });
                if (user)
                    throw new Error("User already exists.");
                const newUser = yield user_1.User.create({
                    username: args.username,
                    email: args.email,
                    password: args.password,
                });
                return newUser;
            }
            catch (e) {
                throw e;
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: args.email });
                if (!user)
                    throw new Error("User not found!");
                const isValid = yield user.isValidPassword(args.password);
                if (!isValid)
                    throw new Error("Invalid password");
                return user;
            }
            catch (e) {
                throw e;
            }
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.id;
                if (!id)
                    throw new Error('No ID provided');
                const user = yield user_1.User.findById(id);
                if (!user)
                    throw new Error('User not found');
                const updateUser = yield user_1.User.findByIdAndUpdate(id, Object.assign({}, args), { new: true, runValidators: true });
                return updateUser;
            }
            catch (e) {
                throw e;
            }
        }),
        deleteUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = args.id;
                if (!id)
                    throw new Error('No ID provided');
                const user = user_1.User.findById(id);
                if (!user)
                    throw new Error('No user found');
                const deleteUser = user_1.User.findByIdAndDelete(id);
                return {
                    success: true,
                    message: 'User deleted succesully',
                };
            }
            catch (e) {
                throw e;
            }
        })
    },
};
