mc.listen("onPlayerCmd", (player1, cmd) => {
    if (player1.isOP() && cmd == 'ireset') {
        /*let item = player1.getHand();
        let nbt = item.getNbt();
        //log(nbt.toString())
        log(item.type)*/
        let onlinePlayerList = mc.getOnlinePlayers();
        onlinePlayerList.forEach(player => {
            let playerNbt = player.getNbt();
            let playerNbtAttributes = playerNbt.getTag("Attributes");
            for (let i = 0; i < playerNbtAttributes.getSize(); i++) {
                let playerNbtAttributesObj = playerNbtAttributes.getTag(i);
                if (playerNbtAttributesObj.getTag("Name") == "minecraft:health") {
                    playerNbtAttributesObj.setFloat("Base", 20);
                    playerNbtAttributesObj.setFloat("Current", 20);
                    playerNbtAttributesObj.setFloat("DefaultMax", 20);
                    playerNbtAttributesObj.setFloat("Max", 20);
                }
            }
            player.setNbt(playerNbt);
        });
    }
});

const StrengthenItemsJson = {
    "weapon": [
        "minecraft:wooden_sword",
        "minecraft:stone_sword",
        "minecraft:iron_sword",
        "minecraft:golden_sword",
        "minecraft:diamond_sword",
        "minecraft:netherite_sword"
    ],
    "armor": ["minecraft:leather_helmet", "minecraft:leather_chestplate", "minecraft:leather_leggings", "minecraft:leather_boots", "minecraft:chainmail_helmet", "minecraft:chainmail_chestplate", "minecraft:chainmail_leggings", "minecraft:chainmail_boots", "minecraft:iron_helmet", "minecraft:iron_chestplate", "minecraft:iron_leggings", "minecraft:iron_boots", "minecraft:golden_helmet", "minecraft:golden_chestplate", "minecraft:golden_leggings", "minecraft:golden_boots", "minecraft:diamond_helmet", "minecraft:diamond_chestplate", "minecraft:diamond_leggings", "minecraft:diamond_boots", "minecraft:netherite_helmet", "minecraft:netherite_chestplate", "minecraft:netherite_leggings", "minecraft:netherite_boots"]
};
const ComparisonTable = [{}, { "name": "Ⅰ", "Weapon": 1, "Armor": 1 }, { "name": "Ⅱ", "Weapon": 2, "Armor": 3 }, { "name": "Ⅲ", "Weapon": 3, "Armor": 5 }, { "name": "Ⅳ", "Weapon": 4, "Armor": 10 }, { "name": "终极", "Weapon": 5, "Armor": 20 }];
const pluginName = "Intensify";
const pluginPath = "./plugins/Intensify/";
let db = new KVDatabase(pluginPath + "db")

