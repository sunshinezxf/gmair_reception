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

export const util = {
    is_weixin, load_script, format_pm2_5
}