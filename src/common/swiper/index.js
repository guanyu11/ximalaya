export default class Swiper {
    constructor(container) {
        this.container = $(container);
        this.ul = $(container + ' ul');
        this.ali = $(container + ' ul li');
        this.iw = this.ali.eq(0).width();
        this.iNow = 0;
        this.len = 0;
        this.timer = null;

        this.init();
    }
    init() {
        var li = this.ali.eq(0).clone(true);
        this.ul.append(li);
        this.len = this.container.find("ul li").length;
        this.ul.css({
            width: this.len * this.iw
        })

        this.autoplay();
        this.handleTouchStart();
        this.handleTouchMove();
        this.handleTouchEnd();
    }
    handleTouchStart() {
        //当手指按下的时候
        this.ul.on("touchstart", this.handleTouchstartCb.bind(this))
    }
    handleTouchstartCb(e) {
        //清除定时器
        clearInterval(this.timer);
        //记录手指按下的位置
        this.disX = e.targetTouches[0].clientX;

    }
    handleTouchMove() {
        //当手指移动的时候
        this.ul.on("touchmove", this.handleTouchMoveCb.bind(this))
    }
    handleTouchMoveCb(e) {
        //记录手指移动的位置
        this.moveX = e.targetTouches[0].clientX;
        //左滑负值  右滑正直   计算移动时和按下时的差值  这个差值可以知道用户向哪个方向移动了
        this.distanceX = this.moveX - this.disX;
        //先关闭动画
        this.ul.css({
            transition: "none"
        })


        //当手指向右移动的时候 并且 当前的下标为0的时候
        if (this.iNow == 0 && this.distanceX > 0) {
            //将ul的left值变成 li的总个数 - 1 * 一个li的宽度 + 差值
            this.ul.css({
                left: -(this.len - 1) * this.iw + this.distanceX
            })

            //当手指向左移动的时候并且inow的值为最后一张图片的下标时
        } else if (this.iNow == this.len - 1 && this.distanceX < 0) {
            //让ul的left归0 并且加上差值
            this.ul.css({
                left: this.distanceX
            })
        } else {
            // iNow * 一个li的宽度 + 差值
            this.ul.css({
                left: -(this.iNow * this.iw) + this.distanceX
            })
        }


    }
    handleTouchEnd() {
        //当手指移开的时候
        this.ul.on("touchend", this.handleTouchEndCb.bind(this))
    }
    handleTouchEndCb(e) {
        //判断li移动的位置是否是整张图片的1/3如果超过了1/3则滑动 如果没有则回趟
        if (Math.abs(this.distanceX) > this.iw * 1 / 3) {

            //当向右滑动的时候检查iNow是否为0
            if(this.distanceX > 0 ){
                //如果为0首先要让iNow为 li的长度-2
                if(this.iNow == 0){
                    this.iNow = this.len - 2;
                    //将ul的left变成 长度-1 * 一个li的宽度
                    this.ul.css({
                        left:-this.iw * (this.len - 1)
                    })
                }else{
                    this.iNow--
                }

               this.toImg();

               //当向左滑动的时候
            }else if(this.distanceX <0){
                //如果iNow等于li总长度-1的时候 需要让iNow等于1 同时让ul的left归0
                if(this.iNow == this.len-1){
                    this.iNow = 1;
                    this.ul.css({
                        left:0
                    })
                }else{
                    
                    this.iNow++
                }

               this.toImg();
            }




            //滑动
            // if (this.distanceX > 0 && this.iNow == 0) {

            //     this.iNow = this.len - 2;
            // } else if (this.distanceX < 0 && this.iNow == this.len - 1) {

            //     this.iNow = 1;
            // } else {
            //     if (this.distanceX > 0) {
            //         if (this.iNow == 0) {
            //             this.iNow = this.len - 2;
            //             this.ul.css({
            //                 transition: "none",
            //                 left: -(this.len - 1) * this.iw
            //             })
            //         } else {
            //             this.iNow--
            //         }

            //     } else if (this.distanceX < 0) {
            //         if (this.iNow == this.len - 1) {
            //             this.iNow = 1;
            //             this.ul.css({
            //                 transition: "none",
            //                 left: 0,
            //             })
            //         } else {
            //             this.iNow++;
            //         }
            //     }
            // }

        } else {

            //回弹
            //当滑动的方向右移动的时候 并且 iNow下标为0的时候
            if (this.distanceX > 0 && this.iNow == 0) {
                //将ul的left归0
                this.ul.css({
                    left: 0
                })

                //当滑动向左滑动的时候并且iNow的下标为li的总长度-1时
            } else if (this.distanceX < 0 && this.iNow == this.len - 1) {
                //将ul的left变成总长度-1*一个的宽度
                this.ul.css({
                    left: -(this.len - 1) * this.iw
                })
            } else {
                //原先在哪个位置现在还是在哪个位置
                this.ul.css({
                    left: -(this.iNow) * this.iw
                })
            }
        }

        setTimeout(() => {
            this.toImg();
            this.autoplay();
        })
    }
    autoplay() {
        this.timer = setInterval(() => {
            if (this.iNow == this.len - 1) {
                this.iNow = 1;
                this.ul.css({
                    transition: "none",
                    left: 0,
                })
            } else {
                this.iNow++;
            }

            setTimeout(() => {
                this.toImg();
            })
        }, 3000)
    }
    toImg() {
        // this.ul[0].style.transition = "left .3s ease-in-out";
        // this.ul[0].style.left = -this.iNow * this.iw + 'px';

        this.ul.css({
            transition: "left .3s ease-in-out",
            left: -this.iNow * this.iw
        })
    }

}