i18n.load(pluginPath + "language/language.json", "en", {
    "zh_CN": {
        "StrengtheningReel1": "§3一级强化卷轴",
        "StrengtheningReel1explain": JSON.stringify(["§2-------介绍-------", "§3一级强化卷轴", "可用于:原始装备", "§6使用效果:装备变为一阶", "-------====-------", "§3一阶装备:", "§2护甲类装备:+1 生命", "§4攻击类武器:+1 攻击", "PS:加攻击是指在攻击时\n对目标造成额外的真实伤害!"]),
        "StrengtheningReel2": "§9二级强化卷轴",
        "StrengtheningReel2explain": JSON.stringify(["§2-------介绍-------", "§9二级强化卷轴", "可用于:一阶装备", "§6使用效果:装备变为二阶", "-------====-------", "§9二阶装备:", "§2护甲类装备:+3 生命", "§4攻击类武器:+2 攻击", "PS:加攻击是指在攻击时\n对目标造成额外的真实伤害!"]),
        "StrengtheningReel3": "§1三级强化卷轴",
        "StrengtheningReel3explain": JSON.stringify(["§2-------介绍-------", "§1三级强化卷轴", "可用于:二阶装备", "§6使用效果:装备变为三阶", "-------====-------", "§1三阶装备:", "§2护甲类装备:+5 生命", "§4攻击类武器:+3 攻击", "PS:加攻击是指在攻击时\n对目标造成额外的真实伤害!"]),
        "StrengtheningReel4": "§4四级强化卷轴",
        "StrengtheningReel4explain": JSON.stringify(["§2-------介绍-------", "§4四级强化卷轴", "可用于:三阶装备", "§6使用效果:装备变为四阶", "-------====-------", "§4四阶装备:", "§2护甲类装备:+10 生命", "§4攻击类武器:+4 攻击", "PS:加攻击是指在攻击时\n对目标造成额外的真实伤害!"]),
        "StrengtheningReel5": "§6终极强化卷轴",
        "StrengtheningReel5explain": JSON.stringify(["§2-------介绍-------", "§6终极强化卷轴", "可用于:四阶装备", "§6使用效果:装备变为终极", "-------====-------", "§6终极装备:", "§2护甲类装备:+20 生命", "§4攻击类武器:+5 攻击", "PS:加攻击是指在攻击时\n对目标造成额外的真实伤害!"]),
        "EquipmentWeapon": JSON.stringify(["§2-------==属性==-------", "§3{0} 阶武器", "§4额外伤害:+{1}", "§6其他效果:伤害全部变为真实伤害!", "-------锻造信息-------", "锻造玩家:{2}", "锻造时间:{3}"]),
        "EquipmentArmor": JSON.stringify(["§2-------==属性==-------", "§3{0} 阶护具", "§4生命上限:+{1}", "-------锻造信息-------", "锻造玩家:{2}", "锻造时间:{3}"])
    },
    "en": {
        "StrengtheningReel1": "§3Primary strengthening reel",
        "StrengtheningReel1explain": JSON.stringify(["§2-------=introduce=-------", "§3Primary strengthening reel", "Available for: original equipment", "§6Use effect: equipment becomes first level", "-------====-------", "§3First level equipment:", "§2Armor equipment:+1 HP", "§4Attack weapons:+1 attack", "PS: Adding an attack means to cause extra real damage \nto the target when attacking!"]),
        "StrengtheningReel2": "§9Secondary strengthening reel",
        "StrengtheningReel2explain": JSON.stringify(["§2-------=introduce=-------", "§9Secondary strengthening reel", "Can be used for: Level 1 equipment", "§6Use effect: equipment becomes second level", "-------====-------", "§9Second level equipment:", "§2Armor equipment:+3 HP", "§4Attack weapons:+2 attack", "PS: Adding an attack means to cause extra real damage\n to the target when attacking!"]),
        "StrengtheningReel3": "§1Three level strengthening reel",
        "StrengtheningReel3explain": JSON.stringify(["§2-------=introduce=-------", "§1Three level strengthening reel", "Can be used for: second level equipment", "§6Use effect: equipment becomes three Level", "-------====-------", "§1Third level equipment:", "§2Armor equipment:+5 HP", "§4Attack weapons:+3 attack", "PS: Adding an attack means to cause extra real damage \nto the target when attacking!"]),
        "StrengtheningReel4": "§4Four level strengthening reel",
        "StrengtheningReel4explain": JSON.stringify(["§2-------=introduce=-------", "§4Four level strengthening reel", "Can be used for: three level equipment", "§6Use effect: equipment becomes four Level", "-------====-------", "§4Fourth level equipment:", "§2Armor equipment:+10 HP", "§4Attack weapons:+4 attack", "PS: Adding an attack means to cause extra real damage \nto the target when attacking!"]),
        "StrengtheningReel5": "§6Ultimate strengthening scroll",
        "StrengtheningReel5explain": JSON.stringify(["§2-------=introduce=-------", "§6Ultimate strengthening scroll", "Can be used for: four level equipment", "§6Use effect: equipment becomes the ultimate", "-------====-------", "§6THE ULTIMATE GEAR:", "§2Armor equipment:+20 HP", "§4Attack weapons:+5 attack", "PS: Adding an attack means to cause extra real damage\n to the target when attacking!"]),
        "EquipmentWeapon": JSON.stringify(["§2-------==attribute==-------", "§3{0} stratum arms", "§4Additional damage:+{1}", "§6Other effects: all the damage becomes real damage!", "-------Forging information-------", "Forging Players:{2}", "Forging time:{3}"]),
        "EquipmentArmor": JSON.stringify(["§2-------==attribute==-------", "§3{0} stratum protective clothing", "§4Maximum Life:+{1}", "-------Forging information-------", "Forging Players:{2}", "Forging time:{3}"])
    }
});

