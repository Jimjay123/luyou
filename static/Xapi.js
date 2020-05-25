/**
 * xapi 文件动态添加文件 静态资源
 *
 *
 *
 * type  chapterClick 章节点击事件
 *
 * type  progressChange  进度变化触发
 *
 * type  xapiLoadingEnd  xapi 页面加载完成
 *
 * pagePosition  lastPage  最后一页
 *
 *
 * */
//监听外层传递数据
window.onmessage = () => {
  let origin = event.origin;
  console.log('父级触发--', event.data);
  if (event.data.type === 'chapterClick') {
    window.location.href = event.data.sendBack;
  }
};

//监听进度变化
$("body").on("DOMSubtreeModified", '.progress-bar__percentage-bottom', function () {
  let text = $('.progress-bar__percentage-bottom').text();
  let val = text.split('%')[0];
  let hash = window.location.hash;
  let linkList = $('body').find('.lesson-link'), len = linkList.length;
  let lastHref = '';
  if (len > 0) {
    let _lesson = $('body').find('.lesson-link')[len - 1];
    lastHref = $(_lesson).attr('href');
  }
  if(hash===lastHref){
    // 给父页面发送消息，隐藏按钮
    parent.postMessage({
      sendBack: val,
      type: 'progressChange',
      pagePosition: 'lastPage',
    }, '*');
  }else{
    // 给父页面发送消息，隐藏按钮
    parent.postMessage({
      sendBack: val,
      type: 'progressChange',
    }, '*');
  }
  event.stopPropagation();    //  阻止事件冒泡
});

function jumpFun(_this) {
  let href = $(_this).attr('href');
  let linkList = $('body').find('.lesson-link'), len = linkList.length;
  let lastHref = '';
  if (len > 0) {
    let _lesson = $('body').find('.lesson-link')[len - 1];
    lastHref = $(_lesson).attr('href');
  }
  if (href === lastHref) {
    parent.postMessage({
      sendBack: href,
      type: 'chapterClick',
      pagePosition: 'lastPage',
    }, '*');
  } else {
    parent.postMessage({
      sendBack: href,
      type: 'chapterClick',
    }, '*');
  }
}

//开始学习点击
$('body').on('click', '.overview__button', function () {
  jumpFun(this);
  event.stopPropagation();    //  阻止事件冒泡
});

//首页点击跳转到具体章节
$('body').on('click', '.overview-list-item__link', function () {
  jumpFun(this);
  event.stopPropagation();    //  阻止事件冒泡
});

//左侧导航点击切换章节
$('body').on('click', '.lesson-link', function () {
  jumpFun(this);
  event.stopPropagation();    //  阻止事件冒泡
});

//上一页监听
$('body').on('click', '.previous-lesson__link', function () {
  jumpFun(this);
  event.stopPropagation();    //  阻止事件冒泡
});

//下一页监听
$('body').on('click', '.next-lesson__link', function () {
  jumpFun(this);
  event.stopPropagation();    //  阻止事件冒泡
});

//页面加载完成
parent.postMessage({
  sendBack: '加载完成',
  type: 'xapiLoadingEnd',
}, '*');
