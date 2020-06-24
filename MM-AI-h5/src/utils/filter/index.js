import Vue from 'vue';
import store from '@store/index.js';
import { siteTransfer } from '@utils/base.utils.f';

const contexts = require.context('.', false, /\.js$/);
contexts.keys().forEach((component) => {
	let filters = contexts(component);
	for (let key in filters) {
		let filter = filters[key];
		// 使用内置的过滤器名称（函数名称） 进行全局过滤器注册
		Vue.filter(key, filter);
	}
});

const filters = {
	/* 年龄 */
	getAgeYear: (values) => {
		const curYear = new Date().getFullYear();
		const years = values.replace(/(\d{4})(-\d{2}-\d{2})/, ($0, $1) => $1);

		return curYear - years;
	},

	/* 专业汉化 */
	majorToChinese: (values) => {
		if (!values) return;

		const getConfigSource = store.getters.getConfigSource;
		const majorList = getConfigSource && getConfigSource.major;

		const major = values.split(',').map(item => majorList[item]).join(' ');

		return major;
	},

	/* 期望工作地点汉化 */
	expectSiteToChinese: (values) => {
		if (!values) return;
		const reg = /(\d{6})(\d{6})/;

		const site = values.replace(reg, ($0, $1, $2) => {
			return JSON.stringify([$1, $2]);
		})

		const siteChinese = siteTransfer(JSON.parse(site));
		return siteChinese.join('');
	}
}

for (let key in filters) {
	if (filters.hasOwnProperty(key)) {
		Vue.filter(key, filters[key]);
	}
}
