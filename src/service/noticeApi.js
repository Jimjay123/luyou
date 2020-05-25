import { tools } from '@/utils/tools.js';
import url from './url'

// 系统消息
export const systemNotice = (data) => {
    //接口公参添加
    let cfg = {
        method: 'get',
        url: url['systemNotice'],
        data,
    }
    return tools.ajax(cfg);
}

// 导航栏上的系统消息
export const recentSystemNotice = (data) => {
    //接口公参添加
    let cfg = {
        method: 'get',
        url: url['recentSystemNotice'],
        data,
    }
    return tools.ajax(cfg);
}
