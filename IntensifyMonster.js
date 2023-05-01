//-----基础信息定义
const IntensifyPath = "./plugins/Intensify/";
const pluginName = "IntensifyMonster";
const PluginsIntroduction = '强化你的怪物吧!';
const pluginPath = "./plugins/IntensifyMonster/";
const PluginsVersion = [0, 3, 3];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const EntityNbtJsonData = {
    "minecraft:zombie": [
        {
            "OriginalData": {
                "health": 40,
                "movement": 0.35,
                "underwater_movement": 0.2,
                "lava_movement": 0.2,
                "follow_range": 20,
                "knockback_resistance": 6,
                "scale": 2,
                "customName": "宝藏僵尸",
                "UniqueName": "zombie1"
            },
            "OtherAbility": {
                "SpawnProbability": 100,
                "Additionaldamage": 2,
                "KillPlayerRecovery": 10,
                "brambles": false,
                "bramblesHurt": 1,
                "LongRangeDamage": true
            },
            "buff": {
                "state": true,
                "buffArray": [
                    {
                        "id": "resistance",
                        "lvl": 1,
                        "time": 10000
                    }
                ]
            },
            "Disarm": {
                "WhetherDisarm": false,
                "DisarmingProbability": 1,
                "DropOffset": {
                    "x": 3,
                    "z": 2
                }
            },
            "Explosion": {
                "dieBlast": false,
                "BlastDestroy": false,
                "BlastPower": 1,
                "BlastTime": 10
            },
            "BeFire": {
                "playerFire": true,
                "FireTime": 10
            },
            "Scabbing": {
                "ArmorBreaker": false,
                "ArmorBreakerToSE": false,
                "ArmorProbability": 10,
                "SingleReductionDamage": 2
            },
            "trophy": {
                "OtherDrops": true,
                "OtherDropsMode": 0,
                "GiveXpToPlayer": 5,
                "addTalentValue": 1.1234,
                "reel": {
                    "reel": true,
                    "reelLvl": 1,
                    "probability": 10
                },
                "economy": {
                    "moneyName": "llmoney",
                    "probability": 1,
                    "quantity": 10,
                    "describe": "金币"
                },
                "fragmentsArtifactStones": {
                    "state": true,
                    "name": "神一级石碎片",
                    "number": 1,
                    "probability": 100
                },
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
        }
    ]
};

const InitializedTemplate = { "OriginalData": { "health": 40, "movement": 0.35, "underwater_movement": 0.2, "lava_movement": 0.2, "follow_range": 20, "knockback_resistance": 6, "scale": 2, "customName": "宝藏僵尸", "UniqueName": "zombie1" }, "OtherAbility": { "SpawnProbability": 100, "Additionaldamage": 2, "KillPlayerRecovery": 10, "brambles": false, "bramblesHurt": 1, "LongRangeDamage": true }, "buff": { "state": true, "buffArray": [{ "id": "resistance", "lvl": 1, "time": 10000 }] }, "Disarm": { "WhetherDisarm": false, "DisarmingProbability": 1, "DropOffset": { "x": 3, "z": 2 } }, "Explosion": { "dieBlast": false, "BlastDestroy": false, "BlastPower": 1, "BlastTime": 10 }, "BeFire": { "playerFire": true, "FireTime": 10 }, "Scabbing": { "ArmorBreaker": false, "ArmorBreakerToSE": false, "ArmorProbability": 10, "SingleReductionDamage": 2 }, "trophy": { "OtherDrops": true, "OtherDropsMode": 0, "GiveXpToPlayer": 5, "addTalentValue": 1.1234, "reel": { "reel": true, "reelLvl": 1, "probability": 10 }, "economy": { "moneyName": "llmoney", "probability": 1, "quantity": 10, "describe": "金币" }, "fragmentsArtifactStones": { "state": true, "name": "神一级石碎片", "number": 1, "probability": 100 }, "ListSpoils": [{ "Spoils": "ordinary", "SpoilsTypeName": "minecraft:stone", "SpoilsProbability": 10, "SpoilsqQantity": 1 }, { "Spoils": "gives", "SpoilsTypeName": "minecraft:wooden_sword", "DisplayName": "", "SpoilsProbability": 1, "SpoilsqQantity": 1, "Curse": { "Enchantments": [{ "n": 16, "l": 5 }] } }] } };
const ConfigDataJson = { "DockingIntensifySurvival": false, "ForceEntitySize": false, "ParticleEffect": true, "PressurePlate": true, "DockingIntensify": false, "DockingGives": false, "mobSpawner": false, "ProfileVersion": "0.0.1" };
const LuminousItemsJson = { "minecraft:glowstone": 1, "minecraft:torch": 1, "minecraft:lantern": 1, "minecraft:lit_pumpkin": 1, "minecraft:lit_redstone_lamp": 1 };
const buffIdCompare = { "absorption": 22, "bad_omen": 26, "blindness": 15, "conduit_power": 29, "nausea": 9, "fire_resistance": 12, "glowing": 24, "haste": 3, "health_boost": 21, "hunger": 17, "instant_damage": 7, "instant_health": 6, "invisibility": 14, "jump_boost": 8, "levitation": 25, "luck": 26, "mining_fatigue": 4, "nautilus": 30, "night_vision": 16, "poison": 19, "regeneration": 10, "resistance": 11, "saturation": 23, "slow_falling": 27, "slowness": 2, "speed": 1, "strength": 5, "water_breathing": 13, "weakness": 18, "wither": 20 };

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
let EntityNbtJson = JSON.parse(File.readFrom(pluginPath + "data/EntityData.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let Config = JSON.parse(File.readFrom(pluginPath + "Config.json"));
let getReelNbt, GetNewItemNbt, ParticleSpawner, AddTalentValue, getFragmentsNbt;
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
        "CmdOutpError1": "没有找到这个生物相关的配置文件",
        "BlastTips": "因你击杀了{0},即将在{1}秒后发生爆炸!",
        "IntensifySurvivalerr": "未找到前置插件IntensifySurvival.js，请前往下载或者在配置文件Config.json中将DockingIntensifySurvival设置为false",
        "economyTips": "你获得了{0} {1}",
        "mainFormTitle": "强化生物-主界面",
        "mainFormContent": "请选择你要修改的项目!",
        "mainFormButton_1": "新增实体配置",
        "mainFormButton_2": "修改实体配置",
        "mainFormButton_3": "查询实体数据",
        "mainFormButton_4": "修改buff",
        "state": "是否开启",
        "addEntityConfigFormTitle": "强化生物-新增生物",
        "addEntityConfigFormContent": "请选择你要新增的实体!",
        "addEntity_1": "基础数据",
        "addEntity_2": "其他能力",
        "addEntity_3": "buff数据",
        "addEntity_3Tips": "buff数据只可选择是否启用，其他数据请前往配置文件修改！",
        "addEntity_4": "玩家掉落项",
        "addEntity_5": "死亡后爆炸项",
        "addEntity_6": "玩家着火项",
        "addEntity_7": "碎甲项",
        "addEntity_8": "战利品项",
        "DropOffset_x": "掉落相对玩家偏移值x",
        "DropOffset_z": "掉落相对玩家偏移值z",
        "WhetherDisarm": "是否开启掉落",
        "DisarmingProbability": "玩家掉落物品的概率",
        "health": "生命值",
        "movement": "陆地移速",
        "underwater_movement": "水中移速",
        "lava_movement": "岩浆中移速",
        "follow_range": "追踪距离",
        "knockback_resistance": "击退抗性",
        "scale": "模型大小",
        "customName": "显示名称",
        "UniqueName": "唯一name，不可重复",
        "SpawnProbability": "此配置生物刷新概率",
        "Additionaldamage": "对玩家额外真实伤害",
        "KillPlayerRecovery": "击杀玩家恢复多少血量",
        "brambles": "是否开启反伤",
        "bramblesHurt": "反伤对玩家造成的真实伤害",
        "LongRangeDamage": "是否能受到远程伤害",
        "playerFire": "是否开启玩家着火",
        "FireTime": "着火持续时间",
        "ArmorBreaker": "是否开启碎甲",
        "ArmorBreakerToSE": "碎甲是否对强化装备有效",
        "ArmorProbability": "碎甲几率",
        "SingleReductionDamage": "碎甲减少耐久",
        "dieBlast": "是否开启爆炸",
        "BlastDestroy": "爆炸是否破坏方块",
        "BlastPower": "爆炸威力",
        "BlastTime": "倒计时多久爆炸",
        "OtherDrops": "是否掉落其它物品",
        "OtherDropsMode": "0是全部随机掉落，1是选一个100%掉落",
        "GiveXpToPlayer": "额经验值",
        "addTalentValue": "给予击杀者天赋点（对接强化生存）",
        "reel_reel": "是否开启卷轴掉落",
        "reel_reelLvl": "掉落的卷轴等级",
        "reel_probability": "掉落几率",
        "economy_moneyName": "经济类型",
        "economy_probability": "获得几率",
        "economy_quantity": "获得数量",
        "economy_describe": "经济显示名称",
        "fragmentsArtifactStones_state": "是否开启神器碎片掉落",
        "fragmentsArtifactStones_name": "强化插件配置的神器石碎片名称",
        "fragmentsArtifactStones_number": "掉落数量",
        "fragmentsArtifactStones_probability": "掉落概率",
        "addEntityTips": "{0}添加完成！",
        "modifyEntity_1": "修改配置",
        "modifyEntity_2": "请选择一个实体",
        "UniqueNameTips": "请选择要修改的生物的UniqueName",
        "smallitem": "请选择要修改的小项!",
        "OriginalData": "原版数据",
        "OtherAbility": "其他能力",
        "buff": "携带的buff数据",
        "Disarm": "玩家掉落物品项",
        "Explosion": "死亡后爆炸项",
        "BeFire": "玩家着火项",
        "Scabbing": "玩家碎甲项",
        "trophy": "相关战利品项",
        "changesSaved": "配置修改成功!",
        "editBuffsLoot": "buff相关",
        "PleaseSelect": "请选择!",
        "buff1": "buff",
        "trophy1": "战利品",
        "addBuff_1": "新增buff",
        "modifyBuff_1": "修改现有buff",
        "removeBuff_1": "移除buff",
        "set_buff_id": "buff英文id",
        "set_buff_lvl": "buff等级",
        "set_buff_time": "buff持续时间"
    },
    "zh_TW": {
        "formTitle": "選擇實體",
        "configUp": "版本設定檔更新,請前往data/EntityData.json查看！",
        "cmdExplain": "嘿嘿，强化你的怪物吧！",
        "Intensifyerr": "未找到前置挿件Intensify.js,請前往下載或者在設定檔Config.json中將DockingIntensify設定為false",
        "giveserr": "未找到前置挿件gives.js,請前往下載或者在設定檔Config.json中將DockingGives設定為false",
        "entityInformation": "實體名稱:{0}\n實體最大生命值:{1}\n實體移動速度:{2}\n實體追跡距離:{3}\n實體抗性:{4}",
        "CmdOutpError1": "沒有找到這個生物相關的設定檔",
        "BlastTips": "因你擊殺了{0}，即將在{1}秒後發生爆炸！",
        "IntensifySurvivalerr": "未找到前置挿件IntensifySurvival.js，請前往下載或者在設定檔Config.json中將DockingIntensifySurvival設定為false",
        "economyTips": "你獲得了{0} {1}",
        "mainFormTitle": "强化生物-主介面",
        "mainFormContent": "請選擇你要修改的項目！",
        "mainFormButton_1": "新增實體配寘",
        "mainFormButton_2": "修改實體配寘",
        "mainFormButton_3": "査詢實體數據",
        "state": "是否開啟",
        "addEntityConfigFormTitle": "强化生物-新增生物",
        "addEntityConfigFormContent": "請選擇你要新增的實體！",
        "addEntity_1": "基礎數據",
        "addEntity_2": "其他能力",
        "addEntity_3": "buff數據",
        "addEntity_3Tips": "buff數據只可選擇是否啟用，其他數據請前往設定檔修改！",
        "addEntity_4": "玩家掉落項",
        "addEntity_5": "死亡後爆炸項",
        "addEntity_6": "玩家著火項",
        "addEntity_7": "碎甲項",
        "addEntity_8": "戰利品項",
        "DropOffset_x": "掉落相對玩家偏移值x",
        "DropOffset_z": "掉落相對玩家偏移值z",
        "WhetherDisarm": "是否開啟掉落",
        "DisarmingProbability": "玩家掉落物品的概率",
        "health": "生命值",
        "movement": "陸地移速",
        "underwater_movement": "水中移速",
        "lava_movement": "岩漿中移速",
        "follow_range": "追跡距離",
        "knockback_resistance": "擊退抗性",
        "scale": "模型大小",
        "customName": "顯示名稱",
        "UniqueName": "唯一name，不可重複",
        "SpawnProbability": "此配寘生物重繪概率",
        "Additionaldamage": "對玩家額外真實傷害",
        "KillPlayerRecovery": "擊殺玩家恢復多少血量",
        "brambles": "是否開啟反傷",
        "bramblesHurt": "反傷對玩家造成的真實傷害",
        "LongRangeDamage": "是否能受到遠程傷害",
        "playerFire": "是否開啟玩家著火",
        "FireTime": "著火持續時間",
        "ArmorBreaker": "是否開啟碎甲",
        "ArmorBreakerToSE": "碎甲是否對强化裝備有效",
        "ArmorProbability": "碎甲幾率",
        "SingleReductionDamage": "碎甲减少耐久",
        "dieBlast": "是否開啟爆炸",
        "BlastDestroy": "爆炸是否破壞方塊",
        "BlastPower": "爆炸威力",
        "BlastTime": "倒數計時多久爆炸",
        "OtherDrops": "是否掉落其它物品",
        "OtherDropsMode": "0是全部隨機掉落，1是選一個100%掉落",
        "GiveXpToPlayer": "額經驗值",
        "addTalentValue": "給予擊殺者天賦點（對接强化生存）",
        "reel_reel": "是否開啟卷軸掉落",
        "reel_reelLvl": "掉落的卷軸等級",
        "reel_probability": "掉落幾率",
        "economy_moneyName": "經濟類型",
        "economy_probability": "獲得幾率",
        "economy_quantity": "獲得數量",
        "economy_describe": "經濟顯示名稱",
        "fragmentsArtifactStones_state": "是否開啟神器碎片掉落",
        "fragmentsArtifactStones_name": "强化挿件配寘的神器石碎片名稱",
        "fragmentsArtifactStones_number": "掉落數量",
        "fragmentsArtifactStones_probability": "掉落概率",
        "addEntityTips": "{0}添加完成！",
        "modifyEntity_1": "修改配寘",
        "modifyEntity_2": "請選擇一個實體",
        "UniqueNameTips": "請選擇要修改的生物的UniqueName",
        "smallitem": "請選擇要修改的小項！",
        "OriginalData": "原版數據",
        "OtherAbility": "其他能力",
        "buff": "攜帶的buff數據",
        "Disarm": "玩家掉落物品項",
        "Explosion": "死亡後爆炸項",
        "BeFire": "玩家著火項",
        "Scabbing": "玩家碎甲項",
        "trophy": "相關戰利品項",
        "changesSaved": "配寘修改成功！",
        "editBuffsLoot": "buff相關",
        "PleaseSelect": "請選擇！",
        "buff1": "buff",
        "trophy1": "戰利品",
        "addBuff_1": "新增buff",
        "modifyBuff_1": "修改現有buff",
        "removeBuff_1": "移除buff",
        "set_buff_id": "buff英文id",
        "set_buff_lvl": "buff等級",
        "set_buff_time": "buff持續時間"
    },
    "en": {
        "formTitle": "Select Entity",
        "configUp": "Please go to data/EntityData.json to view the updated configuration file!",
        "cmdExplain": "Hey hey, strengthen your monster!",
        "Intensifyerr": "The front-end plug-in Intensify.js is not found. Please go to download it or set DockingIntensify to false in the configuration file Config.json",
        "giveserr": "The front-end plug-in gives.js is not found. Please go to download it or set DockingGives to false in the configuration file Config.json",
        "entityInformation": "Entity name: {0}  nMaximum HP of entity: {1}  nMoving speed of entity: {2}  nEntity tracking distance: {3}  nEntity resistance: {4}",
        "CmdOutpError1": "This biological related configuration file was not found",
        "BlastTips": "Because you killed {0}, it will explode in {1} seconds!",
        "IntensifySurvivalerr": "The front-end plug-in IntensifySurvivor.js was not found. Please go to download or set DockingIntensifySurvivor.js to false in the configuration file Config.json",
        "economyTips": "You got {0} {1}",
        "mainFormTitle": "Enhanced Creatures - Main Menu",
        "mainFormContent": "Please select the project you want to modify!",
        "mainFormButton_1": "Add Entity Configuration",
        "mainFormButton_2": "Modify Entity Configuration",
        "mainFormButton_3": "Query Entity Data",
        "state": "Enable/Disable",
        "addEntityConfigFormTitle": "Enhanced Creatures - Add Creature",
        "addEntityConfigFormContent": "Please select the entity you want to add!",
        "addEntity_1": "Basic Data",
        "addEntity_2": "Other Abilities",
        "addEntity_3": "Buff Data",
        "addEntity_3Tips": "Buff data can only be enabled/disabled, other data should be modified in the configuration file!",
        "addEntity_4": "Player Drop Items",
        "addEntity_5": "Exploding After Death Items",
        "addEntity_6": "Player Set on Fire Items",
        "addEntity_7": "Armor Piercing Items",
        "addEntity_8": "Loot Items",
        "DropOffset_x": "Offset value of player drop items on the x-axis",
        "DropOffset_z": "Offset value of player drop items on the z-axis",
        "WhetherDisarm": "Enable/Disable player drop items",
        "DisarmingProbability": "Probability of player drop items",
        "health": "Health",
        "movement": "Land movement speed",
        "underwater_movement": "Underwater movement speed",
        "lava_movement": "Lava movement speed",
        "follow_range": "Tracking distance",
        "knockback_resistance": "Knockback resistance",
        "scale": "Model size",
        "customName": "Display name",
        "UniqueName": "Unique name, cannot be repeated",
        "SpawnProbability": "Refresh probability of this creature configuration",
        "Additionaldamage": "Extra true damage to players",
        "KillPlayerRecovery": "How much health is restored when killing a player",
        "brambles": "Enable/Disable counterattack",
        "bramblesHurt": "True damage to players caused by counterattack",
        "LongRangeDamage": "Enable/Disable ranged damage",
        "playerFire": "Enable/Disable player set on fire",
        "FireTime": "Duration of being set on fire",
        "ArmorBreaker": "Enable/Disable armor piercing",
        "ArmorBreakerToSE": "Whether armor piercing is effective against enhanced equipment",
        "ArmorProbability": "Armor piercing probability",
        "SingleReductionDamage": "Armor piercing reduces durability",
        "dieBlast": "Enable/Disable explosion after death",
        "BlastDestroy": "Whether the explosion destroys blocks",
        "BlastPower": "Explosion power",
        "BlastTime": "Countdown time until explosion",
        "OtherDrops": "Enable/Disable other item drops",
        "OtherDropsMode": "0 = random drop all, 1 = choose one item to drop 100%",
        "GiveXpToPlayer": "Experience value given to player",
        "addTalentValue": "Give talent points to the player who kills the creature (linked with Enhanced Survival)",
        "reel_reel": "Enable/Disable scroll drops",
        "reel_reelLvl": "Level of dropped scrolls",
        "reel_probability": "Probability of scroll drops",
        "economy_moneyName": "Economy type",
        "economy_probability": "Probability of receiving economy rewards",
        "economy_quantity": "Quantity of economy rewards",
        "economy_describe": "Display name of economy rewards",
        "fragmentsArtifactStones_state": "Enable/Disable artifact fragment drops",
        "fragmentsArtifactStones_name": "Name of the artifact stone fragments configured in the plugin",
        "fragmentsArtifactStones_number": "Number of fragments dropped",
        "fragmentsArtifactStones_probability": "Probability of fragment drops",
        "addEntityTips": "{0} added successfully!",
        "modifyEntity_1": "Modify Configuration",
        "modifyEntity_2": "Please select an entity",
        "UniqueNameTips": "Please select the UniqueName of the creature to be modified",
        "smallitem": "Please select the item to be modified!",
        "OriginalData": "Original data",
        "OtherAbility": "Other abilities",
        "buff": "Carried buff data",
        "Disarm": "Player drop items",
        "Explosion": "Items that explode after death",
        "BeFire": "Player set on fire items",
        "Scabbing": "Player armor piercing items",
        "trophy": "Related loot items",
        "changesSaved": "Configuration modified successfully!",
        "editBuffsLoot": "buff related",
        "PleaseSelect": "Please select!",
        "buff1": "buff",
        "trophy1": "loot",
        "addBuff_1": "New buff",
        "modifyBuff_1": "Modify an existing buff",
        "removeBuff_1": "Remove buff",
        "set_buff_id": "buff id",
        "set_buff_lvl": "buff level",
        "set_buff_time": "buff duration"
    }
});

