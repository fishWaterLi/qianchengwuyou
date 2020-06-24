/**
 * 项目接口处理服务，使用配置好的axios实例进行请求，
 * 均使用静态方法，返回一个promise
 * 如果接口加多，可以根据业务新怎多个接口处理服务
 */
import baseAxiosS from '@/api/base.axios.s';
import api_common from "@/api/base.access.d";


class BaseHttpS {

    /**
     * 3356 (后台)——登录
     * @param data
     */
    static async fetchData(params = {}) {
        const res = await baseAxiosS.post(api_common.testUrl, params);
         return res;
    }
  

}

export default BaseHttpS;