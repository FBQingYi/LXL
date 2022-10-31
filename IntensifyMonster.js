//-----基础信息定义
const IntensifyPath = "./plugins/Intensify/";
const pluginName = "IntensifyMonster";
const PluginsIntroduction = '强化你的怪物吧!';
const pluginPath = "./plugins/IntensifyMonster/";
const PluginsVersion = [0, 0, 5];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const EntityNbtJsonData = { "minecraft:zombie": { "health": 40, "movement": 0.35, "underwater_movement": 0.2, "lava_movement": 0.2, "follow_range": 20, "knockback_resistance": 6, "scale": 4, "Additionaldamage": 2, "customName": "宝藏僵尸", "reel": true, "playerFire": true, "FireTime": 10, "probability": 10, "OtherDrops": true, "OtherDropsMode": 0, "ListSpoils": [{ "Spoils": "ordinary", "SpoilsTypeName": "minecraft:stone", "SpoilsProbability": 10, "SpoilsqQantity": 1 }, { "Spoils": "gives", "SpoilsTypeName": "minecraft:wooden_sword", "DisplayName": "", "SpoilsProbability": 1, "SpoilsqQantity": 1, "Curse": { "Enchantments": [{ "n": 16, "l": 5 }] } }] } };
const ConfigDataJson = { "SpawnProbability": 5, "DockingIntensify": false, "DockingGives": false };
const LuminousItemsJson = { "minecraft:glowstone": 1, "minecraft:torch": 1, "minecraft:lantern": 1, "minecraft:lit_pumpkin": 1, "minecraft:lit_redstone_lamp": 1 };

//------插件信息注册
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation)

/**
 * 读取各项配置文件.
 * 基础变量定义.
 */
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigDataJson, null, "\t"));
}
if (!File.exists(pluginPath + "data/EntityData.json")) {
    File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJsonData, null, "\t"));
}
let EntityNbtJson = JSON.parse(File.readFrom(pluginPath + "data/EntityData.json"));
let Config = JSON.parse(File.readFrom(pluginPath + "Config.json"));
let getReelNbt, GetNewItemNbt;
logger.setConsole(true);


/**
 * 判断是否需要加载前置插件及语言文件.
 * 判断生成概率是否需要限制.
 */
if (Config.DockingIntensify) {
    if (ll.require("Intensify.js")) {
        getReelNbt = ll.import("generateNewNbt");
        i18n.load(IntensifyPath + "language/language.json", "en");
    } else {
        setTimeout(() => {
            if (ll.language == "zh_Hans") {
                logger.error("未找到前置插件Intensify.js，请前往下载或者在配置文件Config.json中将DockingIntensify设置为false");
            } else {
                logger.error("The front-end plug-in Intensify.js is not found. Please go to download it or set DockingIntensify to false in the configuration file Config.json");
            }
            Config.DockingIntensify = false;
        }, 1000 * 5);
    }
}
if (Config.DockingGives) {
    if (ll.require("gives.js")) {
        GetNewItemNbt = ll.import("NewItemNbt");
    } else {
        setTimeout(() => {
            if (ll.language == "zh_Hans") {
                logger.error("未找到前置插件gives.js，请前往下载或者在配置文件Config.json中将DockingGives设置为false");
            } else {
                logger.error("The front-end plug-in gives.js is not found. Please go to download it or set DockingGives to false in the configuration file Config.json");
            }
            Config.DockingGives = false;
        }, 1000 * 5);
    }
}
if (Config.SpawnProbability > 60) {
    Config.SpawnProbability = 50;
}
FourProfileUpdate();
let a = 0

/**
 * 监听生物生成.
 * 判断生物是否在强化文件内.
 * 然后随机判断是否生成强化生物.
 */
mc.listen("onMobSpawn", (typeName, pos) => {
    if (EntityNbtJson[typeName] != undefined) {
        let randomInt = specifiedRangeRandomNumber(0, 100);
        let resultBool = WhetherPaintStrange(pos.x - 4, pos.z - 4, pos.x + 4, pos.z + 4, pos.y)
        if (resultBool && randomInt < Config.SpawnProbability) {
            setNewEntity(typeName, pos, EntityNbtJson[typeName]);
        }
    }
});

/**
 * 监听生物死亡.
 * 判断生物是否是强化生物并且是否开启掉落.
 * 然后调用前置插件生成新的卷轴nbt.
 * 004后新增普通掉落.
 * 005后可对接gives掉落附魔物品.
 */