/**
 * 判断是否需要加载前置插件及语言文件.
 * 判断生成概率是否需要限制.
 */
if (Config.DockingIntensify) {
    if (ll.require("Intensify.js")) {
        getReelNbt = ll.import("intensify", "reel");
        getFragmentsNbt = ll.import("intensify", "fragments");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("Intensifyerr", ll.language));
            Config.DockingIntensify = false;
        }, 1000 * 5);
    }
}
if (Config.DockingGives) {
    if (ll.require("gives.js")) {
        GetNewItemNbt = ll.import("NewItemNbt");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("giveserr", ll.language));
            Config.DockingGives = false;
        }, 1000 * 5);
    }
}
if (Config.DockingIntensifySurvival) {
    if (ll.require("IntensifySurvival.js")) {
        AddTalentValue = ll.import("IntensifySurvival", "AddValue");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("IntensifySurvivalerr", ll.language));
            Config.DockingIntensifySurvival = false;
        }, 1000 * 5);
    }
}
FourProfileUpdate();

/**
 * 实体转变事件监听.
 * 用于移除强化怪物转变后的问题.
 */
mc.listen("onEntityTransformation", (_uniqueId, entity) => {
    let UniqueNameArray = queryClass.EntityNameArraySet();
    if (UniqueNameArray.includes(entity.name)) {
        entity.despawn();
        entity.remove();
    }
});