/**
 * 玩家破坏方块事件监听.
 * 主要用于判断玩家是否破坏的是石头.
 * 然后再通过随机数判断是否给强化卷轴.
 */
mc.listen("onDestroyBlock", (player, block) => {
    if (block.type == "minecraft:stone") {
        if (specifiedRangeRandomNumber(0, 100) == 51) {
            let pos = block.pos;
            newItem = mc.newItem(generateNewNbt("intensify", 1, i18n.trl(player.langCode, "StrengtheningReel1",)));
            newItem.setLore(JSON.parse(i18n.trl(player.langCode, "StrengtheningReel1explain",)))
            mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid)
        }
    }
});

/**
 * 操作容器监听.
 * 主要用于强化卷轴合成升级.
 */
mc.listen("onContainerChange", (player, block, _slotNum, _oldItem, _newItem) => {
    if (block.type == "minecraft:dropper") {
        let Container = block.getContainer();
        let item1 = upgradeItem(Container.getItem(0));
        if (item1.boolean && item1.type == "intensify") {
            if (item1.lvl == 1) {
                equipmentStrengthening(Container, 1, item1, player);
                synthesisGenerate(Container, item1, player, 1, 2, 2, "StrengtheningReel2", "StrengtheningReel2explain");
            } else if (item1.lvl == 2) {
                equipmentStrengthening(Container, 2, item1, player);
                synthesisGenerate(Container, item1, player, 3, 6, 3, "StrengtheningReel3", "StrengtheningReel3explain");
            } else if (item1.lvl == 3) {
                equipmentStrengthening(Container, 3, item1, player);
                synthesisGenerate(Container, item1, player, 4, 8, 4, "StrengtheningReel4", "StrengtheningReel4explain");
            } else if (item1.lvl == 4) {
                equipmentStrengthening(Container, 4, item1, player);
                synthesisGenerate(Container, item1, player, 2, 7, 5, "StrengtheningReel5", "StrengtheningReel5explain");
            } else if (item1.lvl == 5) {
                equipmentStrengthening(Container, 5, item1, player);
            }
        }
    }
});

/**
 * 实体受伤事件监听.
 * 用来处理玩家手持强化道具攻击伤害.
 */
mc.listen("onMobHurt", (mob, source, damage, _cause) => {
    if (source != undefined && source.isPlayer()) {
        let player = source.toPlayer();
        let playerHanditem = player.getHand();
        let itemInformation = upgradeItem(playerHanditem);
        if (itemInformation.boolean && itemInformation.type == "Weapon") {
            let Newdamage = ComparisonTable[parseInt(playerHanditem.getNbt().getTag("tag").getTag("addon").getTag("lvl").toString())].Weapon;
            mob.hurt(Newdamage + damage, 2)
            return false;
        }
    }
});

/**
 * 服务器启动事件监听.
 * 主要用来处理玩家穿戴装备加减血的问题.
 */
