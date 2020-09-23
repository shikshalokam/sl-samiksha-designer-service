/**
 * name : users.js
 * author : Rakesh Kumar
 * created-date : 22-Sep-2020
 * Description : User creation and related information.
 */

const usersHelper = require(MODULES_BASE_PATH + "/users/helper.js");

/**
    * Users
    * @class
*/

module.exports = class Users extends Abstract {

    /**
      * @apiDefine errorBody
      * @apiError {String} status 4XX,5XX
      * @apiError {String} message Error
      */

    /**
     * @apiDefine successBody
     *  @apiSuccess {String} status 200
     * @apiSuccess {String} result Data
     */


    constructor() {
        super("userExtension");
    }

    static get name() {
        return "Users";
    }

}