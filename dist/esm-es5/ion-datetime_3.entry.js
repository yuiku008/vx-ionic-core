import { __awaiter, __generator } from "tslib";
import { r as registerInstance, e as createEvent, h, H as Host, i as getElement } from './index-92848855.js';
import { b as getIonMode } from './ionic-global-23e7365a.js';
import { c as clamp, f as findItemLabel, a as renderHiddenInput } from './helpers-5c745fbd.js';
import { c as createAnimation } from './animation-a635a2fc.js';
import './hardware-back-button-7b6ede21.js';
import { p as pickerController, B as BACKDROP, i as isCancel, e as prepareOverlay, d as present, f as dismiss, g as eventMethod, s as safeCall } from './overlays-c5d9d644.js';
import { b as hapticSelectionChanged, h as hapticSelectionEnd, a as hapticSelectionStart } from './haptic-7b8ba70a.js';
import { h as hostContext, g as getClassMap } from './theme-5641d27f.js';
/**
 * Gets a date value given a format
 * Defaults to the current date if
 * no date given
 */
var getDateValue = function (date, format) {
    var getValue = getValueFromFormat(date, format);
    if (getValue !== undefined) {
        if (format === FORMAT_A || format === FORMAT_a) {
            date.ampm = getValue;
        }
        return getValue;
    }
    var defaultDate = parseDate(new Date().toISOString());
    return getValueFromFormat(defaultDate, format);
};
var renderDatetime = function (template, value, locale) {
    if (value === undefined) {
        return undefined;
    }
    var tokens = [];
    var hasText = false;
    FORMAT_KEYS.forEach(function (format, index) {
        if (template.indexOf(format.f) > -1) {
            var token = '{' + index + '}';
            var text = renderTextFormat(format.f, value[format.k], value, locale);
            if (!hasText && text !== undefined && value[format.k] != null) {
                hasText = true;
            }
            tokens.push(token, text || '');
            template = template.replace(format.f, token);
        }
    });
    if (!hasText) {
        return undefined;
    }
    for (var i = 0; i < tokens.length; i += 2) {
        template = template.replace(tokens[i], tokens[i + 1]);
    }
    return template;
};
var renderTextFormat = function (format, value, date, locale) {
    if ((format === FORMAT_DDDD || format === FORMAT_DDD)) {
        try {
            value = (new Date(date.year, date.month - 1, date.day)).getDay();
            if (format === FORMAT_DDDD) {
                return (locale.dayNames ? locale.dayNames : DAY_NAMES)[value];
            }
            return (locale.dayShortNames ? locale.dayShortNames : DAY_SHORT_NAMES)[value];
        }
        catch (e) {
            // ignore
        }
        return undefined;
    }
    if (format === FORMAT_A) {
        return date !== undefined && date.hour !== undefined
            ? (date.hour < 12 ? 'AM' : 'PM')
            : value ? value.toUpperCase() : '';
    }
    if (format === FORMAT_a) {
        return date !== undefined && date.hour !== undefined
            ? (date.hour < 12 ? 'am' : 'pm')
            : value || '';
    }
    if (value == null) {
        return '';
    }
    if (format === FORMAT_YY || format === FORMAT_MM ||
        format === FORMAT_DD || format === FORMAT_HH ||
        format === FORMAT_mm || format === FORMAT_ss) {
        return twoDigit(value);
    }
    if (format === FORMAT_YYYY) {
        return fourDigit(value);
    }
    if (format === FORMAT_MMMM) {
        return (locale.monthNames ? locale.monthNames : MONTH_NAMES)[value - 1];
    }
    if (format === FORMAT_MMM) {
        return (locale.monthShortNames ? locale.monthShortNames : MONTH_SHORT_NAMES)[value - 1];
    }
    if (format === FORMAT_hh || format === FORMAT_h) {
        if (value === 0) {
            return '12';
        }
        if (value > 12) {
            value -= 12;
        }
        if (format === FORMAT_hh && value < 10) {
            return ('0' + value);
        }
    }
    return value.toString();
};
var dateValueRange = function (format, min, max) {
    var opts = [];
    if (format === FORMAT_YYYY || format === FORMAT_YY) {
        // year
        if (max.year === undefined || min.year === undefined) {
            throw new Error('min and max year is undefined');
        }
        for (var i = max.year; i >= min.year; i--) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_MMMM || format === FORMAT_MMM ||
        format === FORMAT_MM || format === FORMAT_M ||
        format === FORMAT_hh || format === FORMAT_h) {
        // month or 12-hour
        for (var i = 1; i < 13; i++) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_DDDD || format === FORMAT_DDD ||
        format === FORMAT_DD || format === FORMAT_D) {
        // day
        for (var i = 1; i < 32; i++) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_HH || format === FORMAT_H) {
        // 24-hour
        for (var i = 0; i < 24; i++) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_mm || format === FORMAT_m) {
        // minutes
        for (var i = 0; i < 60; i++) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_ss || format === FORMAT_s) {
        // seconds
        for (var i = 0; i < 60; i++) {
            opts.push(i);
        }
    }
    else if (format === FORMAT_A || format === FORMAT_a) {
        // AM/PM
        opts.push('am', 'pm');
    }
    return opts;
};
var dateSortValue = function (year, month, day, hour, minute) {
    if (hour === void 0) { hour = 0; }
    if (minute === void 0) { minute = 0; }
    return parseInt("1" + fourDigit(year) + twoDigit(month) + twoDigit(day) + twoDigit(hour) + twoDigit(minute), 10);
};
var dateDataSortValue = function (data) {
    return dateSortValue(data.year, data.month, data.day, data.hour, data.minute);
};
var daysInMonth = function (month, year) {
    return (month === 4 || month === 6 || month === 9 || month === 11) ? 30 : (month === 2) ? isLeapYear(year) ? 29 : 28 : 31;
};
var isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};
var ISO_8601_REGEXP = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
var TIME_REGEXP = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
var parseDate = function (val) {
    // manually parse IS0 cuz Date.parse cannot be trusted
    // ISO 8601 format: 1994-12-15T13:47:20Z
    var parse = null;
    if (val != null && val !== '') {
        // try parsing for just time first, HH:MM
        parse = TIME_REGEXP.exec(val);
        if (parse) {
            // adjust the array so it fits nicely with the datetime parse
            parse.unshift(undefined, undefined);
            parse[2] = parse[3] = undefined;
        }
        else {
            // try parsing for full ISO datetime
            parse = ISO_8601_REGEXP.exec(val);
        }
    }
    if (parse === null) {
        // wasn't able to parse the ISO datetime
        return undefined;
    }
    // ensure all the parse values exist with at least 0
    for (var i = 1; i < 8; i++) {
        parse[i] = parse[i] !== undefined ? parseInt(parse[i], 10) : undefined;
    }
    var tzOffset = 0;
    if (parse[9] && parse[10]) {
        // hours
        tzOffset = parseInt(parse[10], 10) * 60;
        if (parse[11]) {
            // minutes
            tzOffset += parseInt(parse[11], 10);
        }
        if (parse[9] === '-') {
            // + or -
            tzOffset *= -1;
        }
    }
    return {
        year: parse[1],
        month: parse[2],
        day: parse[3],
        hour: parse[4],
        minute: parse[5],
        second: parse[6],
        millisecond: parse[7],
        tzOffset: tzOffset,
    };
};
/**
 * Converts a valid UTC datetime string to JS Date time object.
 * By default uses the users local timezone, but an optional
 * timezone can be provided.
 * Note: This is not meant for time strings
 * such as "01:47"
 */
