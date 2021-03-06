﻿var beop = beop || {};
beop.constant = {
    project_img_path: '/static/images/project_img/',
    project_default_img: 'default.jpg',
    BEOP_IMG_HOST: 'https://images.smartbeop.com',
    OSS_PROJECT_IMG_PATH: '/custom/project_img/'
};
AppConfig={
    projectTimeFormat:0,
}
// 生成 object id - 24 位
var ObjectId = function () {
    // 前 13 位，unix 时间戳
    var timestamp = new Date().valueOf();
    // 中间 3 位，用户id，不足补 0，超过从前面截断
    var userId = ('000' + ((window.AppConfig && window.AppConfig.userId) || '000')).slice(-3);
    // 最后 8 位，随机十六进制数
    var hex8 = ('00000000' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16)).slice(-8);

    return timestamp + userId + hex8;
};


(function (exports) {
    exports.checkClusterRedirectionAndGo = function (webApiResult) {
        if (webApiResult && webApiResult.goToCluster) {
            msg = I18n.resource.observer.cluster.REDIRECT_PROMPT;
            callback = function () { location.href = "http://" + webApiResult.goToCluster; };
            alert(msg, { buttons: { "ok": { callback: callback } } });
        }
    }
}(window));

(function (exports) {
    exports.namespace = function (path) {
        var obj = window;
        path = path.split('.');

        path.forEach(function (p, i) {
            p = p.trim();
            if (i === 0 && p === 'window') return;
            obj = obj[p] = obj[p] || {};
        });

        return obj;
    };
}(window));

(function (exports) {

    /**
     * 对象混合
     * Mixin([, mixins[, mixins[, ...]]])
     * 示例：
     * Mixin({a:1}, {a:2, b:2}, {c:3})，返回 {a:2, b:2, c:3}
     */
    exports.Mixin = function ( /* mixins ... */) {
        var prototype = {};
        var methods;

        for (var i = 0, len = arguments.length; i < len; i++) {
            methods = arguments[i];
            for (var m in methods) {
                prototype[m] = methods[m];
            }
        }
        return prototype;
    };

}(window));

(function () {
    var ENUM_LEVEL = {
        LOG: 1,
        INFO: 2,
        DEBUG: 3,
        WARN: 4,
        ERROR: 5,
        EXCEPTION: 6
    };

    window.Log = {
        ENUM_LEVEL: ENUM_LEVEL,
        level: ENUM_LEVEL.WARN,
        log: function () {
            if (this.level > ENUM_LEVEL.LOG) return;
            Log._out('log', arguments);
        },
        info: function () {
            if (this.level > ENUM_LEVEL.INFO) return;
            Log._out('info', arguments);
        },
        debug: function () {
            if (this.level > ENUM_LEVEL.DEBUG) return;
            Log._out('debug', arguments);
        },
        warn: function () {
            if (this.level > ENUM_LEVEL.WARN) return;
            Log._out('warn', arguments);
        },
        error: function () {
            if (this.level > ENUM_LEVEL.ERROR) return;
            Log._out('error', arguments);
        },
        exception: function (message, exception) {
            if (this.level > ENUM_LEVEL.EXCEPTION) return;
            if (exception) {
                Log.error('Exception: ', message, exception.stack || exception);
            } else {
                Log.error('Exception: ', message);
            }
        },
        _out: function (type, args) {
            console[type].apply(console, args)
        }
    };
}());

if (!Array.toMap) {
    Array.toMap = function (arr, key) {
        var map = {};
        arr.forEach(function (row, i) {
            map[row[key]] = row;
        });
        return map;
    };
}

