export default EventList = {
    HomeTabChange: "HomeTabChange",
    TaskUpdate: "TaskUpdate",
    TaskRead: "TaskRead",
}


let busInstane = null;// 单例实例
let busDict = {};// 相当于数据结构 busDict<string,list<fun>>
class EventBus {//订阅发布器
    constructor() {
        // 单例模式
        if (!busInstane) {
            busInstane = this;
        }
        return busInstane;
    }

    //订阅事件
    addlistener = (event, fun) => {
        if (!busDict[event]) {
            busDict[event] = [];
        }
        busDict.push(fun);
    }

    //触发事件
    dispatch = (event, data) => {
        if (!busDict[event]) {
            console.log("没人注册过这类事件");
            return;
        }
        busDict[event].map((item, index) => {
            item();
        })
    }

    //移除事件
    rmevent = (event) => {
        busDict[event] = [];
    }

    //移除事件监听
    rmlistener = (event, fun) => {
        if (!busDict[event]) {
            return;
        }

        index = -1;
        for (var i = 0; i < busDict[event].length; i++) {
            if (busDict[event][i] == fun) {
                index = i
                break;
            }
        }

        if (index != -1) {
            busDict[event].splice(index, 1);
        }
    };
}
