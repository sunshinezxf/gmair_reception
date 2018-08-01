function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (new String(ua.match(/MicroMessenger/i)) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function load_script(url, method) {
    let node = document.createElement('script');
    node.type = 'text/javascript';
    if (node.readyState) { // IE
        node.onreadystatechange = function() {
            if (node.readyState =='loaded' || node.readyState ==='complete') {
            node.onreadystatechange = null;
            method();
          }
        };
      } else { // Others
        node.onload = method;
      }
    node.src = url;
    document.getElementsByTagName('head')[0].appendChild(node);
}

function format_pm2_5(value) {
    if(value < 10) {
       return '00' +  value.toString();
    }
    if(value < 100) {
        return '0' + value.toString();
    }
    return value.toString();
}

function tell_pm2_5_desc(value) {
    if (value >= 0 && value <= 35) {
        return '优';
    }
    if (value > 35 && value <= 75) {
        return '良';
    }
    if(value > 75 && value <= 115) {
        return '轻度独然';
    }
    if(value > 115 && value <= 150) {
        return '中度污染';
    }
    if(value > 150 && value <= 250) {
        return '重度污染';
    }
    return '严重污染';
}

export const util = {
    is_weixin, load_script, format_pm2_5, tell_pm2_5_desc
}