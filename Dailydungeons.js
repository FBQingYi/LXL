
const pluginName = "Dailydungeons";
const pluginsIntroduction = '日常副本!';
const pluginPath = "./plugins/Dailydungeons/";
const pluginsVersion = [1, 6, 1];
const pluginsOtherInformation = { "插件作者": "清漪花开" };
const initialConfig = {
   "副本1": {
      "pos1": [1, -60, 1, 0],//范围坐标点1
      "pos2": [100, 100, 100, 0],//范围坐标点2
      "type": "SingleDay",//副本模式（每日）
      "frequency": 1,//每人的挑战次数
      "starttime": "10:00",//可以挑战时间
      "endtime": "18:00",//结束挑战时间
      "bossuname": "zombie1",//强化生物唯一配置名
      "generatepos": [55, 10, 55, 0]//生成坐标
   }
}


if (!File.exists(pluginPath + "Config.json")) {
   File.writeTo(pluginPath + "Config.json", JSON.stringify(initialConfig, null, "\t"));
}

if (!File.exists(pluginPath + "data/data.json")) {
   File.writeTo(pluginPath + "data/data.json", JSON.stringify({}, null, "\t"));
}







/**
 * 可以和怪物强化对接
 * 指定挑战时间
 * 单日挑战次数
 * 可以圈定区域
 * 挑战开始不再接受玩家进入 
 * 对接llmoney的奖励机制
 */