import GlobalConstants from "../../../../../global/GlobalConstants";
import axios from 'axios';


export interface IAddUserParam {
    username: string,
    firstName: string
    lastName: string,
    email: string
}

class UsersService {
    addNewUser(param: IAddUserParam): Promise<boolean> {
        return new Promise((resolve, reject) => {
            axios
                .post(GlobalConstants.Plugins.Users.Urls.UsersList, {
                    ...param
                })
                .then((response) => {
                    resolve(true);
                }).catch((e) => {
                reject(e);
            });
        });
    };
}

const instance = new UsersService();

export default instance;
