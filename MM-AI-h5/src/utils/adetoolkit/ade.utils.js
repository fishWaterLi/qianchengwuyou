
export class AdeUtils{
	/**
	 * 错误显示
	 * @param {*} msg 
	 */
	static ErrsShow(msg){
		throw new Error(msg);
		}
	/**
	 * 对象合并
	 * @param {*} o1 
	 * @param {*} o2 
	 * @param {*} override 
	 */
 	 static	_extend(o1,o2,override){
			for(var i in o2){			
				if(o2.hasOwnProperty(i)){							
					if(o1[i]===undefined || override==true){			
						o1[i]=o2[i];					
					}
				}
			}
			return o1;
			}
			/**
			 * 数组截取
			 * @param {*} obj 
			 * @param {*} start 
			 * @param {*} end 
			 */
	 	static	_slice(obj, start, end){
				let res = [];
				for(let i = start || 0, len = end || obj.length; i < len; i++){
					res.push(obj[i])
				}
				return res;
			}
			/**
			 * 将canvas转换为Blob格式
			 * 传入的参数为canvas.toDataURL
			 * @param {} urlData 
			 */
		static convertBase64UrlToBlob(base64Data){			 
			var byteString;
			if (base64Data.split(',')[0].indexOf('base64') >= 0)
				byteString = atob(base64Data.split(',')[1]);
			else
				byteString = unescape(base64Data.split(',')[1]);
			var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
			var ia = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ia], {
				type: mimeString
			});
		 }
		 /**
		  * 用于矩阵赋值计算
		  * @param {} projectionMatrix 
		  * @param {*} value 
		  */
		static setProjectionMatrix(projectionMatrix, value) {
			if (typeof projectionMatrix.elements.set === "function") {
				projectionMatrix.elements.set(value);
			} else {
				projectionMatrix.elements = [].slice.call(value);
			}
		}
	
} 
 