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
    if (value === undefined || value === null || value === '')
        return '000';
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
        return '轻度污染';
    }
    if(value > 115 && value <= 150) {
        return '中度污染';
    }
    if(value > 150 && value <= 250) {
        return '重度污染';
    }
    return '严重污染';
}

function tell_pm2_5_color(value) {
    if (value >= 0 && value <= 35) {
        return '#00CC66';
    }
    if (value > 35 && value <= 75) {
        return '#CC9900';
    }
    if(value > 75 && value <= 115) {
        return '#FF9966';
    }
    if(value > 115 && value <= 150) {
        return '#FF0066';
    }
    if(value > 150 && value <= 250) {
        return '#990099';
    }
    return '#996666';
}

function tell_mode(value, mode_list) {
    return mode_list[value].operator;
}

function tell_heat_value(heat, heat_mode_list) {
    for(let i = 0; i < heat_mode_list.length; i ++) {
        if(heat == heat_mode_list[i].operator)
            return i;
    }
    return -1;
}

function format(timestamp) {
    let date = new Date(timestamp - 1000*60*60*24);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let M = date.getMonth() + 1;
    let D = date.getDate();
    return M + "月" + D + "日";
}

export const util = {
    is_weixin, load_script, format_pm2_5, tell_mode, tell_heat_value, tell_pm2_5_desc, format,tell_pm2_5_color
}