var getDateTime = function (dateString, timeZone) {
    if (dateString === void 0) { dateString = ''; }
    if (timeZone === void 0) { timeZone = ''; }
    /**
     * If user passed in undefined
     * or null, convert it to the
     * empty string since the rest
     * of this functions expects
     * a string
     */
    if (dateString === undefined || dateString === null) {
        dateString = '';
    }
    /**
     * Ensures that YYYY-MM-DD, YYYY-MM,
     * YYYY-DD, YYYY, etc does not get affected
     * by timezones and stays on the day/month
     * that the user provided
     */
    if (dateString.length === 10 ||
        dateString.length === 7 ||
        dateString.length === 4) {
        dateString += ' ';
    }
    var date = (typeof dateString === 'string' && dateString.length > 0) ? new Date(dateString) : new Date();
    var localDateTime = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    if (timeZone && timeZone.length > 0) {
        return new Date(date.getTime() - getTimezoneOffset(localDateTime, timeZone));
    }
    return localDateTime;
};
var getTimezoneOffset = function (localDate, timeZone) {
    var utcDateTime = new Date(localDate.toLocaleString('en-US', { timeZone: 'utc' }));
    var tzDateTime = new Date(localDate.toLocaleString('en-US', { timeZone: timeZone }));
    return utcDateTime.getTime() - tzDateTime.getTime();
};
var updateDate = function (existingData, newData, displayTimezone) {
    if (!newData || typeof newData === 'string') {
        var dateTime = getDateTime(newData, displayTimezone);
        if (!Number.isNaN(dateTime.getTime())) {
            newData = dateTime.toISOString();
        }
    }
    if (newData && newData !== '') {
        if (typeof newData === 'string') {
            // new date is a string, and hopefully in the ISO format
            // convert it to our DatetimeData if a valid ISO
            newData = parseDate(newData);
            if (newData) {
                // successfully parsed the ISO string to our DatetimeData
                Object.assign(existingData, newData);
                return true;
            }
        }
        else if ((newData.year || newData.hour || newData.month || newData.day || newData.minute || newData.second)) {
            // newData is from the datetime picker's selected values
            // update the existing datetimeValue with the new values
            if (newData.ampm !== undefined && newData.hour !== undefined) {
                // change the value of the hour based on whether or not it is am or pm
                // if the meridiem is pm and equal to 12, it remains 12
                // otherwise we add 12 to the hour value
                // if the meridiem is am and equal to 12, we change it to 0
                // otherwise we use its current hour value
                // for example: 8 pm becomes 20, 12 am becomes 0, 4 am becomes 4
                newData.hour.value = (newData.ampm.value === 'pm')
                    ? (newData.hour.value === 12 ? 12 : newData.hour.value + 12)
                    : (newData.hour.value === 12 ? 0 : newData.hour.value);
            }
            // merge new values from the picker's selection
            // to the existing DatetimeData values
            for (var _i = 0, _a = Object.keys(newData); _i < _a.length; _i++) {
                var key = _a[_i];
                existingData[key] = newData[key].value;
            }
            return true;
        }
        else if (newData.ampm) {
            // Even though in the picker column hour values are between 1 and 12, the hour value is actually normalized
            // to [0, 23] interval. Because of this when changing between AM and PM we have to update the hour so it points
            // to the correct HH hour
            newData.hour = {
                value: newData.hour
                    ? newData.hour.value
                    : (newData.ampm.value === 'pm'
                        ? (existingData.hour < 12 ? existingData.hour + 12 : existingData.hour)
                        : (existingData.hour >= 12 ? existingData.hour - 12 : existingData.hour))
            };
            existingData['hour'] = newData['hour'].value;
            existingData['ampm'] = newData['ampm'].value;
            return true;
        }
        // eww, invalid data
        console.warn("Error parsing date: \"" + newData + "\". Please provide a valid ISO 8601 datetime format: https://www.w3.org/TR/NOTE-datetime");
    }
    else {
        // blank data, clear everything out
        for (var k in existingData) {
            if (existingData.hasOwnProperty(k)) {
                delete existingData[k];
            }
        }
    }
    return false;
};
var parseTemplate = function (template) {
    var formats = [];
    template = template.replace(/[^\w\s]/gi, ' ');
    FORMAT_KEYS.forEach(function (format) {
        if (format.f.length > 1 && template.indexOf(format.f) > -1 && template.indexOf(format.f + format.f.charAt(0)) < 0) {
            template = template.replace(format.f, ' ' + format.f + ' ');
        }
    });
    var words = template.split(' ').filter(function (w) { return w.length > 0; });
    words.forEach(function (word, i) {
        FORMAT_KEYS.forEach(function (format) {
            if (word === format.f) {
                if (word === FORMAT_A || word === FORMAT_a) {
                    // this format is an am/pm format, so it's an "a" or "A"
                    if ((formats.indexOf(FORMAT_h) < 0 && formats.indexOf(FORMAT_hh) < 0) ||
                        VALID_AMPM_PREFIX.indexOf(words[i - 1]) === -1) {
                        // template does not already have a 12-hour format
                        // or this am/pm format doesn't have a hour, minute, or second format immediately before it
                        // so do not treat this word "a" or "A" as the am/pm format
                        return;
                    }
                }
                formats.push(word);
            }
        });
    });
    return formats;
};
var getValueFromFormat = function (date, format) {
    if (format === FORMAT_A || format === FORMAT_a) {
        return (date.hour < 12 ? 'am' : 'pm');
    }
    if (format === FORMAT_hh || format === FORMAT_h) {
        return (date.hour > 12 ? date.hour - 12 : (date.hour === 0 ? 12 : date.hour));
    }
    return date[convertFormatToKey(format)];
};
var convertFormatToKey = function (format) {
    for (var k in FORMAT_KEYS) {
        if (FORMAT_KEYS[k].f === format) {
            return FORMAT_KEYS[k].k;
        }
    }
    return undefined;
};
var convertDataToISO = function (data) {
    // https://www.w3.org/TR/NOTE-datetime
    var rtn = '';
    if (data.year !== undefined) {
        // YYYY
        rtn = fourDigit(data.year);
        if (data.month !== undefined) {
            // YYYY-MM
            rtn += '-' + twoDigit(data.month);
            if (data.day !== undefined) {
                // YYYY-MM-DD
                rtn += '-' + twoDigit(data.day);
                if (data.hour !== undefined) {
                    // YYYY-MM-DDTHH:mm:SS
                    rtn += "T" + twoDigit(data.hour) + ":" + twoDigit(data.minute) + ":" + twoDigit(data.second);
                    if (data.millisecond > 0) {
                        // YYYY-MM-DDTHH:mm:SS.SSS
                        rtn += '.' + threeDigit(data.millisecond);
                    }
                    if (data.tzOffset === undefined) {
                        // YYYY-MM-DDTHH:mm:SSZ
                        rtn += 'Z';
                    }
                    else {
                        // YYYY-MM-DDTHH:mm:SS+/-HH:mm
                        rtn += (data.tzOffset > 0 ? '+' : '-') + twoDigit(Math.floor(Math.abs(data.tzOffset / 60))) + ':' + twoDigit(data.tzOffset % 60);
                    }
                }
            }
        }
    }
    else if (data.hour !== undefined) {
        // HH:mm
        rtn = twoDigit(data.hour) + ':' + twoDigit(data.minute);
        if (data.second !== undefined) {
            // HH:mm:SS
            rtn += ':' + twoDigit(data.second);
            if (data.millisecond !== undefined) {
                // HH:mm:SS.SSS
                rtn += '.' + threeDigit(data.millisecond);
            }
        }
    }
    return rtn;
};
/**
 * Use to convert a string of comma separated strings or
 * an array of strings, and clean up any user input
 */
var convertToArrayOfStrings = function (input, type) {
    if (input == null) {
        return undefined;
    }
    if (typeof input === 'string') {
        // convert the string to an array of strings
        // auto remove any [] characters
        input = input.replace(/\[|\]/g, '').split(',');
    }
    var values;
    if (Array.isArray(input)) {
        // trim up each string value
        values = input.map(function (val) { return val.toString().trim(); });
    }
    if (values === undefined || values.length === 0) {
        console.warn("Invalid \"" + type + "Names\". Must be an array of strings, or a comma separated string.");
    }
    return values;
};
/**
 * Use to convert a string of comma separated numbers or
 * an array of numbers, and clean up any user input
 */