mc.listen("onMobDie", (mob, source, _cause) => {
    if (source != undefined && source.isPlayer()) {
        let entityJson = EntityNbtJson[mob.type];
        if (entityJson != undefined) {
            let pos = mob.pos;
            if (Config.DockingIntensify) {
                if (mob.hasTag("Intensify")) {
                    let randomInt = specifiedRangeRandomNumber(0, 100);
                    let player = source.toPlayer();
                    if (entityJson.reel) {
                        if (randomInt < entityJson.probability) {
                            let newItem = mc.newItem(getReelNbt("intensify", 1, i18n.trl(player.langCode, "StrengtheningReel1",)));
                            newItem.setLore(JSON.parse(i18n.trl(player.langCode, "StrengtheningReel1explain",)));
                            mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                        }
                    }
                }
            }
            if (entityJson.OtherDrops && mob.hasTag("Intensify")) {
                if (entityJson.OtherDropsMode == 0 && entityJson.ListSpoils != []) {
                    let SpoilsList = entityJson.ListSpoils;
                    SpoilsList.forEach(CurrentOptions => {
                        let randomInt = specifiedRangeRandomNumber(0, 100);
                        if (randomInt < CurrentOptions.SpoilsProbability) {
                            if (CurrentOptions.Spoils == "ordinary") {
                                let item = mc.newItem(CurrentOptions.SpoilsTypeName, CurrentOptions.SpoilsqQantity);
                                mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                            } else if (CurrentOptions.Spoils == "gives" && Config.DockingGives) {
                                let itemDIsplayName = undefined;
                                let initialItem = mc.newItem(CurrentOptions.SpoilsTypeName, CurrentOptions.SpoilsqQantity);
                                if (CurrentOptions.DisplayName != "") {
                                    itemDIsplayName = CurrentOptions.DisplayName;
                                }
                                let itemNewNbt = GetNewItemNbt(initialItem, itemDIsplayName, CurrentOptions.Curse, CurrentOptions.SpoilsqQantity);
                                let item = mc.newItem(itemNewNbt);
                                mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                            }
                        }
                    });
                } else if (entityJson.OtherDropsMode == 1 && entityJson.ListSpoils != []) {
                    let SpoilsList = entityJson.ListSpoils;
                    let randomInt = specifiedRangeRandomNumber(0, SpoilsList.length + 1);
                    let itemData = SpoilsList[randomInt];
                    if (itemData.itemData == "ordinary") {
                        let item = mc.newItem(itemData.SpoilsTypeName, itemData.SpoilsqQantity);
                        mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                    } else if (itemData.Spoils == "gives" && Config.DockingGives) {
                        let itemDIsplayName = undefined;
                        let initialItem = mc.newItem(itemData.SpoilsTypeName, itemData.SpoilsqQantity);
                        if (itemData.DisplayName != "") {
                            itemDIsplayName = itemData.DisplayName;
                        }
                        let itemNewNbt = GetNewItemNbt(initialItem, itemDIsplayName, itemData.Curse, itemData.SpoilsqQantity);
                        let item = mc.newItem(itemNewNbt);
                        mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                    }
                }
            }
        }
    }
})

/**
 * 监听生物受伤事件.
 * 判断是否是玩家受伤及造成伤害的是否是强化生物.
 * 对玩家造成额外的真实伤害以及着火.
 */
mc.listen("onMobHurt", (mob, source, _damage, _cause) => {
    if (mob.isPlayer() && source != undefined) {
        if (EntityNbtJson[mob.type] != undefined && source.hasTag("Intensify")) {
            let damage = EntityNbtJson[mob.type].Additionaldamage;
            let player = mob.toPlayer();
            setTimeout(() => {
                player.hurt(damage);
                if (EntityNbtJson[mob.type].playerFire) {
                    player.setFire(EntityNbtJson[mob.type].FireTime, false);
                }
            }, 500);
        }
    }
})

/**
 * 生成新的实体并修改属性
 * @param {string} entityType 实体标准类型名
 * @param {Pos} pos 坐标对象
 * @param {List} NbtData 实体修改的数据
 */
