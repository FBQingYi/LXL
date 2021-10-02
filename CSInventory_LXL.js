var path = './plugins/CSInventory/'
var version = '0.0.5'
if (!File.exists(path)) {
    let profile = { "玩家数据储存路径": "../PlayerData/Inventory/", "是否同步背包": "是", "是否同步末影箱": "是", "是否同步玩家属性": "是", "是否同步玩家BUFF": "是", "是否在控制台输出日志": "否", "另一服务器IP": "127.0.0.1", "另一服务器端口": 19132, "定时储存(分)": 5 }
    File.mkdir(path);
    File.mkdir(path+'logs/');
    File.writeTo(path + 'profile.json', JSON.stringify(profile, null, "\t"));
    setTimeout(function () { log(`[ERRON] [跨服背包] 第一次开服，已生成配置文件，请修改后再次开服，路径${path}profile.json`) }, 1000 * 6)
} else {
    var profile = JSON.parse(File.readFrom(path + 'profile.json'));
    var PIDataPath = profile["玩家数据储存路径"];
    var TimingData = profile["定时储存(分)"];
    var InventoryOption = profile["是否同步背包"] == "是";
    var EInventoryOption = profile["是否同步末影箱"] == "是";
    var AttributesOption = profile["是否同步玩家属性"] == "是";
    var ActiveEffectsOption = profile["是否同步玩家BUFF"] == "是";
    var ServerIp = profile["另一服务器IP"];
    var ServerPort = profile["另一服务器端口"];
    if (!File.exists(PIDataPath)) {
        File.mkdir(PIDataPath);
    }
    QingYiLxlTiming()
    logger.setConsole(profile["是否在控制台输出日志"] == "是");
    setTimeout(function () { log(`[INFO] [跨服背包] 载入成功！玩家数据储存路径为：${PIDataPath}`); log(`[INFO] [跨服背包] 当前版本：${version}`) }, 1000 * 6)
}

function QingYiLxlItemTrsLeft(Player) {
    let playerNbt = Player.getNbt();
    let playerXuid = Player.xuid;
    let playerName = Player.name;
    WritePlayerBNbt(playerName, playerXuid, playerNbt)
}

function WritePlayerBNbt(name, xuid, playerNbt) {
    let Wpath = PIDataPath + xuid;
    let NNbt = new NbtCompound({});
    let Effects = playerNbt.getTag("ActiveEffects");
    NNbt.setTag("Inventory", playerNbt.getTag("Inventory"));
    NNbt.setTag("EInventory", playerNbt.getTag("EnderChestInventory"));
    NNbt.setTag("Armor", playerNbt.getTag("Armor"));
    NNbt.setTag("Offhand", playerNbt.getTag("Offhand"));
    NNbt.setTag("Attributes", playerNbt.getTag("Attributes"));
    if (Effects != undefined) {
        NNbt.setTag("ActiveEffects", playerNbt.getTag("ActiveEffects"));
    }
    let playerBnbt = NNbt.toBinaryNBT();
    NNbt.destroy()
    let fl = new File(Wpath, file.WriteMode, true)
    if (fl.writeSync(playerBnbt)) {
        let logg = `[${system.getTimeStr()} 跨服背包] [INFO] 玩家 ${name}  数据写入储存成功！`;
        logger.log(logg);
        QingYiLxlLogWrite(logg);
    } else {
        let logg = `[${system.getTimeStr()} 跨服背包] [error] 玩家 ${name}  数据写入储存失败！`;
        logger.log(logg);
        QingYiLxlLogWrite(logg);
    }
    fl.close();

}

function QingYiLxlItemTrsJoin(Player) {
    let xuid = Player.xuid;
    let name = Player.name;
    let playernbt = Player.getNbt();
    let Rpath = PIDataPath + xuid;
    if (File.exists(Rpath)) {
        let fl = new File(Rpath, file.ReadMode, true);
        let PlayerBNbt = fl.readAllSync();
        fl.close();
        if (PlayerBNbt != undefined) {
            let Pnbt = NBT.parseBinaryNBT(PlayerBNbt);
            let Effects = Pnbt.getTag("ActiveEffects");
            if (InventoryOption) {
                playernbt.setTag("Inventory", Pnbt.getTag("Inventory"));
                playernbt.setTag("Armor", Pnbt.getTag("Armor"));
                playernbt.setTag("Offhand", Pnbt.getTag("Offhand"));
            }
            if (EInventoryOption) {
                playernbt.setTag("EnderChestInventory", Pnbt.getTag("EInventory"));
            }
            if (AttributesOption) {
                playernbt.setTag("Attributes", Pnbt.getTag("Attributes"));
            }
            if (Effects != undefined && ActiveEffectsOption) {
                playernbt.setTag("ActiveEffects", Pnbt.getTag("ActiveEffects"));
            }
            if (Player.setNbt(playernbt)) {
                playernbt.destroy();
                Pnbt.destroy();
                let logg = `[${system.getTimeStr()} 跨服背包] [INFO] 玩家 ${name} 数据同步成功！`;
                logger.log(logg);
                QingYiLxlLogWrite(logg);
            };
            Player.refreshItems()
        }
    } else {
        let logg = `[${system.getTimeStr()} 跨服背包] 没找到玩家 ${name} 的数据，同步终止！`;
        logger.log(logg);
        QingYiLxlLogWrite(logg);
    }

}

function QingYiLxlTiming() {
    setTimeout(function () {
        QingYiLxlTiming();
        let playerList = mc.getOnlinePlayers();
        if (playerList != []) {
            for (let i in playerList) {
                let Player = playerList[i];
                let playerNbt = Player.getNbt();
                let playerXuid = Player.xuid;
                let playerName = Player.name;
                WritePlayerBNbt(playerName, playerXuid, playerNbt)
            }
        }
    }, 60000 * TimingData);
}

function QingYiLxlLogWrite(text) {
    let LogPath = `./plugins/CSInventory/logs/CSInventoryLog-${system.getTimeStr().substr(0, 10)}.txt`;
    File.writeLine(LogPath, text);
}

function QingYiLxlPlayerCmd(player, args) {
    player.transServer(ServerIp, ServerPort);
}

mc.regPlayerCmd('tr', '跨服传送', QingYiLxlPlayerCmd)
mc.listen("onJoin", QingYiLxlItemTrsJoin)
mc.listen("onLeft", QingYiLxlItemTrsLeft)