//--------------基础信息定义--------------
const pluginName = 'ScotoHP';
const pluginDescribe = '计分板控制生命';
const pluginVersion = [0, 0, 1];
const pluginOther = { "作者": "清漪花开" };
const path = './plugins/ScotoHP/';

if (!File.exists(path + 'Config.json')) {
    File.writeTo(path + 'Config.json', JSON.stringify({
        "command": "sthp",
        "scorename": "health"
    }, null, "\t"));
}

let ConfigJson = JSON.parse(File.readFrom(path + 'Config.json'));

mc.listen("onServerStarted", () => {
    let Command = mc.newCommand(ConfigJson.command, pluginDescribe, PermType.GameMasters);
    Command.setEnum("openAction", ["add", "remove","set"]);
    Command.mandatory("pattern", ParamType.Enum, "openAction", 1);
    Command.mandatory("Player", ParamType.Player);
    Command.mandatory("int", ParamType.Int);
    Command.overload(["Player", "pattern"]);
    Command.overload(["Player", "pattern", "int"]);
    Command.setCallback((_cmd, origin, outp, results) => {
        let playerList = results.Player;
        let playerName = "";
        playerList.forEach(player => {
            playerName += `${player.name} `;
            if (results.pattern == "set") {
                let score = player.getScore(ConfigJson.scorename);
                if (score != undefined && score >= 1) {
                    player.setMaxHealth(score);
                }
            } else if (results.pattern == "add") {
                let commint = results.int;
                if (commint >= 1) {
                    player.setMaxHealth(player.maxHealth + commint);
                }
            } else if (results.pattern == "remove") {
                let commint = results.int;
                if (commint >= 1) {
                    if (player.maxHealth - commint >= 1) {
                        player.setMaxHealth(player.maxHealth - commint);
                    }
                }
            }
        });
        outp.success(playerName+'执行成功');
    });
    Command.setup();
})