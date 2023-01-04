//-----基础信息定义
const IntensifyPath = "./plugins/Intensify/";
const pluginName = "IntensifyMonster";
const PluginsIntroduction = '强化你的怪物吧!';
const pluginPath = "./plugins/IntensifyMonster/";
const PluginsVersion = [0, 2, 0];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const EntityNbtJsonData = {
    "minecraft:zombie": [
        {
            "health": 40,
            "movement": 0.35,
            "underwater_movement": 0.2,
            "lava_movement": 0.2,
            "follow_range": 20,
            "knockback_resistance": 6,
            "scale": 4,
            "Additionaldamage": 2,
            "customName": "宝藏僵尸",
            "reel": true,
            "playerFire": true,
            "FireTime": 10,
            "probability": 10,
            "OtherDrops": true,
            "OtherDropsMode": 0,
            "WhetherDisarm": false,
            "DisarmingProbability": 1,
            "DropOffset": {
                "x": 3,
                "z": 2
            },
            "SpawnProbability": 5,
            "GiveXpToPlayer": 5,
            "UniqueName": "zombie1",
            "ListSpoils": [
                {
                    "Spoils": "ordinary",
                    "SpoilsTypeName": "minecraft:stone",
                    "SpoilsProbability": 10,
                    "SpoilsqQantity": 1
                },
                {
                    "Spoils": "gives",
                    "SpoilsTypeName": "minecraft:wooden_sword",
                    "DisplayName": "",
                    "SpoilsProbability": 1,
                    "SpoilsqQantity": 1,
                    "Curse": {
                        "Enchantments": [
                            {
                                "n": 16,
                                "l": 5
                            }
                        ]
                    }
                }
            ]
        }
    ]
};
const ConfigDataJson = { "DockingIntensify": false, "DockingGives": false, "mobSpawner": false, "ProfileVersion": "0.0.1" };
const LuminousItemsJson = { "minecraft:glowstone": 1, "minecraft:torch": 1, "minecraft:lantern": 1, "minecraft:lit_pumpkin": 1, "minecraft:lit_redstone_lamp": 1 };

//------插件信息注册
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation)

/**
 * 读取各项配置文件.
 * 基础变量定义.
 */
if (File.exists(pluginPath + "language/language.json")) {
    File.delete(pluginPath + "language");
}
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigDataJson, null, "\t"));
}
if (!File.exists(pluginPath + "data/EntityData.json")) {
    File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJsonData, null, "\t"));
}
let EntityNbtJson = JSON.parse(File.readFrom(pluginPath + "data/EntityData.json"));
let Config = JSON.parse(File.readFrom(pluginPath + "Config.json"));
let getReelNbt, GetNewItemNbt;
let Generate = true;
logger.setConsole(true);

/**
 * 语言文件写入及加载.
 */
