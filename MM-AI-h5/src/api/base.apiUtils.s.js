
import Storage from '@utils/storage/base.storage';
import { APP_MODULE_NAME, BAM_MODULE_NAME, BAM_TOKEN, TOKEN, BAM_ACCOUNT } from './base.constant.d';
// import routerb from '@/pages/router';

/**
 * current module name
 */
export const module_name =() => {
    // console.log('--module_name=',Storage.getLocalItem('module_name'));
    return Storage.getLocalItem('module_name');
};
/**
 * clear user info
 * @param {} getModule 
 */
export function clearLocalInfo(getModule) {
    switch (getModule()) {
        case APP_MODULE_NAME:            
            break;
        case BAM_MODULE_NAME:
            Storage.remove(BAM_TOKEN);
            // routerb.push({
            //     path: '/sys-login'
            // });
            break;
    }
}


/**
 * get curr token
 * @param {} getModule 
 */
export const module_token = (getModule) => {
    switch (getModule()) {
        case APP_MODULE_NAME:
            return (Storage.getSessionItem(TOKEN) || Storage.getLocalItem(TOKEN));
            break;
        case BAM_MODULE_NAME:
            return (Storage.getSessionItem(BAM_TOKEN) || Storage.getLocalItem(BAM_TOKEN));
            break;
    }
}
