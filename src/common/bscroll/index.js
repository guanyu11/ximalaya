import { throttle } from "utils/tool.js";


export default class BScroll {
    constructor(container) {
        //获取需要滚动的盒子
        this.container = $(container);
        // 下拉：13、设置防止多次执行的边界条件
        this.flag = true;
    }
    //下拉
    pullingDown(callback) {
        // 下拉：1、记录需要执行的事件
        this.callback = callback;
        //下拉：2、当手指按下的时候
        this.container.on("touchstart", this.handleTouchStartCb.bind(this))
    }
    handleTouchStartCb(e) {
        // 下拉：3、记录手指按下的位置
        this.disY = e.touches[0].pageY;
        //下拉：4、给container盒子加动画
        this.container.css({
            transition: "transform .3s"
        })

        this.handleTouchMoveEvent();
    }
    //下拉：5、添加手指移动事件
    handleTouchMoveEvent() {
        this.handleTouchMoveCb = this.handleTouchMoveCb.bind(this)
        this.container.on("touchmove", this.handleTouchMoveCb)
    }
    // 下拉：6、手指移动的时候要做的事情
    handleTouchMoveCb(e) {
        //下拉：7、记录手指移动的位置
        this.moveY = e.touches[0].pageY;
        //下拉：8、计算手指按下的位置与手指移动的位置的差值 这个差值主要是赋值给container移动使用
        var ih = this.moveY - this.disY;

        //防止 下拉和上拉冲突
        if (this.container.scrollTop() <= 0) {
            //下拉：9、设置边界值 防止用户无底线下拉
            if (ih >= 0 && ih <= 200) {
                //将差值赋值给container供container做移动使用
                this.container.css({
                    transform: "translateY(" + ih + "px)"
                })


                //下拉：14、设置边界条件
                if (this.flag) {
                    //下拉：10、当手指抬起的时候需要做的事情
                    this.handleTouchEndEvent();
                    this.flag = false;
                }

            }
        }

    }
    handleTouchEndEvent() {
        this.handleTouchEndCb = this.handleTouchEndCb.bind(this);
        this.container.on("touchend", this.handleTouchEndCb)
    }
    handleTouchEndCb() {
        //下拉：11、执行用户需要做的一些事情
        this.callback();
        //下拉:12、将container的Y值归0
        this.container.css({
            transition: "transform .3s ease-in-out .7s",
            transform: "translateY(0)"
        })

        //下拉：15、将边界条件更改为true
        this.flag = true;


        //下拉：16、移除移动事件和抬起事件
        this.container.off("touchmove", this.handleTouchMoveCb)
        this.container.off("touchend", this.handleTouchEndCb)
    }

    //上拉
    pullingUp(callback, timeout) {
        this.container.on("scroll", this.handlePullingUpCb.bind(this, callback, timeout))
    }
    handlePullingUpCb(callback, timeout) {
        //callback是用户需要执行的业务逻辑 timeout是节流的时间
        throttle(callback, timeout);
    }

}