import React from 'react';
import { NativeModules } from 'react-native';
import { Toast, Modal } from 'antd-mobile-rn';

import Config from "../config";
import Storage from "./storage";

export default class Http {

    static BaseURL = Config.BaseURI;

    static AccessToken = null;

    static Login(userName, passWord, callback, errorCallback) {
        if (userName == '' || passWord == '') {
            Toast.fail("账号和密码必填!", 2, null, false);
            return;
        }

        let url = "/connect/token";
        var _this = this;
        let body = "";
        let params = {
            "client_id": Config.ClientID,
            "client_secret": Config.ClientSecret,
            "scope": Config.ClientScope,
            "grant_type": "password",
            "username": userName,
            "password": passWord,
        };
        for (var key in params) {
            body += key + '=' + params[key] + '&';
        }
        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            console.log("token", responseText);
            let data = JSON.parse(responseText);
            if (data.access_token == null) {
                Toast.fail("用户名或密码不正确!", 2, null, false);
                return;
            }
            _this.AccessToken = data.access_token;
            data["expires_time"] = new Date().getTime() + (data.expires_in * 1000);
            Storage.Save("UserInfo", data).then(() => {
                Storage.Save("LoginInfo", { userName: userName, passWord: passWord }).then(() => {
                    callback();
                });
            });
        }).catch((err) => {
            errorCallback || errorCallback(err);
        });
    }

    static LogOut(callback) {
        this.AccessToken = null;
        Storage.Delete("UserInfo").then(() => {
            callback();
        });
    }

    static Get(url, params, callback, errorCallback) {
        url = this.HandlerUrl(url);
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        let option = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result != null && result.code == 500) {
                Toast.fail("获取数据失败," + result.message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {
            errorCallback || errorCallback(err);
        });
    }

    static PostAsJson(url, params, callback, errorCallback) {
        url = this.HandlerUrl(url);

        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: JSON.stringify(params)
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result != null && result.code == 500) {
                Toast.fail("提交数据失败," + result.message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {
            errorCallback || errorCallback(err);
        });
    }

    static PostAsFormData(url, params, callback, errorCallback) {
        url = this.HandlerUrl(url);

        let body = "";
        for (var key in params) {
            body += key + '=' + params[key] + '&';
        }

        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: body
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result != null && result.code == 500) {
                Toast.fail("提交数据失败," + result.message, 2, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {
            errorCallback || errorCallback(err);
        });
    }

    static UploadImg(url, images, callback, errorCallback) {
        url = this.HandlerUrl(url);

        if (images == null || images.length == 0) {
            callback([]);
            return;
        }

        let formData = new FormData();
        for (var i = 0; i < images.length; i++) {
            formData.append("file", { uri: images[i].url, name: i + ".jpg", type: 'image/jpeg' });
        }

        let option = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + this.AccessToken,
            },
            body: formData
        };

        fetch(this.BaseURL + url, option).then((response) => response.text()).then((responseText) => {
            this.Log("response from " + url + " " + responseText);
            if (responseText == '') {
                return;
            }
            var result = JSON.parse(responseText);
            if (result != null && result.code == 500) {
                Toast.fail("上传图片失败," + result.message, 3, null, false);
                return;
            }
            callback(result);
        }).catch((err) => {
            errorCallback || errorCallback(err);
        });
    }

    static CheckUpdate(showAlert) {
        NativeModules.MyRNModule.getVersionInfo((d) => {
            Config.AppVersionCode = d.versionCode;
            Config.AppVersionName = d.versionName;

            let url = Config.AppCheckUpdateURL + "?appCode=" + Config.AppID + "&appVersion=" + d.versionCode;
            let option = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.AccessToken,
                },
            };

            fetch(url, option).then((response) => response.text()).then((responseText) => {
                this.Log("response from " + url + " " + responseText);
                if (responseText == '') {
                    return;
                }
                var result = JSON.parse(responseText);
                if (result == null) {
                    if (showAlert) {
                        Toast.info("已经是最新版本!", 2, null, false);
                    }
                    return;
                }
                if (result.code == 500) {
                    Toast.fail("获取数据失败," + result.message, 3, null, false);
                    return;
                }
                Modal.alert('发现新版本 ver:' + result.VersionName, "更新说明:" + result.UpdateContent, [
                    { text: '立即更新', onPress: () => { NativeModules.UpgradeModule.upgrade(result.DownloadUrl) } },
                    { text: '取消', onPress: () => { } },
                ]);
            }).catch((err) => {
            });
        });
    }

    static HandlerUrl(url) {
        if (url.search("/v{version}/") != -1) {
            url = url.replace("/v{version}/", "/v" + Config.ApiVersion + "/")
        }
        return url;
    }

    static Log(message) {
        if (Config.AppIsDebug) {
            console.log(message);
        }
    }
}
