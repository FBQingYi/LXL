//-----基础信息定义
const pluginName = "IntensifyMonster";
const PluginsIntroduction = '强化你的怪物吧!';
const pluginPath = "./plugins/IntensifyMonster/";
const PluginsVersion = [0, 6, 1];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const EntityNbtJsonData = {
    "minecraft:zombie": [
        {
            "OriginalData": {//生物的原版数据修改项
                "health": 40,//生命值
                "movement": 0.35,//陆地移速
                "underwater_movement": 0.2,//水中移速
                "lava_movement": 0.2,//岩浆中移速
                "follow_range": 20,//追踪距离
                "knockback_resistance": 6,//击退抗性
                "scale": 2,//模型大小
                "customName": "宝藏僵尸",//显示名称
                "UniqueName": "zombie1",//唯一name，每个配置文件不可出现重复
                "Persistent": true//不被刷掉
            },
            "OtherAbility": {//其他能力
                "SpawnProbability": 100,//此配置生物刷新概率
                "Additionaldamage": 2,//对玩家额外真实伤害
                "KillPlayerRecovery": 10,//击杀玩家恢复多少血量
                "brambles": false,//是否开启反伤
                "bramblesHurt": 1,//反伤对玩家造成的真实伤害
                "LongRangeDamage": true,//是否能受到远程伤害
                "DeathSoundEffect": "ambient.weather.lightning.impact",//死亡播放的声音
                "ParticleRadius": 1,//粒子半径
                "DeathParticleRadius": 3,//死亡粒子半径
                "RelativeEntity_Y": 3//死亡粒子相对目标高度
            },
            "buff": {//此配置生物生成时携带的buff数据
                "state": true,//是否开启给生物buff
                "buffArray": [
                    {
                        "id": "resistance",//buff英文id
                        "lvl": 1,//buff的等级
                        "time": 10000//buff持续时间
                    }
                ]
            },
            "Disarm": {//此配置生物攻击玩家玩家掉落物品项
                "WhetherDisarm": false,//是否开启掉落
                "DisarmingProbability": 1,//玩家掉落物品的概率
                "DropOffset": {//掉落的位置相对玩家坐标偏移值
                    "x": 3,
                    "z": 2
                }
            },
            "Explosion": {//此配置生物死亡后爆炸项
                "dieBlast": false,//是否开启爆炸
                "BlastDestroy": false,//爆炸是否破坏方块
                "BlastPower": 1,//爆炸威力
                "BlastTime": 10//倒计时多久爆炸
            },
            "BeFire": {//此配置项生物攻击玩家玩家着火项
                "playerFire": true,//是否开启
                "FireTime": 10//着火持续时间
            },
            "Scabbing": {//此配置项生物攻击玩家时玩家碎甲项
                "ArmorBreaker": false,//是否开启碎甲
                "ArmorBreakerToSE": false,//碎甲是否对强化装备有效
                "ArmorProbability": 10,//碎甲几率
                "SingleReductionDamage": 2//碎甲减少耐久
            },
            "trophy": {//此配置项生物被击杀时相关战利品项
                "OtherDrops": true,//是否掉落其它物品（ListSpoils）里面的内容
                "OtherDropsMode": 0,//0是全部随机掉落，1是随机走掉落列表里面选一个100%掉落
                "GiveXpToPlayer": 5,//给予击杀者额外的额经验值
                "addTalentValue": 1.1234,//给予击杀者天赋点（对接强化生存）
                "reel": {//卷轴项-对接强化插件
                    "reel": true,
                    "reelLvl": 1,
                    "probability": 10
                },
                "economy": {//经济项
                    "moneyName": "llmoney",
                    "probability": 1,
                    "quantity": 10,
                    "describe": "金币"
                },
                "fragmentsArtifactStones": {//神器石项-对接强化插件
                    "state": true,
                    "data": [
                        {
                            "name": "神一级石碎片",
                            "number": 1,
                            "probability": 100
                        }
                    ]
                },
                "ListSpoils": [//原版物品掉落项
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
            },
            "callEntity": {//召唤实体
                "callEntityState": false,
                "entityArray": [
                    {
                        "SummoningLife": 20,
                        "entityData": [
                            {
                                "type": "ordinary",
                                "entityType": "minecraft:zombie",
                                "callNumber": 5
                            },
                            {
                                "type": "intensify",
                                "entityType": "minecraft:zombie",
                                "entityUniqueName": "zombie1",
                                "callNumber": 5
                            }
                        ]
                    }
                ]
            },
            "equip": {//装备
                "helmet": {//头盔
                    "type": "gives",//对接gives
                    "itemType": "minecraft:diamond_helmet",//物品标准类型名
                    "DisplayName": "测试",//物品显示名称
                    "Curse": {
                        "Enchantments": [
                            {
                                "n": 16,//附魔id
                                "l": 5//附魔等级
                            }
                        ]
                    }
                },
                "armour": {//胸甲
                    "type": "initial",//原版物品
                    "itemType": "minecraft:diamond_chestplate"//物品标准类型名
                },
                "pants": {//护腿
                    "type": "initial",
                    "itemType": "minecraft:diamond_leggings"
                },
                "shoe": {//鞋子
                    "type": "initial",
                    "itemType": "minecraft:diamond_boots"
                },
                "hand": {//主手
                    "type": "initial",
                    "itemType": "minecraft:diamond_sword"
                }
            },
            "bloodreturning": {//回血
                "switch": false,//是否启用
                "time": 10,//间隔时间
                "measure": 10//恢复量
            },
            "flash": {//闪现突脸
                "switch": false,//是否启用
                "flashDistance": 6,//目标距离最远距离
                "time": 20//间隔时间
            }
        }
    ]
};
const InitializedTemplate = EntityNbtJsonData["minecraft:zombie"][0];
const ConfigDataJson = {
    "DockingIntensifySurvival": false,
    "ForceEntitySize": false,
    "ParticleEffect": true,
    "PressurePlate": true,
    "DockingIntensify": false,
    "DockingGives": false,
    "mobSpawner": false,
    "EquipmentCleaning": true,
    "ProfileVersion": "1.1.6"
};
const LuminousItemsJson = { "minecraft:glowstone": 1, "minecraft:torch": 1, "minecraft:lantern": 1, "minecraft:lit_pumpkin": 1, "minecraft:lit_redstone_lamp": 1 };
const buffIdCompare = { "speed": 1, "slowness": 2, "haste": 3, "mining_fatigue": 4, "strength": 5, "instant_health": 6, "instant_damage": 7, "jump_boost": 8, "nausea": 9, "regeneration": 10, "resistance": 11, "fire_resistance": 12, "water_breathing": 13, "invisibility": 14, "blindness": 15, "night_vision": 16, "hunger": 17, "weakness": 18, "poison": 19, "wither": 20, "health_boost": 21, "absorption": 22, "saturation": 23, "levitation": 24, "fatal_poison": 25, "conduit_power": 26, "slow_falling": 27, "bad_omen": 28, "village_hero": 29, "darkness": 30 };
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
if (!File.exists(pluginPath + "data/PlayerOdds.json")) {
    File.writeTo(pluginPath + "data/PlayerOdds.json", JSON.stringify({}, null, "\t"));
}
let EntityNbtJson = JSON.parse(File.readFrom(pluginPath + "data/EntityData.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let Config = JSON.parse(File.readFrom(pluginPath + "Config.json"));
let PlayerOddsData = JSON.parse(File.readFrom(pluginPath + "data/PlayerOdds.json"));
let getReelNbt, GetNewItemNbt, ParticleSpawner, AddTalentValue, getFragmentsNbt, LIGHTMoney;
let Generate = true;
let entityCallEntity = {};
let generateCooling = {};
let entityCDData = {};
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
        "set_buff_time": "buff持续时间",
        "scabbingMsg": "§4碎甲：§3耐久减少{0}",
        "TrueInjuryMsg": "§4真伤：§3血量减少{0}",
        "disarmMsg": "§4缴械：§3{0}\n掉落位置：{1}",
        "DeathSoundEffect": "死亡音效",
        "ParticleRadius": "粒子半径",
        "DeathParticleRadius": "死亡粒子半径",
        "PerformanceTips": "此插件粒子效果有大量计算，如果配置低请关闭粒子选项。Config.json中將ParticleEffect和ForceEntitySize设置为false",
        "GodStoneErrTips": "强化石碎片生成错误！请检查强化插件中配置文件是否有：{0} 强化石碎片",
        "givesErrTips": "检测到装备物品设置了需要gives，但是在配置文件未启用!",
        "flashTips": "§4§l你被{0}盯上了，他已经传送到你这里了！",
        "broadcastTips": "{0} 击杀了 {1}"
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
        "set_buff_time": "buff持續時間",
        "scabbingMsg": "§4碎甲：§3耐久减少{0}",
        "TrueInjuryMsg": "§4真伤：§3血量减少{0}",
        "disarmMsg": "§4缴械：§3{0}\n掉落位置：{1}",
        "DeathSoundEffect": "死亡音效",
        "ParticleRadius": "粒子半徑",
        "DeathParticleRadius": "死亡粒子半徑",
        "PerformanceTips": "此挿件粒子效果有大量計算，如果配寘低請關閉粒子選項。 Config.json中將ParticleEffect和ForceEntitySize設定為false",
        "GodStoneErrTips": "強化石碎片生成錯誤！請檢查強化插件中的設定檔是否含有： {0} 強化石碎片。",
        "givesErrTips": "檢測到裝備物品設定了需要gives，但是在設定檔未啟用！",
        "flashTips": "§4§l你被{0}盯上了，他已經傳送到你這裡了！",
        "broadcastTips": "{0}擊殺了{1}"
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
        "set_buff_time": "buff duration",
        "scabbingMsg": "§4Armor fragmentation: § 3 durability reduction{0}",
        "TrueInjuryMsg": "§4True Damage: § 3 Reduced Health{0}",
        "disarmMsg": "§4Disarm: § 3 {0}  \nFalling position:{1}",
        "DeathSoundEffect": "Death sound effect",
        "ParticleRadius": "Particle Radius",
        "DeathParticleRadius": "Death particle radius",
        "PerformanceTips": "This plugin has a large amount of calculation for particle effects. If the configuration is low, please turn off the particle option. Set ParticleEffect and ForceEntitySize to false in Config.json",
        "GodStoneErrTips": "Error generating enhancement stone fragments! Please check if the configuration file in the enhancement plugin contains: {0} enhancement stone fragments.",
        "givesErrTips": "We have detected that equipment items require gifts, but they are not enabled in the configuration file!",
        "flashTips": "§4§lYou are being targeted by {0}, he has already teleported to you!",
        "broadcastTips": "{0} killed {1}"
    }
});

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
    if (Config.ForceEntitySize) {//强制实体大小.
        let AllEntityArray = mc.getAllEntities();
        AllEntityArray.forEach(entity => {
            if (entity.hasTag("Intensify")) {
                let UniqueName = queryClass.getEntityUniqueName(entity);
                if (UniqueName != "") {
                    let DataJsonObj = queryClass.UniqueNameGetEntityJson(UniqueName, entity.type);
                    if (DataJsonObj != {}) {
                        entity.setScale(parseInt(DataJsonObj.OriginalData.scale));
                    }
                }
            }
        });
    }
    if (Config.EquipmentCleaning) {//清理带有标记的物品
        let AllEntityArray = mc.getAllEntities();
        AllEntityArray.forEach(entity => {
            if (entity.isItemEntity()) {
                let item = entity.toItem();
                let itemNbt = item.getNbt();
                let itemTagNbt = itemNbt.getTag("tag");
                if (itemTagNbt != undefined) {
                    let enhancedMonsterMarkers = itemTagNbt.getTag("mark");
                    if (enhancedMonsterMarkers != undefined) {
                        entity.remove();
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
    if (entity != undefined && generateCooling[pos] == undefined) {
        let typeName = entity.type;
        if (EntityNbtJson[typeName] != undefined && !entity.hasTag("Intensify")) {

            let enData = SharingFunction.getEntityAllProbability(typeName);
            let selectedOption = undefined;
            if (enData != undefined) {
                for (let key in enData) {
                    let probability = specifiedRangeRandomNumber(0, 100, 4);
                    let probabilityData = enData[key];
                    if (probabilityData >= probability) {
                        selectedOption = key;
                    }
                    if (selectedOption != undefined) {
                        let EntityDataJson = queryClass.UniqueNameGetEntityJson(selectedOption, typeName);
                        if (Config.mobSpawner) {
                            setNewEntity(entity, EntityDataJson);
                            setEquipment(entity, EntityDataJson);
                            break;
                        } else {
                            let mobSpawnerBool = queryClass.findNearestBlock(pos);
                            if (!mobSpawnerBool) {
                                setNewEntity(entity, EntityDataJson);
                                setEquipment(entity, EntityDataJson);
                                break;
                            }
                        }
                    }
                }
            }
            /*
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
                    setEquipment(entity, SelectConfiguration);
                }
            }*/
        }
    }
});

/**
 * 监听生物死亡并分发.
 */
mc.listen("onMobDie", (mob, source, _cause) => {
    if (source != undefined && source.isPlayer() && mob.hasTag("Intensify")) {
        let entityJson = EntityNbtJson[mob.type];
        if (entityJson != undefined) {
            let entityDataJson = queryClass.basedBiologicalAcquisitionConfig(mob);
            if (entityDataJson != {}) {
                let pos = mob.pos;
                let player = source.toPlayer();
                if (entityDataJson.Explosion.dieBlast) {
                    MobDieEvent.explode(entityDataJson, pos, player, mob);
                }
                if (Config.DockingIntensify) {
                    MobDieEvent.DockingIntensify(entityDataJson, pos, player);
                }
                if (entityDataJson.trophy.OtherDrops) {
                    MobDieEvent.OtherDrops(entityDataJson, pos, player);
                }
                MobDieEvent.comprehensiveEvents(entityDataJson, player, mob);
                mc.broadcast(i18n.trl(player.langCode, "broadcastTips", player.realName, mob.name));
            }
            if (entityCallEntity[mob.uniqueId] != undefined) {
                delete entityCallEntity[mob.uniqueId];
            }
        }
    }
})

/**
 * 监听生物受伤事件分发处理.
 */
mc.listen("onMobHurt", (mob, source, _damage, cause) => {
    if (cause == 2 || cause == 3) {
        let Hurt = 0;
        if (mob.isPlayer() && source != undefined) {
            let entityJson = EntityNbtJson[source.type];
            if (entityJson != undefined && source.hasTag("Intensify")) {
                let entityDataJson = queryClass.basedBiologicalAcquisitionConfig(source);
                if (entityDataJson != {}) {
                    let player = mob.toPlayer();
                    if (entityDataJson.Disarm.WhetherDisarm) {
                        entityHurtEvent.WhetherDisarm(entityDataJson, player);
                    }
                    if (entityDataJson.Scabbing.ArmorBreaker) {
                        entityHurtEvent.ArmorBreaker(entityDataJson, player);
                    }
                    Hurt += entityDataJson.OtherAbility.Additionaldamage;
                    if (Hurt > 0) {
                        player.tell(i18n.trl(player.langCode, "TrueInjuryMsg", Hurt), 5);
                    }
                    setTimeout(() => {
                        if (entityDataJson.BeFire.playerFire) {
                            player.setFire(entityDataJson.BeFire.FireTime, false);
                        }
                    }, 20);
                }
            }
        } else if (!mob.isPlayer() && source != undefined) {
            let entityJson = EntityNbtJson[mob.type];
            if (entityJson != undefined && mob.hasTag("Intensify")) {
                let entityDataJson = queryClass.basedBiologicalAcquisitionConfig(mob);
                if (entityDataJson.callEntity.callEntityState) {
                    entityHurtEvent.SummonedCreature(entityDataJson, mob);
                }
                if (cause == 3) {
                    if (!entityDataJson.OtherAbility.LongRangeDamage) {
                        return false;
                    }
                }
                if (entityDataJson.OtherAbility.brambles && source.isPlayer()) {
                    Hurt += entityDataJson.OtherAbility.bramblesHurt;
                }
            }
        }
        //额外伤害和反伤处理
        if (Hurt > 0) {
            let player;
            if (mob.isPlayer()) {
                player = mob.toPlayer();
            } else if (source.isPlayer()) {
                player = source.toPlayer();
            }
            if (player != undefined) {
                setTimeout(() => {
                    playerHurt(player.xuid, Hurt);
                }, 50);
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
    Command.setEnum("type", ["spawn"]);
    Command.setEnum("EntityUName", UniqueNameArray);
    Command.mandatory("mode", ParamType.Enum, "type");
    Command.mandatory("entity", ParamType.ActorType);
    Command.mandatory("pos", ParamType.Vec3);
    Command.mandatory("Uname", ParamType.Enum, "EntityUName");
    Command.overload(["mode"]);
    Command.overload(["mode", "entity", "Uname", "pos"]);
    Command.setCallback((_cmd, origin, output, results) => {
        if (results.mode == "spawn") {
            let pos = results.pos;
            let EntityType = results.entity;
            let uname = results.Uname;
            if (EntityNbtJson[EntityType] != undefined) {
                let EntityDataJson = queryClass.UniqueNameGetEntityJson(uname, EntityType);
                if (EntityDataJson != {}) {
                    let entity = mc.spawnMob(EntityType, pos);
                    generateIntensifyCooling(entity);
                    setNewEntity(entity, EntityDataJson);
                    setEquipment(entity, EntityDataJson);

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
        particles.particleScheduledTasks();
    }
    ExternalFunction();
    TimedRecurringTasks.Timer();
    TimedRecurringTasks.CleanTheCDPool();
});

/**
 * 生物受伤事件处理
 */
const entityHurtEvent = {
    /**
     * 抢夺技能处理.
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Player} player 玩家对象
     */
    WhetherDisarm: function (entityDataJson, player) {
        let random = specifiedRangeRandomNumber(0, 100, 4);
        if (random <= entityDataJson.Disarm.DisarmingProbability) {
            let playerHand = player.getHand();
            if (!playerHand.isNull()) {
                let DropOffsetX = entityDataJson.Disarm.DropOffset.x;
                let DropOffsetZ = entityDataJson.Disarm.DropOffset.z;
                if (mc.spawnItem(playerHand, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                    player.tell(i18n.trl(player.langCode, "disarmMsg", playerHand.name, `${parseInt(player.pos.x) + DropOffsetX},${parseInt(player.pos.y)},${parseInt(player.pos.z) + DropOffsetZ}`));
                    playerHand.setNull();
                    player.refreshItems();
                }
            }
        }
    },
    /**
     * 碎甲技能处理.
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Player} player 玩家对象
     */
    ArmorBreaker: function (entityDataJson, player) {
        let playerArmor = player.getArmor();
        let playerArmorAllItem = playerArmor.getAllItems();
        playerArmorAllItem.forEach(item => {
            if (!item.isNull()) {
                let random = specifiedRangeRandomNumber(0, 100, 4);
                let scabbing = entityDataJson.Scabbing.SingleReductionDamage;
                if (entityDataJson.Scabbing.ArmorBreakerToSE) {
                    if (random <= scabbing) {
                        item.setDamage(item.damage + entityDataJson.Scabbing.SingleReductionDamage);
                        player.tell(i18n.trl(player.langCode, "scabbingMsg", scabbing), 5);
                    }
                } else if (!queryClass.isIntensify(item)) {
                    if (random <= scabbing) {
                        item.setDamage(item.damage + entityDataJson.Scabbing.SingleReductionDamage);
                        player.tell(i18n.trl(player.langCode, "scabbingMsg", scabbing), 5);
                    }
                }
            }
        });
    },
    /**
     * 召唤生物.
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Entity} mob 实体对象
     */
    SummonedCreature: function (entityDataJson, mob) {
        let generateEntityCooling = false;
        if (entityCallEntity[mob.uniqueId] == undefined) {
            entityCallEntity[mob.uniqueId] = {};
        }
        let entityHealth = queryClass.getEntityHealth(mob.uniqueId)
        if (entityHealth != 0) {
            let entityCallArray = entityDataJson.callEntity.entityArray;
            entityCallArray.forEach(data => {
                if (entityHealth <= data.SummoningLife) {
                    let record = entityCallEntity[mob.uniqueId][data.SummoningLife.toString()];
                    if (record == undefined) {
                        entityCallEntity[mob.uniqueId][data.SummoningLife.toString()] = true;
                        let entityData = data.entityData;
                        entityData.forEach(entityJson => {
                            if (entityJson.type == "ordinary") {
                                for (let i = 0; i < entityJson.callNumber; i++) {
                                    mc.spawnMob(entityJson.entityType, mob.pos);
                                    generateEntityCooling = true;
                                }
                            } else if (entityJson.type == "intensify") {
                                let EntityDataJson = queryClass.UniqueNameGetEntityJson(entityJson.entityUniqueName, entityJson.entityType);
                                if (EntityDataJson != {}) {
                                    for (let i = 0; i < entityJson.callNumber; i++) {
                                        let entity = mc.spawnMob(entityJson.entityType, mob.pos);
                                        setNewEntity(entity, EntityDataJson);
                                        setEquipment(entity, EntityDataJson);
                                        generateEntityCooling = true;
                                    }
                                }
                            }
                        });
                    }
                }
            });

            if (generateEntityCooling) {
                generateIntensifyCooling(mob);
            }
        }
    }
}

/**
 * 实体死亡处理.
 */
const MobDieEvent = {
    /**
     * 综合处理，包含给金币、天赋、经验值.
     * 播放死亡音效和粒子.
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Player} player 玩家对象
     * @param {Entity} mob 实体对象
     */
    comprehensiveEvents: function (entityDataJson, player, mob) {
        let randomInt = specifiedRangeRandomNumber(0, 100, 4);
        let economyConfig = entityDataJson.trophy.economy;
        let odds = queryClass.getPlayerOdds(player);
        let probability = operation(economyConfig.probability, odds, "+");
        if (randomInt <= probability) {
            if (economyConfig.moneyName == "llmoney") {
                player.addMoney(economyConfig.quantity);
            } else if (economyConfig.moneyName == "lmoney" && LIGHTMoney != undefined) {
                LIGHTMoney("add", economyConfig.quantity, player.xuid);
            } else {
                player.addScore(economyConfig.moneyName, economyConfig.quantity);
                //mc.runcmdEx(`scoreboard players add "${player.realName}" ${randomInt} ${economyConfig.quantity}`);
            }
            player.tell(i18n.trl(player.langCode, "economyTips", economyConfig.quantity, economyConfig.describe));
        }
        if (Config.DockingIntensifySurvival) {
            AddTalentValue(player.xuid, entityDataJson.trophy.addTalentValue);
        }
        if (entityDataJson.OtherAbility.DeathSoundEffect != "") {
            mc.runcmdEx(`playsound ${entityDataJson.OtherAbility.DeathSoundEffect} "${player.realName}"`);
        }
        if (Config.ParticleEffect) {
            let radius = entityDataJson.OtherAbility.DeathParticleRadius;
            let relativePosition = entityDataJson.OtherAbility.RelativeEntity_Y;
            particles.deathParticles(mob.pos, radius, relativePosition);
        }
        player.addExperience(entityDataJson.trophy.GiveXpToPlayer);
    },
    /**
     * 战利品掉落
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Pos} pos 实体死亡坐标对象
     * @param {player} player 玩家对象
     */
    OtherDrops: function (entityDataJson, pos, player) {
        if (entityDataJson.trophy.OtherDropsMode == 0 && entityDataJson.trophy.ListSpoils != []) {
            let SpoilsList = entityDataJson.trophy.ListSpoils;
            SpoilsList.forEach(CurrentOptions => {
                let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                let odds = queryClass.getPlayerOdds(player);
                let probability = operation(CurrentOptions.SpoilsProbability, odds, "+");
                if (randomInt <= probability) {
                    if (CurrentOptions.Spoils == "ordinary") {
                        let item = mc.newItem(CurrentOptions.SpoilsTypeName, CurrentOptions.SpoilsqQantity);
                        mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                        LogFileWriting(player, pos, randomInt, CurrentOptions.SpoilsTypeName);
                    } else if (CurrentOptions.Spoils == "gives" && Config.DockingGives) {
                        let itemDIsplayName = undefined;
                        let initialItem = mc.newItem(CurrentOptions.SpoilsTypeName, CurrentOptions.SpoilsqQantity);
                        if (CurrentOptions.DisplayName != "") {
                            itemDIsplayName = CurrentOptions.DisplayName;
                        }
                        let itemNewNbt = GetNewItemNbt(initialItem, itemDIsplayName, CurrentOptions.Curse, CurrentOptions.SpoilsqQantity);
                        let item = mc.newItem(itemNewNbt);
                        mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                        LogFileWriting(player, pos, randomInt, itemDIsplayName);
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
                LogFileWriting(player, pos, randomInt, itemData.SpoilsTypeName);
            } else if (itemData.Spoils == "gives" && Config.DockingGives) {
                let itemDIsplayName = undefined;
                let initialItem = mc.newItem(itemData.SpoilsTypeName, itemData.SpoilsqQantity);
                if (itemData.DisplayName != "") {
                    itemDIsplayName = itemData.DisplayName;
                }
                let itemNewNbt = GetNewItemNbt(initialItem, itemDIsplayName, itemData.Curse, itemData.SpoilsqQantity);
                let item = mc.newItem(itemNewNbt);
                mc.spawnItem(item, pos.x, pos.y + 1, pos.z, pos.dimid);
                LogFileWriting(player, pos, randomInt, itemDIsplayName);
            }
        }
    },
    /**
     * 强化物品掉落
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Pos} pos 实体死亡坐标对象
     * @param {Player} player 玩家对象
     */
    DockingIntensify: function (entityDataJson, pos, player) {
        if (entityDataJson.trophy.reel.reel) {
            let randomInt = specifiedRangeRandomNumber(0, 100, 4);
            let odds = queryClass.getPlayerOdds(player);
            let probability = operation(entityDataJson.trophy.reel.probability, odds, "+");
            if (randomInt <= probability) {
                let newItem = getReelNbt(player, entityDataJson.trophy.reel.reelLvl);
                mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                LogFileWriting(player, pos, randomInt, "reel");
            }
        }
        let artifactFragmentsConfig = entityDataJson.trophy.fragmentsArtifactStones;
        if (artifactFragmentsConfig.state) {
            let artifactFragmentsData = artifactFragmentsConfig.data;
            artifactFragmentsData.forEach(data => {
                let randomInt = specifiedRangeRandomNumber(0, 100, 4);
                let odds = queryClass.getPlayerOdds(player);
                let probability = operation(data.probability, odds, "+");
                if (randomInt <= probability) {
                    let newItem = getFragmentsNbt(player, data.name, data.number);
                    if (!newItem) {
                        logger.error(i18n.trl(ll.language, "GodStoneErrTips", data.name));
                    } else {
                        mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
                        LogFileWriting(player, pos, randomInt, data.name);
                    }
                }
            });
        }
    },
    /**
     * 
     * @param {JSON} entityDataJson 实体配置文件
     * @param {Pos} pos 实体死亡坐标对象
     * @param {Player} player 玩家对象
     * @param {Entity} mob 死亡实体对象
     */
    explode: function (entityDataJson, pos, player, mob) {
        player.tell(i18n.trl(player.langCode, "BlastTips", mob.name, entityDataJson.Explosion.BlastTime));
        setTimeout(() => {
            mc.explode(pos, mob, entityDataJson.Explosion.BlastPower, entityDataJson.Explosion.BlastDestroy, false);
        }, entityDataJson.Explosion.BlastTime * 1000);
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
        if (key == "reel" || key == "economy") {
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
                    break;
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
    },
    /**
     * 获取圆的所有坐标
     * @param {Number} centerX 中心点坐标
     * @param {Number} centerZ 中心点坐标
     * @param {Number} radius 半径
     * @param {Number} numPoints 密度
     * @returns Array
     */
    getCirclePoints: function (centerX, centerZ, radius, numPoints = 20) {
        let points = [];
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / numPoints) {
            let x = centerX + radius * Math.cos(angle);
            let z = centerZ + radius * Math.sin(angle);
            points.push({ x, z });
        }
        return points;
    },
    /**
     * 六芒星顶点坐标位置
     * @param {Number} centerX 中心点坐标
     * @param {Number} centerY 中心点坐标
     * @param {Number} radius 半径
     * @returns array
     */
    getHexagramPoints: function (centerX, centerY, radius) {
        let points = [];
        for (let i = 0; i < 6; i++) {
            let angle_deg = 60 * i - 30;
            let angle_rad = Math.PI / 180 * angle_deg;
            let pointX = centerX + radius * Math.cos(angle_rad);
            let pointY = centerY + radius * Math.sin(angle_rad);
            points.push([pointX, pointY]);
        }
        return points;
    },
    /**
     * 六芒星所有坐标位置
     * @param {Number} centerX 中心点坐标
     * @param {Number} centerY 中心点坐标
     * @param {Number} radius 半径
     * @returns array
     */
    getHexagramEdges: function (centerX, centerY, radius) {
        let edges = [];
        let centerPoints = this.getHexagramPoints(centerX, centerY, radius);
        for (let i = 0; i < 6; i++) {
            let startPoint = centerPoints[i];
            let endPoint = centerPoints[(i + 2) % 6];
            let edge = [];
            let dx = endPoint[0] - startPoint[0];
            let dy = endPoint[1] - startPoint[1];
            let length = Math.sqrt(dx * dx + dy * dy);
            let scaleX = dx / length;
            let scaleY = dy / length;
            for (let j = 0; j <= length; j++) {
                let pointX = startPoint[0] + j * scaleX;
                let pointY = startPoint[1] + j * scaleY;
                edge.push([pointX, pointY]);
            }
            edges.push(edge);
        }
        return edges;
    },
    /**
     * 根据实体对象插件配置文件.
     * @param {Entity} entity 实体对象
     * @returns JSon
     */
    basedBiologicalAcquisitionConfig: function (entity) {
        let entityDataJson = {};
        let entityJson = EntityNbtJson[entity.type];
        if (entityJson != undefined) {
            for (let i = 0; i < entityJson.length; i++) {
                let EntityJsonUniqueName = entityJson[i].OriginalData.UniqueName;
                if (entity.hasTag(EntityJsonUniqueName)) {
                    entityDataJson = entityJson[i];
                    break;
                }
            }
        }
        return entityDataJson;
    },
    /**
     * 查询实体实时血量.
     * @param {String} uniqueId 实体唯一标识符（mc）
     * @returns 查询结果
     */
    getEntityHealth: function (uniqueId) {
        let entityHealth = 0;
        let allEntity = mc.getAllEntities();
        allEntity.forEach(entity => {
            if (uniqueId == entity.uniqueId) {
                entityHealth = entity.health;
            }
        });
        return entityHealth;
    },
    /**
     * 查询玩家附加概率.
     * @param {Player} player 玩家对象.
     * @returns 查询到的结果
     */
    getPlayerOdds: function (player) {
        let differFrom = 0;
        if (PlayerOddsData[player.xuid] != undefined) {
            differFrom = PlayerOddsData[player.xuid];
        }
        return differFrom;
    },
    /**
     * 查询里坐标最近的玩家.
     * @param {Pos} pos 坐标对象
     * @param {Int} radius 半径
     * @returns 查询到的玩家对象
     */
    getRadiusRecentPlayer: function (pos, radius) {
        let temporary = {};
        let OnlinePlayerAll = mc.getOnlinePlayers();
        OnlinePlayerAll.forEach(player => {
            let distance = player.distanceTo(pos);
            if (radius >= distance && player.gameMode != 1 && player.gameMode != 6) {
                temporary[player.xuid] = distance;
            }
        });
        if (temporary != {}) {
            let minKey;
            let minValue = Infinity;
            for (let key in temporary) {
                if (temporary.hasOwnProperty(key) && temporary[key] < minValue) {
                    minKey = key;
                }
            }
            if (minKey != undefined) {
                return mc.getPlayer(minKey);
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
}

/**
 * 粒子任务
 */
const particles = {
    /**
     * 生成圆.
     */
    particleScheduledTasks: function () {
        setInterval(() => {
            if (Config.ParticleEffect) {
                let AllEntityArray = mc.getAllEntities();
                AllEntityArray.forEach(entity => {
                    if (entity != undefined && entity.name != "") {
                        if (entity.hasTag("Intensify")) {
                            let entityJson = EntityNbtJson[entity.type];
                            if (entityJson != undefined) {
                                let entityDataJson = {};
                                for (let i = 0; i < entityJson.length; i++) {
                                    let EntityJsonUniqueName = entityJson[i].OriginalData.UniqueName;
                                    if (entity.hasTag(EntityJsonUniqueName)) {
                                        entityDataJson = entityJson[i];
                                        break;
                                    }
                                }
                                if (entityDataJson != {}) {
                                    let posArray = queryClass.getCirclePoints(entity.pos.x, entity.pos.z, entityDataJson.OtherAbility.ParticleRadius, 10);
                                    posArray.forEach(points => {
                                        let pos = mc.newFloatPos(points.x, entity.pos.y + 0.5, points.z, entity.pos.dimid);
                                        mc.spawnParticle(pos, 'minecraft:obsidian_glow_dust_particle');
                                    });
                                }
                            }
                        }
                    }
                });
            }
        }, 20);
    },
    /**
     * 生成六芒星
     * @param {Object} pos2 坐标点对象
     * @param {Number} r 半径
     * @param {Number} relativePosition 粒子高度
     */
    deathParticles: function (pos2, r, relativePosition) {
        let hexagram = queryClass.getHexagramEdges(pos2.x, pos2.z, r);
        let liz = 'minecraft:lava_drip_particle';
        let pid = setInterval(() => {
            hexagram.forEach(element => {
                element.forEach(pos1 => {
                    let pos = mc.newFloatPos(pos1[0], pos2.y + relativePosition, pos1[1], 0);
                    mc.spawnParticle(pos, liz)
                });
            });
        }, 50);
        setTimeout(() => {
            clearInterval(pid)
            for (let i = 0; i < relativePosition; i++) {
                let y = relativePosition - i;
                hexagram.forEach(element => {
                    element.forEach(pos1 => {
                        let pos = mc.newFloatPos(pos1[0], pos2.y + y, pos1[1], 0);
                        mc.spawnParticle(pos, liz)
                    });
                });
            }
        }, 1000 * 2);
    }
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
        if (NbtData.OriginalData.Persistent) {
            newEntityNbt.setByte("Persistent", 1);
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
                    //newEntity.addEffect(buffIdCompare[data.id], data.time * 20, data.lvl, true);
                    mc.runcmdEx(`effect @e[tag=${tag}] ${data.id} ${data.time} ${data.lvl - 1} false`);
                });
            }
        }, 200);
    }
}

/**
 * 修改实体盔甲
 * @param {Entity} entity 实体对象
 * @param {List} NbtData 实体修改的数据
 */
function setEquipment(entity, NbtData) {
    if (entity != undefined) {
        let equipData = NbtData.equip;
        let enArmor = entity.getArmor();
        for (let key in equipData) {
            let currentData = equipData[key];
            let itemType = currentData.itemType;
            let type = currentData.type;
            let position = 0;
            switch (key) {
                case "helmet":
                    position = 0;
                    break;
                case "armour":
                    position = 1;
                    break;
                case "pants":
                    position = 2;
                    break;
                case "shoe":
                    position = 3;
                    break;
                case "hand":
                    if (itemType != "") {
                        let enNbt = entity.getNbt();
                        enNbt.setByte("canPickupItems", 1);
                        if (type == "initial") {
                            let item = mc.newItem(itemType, 1);
                            let newItemNbt = setItemMark(item).getNbt();
                            let ItemInHandNewNbt = enNbt.setTag("ItemInHand", newItemNbt);
                            entity.setNbt(ItemInHandNewNbt);
                        } else if (type == "gives") {
                            if (Config.DockingGives) {
                                let item = mc.newItem(itemType, 1);
                                let newItem = GetNewItemNbt(item, currentData.DisplayName, currentData.Curse, 1);
                                let newItemNbt = setItemMark(newItem).getNbt();
                                let ItemInHandNewNbt = enNbt.setTag("ItemInHand", newItemNbt);
                                entity.setNbt(ItemInHandNewNbt);
                            } else {
                                logger.error(i18n.get("givesErrTips", ll.language));
                            }
                        }
                    }
                    break;
            }
            if (itemType != "" && key != "hand") {
                if (type == "initial") {
                    let item = mc.newItem(itemType, 1)
                    enArmor.setItem(position, setItemMark(item));
                } else if (type == "gives") {
                    if (Config.DockingGives) {
                        let item = mc.newItem(itemType, 1);
                        let newItem = GetNewItemNbt(item, currentData.DisplayName, currentData.Curse, 1);
                        enArmor.setItem(position, setItemMark(newItem));
                    } else {
                        logger.error(i18n.get("givesErrTips", ll.language));
                    }
                }
            }
        }
        entity.refreshItems();
    }
}

/**
 * 给物品对象添加特定标记方便清理.
 * @param {Item} item 物品对象
 * @returns 物品对象
 */
function setItemMark(item) {

    let itemNbt = item.getNbt();
    itemNbt.setByte("WasPickedUp", 1);

    if (itemNbt.getTag("tag") == undefined) {
        itemNbt.setTag("tag", new NbtCompound({
            "mark": new NbtInt(1)
        }));
    } else {
        itemNbt.getTag("tag").setTag("mark", new NbtInt(1));
    }
    item.setNbt(itemNbt);
    return item;
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
 * 解决小数点后数值漂移的运算
 * @param {Number} num1 数值1
 * @param {Number} num2 数值2
 * @param {String} symbol 字符格式的运算符号
 * @returns 计算结果.
 */
function operation(num1, num2, symbol) {
    var str1 = num1.toString(), str2 = num2.toString(), result, str1Length, str2Length
    //解决整数没有小数点方法
    try { str1Length = str1.split('.')[1].length } catch (error) { str1Length = 0 }
    try { str2Length = str2.split('.')[1].length } catch (error) { str2Length = 0 }
    var step = Math.pow(10, Math.max(str1Length, str2Length))
    switch (symbol) {
        case "+":
            result = (num1 * step + num2 * step) / step
            break;
        case "-":
            result = (num1 * step - num2 * step) / step
            break;
        case "*":
            result = ((num1 * step) * (num2 * step)) / step / step
            break;
        case "/":
            result = (num1 * step) / (num2 * step)
            break;
        default:
            break;
    }
    return result

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
 * 强化生物生成冷却.
 * @param {Entity} mob 实体对象
 */
function generateIntensifyCooling(mob) {
    generateCooling[mob.pos] = true;
    setTimeout(() => {
        delete generateCooling[mob.pos];
    }, 1000);
}


/**
 * 定时循环任务.
 */
const TimedRecurringTasks = {
    Timer: function () {
        setInterval(() => {
            this.ReducedCDPool();
            this.EntityHematolysisTreatment();
        }, 1000);
    },
    /**
     * cd数据每秒减少.
     */
    ReducedCDPool: function () {
        if (entityCDData != {}) {
            for (let uniqueId in entityCDData) {
                let entityData = entityCDData[uniqueId];
                for (let term in entityData) {
                    let current = entityData[term];
                    if (current > 0) {
                        entityCDData[uniqueId][term] = current - 1;
                    }
                }
            }
        }
    },
    /**
     * 强化实体闪现和回血处理.
     */
    EntityHematolysisTreatment: function () {
        let allEntity = mc.getAllEntities();
        allEntity.forEach(entity => {
            if (entity.hasTag("Intensify")) {
                let enUniqueId = entity.uniqueId;
                let entityDataJson = queryClass.basedBiologicalAcquisitionConfig(entity);
                if (entityDataJson != {}) {
                    if (entityCDData[enUniqueId] == undefined) {
                        entityCDData[enUniqueId] = {
                            "bloodreturning": 0,
                            "flash": 0
                        }
                    }
                    if (entityDataJson.bloodreturning.switch && entityCDData[enUniqueId].bloodreturning == 0 && entity.health >= 3) {
                        let enMaxHealth = entity.maxHealth;
                        let enHealth = entity.health;
                        let phaseDifference = enMaxHealth - enHealth;
                        let dataAddHealth = entityDataJson.bloodreturning.measure;
                        if (phaseDifference >= dataAddHealth) {
                            entity.setHealth(enHealth + dataAddHealth);
                            entityCDData[enUniqueId].bloodreturning = entityDataJson.bloodreturning.time;
                        } else {
                            entity.setHealth(enHealth + phaseDifference);
                            entityCDData[enUniqueId].bloodreturning = entityDataJson.bloodreturning.time;
                        }
                    }
                    if (entityDataJson.flash.switch && entityCDData[enUniqueId].flash == 0) {
                        let player = queryClass.getRadiusRecentPlayer(entity.pos, entityDataJson.flash.flashDistance);
                        if (player != undefined) {
                            player.tell(i18n.trl(player.langCode, "flashTips", entity.name));
                            setTimeout(() => {
                                entity.teleport(player.pos);
                                entityCDData[enUniqueId].flash = entityDataJson.flash.time;
                            }, 100);
                        }
                    }
                }
            }
        });
    },
    /**
     * 3分钟清理CD数据.
     */
    CleanTheCDPool: function () {
        setInterval(() => {
            let AllEntityArray = [];
            let allEntity = mc.getAllEntities();
            allEntity.forEach(entity => {
                if (entity.hasTag("Intensify")) {
                    AllEntityArray.push(entity.uniqueId);
                }
            });
            if (AllEntityArray != []) {
                let keysSet = new Set(AllEntityArray);
                let missingKeys = Object.keys(entityCDData).filter(key => !keysSet.has(key));
                missingKeys.forEach(key => {
                    delete entityCDData[key];
                });
            } else {
                entityCDData = {};
            }
        }, 1000 * 60 * 3);
    }
}

/**
 * 战利品记录日志
 * @param {Player} player 玩家对象
 * @param {Pos} _pos 坐标对象
 * @param {Int} randomInt 随机数结果
 * @param {String} itemName 物品名称/标准类型名 
 */
function LogFileWriting(player, _pos, randomInt, itemName) {
    let time = system.getTimeObj();
    let route = `${pluginPath}log/${time.Y}-${time.M}-${time.D}.txt`;
    let logData = `${system.getTimeStr()} ：${player.realName} : ${randomInt} : ${itemName}\n`
    if (!File.exists(route)) {
        File.writeTo(route, logData);
    } else {
        File.writeLine(route, logData);
    }
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
                        "data": [
                            {
                                "name": "神一级石碎片",
                                "number": 1,
                                "probability": 100
                            }
                        ]
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
    if (Config.ProfileVersion == "1.1.1") {
        Config.ProfileVersion = "1.1.2";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].OtherAbility.DeathSoundEffect == undefined) {
                    EntityNbtJson[key][position].OtherAbility.DeathSoundEffect = "";
                    EntityNbtJson[key][position].OtherAbility.ParticleRadius = 1;
                    EntityNbtJson[key][position].OtherAbility.DeathParticleRadius = 3;
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "1.1.2") {
        Config.ProfileVersion = "1.1.3";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].OtherAbility.RelativeEntity_Y == undefined) {
                    EntityNbtJson[key][position].OtherAbility.RelativeEntity_Y = 3;
                    EntityNbtJson[key][position].callEntity = {
                        "callEntityState": false,
                        "entityArray": [
                            {
                                "SummoningLife": 20,
                                "entityData": [
                                    {
                                        "type": "ordinary",
                                        "entityType": "minecraft:zombie",
                                        "callNumber": 5
                                    }
                                ]
                            }
                        ]
                    }
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "1.1.3") {
        Config.ProfileVersion = "1.1.4";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].equip == undefined) {
                    EntityNbtJson[key][position].equip = {
                        "helmet": {
                            "type": "gives",
                            "itemType": "",
                            "DisplayName": "测试",
                            "Curse": {
                                "Enchantments": [
                                    {
                                        "n": 16,
                                        "l": 5
                                    }
                                ]
                            }
                        },
                        "armour": {
                            "type": "initial",
                            "itemType": ""
                        },
                        "pants": {
                            "type": "initial",
                            "itemType": ""
                        },
                        "shoe": {
                            "type": "initial",
                            "itemType": ""
                        },
                        "hand": {
                            "type": "initial",
                            "itemType": ""
                        }
                    };
                }
            });
        }
        if (Config.EquipmentCleaning == undefined) {
            Config.EquipmentCleaning = true;
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "1.1.4") {
        Config.ProfileVersion = "1.1.5";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                let fragmentsArtifactStonesPast = EntityNbtJson[key][position].trophy.fragmentsArtifactStones;
                let newJson = {
                    "state": fragmentsArtifactStonesPast.state,
                    "data": [
                        {
                            "name": fragmentsArtifactStonesPast.name,
                            "number": fragmentsArtifactStonesPast.number,
                            "probability": fragmentsArtifactStonesPast.probability
                        }
                    ]
                }
                EntityNbtJson[key][position].trophy.fragmentsArtifactStones = newJson;
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "1.1.5") {
        Config.ProfileVersion = "1.1.6";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].bloodreturning == undefined) {
                    EntityNbtJson[key][position].bloodreturning = {
                        "switch": false,
                        "time": 10,
                        "measure": 10
                    }
                    EntityNbtJson[key][position].flash = {
                        "switch": false,
                        "flashDistance": 6,
                        "time": 20
                    }
                }
            });
        }
        UPEntityConfig = true;
    }

    if (Config.ProfileVersion == "1.1.6") {
        Config.ProfileVersion = "1.1.7";
        for (let key in EntityNbtJson) {
            EntityNbtJson[key].forEach((_EntityDataJson, position) => {
                if (EntityNbtJson[key][position].OriginalData.Persistent == undefined) {
                    EntityNbtJson[key][position].OriginalData.Persistent = false;
                }
            });
        }
        UPEntityConfig = true;
    }

    if (UPEntityConfig) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(Config, null, "\t"));
        File.writeTo(pluginPath + "data/EntityData.json", JSON.stringify(EntityNbtJson, null, "\t"));
        setTimeout(() => {
            logger.warn(i18n.trl(ll.language, "configUp",));
        }, 1000 * 6);
    }
    setTimeout(() => {
        logger.warn(i18n.trl(ll.language, "PerformanceTips",));
    }, 1000 * 4);
}

/**
 * 共享函数
 */
const SharingFunction = {
    /**
     * 共享函数，在指定位置生成实体.
     * @param {Pos} pos 坐标对象
     * @param {String} entityType 实体标准类型名
     * @param {String} uname 配置唯一名
     * @returns 实体唯一标识符
     */
    spawnToPlayer: function (pos, entityType, uname) {
        if (EntityNbtJson[entityType] != undefined) {
            let EntityDataJson = queryClass.UniqueNameGetEntityJson(uname, entityType);
            if (EntityDataJson != {}) {
                let entity = mc.spawnMob(entityType, pos);
                if (entity != undefined) {
                    setNewEntity(entity, EntityDataJson);
                    setEquipment(entity, EntityDataJson);
                    return entity.uniqueId;
                }
            }
        }
    },
    /**
     * 查询实体的所有配置文件
     * @param {String} entityType 实体标准类型名
     * @returns 实体的所有配置文件
     */
    getEntityAllData: function (entityType) {
        return EntityNbtJson[entityType];
    },
    /**
     * 获取实体的刷新概率
     * @param {String} entityType 实体标准类型名
     * @returns 实体的所有配置对应的刷新概率
     */
    getEntityAllProbability: function (entityType) {
        let reData = {};
        let enDataJson = EntityNbtJson[entityType];
        if (enDataJson == undefined) {
            return enDataJson;
        } else {
            enDataJson.forEach(enData => {
                reData[enData.OriginalData.UniqueName] = enData.OtherAbility.SpawnProbability;
            });

            return Object.fromEntries(
                Object.entries(reData).sort((a, b) => a[1] - b[1])
            );
        }
    },
    getNearbyBrushMonsterCage: function (pos) {
        return queryClass.findNearestBlock(pos);
    }
}

/**
 * 外部函数判断导入.
 * 判断是否需要加载前置插件及语言文件.
 * 判断生成概率是否需要限制.
 */
function ExternalFunction() {
    let allPlugins = ll.listPlugins();
    if (Config.DockingIntensify) {
        if (allPlugins.includes("Intensify")) {
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
        if (allPlugins.includes("gives")) {
            GetNewItemNbt = ll.import("NewItemNbt");
        } else {
            setTimeout(() => {
                logger.error(i18n.get("giveserr", ll.language));
                Config.DockingGives = false;
            }, 1000 * 5);
        }
    }
    if (Config.DockingIntensifySurvival) {
        if (allPlugins.includes("IntensifySurvival")) {
            AddTalentValue = ll.import("IntensifySurvival", "AddValue");
        } else {
            setTimeout(() => {
                logger.error(i18n.get("IntensifySurvivalerr", ll.language));
                Config.DockingIntensifySurvival = false;
            }, 1000 * 5);
        }
    }
    if (File.exists("./plugins/LIGHTMoney/LIGHTMoney.js")) {
        LIGHTMoney = ll.import("LIGHTMoney");
    }
}

ll.export(SharingFunction.spawnToPlayer, "intensifyMonster", "spawn");
ll.export(SharingFunction.getEntityAllData, "intensifyMonster", "getEntityAllData");
ll.export(SharingFunction.getEntityAllProbability, "intensifyMonster", "getEntityAllProbability");
ll.export(SharingFunction.getNearbyBrushMonsterCage, "intensifyMonster", "getNearbyBrushMonsterCage");

/**
 * 对应版本的代码
 * llse2.14.1
 * lse0.5.2
 * 对指定玩家造成伤害.
 */
function playerHurt(xuid, hurt) {
    let allPlayer = mc.getOnlinePlayers();
    for (let i in allPlayer) {
        let player = allPlayer[i];
        if (xuid == player.xuid) {
            if (player.health - hurt <= 0) {
                player.kill();
            } else {
                player.setHealth(player.health - hurt);
            }
            break;
        }
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
 * 修复新配置文件导致的问题.
 * 035
 * 粒子效果修改为圆.
 * 增加强化怪死亡粒子效果.
 * 增加死亡音效.
 * 配置项新增粒子&死亡粒子半径，死亡音效.
 * 提示：服务器配置较低请关闭粒子选项！
 * 036
 * 新增根据生命召唤其他生物.
 * 可自定义死亡粒子距离生物高度.
 * 修改死亡粒子样式.
 * 037
 * 修复坐标提示小数过多的问题.
 * 修复爆炸提示无法获取时间的问题.
 * 修复添加实体时报错.
 * 038
 * 修复强制实体大小无效.
 * 039
 * 新增实体盔甲设置（会像原版一样击杀掉落，可在配置文件设置清理）.
 * 040
 * 强化石碎片支持多个掉落.
 * 041
 * 修复一个配置文件设置bug.
 * 042
 * 解决强化石碎片生成错误导致的报错并增加提示.
 * 043
 * 新增一个生成强化怪物的Api.
 * 044
 * 修改计分板为使用Api.
 * 修复额外伤害和反伤无效的问题(更换实现方式，原Api暂时无效.)
 * 修复远程伤害免疫的问题.
 * 045
 * 新增日志记录.
 * 修复一个报错.
 * 045-1
 * 新增额外概率.
 * 046
 * 修复指令生成实体失败造成的报错.
 * 047
 * 新增3个插件api.
 * 048
 * 移除配置表单.
 * 新增回血和闪现突脸.
 * 049
 * 修复给指定物品添加数据出错.
 * 修复真伤无效的问题.
 * 修复一个指令召唤强化生物重复修改属性的问题.
 * 050
 * 修改部分消息提示位置.
 * 接入自己的经济核心.
 * 051
 * 修改强化怪刷新算法.
 * 突脸对象不再选中创造和旁观模式的玩家.
 * 052
 * 新增生物不被移除配置.
 * 052-1
 * 修复真伤提示没判断的bug.
 * 061
 * 修复ll3中前置判断失效导致的无法导入共享函数.
 * 修复ll3中设置主手物品出现的崩服现象.
 * 修复ll3中对接gives出现的崩服现象.
 * 修复ll3中额外伤害和真伤失效的情况.
 * 对接gives需要gives版本大于等于0.3.1.
 * 设置实体大小待lse对api进行修复后自行恢复.
 * 
 * 待添加功能
 */