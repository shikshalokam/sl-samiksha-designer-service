/**
 * name : users/helper.js
 * author : Rakesh Kumar
 * Date : 23-Sep-2020
 * Description : Consist of user creation and user related information.
 */

module.exports = class UsersHelper {

    /**
     * To get user roles
     * @method
     * @name getUserRoles
     * @param {String} userId -  user id
     * @returns {json} Response consists of user roles
    */
    static getUserRoles(userId) {

        return new Promise(async (resolve, reject) => {
            try {


                let roles = [];
                let userData = await database.models.userExtension.findOne({ userId: userId },
                    { roles: 1, organisationRoles: 1, });

                if (userData) {
                    if (userData.roles) {
                        userData.roles.map(role => {
                            if (!roles.includes(role.code)) {
                                roles.push(role.code);
                            }
                        });
                    }
                    if (userData && userData.organisationRoles && userData.organisationRoles.length > 0) {
                        userData.organisationRoles.map(userRole => {
                            userRole.roles.map(role => {
                                if (!roles.includes(role.code)) {
                                    roles.push(role.code);
                                }
                            })
                        })
                    }
                }
                resolve({ data: roles, success: true });

            } catch (error) {
                return reject({
                    succes: false,
                    message: error,
                    data: false
                });
            }
        })
    }

}