/**
 * 每tk执行.
 * 判定是否强制实体大小.
 */
mc.listen("onTick", () => {
    if (Config.ForceEntitySize) {
        let AllEntityArray = mc.getAllEntities();
        AllEntityArray.forEach(entity => {
            if (entity.hasTag("Intensify")) {
                let UniqueName = queryClass.getEntityUniqueName(entity);
                if (UniqueName != "") {
                    let DataJsonObj = queryClass.UniqueNameGetEntityJson(UniqueName, entity.type);
                    if (DataJsonObj != {}) {
                        entity.setScale(parseInt(DataJsonObj.scale));
                    }
                }
            }
        });
    }
})

/**
 * 玩家死亡监听.
 * 用于处理强化怪击杀玩家回血.
 */
mc.listen("onPlayerDie", (_player, source) => {
    if (source != undefined) {
        if (source.hasTag("Intensify") && source.type != "minecraft:creeper") {
            let UniqueName = queryClass.getEntityUniqueName(source);
            if (UniqueName != "") {
                let DataJsonObj = queryClass.UniqueNameGetEntityJson(UniqueName, source.type);
                if (DataJsonObj != {}) {
                    let addHealth = DataJsonObj.OtherAbility.KillPlayerRecovery;
                    if (addHealth != 0) {
                        if (source.health < source.maxHealth) {
                            if (source.maxHealth - source.health > addHealth) {
                                source.setHealth(source.health + addHealth);
                            } else {
                                source.setHealth(source.maxHealth);
                            }
                        }
                    }
                }
            }
        }
    }
});

/**
 * 实体骑乘监听.
 * 判断是否是强化怪物并拦截其骑乘.
 */
mc.listen("onRide", (entity1, _entity2) => {
    if (entity1.hasTag("Intensify")) {
        return false;
    }
});

/**
 * 实体踩压力板事件.
 * 用于判断和拦截强化怪踩下压力板.
 */
mc.listen("onStepOnPressurePlate", (entity, _pressurePlate) => {
    if (entity.hasTag("Intensify")) {
        if (!Config.PressurePlate) {
            return false;
        }
    }
});

/**
 * 监听生物生成.
 * 判断生物是否在强化文件内.
 * 然后随机判断是否生成强化生物.
 */