var FullScreenManager = (function () {
    var manager = Object.create({
        init: function () {
            var _this = this;

            $(document).off('webkitfullscreenchange');
            $(document).on('webkitfullscreenchange', function () {
                var isFullScreen = !!document.webkitFullscreenElement;
                if (isFullScreen) {
                    _this.onFullScreenEnter();
                } else {
                    _this.onFullScreenOut();
                }
            });
            $(document).off('mozfullscreenchange');
            $(document).on('mozfullscreenchange', function () {
                var isFullScreen = !!document.webkitFullscreenElement;
                if (isFullScreen) {
                    _this.onFullScreenEnter();
                } else {
                    _this.onFullScreenOut();
                }
            });
            $(document).off('msfullscreenchange');
            $(document).on('msfullscreenchange', function () {
                var isFullScreen = !!document.webkitFullscreenElement;
                if (isFullScreen) {
                    _this.onFullScreenEnter();
                } else {
                    _this.onFullScreenOut();
                }
            });

            if (typeof onError === 'function') {
                $(document).off('webkitfullscreenerror');
                $(document).on('webkitfullscreenerror', this.onFullScreenError);
                $(document).off('mozfullscreenerror');
                $(document).on('mozfullscreenerror', this.onFullScreenError);
                $(document).off('msfullscreenerror');
                $(document).on('msfullscreenerror', this.onFullScreenError);
            }
        },
        onFullScreenEnter: function () { },
        onFullScreenOut: function () { },
        onFullScreenError: function () { },
        // open/close full screen mode
        // note: for security concerns, this api an only works in user actions
        toggle: function () {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
    });

    manager.init();

    return manager;
}());


function StringBuilder() {
    this.data = Array("");
}
StringBuilder.prototype.append = function () {
    this.data.push(arguments[0]);
    return this;
};
StringBuilder.prototype.toString = function () {
    return this.data.join("");
};
StringBuilder.prototype.getLength = function () {
    return this.data.length;
};


//string 的format方法
//usage 1: '{0} {1} {2} {3}'.format('this', 'is', 'a', 'test') -> this is a test
//usage 2: '{0} {1} {2} {3}'.format(['this', 'is', 'a', 'test']) -> this is a test
if (!String.prototype.format) {
    String.prototype.format = function () {
        if (arguments[0] === undefined) {
            return '';
        }
        if (arguments[0].constructor === Array) {
            var args = arguments[0];
        } else {
            var args = arguments;
        }

        // var i = 0;
        // var str = this.toString();
        // while (args[i]) str = str.replace('{'+i+'}', args[i++]);
        // return str;

        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

// input: '<td>{name}</td><td>{gender}</td>'.formatEL({name: 'zhangsan', gender: 'male'});
// output: '<td>zhangsan</td><td>male</td>'
// input: '{name},{age},{address}'.formatEL({name: 'zhangsan', age: 20, address: 'shanghai', other: 'other'});
// output: 'zhangsan,20,shanghai'
// input: '{}'.formatEL({foo: 1});
// output: '{}'
// input: '{{name}}'.formatEL({name: 'zhangsan'});
// output: '{zhangsan}'
if (!String.prototype.formatEL) {
    String.prototype.formatEL = function (o, defaultVal) {
        var str = this.toString();
        if (!str || !o) return '';

        for (var p in o) {
            if (o.hasOwnProperty(p)) {
                str = str.replace(new RegExp('{' + p + '}', 'g'), o[p]);
            }
        }

        if (typeof defaultVal !== 'undefined') {
            str = str.replace(/{[^{}]*?}/g, defaultVal);
        }

        return str;
    };
}

//parse String to Date
//ex:parse '2015-02-02 08:00:00' / '2015/02/02 08:00:00' to Date type
String.prototype.toDate = function () {
    var str = this;
    // if (str.indexOf('-') > -1){
    //this = this.replace(/-/g, '/')
    if (str.search(/[a-zA-Z]/g) < 0) {
        var strDateAndTime = str.trim().replace(/\s+/g, ' ')
        var strDate = strDateAndTime.split(' ')[0]
        var strYear = '1970';
        var strMonth = '01';
        var strDay = '01';

        var strHour = '00';
        var strMin = '00';
        var strSecond = '00'
        if (strDay) {
            var arrDate = strDate.split('-')
            if (typeof arrDate[0] != 'undefined') strYear = arrDate[0];
            if (typeof arrDate[1] != 'undefined') strMonth = arrDate[1];
            if (typeof arrDate[2] != 'undefined') strDay = arrDate[2]
        }

        var strTime = strDateAndTime.split(' ')[1]
        if (strTime) {
            var arrTime = strTime.split(':');
            if (typeof arrTime[0] != 'undefined') strHour = arrTime[0];
            if (typeof arrTime[1] != 'undefined') strMin = arrTime[1];
            if (typeof arrTime[2] != 'undefined') strSecond = arrTime[2]
        }
        str = [strYear, strMonth, strDay].join('-') + ' ' + [strHour, strMin, strSecond].join(':')
    }
    return typeof moment != typeof undefined ? new Date(+moment(str)) : new Date(str);
};

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (word) {
        return new RegExp('^' + word).test(this);
    }
}

//parse timestamp to Date
Number.prototype.toDate = function () {
    return new Date(this);
};

Date.prototype.toDate = function () {
    return new Date(this)
}
toDate = function () {
    // return new (Function.prototype.bind.apply(Date,Array.prototype.concat.apply([null],arguments)))()
    if (arguments[0]) {
        if (arguments.length == 1) {
            return arguments[0].toDate();
        } else {
            return new (Function.prototype.bind.apply(Date, Array.prototype.concat.apply([null], arguments)))()
        }
    } else {
        return new Date();
    }
}
function Alert(targetElement, type, msg) {
    this.element = targetElement;
    this.str = new StringBuilder();
    // this.str.append('<div style="display:none;" class="alert beop-alert alert-')
    //     .append(type)
    //     .append(' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>')
    //     .append('<div class="alert-msg">' + msg + '</div>')
    //     .append('</div>');
    // this.$alert = $(this.str.toString());
    if (type == 'success') {
        this.str.append('<div data-reactroot="" class="alert beop-alert ant-notification ant-notification-topRight" role="alert"><span><div class="ant-notification-notice ant-notification-notice-closable"><div class="ant-notification-notice-content"><div class="ant-notification-notice-with-icon"><i class="anticon anticon-cross-circle-o ant-notification-notice-icon ant-notification-notice-icon-success iconfont icon-queding"></i><div class="ant-notification-notice-message">Tips:</div><div class="ant-notification-notice-description">' + msg + '</div></div></div><button type="button" class="close ant-notification-notice-close" data-dismiss="alert" aria-label="Close" tabindex="0"><span aria-hidden="true">×</span></button></div></span></div>');
    } else {
        this.str.append('<div data-reactroot="" class="alert beop-alert ant-notification ant-notification-topRight" role="alert"><span><div class="ant-notification-notice ant-notification-notice-closable"><div class="ant-notification-notice-content"><div class="ant-notification-notice-with-icon"><i class="anticon anticon-cross-circle-o ant-notification-notice-icon ant-notification-notice-icon-error iconfont icon-cuowu1"></i><div class="ant-notification-notice-message">Tips:</div><div class="ant-notification-notice-description">' + msg + '</div></div></div><button type="button" class="close ant-notification-notice-close" data-dismiss="alert" aria-label="Close" tabindex="0"><span aria-hidden="true">×</span></button></div></span></div>');
    }
    this.$alert = $(this.str.toString());
}

Alert.danger = function (targetElement, msg) {
    return new Alert(targetElement, Alert.type.danger, msg);
};

Alert.warning = function (targetElement, msg) {
    return new Alert(targetElement, Alert.type.warning, msg);
};

Alert.success = function (targetElement, msg) {
    return new Alert(targetElement, Alert.type.success, msg);
};

Alert.info = function (targetElement, msg) {
    return new Alert(targetElement, Alert.type.info, msg);
};

Alert.closeAll = function () {
    $('.beop-alert').remove();
};

Alert.type = {
    danger: 'danger',
    warning: 'warning',
    success: 'success',
    info: 'info'
};

Alert.prototype.show = function (duration) {
    var _this = this;
    Alert.closeAll();
    if (duration) {
        duration = duration + 510;//动画0.5s+timeout0.01s
        setTimeout(function () {
            _this.close();
        }, duration);
    }
    $(this.element).append(this.$alert);
    //this.$alert.slideDown(500);
    setTimeout(function () {
        _this.$alert.addClass('anima-show');
    }, 10)
    return this;
};
Alert.prototype.close = function () {
    var _this = this;
    this.$alert.slideUp(500, function () {
        _this.$alert.remove();
        _this = null;
    });
    if (_this.onClosed) {
        _this.onClosed();
    }
};

Alert.prototype.setMessage = function (msg) {
    if (!msg) {
        return false
    }
    this.$alert.find('.alert-msg').text(msg);

};

Alert.prototype.setStyle = function (style) {
    if (style && typeof style !== 'string') {
        this.$alert.css(style);
    }
    return this;
};

Alert.prototype.showAtTop = function (duration) {
    this.setStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        width: '30%',
        textAlign: 'center',
        zIndex: 10000
    });
    if (!duration) {
        duration = 2000;
    }
    this.show(duration);
};

function showDialog(url) {
    return WebAPI.get(url).done(function (resultHtml) {
        $("#dialogContent").html(resultHtml);
        $('#dialogModal').modal({});
    });
}


function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}

//对Date的扩展，将 Date 转化为指定格式的String       
//月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符       
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)       
//eg:       
//(new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423       
//(new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04       
//(new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04       
//(new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04       
//(new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18       
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "S": this.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

