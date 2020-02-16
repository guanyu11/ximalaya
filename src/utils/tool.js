//节流工具

export const throttle = (function () {
    var currentTime = 0;
    var timer = null;
    return function (callback, timeout) {
        timeout = timeout || 300;
        clearTimeout(timer);
        var lastTime = new Date().getTime();
        if (lastTime - currentTime > timeout) {
            callback();
            currentTime = lastTime;
      
        } else {
            timer = setTimeout(() => {
                callback();
            }, timeout)
        }
    }
})()