mc.listen("onMobSpawned", (entity, pos) => {
    if (entity != undefined) {
        let typeName = entity.type;
        if (EntityNbtJson[typeName] != undefined) {
            let ConfigureRandom = specifiedRangeRandomNumber(0, EntityNbtJson[typeName].length);
            let SelectConfiguration = EntityNbtJson[typeName][ConfigureRandom];
            if (SelectConfiguration != undefined) {
                let EntityGenerationProbability = SelectConfiguration.OtherAbility.SpawnProbability;
                let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                if (randomInt <= EntityGenerationProbability) {
                    if (Config.mobSpawner) {
                        setNewEntity(entity, SelectConfiguration);
                    } else {
                        let mobSpawnerBool = queryClass.findNearestBlock(pos);
                        if (!mobSpawnerBool) {
                            setNewEntity(entity, SelectConfiguration);
                        }
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
                let EntityJsonUniqueName = entityJson[i].OriginalData.UniqueName;
                if (mob.hasTag(EntityJsonUniqueName)) {
                    entityDataJson = entityJson[i];
                    break;
                }
            }
            if (entityDataJson != {}) {
                let player = source.toPlayer();
                if (entityDataJson.Explosion.dieBlast) {
                    player.tell(i18n.trl(player.langCode, "BlastTips", mob.name, entityDataJson.BlastTime));
                    setTimeout(() => {
                        mc.explode(pos, mob, entityDataJson.Explosion.BlastPower, entityDataJson.Explosion.BlastDestroy, false);
                    }, entityDataJson.Explosion.BlastTime * 1000);
                }
                if (Config.DockingIntensify) {
                    let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                    if (entityDataJson.trophy.reel.reel) {
                        if (randomInt <= entityDataJson.trophy.reel.probability) {
                            let newItem = getReelNbt(player, entityDataJson.trophy.reel.reelLvl);
                            mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                        }
                    }
                    let artifactFragmentsConfig = entityDataJson.trophy.fragmentsArtifactStones;
                    if (artifactFragmentsConfig.state) {
                        let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                        if (randomInt <= artifactFragmentsConfig.probability) {
                            let newItem = getFragmentsNbt(player, artifactFragmentsConfig.name, artifactFragmentsConfig.number);
                            mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                        }
                    }
                }
                if (entityDataJson.trophy.OtherDrops) {
                    if (entityDataJson.trophy.OtherDropsMode == 0 && entityDataJson.trophy.ListSpoils != []) {
                        let SpoilsList = entityDataJson.trophy.ListSpoils;
                        SpoilsList.forEach(CurrentOptions => {
                            let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                            if (randomInt <= CurrentOptions.SpoilsProbability) {
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
                    } else if (entityDataJson.trophy.OtherDropsMode == 1 && entityDataJson.trophy.ListSpoils != []) {
                        let SpoilsList = entityDataJson.trophy.ListSpoils;
                        let randomInt = specifiedRangeRandomNumber(0, SpoilsList.length);
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
                let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                let economyConfig = entityDataJson.trophy.economy;
                if (randomInt <= economyConfig.probability) {
                    if (economyConfig.moneyName == "llmoney") {
                        player.addMoney(economyConfig.quantity);
                    } else {
                        mc.runcmdEx(`scoreboard players add "${player.realName}" ${randomInt} ${economyConfig.quantity}`);
                    }
                    player.tell(i18n.trl(player.langCode, "economyTips", economyConfig.quantity, economyConfig.describe));
                }

                if (Config.DockingIntensifySurvival) {
                    AddTalentValue(player.xuid, entityDataJson.trophy.addTalentValue);
                }
                player.addExperience(entityDataJson.trophy.GiveXpToPlayer);
            }
        }
    }
})

/**
 * 监听生物受伤事件.
 * 判断是否是玩家受伤及造成伤害的是否是强化生物.
 * 对玩家造成额外的真实伤害以及着火.
 */
mc.listen("onMobHurt", (mob, source, _damage, cause) => {
    if (mob.isPlayer() && source != undefined) {
        let entityJson = EntityNbtJson[source.type];
        if (entityJson != undefined && source.hasTag("Intensify")) {
            let entityDataJson = {};
            for (let i = 0; i < entityJson.length; i++) {
                let EntityJsonUniqueName = entityJson[i].OriginalData.UniqueName;
                if (source.hasTag(EntityJsonUniqueName)) {
                    entityDataJson = entityJson[i];
                    break;
                }
            }
            if (entityDataJson != {}) {
                if (cause == 3) {
                    if (!entityDataJson.OtherAbility.LongRangeDamage) {
                        return false;
                    }
                }
                let damage = 0;
                if (entityDataJson.OtherAbility.brambles) {
                    damage += entityDataJson.OtherAbility.bramblesHurt;
                }
                damage += entityDataJson.OtherAbility.Additionaldamage;
                let player = mob.toPlayer();
                if (entityDataJson.Disarm.WhetherDisarm) {
                    let random = specifiedRangeRandomNumber(0, 100, 4);
                    if (random <= entityDataJson.Disarm.DisarmingProbability) {
                        let playerHand = player.getHand();
                        if (!playerHand.isNull()) {
                            let DropOffsetX = entityDataJson.Disarm.DropOffset.x;
                            let DropOffsetZ = entityDataJson.Disarm.DropOffset.z;
                            if (mc.spawnItem(playerHand, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                                playerHand.setNull()
                                player.refreshItems()
                            }
                        }
                    }
                }
                if (entityDataJson.Scabbing.ArmorBreaker) {
                    let playerArmor = player.getArmor();
                    let playerArmorAllItem = playerArmor.getAllItems();
                    playerArmorAllItem.forEach(item => {
                        if (!item.isNull()) {
                            let random = specifiedRangeRandomNumber(0, 100, 4);
                            if (entityDataJson.Scabbing.ArmorBreakerToSE) {
                                if (random <= entityDataJson.Scabbing.ArmorProbability) {
                                    item.setDamage(item.damage + entityDataJson.Scabbing.SingleReductionDamage);
                                }
                            } else if (!queryClass.isIntensify(item)) {
                                if (random <= entityDataJson.Scabbing.ArmorProbability) {
                                    item.setDamage(item.damage + entityDataJson.Scabbing.SingleReductionDamage);
                                }
                            }
                        }
                    });
                }

                setTimeout(() => {
                    player.hurt(damage);
                    if (entityDataJson.BeFire.playerFire) {
                        player.setFire(entityDataJson.BeFire.FireTime, false);
                    }
                }, 500);
            }
        }
    }
})

/**
 * 服务器启动完毕监听.
 * 用于命令注册.
 */
mc.listen("onServerStarted", () => {
    let UniqueNameArray = queryClass.EntityUniqueNameArraySet();
    let Command = mc.newCommand("intensifymonster", i18n.get("cmdExplain", ll.language), PermType.GameMasters);
    Command.setEnum("type", ["query", "spawn"]);
    Command.setEnum("EntityUName", UniqueNameArray);
    Command.mandatory("mode", ParamType.Enum, "type");
    Command.mandatory("entity", ParamType.ActorType);
    Command.mandatory("pos", ParamType.Vec3);
    Command.mandatory("Uname", ParamType.Enum, "EntityUName");
    Command.overload(["mode"]);
    Command.overload(["mode", "entity", "Uname", "pos"]);
    Command.setCallback((_cmd, origin, output, results) => {
        if (results.mode == "query" && origin.player != undefined) {
            //PlayerCmdHandle(origin.player);
            ConfigureForms.mainForm(origin.player);
        } else if (results.mode == "spawn") {
            let pos = results.pos;
            let EntityType = results.entity;
            let uname = results.Uname;
            if (EntityNbtJson[EntityType] != undefined) {
                let EntityDataJson = queryClass.UniqueNameGetEntityJson(uname, EntityType);
                if (EntityDataJson != {}) {
                    let entity = mc.spawnMob(EntityType, pos);
                    setNewEntity(entity, EntityDataJson);
                } else {
                    output.error(i18n.get("CmdOutpError1", ll.language));
                }
            } else {
                output.error(i18n.get("CmdOutpError1", ll.language));
            }
        }
    });
    Command.setup();
    if (Config.ParticleEffect) {
        ParticleScheduledTasks();
    }
});

/**
 * 表单处理
 */
const ConfigureForms = {
    /**
     * 主表单处理.
     * @param {Player} player 玩家对象
     */
    mainForm: function (player) {
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("mainFormTitle", player.langCode))
            .setContent(i18n.get("mainFormContent", player.langCode))
            .addButton(i18n.get("mainFormButton_1", player.langCode))
            .addButton(i18n.get("mainFormButton_2", player.langCode))
            .addButton(i18n.get("mainFormButton_3", player.langCode))
            .addButton(i18n.get("mainFormButton_4", player.langCode))
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                switch (id) {
                    case 0:
                        addEntityToConfig.addEntity_Select(player);
                        break;
                    case 1:
                        modifyEntityToConfig.modifyEntityMainForm(player);
                        break;
                    case 2:
                        queryEntityData.PlayerCmdHandle(player);
                        break;
                    case 3:
                        spoilsSndBuffs.mainForm(player);
                        break;
                }
            } else {
                return false;
            }
        })
    },

}

/**
 * 添加实体表单
 */
const addEntityToConfig = {
    addEntity_Select: function (player) {
        let allEntity = mc.getAllEntities();
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("addEntityConfigFormTitle", player.langCode))
            .setContent(i18n.get("addEntityConfigFormContent", player.langCode));
        allEntity.forEach(entity => {
            fm.addButton(`${entity.name}\n${entity.type}`);
        });
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.addEntity_OriginalData(allEntity, player, id);
            } else {
                return false;
            }
        })
    },
    addEntity_OriginalData: function (allEntity, player, id) {
        let TemporaryRecords = {};
        let enType = allEntity[id].type;
        let enName = allEntity[id].name;
        let OriginalData = InitializedTemplate.OriginalData;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_1", player.langCode)}`);
        for (let key in OriginalData) {
            fm.addInput(i18n.get(key, player.langCode), String(OriginalData[key]), String(OriginalData[key]));
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let ii = 0;
                for (let i in OriginalData) {
                    if (typeof OriginalData[i] === "boolean" || typeof OriginalData[i] === "string") {
                        OriginalData[i] = id[ii];
                    } else if (typeof OriginalData[i] === "number") {
                        if (id[ii].indexOf('.') != -1) {
                            OriginalData[i] = parseFloat(id[ii]);
                        } else {
                            OriginalData[i] = parseInt(id[ii]);
                        }
                    }
                    ii += 1;
                }
                TemporaryRecords[enType] = {};
                TemporaryRecords[enType].OriginalData = OriginalData;
                this.addEntity_OtherAbility(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_OtherAbility: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.OtherAbility;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_2", player.langCode)}`);
        for (let key in OtherAbility) {
            if (typeof OtherAbility[key] === "boolean") {
                fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
            } else {
                fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let ii = 0;
                for (let i in OtherAbility) {
                    if (typeof OtherAbility[i] === "boolean" || typeof OtherAbility[i] === "string") {
                        OtherAbility[i] = id[ii];
                    } else if (typeof OtherAbility[i] === "number") {
                        if (id[ii].indexOf('.') != -1) {
                            OtherAbility[i] = parseFloat(id[ii]);
                        } else {
                            OtherAbility[i] = parseInt(id[ii]);
                        }
                    }
                    ii += 1;
                }

                TemporaryRecords[enType].OtherAbility = OtherAbility;
                this.addEntity_buff(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_buff: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.buff;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_3", player.langCode)}`)
            .addLabel(i18n.get("addEntity_3Tips", player.langCode))
            .addSwitch(i18n.get("state", player.langCode), OtherAbility["state"]);
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                TemporaryRecords[enType].buff = {
                    "state": id[1],
                    "buffArray": [
                        {
                            "id": "resistance",
                            "lvl": 1,
                            "time": 10000
                        }
                    ]
                }
                this.addEntity_Disarm(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_Disarm: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.Disarm;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_4", player.langCode)}`);
        for (let key in OtherAbility) {
            if (key == "DropOffset") {
                for (let i in OtherAbility[key]) {
                    fm.addInput(i18n.get(`DropOffset_${i}`, player.langCode), OtherAbility[key][i].toString(), OtherAbility[key][i].toString());
                }
            } else {
                if (typeof OtherAbility[key] === "boolean") {
                    fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
                } else {
                    fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
                }
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let temporary;
                if (id[1].indexOf('.') != -1) {
                    temporary = parseFloat(id[1]);
                } else {
                    temporary = parseInt(id[1]);
                }
                TemporaryRecords[enType].Disarm = {
                    "WhetherDisarm": id[0],
                    "DisarmingProbability": temporary,
                    "DropOffset": {
                        "x": parseInt(id[2]),
                        "z": parseInt(id[3])
                    }
                }
                this.addEntity_Explosion(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_Explosion: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.Explosion;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_5", player.langCode)}`);
        for (let key in OtherAbility) {
            if (typeof OtherAbility[key] === "boolean") {
                fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
            } else {
                fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let ii = 0;
                for (let i in OtherAbility) {
                    if (typeof OtherAbility[i] === "boolean" || typeof OtherAbility[i] === "string") {
                        OtherAbility[i] = id[ii];
                    } else if (typeof OtherAbility[i] === "number") {
                        if (id[ii].indexOf('.') != -1) {
                            OtherAbility[i] = parseFloat(id[ii]);
                        } else {
                            OtherAbility[i] = parseInt(id[ii]);
                        }
                    }
                    ii += 1;
                }
                TemporaryRecords[enType].Explosion = OtherAbility;
                this.addEntity_BeFire(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_BeFire: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.BeFire;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_6", player.langCode)}`);
        for (let key in OtherAbility) {
            if (typeof OtherAbility[key] === "boolean") {
                fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
            } else {
                fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                TemporaryRecords[enType].BeFire = {
                    "playerFire": id[0],
                    "FireTime": parseInt(id[1])
                }
                this.addEntity_Scabbing(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_Scabbing: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.Scabbing;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_7", player.langCode)}`);
        for (let key in OtherAbility) {
            if (typeof OtherAbility[key] === "boolean") {
                fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
            } else {
                fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let ii = 0;
                for (let i in OtherAbility) {
                    if (typeof OtherAbility[i] === "boolean" || typeof OtherAbility[i] === "string") {
                        OtherAbility[i] = id[ii];
                    } else if (typeof OtherAbility[i] === "number") {
                        if (id[ii].indexOf('.') != -1) {
                            OtherAbility[i] = parseFloat(id[ii]);
                        } else {
                            OtherAbility[i] = parseInt(id[ii]);
                        }
                    }
                    ii += 1;
                }
                TemporaryRecords[enType].Scabbing = OtherAbility;
                this.addEntity_trophy(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_trophy: function (TemporaryRecords, player, enName, enType) {
        let OtherAbility = InitializedTemplate.trophy;
        let fm = mc.newCustomForm()
            .setTitle(`${enName}-${i18n.get("addEntity_8", player.langCode)}`);
        for (let key in OtherAbility) {
            if ("ListSpoils" != key) {
                if (queryClass.JsonDetermine(key)) {
                    for (let i in OtherAbility[key]) {
                        if (typeof OtherAbility[key][i] === "boolean") {
                            fm.addSwitch(i18n.get(`${key}_${i}`, player.langCode), OtherAbility[key][i]);
                        } else {
                            fm.addInput(i18n.get(`${key}_${i}`, player.langCode), OtherAbility[key][i].toString(), OtherAbility[key][i].toString());
                        }
                    }
                } else {
                    if (typeof OtherAbility[key] === "boolean") {
                        fm.addSwitch(i18n.get(key, player.langCode), OtherAbility[key]);
                    } else {
                        fm.addInput(i18n.get(key, player.langCode), OtherAbility[key].toString(), OtherAbility[key].toString());
                    }
                }
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                TemporaryRecords[enType].trophy = {
                    "OtherDrops": id[0],
                    "OtherDropsMode": parseInt(id[1]),
                    "GiveXpToPlayer": parseInt(id[2]),
                    "addTalentValue": parseFloat(id[3]),
                    "reel": {
                        "reel": id[4],
                        "reelLvl": parseInt(id[5]),
                        "probability": parseInt(id[6])
                    },
                    "economy": {
                        "moneyName": id[7],
                        "probability": parseInt(id[8]),
                        "quantity": parseInt(id[9]),
                        "describe": id[10]
                    },
                    "fragmentsArtifactStones": {
                        "state": id[11],
                        "name": id[12],
                        "number": parseInt(id[13]),
                        "probability": parseInt(id[14])
                    },
                    "ListSpoils": [
                        {
                            "Spoils": "ordinary",
                            "SpoilsTypeName": "minecraft:stone",
                            "SpoilsProbability": 0,
                            "SpoilsqQantity": 1
                        },
                        {
                            "Spoils": "gives",
                            "SpoilsTypeName": "minecraft:wooden_sword",
                            "DisplayName": "",
                            "SpoilsProbability": 0,
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
                this.addEntity_Summary(TemporaryRecords, player, enName, enType);
            } else {
                return false;
            }
        })
    },
    addEntity_Summary: function (TemporaryRecords, player, enName, enType) {
        if (EntityNbtJson[enType] == undefined) {
            EntityNbtJson[enType] = [];
            EntityNbtJson[enType].push(TemporaryRecords[enType]);
            File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
        } else {
            EntityNbtJson[enType].push(TemporaryRecords[enType]);
            File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
        }
        player.tell(i18n.trl(player.langCode, "addEntityTips", enName));
    }
}

/**
 * 修改实体配置
 */
const modifyEntityToConfig = {
    modifyEntityMainForm: function (player) {
        let entityTypeArray = [];
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyEntity_1", player.langCode))
            .setContent(i18n.get("modifyEntity_2", player.langCode));
        for (let key in EntityNbtJson) {
            fm.addButton(key);
            entityTypeArray.push(key);
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.SelectConfigurationItem(player, entityTypeArray[id]);
            } else {
                return false;
            }
        })
    },
    SelectConfigurationItem: function (player, entityType) {
        let uniqueNameArray = queryClass.getAppointEntityUniqueName(entityType);
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyEntity_1", player.langCode))
            .setContent(i18n.get("UniqueNameTips", player.langCode));
        uniqueNameArray.forEach(uniqueName => {
            fm.addButton(uniqueName);
        });
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.obtainSelectedConfiguration(player, id, uniqueNameArray, entityType)
            } else {
                return false;
            }
        })
    },
    obtainSelectedConfiguration: function (player, position, uniqueNameArray, entityType) {
        let smallitemArray = [];
        let ConfigJson = queryClass.UniqueNameGetEntityJson(uniqueNameArray[position], entityType);
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyEntity_1", player.langCode))
            .setContent(i18n.get("smallitem", player.langCode));
        for (let key in ConfigJson) {
            fm.addButton(i18n.get(key, player.langCode));
            smallitemArray.push(key);
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.changeOptions(player, position, ConfigJson, entityType, smallitemArray[id]);
            } else {
                return false;
            }
        })
    },
    changeOptions: function (player, position, ConfigJson, entityType, key) {
        switch (key) {
            case "trophy":
                this.trophySpoils(player, position, ConfigJson, entityType, key);
                break;
            case "Disarm":
                this.disarmSpoils(player, position, ConfigJson, entityType, key);
                break;
            case "buff":
                this.buffSpoils(player, position, ConfigJson, entityType, key);
                break;
            default:
                let current = ConfigJson[key];
                let fm = mc.newCustomForm()
                    .setTitle(`${entityType}-${i18n.get(key, player.langCode)}`);
                for (let i in current) {
                    if (typeof current[i] === "boolean") {
                        fm.addSwitch(i18n.get(i, player.langCode), current[i]);
                    } else {
                        fm.addInput(i18n.get(i, player.langCode), current[i].toString(), current[i].toString());
                    }
                }
                player.sendForm(fm, (player, id) => {
                    if (id != undefined) {
                        let ii = 0;
                        for (let i in current) {
                            if (typeof current[i] === "boolean" || typeof current[i] === "string") {
                                current[i] = id[ii];
                            } else if (typeof current[i] === "number") {
                                if (id[ii].indexOf('.') != -1) {
                                    current[i] = parseFloat(id[ii]);
                                } else {
                                    current[i] = parseInt(id[ii]);
                                }
                            }
                            ii += 1;
                        }
                        EntityNbtJson[entityType][position][key] = current;
                        File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                        player.tell(i18n.get("changesSaved", player.langCode));
                    } else {
                        return false;
                    }
                })
        }

    },
    disarmSpoils: function (player, position, ConfigJson, entityType, key) {
        let current = ConfigJson[key];
        let fm = mc.newCustomForm()
            .setTitle(`${entityType}-${i18n.get(key, player.langCode)}`);
        for (let i in current) {
            if (i == "DropOffset") {
                for (let i1 in current[i]) {
                    fm.addInput(i18n.get(`DropOffset_${i1}`, player.langCode), current[i][i1].toString(), current[i][i1].toString());
                }
            } else {
                if (typeof current[key] === "boolean") {
                    fm.addSwitch(i18n.get(i, player.langCode), current[i]);
                } else {
                    fm.addInput(i18n.get(i, player.langCode), current[i].toString(), current[i].toString());
                }
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                EntityNbtJson[entityType][position].Disarm = {
                    "WhetherDisarm": id[0],
                    "DisarmingProbability": parseInt(id[1]),
                    "DropOffset": {
                        "x": parseInt(id[2]),
                        "z": parseInt(id[3])
                    }
                }
                File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                player.tell(i18n.get("changesSaved", player.langCode));
            } else {
                return false;
            }
        })
    },
    buffSpoils: function (player, position, ConfigJson, entityType, key) {
        let fm = mc.newCustomForm()
            .setTitle(`${entityType}-${i18n.get(key, player.langCode)}`)
            .addLabel(i18n.get("addEntity_3Tips", player.langCode))
            .addSwitch(i18n.get("state", player.langCode), ConfigJson.buff.state);
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                EntityNbtJson[entityType][position].buff = {
                    "state": id[1],
                    "buffArray": ConfigJson.buff.buffArray
                }
                File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                player.tell(i18n.get("changesSaved", player.langCode));
            } else {
                return false;
            }
        })
    },
    trophySpoils: function (player, position, ConfigJson, entityType, key) {
        let current = ConfigJson[key];
        let fm = mc.newCustomForm()
            .setTitle(`${entityType}-${i18n.get(key, player.langCode)}`);
        for (let i in current) {
            if ("ListSpoils" != i) {
                if (queryClass.JsonDetermine(i)) {
                    for (let i1 in current[i]) {
                        if (typeof current[i][i1] === "boolean") {
                            fm.addSwitch(i18n.get(`${i}_${i1}`, player.langCode), current[i][i1]);
                        } else {
                            fm.addInput(i18n.get(`${i}_${i1}`, player.langCode), current[i][i1].toString(), current[i][i1].toString());
                        }
                    }
                } else {
                    if (typeof current[i] === "boolean") {
                        fm.addSwitch(i18n.get(i, player.langCode), current[i]);
                    } else {
                        fm.addInput(i18n.get(i, player.langCode), current[i].toString(), current[i].toString());
                    }
                }
            }
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                EntityNbtJson[entityType][position].trophy = {
                    "OtherDrops": id[0],
                    "OtherDropsMode": parseInt(id[1]),
                    "GiveXpToPlayer": parseInt(id[2]),
                    "addTalentValue": parseFloat(id[3]),
                    "reel": {
                        "reel": id[4],
                        "reelLvl": parseInt(id[5]),
                        "probability": parseInt(id[6])
                    },
                    "economy": {
                        "moneyName": id[7],
                        "probability": parseInt(id[8]),
                        "quantity": parseInt(id[9]),
                        "describe": id[10]
                    },
                    "fragmentsArtifactStones": {
                        "state": id[11],
                        "name": id[12],
                        "number": parseInt(id[13]),
                        "probability": parseInt(id[14])
                    },
                    "ListSpoils": ConfigJson.trophy.ListSpoils
                }
                File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                player.tell(i18n.get("changesSaved", player.langCode));
            } else {
                return false;
            }
        })
    }

}

/**
 * buff及战利品相关配置
 */
const spoilsSndBuffs = {
    mainForm: function (player) {
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("editBuffsLoot", player.langCode))
            .setContent(i18n.get("PleaseSelect", player.langCode))
            .addButton(i18n.get("buff1", player.langCode));
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.modifyEntityMainForm(player, id);
            } else {
                return false;
            }
        })
    },
    modifyEntityMainForm: function (player, mode) {
        let entityTypeArray = [];
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyEntity_1", player.langCode))
            .setContent(i18n.get("modifyEntity_2", player.langCode));
        for (let key in EntityNbtJson) {
            fm.addButton(key);
            entityTypeArray.push(key);
        }
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.SelectConfigurationItem(player, entityTypeArray[id], mode);
            } else {
                return false;
            }
        })
    },
    SelectConfigurationItem: function (player, entityType, mode) {
        let uniqueNameArray = queryClass.getAppointEntityUniqueName(entityType);
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyEntity_1", player.langCode))
            .setContent(i18n.get("UniqueNameTips", player.langCode));
        uniqueNameArray.forEach(uniqueName => {
            fm.addButton(uniqueName);
        });
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                this.obtainSelectedConfiguration(player, id, uniqueNameArray, entityType, mode)
            } else {
                return false;
            }
        })
    },
    obtainSelectedConfiguration: function (player, position, uniqueNameArray, entityType, mode) {
        let ConfigJson = queryClass.UniqueNameGetEntityJson(uniqueNameArray[position], entityType);
        if (mode == 0) {
            let fm = mc.newSimpleForm()
                .setTitle(i18n.get("buff1", player.langCode))
                .addButton(i18n.get("addBuff_1", player.langCode))
                .addButton(i18n.get("modifyBuff_1", player.langCode))
                .addButton(i18n.get("removeBuff_1", player.langCode));
            player.sendForm(fm, (player, id) => {
                if (id != undefined) {
                    switch (id) {
                        case 0:
                            buffSetRelated.addBuffConfig(player, position, entityType);
                            break;
                        case 1:
                            buffSetRelated.modifyBuffConfig(player, position, ConfigJson, entityType);
                            break;
                        case 2:
                            buffSetRelated.removeBuffConfig(player, position, ConfigJson, entityType);
                            break;
                    }
                } else {
                    return false;
                }
            })
        }
    }
}
/**
 * BUFF设置集合
 */