mc.listen("onServerStarted", () => {
    setInterval(() => {
        let onlinePlayerList = mc.getOnlinePlayers();
        if (JSON.stringify(onlinePlayerList) != "[]") {
            onlinePlayerList.forEach(player => {
                let HP = 0;
                let armorContainer = player.getArmor();
                let containerAllList = armorContainer.getAllItems();
                containerAllList.forEach(item => {
                    if (item.name != "") {
                        let itemInformation = upgradeItem(item);
                        if (itemInformation.boolean) {
                            HP += ComparisonTable[parseInt(itemInformation.lvl)].Armor;
                        }
                    }
                });
                let playerHPData = db.get(player.xuid);
                if (playerHPData == undefined) {
                    db.set(player.xuid, 0)
                }
                if (playerHPData > HP) {
                    setPlayerHP(player, playerHPData - HP, "remove");
                    db.set(player.xuid, HP)
                } else if (db.get(player.xuid) < HP) {
                    setPlayerHP(player, HP - playerHPData, "add");
                    db.set(player.xuid, HP)
                }
            });
        }
    }, 1000);
});

/**
 * 判断是否是升级物品
 * @param {item} item 物品对象
 * @returns 物品是否是升级物品及相关信息
 */
function upgradeItem(item) {
    let bool = { "boolean": false };
    if (item.name != "") {
        let handItemNbt = item.getNbt();
        let handItemNbtTag = handItemNbt.getTag("tag");
        if (handItemNbtTag != undefined) {
            let handItemNbtTagAddon = handItemNbtTag.getTag("addon");
            if (handItemNbtTagAddon != undefined) {
                bool = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "lvl": handItemNbtTagAddon.getTag("lvl").toString() };
            }
        }
    }
    return bool;
}

/**
 * 发送消息给玩家
 * @param {player} player 玩家对象
 * @param {string} key 语言文档key
 * @param {Array} list 格式化内容
 */
function sengTell(player, key, list) {
    let args = Array.from(list);
    let msg = i18n.trl(player.langCode, key, ...args)
    player.tell(`[${pluginName}] ${msg}`);
}

/**
 * 取指定范围随机数函数
 * @param {int} min 最小值
 * @param {int} max 最大值
 * @returns 一个范围内的数值
 */
function specifiedRangeRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成一个强化卷轴nbt
 * @param {string} type 强化卷轴类型
 * @param {int} lvl 强化卷轴等级
 * @param {string} name 强化卷轴名称
 * @returns 新的NBT
 */
function generateNewNbt(type, lvl, name) {
    let nbt1 = new NbtCompound({
        "Damage": new NbtInt(0),
        "RepairCost": new NbtInt(1),
        "display": new NbtCompound({
            "Name": new NbtString(name)
        }),
        "ench": new NbtList([]),
        "addon": new NbtCompound({
            "type": new NbtString(type),
            "lvl": new NbtInt(lvl)
        })
    })
    let NewItem = mc.newItem("minecraft:field_masoned_banner_pattern", 1);
    let nbt = NewItem.getNbt();
    nbt.setTag("tag", nbt1)
    return nbt;
}

/**
 * 强化卷轴合成处理
 * @param {Container} Container 容器对象
 * @param {json} item1 第一格物品json
 * @param {player} player 玩家对象
 * @param {int} index1 容器序号1
 * @param {int} index2 容器序号2
 * @param {int} lvl 强化后等级
 * @param {string} language1 语言文件1
 * @param {string} language2 语言文件2
 */
function synthesisGenerate(Container, item1, player, index1, index2, lvl, language1, language2) {
    let item2 = upgradeItem(Container.getItem(index1));
    let item3 = upgradeItem(Container.getItem(index2));
    if (item1.boolean && item2.boolean && item3.boolean) {
        if (item1.type == item2.type && item2.type == item3.type) {
            if (item1.lvl == item2.lvl && item2.lvl == item3.lvl && item3.lvl == lvl - 1) {
                setTimeout(() => {
                    Container.removeItem(0, 1);
                    Container.removeItem(index1, 1);
                    Container.removeItem(index2, 1);
                    newItem = mc.newItem(generateNewNbt("intensify", lvl, i18n.trl(player.langCode, language1,)));
                    newItem.setLore(JSON.parse(i18n.trl(player.langCode, language2,)))
                    Container.setItem(0, newItem);
                }, 100);
            }
        }
    }
}

/**
 * 物品升级使用强化卷轴升级
 * @param {Container} Container 容器对象
 * @param {int} TargetLevel 目标等级
 * @param {Json} item1 物品1数据
 * @param {player} player 玩家对象
 */
