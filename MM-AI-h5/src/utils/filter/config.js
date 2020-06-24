import storage from '../storage/base.storage';
import { CONFIG } from '@api/base.constant.d';
export function config(value, attrName) {

	if (!value) return '';
	let config = JSON.parse(storage.getLocalItem(CONFIG));
	let _attr = config && config[attrName];
	let _parmaAttr = 'key';
	let _other = 'value';
	if (!_attr) {
		console.error('请输入正确的config下属性值');
		return '';
	}
	for (let key of _attr) {
		if (key[_parmaAttr] == value) {
			return key[_other];
		}
	}
}