i18n.load(pluginPath + "language/language.json", "en", {
    "zh_CN": {
        "formTitle": "选择实体",
        "configUp": "版本配置文件更新，请前往data/EntityData.json查看！",
        "cmdExplain": "嘿嘿，强化你的怪物吧！",
        "Intensifyerr": "未找到前置插件Intensify.js，请前往下载或者在配置文件Config.json中将DockingIntensify设置为false",
        "giveserr": "未找到前置插件gives.js，请前往下载或者在配置文件Config.json中将DockingGives设置为false",
        "entityInformation": "实体名称:{0}\n实体最大生命值:{1}\n实体移动速度:{2}\n实体追踪距离:{3}\n实体抗性:{1}",
        "CmdOutpError1": "没有找到这个生物相关的配置文件"
    },
    "zh_TW": {
        "formTitle": "選擇實體",
        "configUp": "版本設定檔更新,請前往data/EntityData.json查看！",
        "cmdExplain": "嘿嘿，强化你的怪物吧！",
        "Intensifyerr": "未找到前置挿件Intensify.js,請前往下載或者在設定檔Config.json中將DockingIntensify設定為false",
        "giveserr": "未找到前置挿件gives.js,請前往下載或者在設定檔Config.json中將DockingGives設定為false",
        "entityInformation": "實體名稱:{0}\n實體最大生命值:{1}\n實體移動速度:{2}\n實體追跡距離:{3}\n實體抗性:{4}",
        "CmdOutpError1": "沒有找到這個生物相關的設定檔"
    },
    "en": {
        "formTitle": "Select Entity",
        "configUp": "Please go to data/EntityData.json to view the updated configuration file!",
        "cmdExplain": "Hey hey, strengthen your monster!",
        "Intensifyerr": "The front-end plug-in Intensify.js is not found. Please go to download it or set DockingIntensify to false in the configuration file Config.json",
        "giveserr": "The front-end plug-in gives.js is not found. Please go to download it or set DockingGives to false in the configuration file Config.json",
        "entityInformation": "Entity name: {0}  nMaximum HP of entity: {1}  nMoving speed of entity: {2}  nEntity tracking distance: {3}  nEntity resistance: {4}",
        "CmdOutpError1": "This biological related configuration file was not found"
    }
});

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
            logger.error(i18n.trl(ll.language, "Intensifyerr",));
            Config.DockingIntensify = false;
        }, 1000 * 5);
    }
}
if (Config.DockingGives) {
    if (ll.require("gives.js")) {
        GetNewItemNbt = ll.import("NewItemNbt");
    } else {
        setTimeout(() => {
            logger.error(i18n.trl(ll.language, "giveserr",));
            Config.DockingGives = false;
        }, 1000 * 5);
    }
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
        let ConfigureRandom = specifiedRangeRandomNumber(0, EntityNbtJson[typeName].length);
        let SelectConfiguration = EntityNbtJson[typeName][ConfigureRandom];
        if (SelectConfiguration != undefined) {
            let EntityGenerationProbability = SelectConfiguration.SpawnProbability;
            if (EntityGenerationProbability > 60) {
                EntityGenerationProbability = 50;
            }
            let randomInt = specifiedRangeRandomNumber(0, 100);
            let resultBool = WhetherPaintStrange(pos.x - 6, pos.z - 6, pos.x + 6, pos.z + 6, pos.y)
            if (resultBool && randomInt < EntityGenerationProbability) {
                if (Config.mobSpawner) {
                    setNewEntity(typeName, pos, SelectConfiguration);
                } else {
                    let mobSpawnerBool = findNearestBlock(pos);
                    if (!mobSpawnerBool) {
                        setNewEntity(typeName, pos, SelectConfiguration);
                    }
                }
            }
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
    if (source != undefined && source.isPlayer() && mob.hasTag("Intensify")) {
        let entityJson = EntityNbtJson[mob.type];
        if (entityJson != undefined) {
            let entityDataJson = {};
            let pos = mob.pos;
            for (let i = 0; i < entityJson.length; i++) {
                let EntityJsonUniqueName = entityJson[i].UniqueName;
                if (mob.hasTag(EntityJsonUniqueName)) {
                    entityDataJson = entityJson[i];
                    break;
                }
            }
            if (entityDataJson != {}) {
                if (Config.DockingIntensify) {
                    let randomInt = specifiedRangeRandomNumber(0, 100);
                    let player = source.toPlayer();
                    if (entityDataJson.reel) {
                        if (randomInt < entityDataJson.probability) {
                            let newItem = mc.newItem(getReelNbt("intensify", 1, i18n.trl(player.langCode, "StrengtheningReel1",)));
                            newItem.setLore(JSON.parse(i18n.trl(player.langCode, "StrengtheningReel1explain",)));
                            mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                        }
                    }
                }
                if (entityDataJson.OtherDrops) {
                    if (entityDataJson.OtherDropsMode == 0 && entityDataJson.ListSpoils != []) {
                        let SpoilsList = entityDataJson.ListSpoils;
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
                    } else if (entityDataJson.OtherDropsMode == 1 && entityDataJson.ListSpoils != []) {
                        let SpoilsList = entityDataJson.ListSpoils;
                        let randomInt = specifiedRangeRandomNumber(0, SpoilsList.length + 1);
                        let itemData = SpoilsList[randomInt];
                        if (itemData.Spoils == "ordinary") {
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
                let player = source.toPlayer();
                player.addExperience(entityDataJson.GiveXpToPlayer);
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
        let entityJson = EntityNbtJson[source.type];
        if (entityJson != undefined && source.hasTag("Intensify")) {
            let entityDataJson = {};
            for (let i = 0; i < entityJson.length; i++) {
                let EntityJsonUniqueName = entityJson[i].UniqueName;
                if (source.hasTag(EntityJsonUniqueName)) {
                    entityDataJson = entityJson[i];
                    break;
                }
            }
            if (entityDataJson != {}) {
                let damage = entityDataJson.Additionaldamage;
                let player = mob.toPlayer();
                if (entityDataJson.WhetherDisarm) {
                    let random = specifiedRangeRandomNumber(0, 100);
                    if (random < entityDataJson.DisarmingProbability) {
                        let playerHand = player.getHand();
                        if (!playerHand.isNull()) {
                            let DropOffsetX = entityDataJson.DropOffset.x;
                            let DropOffsetZ = entityDataJson.DropOffset.z;
                            if (mc.spawnItem(playerHand, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                                playerHand.setNull()
                                player.refreshItems()
                            }
                        }
                    }
                }
                setTimeout(() => {
                    player.hurt(damage);
                    if (entityDataJson.playerFire) {
                        player.setFire(entityDataJson.FireTime, false);
                    }
                }, 500);
            }
        }
    }
})

mc.listen("onServerStarted", () => {
    let UniqueNameArray = EntityUniqueNameArraySet();
    let Command = mc.newCommand("intensifymonster", i18n.get("cmdExplain", ll.language), PermType.GameMasters);
    Command.setEnum("type", ["query", "spawn"]);
    Command.setEnum("EntityUName", UniqueNameArray);
    Command.mandatory("mode", ParamType.Enum, "type");
    Command.mandatory("entity", ParamType.ActorType);
    Command.mandatory("pos", ParamType.Vec3);
    Command.mandatory("Uname", ParamType.Enum, "EntityUName");
    Command.overload(["mode"]);
    Command.overload(["mode", "entity", "Uname", "pos"]);
    Command.setCallback((cmd, origin, output, results) => {
        if (results.mode == "query" && origin.player != undefined) {
            PlayerCmdHandle(origin.player);
        } else if (results.mode == "spawn") {
            let pos = results.pos;
            let entity = results.entity;
            let uname = results.Uname;
            if (EntityNbtJson[entity] != undefined) {
                let EntityDataJson = UniqueNameGetEntityJson(uname, entity);
                if (EntityDataJson != {}) {
                    setNewEntity(entity, pos, EntityDataJson);
                } else {
                    output.error(i18n.get("CmdOutpError1", ll.language));
                }
            } else {
                output.error(i18n.get("CmdOutpError1", ll.language));
            }
        }
    });
    Command.setup();
});

function UniqueNameGetEntityJson(UniqueName, EntityType) {
    let EntityJson = {};
    if (EntityNbtJson[EntityType] != undefined) {
        let currentEntity = EntityNbtJson[EntityType];
        for (let key in currentEntity) {
            let entityDataJson = currentEntity[key];
            if (entityDataJson.UniqueName == UniqueName) {
                EntityJson = entityDataJson;
                return entityDataJson;
            }
        }
    }
    return EntityJson;
}

function EntityUniqueNameArraySet() {
    let UniqueNameArray = [];
    for (let key in EntityNbtJson) {
        EntityNbtJson[key].forEach(entityDataJson => {
            UniqueNameArray.push(entityDataJson.UniqueName);
        });
    }
    return UniqueNameArray;
}

function PlayerCmdHandle(player) {
    if (player.isOP()) {
        let fm = mc.newSimpleForm();
        let EntityArray = mc.getAllEntities();
        if (JSON.stringify(EntityArray) != "[]") {
            fm.setTitle(i18n.trl(player.langCode, "formTitle",))
            EntityArray.forEach(entity => {
                fm.addButton(`${entity.name}\n${entity.type}`);
            });
            player.sendForm(fm, (player, id) => {
                if (id == undefined) {
                    return false;
                } else {
                    let en = EntityArray[id];
                    let enDataJson = {};
                    let EnNbt = en.getNbt();
                    if (en != undefined && EnNbt != undefined) {
                        let enNbtObj = EnNbt.toObject().Attributes;
                        if (enNbtObj != undefined) {
                            enNbtObj.forEach(Current => {
                                if (Current != undefined) {
                                    switch (Current.Name) {
                                        case "minecraft:health":
                                            enDataJson.health = Current.DefaultMax;
                                            break;
                                        case "minecraft:movement":
                                            enDataJson.movement = Current.Current;
                                            break;
                                        case "minecraft:follow_range":
                                            enDataJson.follow_range = Current.Current;
                                            break;
                                        case "minecraft:knockback_resistance":
                                            enDataJson.knockback_resistance = Current.Current;
                                            break;
                                    }
                                }
                            });
                        }
                        let msg = i18n.trl(player.langCode, "entityInformation", en.name, enDataJson.health, enDataJson.movement, enDataJson.follow_range, enDataJson.knockback_resistance);
                        player.tell(msg);
                    }
                }
            })
        }
    }
}

/**
 * 生成新的实体并修改属性
 * @param {string} entityType 实体标准类型名
 * @param {Pos} pos 坐标对象
 * @param {List} NbtData 实体修改的数据
 */
function setNewEntity(entityType, pos, NbtData) {
    if (Generate) {
        Generate = false;
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
            newEntity.addTag(NbtData.UniqueName);
            newEntity.setScale(NbtData.scale);
        }
        setTimeout(() => {
            Generate = true;
        }, 50);
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
 * 查看附近是否有刷怪笼.
 * 代码来自minedetector插件.
 * @param {Pos} pos 坐标对象
 * @returns 布尔值
 */
function findNearestBlock(pos) {
    const { x, y, z, dimid } = pos;
    let blockTypes = "minecraft:mob_spawner";
    let radius = 6;
    let lastDistance = 0;
    let boole = false;
    for (let lx = x - radius; lx <= x + radius; lx += 1) {
        for (let ly = y - radius; ly <= y + radius; ly += 1) {
            for (let lz = z - radius; lz <= z + radius; lz += 1) {
                const block = mc.getBlock(lx, ly, lz, dimid);
                if (blockTypes == block.type) {
                    const distance = Math.sqrt(
                        (x - lx) * (x - lx) + (y - ly) * (y - ly) + (z - lz) * (z - lz)
                    );
                    if (distance < lastDistance || !lastDistance) {
                        lastDistance = distance;
                        boole = true;
                        return boole;
                    }
                }
            }
        }
    }
    return boole;
}

/**
 * 版本配置更新
 */
function FourProfileUpdate() {
    let UPEntityConfig = false;
    let NewProfileVersion = false;
    for (let key in EntityNbtJson) {
        if (EntityNbtJson[key][0] == undefined) {
            NewProfileVersion = true;
        }
    }
    //归档更新，0.1.8版本前的更新
    if (NewProfileVersion) {
        if (Config.DockingGives == undefined) {
            Config.DockingGives = false;
            for (let key in EntityNbtJson) {
                let EntityData = EntityNbtJson[key];
                if (EntityData.OtherDrops == undefined) {
                    UPEntityConfig = true;
                    EntityData.OtherDrops = false;
                    EntityData.OtherDropsMode = 0;
                    EntityData.ListSpoils = [{ "Spoils": "ordinary", "SpoilsTypeName": "minecraft:stone", "SpoilsProbability": 10, "SpoilsqQantity": 1 }, { "Spoils": "gives", "SpoilsTypeName": "minecraft:wooden_sword", "DisplayName": "", "SpoilsProbability": 1, "SpoilsqQantity": 1, "Curse": { "Enchantments": [{ "n": 16, "l": 5 }] } }];
                } else if (EntityData.ListSpoils[0].Spoils == undefined) {
                    UPEntityConfig = true;
                    let SingleEntityList = EntityData.ListSpoils;
                    for (let key in SingleEntityList) {
                        SingleEntityList[key].Spoils = "ordinary";
                    }
                }
            }
        }
        if (Config.SpawnProbability != undefined) {
            for (let type in EntityNbtJson) {
                let currentEntity = EntityNbtJson[type];
                if (currentEntity.SpawnProbability == undefined) {
                    if (Config.SpawnProbability > 60) {
                        currentEntity.SpawnProbability = 50;
                    } else {
                        currentEntity.SpawnProbability = Config.SpawnProbability;
                    }
                }
            }
            delete Config.SpawnProbability;
            UPEntityConfig = true;
        }
        if (Config.mobSpawner == undefined) {
            Config.mobSpawner = false;
            UPEntityConfig = true;
        }
        if (EntityNbtJson[Object.keys(EntityNbtJson)[0]].GiveXpToPlayer == undefined) {
            for (let type in EntityNbtJson) {
                let currentEntity = EntityNbtJson[type];
                if (currentEntity.GiveXpToPlayer == undefined) {
                    currentEntity.GiveXpToPlayer = 5;
                }
            }
            UPEntityConfig = true;
        }
    }
    //新配置文件后的更新
    if (Config.ProfileVersion == undefined) {
        Config.ProfileVersion = "0.0.1";
        for (let key in EntityNbtJson) {
            let TemporaryArray = [];
            if (EntityNbtJson[key].UniqueName == undefined) {
                EntityNbtJson[key].UniqueName = key.split(":")[1];
            }
            if (EntityNbtJson[key].GiveXpToPlayer == undefined) {
                EntityNbtJson[key].GiveXpToPlayer = 5;
            }
            TemporaryArray.push(EntityNbtJson[key]);
            EntityNbtJson[key] = TemporaryArray;
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.1") {
        Config.ProfileVersion = "0.0.2";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((EntityDataJson, position) => {
                if (EntityDataJson.WhetherDisarm == undefined) {
                    EntityNbtJson[key][position].WhetherDisarm = false;
                    EntityNbtJson[key][position].DisarmingProbability = 1;
                    EntityNbtJson[key][position].DropOffset = { "x": 3, "z": 2 };
                }
            });
        }
        UPEntityConfig = true;
    }

    if (UPEntityConfig) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(Config, null, "\t"));
        File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
        setTimeout(() => {
            logger.error(i18n.trl(ll.language, "configUp",));
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
 * 006
 * 每种生物可自定义生成概率.
 * 007
 * 新增配置项：刷怪笼附近不生成强化怪.
 * 018
 * 生物被击杀给予击杀者额外的经验值.
 * 修复某个提示错误.
 * 修复对玩家额外伤害和着火无效的bug.
 * 新增一种生物多个配置文件随机生成.
 * 加入配置文件版本号.
 * 加入指令，可在游戏内查询实体部分数据.
 * 完善多语言设置，加入语言文件.
 * 019
 * 修复普通掉落问题.
 * 020
 * 修复实体重复触发生成的BUG.
 * 修复查看实体数据时实体死亡报错.
 * 新增指令在指定地点生成指定配置文件的生物.
 * 随机缴械
 * 
 * 待添加功能
 * 怪物隐身
 * 隐身时间设置
 * 死亡爆炸
 */