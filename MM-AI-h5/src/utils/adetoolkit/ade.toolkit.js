/**
 * 封装一个插件工具箱
 */ 
import * as AdeEventDispacher from './ade.eventDispacher';
import * as AdeTimeLine from './ade.timeline';
import * as AdeUtils from './ade.utils';
const AdeToolKit={
   ...AdeUtils,
   ...AdeEventDispacher,
   ...AdeTimeLine
}
export default AdeToolKit;
 