Date.prototype.timeFormat = function (format, type, language, option) {
    var date = this;
    if (format && (typeof format == 'string' || typeof format == 'object')) {
        if (typeof format == 'object' && (!format.separators || !format.parts)) {
            format = 'yyyy-mm-dd hh:ii:ss';
        }
    } else {
        format = 'yyyy-mm-dd hh:ii:ss';
    }
    if (arguments.length >= 2) {
        var paramArr = (function (arrayish) {
            return [].slice.call(arrayish);
        })(arguments);
        paramArr.shift();
        type = language = option = null;
        paramArr.forEach(function (it, i) {
            if (typeof it == 'string') {
                language = it;
            } else if (typeof it == 'number') {
                type = it;
            } else if (typeof it == 'object') {
                option = it;
            }
        });
    }
    var isReturnNull = false;
    if (option) {
        for (var k in option) {
            if (k == 'isReturnNull') {
                isReturnNull = option[k];
            }
        }
    }
    if (date == 'Invalid Date') {
        console.warn("Invalid date.");
        if (isReturnNull) {
            return '';
        } else {
            return date.toString();
        }
    }
    var DATES = {
        en: {
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "daysShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            "daysMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "meridiem": ["am", "pm"]
        }
    };
    language = language ? (DATES[language] ? language : 'en') : 'en';
    var formatObj = (function (formatStr) {
        if (typeof formatStr == 'object') {
            return formatStr;
        }
        if (type) {
            formatStr = timeFormatChange(formatStr, type);
        }
        var reg = /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
        var separators = formatStr.replace(reg, '\0').split('\0');
        var parts = formatStr.match(reg);
        if (!separators || !separators.length || !parts || parts.length == 0) {
            throw new Error("Invalid date format.");
        }
        return { separators: separators, parts: parts };
    })(format);

    var val = {
        // year
        yy: date.getFullYear().toString().substring(2),
        yyyy: date.getFullYear(),
        // month
        m: date.getMonth() + 1,
        M: DATES[language].monthsShort[date.getMonth()],
        MM: DATES[language].months[date.getMonth()],
        // day
        d: date.getDate(),
        D: DATES[language].daysShort[date.getDay()],
        DD: DATES[language].days[date.getDay()],
        p: (DATES[language].meridiem.length == 2 ? DATES[language].meridiem[date.getHours() < 12 ? 0 : 1] : ''),
        // hour
        h: date.getHours(),
        // minute
        i: date.getMinutes(),
        // second
        s: date.getSeconds()
    };

    if (DATES[language].meridiem.length == 2) {
        val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
    } else {
        val.H = val.h;
    }
    val.HH = (val.H < 10 ? '0' : '') + val.H;
    val.P = val.p.toUpperCase();
    val.hh = (val.h < 10 ? '0' : '') + val.h;
    val.ii = (val.i < 10 ? '0' : '') + val.i;
    val.ss = (val.s < 10 ? '0' : '') + val.s;
    val.dd = (val.d < 10 ? '0' : '') + val.d;
    val.mm = (val.m < 10 ? '0' : '') + val.m;

    var finTime = '';
    for (var i = 0, len = formatObj.separators.length; i < len; i++) {
        finTime += formatObj.separators[i] + (formatObj.parts[i] ? val[formatObj.parts[i]] : '');
    }
    return finTime;
};

