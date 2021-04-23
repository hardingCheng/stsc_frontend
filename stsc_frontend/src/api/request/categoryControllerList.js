// 平台需求/服务分类接口
import axios from "../api";

const categoryControllerList = {
    // 获取所有分类
    getCategory: (params) => {
        return axios({
            url: "/ph/stcsp/category/getCategory",
            method: "get",
        });
    },
    // 获取所有的一级分类
    getFirstCategoryList: () => {
        return axios({
            url: "/ph/stcsp/category/getFirstCategoryList",
            method: "get",
        });
    },
    // 获取三级类别父类别
    getParentCategory: (params) => {
        return axios({
            url: `/ph/stcsp/category/getParentCategory/${params.categoryId}`,
            method: "get",
        });
    },
    // 获取一级分类下所有的二级分类
    getSecondCategoryList: (params) => {
        return axios({
            url: `/ph/stcsp/category/getSecondCategoryList/${params.firstId}`,
            method: "get",
        });
    },
    // 获取所有的三级分类
    getThirdCategoryList: (params) => {
        return axios({
            url: `/ph/stcsp/category/getThirdCategoryList`,
            method: "get",
        });
    },
    // 获取该二级分类下所有的三级分类
    getThirdCategoryListSecondId: (params) => {
        return axios({
            url: `/ph/stcsp/category/getThirdCategoryList/${params.secondId}`,
            method: "get",
        });
    },
}
export default categoryControllerList