function setNewEntity(entityType, pos, NbtData) {
    let newEntity = mc.spawnMob(entityType, pos);
    if (newEntity != undefined) {
        let newEntityNbt = newEntity.getNbt();
        let newEntityAttributes = newEntityNbt.getTag("Attributes");
        if (NbtData.customName != "") {
            newEntityNbt.setString("CustomName", `${NbtData.customName}`)
            newEntityNbt.setFloat("CustomNameVisible", 1);
        }
        if (newEntityAttributes != undefined) {
            let newEntityAttributesListLength = newEntityAttributes.getSize();
            for (let i = 0; i < newEntityAttributesListLength; i++) {
                let currentLocationObject = newEntityAttributes.getTag(i)
                if (currentLocationObject.getTag("Name") == "minecraft:health") {
                    currentLocationObject.setFloat("Base", NbtData.health)
                    currentLocationObject.setFloat("Current", NbtData.health)
                    currentLocationObject.setFloat("DefaultMax", NbtData.health)
                    currentLocationObject.setFloat("Max", NbtData.health);
                } else if (currentLocationObject.getTag("Name") == "minecraft:movement") {
                    currentLocationObject.setFloat("Base", NbtData.movement)
                    currentLocationObject.setFloat("Current", NbtData.movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:underwater_movement") {
                    currentLocationObject.setFloat("Base", NbtData.underwater_movement)
                    currentLocationObject.setFloat("Current", NbtData.underwater_movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:lava_movement") {
                    currentLocationObject.setFloat("Base", NbtData.lava_movement)
                    currentLocationObject.setFloat("Current", NbtData.lava_movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:follow_range") {
                    currentLocationObject.setFloat("Base", NbtData.follow_range)
                    currentLocationObject.setFloat("Current", NbtData.follow_range);
                } else if (currentLocationObject.getTag("Name") == "minecraft:knockback_resistance") {
                    currentLocationObject.setFloat("Base", NbtData.knockback_resistance)
                    currentLocationObject.setFloat("DefaultMax", NbtData.knockback_resistance)
                    currentLocationObject.setFloat("Max", NbtData.knockback_resistance)
                    currentLocationObject.setFloat("DefaultMin", NbtData.knockback_resistance)
                    currentLocationObject.setFloat("Min", NbtData.knockback_resistance);
                }
            }
        }
        newEntity.setNbt(newEntityNbt);
        newEntity.addTag("Intensify");
        newEntity.setScale(NbtData.scale);
    }
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
 * 获取附近是否有发光方块
 * @param {int} x x点1
 * @param {int} z z点1
 * @param {int} x1 x点2
 * @param {int} z1 z点2
 * @param {int} y 
 * @returns 布尔值
 */
function WhetherPaintStrange(x, z, x1, z1, y) {
    let bool = true;
    let a = { "x": x, "y": z };
    let b = { "x": x1, "y": z1 };
    let posx = generateTrack(a, b);
    for (let i = 0; i < posx.length; i++) {
        let x2 = posx[i].x
        let z2 = posx[i].z
        let it = mc.getBlock(parseInt(x2), y, parseInt(z2), 0)
        if (it != undefined) {
            if (LuminousItemsJson[it.type] != undefined) {
                bool = false;
                return false;
            }
        }
    }
    if (!bool) {
        return bool;
    } else {
        for (let i = 0; i < posx.length; i++) {
            let x2 = posx[i].x
            let z2 = posx[i].z
            let it = mc.getBlock(parseInt(x2), y + 1, parseInt(z2), 0)
            if (it != undefined) {
                if (LuminousItemsJson[it.type] != undefined) {
                    bool = false;
                    return false;
                }
            }
        }
    }
    return bool;
}

/**
 * 获取所有坐标点
 * @param {JSON} a 坐标点a
 * @param {JSON} b 坐标点b
 * @returns 数组类型的坐标集合
 */
function generateTrack(a, b) {
    var maxX = a.x <= b.x ? b.x : a.x;
    var minX = a.x <= b.x ? a.x : b.x;
    var maxY = a.y <= b.y ? b.y : a.y;
    var minY = a.y <= b.y ? a.y : b.y;
    var coor = [];
    for (var i = minX; i <= maxX; i++) {
        for (var j = minY; j <= maxY; j++) {
            coor.push({ 'x': i, 'y': j });
        }
    }
    return coor;
}

/**
 * 版本配置更新
 */
function FourProfileUpdate() {
    let UPEntityConfig = false;
    if (Config.DockingGives == undefined) {
        Config.DockingGives = false;
        for (let key in EntityNbtJson) {
            let EntityData = EntityNbtJson[key];
            if (EntityData.OtherDrops == undefined) {
                UPEntityConfig = true;
                EntityData.OtherDrops = false;
                EntityData.OtherDropsMode = 0;
                EntityData.ListSpoils = [{"Spoils":"ordinary","SpoilsTypeName":"minecraft:stone","SpoilsProbability":10,"SpoilsqQantity":1},{"Spoils":"gives","SpoilsTypeName":"minecraft:wooden_sword","DisplayName":"","SpoilsProbability":1,"SpoilsqQantity":1,"Curse":{"Enchantments":[{"n":16,"l":5}]}}];
            } else if (EntityData.ListSpoils[0].Spoils == undefined) {
                UPEntityConfig = true;
                let SingleEntityList = EntityData.ListSpoils;
                for (let key in SingleEntityList) {
                    SingleEntityList[key].Spoils = "ordinary";
                }
            }
        }
    }
    if (UPEntityConfig) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(Config, null, "\t"));
        File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
        setTimeout(() => {
            if (ll.language == "zh_Hans") {
                logger.error("版本配置文件更新，请前往data/EntityData.json查看！");
            } else {
                logger.error("Please go to data/EntityData.json to view the updated configuration file!");
            }
        }, 1000 * 6);
    }
}

/** 
 * 002
 * 限制玩家将生成概率调整大于60%.
 * 003
 * 修复刷怪笼100%刷强化怪的问题.
 * 004
 * 修复003不刷强化怪的问题.
 * 新增额外的普通物品掉落.
 * 005
 * 修复004重置配置文件的BUG.
 * 新增对接gives，可以直接掉落附魔物品.
 */