var DateUtil = (function () {
    var dateLocale = {
        month: {
            en: {
                month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            zh: {
                month_names: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                month_names_short: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        }
    };

    function getWeekNumber(d) {
        d = new Date(+d);
        d.setHours(0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        var yearStart = new Date(d.getFullYear(), 0, 1);
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return [d.getFullYear(), weekNo];
    }

    function getLastWeekNumberOf(y, w) {
        w -= 1;
        if (w === 0) {
            y = y - 1;
            w = 52;
        }
        return [y, w];
    }

    function getNextWeekNumberOf(y, w) {
        w += 1;
        if (w === 53) {
            y += 1;
            w = 1;
        }
        return [y, w];
    }

    function isLeapYear(y) {
        if (Object.prototype.toString.call(y) === '[object Date]') {
            y = y.getFullYear();
        }
        return ((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0);
    }

    function daysInMonth(dt) {
        var m = dt.getMonth();
        if (m === 1) {
            return isLeapYear(dt) ? 29 : 28;
        }
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
    }

    function getFirstDayOfWeek(year, week) {
        var d = new Date(year, 0, 1),
            offset = d.getTimezoneOffset();
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));

        d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000 *
            (week + (year == d.getFullYear() ? -1 : 0)));

        d.setTime(d.getTime() +
            (d.getTimezoneOffset() - offset) * 60 * 1000);

        d.setDate(d.getDate() - 3);

        return d;
    }

    function getDateRangeOnWeekNumber(year, week) {
        if (!year || !week) {
            return;
        }
        var firstDay = getFirstDayOfWeek(year, week),
            lastDay = new Date(firstDay);
        lastDay.setDate(firstDay.getDate() + 6);
        return [firstDay, lastDay];
    }

    function getMonthName(index, language) {
        var monthList = language && language in dateLocale.month ? dateLocale.month[language].month_names : dateLocale.month['en'].month_names;
        return monthList[index];
    }

    function getMonthNameShort(index, language) {
        var monthList = language && language in dateLocale.month ? dateLocale.month[language].month_names_short : dateLocale.month['en'].month_names_short;
        return monthList[index];
    }

    function getLastMonth(currentMonth) {
        if (!currentMonth) {
            currentMonth = new Date().getMonth() + 1;
        }
        if (currentMonth === 1) {
            return 12;
        } else {
            return currentMonth - 1;
        }
    }

    function getNextMonth(currentMonth) {
        if (!currentMonth) {
            currentMonth = new Date().getMonth() + 1;
        }
        if (currentMonth === 12) {
            return 1;
        } else {
            return currentMonth + 1;
        }
    }

    /**
     * get the relative date info from date2 according to date1
     * TESTS:
     * TEST_1
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-05-04 14:41:57'))
     * output: "4 days ago"
     * TEST_2
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-05-08 15:41:57'))
     * output: "21 minutes ago"
     * TEST_3
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2015-04-04 14:41:57'))
     * output: "34 days ago"
     * TEST_4
     * DateUtil.getRelativeDateInfo(new Date('2015-05-08 16:03:25'), new Date('2014-05-04 14:41:57'))
     * output: "1 year ago"
     */
    function getRelativeDateInfo(date1, date2) {
        var now = new Date();
        var lang = I18n.type;
        var value1, value2, ts, info;

        // deal with all empty
        if (!date1 && !date2) return '';

        value1 = (date1 || now).valueOf();
        value2 = (date2 || now).valueOf();

        // do Math.abs, and turn millisecond to second
        ts = Math.floor(Math.abs(value1 - value2) / 1000);

        switch (true) {
            // seconds level
            // will show "n second(s) ago/later"
            case ts < 60:
                info = ts + (ts === 1 ? ' second' : ' seconds');
                break;
            // minutes level
            // will show "n minute(s) ago/later"
            case ts < 3600 /*60 * 60*/:
                ts = Math.floor(ts / 60);
                info = ts + (ts === 1 ? ' minute' : ' minutes');
                break;
            // hours level
            // will show "n hour(s) ago/later"
            case ts < 86400 /*60 * 60 * 24*/:
                ts = Math.floor(ts / (3600 /*60 * 60*/));
                info = ts + (ts === 1 ? ' hour' : ' hours');
                break;
            // days level
            // will show "n day(s) ago/later"
            case ts < 31536000 /*60 * 60 * 24 * 365*/:
                ts = Math.floor(ts / (86400 /*60 * 60 * 24*/));
                info = ts + (ts === 1 ? ' day' : ' days');
                break;
            // years level
            // will show "n year(s) ago/later"
            default:
                ts = Math.floor(ts / (31536000 /*60 * 60 * 24 * 365*/));
                info = ts + (ts === 1 ? ' year' : ' years');
                break;
        }
        info += value1 > value2 ? ' ago' : ' later';
        if (lang === 'zh') {
            info = info.replace(/\s(seconds?|minutes?|hours?|days?|years?)\s(ago|later)$/, function ($0, $1, $2) {
                var rs = '';
                if ($1.indexOf('second') > -1) rs += '秒';
                if ($1.indexOf('minute') > -1) rs += '分钟';
                if ($1.indexOf('hour') > -1) rs += '小时';
                if ($1.indexOf('day') > -1) rs += '天';
                if ($1.indexOf('year') > -1) rs += '年';
                if ($2 === 'ago') rs += '前';
                if ($2 === 'later') rs += '后';
                return rs;
            });
        }
        return info;
    }

    return {
        getWeekNumber: getWeekNumber,
        isLeapYear: isLeapYear,
        daysInMonth: daysInMonth,
        getLastWeekNumberOf: getLastWeekNumberOf,
        getNextWeekNumberOf: getNextWeekNumberOf,
        getDateRangeOnWeekNumber: getDateRangeOnWeekNumber,
        getFirstDayOfWeek: getFirstDayOfWeek,
        getMonthName: getMonthName,
        getMonthNameShort: getMonthNameShort,
        getLastMonth: getLastMonth,
        getNextMonth: getNextMonth,
        getRelativeDateInfo: getRelativeDateInfo,
        DATA_FORMAT: {
            FULL_DATETIME: 'yyyy-mm-dd hh:ii:ss',
            FULL_DATETIME_CHANGE: 'yyyy-MM-dd HH:mm:ss',
            FULL_DATETIME_ALL_SEC_CHANGE: 'yyyy-MM-dd 00:00:00',
            FULL_DATETIME_ZERO_SEC_CHANGE: 'yyyy-MM-dd HH:mm:00',
            FULL_DATETIME_NO_SEC_CHANGE: 'yyyy-MM-dd HH:mm',
            FULL_DATETIME_ZERO_SEC: 'yyyy-mm-dd hh:ii:00',
            FULL_DATETIME_HH_00_00: 'yyyy-mm-dd hh:00:00',
            FULL_DATETIME_00_00_00: 'yyyy-mm-dd 00:00:00',
            FULL_DATETIME_NO_SEC: 'yyyy-mm-dd hh:ii',
            FULL_DATETIME_HH_00: 'yyyy-mm-dd hh:00',
            FULL_DATETIME_00_00: 'yyyy-mm-dd 00:00',
            FULL_DATE: 'yyyy-mm-dd',
            TIME: 'hh:ii:ss',
            TIME_HOUR_MINUTE: 'hh:ii',
            TIME_ZERO_SEC: 'hh:ii:00'
        }
    }
})();
var StringUtil = (function () {
    var HTML_ENTITIES = {
        '&': '&amp;',
        '>': '&gt;',
        '<': '&lt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#x60;'
    },
        HTML_ENTITIES_INVERT = invert(HTML_ENTITIES);

    function invert(obj) {
        var result = {},
            keys = Object.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    }

    function padLeft(oldStr, padNum, padStr) {
        if (!padStr) {
            return oldStr;
        }
        return new Array(padNum - String(oldStr).length + 1).join(padStr) + oldStr;
    }

    function htmlEscape(text) {
        if (!text) {
            return text;
        }
        var source = '(?:' + Object.keys(HTML_ENTITIES).join('|') + ')',
            replaceRegexp = new RegExp(source, 'g');
        return text.replace(replaceRegexp, function (character) {
            return HTML_ENTITIES[character];
        });
    }

    function htmlUnEscape(text) {
        if (!text) {
            return text;
        }
        var source = '(?:' + Object.keys(HTML_ENTITIES_INVERT).join('|') + ')',
            replaceRegexp = new RegExp(source, 'g');
        return text.replace(replaceRegexp, function (character) {
            return HTML_ENTITIES_INVERT[character];
        });
    }

    var getI18nProjectName = function (project) {
        if (!I18n || !project) {
            return '';
        }
        var result = '';
        switch (I18n.type) {
            case 'en':
                {
                    result = project.name_english;
                    break;
                }
            case 'zh':
                {
                    result = project.name_cn;
                    break;
                }
            default:
                {
                    result = project.name_english;
                }
        }
        return result || '';
    };

    return {
        padLeft: padLeft,
        htmlEscape: htmlEscape,
        htmlUnEscape: htmlUnEscape,
        getI18nProjectName: getI18nProjectName
    }
})();
var BEOPUtil = (function () {

    var jsType = {
        function: typeof $.noop,
        number: typeof 0,
        string: typeof '',
        undefined: typeof undefined
    };

    var projectImgPath = beop.constant.project_img_path;
    var setRelativePosition = function ($obj, $target, topOffset, leftOffset) { //$obj为比较对象，$target为浮动窗口对象
        $target.css({
            "left": $obj.offset().left + $obj.width() + (leftOffset || 5),
            "top": $obj.offset().top + (topOffset || 10)
        });
    };

    var projectDefaultImgPath = projectImgPath + beop.constant.project_default_img;
    var getProjectImgPath = function (project) {
        if (project) {
            return project.pic ? projectImgPath + project.pic : projectDefaultImgPath;
        }
    };
    var getProjectFromAppConfig = function (projectId) {
        for (var m = 0, len = AppConfig.projectList.length; m < len; m++) {
            if (AppConfig.projectList[m].id == projectId) {
                return AppConfig.projectList[m];
            }
        }
    };

    function getFunctionName(func) {
        if (!func || typeof func != jsType.function) {
            return '';
        }
        var ret = func.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret;
    }

    function isUndefined(obj) {
        return typeof obj === jsType.undefined;
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    /***
     * 处理计算点的代码内容
     * @param content
     */
    function logicContentHandle(content) {
        if (content) {
            //将tab换成4个空格,防止代码中tab和空格混用的情况
            content = content.replace(/\t/g, '    ')
        }
        return content;
    }


    function copyToClipboard(text, valueContainer) {
        var valueContainer = valueContainer ? valueContainer : document.body;
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text);

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
            valueContainer.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy"); // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                valueContainer.removeChild(textarea);
            }
        }
    }

    var projectImgType = {
        logo: 'logo.png',
        pdfCover: 'pdf_cover.jpg'
    };

    /**
     * 获取项目图片
     * @param projectId
     * @param name
     * @param extension
     * @returns {string}
     */
    function getProjectImgByType(projectId, name, extension) {
        var img = '';
        if (projectId) {
            img += projectId + '_';
        }
        img += name;
        if (extension) {
            img += '.' + extension;
        }
        return beop.constant.BEOP_IMG_HOST + beop.constant.OSS_PROJECT_IMG_PATH + img;
    }

    /**
     * 根据项目id获取项目
     * @param id
     * @returns {*}
     */
    function getProjectById(id) {
        if (!id || !AppConfig.projectList) {
            return null;
        }
        for (var i = 0; i < AppConfig.projectList.length; i++) {
            var project = AppConfig.projectList[i];
            if (project.id == id) {
                return project;
            }
        }
        return null;
    }

    /**
     * 获取数字精度个数
     * @param num
     * @returns {number}
     */
    function precision(num) {
        if (typeof num != 'number') {
            throw TypeError('非数字无法获取精度');
        }
        if (!isFinite(num)) return 0;
        var e = 1,
            p = 0;
        while (Math.round(num * e) / e !== num) {
            e *= 10;
            p++;
        }
        return p;
    }

    return {
        setRelativePosition: setRelativePosition,
        getProjectImgPath: getProjectImgPath,
        getFunctionName: getFunctionName,
        isUndefined: isUndefined,
        getCookie: getCookie,
        getProjectFromAppConfig: getProjectFromAppConfig,
        logicContentHandle: logicContentHandle,
        copyToClipboard: copyToClipboard,
        getProjectImgByType: getProjectImgByType,
        getProjectById: getProjectById,
        projectImgType: projectImgType,
        precision: precision
    }
})();


