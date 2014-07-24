var module = (function () {
    var module = {};
    var animationinProgress;    
    var anim = function (el, duration, callback) {
        if (animationinProgress) {
            return;
        }
        var start = window.getComputedStyle(el);
        start = start.getPropertyValue('opacity');
        start = parseFloat(start);
       
        var finish;
        if (Math.abs(start) < 0.01) {
            finish = 1;
            start = 0;
        } else {
            start = 1;
            finish = 0;
        }
        var step = (start - finish) / duration * 10;
        animationinProgress = true;
        var f = setInterval(function () {
            if (Math.abs(start - finish) > 0.01) {
                start = start - step;
                el.style.opacity =  start;
            } else {
            clearInterval(f);
               animationinProgress = false;
                if (typeof callback === "function") {
                callback();
                }
            }
        }, 10);
    }
    module.anim = anim;
    return module;
})();