function equipmentStrengthening(Container, TargetLevel, item1, player) {
    let item2 = upgradeItem(Container.getItem(2));
    let item = Container.getItem(2);
    if (!item2.boolean && item.name != "" && JSON.stringify(StrengthenItemsJson).indexOf(item.type) != -1) {
        if (item1.lvl == 1) {
            setTimeout(() => {
                let DescriptionText, nbt
                if (StrengthenItemsJson.weapon.indexOf(item.type) != -1) {
                    DescriptionText = i18n.trl(player.langCode, "EquipmentWeapon", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Weapon, player.name, system.getTimeStr());
                    nbt = setEquipmentNbt(item, "Weapon", TargetLevel);
                } else if (StrengthenItemsJson.armor.indexOf(item.type) != -1) {
                    DescriptionText = i18n.trl(player.langCode, "EquipmentArmor", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Armor, player.name, system.getTimeStr());
                    nbt = setEquipmentNbt(item, "Armor", TargetLevel);
                }
                let newItem = mc.newItem(nbt);
                newItem.setLore(JSON.parse(DescriptionText));
                Container.removeItem(0, 1);
                Container.removeItem(2, 1);
                Container.setItem(0, newItem);
            }, 100);
        }
    } else if (item1.boolean && item2.boolean && item2.type != "intensify") {
        if (item1.lvl == TargetLevel && item2.lvl == TargetLevel - 1) {
            setTimeout(() => {
                let nbt = item.getNbt();
                let DescriptionText
                if (StrengthenItemsJson.weapon.indexOf(item.type) != -1) {
                    DescriptionText = i18n.trl(player.langCode, "EquipmentWeapon", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Weapon, player.name, system.getTimeStr());
                } else if (StrengthenItemsJson.armor.indexOf(item.type) != -1) {
                    DescriptionText = i18n.trl(player.langCode, "EquipmentArmor", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Armor, player.name, system.getTimeStr());
                }
                nbt.getTag("tag").getTag("addon").setInt("lvl", TargetLevel);
                newItem = mc.newItem(nbt);
                newItem.setLore(JSON.parse(DescriptionText));
                Container.removeItem(0, 1);
                Container.removeItem(2, 1);
                Container.setItem(0, newItem);
            }, 100);
        }
    }
}

/**
 * 生成一个新等级的nbt
 * @param {item} item 物品对象
 * @param {string} type 物品类型
 * @param {int} lvl 当前等级
 * @returns 新的物品nbt
 */
function setEquipmentNbt(item, type, lvl) {
    let nbt1 = new NbtCompound({
        "addon": new NbtCompound({
            "type": new NbtString(type),
            "lvl": new NbtInt(lvl)
        })
    })
    let nbt = item.getNbt();
    nbt.setTag("tag", nbt1)
    return nbt;
}

/**
 * 设置玩家生命值
 * @param {player} player 玩家对象
 * @param {int} HP 增加的最大生命值
 * @param {string} pattern 模式
 */
function setPlayerHP(player, HP, pattern) {
    let PlayerHealth = player.health;
    let playerMaxHealth = player.maxHealth;
    if (pattern == "add") {
        HP = playerMaxHealth + HP;
    } else if (pattern == "remove") {
        HP = playerMaxHealth - HP;
    }
    let playerNbt = player.getNbt();
    let playerNbtAttributes = playerNbt.getTag("Attributes");
    for (let i = 0; i < playerNbtAttributes.getSize(); i++) {
        let playerNbtAttributesObj = playerNbtAttributes.getTag(i);
        if (playerNbtAttributesObj.getTag("Name") == "minecraft:health") {
            playerNbtAttributesObj.setFloat("Base", HP);
            playerNbtAttributesObj.setFloat("Current", PlayerHealth);
            playerNbtAttributesObj.setFloat("DefaultMax", HP);
            playerNbtAttributesObj.setFloat("Max", HP);
        }
    }
    player.setNbt(playerNbt);
}