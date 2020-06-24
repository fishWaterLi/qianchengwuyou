import Vue from 'vue';
import storage from '@utils/storage/base.storage';
import { BAM_CONFIG } from '@api/base.constant.d';
Vue.filter('configTrf', function(value, attrName) {
    if (!value) return '';
	let config = JSON.parse(storage.getLocalItem(BAM_CONFIG));
	let _attr = config[attrName];
	let _parmaAttr = 'key';
	let _other = 'value';
	if (!_attr) {
		throw new Error('请输入正确的config下属性值');
	}
	for (let key of _attr) {
		if (key[_parmaAttr] == value) {
			return key[_other];
		}
	}
});
Vue.filter('configTrfData', function(value, attrName) {
  if (!value) return '';
  let config = JSON.parse(storage.getLocalItem(BAM_CONFIG));
  let _attr = config[attrName];
  let _parmaAttr = 'key';
  let _other = 'value';
  let dataTrf = [];
  if (!_attr) {
    throw new Error('请输入正确的config下属性值');
  }
  let result=value.split(",");
  for(var i=0;i<result.length;i++){
    for (let key of _attr) {
      if (key[_parmaAttr] == result[i]) {
        dataTrf.push(key[_other])
      }
    }
  }
  return dataTrf.join("、");
});
Vue.filter('toFixed', function(value, num) {
	if (!value) return '';
	let _num = num || 2;
	if (typeof value == 'number') {
		return value.toFixed(_num);
	} else {
		return parseFloat(value).toFixed(_num);
	}
});

Vue.filter('strMaxLen', function(value, num) {
	if (!value) return '';
	let _num = num || 15;
	return value.length > _num ? value.slice(0, _num) + '···' : value;
});

Vue.filter('unescape', function(value) {
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
});
Vue.filter('getAgeYears', function(value) {
	const curYear = new Date().getFullYear();
	const years = value.replace(/(\d{4})(-\d{2}-\d{2})/, ($0, $1) => $1);
	return curYear - years;

});
Vue.filter('formatdate', function(val, $format, $separator) {
	if (!val) return '';
    let _val = val || new Date();
	let format = $format || 'yyyy-MM-dd';
	let separator = $separator || '-';
	let resultArr = [];
	let _formatArr = format.split('-');
	let resultDate = '';
	let date = new Date(_val);
	let _mon = date.getMonth() + 1;
	let month = _mon < 10 ? '0' + _mon : _mon;
	let _day = date.getDate();
	let day = _day < 10 ? '0' + _day : _day;
	if (_formatArr.indexOf('yyyy') >= 0) {
		resultArr.push(date.getFullYear());
	}
	if (_formatArr.indexOf('MM') >= 0) {
		resultArr.push(month);
	}
	if (_formatArr.indexOf('dd') >= 0) {
		resultArr.push(day);
	}
	resultDate = resultArr.join(separator);
	return resultDate;
});
