function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (new String(ua.match(/MicroMessenger/i)) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

export const util = {
    is_weixin
}