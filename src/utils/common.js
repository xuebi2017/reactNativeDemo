import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, Linking, Clipboard, NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter, ToastAndroid } from 'react-native';

import Storage from "./storage";

const MyRNModule = NativeModules.MyRNModule;
const RNBluetoothModule = NativeModules.RNBluetoothModule;
const BluetoothManagerEmitter = new NativeEventEmitter(RNBluetoothModule);

export default class Common {

    //创建一个UUID
    static newUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    //格式化时间
    static dateFormat(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //Linking提供了一个通用的接口来与传入和传出的App链接进行交互 , 可用于 跳转外部链接，打电话，发邮件，打开某个浏览器链接。
    static linking = (url) => {
        //url = "tel:110"
        console.log(url);
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('无法处理:' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => {
            console.error('跳转时出错', err)
        });
    }

    //设置剪贴板内容
    static setClipboardContent(content) {
        Clipboard.setString(content);
    }

    //获取剪贴板内容
    static getClipboardContent() {
        try {
            var content = Clipboard.getString();
            ToastAndroid.show('粘贴板的内容为:' + content, ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show(e.message, ToastAndroid.SHORT);
        }
    }

    //Unicode 转 Utf8
    static UnicodeToUtf8(unicode) {
        var uchar;
        var utf8str = "";
        var i;
        for (i = 0; i < unicode.length; i += 2) {
            uchar = (unicode[i] << 8) | unicode[i + 1];        //UNICODE为2字节编码，一次读入2个字节 
            utf8str = utf8str + String.fromCharCode(uchar);  //使用String.fromCharCode强制转换 
        }
        return utf8str;
    }

    //Utf8 转 Unicode
    static Utf8ToUnicode(strUtf8) {
        var i, j;
        var uCode;
        var temp = new Array();
        for (i = 0, j = 0; i < strUtf8.length; i++) {
            uCode = strUtf8.charCodeAt(i);
            if (uCode < 0x100) {         //ASCII字符 
                temp[j++] = 0x00;
                temp[j++] = uCode;
            } else if (uCode < 0x10000) {
                temp[j++] = (uCode >> 8) & 0xff;
                temp[j++] = uCode & 0xff;
            } else if (uCode < 0x1000000) {
                temp[j++] = (uCode >> 16) & 0xff;
                temp[j++] = (uCode >> 8) & 0xff;
                temp[j++] = uCode & 0xff;
            } else if (uCode < 0x100000000) {
                temp[j++] = (uCode >> 24) & 0xff;
                temp[j++] = (uCode >> 16) & 0xff;
                temp[j++] = (uCode >> 8) & 0xff;
                temp[j++] = uCode & 0xff;
            } else {
                break;
            }
        }
        temp.length = j;
        return temp;
    }

    /*
    //获取绑定的设备
    static GetBindDevice(callback) {
        Storage.Get("BindDevice").then((data) => {
            callback(data);
        })
    }

    //绑定一个设备，覆盖之前的
    static BindDevice(device, callback) {
        Storage.Save("BindDevice", device).then(() => {
            callback && callback();
        });
    }

    //获取所有绑定的设备
    static GetBindDeviceList(callback) {
        Storage.Get("BindDeviceList").then((data) => {
            console.log(data);
            if (data == null) {
                data = []
            }
            callback(data);
        })
    }

    //绑定设备
    static BindDeviceList(device) {
        Storage.Get("BindDeviceList").then((data) => {
            console.log(data);
            if (data == null) {
                data = []
            }

            //防止重复绑定
            let isIn = false;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == device.id) {
                    data[i].name = device.name;
                    isIn = true;
                }
            }
            if (!isIn) {
                data.push(device);
            }

            Storage.Save("BindDeviceList", data).then(() => {

            });
        })
    }

    //解除绑定
    static UnBindeDeviceList(device) {
        Storage.Get("BindDeviceList").then((data) => {
            console.log(data);
            if (data == null) return;

            //检测之前是否绑定
            let index = -1;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == device.id) {
                    index = i;
                }
            }
            if (index != -1) {
                data.splice(index, 1);
            }

            Storage.Save("BindDeviceList", data).then(() => {

            });
        })
    }
    */
};
