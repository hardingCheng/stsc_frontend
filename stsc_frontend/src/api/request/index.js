/* 将所有接口统一起来便于维
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

import adminControllerList from "./adminControllerList";
import categoryControllerList from "./categoryControllerList";
import ossControllerList from "./ossControllerList";
import userControllerList from "./userControllerList";
import requirementControllerList from "./requirementControllerList";
import serveControllerList from "./serveControllerList";
import orderControllerList from "./orderControllerList";
import companyRealInfoController from "./companyRealInfoController";
import arrangeController from "./arrangeController";

export default {
    adminControllerList,
    categoryControllerList,
    ossControllerList,
    userControllerList,
    requirementControllerList,
    serveControllerList,
    orderControllerList,
    companyRealInfoController,
    arrangeController
}
