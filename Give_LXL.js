function QingyiLxlPlayerCmd(player, cmd) {
    if (cmd.indexOf("give") != -1 && player.isOP() && cmd.indexOf("[{") != -1) {
        try {
            let itemName = "";
            let itemEnch1 = "";
            let je = cmd.split(" ");
            let je1 = cmd.split('"');
            if (GetPlayer(je[1]) != "" || GetPlayer(je1[1]) != "" || je[1] == "@s" || je[1] == "@a") {
                if (cmd.indexOf("addon") == -1) {
                    itemName = "minecraft:" + je[2];
                    itemEnch1 = je[5].replace(/n/g, '"n"');
                } else if (cmd.indexOf("addon") != -1 && je[5] == "addon") {
                    itemName = je[2];
                    itemEnch1 = je[6].replace(/n/g, '"n"');
                }
                if (itemName != "" && itemEnch1 != "") {
                    if (je[1] == "@s") {
                        SetPlayerItem(player, itemEnch1, je[3], itemName, je[4]);
                    } else if (je[1] == "@a") {
                        let playerList = mc.getOnlinePlayers();
                        for (let i in playerList) {
                            SetPlayerItem(playerList[i], itemEnch1, je[3], itemName, je[4]);
                        }
                        return false;
                    } else if (cmd.indexOf('"') != -1) {
                        let je1 = cmd.split('"');
                        let content = je1[2].split(" ");
                        let player1 = GetPlayer(je1[1]);
                        if (player1 != "") {
                            if (cmd.indexOf("addon") == -1) {
                                itemName = "minecraft:" + content[1];
                                itemEnch1 = content[4].replace(/n/g, '"n"');
                            } else if (cmd.indexOf("addon") != -1 && content[4] == "addon") {
                                itemName = content[1];
                                itemEnch1 = content[5].replace(/n/g, '"n"');
                            }
                            if (itemName != "" && itemEnch1 != "") {
                                SetPlayerItem(player1, itemEnch1, content[2], itemName, content[3]);
                            }
                        } else {
                            player.tell(`玩家 ${je1[1]} 不在线！请注意格式，有空格的玩家请加上""`);
                        }
                        return false;
                    } else {
                        let player2 = GetPlayer(je[1]);
                        if (player2 != "") {
                            SetPlayerItem(player2, itemEnch1, je[3], itemName, je[4]);
                        } else {
                            player.tell(`玩家 ${je1[1]} 不在线！请注意格式，有空格的玩家请加上""`);
                        }
                        return false;
                    }
                }
            }
        } catch (err) {
            logger.log(`[INFO] [Give] >>> ${err}`)
        }
    }
}

function QingyiLxlConsoleCmd(cmd) {
    if (cmd.indexOf("give") != -1 && cmd.indexOf("[{") != -1 && cmd.indexOf('"') != -1) {
        let name = cmd.split('"');
        let je = name[2].split(' ');
        let player = GetPlayer(name[1]);
        if (player != "") {
            try {
                let itemName = "";
                let itemEnch1 = "";
                if (cmd.indexOf("addon") == -1) {
                    itemName = "minecraft:" + je[1];
                    itemEnch1 = je[4].replace(/n/g, '"n"');
                } else if (cmd.indexOf("addon") != -1 && je[4] == "addon") {
                    itemName = je[1];
                    itemEnch1 = je[5].replace(/n/g, '"n"');
                }
                if (itemName != "" && itemEnch1 != "") {
                    let getresult = SetPlayerItem(player, itemEnch1, je[2], itemName, je[3]);
                    if (getresult) {
                        logger.log(`玩家 ${cmd.split('"')[1]} 给予成功！`)
                    }
                    return false;
                }
            } catch (err) {
                logger.log(`[INFO] [Give] >>> ${err}`)
            }
        } else {
            logger.log(`玩家 ${cmd.split('"')[1]} 不在线！`)
            return false;
        }
    }
}

function GetPlayer(name) {
    let playerList = mc.getOnlinePlayers();
    let result = "";
    for (let i in playerList) {
        let player = playerList[i];
        if (player.Name = name) {
            result = player;
        }
    }
    return result;
}

function SetPlayerItem(player, itemEnch1, itemCount, itemName, itemDIsplayName) {
    let itemEnch = itemEnch1.replace(/l/g, '"l"');
    itemEnch = JSON.parse(itemEnch);
    let nbt = NewItemNbt(itemCount, itemName, itemDIsplayName, itemEnch);
    let it = mc.newItem(nbt);
    if (player.giveItem(it)) {
        player.tell(`你获得了 ${itemCount} 个 ${itemDIsplayName}`)
        return true;
    };
    nbt.destroy();
}

function NewItemNbt(itemCount, itemName, itemDIsplayName, itemEnch) {
    let nbt = new NbtCompound({
        "Count": new NbtByte(parseInt(itemCount)),
        "Damage": new NbtShort(0),
        "Name": new NbtString(itemName),
        "WasPickedUp": new NbtByte(0)
    })
    let nbt1 = new NbtCompound({
        "Damage": new NbtInt(0),
        "RepairCost": new NbtInt(1),
        "display": new NbtCompound({
            "Name": new NbtString(itemDIsplayName)
        }),
        "ench": new NbtList([]),
    })
    for (let i = 0; i < itemEnch.length; i++) {
        let nbt2 = new NbtCompound({
            "id": new NbtShort(parseInt(itemEnch[i].n)),
            "lvl": new NbtShort(parseInt(itemEnch[i].l))
        })
        let ench = nbt1.getTag("ench");
        ench.addTag(nbt2);
    }
    nbt.setTag("tag", nbt1);
    return nbt
}

mc.listen("onConsoleCmd", QingyiLxlConsoleCmd)
mc.listen("onPlayerCmd", QingyiLxlPlayerCmd)
setTimeout(function () { logger.log('[INFO] [Give] >>> 加载成功，测试版本：v0.0.3'); }, 5000);