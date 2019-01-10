import React, { AsyncStorage } from 'react-native';

export default class Storage {

    static Get(key) {//获取
        return AsyncStorage.getItem(key);
    }

    static Save(key, obj) {//保存
        return AsyncStorage.setItem(key, JSON.stringify(obj));
    }

    static Update(key, obj) {//更新
        return Storage.get(key).then((item) => {
            obj = typeof obj === 'string' ? obj : Object.assign({}, item, obj);
            return AsyncStorage.setItem(key, JSON.stringify(obj));
        });
    }

    static Delete(key) {//删除
        return AsyncStorage.removeItem(key);
    }

    static Clear(callback) {//清空本地存储
        AsyncStorage.clear().then(error => {
            if (error) {
                console.log('清除失败', error)
            } else {
                console.log('本地存储已清除')
            }
            callback && callback();
        })
    }
}
