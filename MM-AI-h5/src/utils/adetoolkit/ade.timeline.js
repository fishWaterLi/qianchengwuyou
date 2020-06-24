/**
 * AdeToolKit
 * Timeline
 */ 
import {EventDispatcher} from './ade.eventDispacher';
export const AdeTimeLine=(function(win){
	function TimeLine(option){
		//初始化TimeLine需要限制性浏览器的polyfills
		this.polyfills();
		this._auto = option.auto==0?false:true;//默认启动时间轴
		this._invl = option.interval || 0;//时间轴的颗粒度，毫秒为单位
        this._totalFrames = option.totalFrames || (Number.MAX_VALUE-1);//持续的长度，或者帧的长度
        this._frameProcess = option.process || null;//帧事务处理，比如回调函数
        this._params = option.params || null;//传递参数
        //this._frameRate=option.frameRate || 0//帧频
        this._frameId = 0;//当前帧id，一个数字。
        this._lineId = null;//当前处理的时间线
        this._preTime = 0;
        this._isPause = false;//当前暂停状态 
        this.MinInvl=16.7;
        //自动启动
        console.log('this._auto=',this._auto);
        if(this._auto){
        	this.start();
        }
        Object.assign(this,EventDispatcher.prototype);
	}
	TimeLine.prototype.start = function() {
        if (this._frameProcess == null) {
           	//this.errors("当前没有帧事务需要处理！");
           	//return;
        } else if (this._totalFrames < 0 || this._invl < 0) {
            this.errors("持续长度或帧时间间隔配置错误！");
            return;
        }
        this._preTime = (new Date()).getTime();
        this._isPause = false;   
        this.dispatchEvent({type:'TimeStart'});
        this.processing();         
    };
    TimeLine.prototype.processing = function() {
        var _this = this;
        //当前帧id==总帧数，则停止时间轴
        if (this._totalFrames > 0 && this._frameId == this._totalFrames) {
            this.stop();
            return;
        }
        //是否已经暂停
        if (this._isPause == true) {
            return;
        }
       //最大帧频设定为60/每秒,即最小执行间隔为16.7
        if (this._invl > this.MinInvl) {
            var nowTime = (new Date()).getTime();
            if (nowTime - this._preTime > this._invl) {
                this._frameId++;
                if(this._frameProcess){
                    this._frameProcess(this._frameId, this._params);//处理帧，并传入参数
                }
                this.dispatchEvent({type:'FrameProcess',data:{frameId:this._frameId,params:this._params}});
               // this.$emit('FrameProcess',{frameId:this._frameId,params:this._params});
                this._preTime = nowTime;
            }
        } else {
            this._frameId++;
            if(this._frameProcess){
                this._frameProcess(this._frameId, this._params);//处理帧，并传入参数
            }
            this.dispatchEvent({type:'FrameProcess',data:{frameId:this._frameId,interval:this._invl,params:this._params}});
            //this.$emit('FrameProcess',{frameId:this._frameId,interval:this._invl,params:this._params});
        }
        this._lineId = win.requestAnimationFrame(function() {
            _this.processing();
        });
    };
    TimeLine.prototype.stop = function() {
        if (this._lineId != null) {
            this._isPause = true;
            win.cancelAnimationFrame(this._lineId);
            this._frameId = 0;
            this._lineId = null;
        }
        this.dispatchEvent({type:'TimeStop'});
        //this.$emit('TimeStop');
    };
    TimeLine.prototype.pause = function() {
        if (this._lineId != null) {
            this._isPause = true;
            win.cancelAnimationFrame(this._lineId);
            this._lineId = null;
        }
        this.dispatchEvent({type:'TimePause'});
      //  this.$emit('TimePause');
    };
	TimeLine.prototype.polyfills = function() {
        /*兼容处理requestAnimationFrame*/
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0, length = vendors.length; x < length && !win.requestAnimationFrame; ++x) {
            win.requestAnimationFrame = win[vendors[x] + 'RequestAnimationFrame'];
            win.cancelAnimationFrame = win[vendors[x] + 'CancelAnimationFrame'] || win[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!win.requestAnimationFrame) {
            win.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = win.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!win.cancelAnimationFrame) {
            win.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    };
    TimeLine.prototype.errors = function(msg) {
        throw new Error(msg);
    };
    return TimeLine;
})(window);
