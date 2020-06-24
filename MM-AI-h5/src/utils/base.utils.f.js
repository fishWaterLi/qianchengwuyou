import { base64DecodeChars, base64EncodeChars } from '../api/base.constant.d';
// import districts from '../static/data/districts.js';

const checkPlatform = function () {
	let nowPF = 'mobile';
	let sys = 'ADK';
	let ua = navigator.userAgent;
	if (/iPad|iPhone/i.test(ua)) {
		nowPF = 'mobile';
		sys = 'IOS';
	} else if (/Android|mobile/i.test(ua)) {
		nowPF = 'mobile';
		sys = 'ADK';
	} else {
		nowPF = 'pc';
		sys = 'MS';
	}
	ua = ua.toLocaleLowerCase();
	let ver = ua.match(/cpu iphone os(.*?) like mac os/);
	let nowVer;
	if (!ver) {
		nowVer = '';
	} else {
		nowVer = ver[1].replace(/_/g, ".");
	}
	let iswx;
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		iswx = true;
	} else {
		iswx = false;
	}
	return { pf: nowPF, sys: sys, ver: nowVer, wx: iswx };
}
export { checkPlatform };

export const LocationResolver = {
	getUrlKey: function (name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
	}
}

/**
 * base64加密
 * @param {*} str 
 */
export function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += '==';
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xf) << 2);
			out += '=';
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3f);
	}
	return out;
}
/**
 * base64解密
 */
export function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = '';
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1) break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1) break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61) return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1) break;
		out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61) return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1) break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}

/**
 * config常量转为数组
 * @param obj
 * @returns {Array}
 */
export const transfer = obj => {
	let list = [];
	for (const o in obj) {
		list.push({
			label: obj[o],
			value: Number(o)
		})
	}
	return list
};

/** 
 * 省市编码转汉字 
 */

// export function siteTransfer(site) {
// 	let siteWord = [];

// 	const [f_code, s_code] = site;
// 	const item = districts.find(item => item.key == f_code);

// 	if (item) {
// 		siteWord.push(item.value);

// 		const subItem = item.children.find(it => it.key == s_code);

// 		if (subItem) {
// 			siteWord.push(subItem.value);
// 		}
// 	}
// 	console.log('siteWord', siteWord)
// 	return siteWord;
// }

/** 
 * 专业扁平数据转化为层级数据
 */

export function majorListFlatToRank(majorList) {
	const level_f_reg = /(\d{2})(0000)/;
	const level_s_reg = /(\d{2})(\d{2})(00)/;
	const level_t_reg = /(\d{4})(\d{2})/;

	let majorListArr = [];

	for (const it in majorList) {
		if (majorList.hasOwnProperty(it)) {
			let parent, id;

			if (level_f_reg.test(it)) {
				parent = null;
				id = it.replace(level_f_reg, ($0, $1, $2) => $1);
			} else if (level_s_reg.test(it)) {
				parent = it.replace(level_s_reg, ($0, $1, $2, $3) => $1);
				id = it.replace(level_s_reg, ($0, $1, $2, $3) => $1 + $2);
			} else {
				parent = it.replace(level_t_reg, ($0, $1, $2) => $1)
				id = it.replace(level_t_reg, ($0, $1, $2) => $0)
			}

			majorListArr.push({
				parent,
				id,
				label: majorList[it],
				value: it
			})
		}
	}

	// 对源数据深度克隆
	let cloneData = JSON.parse(JSON.stringify(majorListArr));

	return cloneData.filter(father => {
		//返回每一项的子级数组
		const branchArr = cloneData.filter(child => {
			return father.id == child.parent
		})

		// id 长度为 4 说明是第3级
		if (father.id && father.id.length == 4) {
			branchArr.unshift({
				parent: father.id,
				id: null,
				label: '全部',
				value: ''
			})
		}
		//如果存在子级，则给父级添加一个children属性，并赋值
		branchArr.length > 0 ? father.children = branchArr : ''
		return father.parent == null;      //返回第一层
	});
}

/* 
 * 点击下载
 */
export function downloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	link.target = "_blank";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

