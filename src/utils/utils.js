//全局获取 公参方法
import store from '../store'

//获取缓存 token 方法
export const common = function () {
  if (sessionStorage.getItem('assent_token')) {
    return sessionStorage.getItem('assent_token')
  }
  return false
}

//获取url传参 注释：未做转码
export const getUrlParams = (str, url = window.location.href) => {
  let list = url.split('?')[1] || ''
  if (list === '') {
    return undefined
  } else {
    let valStr = list.split('&').find(item => item.split('=')[0] === str)
    if (valStr) {
      return valStr.split('=')[1]
    } else {
      return undefined
    }
  }
}

//数组克隆--对象序列化 注释：如果有函数则不能正常复制
export const cloneObj = obj => {
  return JSON.parse(JSON.stringify(obj))
}

//设置用户 token 缓存
export const tokenFun = val => {
  sessionStorage.setItem('assent_token', val)
}
//设置用户 memberId 缓存
export const memberidFun = val => {
  sessionStorage.setItem('memberId', val)
}

//设置ajax 状态方法
export const setAjax = val => {
  store.dispatch('userinfo/loadingHandle', {
    loading: val
  })
}

//设置tips 失败弹框
export const tipsFail = content => {
  store.dispatch('userinfo/dialogHandle', {
    show: true,
    type: 'fail',
    content: content,
    time: 3000
  })
}

//设置tips 提示未购课程弹框
export const tipsTitle = (content) => {
  store.dispatch('userinfo/dialogHandle', {
    show: true,
    type: 'warning',
    content: content,
    hasMask: false,
    time: 2000
  });
};

//设置tips 失败弹框
export const tipsMsg = (content) => {
  store.dispatch('userinfo/dialogHandle', {
    show: true,
    type: 'warning',
    content: content,
    time: 2000
  });
};

//设置tips 提示信息
export const message = (content) => {
  store.dispatch('userinfo/dialogHandle', {
    show: true,
    type: 'message',
    content: content,
    hasMask: false,
    time: 2000
  });
};

/**
 *
 * js复制内容方法
 *
 * 如果 id为false 直接复制attr
 *
 * 复制id为‘id’ 的元素的 attr属性
 *
 * 复制成功返回 true  失败 返回false
 *
 * */
