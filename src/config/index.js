export default class Config {

    //决定日志是否输出
    static AppIsDebug = true;

    //更新应用相关
    static AppID = "001";
    static AppVersion = 0;
    static AppVersionName = "0.0.0";
    static AppCheckUpdateURL = "http://api.law.demo.jinhesoft.cn/api/system/checkupdate";

    //获取数据相关
    static BaseURI = "http://192.168.10.111:10087";
    static ClientID = '123';
    static ClientSecret = '456';
    static ClientScope = 'api1';
    static ApiVersion = "1";

    //后天任务相关
    static IsRunTask = false;
    static TaskIntervalTime = 1 * 60 * 1000;

    //引导页面图片
    static LoadPage = [
        { img: require('../wwwroot/image/load1.jpg') },
        { img: require('../wwwroot/image/load2.jpg') },
        { img: require('../wwwroot/image/load3.jpg') },
    ];

    //登录图标和背景
    static Logo = { img: require('../wwwroot/image/logo.png') };
    static LoginBg = { img: require('../wwwroot/image/login.jpg') };

    //默认图片
    static DefaultImage = { img: require('../wwwroot/image/default.jpg') }

    //测试用的用户名密码
    static TestUserName = "admin";
    static TestPassword = "123";

    //主背景色 灰色
    static BackgroundColor = "#F3F3F3";
    static MainBlue = "#18B4FF";
    static MainGreen = "#64D4D2";


    
    //当前登录用户
    static CurrentUser = {
        "userID": "User001",
        "normalizedUserName": "admin",
        "nickName": "管理员",
        "sex": 0,
        "state": 0,
        "phoneNumber": "110",
        "normalizedEmail": "",
    };

    //当前用户的用户组
    static UserTeam = {
        "teamId": "001",
        "name": "name",
        "regionCode": "340000000000"
    }
}