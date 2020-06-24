/**
 * 项目通用api接口
 * 如果交口较多，可以按照业务划分新建多个数据文件
 */
import {baseURL} from '@/api/base.constant.d';
const api_common = {
    testUrl: baseURL + '/searchMusic?name=雅俗共赏', // 3356 (后台)——登录
};
export default api_common;