(function () {
    var beop_tmpl_cache = {};

    this.beopTmpl = function tmpl(str, data, htmlStr) {
        var fn = !/\W/.test(str) ?
            beop_tmpl_cache[str] = beop_tmpl_cache[str] ||
            tmpl(htmlStr ? htmlStr : document.getElementById(str).innerHTML) :

            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                "with(obj){p.push('" +

                str
                    .replace(/[\r\t\n]/g, " ")
                    .split(/<!/).join("\t")
                    .replace(/((^|!>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)!>/g, "',$1,'")
                    .split("\t").join("');")
                    .split(/!>/).join("p.push('")
                    .split("\r").join("\\'") +
                "');}return p.join('');");

        return data ? fn(data) : fn;
    };
})();


/* 页面折叠效果 start */
var SidebarMenuEffect = (function () {
    function SidebarMenuEffect() { }

    SidebarMenuEffect.prototype.init = function (center, left, right) {
        var _this = this;
        this.$paneCt = $(center);
        this.$leftBtn = $(center).find('#leftCt');
        this.$rightBtn = $(center).find('#rightCt');

        var container = document.getElementById('st-container'),
            buttons = Array.prototype.slice.call(document.querySelectorAll('.sideTrans')),
            refresh = function () {
                var leftCol = 0,
                    rightCol = 0,
                    centerCol = 0;
                var leftArrow = '<span class="glyphicon glyphicon-chevron-left"></span>';
                var rightArrow = '<span class="glyphicon glyphicon-chevron-right"></span>';
                if (_this.$leftBtn.length > 0) {
                    if (container.className.indexOf('st-effect-7') > 0) {
                        var prev = _this.$paneCt.prev('div')[0];
                        if (prev && prev.className.indexOf('col-') > -1) {
                            leftCol = parseInt(prev.classList[0].split('-')[2]);
                        } else {
                            leftCol = 0;
                        }
                        _this.$leftBtn.removeClass('leftCtClose').addClass('leftCtOpen').html(leftArrow);
                    } else {
                        leftCol = 0;
                        _this.$leftBtn.removeClass('leftCtOpen').addClass('leftCtClose').html(rightArrow);
                    }
                }
                if (_this.$rightBtn.length > 0) {
                    if (container.className.indexOf('st-effect-1') > 0) {
                        var next = _this.$paneCt.next('div')[0];
                        if (next && next.className.indexOf('col-') > -1) {
                            rightCol = parseInt(next.classList[0].split('-')[2]);
                        } else {
                            rightCol = 0;
                        }
                        _this.$rightBtn.removeClass('rightCtClose').addClass('rightCtOpen').html(rightArrow);
                    } else {
                        rightCol = 0;
                        _this.$rightBtn.removeClass('rightCtOpen').addClass('rightCtClose').html(leftArrow);
                    }
                }

                centerCol = 12 - leftCol - rightCol;
                _this.$paneCt.removeClass().addClass('col-sm-' + centerCol + ' st-content');
            };

        buttons.forEach(function (el, i) {
            var effect = el.getAttribute('data-effect');

            el.addEventListener('click', function (ev) {
                var target = ev.target.getAttribute('data-effect') != null ? ev.target.getAttribute('data-effect') : ev.target.parentNode.getAttribute('data-effect');
                var stCtClass = document.getElementById('st-container').className;
                if (stCtClass.indexOf(target) < 0) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.classList.add(effect);
                    setTimeout(function () {
                        if ($(container.children[0]).children('div').length == 3) {
                            container.classList.add('st-menu-open');
                        }
                        refresh();
                    }, 250);
                } else {
                    container.classList.remove(target);
                    refresh();
                }
            });
        });
    };
    return SidebarMenuEffect;
})();
/* 页面折叠效果 end */

/* 检测浏览器及系统信息 start*/
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            var width = (screen.width) ? screen.width : '';
            var height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        //browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // core version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows ME', r: /Windows ME/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
}(this));

/* 检测浏览器及系统信息 end*/

/* 获取 URL 参数 */
var getUrlParams = function () {
    var search = window.location.search.substring(1);
    var kvArr = search.split('&');
    var rs = {};

    kvArr.forEach(function (kv) {
        var arr = kv.split('=');
        if (typeof arr[1] !== 'undefined') {
            rs[arr[0]] = decodeURIComponent(arr[1]);
        }
    });

    return rs;
};

/**
 * 将表单内容提出成Object
 * @returns {{}}
 */
$.fn.serializeObject = function () {
    var obj = {};
    this.serializeArray().map(function (item) {
        if (/\[\]$/.test(item.name)) {
            if (obj[item.name]) {
                obj[item.name].push(item.value);
            } else {
                obj[item.name] = [item.value];
            }
        } else {
            obj[item.name] = item.value;
        }

    });
    return obj;
};

/**
 * 数字分隔符
 * num: 被分隔的数据
 * n: 保留小数位数的个数, n可选, 缺省时默认为0
 * 如: kIntSeparate(2000,2) ==> 2000.00
 */
function kIntSeparate(num, n) {
    var number = num.toFixed(n ? n : 0);
    var source = String(number).split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
    return source.join(".");
}

