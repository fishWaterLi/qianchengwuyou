import { rootURL } from '@api/base.constant.d';
/**
 * 防止XSS攻击 转为HTML
 * @param {*} value
 */
export function unescape(value) {
	if (!value) return '';
	let escapeMap = {
		'&amp;': '&',
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#x27;': "'",
		'&#x60;': '`'
	};
	return value.replace(/&(lt|gt|amp|quot|#x27|#x60);/gi, function(t) {
		return escapeMap[t];
	});
}
/**
 * 防止XSS攻击---HTML转换
 * @param {*} value
 */
export function escape(value) {
	if (!value) return '';
	let escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;',
		'`': '&#x60;'
	};
	return value.replace(/(&|<|>|"|'|`)/gi, function(t) {
		return escapeMap[t];
	});
}
/**
 * 取小数点
 * @param {*} value
 * @param {*} num
 */
export function toFixed(value, num) {
	if (!value) return '';
	let _num = num || 2;
	if (typeof value == 'number') {
		return value.toFixed(_num);
	} else {
		return parseFloat(value).toFixed(_num);
	}
}
/**
 * 数字补零（小于十的数字前面补零）
 * @param {number} num     // 超过位数
 * @param {number} many     // 多少个0
 */
export let add0 = (num, many = 2) => {
	return num.toString().padStart(many, 0);
};
/**
 * 超出长度用自定义文本显示(默认4位省略号显示)
 * @param {String} str   // 需要操作的字符串
 * @param {number} num     // 超过位数
 * @param {String} text  // 拼接的字符串
 */
export let omitString = (str, num = 15, text = '...') => {
	if (str) {
		return str.toString().substring(0, num) + text;
	}
};

/**
 * 补全文件路径
 */
export let fullUrl = (url) => {
	if (url.indexOf('http') > -1) {
		return url;
	}
	return url.slice(0, 1) == '/' ? rootURL + url : rootURL + '/' + url;
};

/**
 * 格式化日期yyyy-MM-dd
 */
export let dateFormat = (date) => {
	if (date) {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return `${year}-${month < 10 ? ('0' + month) : month}-${day < 10 ? ('0' + day) : day}`;
	}
}
