// 平台统一文件上传接口
import axios from "../api";

const uploadUrl = '/ph/stcsp/fileoss/upload';
const ossControllerList = {
    delFile: (data) => {
        return axios({
            url: `/ph/stcsp/fileoss/delfile/${data.filename}`,
            method: "delete",
        });
    },
}

export default ossControllerList