/*
 * 时间格式转换
 */
function timeFormatChange(format, type) {
    var lastStr = '';
    //处理'yyyy-mm-dd hh:ii:00' start
    var formatObj = (function (formatStr) {
        if (!formatStr || typeof formatStr == 'object') {
            return;
        }
        var reg = /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
        var separators = formatStr.replace(reg, '\0').split('\0');
        var parts = formatStr.match(reg);
        if (!separators || !separators.length || !parts || parts.length == 0) {
            return;
        }
        return { separators: separators, parts: parts };
    })(format);
    if (formatObj) {
        format = '';
        for (var i = 0, len = formatObj.separators.length - 1; i < len; i++) {
            format += formatObj.separators[i] + formatObj.parts[i];
        }
        lastStr = formatObj.separators[len];
    }
    //处理'yyyy-mm-dd hh:ii:00' end;

    var formatArr = ['yyyy-mm-dd hh:ii:ss', 'yyyy-mm-dd hh:ii', 'yyyy-mm-dd hh', 'yyyy-mm-dd', 'yyyy-mm', 'mm-dd hh:ii:ss', 'mm-dd hh:ii', 'mm-dd hh', 'mm-dd'];
    var formatChangeArr = [
        ['yyyy-mm-dd hh:ii:ss', 'yyyy-mm-dd hh:ii', 'yyyy-mm-dd hh', 'yyyy-mm-dd', 'yyyy-mm', 'mm-dd hh:ii:ss', 'mm-dd hh:ii', 'mm-dd hh', 'mm-dd'],
        ['M d, yyyy hh:ii:ss', 'M d, yyyy hh:ii', 'M d, yyyy hh', 'M d, yyyy', 'M, yyyy', 'M d hh:ii:ss', 'M d hh:ii', 'M d hh', 'M d'],
        ['dd/mm/yyyy hh:ii:ss', 'dd/mm/yyyy hh:ii', 'dd/mm/yyyy hh', 'dd/mm/yyyy', 'mm/yyyy', 'dd/mm hh:ii:ss', 'dd/mm hh:ii', 'dd/mm hh', 'dd/mm']
    ];
    if (formatArr.findIndex) {
        var index = formatArr.findIndex(function (v) {
            return v === format;
        });
    } else {
        for (var i = 0; i < formatArr.length; i++) {
            if (formatArr[i] === format) {
                var index = i;
                break;
            }
        }
    }
    type = Number(type);
    type && (type >= formatChangeArr.length) && (type = formatChangeArr.length - 1);
    if (index == -1) {
        console.log('format is not defined');
        return format + lastStr;
    } else {
        if (type === 0) {
            return formatChangeArr[0][index] + lastStr;
        }
        return formatChangeArr[type || AppConfig.projectTimeFormat || 0][index] + lastStr;
    }
}
/*
 * 时间格式化
 */
function timeFormat(time, format, language, option) {
    var date, arr, arr2;
    var sort = function (year, month, day, time) {
        year = year == undefined ? '2001' : year;
        month = month == undefined ? '01' : month;
        day = day == undefined ? '01' : day;
        time = time == undefined ? '' : (' ' + time);
        if (new Date(year + '/' + month + '/' + day + time) == 'Invalid Date') {
            return new Date(year + '-' + month + '-' + day + time);
        } else {
            return new Date(year + '/' + month + '/' + day + time);
        }
    }
    if (time instanceof Date) {
        date = time;
    } else if (typeof (time) == 'string') {
        if (/^\d{1,2}-\d{1,2}/.test(time)) {
            arr = time.split(' ');
            arr2 = arr[0].split('-');
            time = arr2[1] + '-' + arr2[0] + (arr2[2] == undefined ? '' : ('-' + arr2[2])) + (arr[1] == undefined ? '' : (' ' + arr[1]));
        }

        time = time.replace(/-/g, "/");
        arr = time.split(' ');
        arr2 = arr[0].split('/');

        if (/^\d{4}/.test(time)) {
            date = sort(arr2[0], arr2[1], arr2[2], arr[1]);
        } else if (/^\d{1,2}\/\d{4}/.test(time)) {
            date = sort(arr2[1], arr2[0], '01', arr[1]);
        } else if (/^\d{1,2}\/\d{1,2}/.test(time)) {
            date = sort(arr2[2], arr2[1], arr2[0], arr[1]);
        } else {
            date = new Date(time);
        }
    } else {
        date = new Date(time);
    }
    return date.timeFormat(format, language, option);
}

/**
 * 根据时间数组，返回格式化后的时间数组
 * @param  {Array} timeShaft 原时间数组
 * @return {Array} 格式化后的时间数组
 */