const buffSetRelated = {
    addBuffConfig: function (player, position, entityType) {
        let fm = mc.newCustomForm()
            .setTitle(i18n.get("addBuff_1", player.langCode))
            .addInput(i18n.get("set_buff_id", player.langCode))
            .addInput(i18n.get("set_buff_lvl", player.langCode))
            .addInput(i18n.get("set_buff_time", player.langCode))
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let temporary = {
                    "id": id[0],
                    "lvl": parseInt(id[1]),
                    "time": parseInt(id[2])
                };
                EntityNbtJson[entityType][position].buff.buffArray.push(temporary);
                File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                player.tell(i18n.get("changesSaved", player.langCode));
            } else {
                return false;
            }
        })
    },
    modifyBuffConfig: function (player, position, ConfigJson, entityType) {
        let buffNameArray = queryClass.getCurrentBuffID(ConfigJson);
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyBuff_1", player.langCode));
        buffNameArray.forEach(buffName => {
            fm.addButton(buffName);
        });
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                let buffData = ConfigJson.buff.buffArray[id];
                let fm = mc.newCustomForm()
                    .setTitle(i18n.get("modifyBuff_1", player.langCode))
                    .addInput(i18n.get("set_buff_id", player.langCode), buffData.id.toString(), buffData.id.toString())
                    .addInput(i18n.get("set_buff_lvl", player.langCode), buffData.lvl.toString(), buffData.lvl.toString())
                    .addInput(i18n.get("set_buff_time", player.langCode), buffData.time.toString(), buffData.time.toString());
                player.sendForm(fm, (player, data) => {
                    if (data != undefined) {
                        let temporary = {
                            "id": data[0],
                            "lvl": parseInt(data[1]),
                            "time": parseInt(data[2])
                        };
                        EntityNbtJson[entityType][position].buff.buffArray[id] = temporary;
                        File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                        player.tell(i18n.get("changesSaved", player.langCode));
                    } else {
                        return false;
                    }
                })
            } else {
                return false;
            }
        })
    },
    removeBuffConfig: function (player, position, ConfigJson, entityType) {
        let buffNameArray = queryClass.getCurrentBuffID(ConfigJson);
        let fm = mc.newSimpleForm()
            .setTitle(i18n.get("modifyBuff_1", player.langCode));
        buffNameArray.forEach(buffName => {
            fm.addButton(buffName);
        });
        player.sendForm(fm, (player, id) => {
            if (id != undefined) {
                EntityNbtJson[entityType][position].buff.buffArray.splice(id, 1);
                File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
                player.tell(i18n.get("changesSaved", player.langCode));
            } else {
                return false;
            }
        })
    }
}

