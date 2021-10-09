const buffList = {"药水名":{"速度":{"英文ID":"speed","数字id":1},"急迫":{"英文ID":"haste","数字id":3},"力量":{"英文ID":"strength","数字id":5},"瞬间治疗":{"英文ID":"instant_health","数字id":6},"跳跃提升":{"英文ID":"jump_boost","数字id":8},"生命恢复":{"英文ID":"regeneration","数字id":10},"抗性提升":{"英文ID":"resistance","数字id":11},"防火":{"英文ID":"fire_resistance","数字id":12},"水下呼吸":{"英文ID":"water_breathing","数字id":13},"隐身":{"英文ID":"invisibility","数字id":14},"夜视":{"英文ID":"night_vision","数字id":16},"生命提升":{"英文ID":"health_boost","数字id":21},"伤害吸收":{"英文ID":"absorption","数字id":22},"饱和":{"英文ID":"saturation","数字id":23},"飘浮":{"英文ID":"levitation","数字id":24},"缓降":{"英文ID":"slow_falling","数字id":27}},"等级换算":{"Ⅰ":0,"Ⅱ":1,"Ⅲ":2,"Ⅳ":3,"Ⅴ":4,"Ⅵ":5},"显示等级":["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ"]}

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
        return false;
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

function QingYiLxlCmdBlockExecute(cmd, pos, isMinecart) {
    try {
        if (cmd.indexOf('give @p') != -1 && cmd.indexOf('[{') != -1 && cmd.indexOf('potion') == -1) {
            let je = cmd.split(" ")
            let player;
            let itemName = "";
            let itemEnch1 = "";
            let xuid = QingYiLxlEuclideanMetric(pos)
            if (xuid != "") {
                player = mc.getPlayer(xuid);
            }
            if (cmd.indexOf("addon") == -1) {
                itemName = "minecraft:" + je[2];
                itemEnch1 = je[5].replace(/n/g, '"n"');
            } else if (cmd.indexOf("addon") != -1 && je[5] == "addon") {
                itemName = je[2];
                itemEnch1 = je[6].replace(/n/g, '"n"');
            }
            if (itemName != "" && itemEnch1 != "") {
                SetPlayerItem(player, itemEnch1, je[3], itemName, je[4]);
            }
            return false;
        } else if (cmd.indexOf('give @p') != -1 && cmd.indexOf('[{') != -1 && cmd.indexOf('potion') != -1) {
            let je = cmd.split(" ");
            let player;
            let xuid = QingYiLxlEuclideanMetric(pos);
            if (xuid != "") {
                player = mc.getPlayer(xuid);
            }
            let itemName = "minecraft:" + je[2];
            let itemEnch1 = je[5].replace(/n/g, '"n"');
            let itemEnch = itemEnch1.replace(/l/g, '"l"');
            let potiontime = itemEnch.replace(/t/g, '"t"');
            let PotionList = JSON.parse(potiontime);
            let Ljson = [];
            let buffname = buffList["药水名"];
            let xianshi = buffList["显示等级"];
            for (let i in PotionList) {
                for (let i1 in buffname) {
                    if (buffname[i1]["数字id"] == PotionList[i].n) {
                        let Cnname = i1;
                        Ljson[i] = Cnname + " " + xianshi[parseInt(PotionList[i].l)] + " (" + PotionList[i].t + ":00)"
                    }
                }
            }
            let nbt = PotionNbt(Ljson, je[3], itemName, je[4]);
            let it = mc.newItem(nbt);
            if (player.giveItem(it)) {
                player.tell(`你获得了 ${je[3]} 个 ${je[4]}`)
            };
            nbt.destroy();
            return false;
        }
    } catch (error) {

    }
}

function PotionNbt(Ljson, potionCount, potionName, potionDIsplayName) {
    let nbt = new NbtCompound({
        "Count": new NbtByte(parseInt(potionCount)),
        "Damage": new NbtShort(0),
        "Name": new NbtString(potionName),
        "WasPickedUp": new NbtByte(0)
    })
    let nbt1 = new NbtCompound({
        "display": new NbtCompound({
            "Name": new NbtString(potionDIsplayName),
        }),
    })
    let nbt2 = new NbtList([])
    for (let i in Ljson) {
        nbt2.addTag(new NbtString(Ljson[i]));
    }
    nbt1.getTag("display").setTag("Lore", nbt2);
    nbt.setTag("tag", nbt1);
    return nbt
}

function QingYiLxlEuclideanMetric(pos) {
    let x = pos.x;
    let y = pos.y;
    let z = pos.z;
    let dim = pos.dim;
    let PlayerList = mc.getOnlinePlayers();
    let Pjson1 = {};
    let Pjson = [];
    let pdjg = "";
    for (let i in PlayerList) {
        let player = PlayerList[i];
        let playerX = player.pos.x;
        let playerY = player.pos.y;
        let playerZ = player.pos.z;
        let playerDim = player.pos.dim;
        if (playerDim == dim) {
            let xj;
            let yj;
            let zj;
            if (playerX >= x) {
                xj = (playerX - x) * 2;
            } else {
                xj = (x - playerX) * 2;
            }
            if (playerY >= y) {
                yj = (playerY - y) * 2;
            } else {
                yj = (y - playerY) * 2;
            }
            if (playerZ >= z) {
                zj = (playerZ - z) * 2;
            } else {
                zj = (z - playerZ) * 2;
            }
            let a = xj + yj + zj;
            let jieguo = Math.sqrt(a);
            Pjson1[player.xuid] = jieguo;
            Pjson[i] = jieguo;
        }
    }
    let minimum = Math.min.apply(Math, Pjson.map(function (o) { return o }));
    for (let i in Pjson1) {
        if (Pjson1[i] == minimum) {
            pdjg = i;
        }
    }
    return pdjg
}

function Eat(player, item) {
    if (item.type == "minecraft:potion") {
        let ItemNbtstring = item.getNbt().toString();
        if (ItemNbtstring.indexOf("Lore") != -1 && ItemNbtstring.indexOf(":00") != -1) {
            try {
                let ItemNbtJson = JSON.parse(ItemNbtstring);
                let Lore1 = ItemNbtJson.tag.display.Lore;
                for (let i in Lore1) {
                    let q1 = Lore1[i].split(' ');
                    let time = parseInt(q1[2].split('(')[1].split(':')[0]) * 60;
                    let buff = buffList["药水名"][q1[0]]["英文ID"];
                    let leve = buffList["等级换算"][q1[1]];
                    mc.runcmdEx('effect "' + player.name + '" ' + buff + ' ' + time + ' ' + leve + ' true');
                }
            } catch (error) {
            }
        }
    }
}

mc.listen("onEat", Eat)
mc.listen("onCmdBlockExecute", QingYiLxlCmdBlockExecute)
mc.listen("onConsoleCmd", QingyiLxlConsoleCmd)
mc.listen("onPlayerCmd", QingyiLxlPlayerCmd)
setTimeout(function () { logger.log('[INFO] [Give] >>> 加载成功，测试版本：v0.0.5'); }, 5000);