//-----基础信息定义
const pluginName = "randommsg";
const PluginsIntroduction = '随机发送内容!';
const pluginPath = "./plugins/randommsg/";
const PluginsVersion = [0, 0, 1];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const ConfigData = { "joinMsg": ["欢迎加入服务器", "欢迎进入服务器", "啊,玩家{p}进入了我的世界"], "randomMsg": ["每日三省吾身，吃否，谁否，玩否", "今天的快乐也许就是永远的快乐！"], "mode": 0, "title": "系统", "time": 30 };

//------插件信息注册
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation)

if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigData, null, "\t"));
}
let ConfigJson = JSON.parse(File.readFrom(pluginPath + "Config.json"));

mc.listen("onJoin", (player) => {
    let joinMsgList = ConfigJson.joinMsg;
    let joinMax = joinMsgList.length;
    let Msg = joinMsgList[specifiedRangeRandomNumber(0, joinMax)].replace(/{p}/g, player.name);
    setTimeout(() => {
        if (ConfigJson.mode == 0) {
            mc.broadcast(Msg);
        } else if (ConfigJson.mode == 1) {
            let onlinePlayerList = mc.getOnlinePlayers();
            if (JSON.stringify(onlinePlayerList) != "[]") {
                onlinePlayerList.forEach(player => {
                    player.sendToast(ConfigJson.title, Msg)
                });
            }
        }

    }, 1000);
})

mc.listen("onServerStarted", () => {
    setInterval(() => {
        let onlinePlayerList = mc.getOnlinePlayers();
        if (JSON.stringify(onlinePlayerList) != "[]") {
            let randomMsgList = ConfigJson.randomMsg;
            let randomMsgMax = randomMsgList.length;
            let Msg = randomMsgList[specifiedRangeRandomNumber(0, randomMsgMax + 1)];
            if (ConfigJson.mode == 0) {
                mc.broadcast(Msg);
            } else if (ConfigJson.mode == 1) {
                onlinePlayerList.forEach(player => {
                    player.sendToast(ConfigJson.title, Msg)
                });

            }
        }
    }, 1000 * 60 * ConfigJson.time);
})

/**
 * 取指定范围随机数函数
 * @param {int} min 最小值
 * @param {int} max 最大值
 * @returns 一个范围内的数值
 */
function specifiedRangeRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}