/**
 * 查询实体数据
 */
const queryEntityData = {
    /**
    * 查询生物数据.
    * @param {Player} player 玩家对象
    */
    PlayerCmdHandle: function (player) {
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
}

/**
 * 综合查询类
 */
const queryClass = {
    /**
     * 判断结果是不是json
     * @param {String} key 需要判断的项
     * @returns 判断结果
     */
    JsonDetermine: function (key) {
        if (key == "reel" || key == "economy" || key == "fragmentsArtifactStones") {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 查询此生物下的所有唯一名称
    * @param {String} entityType 实体标准类型名
    * @returns 查询结果Array
    */
    getAppointEntityUniqueName: function (entityType) {
        let current = EntityNbtJson[entityType];
        let uniqueNameArray = [];
        current.forEach(data => {
            uniqueNameArray.push(data.OriginalData.UniqueName);
        });
        return uniqueNameArray;
    },
    /**
    * 查询实体的唯一uname.
    * @param {Entity} entity 实体对象
    * @returns 实体的唯一name
    */
    getEntityUniqueName: function (entity) {
        let result = "";
        let UniqueNameArray = queryClass.EntityUniqueNameArraySet();
        let entityAllTag = entity.getAllTags();
        for (let key in entityAllTag) {
            if (UniqueNameArray.includes(entityAllTag[key])) {
                result = entityAllTag[key];
                return result;
            }
        }
        return result;
    },
    /**
     * 根据传来数据获取相应的配置文件.
    * @param {String} UniqueName 唯一Uname
    * @param {String} EntityType 实体类型名
    * @returns Json对象
    */
    UniqueNameGetEntityJson: function (UniqueName, EntityType) {
        let EntityJson = {};
        if (EntityNbtJson[EntityType] != undefined) {
            let currentEntity = EntityNbtJson[EntityType];
            for (let key in currentEntity) {
                let entityDataJson = currentEntity[key];
                if (entityDataJson.OriginalData.UniqueName == UniqueName) {
                    EntityJson = entityDataJson;
                    return entityDataJson;
                }
            }
        }
        return EntityJson;
    },
    /**
    * 遍历配置文件中的唯一名称Uname.
    * @returns Array
    */
    EntityUniqueNameArraySet: function () {
        let UniqueNameArray = [];
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach(entityDataJson => {
                UniqueNameArray.push(entityDataJson.OriginalData.UniqueName);
            });
        }
        return UniqueNameArray;
    },
    /**
    * 遍历配置文件中的实体名称.
    * @returns Array
    */
    EntityNameArraySet: function () {
        let nameArray = [];
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach(entityDataJson => {
                nameArray.push(entityDataJson.customName);
            });
        }
        return nameArray;
    },
    /**
    * 判断物品是否是强化物品.
    * @param {Item} item 物品对象
    * @returns 布尔值
    */
    isIntensify: function (item) {
        let returnBoole = false;
        let ItemNbt = item.getNbt();
        let ItemTag = ItemNbt.getTag("tag");
        if (ItemTag != undefined) {
            let ItemAddon = ItemTag.getTag("addon");
            if (ItemAddon != undefined) {
                returnBoole = true;
            }
        }
        return returnBoole;
    },
    /**
    * 查看附近是否有刷怪笼.
    * 代码来自minedetector插件.
    * @param {Pos} pos 坐标对象
    * @returns 布尔值
    */
    findNearestBlock: function (pos) {
        const { x, y, z, dimid } = pos;
        let blockTypes = "minecraft:mob_spawner";
        let radius = 6;
        let lastDistance = 0;
        let boole = false;
        for (let lx = x - radius; lx <= x + radius; lx += 1) {
            for (let ly = y - radius; ly <= y + radius; ly += 1) {
                for (let lz = z - radius; lz <= z + radius; lz += 1) {
                    const block = mc.getBlock(lx, ly, lz, dimid);
                    if (block != undefined) {
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
        }
        return boole;
    },
    /**
    * 生成一个字符串
    * @param {Integer} num 字符串长度
    * @returns 生成好的随机字符串
    */
    generateRandomString: function (num) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    /**
     * 查询当前配置下的buff名称
     * @param {JSON} config json对象
     * @returns 查询到的array
     */
    getCurrentBuffID: function (config) {
        let buffArray = config.buff.buffArray;
        let QueryResults = [];
        buffArray.forEach(buffData => {
            QueryResults.push(buffData.id);
        });
        return QueryResults;
    }
}

/**
 * 粒子生成循环任务.
 */
function ParticleScheduledTasks() {
    setInterval(() => {
        if (Config.ParticleEffect) {
            let AllEntityArray = mc.getAllEntities();
            AllEntityArray.forEach(entity => {
                if (entity != undefined && entity.name != "") {
                    if (entity.hasTag("Intensify")) {
                        let pos = mc.newFloatPos(entity.pos.x, entity.pos.y + 2, entity.pos.z, entity.pos.dimid);
                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                        pos = mc.newFloatPos(entity.pos.x, entity.pos.y + 1, entity.pos.z + 1, entity.pos.dimid);
                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                        pos = mc.newFloatPos(entity.pos.x, entity.pos.y + 1, entity.pos.z - 1, entity.pos.dimid);
                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                        pos = mc.newFloatPos(entity.pos.x + 1, entity.pos.y + 1, entity.pos.z, entity.pos.dimid);
                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                        pos = mc.newFloatPos(entity.pos.x - 1, entity.pos.y + 1, entity.pos.z, entity.pos.dimid);
                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                    }
                }
            });
        }
    }, 20);
}

/**
 * 修改实体属性
 * @param {Entity} newEntity 实体对象
 * @param {List} NbtData 实体修改的数据
 */
function setNewEntity(newEntity, NbtData) {
    if (newEntity != undefined) {
        let newEntityNbt = newEntity.getNbt();
        let tag = queryClass.generateRandomString(8);
        let newEntityAttributes = newEntityNbt.getTag("Attributes");
        if (NbtData.OriginalData.customName != "") {
            newEntityNbt.setString("CustomName", `${NbtData.OriginalData.customName}`)
            newEntityNbt.setFloat("CustomNameVisible", 1);
        }
        if (newEntityAttributes != undefined) {
            let newEntityAttributesListLength = newEntityAttributes.getSize();
            for (let i = 0; i < newEntityAttributesListLength; i++) {
                let currentLocationObject = newEntityAttributes.getTag(i)
                if (currentLocationObject.getTag("Name") == "minecraft:health") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.health)
                    currentLocationObject.setFloat("Current", NbtData.OriginalData.health)
                    currentLocationObject.setFloat("DefaultMax", NbtData.OriginalData.health)
                    currentLocationObject.setFloat("Max", NbtData.OriginalData.health);
                } else if (currentLocationObject.getTag("Name") == "minecraft:movement") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.movement)
                    currentLocationObject.setFloat("Current", NbtData.OriginalData.movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:underwater_movement") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.underwater_movement)
                    currentLocationObject.setFloat("Current", NbtData.OriginalData.underwater_movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:lava_movement") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.lava_movement)
                    currentLocationObject.setFloat("Current", NbtData.OriginalData.lava_movement);
                } else if (currentLocationObject.getTag("Name") == "minecraft:follow_range") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.follow_range)
                    currentLocationObject.setFloat("Current", NbtData.OriginalData.follow_range);
                } else if (currentLocationObject.getTag("Name") == "minecraft:knockback_resistance") {
                    currentLocationObject.setFloat("Base", NbtData.OriginalData.knockback_resistance)
                    currentLocationObject.setFloat("DefaultMax", NbtData.OriginalData.knockback_resistance)
                    currentLocationObject.setFloat("Max", NbtData.OriginalData.knockback_resistance)
                    currentLocationObject.setFloat("DefaultMin", NbtData.OriginalData.knockback_resistance)
                    currentLocationObject.setFloat("Min", NbtData.OriginalData.knockback_resistance);
                }
            }
        }
        newEntity.setNbt(newEntityNbt);
        newEntity.addTag("Intensify");
        newEntity.addTag(tag);
        newEntity.addTag(NbtData.OriginalData.UniqueName);
        setTimeout(() => {
            newEntity.setScale(parseInt(NbtData.OriginalData.scale));
            if (NbtData.buff.state) {
                NbtData.buff.buffArray.forEach(data => {
                    newEntity.addEffect(buffIdCompare[data.id], data.time * 20, data.lvl, true);
                    //mc.runcmdEx(`effect @e[tag=${tag}] ${data.id} ${data.time} ${data.lvl - 1} false`);
                });
            }
        }, 200);
    }
}