(function (exports) {
    var MINITE_1 = 60000; // 60*1000
    var MINITE_5 = 300000; // 5*60*1000
    var HOUR_1 = 3600000; // 60*60*1000
    var DAY_1 = 86400000; // 24*60*60*1000
    var DAY_365 = 31536000000; // 365*24*60*60*1000

    function _formatTimeStr(str, format) {
        var arr = str.split(' ');
        var date = arr[0].split('-');
        var time = arr[1].split(':');

        return format.replace('yyyy', date[0])
            .replace('MM', date[1])
            .replace('dd', date[2])
            .replace('HH', time[0])
            .replace('mm', time[1])
            .replace('ss', time[2]);
    }

    function _explainPattern(timeShaft) {
        // 开始时间
        var startTime = new Date(timeShaft[0]);
        // 结束时间
        var endTime = new Date(timeShaft[timeShaft.length - 1]);
        // 时间跨度
        var timeRange = endTime.valueOf() - startTime.valueOf();
        // 相邻时间的间隔
        var timeInterval = timeRange / (timeShaft.length - 1);
        // 默认的时间格式
        var pattern = 'MM-dd HH:mm';

        // m1 m5
        if (timeInterval <= MINITE_5) {
            if (timeRange <= HOUR_1) {
                pattern = 'HH:mm';
            } else if (timeRange <= DAY_1) {
                pattern = 'HH:mm';
            }
        }
        // h1
        else if (timeInterval <= HOUR_1) {
            if (timeRange <= DAY_1) {
                pattern = 'HH:mm';
            } else {
                pattern = 'MM-dd HH:mm';
            }
        }
        // d1
        else if (timeInterval <= DAY_1) {
            if (timeRange <= DAY_365) {
                pattern = 'MM-dd';
            } else {
                pattern = 'yyyy-MM-dd';
            }
        }
        // M1
        else {
            pattern = 'yyyy-MM';
        }

        return pattern;
    }

    function _explain(timeShaft) {
        pattern = getPattern(timeShaft);

        if (pattern) {
            timeShaft = timeShaft.map(function (row) {
                return _formatTimeStr(row, pattern);
            });
        }

        return timeShaft;
    }

    function _valid(params) {
        var flag = Object.prototype.toString.call(params) === '[object Array]';

        return flag && /^[\d-]{10} [\d:]{8}$/.test(params[0]);
    }

    var _getTimePattern = function (timeShaft) {
        if (!_valid(timeShaft)) {
            return;
        }

        // 如果为空或只有 1 个时间，则直接返回，不做处理
        if (timeShaft.length <= 1) {
            return;
        }

        return _explainPattern(timeShaft);
    };

    var formatTimeShaft = exports.formatTimeShaft = function (timeShaft) {
        if (!_valid(timeShaft)) {
            console.warn('function arguments is not a valid time shaft array!');
            return timeShaft;
        }

        // 如果为空或只有 1 个时间，则直接返回，不做处理
        if (timeShaft.length <= 1) {
            return timeShaft;
        }

        return _explain(timeShaft);
    };

    function _formatTimeStrByAppConfig(data) {
        var formatArr, formatStr, regularArr, language, formatObj;
        switch (AppConfig.projectTimeFormat || 0) {
            case 0:
                formatArr = ['yyyy-mm-dd'];
                regularArr = [/^[\d-]{10}$/];
                language = 'en';
                break;
            case 1:
                formatArr = ['M d, yyyy', 'M d hh:ii', 'M, yyyy', 'M, yyyy', 'M d'];
                regularArr = [/^[\d-]{10}$/, /^[\d-]{5} [\d:]{5}$/, /^[\d-]{7}$/, /^[\d-]{6}$/, /^[\d-]{5}$/];
                language = 'en';
                break;
            case 2:
                formatArr = ['dd/mm/yyyy', 'dd/mm hh:ii', 'mm/yyyy', 'mm/yyyy', 'dd/mm'];
                regularArr = [/^[\d-]{10}$/, /^[\d-]{5} [\d:]{5}$/, /^[\d-]{7}$/, /^[\d-]{6}$/, /^[\d-]{5}$/];
                language = 'en';
                break;
            default:
                formatArr = ['yyyy-mm-dd'];
                regularArr = [/^[\d-]{10}$/];
                language = 'en';
        }

        for (var i = 0, len = regularArr.length; i < len; i++) {
            if (regularArr[i].test(data)) {
                formatStr = formatArr[i];
                break;
            }
        }
        if (formatStr) {
            formatObj = (function _parseFormat(formatStr) {
                var reg = /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
                var separators = formatStr.replace(reg, '\0').split('\0');
                var parts = formatStr.match(reg);
                if (!separators || !separators.length || !parts || parts.length == 0) {
                    throw new Error("Invalid date format.");
                }
                return { separators: separators, parts: parts };
            })(formatStr);
            return {
                formatStr: formatStr,
                language: language,
                formatObj: formatObj
            };
        } else {
            return;
        }
    }

}(window));

var generateTimeOption = function (option) {
    var timeConfig = clone(option);
    (!timeConfig.timeStart) && (timeConfig.timeStart = timeConfig.startTime);
    (!timeConfig.timeEnd) && (timeConfig.timeEnd = timeConfig.endTime);
    (!timeConfig.timeFormat) && (timeConfig.timeFormat = timeConfig.format);
    var recentTime = {};
    var now = new Date();
    if (typeof option == 'string') {
        recentTime = generateRecentTime(option)
    } else if (option && option.timeRecent) {
        if (typeof option.timeRecent == 'string') {
            recentTime = generateRecentTime(option.timeRecent)
        } else if (option.timeRecent.hasOwnProperty('unit') && option.timeRecent.hasOwnProperty('val')) {
            recentTime = generateRecentTimeCustom(option.timeRecent)
        }
    }
    if (recentTime && Object.keys(recentTime).length > 0) {
        timeConfig.timeStart = recentTime.timeStart;
        timeConfig.timeEnd = recentTime.timeEnd;
        if (recentTime.format) {
            timeConfig.timeFormat = recentTime.format;
        }
    }
    switch (timeConfig.timeFormat) {
        case 'h1':
            timeConfig.timeEnd = new Date(timeConfig.timeEnd.replace(/-/g, '/')).format('yyyy-MM-dd HH:00:00');
            timeConfig.timeStart = new Date(timeConfig.timeStart.replace(/-/g, '/')).format('yyyy-MM-dd HH:00:00');
            break;
        case 'd1':
            timeConfig.timeEnd = new Date(timeConfig.timeEnd.replace(/-/g, '/')).format('yyyy-MM-dd 00:00:00');
            timeConfig.timeStart = new Date(timeConfig.timeStart.replace(/-/g, '/')).format('yyyy-MM-dd 00:00:00');
            break;
        case 'M1':
            timeConfig.timeEnd = new Date(timeConfig.timeEnd.replace(/-/g, '/')).format('yyyy-MM-01 00:00:00');
            timeConfig.timeStart = new Date(timeConfig.timeStart.replace(/-/g, '/')).format('yyyy-MM-01 00:00:00');
            break;
    }

    timeConfig.startTime = timeConfig.timeStart;
    timeConfig.endTime = timeConfig.timeEnd;
    timeConfig.format = timeConfig.timeFormat;
    return timeConfig;


    function generateRecentTime(time) {
        var startTime, endTime, format;
        switch (time) {
            case 'today':
                endTime = now.format('yyyy-MM-dd HH:mm:ss');
                startTime = new Date(now - 86400000).format('yyyy-MM-dd HH:mm:ss');
                format = 'h1';
                break;
            case 'threeDay':
                endTime = now.format('yyyy-MM-dd HH:00:00');
                startTime = new Date(now - 259200000).format('yyyy-MM-dd HH:mm:ss');
                format = 'h1';
                break;
            case 'yesterday':
                endTime = new Date(new Date().setDate(now.getDate() - 1)).format('yyyy-MM-dd 23:59:59');
                startTime = new Date(new Date().setDate(now.getDate() - 1)).format('yyyy-MM-dd 00:00:00');
                format = 'h1';
                break;
            case 'thisWeek':
                endTime = now.format('yyyy-MM-dd HH:mm:ss');
                startTime = new Date(now - 604800000).format('yyyy-MM-dd HH:mm:ss');
                format = 'd1';
                break;
            case 'lastWeek':
                endTime = new Date(now - (now.getDay()) * 86400000).format('yyyy-MM-dd HH:mm:ss');
                startTime = new Date(now - (now.getDay() + 6) * 86400000).format('yyyy-MM-dd HH:mm:ss');
                format = 'd1';
                break;
            case 'thisYear':
                endTime = now.format('yyyy-MM-dd HH:mm:ss');
                startTime = new Date(new Date().setMonth(now.getMonth() - 12)).format('yyyy-MM-dd HH:mm:ss');
                format = 'M1';
                break;
        }
        return {
            timeStart: startTime,
            timeEnd: endTime,
            format: format
        }
    }

    function generateRecentTimeCustom(time) {
        var startTime, endTime, format;
        switch (time.unit) {
            case 'hour':
                endTime = now.format('yyyy-MM-dd HH:mm:ss');
                startTime = new Date(now - 3600000 * time.val).format('yyyy-MM-dd HH:mm:ss');
                break;
            case 'day':
                endTime = now.format('yyyy-MM-dd HH:00:00');
                startTime = new Date(now - 86400000 * time.val).format('yyyy-MM-dd HH:00:00');
                break;
            case 'month':
                endTime = now.format('yyyy-MM-dd HH:00:00');
                startTime = new Date(now - 2592000000 * time.val).format('yyyy-MM-dd HH:00:00');
                break;
        }
        return {
            timeStart: startTime,
            timeEnd: endTime
        }
    }
};

