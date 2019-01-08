import types from '../types';

// 模拟用户信息
let user = {
    name: 'zhangsan',
    age: 24,
}

export function login() {
    console.log('登录方法');
    return dispatch => {
        dispatch(isLogining());
        let result = fetch('https://www.baidu.com/')
            .then((res) => {
                dispatch(loginSuccess(true, user));
            }).catch((e) => {
                dispatch(loginError(false));
            })
    }
}

function isLogining() {
    return {
        type: types.Login_Doing
    }
}

function loginSuccess(isSuccess, user) {
    console.log('success');
    return {
        type: types.Login_Success,
        user: user,
    }
}

function loginError(isSuccess) {
    console.log('error');
    return {
        type: types.Login_Error,
    }
}