/**
* 获取随机数（支持小数）
* @param {Number} min 最小值
* @param {Number} max 最大值
* @param {Integer} decimal 小数位数
* @returns 随机数
*/
function specifiedRangeRandomNumber(min = 0, max = 0, decimal = 0) {
    let min_z = Math.trunc(min);
    let max_z = Math.trunc(max);
    let min_x = isNaN(getDecimalNum(min)) ? 0 : getDecimalNum(min);
    let max_x = isNaN(getDecimalNum(max)) ? 0 : getDecimalNum(max);
    if (min_x > 0 || max_x > 0 || decimal > 0) {
        let z = parseInt(Math.random() * (max_z - min_z + 1) + min_z, 10);
        let x = 0;
        let max_decimal = min_x.toString().length > max_x.toString().length ? min_x.toString().length : max_x.toString().length;
        max_decimal = decimal > max_decimal ? decimal : max_decimal;
        if (z == min_z || z == max_z) {
            if (z == min_z) {
                x = parseInt(Math.random() * (Math.pow(10, max_decimal) - min_x) + min_x, 10);
            } else {
                x = parseInt(Math.random() * (max_x + 1), 10);
            }
        } else {
            x = parseInt(Math.random() * (Math.pow(10, max_decimal)), 10);
        }
        return Number(`${z}.${x}`);
    } else {
        return parseInt(Math.random() * (max_z - min_z + 1) + min_z, 10);
    }
}

