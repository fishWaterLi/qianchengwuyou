class BaseConfigTrf {
    constructor(){
        this.instance=null;
        this.userData=null;
        this.name=window.location.hostname;
        this.type='html5';
    }
    static getInstance(){
        if(!this.instance){
            this.instance=new BaseConfigTrf();
        }
        return this.instance;
    }
    init(data) {
        return this.trfData(data);
    }
    trfData(data) {
        var idata = {};
        for (var key in data) {
            idata[key] = [];
            if (this.isArray(data[key])) {
                for (let i = 0; i < data[key].length; i++) {
                    idata[key].push({key: i, value: data[key][i]});
                }
            } else {
                for (var key2 in data[key]) {
                    idata[key].push({key: key2, value: data[key][key2]});
                }
            }
            idata[key].sort(this.compare("key"));
        }
        return idata;
    }

    compare(property) {
        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2; // 升序
        };
    }
    isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    /**
     * 通过key获取配置对应的value
     * @param confArr
     * @param key
     */
    getValueByKeyFromConfig(confArr,key){
        for(let i = 0,len = confArr.length;i < len;i++){
            if(confArr[i].key == key){
                return confArr[i].value;
            }
        }
        return '';
    }

    /**
     * 通过value获取配置对应的key
     * @param confArr
     * @param value
     */
    getKeyByValueFormConfig(confArr,value){
        for(let i = 0,len = confArr.length;i < len;i++){
            if(confArr[i].value == value){
                return confArr[i].key;
            }
        }
        return '';
    }
}

let baseConfigTrf=BaseConfigTrf.getInstance();
export default baseConfigTrf;