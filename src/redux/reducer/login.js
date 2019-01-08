import types from '../types';

const initState = {
    status: '点击登录',
    isSuccess: false,
    user: null,
}

export default (state = initState, action) => {
    switch (action.type) {
        case types.Login_Doing:
            return {
                ...state,
                status: '正在登陆',
                isSuccess: false,
                user: null,
            }
            break;
        case types.Login_Success:
            return {
                ...state,
                status: '登陆成功',
                isSuccess: true,
                user: action.user,
            }
            break;
        case types.Login_Error:
            return {
                ...state,
                status: '登录出错',
                isSuccess: true,
                user: null,
            }
            break;
        default:
            console.log("unknow action in login", action);
            return state;
    }
}