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
exports.UsersService = void 0;
const app_data_source_1 = require("../app-data-source");
const User_1 = require("../entity/User");
class UsersService {
    selectAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield app_data_source_1.myDataSource.getRepository(User_1.Users).find();
            console.log(users);
            return users;
        });
    }
    ;
}
exports.UsersService = UsersService;
;
