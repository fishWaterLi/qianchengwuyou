/**
 * webuploader调用封装
 */
import jQuery from "jquery";
import WebUploader from "webuploader";
import {EventDispatcher} from './AdeEventDispacher';
window.jquery = window.$ = window.jQuery = jQuery;
export class AdeWebUploader{
    constructor(){
        this.accept="image";
        this.url="http://ar.hs4601.com/hs32ar/ar/card";
        this.duplicate=false;
        this.fileNumLimit=1;// 上传最大数量 默认为1       
        this.fileSingleSizeLimit=2048000;// 大小限制 默认2M
       // this.formData=null;//上传时传给后端的参数，一般为token，key等
        this.formData={};
        this.multiple=false;
        this.uploadButton="#picker";
        this.uploader=null;
        Object.assign(this,EventDispatcher.prototype);
    }
    /**
     * 初始化webuploader
     */
    initWebUpload() {
        this.uploader = WebUploader.create({
          auto: true, // 选完文件后，是否自动上传
          swf: "@assets/images/Uploader.swf", // swf文件路径
          server: this.url, // 文件接收服务端
          // pick: '#picker',
          pick: {
            id: this.uploadButton, // 选择文件的按钮
            multiple: this.multiple // 是否多文件上传 默认false（一次选择多个文件）
            // label: '',
          },
          // accept: this.getAccept(this.accept), // 允许选择文件格式。
          threads: 10, // [默认值：3] 上传并发数。允许同时最大上传进程数。
          fileNumLimit: this.fileNumLimit, // [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。（总上传数量）
          // fileSingleSizeLimit: this.fileSingleSizeLimit, // 限制单个上传图片的大小
          formData: this.formData, // 上传所需参数
          chunked: true, //分片上传
          chunkSize: 2048000, //分片大小
          duplicate: this.duplicate // 去重-是否允许重复上传
          // sendAsBinary:true,  //二进制上传，（安卓不支持JPG，需要使用二进制流上传解决）
  
          // resize: false,  // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
          /* compress: {  // 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
                          width: 1600,
                          height: 1600,
                          // 图片质量，只有type为`image/jpeg`的时候才有效。
                          quality: 90,
                          // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                          allowMagnify: false,
                          // 是否允许裁剪。
                          crop: false,
                          // 是否保留头部meta信息。
                          preserveHeaders: true,
                          // 如果发现压缩后文件大小比原来还大，则使用原来图片
                          // 此属性可能会影响图片自动纠正功能
                          noCompressIfLarger: false,
                          // 单位字节，如果图片大小小于此值，不会采用压缩。
                          compressSize: 0
                      },    */
        });
  
        this.uploader.on("beforeFileQueued", (file) => {
          let type = this.getAccept(this.accept).exteensions;
          if (type.indexOf(file.ext.toLowerCase()) === -1) {
           // message.error(`只能上传${type}类型的文件！`);
            return false;
          } else {
            this.dispatchEvent({type:"beforeFileChange",data:{val:true}});
          }
        });
  
        // 当有文件被添加进队列的时候，添加到页面预览
        this.uploader.on("fileQueued", file => {
            this.dispatchEvent({type:"fileChange",data:{file:file}}); 
        });
  
        this.uploader.on("uploadStart", file => {
          // 在这里可以准备好formData的数据
          //this.uploader.options.formData.key = this.keyGenerator(file);
          this.dispatchEvent({type:"start",data:{file:file}});         
        });
  
        // 文件上传过程中创建进度条实时显示。
        this.uploader.on("uploadProgress", (file, percentage) => {
            this.dispatchEvent({type:"progress",data:{file:file,perc:percentage}}); 
        });
  
        this.uploader.on("uploadSuccess", (file, response) => {
           console.log('response==',response);
            this.dispatchEvent({type:"success",data:{file:file,res:response}}); 
        });
  
        this.uploader.on("uploadError", (file, reason) => {
          console.error(reason);
          this.dispatchEvent({type:"uploadError",data:{file:file,res:reason}}); 
          this.dispatchEvent({type:"error",data:{res:reason}});  
        });
  
        this.uploader.on("error", type => {
          if (type === "F_EXCEED_SIZE") {
           // message.error(`文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`);
          } else if (type === "Q_EXCEED_NUM_LIMIT") {
           // message.error('文件上传已达到最大上限数');
          } else if (type === "F_DUPLICATE") {
           // message.error('不能重复上传同一张图片');
          } else {
            //message.error(`上传出错！请检查后重新上传！错误代码${type}`);
          }
          this.dispatchEvent({type:"error",data:''});  
        
        });
  
        this.uploader.on("uploadComplete", (file, response) => {
          this.dispatchEvent({type:"complete",data:{file:file,res:response}});   
          this.uploader.removeFile(file, true);
        });
      }
      upload(file) {
        this.uploader.upload(file);
      }
      stop(file) {
        this.uploader.stop(file);
      }
      // 取消并中断文件上传
      cancelFile(file) {
        this.uploader.cancelFile(file);
      }
      // 在队列中移除文件
      removeFile(file, bool) {
        console.log("webuploader.vue removeFile", file, bool);
        // 移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 true 则会从 queue 中移除。
        // 当我们调用了一下removeFile方法后，只是标记了一下这个文件的状态，我们用getFiles方法，其实还是可以看到,
        // 只有reset重置队列即可刷新getFiles的数据
        this.uploader.removeFile(file, bool);
        // 但是reset后，文件上传数量fileNumLimit会受影响
        // this.uploader.reset();//重置uploader。目前只重置了队列。
      }
      getUploader() {
        return this.uploader;
      }
      getAccept(accept) {
        switch (accept) {
          case "text":
            return {
              title: "Texts",
              exteensions: "doc,docx,xls,xlsx,ppt,pptx,pdf,txt",
              mimeTypes: ".doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt"
            };
            break;
          case "word":
            return {
              title: "Word",
              exteensions: "doc,docx",
              mimeTypes: ".doc,.docx"
            };
            break;
          case "pdf":
            return {
              title: "PDF",
              exteensions: "pdf",
              mimeTypes: ".pdf"
            };
            break;
          case "ppt":
            return {
              title: "PPT",
              exteensions: "ppt,pptx",
              mimeTypes: ".ppt,.pptx"
            };
            break;
          case "excel":
            return {
              title: "Excels",
              exteensions: "xls,xlsx",
              mimeTypes: ".xls,.xlsx"
            };
            break;
          case "video":
            return {
              title: "Videos",
              exteensions: "mp4",
              mimeTypes: ".mp4"
            };
            break;
          case "image":
            return {
              title: "Images",
              exteensions: "gif,jpg,jpeg,bmp,png",
              // mimeTypes: '.gif,.jpg,.jpeg,.bmp,.png'
              mimeTypes: "image/*" //安卓可以调用相册和相机
            };
            break;
          default:
            return {
              title: "Images",
              exteensions: "gif,jpg,jpeg,bmp,png",
              // mimeTypes: '.gif,.jpg,.jpeg,.bmp,.png'
              mimeTypes: "image/*" //安卓可以调用相册和相机
            };
        }
      }
}