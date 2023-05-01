//--------------基础信息定义--------------
const pluginName = 'acidRain';
const pluginDescribe = '酸雨';
const pluginVersion = [0, 0, 2];
const pluginOther = { "版权归属": "清漪花开" };
const pluginConfigPath = './plugins/acidRain/';
const json = {
	"nausea": {
		"time": 5,
		"buffTime": 30,
		"buffLvl": 1
	},
	"poison": {
		"time": 10,
		"buffTime": 30,
		"buffLvl": 1
	},
	"blindness": {
		"time": 30,
		"buffTime": 30,
		"buffLvl": 1
	}
}

if (!File.exists(pluginConfigPath)) {
	File.writeTo(pluginConfigPath + 'Config.json', JSON.stringify(json, null, "\t"));
}

let playerDuration = {};
let configJson = JSON.parse(File.readFrom(pluginConfigPath + 'Config.json'));

function playerMoveInspect() {
	setInterval(() => {
		let onlinePlayerList = mc.getOnlinePlayers();
		if (onlinePlayerList[0] != undefined) {
			onlinePlayerList.forEach(player => {
				if (player.inWaterOrRain) {
					if (playerDuration[player.xuid] == undefined || playerDuration[player.xuid] == 0) {
						playerDuration[player.xuid] = 1;
					} else {
						if (playerDuration[player.xuid] > configJson.nausea.time) {
							player.addEffect(9, configJson.nausea.buffTime * 20, configJson.nausea.buffLvl, false);
						}
						if (playerDuration[player.xuid] > configJson.blindness.time) {
							player.addEffect(15, configJson.blindness.buffTime * 20, configJson.blindness.buffLvl, false);
						}
						if (playerDuration[player.xuid] > configJson.poison.time) {
							player.addEffect(19, configJson.poison.buffTime * 20, configJson.poison.buffLvl, false);
						}
					}
				} else {
					playerDuration[player.xuid] = 0;
					setTimeout(() => {
						if (playerDuration[player.xuid] == 0) {
							player.removeEffect(9);
							player.removeEffect(15);
							player.removeEffect(19);
						}
					}, 1000 * 3);
				}
			});
		}
	}, 200);
}

mc.listen("onServerStarted", () => {
	playerMoveInspect();
	timeRecorder();
})

function timeRecorder() {
	setInterval(() => {
		if (playerDuration != {}) {
			for (let i in playerDuration) {
				if (playerDuration[i] != 0) {
					playerDuration[i] += 1;
				}
			}
		}
	}, 1000);
}

/**
 * 002
 * 使用LLSE的api对玩家进行buff设置.
 */