var trackEvent = function (category, action, param, value) {
    if (!window._hmt) {
        window._hmt = [];
    }
    var _category = category ? category : '';
    var _action = action ? action : '';

    var _param = typeof param == 'object' ? param : {};
    var paramDict = {
        'u': AppConfig.userId,
        'p': AppConfig.projectId
    }
    Object.keys(_param).forEach(function (keys) {
        paramDict[keys] = _param[keys];
    })
    _param = [];
    Object.keys(paramDict).forEach(function (keys) {
        if (typeof paramDict[keys] == 'number') {
            _param.push(keys + '=' + paramDict[keys]);
        } else if (paramDict[keys]) {
            _param.push(keys + '=' + paramDict[keys]);
        }
    })
    _param = _param.join('&&');

    var _value = isNaN(parseInt(value)) ? parseInt(value) : AppConfig.vip;
    if (!_value) _value = 0;
    if (AppConfig.userProfile && AppConfig.userProfile.usertype && AppConfig.userProfile.usertype != "internal") {
        window._hmt.push(['_trackEvent', _category, _action, _param, _value]);
    }

}
$.fn.extend({
    'trackEvent': function () {
        var $target = $(this);
        if (!window._hmt) {
            window._hmt = [];
        }
        window._hmt.push(['_trackEvent', 'category', 'action', 'opt_label', 'opt_value']);
    }
})


function getHmtJavascript() {
    var siteId;
    switch (window.location.hostname) {
        case 'beop.rnbtech.com.hk':
            siteId = 'b79c068f77198848e22fe79758836e53';
            break;
        case 'beop6.rnbtech.com.hk':
            siteId = 'f1f6b2b9e6b64592c0b4cb5e9b8bd79e';
            break;
        case 'beopdemo.rnbtech.com.hk':
            siteId = 'ac0df98f274d9a5980a571297248d80b';
            break;
        case 'www.smartbeop.com':
            siteId = '0f5111a3b939791dde2e0d6aa01adcbc';
            break;
        case 'cn1.smartbeop.com':
            siteId = 'd5c14a15340e1440cb3af9d2cfc9a525';
            break;
        case 'cn2.smartbeop.com':
            siteId = 'c727cad25c944c59ea31b7b474a4eb47';
            break;
        case 'cn3.smartbeop.com':
            siteId = '9c50011bdd2113be338da0ce09fa832e';
            break;
        case 'us2.smartbeop.com':
            siteId = '9ae3ce9cf6129519d45f69d23ebc49c5';
            break;
        case 'beopdemo.smartbeop.com':
            siteId = 'fb795ef28027cf18ac23a34107e24c13';
            break;
        case 'cbre.smartbeop.com':
            siteId = 'dd07f4015bf72711a5657152b4a0ce89';
            break;
        case 'ikea.smartbeop.com':
            siteId = '34ee04918589b469d81958623fecf793';
            break;
        case 'huadenengyuan.smartbeop.com':
            siteId = '5cdd014a466d8ea034110ceddfe8a365';
            break;
        case 'capitaland.smartbeop.com':
            siteId = 'cd14f1b98d2f07e9a866db7edb8830b3';
            break;
        case 'pgjn.smartbeop.com':
            siteId = '35cb9232e4155dc9f0d7379e3ed8e86f';
            break;
        case 'gmdatacenter.smartbeop.com':
            siteId = '3f115bd0a3ddada8beb7c5e368529bcb';
            break;
        case 'facilitymatrix.smartbeop.com':
            siteId = 'a5543b7b3a1c5adce292bdff6c02b899';
            break;
        case 'brightdairy.smartbeop.com':
            siteId = '1366b54daf1eb508c51c65173fbbf8f1';
            break;
        case 'tricyclic.smartbeop.com':
            siteId = '91204848775697432a23b6e6b771f097';
            break;
        case 'industry.smartbeop.com':
            siteId = '3b47d9601b179454bce93fb979a5fcfb';
            break;
        case 'industrytech.smartbeop.com':
            siteId = '539e07c4f5cb5d877f4dd01c819fd8ed';
            break;
        case 'preciseair.smartbeop.com':
            siteId = 'af46f2e15c265050bb68e766b78f406c';
            break;
        case 'industrytech.rnbadopt.com':
            siteId = 'e748b555dfe38a9d126def2ddeae1da1';
            break;
        default:
            siteId = '';
            break;
    }
    (function () {
        if (siteId) {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?" + siteId;
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
            hm.onload = function () {
                if (!_hmt) return;
                if (AppConfig && AppConfig.projectId) {
                    // trackEvent('项目访问', 'PROJECT_VISIT');
                    //百度统计start
                    let list = sessionStorage.getItem('projectIdList');
                    if (!list || list.length == 0) {
                        list = '';
                    }
                    let hasProject = false;
                    let listArr = list.split(',')
                    listArr.forEach((item, i) => {
                        if (AppConfig.projectId == Number(item) && AppConfig.projectId) {
                            hasProject = true
                        }
                        if (item == '') { listArr.splice(i, 1) }
                    });
                    if (!hasProject && AppConfig.projectId) {
                        listArr.push(AppConfig.projectId);
                        trackEvent('项目访问', 'PROJECT_VISIT');
                        sessionStorage.setItem('projectIdList', listArr.join(','))
                    }
                    //百度统计END
                }
            }
        }
    })();
}
// var ipUtil = (function(){
//     var ip;
//     $.getScript(location.protocol + '//pv.sohu.com/cityjson?ie=utf-8').done(function(result){
//         ip = returnCitySN
//     })
//     // var queryScript = new XMLHttpRequest();
//     // queryScript.open('GET', location.protocol + '//pv.sohu.com/cityjson?ie=utf-8');
//     // queryScript.onload = function(){
//     //     console.log(arguments)
//     // }
//     // queryScript.send()

//     // getIp(function(ip){
//     //     console.log(ip)
//     // })
//     return {
//         getIp:getIp
//     }
// })()

var codeEncrypt = function (code, prefix, suffix) {
    let str = '';
    prefix = prefix || 'beop';
    suffix = suffix || '';
    code = prefix + code + suffix;
    for (let i = 0; i < code.length; i++) {
        str += String.fromCharCode(code[i].charCodeAt() + i)
    };
    return str;
}