var convertToArrayOfNumbers = function (input, type) {
    if (typeof input === 'string') {
        // convert the string to an array of strings
        // auto remove any whitespace and [] characters
        input = input.replace(/\[|\]|\s/g, '').split(',');
    }
    var values;
    if (Array.isArray(input)) {
        // ensure each value is an actual number in the returned array
        values = input
            .map(function (num) { return parseInt(num, 10); })
            .filter(isFinite);
    }
    else {
        values = [input];
    }
    if (values.length === 0) {
        console.warn("Invalid \"" + type + "Values\". Must be an array of numbers, or a comma separated string of numbers.");
    }
    return values;
};
var twoDigit = function (val) {
    return ('0' + (val !== undefined ? Math.abs(val) : '0')).slice(-2);
};
var threeDigit = function (val) {
    return ('00' + (val !== undefined ? Math.abs(val) : '0')).slice(-3);
};
var fourDigit = function (val) {
    return ('000' + (val !== undefined ? Math.abs(val) : '0')).slice(-4);
};
var FORMAT_YYYY = 'YYYY';
var FORMAT_YY = 'YY';
var FORMAT_MMMM = 'MMMM';
var FORMAT_MMM = 'MMM';
var FORMAT_MM = 'MM';
var FORMAT_M = 'M';
var FORMAT_DDDD = 'DDDD';
var FORMAT_DDD = 'DDD';
var FORMAT_DD = 'DD';
var FORMAT_D = 'D';
var FORMAT_HH = 'HH';
var FORMAT_H = 'H';
var FORMAT_hh = 'hh';
var FORMAT_h = 'h';
var FORMAT_mm = 'mm';
var FORMAT_m = 'm';
var FORMAT_ss = 'ss';
var FORMAT_s = 's';
var FORMAT_A = 'A';
var FORMAT_a = 'a';
var FORMAT_KEYS = [
    { f: FORMAT_YYYY, k: 'year' },
    { f: FORMAT_MMMM, k: 'month' },
    { f: FORMAT_DDDD, k: 'day' },
    { f: FORMAT_MMM, k: 'month' },
    { f: FORMAT_DDD, k: 'day' },
    { f: FORMAT_YY, k: 'year' },
    { f: FORMAT_MM, k: 'month' },
    { f: FORMAT_DD, k: 'day' },
    { f: FORMAT_HH, k: 'hour' },
    { f: FORMAT_hh, k: 'hour' },
    { f: FORMAT_mm, k: 'minute' },
    { f: FORMAT_ss, k: 'second' },
    { f: FORMAT_M, k: 'month' },
    { f: FORMAT_D, k: 'day' },
    { f: FORMAT_H, k: 'hour' },
    { f: FORMAT_h, k: 'hour' },
    { f: FORMAT_m, k: 'minute' },
    { f: FORMAT_s, k: 'second' },
    { f: FORMAT_A, k: 'ampm' },
    { f: FORMAT_a, k: 'ampm' },
];
var DAY_NAMES = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
var DAY_SHORT_NAMES = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];
var MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
var MONTH_SHORT_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
var VALID_AMPM_PREFIX = [
    FORMAT_hh, FORMAT_h, FORMAT_mm, FORMAT_m, FORMAT_ss, FORMAT_s
];
var datetimeIosCss = ":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;min-width:16px;min-height:1.2em;font-family:var(--ion-font-family, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:2}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static}:host(.datetime-placeholder){color:var(--placeholder-color)}:host(.datetime-disabled){opacity:0.3;pointer-events:none}:host(.datetime-readonly){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.datetime-text{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-ms-flex:1;flex:1;min-height:inherit;direction:ltr;overflow:inherit}[dir=rtl] .datetime-text,:host-context([dir=rtl]) .datetime-text{direction:rtl}:host{--placeholder-color:var(--ion-color-step-400, #999999);--padding-top:10px;--padding-end:10px;--padding-bottom:10px;--padding-start:20px}";
var datetimeMdCss = ":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;min-width:16px;min-height:1.2em;font-family:var(--ion-font-family, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:2}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static}:host(.datetime-placeholder){color:var(--placeholder-color)}:host(.datetime-disabled){opacity:0.3;pointer-events:none}:host(.datetime-readonly){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.datetime-text{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-ms-flex:1;flex:1;min-height:inherit;direction:ltr;overflow:inherit}[dir=rtl] .datetime-text,:host-context([dir=rtl]) .datetime-text{direction:rtl}:host{--placeholder-color:var(--ion-placeholder-color, var(--ion-color-step-400, #999999));--padding-top:10px;--padding-end:0;--padding-bottom:11px;--padding-start:16px}";
var Datetime = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.ionCancel = createEvent(this, "ionCancel", 7);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.inputId = "ion-dt-" + datetimeIds++;
        this.locale = {};
        this.datetimeMin = {};
        this.datetimeMax = {};
        this.datetimeValue = {};
        this.isExpanded = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the user cannot interact with the datetime.
         */
        this.disabled = false;
        /**
         * If `true`, the datetime appears normal but is not interactive.
         */
        this.readonly = false;
        /**
         * The display format of the date and time as text that shows
         * within the item. When the `pickerFormat` input is not used, then the
         * `displayFormat` is used for both display the formatted text, and determining
         * the datetime picker's columns. See the `pickerFormat` input description for
         * more info. Defaults to `MMM D, YYYY`.
         */
        this.displayFormat = 'MMM D, YYYY';
        /**
         * The text to display on the picker's cancel button.
         */
        this.cancelText = 'Cancel';
        /**
         * The text to display on the picker's "Done" button.
         */
        this.doneText = 'Done';
        this.onClick = function () {
            _this.setFocus();
            _this.open();
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
    }
    class_1.prototype.disabledChanged = function () {
        this.emitStyle();
    };
    /**
     * Update the datetime value when the value changes
     */
    class_1.prototype.valueChanged = function () {
        this.updateDatetimeValue(this.value);
        this.emitStyle();
        this.ionChange.emit({
            value: this.value
        });
    };
    class_1.prototype.componentWillLoad = function () {
        // first see if locale names were provided in the inputs
        // then check to see if they're in the config
        // if neither were provided then it will use default English names
        this.locale = {
            // this.locale[type] = convertToArrayOfStrings((this[type] ? this[type] : this.config.get(type), type);
            monthNames: convertToArrayOfStrings(this.monthNames, 'monthNames'),
            monthShortNames: convertToArrayOfStrings(this.monthShortNames, 'monthShortNames'),
            dayNames: convertToArrayOfStrings(this.dayNames, 'dayNames'),
            dayShortNames: convertToArrayOfStrings(this.dayShortNames, 'dayShortNames')
        };
        this.updateDatetimeValue(this.value);
        this.emitStyle();
    };
    /**
     * Opens the datetime overlay.
     */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pickerOptions, picker;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.disabled || this.isExpanded) {
                            return [2 /*return*/];
                        }
                        pickerOptions = this.generatePickerOptions();
                        return [4 /*yield*/, pickerController.create(pickerOptions)];
                    case 1:
                        picker = _a.sent();
                        this.isExpanded = true;
                        picker.onDidDismiss().then(function () {
                            _this.isExpanded = false;
                            _this.setFocus();
                        });
                        picker.addEventListener('ionPickerColChange', function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var data, colSelectedIndex, colOptions, changeData;
                            return __generator(this, function (_a) {
                                data = event.detail;
                                colSelectedIndex = data.selectedIndex;
                                colOptions = data.options;
                                changeData = {};
                                changeData[data.name] = {
                                    value: colOptions[colSelectedIndex].value
                                };
                                if (data.name !== 'ampm' && this.datetimeValue.ampm !== undefined) {
                                    changeData['ampm'] = {
                                        value: this.datetimeValue.ampm
                                    };
                                }
                                this.updateDatetimeValue(changeData);
                                picker.columns = this.generateColumns();
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, picker.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'interactive': true,
            'datetime': true,
            'has-placeholder': this.placeholder != null,
            'has-value': this.hasValue(),
            'interactive-disabled': this.disabled,
        });
    };
    class_1.prototype.updateDatetimeValue = function (value) {
        updateDate(this.datetimeValue, value, this.displayTimezone);
    };
    class_1.prototype.generatePickerOptions = function () {
        var _this = this;
        var mode = getIonMode(this);
        this.locale = {
            monthNames: convertToArrayOfStrings(this.monthNames, 'monthNames'),
            monthShortNames: convertToArrayOfStrings(this.monthShortNames, 'monthShortNames'),
            dayNames: convertToArrayOfStrings(this.dayNames, 'dayNames'),
            dayShortNames: convertToArrayOfStrings(this.dayShortNames, 'dayShortNames')
        };
        var pickerOptions = Object.assign(Object.assign({ mode: mode }, this.pickerOptions), { columns: this.generateColumns() });
        // If the user has not passed in picker buttons,
        // add a cancel and ok button to the picker
        var buttons = pickerOptions.buttons;
        if (!buttons || buttons.length === 0) {
            pickerOptions.buttons = [
                {
                    text: this.cancelText,
                    role: 'cancel',
                    handler: function () {
                        _this.updateDatetimeValue(_this.value);
                        _this.ionCancel.emit();
                    }
                },
                {
                    text: this.doneText,
                    handler: function (data) {
                        _this.updateDatetimeValue(data);
                        /**
                         * Prevent convertDataToISO from doing any
                         * kind of transformation based on timezone
                         * This cancels out any change it attempts to make
                         *
                         * Important: Take the timezone offset based on
                         * the date that is currently selected, otherwise
                         * there can be 1 hr difference when dealing w/ DST
                         */
                        var date = new Date(convertDataToISO(_this.datetimeValue));
                        // If a custom display timezone is provided, use that tzOffset value instead
                        _this.datetimeValue.tzOffset = (_this.displayTimezone !== undefined && _this.displayTimezone.length > 0)
                            ? ((getTimezoneOffset(date, _this.displayTimezone)) / 1000 / 60) * -1
                            : date.getTimezoneOffset() * -1;
                        _this.value = convertDataToISO(_this.datetimeValue);
                    }
                }
            ];
        }
        return pickerOptions;
    };
    class_1.prototype.generateColumns = function () {
        var _this = this;
        // if a picker format wasn't provided, then fallback
        // to use the display format
        var template = this.pickerFormat || this.displayFormat || DEFAULT_FORMAT;
        if (template.length === 0) {
            return [];
        }
        // make sure we've got up to date sizing information
        this.calcMinMax();
        // does not support selecting by day name
        // automatically remove any day name formats
        template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
        if (template.indexOf('D') === -1) {
            // there is not a day in the template
            // replace the day name with a numeric one if it exists
            template = template.replace('{~}', 'D');
        }
        // make sure no day name replacer is left in the string
        template = template.replace(/{~}/g, '');
        // parse apart the given template into an array of "formats"
        var columns = parseTemplate(template).map(function (format) {
            // loop through each format in the template
            // create a new picker column to build up with data
            var key = convertFormatToKey(format);
            var values;
            // check if they have exact values to use for this date part
            // otherwise use the default date part values
            var self = _this;
            values = self[key + 'Values']
                ? convertToArrayOfNumbers(self[key + 'Values'], key)
                : dateValueRange(format, _this.datetimeMin, _this.datetimeMax);
            var colOptions = values.map(function (val) {
                return {
                    value: val,
                    text: renderTextFormat(format, val, undefined, _this.locale),
                };
            });
            // cool, we've loaded up the columns with options
            // preselect the option for this column
            var optValue = getDateValue(_this.datetimeValue, format);
            var selectedIndex = colOptions.findIndex(function (opt) { return opt.value === optValue; });
            return {
                name: key,
                selectedIndex: selectedIndex >= 0 ? selectedIndex : 0,
                options: colOptions
            };
        });
        // Normalize min/max
        var min = this.datetimeMin;
        var max = this.datetimeMax;
        ['month', 'day', 'hour', 'minute']
            .filter(function (name) { return !columns.find(function (column) { return column.name === name; }); })
            .forEach(function (name) {
            min[name] = 0;
            max[name] = 0;
        });
        return this.validateColumns(divyColumns(columns));
    };
    class_1.prototype.validateColumns = function (columns) {
        var today = new Date();
        var minCompareVal = dateDataSortValue(this.datetimeMin);
        var maxCompareVal = dateDataSortValue(this.datetimeMax);
        var yearCol = columns.find(function (c) { return c.name === 'year'; });
        var selectedYear = today.getFullYear();
        if (yearCol) {
            // default to the first value if the current year doesn't exist in the options
            if (!yearCol.options.find(function (col) { return col.value === today.getFullYear(); })) {
                selectedYear = yearCol.options[0].value;
            }
            var selectedIndex = yearCol.selectedIndex;
            if (selectedIndex !== undefined) {
                var yearOpt = yearCol.options[selectedIndex];
                if (yearOpt) {
                    // they have a selected year value
                    selectedYear = yearOpt.value;
                }
            }
        }
        var selectedMonth = this.validateColumn(columns, 'month', 1, minCompareVal, maxCompareVal, [selectedYear, 0, 0, 0, 0], [selectedYear, 12, 31, 23, 59]);
        var numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
        var selectedDay = this.validateColumn(columns, 'day', 2, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, 0, 0, 0], [selectedYear, selectedMonth, numDaysInMonth, 23, 59]);
        var selectedHour = this.validateColumn(columns, 'hour', 3, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, 0, 0], [selectedYear, selectedMonth, selectedDay, 23, 59]);
        this.validateColumn(columns, 'minute', 4, minCompareVal, maxCompareVal, [selectedYear, selectedMonth, selectedDay, selectedHour, 0], [selectedYear, selectedMonth, selectedDay, selectedHour, 59]);
        return columns;
    };
    class_1.prototype.calcMinMax = function () {
        var todaysYear = new Date().getFullYear();
        if (this.yearValues !== undefined) {
            var years = convertToArrayOfNumbers(this.yearValues, 'year');
            if (this.min === undefined) {
                this.min = Math.min.apply(Math, years).toString();
            }
            if (this.max === undefined) {
                this.max = Math.max.apply(Math, years).toString();
            }
        }
        else {
            if (this.min === undefined) {
                this.min = (todaysYear - 100).toString();
            }
            if (this.max === undefined) {
                this.max = todaysYear.toString();
            }
        }
        var min = this.datetimeMin = parseDate(this.min);
        var max = this.datetimeMax = parseDate(this.max);
        min.year = min.year || todaysYear;
        max.year = max.year || todaysYear;
        min.month = min.month || 1;
        max.month = max.month || 12;
        min.day = min.day || 1;
        max.day = max.day || 31;
        min.hour = min.hour || 0;
        max.hour = max.hour === undefined ? 23 : max.hour;
        min.minute = min.minute || 0;
        max.minute = max.minute === undefined ? 59 : max.minute;
        min.second = min.second || 0;
        max.second = max.second === undefined ? 59 : max.second;
        // Ensure min/max constraints
        if (min.year > max.year) {
            console.error('min.year > max.year');
            min.year = max.year - 100;
        }
        if (min.year === max.year) {
            if (min.month > max.month) {
                console.error('min.month > max.month');
                min.month = 1;
            }
            else if (min.month === max.month && min.day > max.day) {
                console.error('min.day > max.day');
                min.day = 1;
            }
        }
    };
    class_1.prototype.validateColumn = function (columns, name, index, min, max, lowerBounds, upperBounds) {
        var column = columns.find(function (c) { return c.name === name; });
        if (!column) {
            return 0;
        }
        var lb = lowerBounds.slice();
        var ub = upperBounds.slice();
        var options = column.options;
        var indexMin = options.length - 1;
        var indexMax = 0;
        for (var i = 0; i < options.length; i++) {
            var opts = options[i];
            var value = opts.value;
            lb[index] = opts.value;
            ub[index] = opts.value;
            var disabled = opts.disabled = (value < lowerBounds[index] ||
                value > upperBounds[index] ||
                dateSortValue(ub[0], ub[1], ub[2], ub[3], ub[4]) < min ||
                dateSortValue(lb[0], lb[1], lb[2], lb[3], lb[4]) > max);
            if (!disabled) {
                indexMin = Math.min(indexMin, i);
                indexMax = Math.max(indexMax, i);
            }
        }
        var selectedIndex = column.selectedIndex = clamp(indexMin, column.selectedIndex, indexMax);
        var opt = column.options[selectedIndex];
        if (opt) {
            return opt.value;
        }
        return 0;
    };
    Object.defineProperty(class_1.prototype, "text", {
        get: function () {
            // create the text of the formatted data
            var template = this.displayFormat || this.pickerFormat || DEFAULT_FORMAT;
            if (this.value === undefined ||
                this.value === null ||
                this.value.length === 0) {
                return;
            }
            return renderDatetime(template, this.datetimeValue, this.locale);
        },
        enumerable: false,
        configurable: true
    });
    class_1.prototype.hasValue = function () {
        return this.text !== undefined;
    };
    class_1.prototype.setFocus = function () {
        if (this.buttonEl) {
            this.buttonEl.focus();
        }
    };
    class_1.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, inputId = _b.inputId, text = _b.text, disabled = _b.disabled, readonly = _b.readonly, isExpanded = _b.isExpanded, el = _b.el, placeholder = _b.placeholder;
        var mode = getIonMode(this);
        var labelId = inputId + '-lbl';
        var label = findItemLabel(el);
        var addPlaceholderClass = (text === undefined && placeholder != null) ? true : false;
        // If selected text has been passed in, use that first
        // otherwise use the placeholder
        var datetimeText = text === undefined
            ? (placeholder != null ? placeholder : '')
            : text;
        var datetimeTextPart = text === undefined
            ? (placeholder != null ? 'placeholder' : undefined)
            : 'text';
        if (label) {
            label.id = labelId;
        }
        renderHiddenInput(true, el, this.name, this.value, this.disabled);
        return (h(Host, { onClick: this.onClick, "aria-disabled": disabled ? 'true' : null, "aria-expanded": "" + isExpanded, "aria-haspopup": "true", "aria-labelledby": labelId, class: (_a = {},
                _a[mode] = true,
                _a['datetime-disabled'] = disabled,
                _a['datetime-readonly'] = readonly,
                _a['datetime-placeholder'] = addPlaceholderClass,
                _a['in-item'] = hostContext('ion-item', el),
                _a) }, h("div", { class: "datetime-text", part: datetimeTextPart }, datetimeText), h("button", { type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: this.disabled, ref: function (btnEl) { return _this.buttonEl = btnEl; } })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "disabled": ["disabledChanged"],
                "value": ["valueChanged"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
var divyColumns = function (columns) {
    var columnsWidth = [];
    var col;
    var width;
    for (var i = 0; i < columns.length; i++) {
        col = columns[i];
        columnsWidth.push(0);
        for (var _i = 0, _a = col.options; _i < _a.length; _i++) {
            var option = _a[_i];
            width = option.text.length;
            if (width > columnsWidth[i]) {
                columnsWidth[i] = width;
            }
        }
    }
    if (columnsWidth.length === 2) {
        width = Math.max(columnsWidth[0], columnsWidth[1]);
        columns[0].align = 'right';
        columns[1].align = 'left';
        columns[0].optionsWidth = columns[1].optionsWidth = width * 17 + "px";
    }
    else if (columnsWidth.length === 3) {
        width = Math.max(columnsWidth[0], columnsWidth[2]);
        columns[0].align = 'right';
        columns[1].columnWidth = columnsWidth[1] * 17 + "px";
        columns[0].optionsWidth = columns[2].optionsWidth = width * 17 + "px";
        columns[2].align = 'left';
    }
    return columns;
};
var DEFAULT_FORMAT = 'MMM D, YYYY';
var datetimeIds = 0;
Datetime.style = {
    ios: datetimeIosCss,
    md: datetimeMdCss
};
/**
 * iOS Picker Enter Animation
 */
var iosEnterAnimation = function (baseEl) {
    var baseAnimation = createAnimation();
    var backdropAnimation = createAnimation();
    var wrapperAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
        'pointer-events': 'none'
    })
        .afterClearStyles(['pointer-events']);
    wrapperAnimation
        .addElement(baseEl.querySelector('.picker-wrapper'))
        .fromTo('transform', 'translateY(100%)', 'translateY(0%)');
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
/**
 * iOS Picker Leave Animation
 */
var iosLeaveAnimation = function (baseEl) {
    var baseAnimation = createAnimation();
    var backdropAnimation = createAnimation();
    var wrapperAnimation = createAnimation();
    backdropAnimation
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', 'var(--backdrop-opacity)', 0.01);
    wrapperAnimation
        .addElement(baseEl.querySelector('.picker-wrapper'))
        .fromTo('transform', 'translateY(0%)', 'translateY(100%)');
    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};
var pickerIosCss = ".sc-ion-picker-ios-h{--border-radius:0;--border-style:solid;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--max-height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}[dir=rtl].sc-ion-picker-ios-h,[dir=rtl] .sc-ion-picker-ios-h{left:unset;right:unset;right:0}.overlay-hidden.sc-ion-picker-ios-h{display:none}.picker-wrapper.sc-ion-picker-ios{border-radius:var(--border-radius);left:0;right:0;bottom:0;margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;overflow:hidden;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-wrapper.sc-ion-picker-ios{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.picker-toolbar.sc-ion-picker-ios{width:100%;background:transparent;contain:strict;z-index:1}.picker-button.sc-ion-picker-ios{border:0;font-family:inherit}.picker-button.sc-ion-picker-ios:active,.picker-button.sc-ion-picker-ios:focus{outline:none}.picker-columns.sc-ion-picker-ios{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;margin-bottom:var(--ion-safe-area-bottom, 0);contain:strict;direction:ltr;overflow:hidden}.picker-above-highlight.sc-ion-picker-ios,.picker-below-highlight.sc-ion-picker-ios{display:none;pointer-events:none}.sc-ion-picker-ios-h{--background:var(--ion-background-color, #fff);--border-width:1px 0 0;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--height:260px;--backdrop-opacity:var(--ion-backdrop-opacity, 0.26);color:var(--ion-item-color, var(--ion-text-color, #000))}.picker-toolbar.sc-ion-picker-ios{display:-ms-flexbox;display:flex;height:44px;border-bottom:0.55px solid var(--border-color)}.picker-toolbar-button.sc-ion-picker-ios{-ms-flex:1;flex:1;text-align:end}.picker-toolbar-button.sc-ion-picker-ios:last-child .picker-button.sc-ion-picker-ios{font-weight:600}.picker-toolbar-button.sc-ion-picker-ios:first-child{font-weight:normal;text-align:start}.picker-button.sc-ion-picker-ios,.picker-button.ion-activated.sc-ion-picker-ios{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:1em;padding-right:1em;padding-top:0;padding-bottom:0;height:44px;background:transparent;color:var(--ion-color-primary, #3880ff);font-size:16px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-button.sc-ion-picker-ios,.picker-button.ion-activated.sc-ion-picker-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:1em;padding-inline-start:1em;-webkit-padding-end:1em;padding-inline-end:1em}}.picker-columns.sc-ion-picker-ios{height:215px;-webkit-perspective:1000px;perspective:1000px}.picker-above-highlight.sc-ion-picker-ios{left:0;top:0;-webkit-transform:translate3d(0,  0,  90px);transform:translate3d(0,  0,  90px);display:block;position:absolute;width:100%;height:81px;border-bottom:1px solid var(--border-color);background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, var(--background, var(--ion-background-color, #fff))), to(rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8)));background:linear-gradient(to bottom, var(--background, var(--ion-background-color, #fff)) 20%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%);z-index:10}[dir=rtl].sc-ion-picker-ios .picker-above-highlight.sc-ion-picker-ios,[dir=rtl].sc-ion-picker-ios-h .picker-above-highlight.sc-ion-picker-ios,[dir=rtl] .sc-ion-picker-ios-h .picker-above-highlight.sc-ion-picker-ios{left:unset;right:unset;right:0}.picker-below-highlight.sc-ion-picker-ios{left:0;top:115px;-webkit-transform:translate3d(0,  0,  90px);transform:translate3d(0,  0,  90px);display:block;position:absolute;width:100%;height:119px;border-top:1px solid var(--border-color);background:-webkit-gradient(linear, left bottom, left top, color-stop(30%, var(--background, var(--ion-background-color, #fff))), to(rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8)));background:linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 30%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 100%);z-index:11}[dir=rtl].sc-ion-picker-ios .picker-below-highlight.sc-ion-picker-ios,[dir=rtl].sc-ion-picker-ios-h .picker-below-highlight.sc-ion-picker-ios,[dir=rtl] .sc-ion-picker-ios-h .picker-below-highlight.sc-ion-picker-ios{left:unset;right:unset;right:0}";
var pickerMdCss = ".sc-ion-picker-md-h{--border-radius:0;--border-style:solid;--min-width:auto;--width:100%;--max-width:500px;--min-height:auto;--max-height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}[dir=rtl].sc-ion-picker-md-h,[dir=rtl] .sc-ion-picker-md-h{left:unset;right:unset;right:0}.overlay-hidden.sc-ion-picker-md-h{display:none}.picker-wrapper.sc-ion-picker-md{border-radius:var(--border-radius);left:0;right:0;bottom:0;margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;overflow:hidden;z-index:10}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-wrapper.sc-ion-picker-md{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.picker-toolbar.sc-ion-picker-md{width:100%;background:transparent;contain:strict;z-index:1}.picker-button.sc-ion-picker-md{border:0;font-family:inherit}.picker-button.sc-ion-picker-md:active,.picker-button.sc-ion-picker-md:focus{outline:none}.picker-columns.sc-ion-picker-md{display:-ms-flexbox;display:flex;position:relative;-ms-flex-pack:center;justify-content:center;margin-bottom:var(--ion-safe-area-bottom, 0);contain:strict;direction:ltr;overflow:hidden}.picker-above-highlight.sc-ion-picker-md,.picker-below-highlight.sc-ion-picker-md{display:none;pointer-events:none}.sc-ion-picker-md-h{--background:var(--ion-background-color, #fff);--border-width:0.55px 0 0;--border-color:var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--height:260px;--backdrop-opacity:var(--ion-backdrop-opacity, 0.26);color:var(--ion-item-color, var(--ion-text-color, #000))}.picker-toolbar.sc-ion-picker-md{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;height:44px}.picker-button.sc-ion-picker-md,.picker-button.ion-activated.sc-ion-picker-md{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:1.1em;padding-right:1.1em;padding-top:0;padding-bottom:0;height:44px;background:transparent;color:var(--ion-color-primary, #3880ff);font-size:14px;font-weight:500;text-transform:uppercase;-webkit-box-shadow:none;box-shadow:none}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-button.sc-ion-picker-md,.picker-button.ion-activated.sc-ion-picker-md{padding-left:unset;padding-right:unset;-webkit-padding-start:1.1em;padding-inline-start:1.1em;-webkit-padding-end:1.1em;padding-inline-end:1.1em}}.picker-columns.sc-ion-picker-md{height:216px;-webkit-perspective:1800px;perspective:1800px}.picker-above-highlight.sc-ion-picker-md{left:0;top:0;-webkit-transform:translate3d(0,  0,  90px);transform:translate3d(0,  0,  90px);position:absolute;width:100%;height:81px;border-bottom:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));background:-webkit-gradient(linear, left top, left bottom, color-stop(20%, var(--ion-background-color, #fff)), to(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)));background:linear-gradient(to bottom, var(--ion-background-color, #fff) 20%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%);z-index:10}[dir=rtl].sc-ion-picker-md .picker-above-highlight.sc-ion-picker-md,[dir=rtl].sc-ion-picker-md-h .picker-above-highlight.sc-ion-picker-md,[dir=rtl] .sc-ion-picker-md-h .picker-above-highlight.sc-ion-picker-md{left:unset;right:unset;right:0}.picker-below-highlight.sc-ion-picker-md{left:0;top:115px;-webkit-transform:translate3d(0,  0,  90px);transform:translate3d(0,  0,  90px);position:absolute;width:100%;height:119px;border-top:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));background:-webkit-gradient(linear, left bottom, left top, color-stop(30%, var(--ion-background-color, #fff)), to(rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8)));background:linear-gradient(to top, var(--ion-background-color, #fff) 30%, rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8) 100%);z-index:11}[dir=rtl].sc-ion-picker-md .picker-below-highlight.sc-ion-picker-md,[dir=rtl].sc-ion-picker-md-h .picker-below-highlight.sc-ion-picker-md,[dir=rtl] .sc-ion-picker-md-h .picker-below-highlight.sc-ion-picker-md{left:unset;right:unset;right:0}";
var Picker = /** @class */ (function () {
    function class_2(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.didPresent = createEvent(this, "ionPickerDidPresent", 7);
        this.willPresent = createEvent(this, "ionPickerWillPresent", 7);
        this.willDismiss = createEvent(this, "ionPickerWillDismiss", 7);
        this.didDismiss = createEvent(this, "ionPickerDidDismiss", 7);
        this.presented = false;
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */
        this.keyboardClose = true;
        /**
         * Array of buttons to be displayed at the top of the picker.
         */
        this.buttons = [];
        /**
         * Array of columns to be displayed in the picker.
         */
        this.columns = [];
        /**
         * Number of milliseconds to wait before dismissing the picker.
         */
        this.duration = 0;
        /**
         * If `true`, a backdrop will be displayed behind the picker.
         */
        this.showBackdrop = true;
        /**
         * If `true`, the picker will be dismissed when the backdrop is clicked.
         */
        this.backdropDismiss = true;
        /**
         * If `true`, the picker will animate.
         */
        this.animated = true;
        this.onBackdropTap = function () {
            _this.dismiss(undefined, BACKDROP);
        };
        this.dispatchCancelHandler = function (ev) {
            var role = ev.detail.role;
            if (isCancel(role)) {
                var cancelButton = _this.buttons.find(function (b) { return b.role === 'cancel'; });
                _this.callButtonHandler(cancelButton);
            }
        };
    }
    class_2.prototype.connectedCallback = function () {
        prepareOverlay(this.el);
    };
    /**
     * Present the picker overlay after it has been created.
     */
    class_2.prototype.present = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, present(this, 'pickerEnter', iosEnterAnimation, iosEnterAnimation, undefined)];
                    case 1:
                        _a.sent();
                        if (this.duration > 0) {
                            this.durationTimeout = setTimeout(function () { return _this.dismiss(); }, this.duration);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Dismiss the picker overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the picker.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the picker.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     */
    class_2.prototype.dismiss = function (data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'pickerLeave', iosLeaveAnimation, iosLeaveAnimation);
    };
    /**
     * Returns a promise that resolves when the picker did dismiss.
     */
    class_2.prototype.onDidDismiss = function () {
        return eventMethod(this.el, 'ionPickerDidDismiss');
    };
    /**
     * Returns a promise that resolves when the picker will dismiss.
     */
    class_2.prototype.onWillDismiss = function () {
        return eventMethod(this.el, 'ionPickerWillDismiss');
    };
    /**
     * Get the column that matches the specified name.
     *
     * @param name The name of the column.
     */
    class_2.prototype.getColumn = function (name) {
        return Promise.resolve(this.columns.find(function (column) { return column.name === name; }));
    };
    class_2.prototype.buttonClick = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            var role, shouldDismiss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role = button.role;
                        if (isCancel(role)) {
                            return [2 /*return*/, this.dismiss(undefined, role)];
                        }
                        return [4 /*yield*/, this.callButtonHandler(button)];
                    case 1:
                        shouldDismiss = _a.sent();
                        if (shouldDismiss) {
                            return [2 /*return*/, this.dismiss(this.getSelected(), button.role)];
                        }
                        return [2 /*return*/, Promise.resolve()];
                }
            });
        });
    };
    class_2.prototype.callButtonHandler = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            var rtn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!button) return [3 /*break*/, 2];
                        return [4 /*yield*/, safeCall(button.handler, this.getSelected())];
                    case 1:
                        rtn = _a.sent();
                        if (rtn === false) {
                            // if the return value of the handler is false then do not dismiss
                            return [2 /*return*/, false];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, true];
                }
            });
        });
    };
    class_2.prototype.getSelected = function () {
        var selected = {};
        this.columns.forEach(function (col, index) {
            var selectedColumn = col.selectedIndex !== undefined
                ? col.options[col.selectedIndex]
                : undefined;
            selected[col.name] = {
                text: selectedColumn ? selectedColumn.text : undefined,
                value: selectedColumn ? selectedColumn.value : undefined,
                columnIndex: index
            };
        });
        return selected;
    };
    class_2.prototype.render = function () {
        var _a;
        var _this = this;
        var mode = getIonMode(this);
        return (h(Host, { "aria-modal": "true", tabindex: "-1", class: Object.assign((_a = {}, _a[mode] = true,
            // Used internally for styling
            _a["picker-" + mode] = true, _a), getClassMap(this.cssClass)), style: {
                zIndex: "" + (20000 + this.overlayIndex)
            }, onIonBackdropTap: this.onBackdropTap, onIonPickerWillDismiss: this.dispatchCancelHandler }, h("ion-backdrop", { visible: this.showBackdrop, tappable: this.backdropDismiss }), h("div", { tabindex: "0" }), h("div", { class: "picker-wrapper ion-overlay-wrapper", role: "dialog" }, h("div", { class: "picker-toolbar" }, this.buttons.map(function (b) { return (h("div", { class: buttonWrapperClass(b) }, h("button", { type: "button", onClick: function () { return _this.buttonClick(b); }, class: buttonClass(b) }, b.text))); })), h("div", { class: "picker-columns" }, h("div", { class: "picker-above-highlight" }), this.presented && this.columns.map(function (c) { return h("ion-picker-column", { col: c }); }), h("div", { class: "picker-below-highlight" }))), h("div", { tabindex: "0" })));
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return class_2;
}());
var buttonWrapperClass = function (button) {
    var _a;
    return _a = {},
        _a["picker-toolbar-" + button.role] = button.role !== undefined,
        _a['picker-toolbar-button'] = true,
        _a;
};
var buttonClass = function (button) {
    return Object.assign({ 'picker-button': true, 'ion-activatable': true }, getClassMap(button.cssClass));
};
Picker.style = {
    ios: pickerIosCss,
    md: pickerMdCss
};
var pickerColumnIosCss = ".picker-col{display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-box-sizing:content-box;box-sizing:content-box;contain:content}.picker-opts{position:relative;-ms-flex:1;flex:1;max-width:100%}.picker-opt{left:0;top:0;display:block;position:absolute;width:100%;border:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;contain:strict;overflow:hidden;will-change:transform}[dir=rtl] .picker-opt,:host-context([dir=rtl]) .picker-opt{left:unset;right:unset;right:0}.picker-opt.picker-opt-disabled{pointer-events:none}.picker-opt-disabled{opacity:0}.picker-opts-left{-ms-flex-pack:start;justify-content:flex-start}.picker-opts-right{-ms-flex-pack:end;justify-content:flex-end}.picker-opt:active,.picker-opt:focus{outline:none}.picker-prefix{position:relative;-ms-flex:1;flex:1;text-align:end;white-space:nowrap}.picker-suffix{position:relative;-ms-flex:1;flex:1;text-align:start;white-space:nowrap}.picker-col{padding-left:4px;padding-right:4px;padding-top:0;padding-bottom:0;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-col{padding-left:unset;padding-right:unset;-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px}}.picker-prefix,.picker-suffix,.picker-opts{top:77px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;color:inherit;font-size:20px;line-height:42px;pointer-events:none}.picker-opt{padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;-webkit-transform-origin:center center;transform-origin:center center;height:46px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;background:transparent;color:inherit;font-size:20px;line-height:42px;-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:auto}[dir=rtl] .picker-opt,:host-context([dir=rtl]) .picker-opt{-webkit-transform-origin:calc(100% - center) center;transform-origin:calc(100% - center) center}";
var pickerColumnMdCss = ".picker-col{display:-ms-flexbox;display:flex;position:relative;-ms-flex:1;flex:1;-ms-flex-pack:center;justify-content:center;height:100%;-webkit-box-sizing:content-box;box-sizing:content-box;contain:content}.picker-opts{position:relative;-ms-flex:1;flex:1;max-width:100%}.picker-opt{left:0;top:0;display:block;position:absolute;width:100%;border:0;text-align:center;text-overflow:ellipsis;white-space:nowrap;contain:strict;overflow:hidden;will-change:transform}[dir=rtl] .picker-opt,:host-context([dir=rtl]) .picker-opt{left:unset;right:unset;right:0}.picker-opt.picker-opt-disabled{pointer-events:none}.picker-opt-disabled{opacity:0}.picker-opts-left{-ms-flex-pack:start;justify-content:flex-start}.picker-opts-right{-ms-flex-pack:end;justify-content:flex-end}.picker-opt:active,.picker-opt:focus{outline:none}.picker-prefix{position:relative;-ms-flex:1;flex:1;text-align:end;white-space:nowrap}.picker-suffix{position:relative;-ms-flex:1;flex:1;text-align:start;white-space:nowrap}.picker-col{padding-left:8px;padding-right:8px;padding-top:0;padding-bottom:0;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.picker-col{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}.picker-prefix,.picker-suffix,.picker-opts{top:77px;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;color:inherit;font-size:22px;line-height:42px;pointer-events:none}.picker-opt{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;height:43px;-webkit-transition-timing-function:ease-out;transition-timing-function:ease-out;background:transparent;color:inherit;font-size:22px;line-height:42px;-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:auto}.picker-prefix,.picker-suffix,.picker-opt.picker-opt-selected{color:var(--ion-color-primary, #3880ff)}";
var PickerColumnCmp = /** @class */ (function () {
    function class_3(hostRef) {
        registerInstance(this, hostRef);
        this.ionPickerColChange = createEvent(this, "ionPickerColChange", 7);
        this.optHeight = 0;
        this.rotateFactor = 0;
        this.scaleFactor = 1;
        this.velocity = 0;
        this.y = 0;
        this.noAnimate = true;
    }
    class_3.prototype.colChanged = function () {
        this.refresh();
    };
    class_3.prototype.connectedCallback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pickerRotateFactor, pickerScaleFactor, mode, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pickerRotateFactor = 0;
                        pickerScaleFactor = 0.81;
                        mode = getIonMode(this);
                        if (mode === 'ios') {
                            pickerRotateFactor = -0.46;
                            pickerScaleFactor = 1;
                        }
                        this.rotateFactor = pickerRotateFactor;
                        this.scaleFactor = pickerScaleFactor;
                        _a = this;
                        return [4 /*yield*/, import('./index-eea61379.js')];
                    case 1:
                        _a.gesture = (_b.sent()).createGesture({
                            el: this.el,
                            gestureName: 'picker-swipe',
                            gesturePriority: 100,
                            threshold: 0,
                            passive: false,
                            onStart: function (ev) { return _this.onStart(ev); },
                            onMove: function (ev) { return _this.onMove(ev); },
                            onEnd: function (ev) { return _this.onEnd(ev); },
                        });
                        this.gesture.enable();
                        this.tmrId = setTimeout(function () {
                            _this.noAnimate = false;
                            _this.refresh(true);
                        }, 250);
                        return [2 /*return*/];
                }
            });
        });
    };
    class_3.prototype.componentDidLoad = function () {
        var colEl = this.optsEl;
        if (colEl) {
            // DOM READ
            // We perfom a DOM read over a rendered item, this needs to happen after the first render
            this.optHeight = (colEl.firstElementChild ? colEl.firstElementChild.clientHeight : 0);
        }
        this.refresh();
    };
    class_3.prototype.disconnectedCallback = function () {
        cancelAnimationFrame(this.rafId);
        clearTimeout(this.tmrId);
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    };
    class_3.prototype.emitColChange = function () {
        this.ionPickerColChange.emit(this.col);
    };
    class_3.prototype.setSelected = function (selectedIndex, duration) {
        // if there is a selected index, then figure out it's y position
        // if there isn't a selected index, then just use the top y position
        var y = (selectedIndex > -1) ? -(selectedIndex * this.optHeight) : 0;
        this.velocity = 0;
        // set what y position we're at
        cancelAnimationFrame(this.rafId);
        this.update(y, duration, true);
        this.emitColChange();
    };
    class_3.prototype.update = function (y, duration, saveY) {
      if (!this.optsEl) {
        return;
      }
      // ensure we've got a good round number :)
      let translateY = 0;
      let translateZ = 0;
      const { col, rotateFactor } = this;
      let selectedIndex = col.selectedIndex = this.indexForY(-y);
      const durationStr = (duration === 0) ? '' : duration + 'ms';
      const scaleStr = `scale(${this.scaleFactor})`;
      const children = this.optsEl.children;
      const children_length = this.optsEl.children.length;
      const options_length = col.options.length;
      const length = children_length < options_length ? options_length : children_length;
      if(selectedIndex > length) selectedIndex = length-1;
      for (let i = 0; i < length; i++) {
        const button = children[i];
        const opt = col.options[i];
        const optOffset = (i * this.optHeight) + y;
        let transform = '';
        if (rotateFactor !== 0) {
          const rotateX = optOffset * rotateFactor;
          if (Math.abs(rotateX) <= 90) {
            translateY = 0;
            translateZ = 90;
            transform = `rotateX(${rotateX}deg) `;
          }
          else {
            translateY = -9999;
          }
        }
        else {
          translateZ = 0;
          translateY = optOffset;
        }
        const selected = selectedIndex === i;
        transform += `translate3d(0px,${translateY}px,${translateZ}px) `;
        if (this.scaleFactor !== 1 && !selected) {
          transform += scaleStr;
        }
        // Update transition duration
        if (this.noAnimate) {
          if (opt) {
            opt.duration = 0;
          }
          if (button) {
            button.style.transitionDuration = '';
          }
        }
        else if (opt) {
          if (duration !== opt.duration) {
            opt.duration = duration;
            if (button) {
              button.style.transitionDuration = durationStr;
            }
          }
        }
        // Update transform
        if (opt) {
          if (transform !== opt.transform) {
            opt.transform = transform;
            if (button) {
              button.style.transform = transform;
            }
          }
        }
        // Update selected item
        if (opt) {
          if (selected !== opt.selected) {
            opt.selected = selected;
            if (selected && button) {
              button.classList.add(PICKER_OPT_SELECTED);
            }
            else if (button) {
              button.classList.remove(PICKER_OPT_SELECTED);
            }
          }
        }
      }
      this.col.prevSelected = selectedIndex;
      if (saveY) {
        this.y = y;
      }
      if (this.lastIndex !== selectedIndex) {
        // have not set a last index yet
        hapticSelectionChanged();
        this.lastIndex = selectedIndex;
      }
    };
    class_3.prototype.decelerate = function () {
        var _this = this;
        if (this.velocity !== 0) {
            // still decelerating
            this.velocity *= DECELERATION_FRICTION;
            // do not let it go slower than a velocity of 1
            this.velocity = (this.velocity > 0)
                ? Math.max(this.velocity, 1)
                : Math.min(this.velocity, -1);
            var y = this.y + this.velocity;
            if (y > this.minY) {
                // whoops, it's trying to scroll up farther than the options we have!
                y = this.minY;
                this.velocity = 0;
            }
            else if (y < this.maxY) {
                // gahh, it's trying to scroll down farther than we can!
                y = this.maxY;
                this.velocity = 0;
            }
            this.update(y, 0, true);
            var notLockedIn = (Math.round(y) % this.optHeight !== 0) || (Math.abs(this.velocity) > 1);
            if (notLockedIn) {
                // isn't locked in yet, keep decelerating until it is
                this.rafId = requestAnimationFrame(function () { return _this.decelerate(); });
            }
            else {
                this.velocity = 0;
                this.emitColChange();
                hapticSelectionEnd();
            }
        }
        else if (this.y % this.optHeight !== 0) {
            // needs to still get locked into a position so options line up
            var currentPos = Math.abs(this.y % this.optHeight);
            // create a velocity in the direction it needs to scroll
            this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);
            this.decelerate();
        }
    };
    class_3.prototype.indexForY = function (y) {
        return Math.min(Math.max(Math.abs(Math.round(y / this.optHeight)), 0), this.col.options.length - 1);
    };
    // TODO should this check disabled?
    class_3.prototype.onStart = function (detail) {
        // We have to prevent default in order to block scrolling under the picker
        // but we DO NOT have to stop propagation, since we still want
        // some "click" events to capture
        if (detail.event.cancelable) {
            detail.event.preventDefault();
        }
        detail.event.stopPropagation();
        hapticSelectionStart();
        // reset everything
        cancelAnimationFrame(this.rafId);
        var options = this.col.options;
        var minY = (options.length - 1);
        var maxY = 0;
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled) {
                minY = Math.min(minY, i);
                maxY = Math.max(maxY, i);
            }
        }
        this.minY = -(minY * this.optHeight);
        this.maxY = -(maxY * this.optHeight);
    };
    class_3.prototype.onMove = function (detail) {
        if (detail.event.cancelable) {
            detail.event.preventDefault();
        }
        detail.event.stopPropagation();
        // update the scroll position relative to pointer start position
        var y = this.y + detail.deltaY;
        if (y > this.minY) {
            // scrolling up higher than scroll area
            y = Math.pow(y, 0.8);
            this.bounceFrom = y;
        }
        else if (y < this.maxY) {
            // scrolling down below scroll area
            y += Math.pow(this.maxY - y, 0.9);
            this.bounceFrom = y;
        }
        else {
            this.bounceFrom = 0;
        }
        this.update(y, 0, false);
    };
    class_3.prototype.onEnd = function (detail) {
        if (this.bounceFrom > 0) {
            // bounce back up
            this.update(this.minY, 100, true);
            this.emitColChange();
            return;
        }
        else if (this.bounceFrom < 0) {
            // bounce back down
            this.update(this.maxY, 100, true);
            this.emitColChange();
            return;
        }
        this.velocity = clamp(-MAX_PICKER_SPEED, detail.velocityY * 23, MAX_PICKER_SPEED);
        if (this.velocity === 0 && detail.deltaY === 0) {
            var opt = detail.event.target.closest('.picker-opt');
            if (opt && opt.hasAttribute('opt-index')) {
                this.setSelected(parseInt(opt.getAttribute('opt-index'), 10), TRANSITION_DURATION);
            }
        }
        else {
            this.y += detail.deltaY;
            if (Math.abs(detail.velocityY) < 0.05) {
                var isScrollingUp = detail.deltaY > 0;
                var optHeightFraction = (Math.abs(this.y) % this.optHeight) / this.optHeight;
                if (isScrollingUp && optHeightFraction > 0.5) {
                    this.velocity = Math.abs(this.velocity) * -1;
                }
                else if (!isScrollingUp && optHeightFraction <= 0.5) {
                    this.velocity = Math.abs(this.velocity);
                }
            }
            this.decelerate();
        }
    };
    class_3.prototype.refresh = function (forceRefresh) {
        var min = this.col.options.length - 1;
        var max = 0;
        var options = this.col.options;
        for (var i = 0; i < options.length; i++) {
            if (!options[i].disabled) {
                min = Math.min(min, i);
                max = Math.max(max, i);
            }
        }
        /**
         * Only update selected value if column has a
         * velocity of 0. If it does not, then the
         * column is animating might land on
         * a value different than the value at
         * selectedIndex
         */
        if (this.velocity !== 0 && forceRefresh !== true) {
            return;
        }
        var selectedIndex = clamp(min, this.col.selectedIndex || 0, max);
        if (this.col.prevSelected !== selectedIndex || forceRefresh) {
            var y = (selectedIndex * this.optHeight) * -1;
            this.velocity = 0;
            this.update(y, TRANSITION_DURATION, true);
        }
    };
    class_3.prototype.render = function () {
    
      if(this.col && this.col.options && this.col.options.length>0){
        const [first] = this.col.options||[]
        if(!first.transform){
            this.refresh(true);
        }
      }
      const col = this.col;
      const Button = 'button';
      const mode = getIonMode(this);
      console.log("esm-es5/ion-datetime_3.entry.js:picker cols=>>>>>>>>>>>>",this.col)
      return (h(Host, { class: {
          [mode]: true,
          'picker-col': true,
          'picker-opts-left': this.col.align === 'left',
          'picker-opts-right': this.col.align === 'right'
        }, style: {
          'max-width': this.col.columnWidth
        } }, col.prefix && (h("div", { class: "picker-prefix", style: { width: col.prefixWidth } }, col.prefix)), h("div", { class: "picker-opts", style: { maxWidth: col.optionsWidth }, ref: el => this.optsEl = el }, col.options.map((o, index) => h(Button, { type: "button", class: { 'picker-opt': true, 'picker-opt-disabled': !!o.disabled, 'picker-opt-selected': o.selected }, style: { transform: o.transform ? o.transform : 'translate3d(0px, -9999px, 90px)', 'transition-duration': o.duration ? o.duration : TRANSITION_DURATION + 'ms' }, "opt-index": index }, o.text))), col.suffix && (h("div", { class: "picker-suffix", style: { width: col.suffixWidth } }, col.suffix))));
    };
    Object.defineProperty(class_3.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_3, "watchers", {
        get: function () {
            return {
                "col": ["colChanged"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_3;
}());
var PICKER_OPT_SELECTED = 'picker-opt-selected';
var DECELERATION_FRICTION = 0.97;
var MAX_PICKER_SPEED = 90;
var TRANSITION_DURATION = 150;
PickerColumnCmp.style = {
    ios: pickerColumnIosCss,
    md: pickerColumnMdCss
};
export { Datetime as ion_datetime, Picker as ion_picker, PickerColumnCmp as ion_picker_column };