/**
* 获取数值的小数部分
* @param {Integer} data 
* @returns 范围内的小数
*/
function getDecimalNum(data) {
    return Number(data.toString().split('.')[1]);
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
    if (Config.ProfileVersion == "0.0.2") {
        Config.ProfileVersion = "0.0.3";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((EntityDataJson, position) => {
                if (EntityDataJson.brambles == undefined) {
                    EntityNbtJson[key][position].brambles = false;
                    EntityNbtJson[key][position].bramblesHurt = 1;
                    EntityNbtJson[key][position].dieBlast = false;
                    EntityNbtJson[key][position].BlastDestroy = false;
                    EntityNbtJson[key][position].BlastPower = 1;
                    EntityNbtJson[key][position].BlastTime = 10;

                }
            });
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.3") {
        Config.ProfileVersion = "0.0.4";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                EntityNbtJson[key][position].ArmorBreaker = false;
                EntityNbtJson[key][position].ArmorBreakerToSE = false;
                EntityNbtJson[key][position].ArmorProbability = 10;
                EntityNbtJson[key][position].SingleReductionDamage = 2;
            });
        }
        UPEntityConfig = true;
    }
    if (Config.PressurePlate == undefined) {
        Config.PressurePlate = true;
        Config.ParticleEffect = true;
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                EntityNbtJson[key][position].LongRangeDamage = true;
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "0.0.4") {
        Config.ProfileVersion = "0.0.5";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((EntityDataJson, position) => {
                if (EntityDataJson["BlastPower "] != undefined) {
                    EntityNbtJson[key][position].BlastPower = EntityDataJson["BlastPower "];
                    delete EntityNbtJson[key][position]["BlastPower "];
                }
                if (EntityNbtJson[key][position].KillPlayerRecovery == undefined) {
                    EntityNbtJson[key][position].KillPlayerRecovery = 10;
                    EntityNbtJson[key][position].addTalentValue = 1.1234;
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ForceEntitySize == undefined) {
        Config.ForceEntitySize = false;
        UPEntityConfig = true;
    }
    if (Config.DockingIntensifySurvival == undefined) {
        Config.DockingIntensifySurvival = false;
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "0.0.5") {
        Config.ProfileVersion = "0.0.6";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].KillPlayerRecovery == undefined) {
                    EntityNbtJson[key][position].KillPlayerRecovery = 10;
                    EntityNbtJson[key][position].addTalentValue = 1.1234;
                }
            });
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.6") {
        Config.ProfileVersion = "0.0.7";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].reelLvl == undefined) {
                    EntityNbtJson[key][position].reelLvl = 1;
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "0.0.7") {
        Config.ProfileVersion = "0.0.8";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].economy == undefined) {
                    EntityNbtJson[key][position].economy = {
                        "moneyName": "llmoney",
                        "probability": 1,
                        "quantity": 10,
                        "describe": "金币"
                    };
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "0.0.8") {
        Config.ProfileVersion = "0.0.9";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].BlastRange != undefined) {
                    delete EntityNbtJson[key][position].BlastRange;
                }
            });
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.9") {
        Config.ProfileVersion = "0.0.10";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].fragmentsArtifactStones == undefined) {
                    EntityNbtJson[key][position].fragmentsArtifactStones = {
                        "state": false,
                        "name": "神一级石碎片",
                        "number": 1,
                        "probability": 0.001
                    }
                }
            });
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.10") {
        Config.ProfileVersion = "0.1.1";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].buff == undefined) {
                    EntityNbtJson[key][position].buff = {
                        "state": false,
                        "buffArray": [
                            {
                                "id": "resistance",
                                "lvl": 1,
                                "time": 10000
                            }
                        ]
                    }
                }
            });
        }
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.1.1") {
        Config.ProfileVersion = "1.1.1";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                let NewJson = {};
                let CurrentItemJSON = EntityNbtJson[key][position];
                NewJson.OriginalData = {
                    "health": CurrentItemJSON.health,
                    "movement": CurrentItemJSON.movement,
                    "underwater_movement": CurrentItemJSON.underwater_movement,
                    "lava_movement": CurrentItemJSON.lava_movement,
                    "follow_range": CurrentItemJSON.follow_range,
                    "knockback_resistance": CurrentItemJSON.knockback_resistance,
                    "scale": CurrentItemJSON.scale,
                    "customName": CurrentItemJSON.customName,
                    "UniqueName": CurrentItemJSON.UniqueName
                };
                NewJson.OtherAbility = {
                    "SpawnProbability": CurrentItemJSON.SpawnProbability,
                    "Additionaldamage": CurrentItemJSON.Additionaldamage,
                    "KillPlayerRecovery": CurrentItemJSON.KillPlayerRecovery,
                    "brambles": CurrentItemJSON.brambles,
                    "bramblesHurt": CurrentItemJSON.bramblesHurt,
                    "LongRangeDamage": CurrentItemJSON.LongRangeDamage
                };
                NewJson.buff = CurrentItemJSON.buff;
                NewJson.Disarm = {
                    "WhetherDisarm": CurrentItemJSON.WhetherDisarm,
                    "DisarmingProbability": CurrentItemJSON.DisarmingProbability,
                    "DropOffset": {
                        "x": CurrentItemJSON.DropOffset.x,
                        "z": CurrentItemJSON.DropOffset.z
                    }
                };
                NewJson.Explosion = {
                    "dieBlast": CurrentItemJSON.dieBlast,
                    "BlastDestroy": CurrentItemJSON.BlastDestroy,
                    "BlastPower": CurrentItemJSON.BlastPower,
                    "BlastTime": CurrentItemJSON.BlastTime
                };
                NewJson.BeFire = {
                    "playerFire": CurrentItemJSON.playerFire,
                    "FireTime": CurrentItemJSON.FireTime
                };
                NewJson.Scabbing = {
                    "ArmorBreaker": CurrentItemJSON.ArmorBreaker,
                    "ArmorBreakerToSE": CurrentItemJSON.ArmorBreakerToSE,
                    "ArmorProbability": CurrentItemJSON.ArmorProbability,
                    "SingleReductionDamage": CurrentItemJSON.SingleReductionDamage
                };
                NewJson.trophy = {
                    "OtherDrops": CurrentItemJSON.OtherDrops,
                    "OtherDropsMode": CurrentItemJSON.OtherDropsMode,
                    "GiveXpToPlayer": CurrentItemJSON.GiveXpToPlayer,
                    "addTalentValue": CurrentItemJSON.addTalentValue,
                    "reel": {
                        "reel": CurrentItemJSON.reel,
                        "reelLvl": CurrentItemJSON.reelLvl,
                        "probability": CurrentItemJSON.probability
                    },
                    "economy": CurrentItemJSON.economy,
                    "fragmentsArtifactStones": CurrentItemJSON.fragmentsArtifactStones,
                    "ListSpoils": CurrentItemJSON.ListSpoils
                }
                EntityNbtJson[key][position] = NewJson;
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
 * 随机缴械.
 * 021
 * 修复检查刷怪笼时未获取到方块导致的报错.
 * 022
 * 尝试解决有光源的情况下刷怪.
 * 尝试解决半砖刷怪.
 * 新增怪荆棘开关和伤害.
 * 新增死亡爆炸开关和范围.
 * 023
 * 尝试解决强化怪坐船等骑乘事件.
 * 新增怪碎甲开关和几率.
 * 024
 * 适配LLSE新的怪物刷新接口.
 * 移除光源、半砖判断,优化性能.
 * ---------------------------------------
 * 强化怪可以实现100%刷新.
 * 新增强化实体能否踩下压力板选项.
 * 新增实体是否能被抛射物伤害选项.
 * 新增粒子显示选项,开启后强化怪将会有粒子效果.
 * 新增强制实体大小选项.
 * 新增击杀玩家回血配置项.
 * 新增玩家击杀强化生物获得天赋点配置项(对接强化生存).
 * ----------------------------------------
 * 禁止强化生物转化为其他生物.
 * 修复爆炸提示出现的错误.
 * 修复爆炸配置文件key错误导致的报错.
 * 修复旧版本配置出现错误判断不会自动适配的bug.
 * 修复命令生成指定生物出现的错误.
 * 修复设置实体模型大小失败的问题.
 * 修复未找到前置插件提示出现的错误.
 * 025
 * 修复和强化生存对接问题.
 * 修复强制实体大小报错的问题.
 * 026
 * 修复玩家被强化实体杀死出现的错误.
 * 027
 * 对接新版强化装备插件.
 * 移除多余语言文件.
 * 028
 * 新增对接llmoney或者计分板经济.
 * 029
 * 修复计分板经济不支持有空格的玩家.
 * 修复提示参数错误.
 * 030
 * 强化怪物发生转变后将会直接被移除.
 * 031
 * 适配新版爆炸api，避免报错.
 * 032
 * 所有概率支持4位小数.
 * 新增对接神器石碎片.
 * 033
 * 新增对强化生物上buff的功能.
 * 调整生物配置文件格式.
 * 使用正则表达式去除配置文件里的注释内容.
 * 034
 * 新增部分配置功能表单.
 * 实体给buff使用LLSE的api.
 * 
 * 待添加功能
 */