export const copy = (id, attr) => {
  let target = null
  if (attr) {
    target = document.createElement('div')
    target.id = 'tempTarget'
    target.style.opacity = '0'
    if (id) {
      let curNode = document.querySelector('#' + id)
      target.innerText = curNode[attr]
    } else {
      target.innerText = attr
    }
    document.body.appendChild(target)
  } else {
    target = document.querySelector('#' + id)
  }

  let type = false
  try {
    let range = document.createRange()
    range.selectNode(target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    type = true
  } catch (e) {
    type = false
  }

  if (attr) {
    // remove temp target
    target.parentElement.removeChild(target)
  }
  return type
}

/**
 *
 * 获取年月日方法 返回结果 {y:2019,m:08,r:03}
 *
 * */

export const getDateStr = (str = '') => {
  let t = new Date(str)
  let y, m, r
  y = t.getFullYear()
  m = t.getMonth() + 1
  r = t.getDate()
  m = m < 10 ? '0' + m : m
  r = r < 10 ? '0' + r : r
  return {
    y,
    m,
    r
  }
}

/**
 * 时间对象  转换 yyyy-mm-rr;
 *
 * */

export const trimDate = (str = '') => {
  if (!str) {
    return ''
  }
  let t = getDateStr(str)
  return t.y + '-' + t.m + '-' + t.r
}


/**
 * 状态拦截
 *  code 状态码
 *  msg  状态语
 * */

export const stateInterception = (code, msg, _this) => {
  if (code !== 0) {
    _this.$router.push({
      path: '/main'
    })
    tipsFail(msg);
  }
}



/**
 * 登录成功跳转
 *  val 认证状态
 * */

export const loginSuccess = (val, _this) => {
  let callBackUrl = cloneObj(sessionStorage.getItem('callBackUrl'))
  sessionStorage.setItem('loginRoleStatus', val) //缓存当前角色状态
  if (callBackUrl) {
    let list = callBackUrl.split('status')
    let href = ''
    if (callBackUrl.match('/#/StudentLinkto')) {
      if (list[1]) {
        href = list[0] + 'status=' + val
      } else {
        href = list[0] + '&status=' + val
      }
    } else {
      href = callBackUrl
    }
    sessionStorage.removeItem('callBackUrl')
    window.location.href = href
    return
  }

  if (val === 0 || val === 1 || val === 4 || val === 5) {
    //未认证
    _this.$router.push({
      path: '/Uncertified'
    })
  } else if (val === 2) {
    //认证未学生
    _this.$router.push({
      path: '/StudentMain'
    })
  } else if (val === 3) {
    //认证为创建者
    _this.$router.push({
      path: '/creator/home'
    })
  }
}

/**
 * 数字转大写
 *  val 认证状态 99一下的可以转换 待修改
 * */

export const trimNumber = (val = '') => {
  let b = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  let w = ['十', '百', '千', '万']
  val = val * 1
  val = val + ''
  let valList = val.split('')
  if (valList.length === 1) {
    return b[val * 1 - 1]
  }
  if (valList.length === 2) {
    if (valList[1] == 0) {
      if (valList[0] == 1) {
        return '十'
      } else {
        return b[valList[0] - 1] + '十'
      }
    } else {
      if (valList[0] == 1) {
        return '十' + b[valList[1] - 1]
      } else {
        return b[valList[0] - 1] + '十' + b[valList[1] - 1]
      }
    }
  }
}

/**
 *
 * 跳转 orther路由  iframe 嵌套 转码跳转公共方法
 *
 * url,课程地址
 * group, 群ID
 * cour, 课程计划ID
 * type,课程类型
 * ref，课程ID
 * token用户唯一标识
 * */

export const jumpOrther = (url, group, cour, ref, token) => {
  let baseUrl = window.location.href.split('#')[0] + ''
  let newUrl =
    url +
    '?actor={"name":"xxx","mailto":"xxx@luyouor.com"}&endpoint=' +
    baseUrl +
    'api/learningRecordStore/&token=' +
    token +
    '&content_token=' +
    group +
    '-' +
    cour +
    '-' +
    ref
  window.open(
    window.location.href.split('#')[0] +
    '#/orther?url=' +
    encodeURIComponent(newUrl)
  )
}

/**
 * 计算文件大小  val 单位 B
 *
 * */
export const fileSizeFun = (val = '') => {
  val = val * 1;
  let str = 'B';
  if (val < 1024) {

  } else if (val < 1024 * 1024) {
    val = val / 1024;
    val = val.toFixed(2);
    str = 'KB';
  } else if (val < 1024 * 1024 * 1024) {
    val = val / (1024 * 1024);
    val = val.toFixed(2);
    str = 'MB';
  } else {
    val = val / (1024 * 1024 * 1024);
    val = val.toFixed(2);
    str = 'GB';
  }
  return val + str;
}

/**
 * 时间转换  1000
 *
 * val 单位秒
 *
 * */

export const trimTime = (val = '') => {
  val = val * 1;
  let str = 's';
  if (val < 60) {

  } else if (val < 60 * 60) {
    val = val / 60;
    val = val.toFixed(2);
    str = 'min'
  } else {
    val = val / (60 * 60);
    val = val.toFixed(2);
    str = 'h';
  }
  return val + str;
}

/**
 * 详情页师资介绍过滤方法
 *
 *
 * */

export const teaIroFun = (list = []) => {
  let newList = [];
  list.map(d => {
    if (!newList.find(m => m.partnerId === d.partnerId)) {
      newList.push(cloneObj(d));
    }
  });
  return newList;
};

/**
 *
 * 当前页 向iframe 发送消息
 *
 * Id iframe Id
 *
 * data 要发送的信息 对象
 *
 * */

export const setIframeMsg = (id, data = {}) => {
  let myframe = document.getElementById(id); //获取iframe
  if (!myframe) {
    console.log('当前Id不存在');
    return;
  }
  try {
    myframe.contentWindow.postMessage(data, '*'); //childDomain是子页面的源（协议+主机+端口号）
  } catch (e) {
    console.error(e);
  }
};
