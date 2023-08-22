const pluginName = "Intensify";
const pluginsIntroduction = '强化你的装备!';
const pluginPath = "./plugins/Intensify/";
const pluginsVersion = [1, 5, 7];
const pluginsOtherInformation = { "插件作者": "清漪花开" };

const soundList = ["random.anvil_use", "random.anvil_break", "random.anvil_land"];
const gemQualityArray = ["ordinary", "rare"];
const reelQualityArray = ["closeCombat", "longRange"];
const availableItemTypes = ["helmetBuff", "chestplateBuff", "leggingsBuff", "bootsBuff", "toolBuff", "swordBuff"];
const availableItemPicture = ["textures/items/iron_helmet.png", "textures/items/iron_chestplate.png", "textures/items/iron_leggings", "textures/items/iron_boots.png", "textures/items/iron_pickaxe.png", "textures/items/iron_sword.png"];
const swordItemArray = ["minecraft:wooden_sword", "minecraft:stone_sword", "minecraft:iron_sword", "minecraft:golden_sword", "minecraft:diamond_sword", "minecraft:netherite_sword"];
const helmetItemArray = ["minecraft:leather_helmet", "minecraft:chainmail_helmet", "minecraft:iron_helmet", "minecraft:golden_helmet", "minecraft:diamond_helmet", "minecraft:netherite_helmet"];
const chestplateItemArray = ["minecraft:leather_chestplate", "minecraft:chainmail_chestplate", "minecraft:iron_chestplate", "minecraft:golden_chestplate", "minecraft:diamond_chestplate", "minecraft:netherite_chestplate"];
const leggingsItemArray = ["minecraft:leather_leggings", "minecraft:chainmail_leggings", "minecraft:iron_leggings", "minecraft:golden_leggings", "minecraft:diamond_leggings", "minecraft:netherite_leggings"];
const bootsItemArray = ["minecraft:leather_boots", "minecraft:chainmail_boots", "minecraft:iron_boots", "minecraft:golden_boots", "minecraft:diamond_boots", "minecraft:netherite_boots"];
const toolItemArray = ["minecraft:wooden_axe", "minecraft:wooden_pickaxe", "minecraft:wooden_shovel", "minecraft:wooden_hoe", "minecraft:stone_pickaxe", "minecraft:stone_shovel", "minecraft:stone_axe", "minecraft:stone_hoe", "minecraft:iron_axe", "minecraft:iron_pickaxe", "minecraft:iron_shovel", "minecraft:iron_hoe", "minecraft:golden_axe", "minecraft:golden_pickaxe", "minecraft:golden_shovel", "minecraft:golden_hoe", "minecraft:diamond_axe", "minecraft:diamond_pickaxe", "minecraft:diamond_shovel", "minecraft:diamond_hoe", "minecraft:netherite_axe", "minecraft:netherite_pickaxe", "minecraft:netherite_shovel", "minecraft:netherite_hoe"];
const longRangeWeaponArray = ["minecraft:bow"];
const gemDataConfig = { "vampireGem": { "maxLevel": 5, "droppingProbability": 0.15, "describe": "攻击时有几率触发吸血效果，根据等级不同触发几率恢复效果都不同。", "triggerProbability": [50, 60, 70, 80, 95], "CDTime": [10, 8, 6, 4, 2], "relatedData": [20, 30, 40, 50, 60], "successProbability": [8.5, 6.3, 4.2, 1.2, 0.5], "DropEntityList": ["minecraft:drowned"], "Guarantee": [100, 80, 60, 40, 10] }, "powerGem": { "maxLevel": 4, "droppingProbability": 0.15, "describe": "攻击时有几率触发暴击效果，暴击将对被攻击者造成真实伤害。", "triggerProbability": [10, 20, 30, 50], "CDTime": [1200, 800, 400, 100], "relatedData": [1, 2, 4, 8], "successProbability": [10, 5, 1, 0.1], "DropEntityList": ["minecraft:creeper"], "Guarantee": [100, 80, 60, 40] }, "explosiveGem": { "maxLevel": 4, "droppingProbability": 0.15, "describe": "使用弓箭攻击时有几率触发爆炸！", "triggerProbability": [10, 20, 60, 80], "CDTime": [120, 80, 40, 10], "relatedData": [1, 2, 3, 4], "successProbability": [10, 5, 1, 0.1], "DropEntityList": ["minecraft:creeper"], "Guarantee": [100, 80, 60, 40] }, "experienceGem": { "maxLevel": 5, "droppingProbability": 0.15, "describe": "获得额外的经验", "triggerProbability": [1, 10, 15, 20, 30], "CDTime": [10, 5, 3, 2, 1], "relatedData": [10, 20, 30, 40, 50], "successProbability": [10, 5, 2.5, 1, 0.1], "DropEntityList": ["minecraft:witch"], "Guarantee": [100, 80, 60, 40, 10] }, "durableGem": { "maxLevel": 1, "droppingProbability": 0.0001, "describe": "崛起吧,我的金套!", "successProbability": [100], "relatedData": [1], "DropEntityList": ["minecraft:wither", "minecraft:warden"], "Guarantee": [100] }, "transferGem": { "maxLevel": 1, "droppingProbability": 0, "describe": "迁移数据!", "successProbability": [100], "relatedData": [1], "DropEntityList": [], "Guarantee": [100] } };
const reelDataConfig = {"maxLevel":5,"blockList":{"minecraft:diamond_ore":10,"minecraft:deepslate_diamond_ore":10,"minecraft:emerald_ore":10,"minecraft:deepslate_emerald_ore":10,"minecraft:gold_ore":10,"minecraft:deepslate_gold_ore":10},"DataEachLevel":[{"level":1,"equipProbability":8.5965,"toItemGuarantee":20,"nextLevelProbability":4.3654,"tonextLevelGuarantee":50,"helmetBuff":[{"buffName":"水下呼吸","buffId":"water_breathing","buffLevel":0}],"chestplateBuff":[{"buffName":"伤害吸收","buffId":"absorption","buffLevel":0}],"leggingsBuff":[{"buffName":"跳跃提升","buffId":"jump_boost","buffLevel":0}],"bootsBuff":[{"buffName":"速度提升","buffId":"speed","buffLevel":0}],"toolBuff":[{"buffName":"急迫","buffId":"haste","buffLevel":0}],"swordBuff":[{"buffName":"力量","buffId":"strength","buffLevel":0}]},{"level":2,"equipProbability":3.5875,"toItemGuarantee":10,"nextLevelProbability":2.5874,"tonextLevelGuarantee":30,"helmetBuff":[{"buffName":"水下呼吸","buffId":"water_breathing","buffLevel":0},{"buffName":"饱和","buffId":"saturation","buffLevel":0}],"chestplateBuff":[{"buffName":"伤害吸收","buffId":"absorption","buffLevel":1}],"leggingsBuff":[{"buffName":"跳跃提升","buffId":"jump_boost","buffLevel":1}],"bootsBuff":[{"buffName":"速度提升","buffId":"speed","buffLevel":1}],"toolBuff":[{"buffName":"急迫","buffId":"haste","buffLevel":1}],"swordBuff":[{"buffName":"力量","buffId":"strength","buffLevel":1}]},{"level":3,"equipProbability":2.86,"toItemGuarantee":4,"nextLevelProbability":1.85,"tonextLevelGuarantee":19,"helmetBuff":[{"buffName":"水下呼吸","buffId":"water_breathing","buffLevel":0},{"buffName":"饱和","buffId":"saturation","buffLevel":0},{"buffName":"夜视","buffId":"night_vision","buffLevel":0}],"chestplateBuff":[{"buffName":"伤害吸收","buffId":"absorption","buffLevel":2},{"buffName":"生命提升","buffId":"health_boost","buffLevel":0}],"leggingsBuff":[{"buffName":"跳跃提升","buffId":"jump_boost","buffLevel":1},{"buffName":"村庄英雄","buffId":"village_hero","buffLevel":0}],"bootsBuff":[{"buffName":"速度提升","buffId":"speed","buffLevel":2}],"toolBuff":[{"buffName":"急迫","buffId":"haste","buffLevel":2}],"swordBuff":[{"buffName":"力量","buffId":"strength","buffLevel":2}]},{"level":4,"equipProbability":1.58,"toItemGuarantee":2,"nextLevelProbability":0.58,"tonextLevelGuarantee":10,"helmetBuff":[{"buffName":"水下呼吸","buffId":"water_breathing","buffLevel":0},{"buffName":"饱和","buffId":"saturation","buffLevel":0},{"buffName":"夜视","buffId":"night_vision","buffLevel":0},{"buffName":"隐身","buffId":"invisibility","buffLevel":0}],"chestplateBuff":[{"buffName":"伤害吸收","buffId":"absorption","buffLevel":3},{"buffName":"生命提升","buffId":"health_boost","buffLevel":2},{"buffName":"抗性提升","buffId":"resistance","buffLevel":0}],"leggingsBuff":[{"buffName":"跳跃提升","buffId":"jump_boost","buffLevel":2},{"buffName":"村庄英雄","buffId":"village_hero","buffLevel":0}],"bootsBuff":[{"buffName":"速度提升","buffId":"speed","buffLevel":2},{"buffName":"防火","buffId":"fire_resistance","buffLevel":0}],"toolBuff":[{"buffName":"急迫","buffId":"haste","buffLevel":3},{"buffName":"漂浮","buffId":"levitation","buffLevel":2}],"swordBuff":[{"buffName":"力量","buffId":"strength","buffLevel":3}]},{"level":5,"equipProbability":0.5,"toItemGuarantee":10,"nextLevelProbability":0,"tonextLevelGuarantee":1,"helmetBuff":[{"buffName":"水下呼吸","buffId":"water_breathing","buffLevel":0},{"buffName":"饱和","buffId":"saturation","buffLevel":0},{"buffName":"夜视","buffId":"night_vision","buffLevel":0},{"buffName":"隐身","buffId":"invisibility","buffLevel":0},{"buffName":"潮涌能量","buffId":"conduit_power","buffLevel":0}],"chestplateBuff":[{"buffName":"伤害吸收","buffId":"absorption","buffLevel":4},{"buffName":"生命提升","buffId":"health_boost","buffLevel":4},{"buffName":"抗性提升","buffId":"resistance","buffLevel":1}],"leggingsBuff":[{"buffName":"跳跃提升","buffId":"jump_boost","buffLevel":9},{"buffName":"村庄英雄","buffId":"village_hero","buffLevel":0}],"bootsBuff":[{"buffName":"速度提升","buffId":"speed","buffLevel":2},{"buffName":"防火","buffId":"fire_resistance","buffLevel":0},{"buffName":"缓降","buffId":"slow_falling","buffLevel":0}],"toolBuff":[{"buffName":"急迫","buffId":"haste","buffLevel":3},{"buffName":"漂浮","buffId":"levitation","buffLevel":2}],"swordBuff":[{"buffName":"力量","buffId":"strength","buffLevel":4}]}]};
const buffIdCompare = { "speed": 1, "slowness": 2, "haste": 3, "mining_fatigue": 4, "strength": 5, "instant_health": 6, "instant_damage": 7, "jump_boost": 8, "nausea": 9, "regeneration": 10, "resistance": 11, "fire_resistance": 12, "water_breathing": 13, "invisibility": 14, "blindness": 15, "night_vision": 16, "hunger": 17, "weakness": 18, "poison": 19, "wither": 20, "health_boost": 21, "absorption": 22, "saturation": 23, "levitation": 24, "fatal_poison": 25, "conduit_power": 26, "slow_falling": 27, "bad_omen": 28, "village_hero": 29, "darkness": 30 };

const initialConfig = {
    "randomNumber": {
        "DecimalsSupported": true,//支持的小数
        "Decimals": 4//小数点位数
    },
    "reelEnable": true,//开启卷轴
    "removeOldItems": false,//移除旧的强化物品（新下载，新档建议关闭）
    "accurateShielding": true,//屏蔽精准附魔物品
    "relatedItems": {
        "reel": "minecraft:field_masoned_banner_pattern",//卷轴使用的标准物品类型名
        "gemStone": "minecraft:quartz",//宝石使用的标准物品类型名
        "godStoneDebris": "minecraft:disc_fragment_5",//强化石碎片使用的标准物品类型名
        "godStone": "minecraft:music_disc_11"//强化石使用的标准物品类型名
    },
    "version": "0.0.3"
};
const ItemRoute = {
    "helmetBuff": pluginPath + "data/itemData/helmetData.json",
    "chestplateBuff": pluginPath + "data/itemData/chestplateData.json",
    "leggingsBuff": pluginPath + "data/itemData/leggingsData.json",
    "bootsBuff": pluginPath + "data/itemData/bootsData.json",
    "toolBuff": pluginPath + "data/itemData/toolData.json",
    "swordBuff": pluginPath + "data/itemData/swordData.json",
    "longRangeBuff": pluginPath + "data/itemData/longRangeData.json"
}
const artifactStoneArray = {
    "神一级石": {//石头名称，可自定义
        "debrisName": "神一级石碎片",//碎片名称，可自定义
        "debrisNumber": 15,//合成需要碎片数量
        "successProbability": 10,//合成成功概率
        "composeFallback": 2,//碎片合成为神器石保底数据
        "attribute": [
            {
                "CurseID": 1,//附魔id
                "CurseLvl": 10,//附魔等级
                "CurseName": "火焰保护"//显示的内容
            },
            {
                "CurseID": 2,
                "CurseLvl": 10,
                "CurseName": "摔落保护"
            }
        ]
    }
}

//------插件信息注册
ll.registerPlugin(pluginName, pluginsIntroduction, pluginsVersion, pluginsOtherInformation);

//------配置文件创建
if (File.exists(pluginPath + "language/language.json")) {
    File.delete(pluginPath + "language");
}
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(initialConfig, null, "\t"));
}
if (!File.exists(pluginPath + "data/gemDataConfig.json")) {
    File.writeTo(pluginPath + "data/gemDataConfig.json", JSON.stringify(gemDataConfig, null, "\t"));
}
if (!File.exists(pluginPath + "data/player/playerData.json")) {
    File.writeTo(pluginPath + "data/player/playerData.json", JSON.stringify({}, null, "\t"));
}
if (!File.exists(pluginPath + "data/player/lotteryFallback.json")) {
    File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify({}, null, "\t"));
}
if (!File.exists(pluginPath + "data/reelDataConfig.json")) {
    File.writeTo(pluginPath + "data/reelDataConfig.json", JSON.stringify(reelDataConfig, null, "\t"));
}
if (!File.exists(pluginPath + "data/artifactStoneDataConfig.json")) {
    File.writeTo(pluginPath + "data/artifactStoneDataConfig.json", JSON.stringify(artifactStoneArray, null, "\t"));
}
if (!File.exists(ItemRoute.helmetBuff)) {
    File.writeTo(ItemRoute.helmetBuff, JSON.stringify(helmetItemArray, null, "\t"));
    File.writeTo(ItemRoute.chestplateBuff, JSON.stringify(chestplateItemArray, null, "\t"));
    File.writeTo(ItemRoute.leggingsBuff, JSON.stringify(leggingsItemArray, null, "\t"));
    File.writeTo(ItemRoute.bootsBuff, JSON.stringify(bootsItemArray, null, "\t"));
    File.writeTo(ItemRoute.toolBuff, JSON.stringify(toolItemArray, null, "\t"));
    File.writeTo(ItemRoute.swordBuff, JSON.stringify(swordItemArray, null, "\t"));
    File.writeTo(ItemRoute.longRangeBuff, JSON.stringify(longRangeWeaponArray, null, "\t"));
}
if (!File.exists(ItemRoute.longRangeBuff)) {
    File.writeTo(ItemRoute.longRangeBuff, JSON.stringify(longRangeWeaponArray, null, "\t"));
}

let playerRemoteInjuryData = {}
let playerHandItemEvent = {};
let playerGemCountDown = {};
let playerOnlineState = {};
let playerTpSpc = {};//解决经验宝石和https://www.minebbs.com/resources/spc.5245/冲突.
let opState = {}, godstoneArray = [], debrisArray = [];
let ConfigGodStong, ConfigGodStongDebris, ConfigGemStong, ConfigReelItem, swordDataArray, helmetDataArray, chestplateDataArray, leggingsDataArray, bootsDataArray, toolDataArray, availableItemJson, longRangeDataArray;

let ConfigJson = JSON.parse(File.readFrom(pluginPath + "Config.json"));

let GemConfig = JSON.parse(File.readFrom(pluginPath + "data/gemDataConfig.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let ReelConfig = JSON.parse(File.readFrom(pluginPath + "data/reelDataConfig.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let ArtifactConfig = JSON.parse(File.readFrom(pluginPath + "data/artifactStoneDataConfig.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let PlayerData = JSON.parse(File.readFrom(pluginPath + "data/player/playerData.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let lotteryFallback = JSON.parse(File.readFrom(pluginPath + "data/player/lotteryFallback.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
/**
 * 读取物品文件
 */
function readItemFile() {
    swordDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/swordData.json"));
    helmetDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/helmetData.json"));
    chestplateDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/chestplateData.json"));
    leggingsDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/leggingsData.json"));
    bootsDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/bootsData.json"));
    toolDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/toolData.json"));
    longRangeDataArray = JSON.parse(File.readFrom(pluginPath + "data/itemData/longRangeData.json"));
    availableItemJson = { "swordDataArray": swordDataArray, "helmetDataArray": helmetDataArray, "chestplateDataArray": chestplateDataArray, "leggingsDataArray": leggingsDataArray, "bootsDataArray": bootsDataArray, "toolDataArray": toolDataArray, "longRangeDataArray": longRangeDataArray };
}

for (let godstoneName in ArtifactConfig) {
    godstoneArray.push(godstoneName);
    debrisArray.push(ArtifactConfig[godstoneName].debrisName);
}


i18n.load(pluginPath + "language/language.json", "zh_CN", {
    "zh_CN": {
        "vampireGem": "吸血宝石",
        "vampireGemEffect": "吸血：+{0}%",
        "powerGem": "暴击宝石",
        "powerGemEffect": "暴击：+{0}",
        "durableGem": "耐久宝石",
        "durableGemEffect": "无限耐久",
        "transferGem": "转移宝石",
        "transferGemEffect": "转移物品属性",
        "explosiveGem": "爆炸宝石",
        "explosiveGemEffect": "爆炸：+{0}",
        "experienceGem": "经验宝石",
        "experienceGemEffect": "经验：+{0}%",
        "reel": "强化卷轴",
        "ordinary": "普通",
        "rare": "稀有",
        "closeCombat": "近战、护具",
        "longRange": "远程",
        "helmetBuff": "头盔",
        "chestplateBuff": "胸甲",
        "leggingsBuff": "护腿",
        "bootsBuff": "靴子",
        "toolBuff": "工具",
        "swordBuff": "剑",
        "type7": "箭",
        "type8": "盾",
        "level": "级",
        "reelEffect": "---- {0}",
        "gemLore": JSON.stringify(["§1宝石名称： §2{0}", "§3宝石品质： §a{1}", "初始成功率： {2}", "§6宝石效果：",]),
        "reelLore1": JSON.stringify(["§1卷轴名称： §2{0}", "§3卷轴类型： §a{1}", "当前等级：{5}", "最高等级：{2}", "合成成功率： {3}", "§6强化成功率：{4}", "BUFF效果："]),
        "reelLore2": JSON.stringify(["§1卷轴名称： §2{0}", "§3卷轴类型： §a{1}", "当前等级：{5}", "最高等级：{2}", "合成成功率： {3}", "§6强化成功率：{4}", "卷轴效果："]),
        "tooManyTips": "你放得太多了，请一个一个放置吧！",
        "itemGemMsgLore": ">>>>>>>-宝石-<<<<<<<",
        "itemReelMsgLore": ">>>>>>>-卷轴-<<<<<<<",
        "itemForgeMsgLore": ">>>>>>-锻造信息-<<<<<<",
        "itemGemLore1": JSON.stringify(["§7------槽位{3}#------", "§g宝石名称：{0}", "§g宝石等级： +{1}", "§g宝石效果：", "§g  {2}"]),
        "itemGemLore": JSON.stringify(["§7------槽位{3}#------", "§g宝石名称：{0}", "§g宝石等级： +{1}", "§gCD时间：{4}", "§g触发几率：{5}", "§g宝石效果：", "§g  {2}"]),
        "itemReelLore": JSON.stringify([">>>>>>>-卷轴-<<<<<<<", "§6卷轴类型：{0}", "§6卷轴等级： +{1}", "§6当前效果："]),
        "forgingInformation": JSON.stringify([">>>>>>-锻造信息-<<<<<<", "锻造玩家：", "   {0}", "锻造时间：", "   {1}"]),

        "transferGemLore": JSON.stringify(["§6已储存数据", "§7可用于：{0}", "属性描述："]),
        "command": "强化装备插件",
        "form_main_title": "强化装备",
        "form_main_content": "请选择要添加的物品类型!",
        "form_selectItem_title": "{0}-添加物品",
        "form_selectItem_label": "请选择你需要添加的物品",
        "addItemsToConfig": "物品添加成功!",
        "setPlayerHPTips": "设置生命值成功！",
        "getPlayerReelTips": "给予{0}卷轴执行完成！",
        "getPlayerGemTips": "给予{0}宝石执行完成！",
        "artifactFragmentsLore": JSON.stringify(["§1碎片类型： §2{0}", "§3合成所需数量： §a{1} 个", "初始成功率： {2}", "§6最终效果："]),
        "artifactStoneLore": JSON.stringify(["§6效果："]),
        "getPlayerGodStoneTips": "给予{0}神器石执行完成！",
        "getPlayerGodStoneDebrisTips": "给予{0}神器石碎片执行完成！",
        "upReelmaxlvlTip": "已经完成更新！"
    },
    "en": {
        "vampireGem": "vampire Gem",
        "vampireGemEffect": "vampire：+{0}%",
        "powerGem": "power Gem",
        "powerGemEffect": "power：+{0}",
        "durableGem": "durable Gem",
        "durableGemEffect": "Infinite durability",
        "transferGem": "transfer Gem",
        "transferGemEffect": "Transfer item attributes",
        "explosiveGem": "Explosive gem",
        "explosiveGemEffect": "Explosive：+{0}",
        "experienceGem": "Experience gem",
        "experienceGemEffect": "Experience：+{0}%",
        "reel": "Enhanced scroll",
        "ordinary": "ordinary",
        "rare": "rare",
        "closeCombat": "Close combat, protective equipment",
        "longRange": "long-range",
        "helmetBuff": "Helmet",
        "chestplateBuff": "Breastplate",
        "leggingsBuff": "Leg guards",
        "bootsBuff": "Boots",
        "toolBuff": "tool",
        "swordBuff": "The sword",
        "type7": "arrow",
        "type8": "shield",
        "level": "level",
        "reelEffect": "---- {0}",
        "gemLore": JSON.stringify(["§1Gem name： §2{0}", "§3Gem quality： §a{1}", "Initial success rate： {2}", "§6Gem effect：",]),
        "reelLore1": JSON.stringify(["§1Reel name： §2{0}", "§3Reel type： §a{1}", "Current level：{5}", "Highest level：{2}", "Synthetic success rate： {3}", "§6Enhancement success rate：{4}", "BUFF："]),
        "reelLore2": JSON.stringify(["§1Reel name： §2{0}", "§3Reel type： §a{1}", "Current level：{5}", "Highest level：{2}", "Synthetic success rate： {3}", "§6Enhancement success rate：{4}", "Scroll effect:"]),
        "tooManyTips": "You put too much, please put it one by one!",
        "itemGemMsgLore": ">>>>>>>-GEM-<<<<<<<",
        "itemReelMsgLore": ">>>>>>-REEL-<<<<<<<",
        "itemForgeMsgLore": ">>>>>>-Forging information-<<<<<<",
        "itemGemLore1": JSON.stringify(["§7------Slot position{3}#------", "§gGem name：{0}", "§gGem grade：{1}", "§gGem effect：", "§g  {2}"]),
        "itemGemLore": JSON.stringify(["§7------Slot position{3}#------", "§gGem name：{0}", "§gGem grade：{1}", "§gCD Time：{4}", "§gTrigger probability：{5}", "§gGem effect：", "§g  {2}"]),
        "itemReelLore": JSON.stringify([">>>>>>>-REEL-<<<<<<<", "§6Reel type：{0}", "§6Reel grade： +{1}", "§6Current effect："]),
        "forgingInformation": JSON.stringify([">>>>>>-Forging information-<<<<<<", "Forging player：", "   {0}", "Forging time：", "   {1}"]),
        "transferGemLore": JSON.stringify(["Saved data", "Available for: {0}", "Attribute description:"]),
        "command": "Enhanced equipment plug-in",
        "form_main_title": "Intensify",
        "form_main_content": "Please select the item type to add!",
        "form_selectItem_title": "{0}-Add items",
        "form_selectItem_label": "Please select the items you need to add",
        "addItemsToConfig": "Item added successfully!",
        "setPlayerHPTips": "Set HP successfully!",
        "getPlayerReelTips": "Give {0} scroll execution completed!",
        "getPlayerGemTips": "Give {0} gem to execute!",
        "artifactFragmentsLore": JSON.stringify(["§1Fragment type： §2{0}", "§3Required quantity： §a{1} individual", "Initial success rate: {2}", "§6Final effect:"]),
        "artifactStoneLore": JSON.stringify(["§6effect:"]),
        "getPlayerGodStoneTips": "Give {0} artifact stone execution completion!",
        "getPlayerGodStoneDebrisTips": "Complete the execution of {0} artifact stone fragments!",
        "upReelmaxlvlTip": "Update completed!"
    }
});


/**
 * 实体死亡事件分发处理.
 * @param {Entity} entity 死亡的实体对象
 * @param {Entity} source 伤害来源的实体对象
 * @param {Integer} cause 伤害类型
 */
function entityDieEvent(entity, source, cause) {
    if (source != undefined && source.isPlayer() && cause == 2) {
        if (!source.toPlayer().isSimulatedPlayer()) {
            gemRelevant.playerKillEntityGetGem(entity, source);
        }
    }
}

/**
 * 玩家破坏方块事件分发处理.
 * @param {Player} player 破坏方块的玩家对象
 * @param {Block} block 被破坏的方块对象
 */
function playerDestroyBlockEvent(player, block) {
    if (!player.isSimulatedPlayer()) {
        let playerHandItem = player.getHand();
        if (ConfigJson.reelEnable) {
            setTimeout(() => {
                if (qingYi.getCheckBlock(block)) {
                    if (ConfigJson.accurateShielding) {
                        if (!queryData.getItemPreciseEnch(playerHandItem)) {
                            reelRelevant.playerDestroyBlockGetReel(player, block);
                        }
                    } else {
                        reelRelevant.playerDestroyBlockGetReel(player, block);
                    }
                }
            }, 20);
        }
        setTimeout(() => {
            let handItemGemData = queryData.getItemGemData(playerHandItem);
            if (handItemGemData.gemState && handItemGemData.durableGem != undefined) {
                if (playerHandItem.damage > 10) {
                    gemSetData.setItemDamage(playerHandItem);
                    player.refreshItems();
                }
            }
        }, 20);
    }
}

/**
 * 玩家打开容器事件分发处理.
 * @param {Player} player 玩家对象
 * @param {Block} block 被操作的容器的方块对象
 */
function openContainerEvent(player, block) {
    if (player.isSimulatedPlayer()) {
        return;
    } else if (block.type == "minecraft:dropper") {
        let containerAllItem = queryData.getContainerAllItem(block.pos);
        let firstItem = containerAllItem[0];
        let firstItem2 = containerAllItem[1];
        if (!firstItem.isNull() && !firstItem2.isNull()) {
            let judgmentResult = queryData.getItemIntensifyData(firstItem);
            let judgmentResult2 = queryData.getItemIntensifyData(firstItem2);
            if (judgmentResult.boolean) {
                if (judgmentResult.type == "gem") {
                    gemRelevant.playerGemItems(player, block.pos);
                } else if (judgmentResult.type == "reel") {
                    if (judgmentResult2.type == "reel") {
                        reelRelevant.playerReelUpgrade(player, block.pos);
                    } else {
                        reelRelevant.playerReelItem(player, block.pos);
                    }
                } else if (judgmentResult.type == "artifact") {
                    artifactRelevant.artifactStongToItem(player, block.pos);
                } else if (judgmentResult.type == "fragments") {
                    artifactRelevant.fragmentsSynthesis(player, block.pos);
                }
            }
        } else if (!firstItem.isNull()) {
            let judgmentResult = queryData.getItemIntensifyData(firstItem);
            if (judgmentResult.type == "fragments") {
                artifactRelevant.fragmentsSynthesis(player, block.pos);
            }
        }
    } else if (ConfigJson.removeOldItems && block.type != "minecraft:ender_chest") {
        let container = block.getContainer();
        if (container != undefined) {
            other.checkAllItemsContainer(container);
        }
    }
}

/**
 * 服务器启动完毕事件分发
 */
function serverStartedEvent() {
    readItemFile();
    versionUpdateModifyProfile();
    qingYi.playerSwitchHandheld();
    other.scheduledTasks();
    other.commandRegistration();
    ConfigReelItem = ConfigJson.relatedItems.reel;
    ConfigGemStong = ConfigJson.relatedItems.gemStone;
    ConfigGodStongDebris = ConfigJson.relatedItems.godStoneDebris;
    ConfigGodStong = ConfigJson.relatedItems.godStone;
}

/**
 * 玩家切换手持物事件分发
 * @param {Player} player 玩家对象
 * @param {Item} _oldItem 旧的物品对象
 * @param {Item} _newItem 新的物品对象
 */
function playerSwitchHandheldEvent(player, _oldItem, _newItem) {
    if (!player.isSimulatedPlayer()) {
        if (PlayerData[player.xuid] == undefined) {
            reelBuff.setPlayerBuff(player);
        } else {
            reelBuff.setReelBuffChange(player);
        }
    }
}

/**
 * 玩家盔甲栏改变事件分发
 * @param {Player} player 玩家对象
 * @param {Integer} _slotNum 盔甲栏序号
 * @param {Item} _item 物品对象
 */
function setArmorEvent(player, _slotNum, _item) {
    if (!player.isSimulatedPlayer()) {
        if (playerOnlineState[player.xuid]) {
            if (PlayerData[player.xuid] == undefined) {
                reelBuff.setPlayerBuff(player);
            } else {
                reelBuff.setReelBuffChange(player);
            }
        }
    }
}

/**
 * 玩家重生事件处理
 * @param {Player} player 玩家对象
 */
function respawnEvent(player) {
    setTimeout(() => {
        reelBuff.setPlayerBuff(player);
    }, 1000);
}

/**
 * 玩家完全进入游戏事件处理
 * @param {Player} player 玩家对象
 */
function joinEvent(player) {
    if (!player.isSimulatedPlayer()) {
        playerOnlineState[player.xuid] = true;
        playerTpSpc[player.xuid] = false;
    }
    if (ConfigJson.removeOldItems) {
        other.removeLegacyData(player);
    }
    if (lotteryFallback[player.xuid] == undefined) {
        lotteryFallback[player.xuid] = {
            "reelToItem": Array(ReelConfig.maxLevel).fill(0),
            "reelToNextLevel": Array(ReelConfig.maxLevel).fill(0),
            "godStoneDebris": 0
        }
        File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
    }
    if (lotteryFallback[player.xuid].gem == undefined) {
        lotteryFallback[player.xuid].gem = {}
        File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
    }
}

/**
 * 玩家链接服务器事件处理
 * @param {Player} player 玩家对象
 */
function preJoinEvent(player) {
    if (!player.isSimulatedPlayer()) {
        let xuid = player.xuid;
        if (playerGemCountDown[xuid] == undefined) {
            playerGemCountDown[xuid] = {
                "vampireGem": 0,
                "powerGem": 0,
                "explosiveGem": 0,
                "experienceGem": 0
            }
        }
    }
    if (player.isOP() && opState[player.xuid] == undefined) {
        opState[player.xuid] = false;
    }
}

/**
 * 玩家离开服务器事件处理
 * @param {Player} player 玩家对象
 */
function leftEvent(player) {
    if (!player.isSimulatedPlayer()) {
        playerOnlineState[player.xuid] = false;
    }
}

/**
 * 玩家攻击事件分发.
 * @param {Player} player 玩家对象
 * @param {Entity} entity 实体对象
 */
function attackEntityEvent(player, entity) {
    if (!player.isSimulatedPlayer()) {
        let playerHandItem = player.getHand();
        let handItemGemData = queryData.getItemGemData(playerHandItem);
        if (handItemGemData.gemState && handItemGemData.powerGem != undefined) {
            gemSetData.powerGemOperation(player, entity, handItemGemData);
        }
        if (handItemGemData.gemState && handItemGemData.vampireGem != undefined) {
            gemSetData.vampireGemOperation(player, entity, handItemGemData);
        }
        if (handItemGemData.gemState && handItemGemData.durableGem != undefined) {
            setTimeout(() => {
                if (playerHandItem.damage > 10) {
                    gemSetData.setItemDamage(playerHandItem);
                }
            }, 20);
        }
    }
}

/**
 * 弹射物命中实体事件处理
 * @param {Entity} entity 被命中的实体对象
 * @param {Entity} source 弹射物实体对象
 */
function projectileHitEntityEvent(entity, source) {
    if (playerRemoteInjuryData[source.uniqueId] != undefined) {
        let player = mc.getPlayer(playerRemoteInjuryData[source.uniqueId]);
        if (player != undefined) {
            let playerHandItem = player.getHand();
            let handItemGemData = queryData.getItemGemData(playerHandItem);
            if (handItemGemData.gemState && handItemGemData.explosiveGem != undefined) {
                gemSetData.explosiveGemOperation(player, entity.pos, handItemGemData);
            }
        }
        delete playerRemoteInjuryData[source.uniqueId];
    }
}

/**
 * 弹射物命中方块事件处理
 * @param {Block} block 被命中的方块对象
 * @param {Entity} source 弹射物实体对象
 */
function projectileHitBlockEvent(block, source) {
    if (playerRemoteInjuryData[source.uniqueId] != undefined) {
        let player = mc.getPlayer(playerRemoteInjuryData[source.uniqueId]);
        if (player != undefined) {
            let playerHandItem = player.getHand();
            let handItemGemData = queryData.getItemGemData(playerHandItem);
            if (handItemGemData.gemState && handItemGemData.explosiveGem != undefined) {
                gemSetData.explosiveGemOperation(player, block.pos, handItemGemData);
            }
        }
        delete playerRemoteInjuryData[source.uniqueId]

    }
}

/**
 * 弹射物创建事件处理.
 * @param {Entity} shooter 创建弹射物的对象
 * @param {Entity} entity 弹射物实体对象
 */
function projectileCreatedEvent(shooter, entity) {
    if (shooter.isPlayer()) {
        let player = shooter.toPlayer();
        let playerHandItem = player.getHand();
        setTimeout(() => {
            let handItemGemData = queryData.getItemGemData(playerHandItem);
            if (handItemGemData.gemState && handItemGemData.durableGem != undefined) {
                if (playerHandItem.damage > 10) {
                    gemSetData.setItemDamage(playerHandItem);
                    player.refreshItems();
                }
            }
        }, 20);

        playerRemoteInjuryData[entity.uniqueId] = player.xuid;
        setTimeout(() => {
            delete playerRemoteInjuryData[entity.uniqueId];
        }, 1000 * 5);
    }
}

/**
 * 玩家获得经验值事件处理
 * @param {Player} player 玩家对象
 * @param {Integer} exp 获得的经验值
 */
function experienceAddEvent(player, exp) {
    if (!player.isSimulatedPlayer() && !playerTpSpc[player.xuid]) {
        gemSetData.experienceGemOperation(player, exp);
    }
}

/**
 * 实体受伤事件处理.
 * @param {Entity} mob 受伤的实体对象
 * @param {Entity} _source 发起攻击的实体对象
 * @param {Integer} _damage 伤害值
 * @param {Integer} _cause 伤害类型
 */
function mobHurtEvent(mob, _source, _damage, _cause) {
    if (mob.isPlayer()) {
        let player = mob.toPlayer();
        if (!player.isSimulatedPlayer()) {
            let playerArmor = player.getArmor();
            let playerArmorAllItem = playerArmor.getAllItems();
            playerArmorAllItem.forEach(item => {
                let itemtemGemData = queryData.getItemGemData(item);
                if (itemtemGemData.gemState && itemtemGemData.durableGem != undefined) {
                    if (item.damage > 10) {
                        setTimeout(() => {
                            item.setDamage(0);
                        }, 20);
                    }
                }
            });

            let playerOffHandItem = player.getOffHand();
            let itemtemGemData = queryData.getItemGemData(playerOffHandItem);
            if (itemtemGemData.gemState && itemtemGemData.durableGem != undefined) {
                if (playerOffHandItem.damage > 10) {
                    setTimeout(() => {
                        playerOffHandItem.setDamage(0);
                    }, 20);
                }
            }
        }
    }
}

/**
 * 其他
 */
const other = {
    /**
     * 定时任务
     */
    scheduledTasks: function () {
        setInterval(() => {
            File.writeTo(pluginPath + "data/player/playerData.json", JSON.stringify(PlayerData, null, "\t"));
        }, 1000 * 10);
        setInterval(() => {
            for (let i in playerGemCountDown) {
                if (playerGemCountDown[i].vampireGem > 0) {
                    playerGemCountDown[i].vampireGem -= 1;
                }
                if (playerGemCountDown[i].powerGem > 0) {
                    playerGemCountDown[i].powerGem -= 1;
                }
                if (playerGemCountDown[i].explosiveGem > 0) {
                    playerGemCountDown[i].explosiveGem -= 1;
                }
                if (playerGemCountDown[i].experienceGem > 0) {
                    playerGemCountDown[i].experienceGem -= 1;
                }
            }
        }, 1000);
    },
    /**
     * 指令注册
     */
    commandRegistration: function () {
        let Command = mc.newCommand("intensify", i18n.get("command", ll.language), PermType.GameMasters);
        Command.setEnum("openAction", ["open"]);
        Command.setEnum("resetAction", ["reset"]);
        Command.setEnum("giveAction", ["give"]);
        Command.setEnum("UpReelMaxLvl", ["upreellvl"]);
        Command.setEnum("intensifyAction", ["reel"]);
        Command.setEnum("GemStoneAction", ["vampiregem", "powergem", "durablegem", "explosivegem", "experiencegem", "transfergem"]);
        Command.setEnum("godstone", godstoneArray);
        Command.setEnum("debris", debrisArray);
        Command.mandatory("pattern", ParamType.Enum, "UpReelMaxLvl", 1);
        Command.mandatory("pattern", ParamType.Enum, "openAction", 1);
        Command.mandatory("pattern", ParamType.Enum, "resetAction", 1);
        Command.mandatory("pattern", ParamType.Enum, "giveAction", 1);
        Command.mandatory("GiveVolume", ParamType.Enum, "intensifyAction", 0);
        Command.mandatory("GemStone", ParamType.Enum, "GemStoneAction", 0);

        Command.mandatory("GodStone", ParamType.Enum, "godstone", 0);
        Command.mandatory("GodStoneDebris", ParamType.Enum, "debris", 0);

        Command.mandatory("Level", ParamType.Int);
        Command.mandatory("Player", ParamType.Player);
        Command.mandatory("amount", ParamType.Int);
        Command.mandatory("Health", ParamType.Int);
        Command.overload(["giveAction", "Player", "GemStone", "amount"]);
        Command.overload(["giveAction", "Player", "GiveVolume"]);
        Command.overload(["giveAction", "Player", "GiveVolume", "Level"]);
        Command.overload(["resetAction", "Player", "Health"]);

        Command.overload(["giveAction", "Player", "GodStone", "amount"]);
        Command.overload(["giveAction", "Player", "GodStoneDebris", "amount"]);

        Command.overload(["openAction"]);
        Command.overload(["UpReelMaxLvl"]);
        Command.setCallback((_cmd, origin, output, results) => {
            let playerList = results.Player;
            let playerName = "";
            let setPlayerHealth = false;
            let getPlayerReel = false;
            let getPlayerGem = false;
            let getPlayerGodStone = false;
            let getPlayerGodStoneDebris = false;
            if (results.pattern == "open") {
                form.mainForm(origin.player);
            } else if (results.pattern == "upreellvl") {
                for (let xuid in lotteryFallback) {
                    lotteryFallback[xuid].reelToItem = Array(ReelConfig.maxLevel).fill(0);
                    lotteryFallback[xuid].reelToNextLevel = Array(ReelConfig.maxLevel).fill(0);
                }
                output.success(i18n.trl(ll.language, "upReelmaxlvlTip", playerName));
            } else {
                playerList.forEach(player => {
                    if (results.pattern == "reset") {
                        player.setHealth(parseInt(results.Health));
                        player.setMaxHealth(parseInt(results.Health));
                        playerName += `${player.realName} `;
                        setPlayerHealth = true;
                    } else if (results.pattern == "give") {
                        if (results.GiveVolume == "reel") {
                            if (results.Level == undefined || results.Level == "") {
                                let reelItem = generate.setReelItem(1, player, 1, 0);
                                player.giveItem(reelItem);
                                player.refreshItems();
                            } else {
                                let Level = parseInt(results.Level);
                                if (Level > 0 && Level <= ReelConfig.maxLevel) {
                                    let reelItem = generate.setReelItem(Level, player, 1, 0);
                                    player.giveItem(reelItem);
                                    player.refreshItems();
                                    getPlayerReel = true;
                                }
                            }
                        } else {
                            if (results.GodStone != undefined) {
                                player.giveItem(generate.setArtifactStone(player, results.GodStone, results.amount));
                                getPlayerGodStone = true;
                            } else if (results.GodStoneDebris != undefined) {
                                player.giveItem(generate.setFragments(player, results.GodStoneDebris, results.amount));
                                getPlayerGodStoneDebris = true;
                            } else if (results.GemStone == "vampiregem") {
                                let gemItem = generate.setGemItem("vampireGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            } else if (results.GemStone == "powergem") {
                                let gemItem = generate.setGemItem("powerGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            } else if (results.GemStone == "durablegem") {
                                let gemItem = generate.setGemItem("durableGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            } else if (results.GemStone == "explosivegem") {
                                let gemItem = generate.setGemItem("explosiveGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            } else if (results.GemStone == "experiencegem") {
                                let gemItem = generate.setGemItem("experienceGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            }
                            else if (results.GemStone == "transfergem") {
                                let gemItem = generate.setGemItem("transferGem", player, parseInt(results.amount), 0);
                                player.giveItem(gemItem);
                                getPlayerGem = true;
                            }
                            playerName += `${player.realName} `;
                            player.refreshItems();
                        }
                    }
                });
                if (setPlayerHealth) {
                    output.success(`${playerName} ${i18n.get("setPlayerHPTips", ll.language)}`);
                }
                if (getPlayerReel) {
                    output.success(i18n.trl(ll.language, "getPlayerReelTips", playerName));
                }
                if (getPlayerGem) {
                    output.success(i18n.trl(ll.language, "getPlayerGemTips", playerName));
                }
                if (getPlayerGodStone) {
                    output.success(i18n.trl(ll.language, "getPlayerGodStoneTips", playerName));
                }
                if (getPlayerGodStoneDebris) {
                    output.success(i18n.trl(ll.language, "getPlayerGodStoneDebrisTips", playerName));
                }
            }
        })
        Command.setup();
    },
    /**
     * 检查玩家背包及末影箱的旧物品.
     * @param {Player} player 玩家对象
     */
    removeLegacyData: function (player) {
        let playerOffHandItem = player.getOffHand();
        let playerArmor = player.getArmor();
        let playerInventory = player.getInventory();
        let playerEnderChest = player.getEnderChest();
        let offHandItemState = this.getOldVersion(playerOffHandItem);
        if (offHandItemState.state) {
            playerOffHandItem.set(offHandItemState.item);
        }
        this.checkAllItemsContainer(playerArmor);
        this.checkAllItemsContainer(playerInventory);
        this.checkAllItemsContainer(playerEnderChest);
        player.refreshItems();
    },
    /**
     * 检查并清除容器内的旧物品.
     * @param {Container} container 容器对象
     */
    checkAllItemsContainer: function (container) {
        let containerAllItem = container.getAllItems();
        containerAllItem.forEach(item => {
            if (!item.isNull()) {
                let ItemState = this.getOldVersion(item);
                if (ItemState.state) {
                    item.set(ItemState.item);
                }
            }
        });
    },
    /**
     * 检测是否有旧数据并删除.
     * @param {Item} item 物品对象
     * @returns JSON对象
     */
    getOldVersion: function (item) {
        let returnData = { "state": false };
        if (item.type == ConfigGemStong) {
            let itemNbt = item.getNbt();
            let tag = itemNbt.getTag("tag");
            if (tag != undefined) {
                let addonTag = tag.getTag("addon");
                if (addonTag != undefined) {
                    let qualityTag = addonTag.getTag("quality");
                    if (qualityTag == undefined) {
                        item = mc.newItem(item.type, item.count);
                        returnData.item = item;
                        returnData.state = true;
                    }
                }
            }
        } else if (item.type == ConfigReelItem) {
            let itemNbt = item.getNbt();
            let tag = itemNbt.getTag("tag");
            if (tag != undefined) {
                let addonTag = tag.getTag("addon");
                if (addonTag != undefined) {
                    let qualityTag = addonTag.getTag("reeltype");
                    if (qualityTag == undefined) {
                        item = mc.newItem(item.type, item.count);
                        returnData.item = item;
                        returnData.state = true;
                    }
                }
            }
        } else if (item.type == ConfigGodStongDebris || item.type == ConfigGodStong) {
            returnData = { "state": false };
        } else {
            let itemNbt = item.getNbt();
            let tag = itemNbt.getTag("tag");
            if (tag != undefined) {
                let addonTag = tag.getTag("addon");
                if (addonTag != undefined) {
                    tag.removeTag("addon");
                    item = mc.newItem(itemNbt);
                    item.setLore([""]);
                    returnData.item = item;
                    returnData.state = true;
                }
            }
        }
        return returnData;
    }
}

/**
 * 表单相关
 */
const form = {
    /**
     * 主表单
     * @param {Player} player 玩家对象
     */
    mainForm: function (player) {
        let i = 0;
        let fm = mc.newSimpleForm()
            .setTitle(`${i18n.get("form_main_title", player.langCode)}`)
            .setContent(i18n.get("form_main_content", player.langCode));
        availableItemTypes.forEach(itemTypeName => {
            fm.addButton(i18n.get(itemTypeName, player.langCode), availableItemPicture[i]);
            i += 1;
        });
        player.sendForm(fm, (player, id) => {
            if (id == undefined) {
                return false;
            } else {
                let itemTypeObj = [];
                switch (id) {
                    case 0:
                        itemTypeObj = helmetDataArray;
                        break;
                    case 1:
                        itemTypeObj = chestplateDataArray;
                        break;
                    case 2:
                        itemTypeObj = leggingsDataArray;
                        break;
                    case 3:
                        itemTypeObj = bootsDataArray;
                        break;
                    case 4:
                        itemTypeObj = toolDataArray;
                        break;
                    case 5:
                        itemTypeObj = swordDataArray;
                        break;
                }
                this.selectItemForm(player, itemTypeObj, availableItemTypes[id]);
            }
        })
    },
    /**
     * 玩家选择物品表单
     * @param {Player} player 玩家对象
     * @param {Object} itemTypeObj 玩家选择的数组对象
     * @param {String} selectedType 选择的类型
     */
    selectItemForm: function (player, itemTypeObj, selectedType) {
        let knapsackData = this.getPlayerAllItem(player);
        if (knapsackData.state) {
            let available = knapsackData.available;
            let display = knapsackData.display;
            let fm = mc.newCustomForm()
                .setTitle(i18n.trl(player.langCode, "form_selectItem_title", i18n.get(selectedType, player.langCode)))
                .addLabel(i18n.get("form_selectItem_label", player.langCode));
            display.forEach(itemType => {
                fm.addSwitch(itemType);
            });
            player.sendForm(fm, (player, data) => {
                if (data == undefined) {
                    return false;
                } else {
                    let cumulativeArray = [];
                    data.splice(0, 1);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]) {
                            cumulativeArray.push(available[i]);
                        }
                    }
                    if (cumulativeArray != []) {
                        cumulativeArray = Array.from(new Set(cumulativeArray));
                        itemTypeObj.push.apply(itemTypeObj, cumulativeArray);
                        itemTypeObj = Array.from(new Set(itemTypeObj));
                        this.addItemsToConfig(player, itemTypeObj, ItemRoute[selectedType]);
                    }
                }
            })
        }
    },
    /**
     * 修改完成后写文件并去重
     * @param {Player} player 玩家对象
     * @param {Object} itemTypeObj 修改完成的数组对象
     * @param {String} route 文件路径
     */
    addItemsToConfig: function (player, itemTypeObj, route) {
        for (let i in ItemRoute) {
            let current = ItemRoute[i];
            let itemArrayData = JSON.parse(File.readFrom(current));
            let duplicateQuery = this.getRepeatData(itemArrayData, itemTypeObj);
            if (duplicateQuery.state) {
                for (let i = 0; i < itemArrayData.length; i++) {
                    duplicateQuery.result.forEach(CurrentValue => {
                        if (CurrentValue == itemArrayData[i]) {
                            itemArrayData.splice(i, 1);
                        }
                    })
                }
                File.writeTo(current, JSON.stringify(itemArrayData, null, "\t"));
            }
        }
        File.writeTo(route, JSON.stringify(itemTypeObj, null, "\t"));
        readItemFile();
        player.tell(i18n.get("addItemsToConfig", player.langCode));
    },
    /**
     * 查询两个数组重复的内容
     * @param {Array} array1 数组1
     * @param {Array} array2 数组2
     * @returns 重复的内容
     */
    getRepeatData: function (array1, array2) {
        let returnVariable = { "state": false };
        let newA = new Set(array1);
        let newB = new Set(array2);
        let intersectionSet = new Set([...newA].filter(x => newB.has(x)));
        let result = Array.from(intersectionSet);
        if (result != []) {
            returnVariable.state = true;
            returnVariable.result = result;
        }
        return returnVariable;
    },
    /**
     * 获取玩背包所有物品.
     * @returns 玩家背包物品列表
     */
    getPlayerAllItem: function (player) {
        let available = [];
        let display = [];
        let returnVariable = { "state": false };
        let getPlayerInventoryList = player.getInventory().getAllItems();
        getPlayerInventoryList.forEach(item => {
            if (!item.isNull()) {
                display.push(`${item.type}\n${item.name}`);
                available.push(item.type);
            }
        });
        if (available.length > 0) {
            returnVariable.state = true;
        }
        returnVariable.display = display;
        returnVariable.available = available;
        return returnVariable;
    }
}

/**
 * 卷轴buff设置相关
 */
const reelBuff = {
    /**
     * 设置玩家buff（全部）
     * @param {{Player}} player 玩家对象
     */
    setPlayerBuff: function (player) {
        let allBuffArray = queryData.getPlayerReelBuff(player);
        PlayerData[player.xuid] = allBuffArray;
        allBuffArray.forEach(buffData => {
            let buffId = buffData.buffId;
            let buffLevel = buffData.buffLevel;
            if (buffId != "") {
                player.addEffect(buffIdCompare[buffId], 999999 * 20, buffLevel, false);
            }
        });
    },
    /**
     * 设置玩家buff（变动部分）
     * @param {Player} player 玩家对象
     */
    setReelBuffChange: function (player) {
        let allBuffArray = queryData.getPlayerReelBuff(player);
        const { addElem, delElem } = arrayContrast.diffArray(allBuffArray, PlayerData[player.xuid], 'buffId');
        delElem.forEach(buffData => {
            let buffId = buffData.buffId;
            //let buffLevel = buffData.buffLevel;
            if (buffId != "") {
                player.removeEffect(buffIdCompare[buffId]);
            }
        });
        addElem.forEach(buffData => {
            let buffId = buffData.buffId;
            let buffLevel = buffData.buffLevel;
            if (buffId != "") {
                player.addEffect(buffIdCompare[buffId], 999999 * 20, buffLevel, false);
            }
        });
        PlayerData[player.xuid] = allBuffArray;
    }
}

/**
 * 宝石效果处理
 */
const gemSetData = {
    /**
     * 设置物品耐久度.
     * @param {Item} item 物品对象
     */
    setItemDamage: function (item) {
        item.setDamage(1);
    },
    /**
     * 处理玩家吸血宝石.
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     * @param {Object} handItemGemData 手持物品宝石数据
     */
    vampireGemOperation: function (player, entity, handItemGemData) {
        let randomNumber = qingYi.getRandomNum(0, 100);
        if (randomNumber < GemConfig.vampireGem.triggerProbability[handItemGemData.vampireGem - 1]) {
            let xuid = player.xuid;
            let countDown = playerGemCountDown[xuid].vampireGem;
            if (countDown == 0) {
                let oldHealth = entity.health;
                setTimeout(() => {
                    let NewEntity = queryData.getEntity(entity.uniqueId);
                    if (NewEntity != undefined) {
                        let newHealth = NewEntity.health;
                        let trueHurt = oldHealth - newHealth;
                        if (trueHurt > 0) {
                            let gemRecoveryRatio = GemConfig.vampireGem.relatedData[handItemGemData.vampireGem - 1] / 100;
                            let recoveryAmount = Math.round(trueHurt * gemRecoveryRatio);
                            let cdTime = GemConfig.vampireGem.CDTime[handItemGemData.vampireGem - 1];
                            playerGemCountDown[xuid].vampireGem = cdTime;
                            if (player.health < player.maxHealth) {
                                if (player.maxHealth - player.health >= recoveryAmount) {
                                    log(`add血量点位1 ${player.realName}设置血量为 ${player.health + recoveryAmount}`)
                                    player.setHealth(player.health + recoveryAmount);
                                } else {
                                    log(`add血量点位2 ${player.realName}设置血量为 ${player.maxHealth}`)
                                    player.setHealth(player.maxHealth);
                                }
                            }
                        }
                    }
                }, 100);
            }
        }
    },
    /**
     * 处理爆炸宝石.
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标对象
     * @param {Object} handItemGemData 手持物品宝石数据
     */
    explosiveGemOperation: function (player, pos, handItemGemData) {
        let randomNumber = qingYi.getRandomNum(0, 100);
        if (randomNumber < GemConfig.explosiveGem.triggerProbability[handItemGemData.explosiveGem - 1]) {
            let xuid = player.xuid;
            let cdTime = GemConfig.explosiveGem.CDTime[handItemGemData.explosiveGem - 1];
            let countDown = playerGemCountDown[xuid].explosiveGem;
            if (countDown == 0) {
                setTimeout(() => {
                    let explosionValue = GemConfig.explosiveGem.relatedData[handItemGemData.explosiveGem - 1];
                    mc.explode(pos, player, explosionValue, false, false);
                }, 100);
                playerGemCountDown[xuid].explosiveGem = cdTime;
            }
        }
    },
    /**
     * 处理暴击宝石.
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     * @param {Object} handItemGemData 手持物品宝石数据
     */
    powerGemOperation: function (player, entity, handItemGemData) {
        let randomNumber = qingYi.getRandomNum(0, 100);
        if (randomNumber < GemConfig.powerGem.triggerProbability[handItemGemData.powerGem - 1]) {
            let xuid = player.xuid;
            let cdTime = GemConfig.powerGem.CDTime[handItemGemData.powerGem - 1];
            let countDown = playerGemCountDown[xuid].powerGem;
            if (countDown == 0) {
                setTimeout(() => {
                    let criticalDamage = GemConfig.powerGem.relatedData[handItemGemData.powerGem - 1];
                    let NewEntity = queryData.getEntity(entity.uniqueId);
                    if (NewEntity != undefined) {
                        NewEntity.hurt(criticalDamage, 2);
                    }
                }, 100);
                playerGemCountDown[xuid].powerGem = cdTime;
            }
        }
    },
    /**
     * 经验宝石处理
     * @param {Player} player 玩家对象
     * @param {Integer} exp 获得的经验值
     */
    experienceGemOperation: function (player, exp) {
        let allTriggerProbability = 0;
        let increaseProportion = 0;
        let cumulativeCDTime = 0;
        let playerArmor = player.getArmor();
        let playerArmorAllItem = playerArmor.getAllItems();
        playerArmorAllItem.forEach(item => {
            let itemGem = queryData.getItemGemData(item);
            if (itemGem.gemState && itemGem.experienceGem != undefined) {
                allTriggerProbability += GemConfig.experienceGem.triggerProbability[itemGem.experienceGem - 1];
                increaseProportion += GemConfig.experienceGem.relatedData[itemGem.experienceGem - 1];
                cumulativeCDTime += GemConfig.experienceGem.CDTime[itemGem.experienceGem - 1];
            }
        });
        if (allTriggerProbability > 0) {
            let randomNumber = qingYi.getRandomNum(0, 100);
            if (allTriggerProbability > randomNumber) {
                let xuid = player.xuid;
                let countDown = playerGemCountDown[xuid].experienceGem;
                if (countDown == 0) {
                    let gemRecoveryRatio = increaseProportion / 100;
                    let recoveryAmount = Math.round(exp * gemRecoveryRatio);
                    playerGemCountDown[xuid].experienceGem = cumulativeCDTime;
                    player.addExperience(parseInt(recoveryAmount));
                }
            }
        }
    },
    /**
     * 转移宝石处理.
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标对象
     */
    transferGemOperation: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let firstItem = containerAllItem[0];
        let secondItem = containerAllItem[1];
        if (!firstItem.isNull() && !secondItem.isNull()) {
            if (firstItem.count == 1) {
                let firstData = queryData.getItemIntensifyData(firstItem);
                let secondData = queryData.getItemIntensifyData(secondItem);
                if (firstData.boolean && firstData.type == "gem") {
                    if (firstData.gemtype == "transferGem") {
                        let firstItemNbt = firstItem.getNbt();
                        let firstItemNbtInTag = firstItemNbt.getTag("tag").getTag("transferGem");
                        if (firstItemNbtInTag != undefined) {
                            if (!secondData.boolean) {
                                let dataType = firstItemNbt.getTag("tag").getData("transferGemType");
                                if (availableItemJson[dataType + "DataArray"].includes(secondItem.type)) {
                                    let secondItemNbt = secondItem.getNbt();
                                    let itemTagNbt = secondItemNbt.getTag("tag");
                                    if (itemTagNbt == undefined) {
                                        secondItemNbt.setTag("tag", new NbtCompound({}));
                                        itemTagNbt = secondItemNbt.getTag("tag");
                                    }
                                    itemTagNbt.setTag("intensify", firstItemNbtInTag);
                                    secondItem.setNbt(secondItemNbt);
                                    secondItem.set(loreSet.setItemLore(secondItem, player));
                                    mc.getBlock(pos).getContainer().removeItem(0, 1);
                                    qingYi.setPlaySound(player, 0);
                                } else {
                                    qingYi.setPlaySound(player, 2);
                                }
                            } else {
                                qingYi.setPlaySound(player, 2);
                            }
                        } else {
                            let container = mc.getBlock(pos).getContainer();
                            let randomNumber = qingYi.getRandomNum(0, 100);
                            let gemSuccessPr = GemConfig[firstData.gemtype].successProbability[parseInt(firstData.lvl) - 1];
                            if (gemSuccessPr > randomNumber) {
                                let secondItemNbt = secondItem.getNbt();
                                let secondItemNbtInTag = secondItemNbt.getTag("tag").getTag("intensify");
                                let firstItemNbt = firstItem.getNbt();
                                if (secondItemNbtInTag != undefined) {
                                    firstItemNbt.getTag("tag").setTag("transferGem", secondItemNbtInTag);
                                    firstItemNbt.getTag("tag").setString("transferGemType", queryData.getItemAttribute(secondItem));
                                    firstItem.setNbt(firstItemNbt);
                                    secondItemNbt.getTag("tag").removeTag("intensify");
                                    secondItem.setNbt(secondItemNbt);
                                    secondItem.setLore([""]);
                                    firstItem.set(loreSet.setTransferGemLore(player, firstItem));
                                    qingYi.setPlaySound(player, 0);
                                } else {
                                    qingYi.setPlaySound(player, 2);
                                }
                            } else {
                                container.removeItem(0, 1);
                                qingYi.setPlaySound(player, 1);
                            }
                        }
                    }
                }
            } else {
                qingYi.setPlaySound(player, 2);
            }

        }
    }
}

/**
 * 卷轴相关函数
 */
const reelRelevant = {
    /**
    * 玩家破坏方块事件监听处理是否掉落卷轴.
    * @param {Player} player 破坏方块的玩家对象
    * @param {Block} block 被破坏的方块对象
    */
    playerDestroyBlockGetReel: function (player, block) {
        if (queryData.getReelAllBlock().includes(block.type)) {
            let randomNumber = qingYi.getRandomNum(0, 100);
            if (randomNumber < ReelConfig.blockList[block.type]) {
                let reelItem = generate.setReelItem(1, player, 1, 0);
                mc.spawnItem(reelItem, block.pos);
            }
        }
    },
    /**
     * 卷轴镶嵌上物品操作.
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标点对象
     */
    playerReelItem: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let firstItem = containerAllItem[0];
        let secondItem = containerAllItem[1];
        if (!firstItem.isNull() && !secondItem.isNull()) {
            let firstData = queryData.getItemIntensifyData(firstItem);
            let secondData = queryData.getItemIntensifyData(secondItem);
            if (firstData.boolean && firstData.type == "reel") {
                let ReelAvailableItem = queryData.getReelAvailableItems();
                if (ReelAvailableItem.includes(secondItem.type)) {
                    if (!secondData.boolean || secondData.type == "otherItems") {
                        let permittedEeinforcement = true;
                        if (secondData.boolean && secondData.reel != undefined) {
                            if (secondData.reel.lvl >= ReelConfig.maxLevel || secondData.reel.lvl >= firstData.lvl || firstData.lvl - secondData.reel.lvl > 1) {
                                qingYi.setPlaySound(player, 2);
                                permittedEeinforcement = false;
                            }
                        } else {
                            if (firstData.lvl != 1) {
                                qingYi.setPlaySound(player, 2);
                                permittedEeinforcement = false;
                            }
                        }
                        if (permittedEeinforcement) {
                            let container = mc.getBlock(pos).getContainer();
                            let reelDataJson = queryData.getReelLevelToData(parseInt(firstData.lvl));
                            let randomNumber = qingYi.getRandomNum(0, 100);
                            if (player.isOP() && opState[player.xuid]) {
                                randomNumber = reelDataJson.equipProbability;
                            }
                            let current = lotteryFallback[player.xuid].reelToItem[firstData.lvl - 1];
                            let configData = reelDataJson.toItemGuarantee;
                            if (current >= configData) {
                                randomNumber = reelDataJson.equipProbability;
                                lotteryFallback[player.xuid].reelToItem[firstData.lvl - 1] = 0;
                            }
                            if (reelDataJson.equipProbability >= randomNumber) {
                                let itemAttribute = queryData.getItemAttribute(secondItem);
                                let item = this.setItemReelData(secondItem, itemAttribute, parseInt(firstData.lvl));
                                item = loreSet.setItemLore(item, player);
                                container.removeItem(0, 1);
                                secondItem.setNbt(item.getNbt());
                                qingYi.setPlaySound(player, 0);
                                lotteryFallback[player.xuid].reelToItem[firstData.lvl - 1] = 0;
                            } else {
                                container.removeItem(0, 1);
                                qingYi.setPlaySound(player, 1);
                                lotteryFallback[player.xuid].reelToItem[firstData.lvl - 1] += 1;
                            }
                            File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
                        }
                    }
                }
            }
        }
    },
    /**
     * 设置物品NBT中的卷轴数据.
     * @param {Item} item 物品对象
     * @param {String} position 卷轴部位
     * @param {Integer} level 卷轴等级
     * @returns 设置好的物品对象.
     */
    setItemReelData: function (item, position, level) {
        let itemNbt = item.getNbt();
        let itemTagNbt = itemNbt.getTag("tag");
        if (itemTagNbt == undefined) {
            itemNbt.setTag("tag", new NbtCompound({}));
            itemTagNbt = itemNbt.getTag("tag");
        }
        let itemIntensifyTag = itemTagNbt.getTag("intensify");
        if (itemIntensifyTag == undefined) {
            let newNbt = new NbtCompound({
                "reel": new NbtCompound({})
            });
            newNbt.getTag("reel").setInt(position, level);
            itemNbt.getTag("tag").setTag("intensify", newNbt);
            item.setNbt(itemNbt);
        } else {
            let itemReelTag = itemIntensifyTag.getTag("reel");
            if (itemReelTag == undefined) {
                itemNbt.getTag("tag").getTag("intensify").setTag("reel", new NbtCompound({}));
                itemNbt.getTag("tag").getTag("intensify").getTag("reel").setInt(position, level);
                item.setNbt(itemNbt);
            } else {
                let currentReel = itemReelTag.getTag(position);
                if (currentReel == undefined) {
                    itemNbt.getTag("tag").getTag("intensify").getTag("reel").setInt(position, level);
                } else {
                    itemNbt.getTag("tag").getTag("intensify").getTag("reel").setInt(position, level);
                }
                item.setNbt(itemNbt);
            }
        }
        return item;
    },
    /**
     * 玩家卷轴升级操作
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标点对象
     */
    playerReelUpgrade: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let Scroll1 = containerAllItem[0];
        let Scroll2 = containerAllItem[1];
        let Scroll3 = containerAllItem[2];
        let Scroll4 = containerAllItem[8];
        let Scroll1Data = queryData.getItemIntensifyData(Scroll1);
        let Scroll2Data = queryData.getItemIntensifyData(Scroll2);
        let Scroll3Data = queryData.getItemIntensifyData(Scroll3);
        if (Scroll1Data.type == "reel" && Scroll1Data.type == Scroll2Data.type && Scroll1Data.type == Scroll3Data.type) {
            if (Scroll1Data.lvl == Scroll2Data.lvl && Scroll1Data.lvl == Scroll3Data.lvl && Scroll1Data.lvl < ReelConfig.maxLevel) {
                let reelDataJson = queryData.getReelLevelToData(parseInt(Scroll1Data.lvl));
                let randomNumber = qingYi.getRandomNum(0, 100);
                let container = mc.getBlock(pos).getContainer();
                if (player.isOP() && opState[player.xuid]) {
                    randomNumber = reelDataJson.nextLevelProbability;
                }
                if (lotteryFallback[player.xuid].reelToNextLevel[Scroll1Data.lvl - 1] >= reelDataJson.tonextLevelGuarantee) {
                    randomNumber = reelDataJson.nextLevelProbability;
                    lotteryFallback[player.xuid].reelToNextLevel[Scroll1Data.lvl - 1] = 0;
                }
                if (reelDataJson.nextLevelProbability >= randomNumber) {
                    let item = generate.setReelItem(parseInt(Scroll1Data.lvl) + 1, player, 1, parseInt(Scroll1Data.reeltype));
                    container.removeItem(0, 1);
                    container.removeItem(1, 1);
                    container.removeItem(2, 1);
                    if(Scroll4.isNull()){
                        Scroll4.setNbt(item.getNbt());
                    }else{
                        mc.spawnItem(item,pos);
                    }
                    qingYi.setPlaySound(player, 0);
                    lotteryFallback[player.xuid].reelToNextLevel[Scroll1Data.lvl - 1] = 0;
                } else {
                    container.removeItem(0, 1);
                    container.removeItem(1, 1);
                    container.removeItem(2, 1);
                    qingYi.setPlaySound(player, 1);
                    lotteryFallback[player.xuid].reelToNextLevel[Scroll1Data.lvl - 1] += 1;
                }
                File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
            }
        }
    }
}

/**
 * 宝石相关函数
 */
const gemRelevant = {
    /**
     * 实体死亡事件监听处理是否掉落宝石.
     * @param {Entity} entity 死亡的实体对象
     * @param {Entity} source 伤害来源的实体对象
     */
    playerKillEntityGetGem: function (entity, source) {
        if (queryData.getGemAllEntity().includes(entity.type)) {
            let gemNameArray = queryData.getGemNameArray(entity.type);
            let gemRandomly = gemNameArray[qingYi.getRandomInt(0, gemNameArray.length)];
            let randomNumber = qingYi.getRandomNum(0, 100);
            let selectGemConfig = GemConfig[gemRandomly];
            if (selectGemConfig != undefined) {
                if (randomNumber < selectGemConfig.droppingProbability) {
                    let gemItem = generate.setGemItem(gemRandomly, source.toPlayer(), 1, 0);
                    mc.spawnItem(gemItem, entity.pos);
                }
            }
        }
    },
    /**
     * 宝石镶嵌到物品相关操作.
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标对象
     */
    playerGemItems: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let firstItem = containerAllItem[0];
        let secondItem = containerAllItem[1];
        if (!firstItem.isNull() && !secondItem.isNull()) {
            let firstData = queryData.getItemIntensifyData(firstItem);
            let secondData = queryData.getItemIntensifyData(secondItem);
            if (firstData.boolean && firstData.type == "gem") {
                if (firstData.gemtype == "transferGem") {
                    gemSetData.transferGemOperation(player, pos);
                } else {
                    if (queryData.getGemNameAvailableItems(firstData.gemtype).includes(secondItem.type)) {
                        if (!secondData.boolean || secondData.type == "otherItems") {
                            let itemGemLvl = queryData.getItemGemLvL(firstData.gemtype, secondData.gem);
                            if (secondData.boolean && itemGemLvl >= GemConfig[firstData.gemtype].maxLevel) {
                                qingYi.setPlaySound(player, 2);
                                return;
                            } else {
                                let container = mc.getBlock(pos).getContainer();
                                let randomNumber = qingYi.getRandomNum(0, 100);
                                let gemSuccessPr = GemConfig[firstData.gemtype].successProbability[itemGemLvl];
                                let guaranteedData = GemConfig[firstData.gemtype].Guarantee[itemGemLvl];
                                //判断是否有此宝石保底数据，没有就置零
                                if (lotteryFallback[player.xuid].gem[firstData.gemtype] == undefined) {
                                    let gemLotteryFallback = [];
                                    for (let i = 0; i < GemConfig[firstData.gemtype].Guarantee.length; i++) {
                                        gemLotteryFallback.push(0);
                                    }
                                    lotteryFallback[player.xuid].gem[firstData.gemtype] = gemLotteryFallback;
                                }
                                let playerGemlotteryFallback = lotteryFallback[player.xuid].gem[firstData.gemtype][itemGemLvl];

                                if (player.isOP() && opState[player.xuid]) {
                                    randomNumber = gemSuccessPr;
                                }
                                if (guaranteedData <= playerGemlotteryFallback) {
                                    randomNumber = gemSuccessPr;
                                }
                                if (randomNumber <= gemSuccessPr) {
                                    let item = this.setItemGemData(secondItem, firstData.gemtype, parseInt(firstData.lvl));
                                    item = loreSet.setItemLore(item, player);
                                    container.removeItem(0, 1);
                                    secondItem.setNbt(item.getNbt());
                                    qingYi.setPlaySound(player, 0);
                                    lotteryFallback[player.xuid].gem[firstData.gemtype][itemGemLvl] = 0;
                                } else {
                                    container.removeItem(0, 1);
                                    qingYi.setPlaySound(player, 1);
                                    lotteryFallback[player.xuid].gem[firstData.gemtype][itemGemLvl] += 1;
                                }
                                File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
                            }
                        }
                    }
                }
            }
        }
    },
    /**
     * 设置物品NBT中的宝石数据.
     * @param {Item} item 物品对象
     * @param {String} gemName 宝石名称
     * @param {Integer} level 宝石等级
     * @returns 设置好的物品对象
     */
    setItemGemData: function (item, gemName, level) {
        let itemNbt = item.getNbt();
        let itemTagNbt = itemNbt.getTag("tag");
        if (itemTagNbt == undefined) {
            itemNbt.setTag("tag", new NbtCompound({}));
            itemTagNbt = itemNbt.getTag("tag");
        }
        let itemIntensifyTag = itemTagNbt.getTag("intensify");
        if (itemIntensifyTag == undefined) {
            let newNbt = new NbtCompound({
                "gem": new NbtCompound({})
            });
            newNbt.getTag("gem").setInt(gemName, level);
            itemNbt.getTag("tag").setTag("intensify", newNbt);
            item.setNbt(itemNbt);
        } else {
            let itemGemTag = itemIntensifyTag.getTag("gem");
            if (itemGemTag == undefined) {
                itemNbt.getTag("tag").getTag("intensify").setTag("gem", new NbtCompound({}));
                itemNbt.getTag("tag").getTag("intensify").getTag("gem").setInt(gemName, level);
                item.setNbt(itemNbt);
            } else {
                let currentGem = itemGemTag.getTag(gemName);
                if (currentGem == undefined) {
                    itemNbt.getTag("tag").getTag("intensify").getTag("gem").setInt(gemName, level);
                } else {
                    itemNbt.getTag("tag").getTag("intensify").getTag("gem").setInt(gemName, parseInt(currentGem) + level);
                }
                item.setNbt(itemNbt);
            }
        }
        return item;
    }
}

/**
 * 神器石相关函数
 */
const artifactRelevant = {
    /**
     * 神器碎片合成处理
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标对象
     */
    fragmentsSynthesis: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let firstItem = containerAllItem[0];
        if (!firstItem.isNull()) {
            let firstData = queryData.getItemIntensifyData(firstItem);
            if (firstData.boolean && firstData.type == "fragments") {
                let fragmentConfig = queryData.getArtifactDebrisData(firstData.name);
                if (fragmentConfig.artifactState) {
                    let quantityRequired = fragmentConfig.artifactData.debrisNumber;
                    let configProbability = fragmentConfig.artifactData.successProbability;
                    let artifactName = fragmentConfig.artifactName;
                    if (firstItem.count >= quantityRequired) {
                        let container = mc.getBlock(pos).getContainer();
                        let item = generate.setArtifactStone(player, artifactName, 1);
                        let randomNumber = qingYi.getRandomNum(0, 100);
                        if (player.isOP() && opState[player.xuid]) {
                            randomNumber = configProbability;
                        }
                        if (lotteryFallback[player.xuid].godStoneDebris >= fragmentConfig.artifactData.composeFallback) {
                            randomNumber = configProbability;
                            lotteryFallback[player.xuid].godStoneDebris = 0;
                        }
                        if (configProbability >= randomNumber) {
                            if (container.removeItem(0, quantityRequired)) {
                                container.addItem(item);
                                qingYi.setPlaySound(player, 0);
                                lotteryFallback[player.xuid].godStoneDebris = 0;
                            }
                        } else {
                            container.removeItem(0, quantityRequired);
                            qingYi.setPlaySound(player, 1);
                            lotteryFallback[player.xuid].godStoneDebris += 1;
                        }
                        File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify(lotteryFallback, null, "\t"));
                    } else {
                        qingYi.setPlaySound(player, 2);
                        return;
                    }
                }
            }

        }
    },
    /**
     * 神器石上物品处理
     * @param {Player} player 玩家对象
     * @param {Pos} pos 坐标对象
     */
    artifactStongToItem: function (player, pos) {
        let containerAllItem = queryData.getContainerAllItem(pos);
        let firstItem = containerAllItem[0];
        let secondItem = containerAllItem[1];
        if (!firstItem.isNull() && !secondItem.isNull()) {
            let firstData = queryData.getItemIntensifyData(firstItem);
            if (firstData.boolean && firstData.type == "artifact") {
                let secondItemNbt = secondItem.getNbt();
                let secondItemTag = secondItemNbt.getTag("tag");
                let container = mc.getBlock(pos).getContainer();
                let artifactConfig = queryData.getArtifactData(firstData.name);
                if (secondItemTag != undefined) {
                    let secondItemEnch = secondItemTag.getTag("ench");
                    if (secondItemEnch != undefined) {
                        let enchArray = secondItemEnch.toArray();
                        artifactConfig.artifactData.attribute.forEach(data => {
                            let check = false;
                            for (let i = 0; i < enchArray.length; i++) {
                                let enchData = enchArray[i];
                                if (data.CurseID == enchData.id) {
                                    if (data.CurseLvl > enchData.lvl) {
                                        let nbt = new NbtCompound({
                                            "id": new NbtShort(parseInt(data.CurseID)),
                                            "lvl": new NbtShort(parseInt(data.CurseLvl))
                                        });
                                        secondItemEnch.setTag(i, nbt);

                                    }
                                    check = true;
                                }
                            }
                            if (!check) {
                                let nbt = new NbtCompound({
                                    "id": new NbtShort(parseInt(data.CurseID)),
                                    "lvl": new NbtShort(parseInt(data.CurseLvl))
                                });
                                secondItemEnch.addTag(nbt);
                            }
                        });
                        let newNbt = secondItemNbt.setTag("tag", secondItemTag.setTag("ench", secondItemEnch));
                        container.setItem(1, mc.newItem(newNbt));
                        container.removeItem(0, firstItem.count);
                        qingYi.setPlaySound(player, 0);
                    } else {
                        let nbt = new NbtList([]);
                        artifactConfig.artifactData.attribute.forEach(data => {
                            let nbt1 = new NbtCompound({
                                "id": new NbtShort(parseInt(data.CurseID)),
                                "lvl": new NbtShort(parseInt(data.CurseLvl))
                            });
                            nbt.addTag(nbt1);
                        });
                        let newNbt = secondItemNbt.setTag("tag", secondItemTag.setTag("ench", nbt))
                        container.setItem(1, mc.newItem(newNbt));
                        container.removeItem(0, firstItem.count);
                        qingYi.setPlaySound(player, 0);
                    }
                } else {
                    let nbt = new NbtCompound({
                        "Damage": new NbtInt(0),
                        "RepairCost": new NbtInt(1),
                        "ench": new NbtList([]),
                    })
                    artifactConfig.artifactData.attribute.forEach(data => {
                        let nbt1 = new NbtCompound({
                            "id": new NbtShort(parseInt(data.CurseID)),
                            "lvl": new NbtShort(parseInt(data.CurseLvl))
                        });
                        let ench = nbt.getTag("ench");
                        ench.addTag(nbt1);
                    });
                    let newNbt = secondItem.getNbt().setTag("tag", nbt);
                    container.setItem(1, mc.newItem(newNbt));
                    container.removeItem(0, firstItem.count);
                    qingYi.setPlaySound(player, 0);
                }
            }
        }
    }
}

/**
 * 设置相关Lore
 */
const loreSet = {
    /**
     * 设置卷轴物品Lore
     * @param {Item} Item 物品对象
     * @param {Player} player 玩家对象
     * @param {Integer} lvl 卷轴等级
     * @param {Integer} quality 卷轴类型
     * @returns 设置好的物品对象
     */
    setReelLore: function (Item, player, lvl, quality) {
        let loreArray;
        let reelDataJson = queryData.getReelLevelToData(lvl);
        if (quality == 0) {
            loreArray = JSON.parse(i18n.trl(player.langCode, "reelLore1", i18n.get("reel", player.langCode), i18n.get(reelQualityArray[quality], player.langCode), ReelConfig.maxLevel, reelDataJson.nextLevelProbability + "%", reelDataJson.equipProbability + "%", lvl));
        }
        for (let key in reelDataJson) {
            if (key.indexOf("Buff") != -1) {
                loreArray.push(i18n.get(key, player.langCode));
                reelDataJson[key].forEach(buffData => {
                    loreArray.push(i18n.trl(player.langCode, "reelEffect", `${buffData.buffName} ${buffData.buffLevel} ${i18n.get("level", player.langCode)}`));
                });
            }
        }
        Item.setLore(loreArray);
        return Item;
    },
    /**
     * 设置宝石物品Lore
     * @param {Item} item 物品对象
     * @param {String} gemName 宝石名称
     * @param {Integer} quality 宝石品质
     * @param {player} player 玩家对象
     * @returns 设置好的物品对象
     */
    setGemLore: function (item, gemName, quality, player) {
        let gemDescribe = GemConfig[gemName].describe;
        let loreArray = JSON.parse(i18n.trl(player.langCode, "gemLore", i18n.get(gemName, player.langCode), i18n.get(gemQualityArray[quality], player.langCode), GemConfig[gemName].successProbability[0] + "%"));
        if (gemDescribe.indexOf("\n") != -1) {
            let cutting = gemDescribe.split("\n");
            cutting.forEach(describe => {
                loreArray.push(describe);
            });
        } else {
            loreArray.push(gemDescribe)
        }
        item.setLore(loreArray);
        return item;
    },
    /**
     * 设置物品的Lore内容.
     * @param {Item} item 物品对象
     * @param {Player} player 玩家对象
     * @returns 设置好的物品对象
     */
    setItemLore: function (item, player) {
        let loreArray = queryData.getNotIntensifyLore(item.lore, player);
        let secondData = queryData.getItemIntensifyData(item);
        if (secondData.boolean) {
            if (secondData.type == "otherItems") {
                if (secondData.reel != undefined) {
                    let reelDataJson = queryData.getReelLevelToData(parseInt(secondData.reel.lvl));
                    if (!reelDataJson) {
                        return item;
                    } else {
                        let reelName = `${secondData.reel.position}Buff`;
                        let reelLore = JSON.parse(i18n.trl(player.langCode, "itemReelLore", i18n.get(reelName, player.langCode), secondData.reel.lvl));
                        let reelData = reelDataJson[reelName];
                        if (reelData != undefined) {
                            reelData.forEach(current => {
                                reelLore.push(`   §6${current.buffName} +${current.buffLevel}`);
                            });
                            loreArray.push.apply(loreArray, reelLore);
                        } else {
                            qingYi.setPlaySound(player, 2);
                        }
                    }
                }
                if (secondData.gem != undefined) {
                    let gemLore = [];
                    let slotPosition = 1;
                    gemLore.push(i18n.get("itemGemMsgLore", player.langCode));
                    secondData.gem.forEach(gemNbtData => {
                        let currentLore = []
                        if (gemNbtData.gemName == "vampireGem" || gemNbtData.gemName == "powerGem" || gemNbtData.gemName == "explosiveGem" || gemNbtData.gemName == "experienceGem") {
                            let gemCDTime = GemConfig[gemNbtData.gemName].CDTime[parseInt(gemNbtData.lvl) - 1];
                            let gemTriggerProbability = GemConfig[gemNbtData.gemName].triggerProbability[parseInt(gemNbtData.lvl) - 1];
                            currentLore = JSON.parse(i18n.trl(player.langCode, "itemGemLore", i18n.get(gemNbtData.gemName, player.langCode), gemNbtData.lvl, i18n.trl(player.langCode, gemNbtData.gemName + "Effect", GemConfig[gemNbtData.gemName].relatedData[parseInt(gemNbtData.lvl) - 1]), slotPosition, gemCDTime, gemTriggerProbability));
                        } else {
                            currentLore = JSON.parse(i18n.trl(player.langCode, "itemGemLore1", i18n.get(gemNbtData.gemName, player.langCode), gemNbtData.lvl, i18n.trl(player.langCode, gemNbtData.gemName + "Effect", GemConfig[gemNbtData.gemName].relatedData[parseInt(gemNbtData.lvl) - 1]), slotPosition));
                        }
                        gemLore.push.apply(gemLore, currentLore);
                        slotPosition += 1;
                    });
                    loreArray.push.apply(loreArray, gemLore);
                }
                let aa = JSON.parse(i18n.trl(player.langCode, "forgingInformation", player.realName, system.getTimeStr()))
                loreArray.push.apply(loreArray, aa);
                item.setLore(loreArray);
            }
        }
        return item;
    },
    /**
     * 设置转移宝石的Lore.
     * @param {Player} player 玩家对象
     * @param {Item} item 物品对象
     * @returns 设置好的物品对象
     */
    setTransferGemLore: function (player, item) {
        let itemNbtTransferGem = item.getNbt().getTag("tag").getData("transferGem").toObject();
        let lore;
        if (item.getNbt().getTag("tag").getData('transferGemType') == "longRange") {
            lore = JSON.parse(i18n.trl(player.langCode, "transferGemLore", i18n.get(item.getNbt().getTag("tag").getData('transferGemType'), player.langCode)));
        } else {
            lore = JSON.parse(i18n.trl(player.langCode, "transferGemLore", i18n.get(`${item.getNbt().getTag("tag").getData('transferGemType')}Buff`), player.langCode));
        }

        if (itemNbtTransferGem.gem != undefined) {
            lore.push(i18n.get("itemGemMsgLore", player.langCode));
            for (let key in itemNbtTransferGem.gem) {
                lore.push(`${i18n.get(key, player.langCode)} : ${itemNbtTransferGem.gem[key]}`);
            }
        }
        if (itemNbtTransferGem.reel != undefined) {
            lore.push(i18n.get("itemReelMsgLore", player.langCode));
            for (let key in itemNbtTransferGem.reel) {
                lore.push(`${i18n.get(key + "Buff", player.langCode)} : ${itemNbtTransferGem.reel[key]}`);
            }
        }
        item.setLore(lore);
        return item;
    },
    /**
     * 设置神器石碎片的Lore数据.
     * @param {Player} player 玩家对象
     * @param {Item} item 神器石碎片物品对象
     * @returns 设置好的物品对象
     */
    setartifactFragmentsLore: function (player, item) {
        let itemNbtTransferGem = item.getNbt().getTag("tag").getData("addon").toObject();
        let lore;
        let fragmentsData = queryData.getArtifactDebrisData(itemNbtTransferGem.fragmentstype).artifactData;
        lore = JSON.parse(i18n.trl(player.langCode, "artifactFragmentsLore", itemNbtTransferGem.fragmentstype, fragmentsData.debrisNumber, fragmentsData.successProbability));
        fragmentsData.attribute.forEach(data => {
            lore.push(`${data.CurseName} ${data.CurseLvl} ${i18n.get("level", player.langCode)}`);
        });
        item.setLore(lore);
        return item;
    },
    /**
     * 设置神器石的Lore数据.
     * @param {Player} player 玩家对象
     * @param {Item} item 神器石物品对象
     * @returns 设置好的物品对象
     */
    setArtifactStoneLore: function (player, item) {
        let itemNbtTransferGem = item.getNbt().getTag("tag").getData("addon").toObject();
        let lore;
        let fragmentsData = queryData.getArtifactData(itemNbtTransferGem.fragmentstype).artifactData;
        lore = JSON.parse(i18n.get("artifactStoneLore", player.langCode));
        fragmentsData.attribute.forEach(data => {
            lore.push(`${data.CurseName} ${data.CurseLvl} ${i18n.get("level", player.langCode)}`);
        });
        item.setLore(lore);
        return item;
    }
}

/**
 * 生成相关物品.
 */
const generate = {
    /**
     * 生成一个宝石.
     * @param {String} gemName 宝石名称
     * @param {Player} player 玩家对象
     * @param {Integer} amount 宝石数量
     * @param {Integer} quality 宝石品质
     * @returns 生成好的物品对象
     */
    setGemItem: function (gemName, player, amount, quality) {
        let item = mc.newItem(ConfigGemStong, 1);
        let nbt1 = new NbtCompound({
            "Damage": new NbtInt(0),
            "RepairCost": new NbtInt(1),
            "display": new NbtCompound({
                "Name": new NbtString(i18n.get(gemName, player.langCode))
            }),
            "ench": new NbtList([]),
            "addon": new NbtCompound({
                "type": new NbtString("gem"),
                "gemtype": new NbtString(gemName),
                "quality": new NbtInt(quality),
                "lvl": new NbtInt(1)
            })
        })
        let nbt = item.getNbt();
        nbt.setTag("tag", nbt1);
        nbt.setByte("Count", amount);
        let newItem = mc.newItem(nbt);

        return loreSet.setGemLore(newItem, gemName, quality, player);
    },
    /**
     * 生成一个卷轴.
     * @param {Integer} lvl 卷轴等级
     * @param {Player} player 玩家对象
     * @param {Integer} amount 数量
     * @param {Integer} quality 卷轴类型
     * @returns 生成好的卷轴物品对象
     */
    setReelItem: function (lvl, player, amount, quality) {
        let item = mc.newItem(ConfigReelItem, 1);
        let nbt1 = new NbtCompound({
            "Damage": new NbtInt(0),
            "RepairCost": new NbtInt(1),
            "display": new NbtCompound({
                "Name": new NbtString(i18n.get("reel", player.langCode))
            }),
            "ench": new NbtList([]),
            "addon": new NbtCompound({
                "type": new NbtString("reel"),
                "reeltype": new NbtInt(quality),
                "lvl": new NbtInt(lvl)
            })
        })
        let nbt = item.getNbt();
        nbt.setTag("tag", nbt1);
        nbt.setByte("Count", amount);
        let newItem = mc.newItem(nbt);
        return loreSet.setReelLore(newItem, player, lvl, quality);
    },
    /**
     * 生成一个神器碎片.
     * @param {Player} player 玩家对象
     * @param {String} name 碎片内部及显示名称
     * @param {Integer} amount 生成数量
     * @returns 生成好的神器碎片对象
     */
    setFragments: function (player, name, amount) {
        if (queryData.getArtifactDebrisData(name).artifactState) {
            let item = mc.newItem(ConfigGodStongDebris, 1);
            let nbt1 = new NbtCompound({
                "Damage": new NbtInt(0),
                "RepairCost": new NbtInt(1),
                "display": new NbtCompound({
                    "Name": new NbtString(name)
                }),
                "ench": new NbtList([]),
                "addon": new NbtCompound({
                    "type": new NbtString("fragments"),
                    "fragmentstype": new NbtString(name),
                })
            })
            let nbt = item.getNbt();
            nbt.setTag("tag", nbt1);
            nbt.setByte("Count", amount);
            let newItem = mc.newItem(nbt);
            return loreSet.setartifactFragmentsLore(player, newItem);
        } else {
            return false;
        }
    },
    /**
     * 生成一个神器石.
     * @param {Player} player 玩家对象
     * @param {String} name 神器石名称
     * @param {Integer} amount 生成数量
     * @returns 生成好的神器石对象
     */
    setArtifactStone: function (player, name, amount) {
        let item = mc.newItem(ConfigGodStong, 1);
        let nbt1 = new NbtCompound({
            "Damage": new NbtInt(0),
            "RepairCost": new NbtInt(1),
            "display": new NbtCompound({
                "Name": new NbtString(name)
            }),
            "ench": new NbtList([]),
            "addon": new NbtCompound({
                "type": new NbtString("artifact"),
                "fragmentstype": new NbtString(name),
            })
        })
        let nbt = item.getNbt();
        nbt.setTag("tag", nbt1);
        nbt.setByte("Count", amount);
        let newItem = mc.newItem(nbt);
        return loreSet.setArtifactStoneLore(player, newItem);
    }
}

/**
 * 查询相关数据.
 */
const queryData = {
    /**
     * 获取掉落宝石的所有实体.
     * @returns 掉落宝石的所有实体数组.
     */
    getGemAllEntity: function () {
        let getGemAllEntityArray = [];
        for (let gemName in GemConfig) {
            getGemAllEntityArray.push.apply(getGemAllEntityArray, GemConfig[gemName].DropEntityList);
            getGemAllEntityArray = Array.from(new Set(getGemAllEntityArray));
        }
        return getGemAllEntityArray;
    },
    /**
     * 根据实体标准类型名查询宝石列表.
     * @param {String} entityType 实体标准类型名。
     * @returns 这个实体能掉落的宝石列表.
     */
    getGemNameArray: function (entityType) {
        let gemEntityHitArray = [];
        let gemEntityJson = {
            "vampireGem": GemConfig.vampireGem.DropEntityList,
            "powerGem": GemConfig.powerGem.DropEntityList,
            "durableGem": GemConfig.durableGem.DropEntityList,
            "explosiveGem": GemConfig.explosiveGem.DropEntityList,
            "experienceGem": GemConfig.experienceGem.DropEntityList,
            "transferGem": GemConfig.transferGem.DropEntityList
        };
        for (let gemName in gemEntityJson) {
            let currentGem = gemEntityJson[gemName];
            if (currentGem.includes(entityType)) {
                if (!gemEntityHitArray.includes(gemName)) {
                    gemEntityHitArray.push(gemName);
                }
            }
        }
        return gemEntityHitArray;
    },
    /**
     * 获取掉落卷轴的方块列表.
     * @returns 掉落卷轴的方块数组.
     */
    getReelAllBlock: function () {
        let blockJson = ReelConfig.blockList;
        let blockList = [];
        for (let name in blockJson) {
            blockList.push(name)
        }
        return blockList;
    },
    /**
     * 根据传来的卷轴等级查询卷轴配置文件.
     * @param {Integer} lvl 卷轴等级
     * @returns 查询到的卷轴配置文件.
     */
    getReelLevelToData: function (lvl) {
        let reelDataArray = ReelConfig.DataEachLevel;
        for (let i in reelDataArray) {
            if (lvl == reelDataArray[i].level) {
                return reelDataArray[i];
            }
        }
        return false;
    },
    /**
     * 根据传来的坐标获取容器对象里面的所有物品.
     * @param {Pos} pos 坐标对象
     * @returns 此坐标容器里的物品列表
     */
    getContainerAllItem: function (pos) {
        let block = mc.getBlock(pos);
        let container = block.getContainer();
        return container.getAllItems();
    },
    /**
     * 查询物品是否是强化类物品.
     * @param {Item} item 物品对象
     * @returns 物品的相关信息Json
     */
    getItemIntensifyData: function (item) {
        let initialData = { "boolean": false, "itemType": item.type };
        let handItemNbtTag = item.getNbt().getTag("tag");
        if (handItemNbtTag != undefined) {
            let handItemNbtTagAddon = handItemNbtTag.getTag("addon");
            if (handItemNbtTagAddon != undefined) {
                if (item.type == ConfigGemStong) {
                    initialData = {
                        "boolean": true,
                        "type": handItemNbtTagAddon.getTag("type").toString(),
                        "gemtype": handItemNbtTagAddon.getTag("gemtype").toString(),
                        "lvl": handItemNbtTagAddon.getTag("lvl").toString(),
                        "quality": handItemNbtTagAddon.getTag("quality").toString(),
                        "itemType": item.type
                    };
                } else if (item.type == ConfigReelItem) {
                    initialData = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "reeltype": handItemNbtTagAddon.getTag("reeltype").toString(), "lvl": handItemNbtTagAddon.getTag("lvl").toString(), "itemType": item.type };
                } else if (item.type == ConfigGodStongDebris) {
                    initialData = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "name": handItemNbtTagAddon.getTag("fragmentstype"), "itemType": item.type };
                } else if (item.type == ConfigGodStong) {
                    initialData = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "name": handItemNbtTagAddon.getTag("fragmentstype"), "itemType": item.type };
                }
            } else {
                let handItemNbtTagIntensify = handItemNbtTag.getTag("intensify");
                if (handItemNbtTagIntensify != undefined) {
                    initialData = { "boolean": true, "type": "otherItems", "itemType": item.type };
                    let reelNbtData = handItemNbtTagIntensify.getTag("reel");
                    if (reelNbtData != undefined) {
                        initialData.reel = {};
                        initialData.reel.position = reelNbtData.getKeys()[0];
                        initialData.reel.lvl = reelNbtData.getData(reelNbtData.getKeys()[0]);
                    }
                    let gemNbtData = handItemNbtTagIntensify.getTag("gem");
                    if (gemNbtData != undefined) {
                        initialData.gem = [];
                        let allGemName = gemNbtData.getKeys();
                        for (let i in allGemName) {
                            initialData.gem[i] = {};
                            initialData.gem[i].gemName = allGemName[i];
                            initialData.gem[i].lvl = gemNbtData.getData(allGemName[i]);
                        }
                    }
                }
            }
        }
        return initialData;
    },
    /**
     * 查询所有可用强化的物品.
     * @returns 所有可用于强化的物品
     */
    getAllAvailableItems: function () {
        let returnArray = [];
        for (let key in availableItemJson) {
            returnArray.push.apply(returnArray, availableItemJson[key]);
        }
        returnArray = Array.from(new Set(returnArray));
        return returnArray;
    },
    /**
     * 查询所有护甲类装备.
     * @returns 所有护甲物品列表
     */
    getAllArmorItems: function () {
        let returnArray = [];
        for (let key in availableItemJson) {
            if (key != "swordDataArray" && key != "toolDataArray") {
                returnArray.push.apply(returnArray, availableItemJson[key]);
            }
        }
        returnArray = Array.from(new Set(returnArray));
        return returnArray;
    },
    /**
     * 查询卷轴可用的物品列表.
     * @returns 卷轴可用的物品列表
     */
    getReelAvailableItems: function () {
        let returnData = []
        returnData.push.apply(returnData, swordDataArray);
        returnData.push.apply(returnData, helmetDataArray);
        returnData.push.apply(returnData, chestplateDataArray);
        returnData.push.apply(returnData, leggingsDataArray);
        returnData.push.apply(returnData, bootsDataArray);
        returnData.push.apply(returnData, toolDataArray);
        returnData = Array.from(new Set(returnData));
        return returnData;
    },
    /**
     * 查询此宝石id能用的物品列表.
     * @param {String} gemName 宝石id
     * @returns 此宝石可用的物品列表
     */
    getGemNameAvailableItems: function (gemName) {
        switch (gemName) {
            case "vampireGem":
                return swordDataArray;
            case "powerGem":
                return swordDataArray;
            case "durableGem":
                return this.getAllAvailableItems();
            case "explosiveGem":
                return longRangeDataArray;
            case "experienceGem":
                return this.getAllArmorItems();
        }
    },
    /**
     * 查询此物品属于哪个类型.
     * @param {Item} item 物品对象
     * @returns 查询到的结果
     */
    getItemAttribute: function (item) {
        if (swordDataArray.includes(item.type)) {
            return "sword";
        } else if (helmetDataArray.includes(item.type)) {
            return "helmet";
        } else if (chestplateDataArray.includes(item.type)) {
            return "chestplate";
        } else if (leggingsDataArray.includes(item.type)) {
            return "leggings";
        } else if (bootsDataArray.includes(item.type)) {
            return "boots";
        } else if (toolDataArray.includes(item.type)) {
            return "tool";
        } else if (longRangeDataArray.includes(item.type)) {
            return "longRange";
        }
    },
    /**
     * 根据宝石名称查询对象的宝石等级.
     * @param {Strin} gemName 宝石名称
     * @param {Array} arrayObj 物品的宝石数据
     * @returns 等级数据
     */
    getItemGemLvL: function (gemName, arrayObj) {
        for (let i in arrayObj) {
            let gemData = arrayObj[i]
            if (gemData.gemName == gemName) {
                return gemData.lvl;
            }
        }
        return 0;
    },
    /**
     * 获取物品给玩家的buff列表
     * @param {Item} item 物品对象
     * @param {Player} player 玩家对象
     * @returns 数组
     */
    getItemReelBuff: function (item) {
        let buffArray = [];
        let itemData = queryData.getItemIntensifyData(item);
        if (itemData.boolean && itemData.type == "otherItems" && itemData.reel != undefined) {
            let itemConfig = this.getReelLevelToData(itemData.reel.lvl);
            let buffArrayConfig = itemConfig[`${itemData.reel.position}Buff`];
            buffArrayConfig.forEach(buffData => {
                let buffId = buffData.buffId;
                let buffLevel = buffData.buffLevel;
                buffArray.push({ "buffId": buffId, "buffLevel": buffLevel });
            });
        }
        return buffArray;
    },
    /**
     * 获取玩家当前所有卷轴的buff数据.
     * @param {Player} player 玩家对象
     * @returns buff数组
     */
    getPlayerReelBuff: function (player) {
        let allBuffArray = [];
        let playerArmor = player.getArmor();
        let playerHandItem = player.getHand();
        let playerInventoryItem = playerArmor.getAllItems();
        let playerHandItemData = this.getItemIntensifyData(playerHandItem);
        if (playerHandItemData.boolean && playerHandItemData.type == "otherItems") {
            if (playerHandItemData.reel != undefined) {
                if (playerHandItemData.reel.position == "sword" || playerHandItemData.reel.position == "tool") {
                    playerInventoryItem.push(playerHandItem);
                }
            }
        }
        playerInventoryItem.forEach(item => {
            if (!item.isNull()) {
                let itemData = this.getItemIntensifyData(item);
                if (itemData.boolean && itemData.type == "otherItems") {
                    let buffArray = this.getItemReelBuff(item);
                    allBuffArray.push.apply(allBuffArray, buffArray);
                }
            }
        });
        return allBuffArray;
    },
    /**
     * 根据uid获取实体对象.
     * @param {String} uId 唯一标识符
     * @returns 实体对象
     */
    getEntity: function (uId) {
        let allEntityArray = mc.getAllEntities();
        for (let i in allEntityArray) {
            let entity = allEntityArray[i];
            if (entity.uniqueId == uId) {
                return entity;
            }
        }
        return undefined;
    },
    /**
     * 获取物品的宝石数据.
     * @param {Item} item 物品对象
     * @returns Json对象
     */
    getItemGemData: function (item) {
        let itemGemData = { "gemState": false };
        let itemData = this.getItemIntensifyData(item);
        if (itemData.boolean && itemData.type == "otherItems") {
            if (itemData.gem != undefined) {
                itemData.gem.forEach(gemData => {
                    itemGemData.gemState = true;
                    itemGemData[gemData.gemName] = gemData.lvl;
                });
            }
        }
        return itemGemData;
    },
    /**
     * 根据传来的名称获取神器碎片的相关数据
     * @param {String} name 碎片名称
     * @returns Json对象
     */
    getArtifactDebrisData: function (name) {
        let itemGemData = { "artifactState": false };
        for (let key in ArtifactConfig) {
            let currentItem = ArtifactConfig[key];
            if (currentItem.debrisName == name) {
                itemGemData = { "artifactState": true, "artifactData": currentItem, "artifactName": key }
            }
        }
        return itemGemData;
    },
    /**
     * 根据传来的名称获取神器石的相关数据
     * @param {String} name 神器石名称
     * @returns Json对象
     */
    getArtifactData: function (name) {
        let itemGemData = { "artifactState": false };
        for (let key in ArtifactConfig) {
            if (key == name) {
                let currentItem = ArtifactConfig[key];
                itemGemData = { "artifactState": true, "artifactData": currentItem }
            }
        }
        return itemGemData;
    },
    /**
     * 查询物品是否有精准附魔.
     * @param {Item} item 物品对象
     * @returns 查询结果
     */
    getItemPreciseEnch: function (item) {
        let result = false;
        if (!item.isNull()) {
            let tagData = item.getNbt().toObject().tag;
            if (tagData != undefined) {
                let EnchantmentData = tagData.ench;
                if (EnchantmentData != undefined) {
                    for (let i in EnchantmentData) {
                        let data = EnchantmentData[i];
                        if (data != undefined && data.id == 16) {
                            result = true;
                            return result;
                        }
                    }
                }
            }
        }
        return result;
    },
    /**
     * 获取没有强化内容的Lore.
     * @param {Array} Lore 物品Lore数组
     * @param {Player} player 玩家对象
     * @returns 处理后的Lore数组
     */
    getNotIntensifyLore: function (Lore, player) {
        let a = 0, b = 0, StartPosition;
        let reeLore = i18n.get("itemReelMsgLore", player.langCode);
        let gemLore = i18n.get("itemGemMsgLore", player.langCode);
        if (Lore.includes(reeLore)) {
            StartPosition = reeLore;
        } else if (Lore.includes(gemLore)) {
            StartPosition = gemLore;
        }
        if (StartPosition != undefined) {
            let termination = i18n.get("itemForgeMsgLore", player.langCode);
            for (let i = 0; i < Lore.length; i++) {
                let current = Lore[i];
                if (StartPosition == current) {
                    a = i;
                }
                if (current == termination) {
                    b = i + 5;
                }
            }
            if (b != 0) {
                Lore.splice(a, b - a);
            }
        }
        return Lore;
    }
}

/**
 * 个人通用代码段
 */
const qingYi = {
    /**
     * 获取随机数（支持小数）
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @param {Integer} decimal 小数位数
     * @returns 随机数
     */
    getRandomNum: function (min = 0, max = 100, decimal = 0) {
        if (ConfigJson.randomNumber.DecimalsSupported) {
            decimal = ConfigJson.randomNumber.Decimals;
        }
        let min_z = Math.trunc(min);
        let max_z = Math.trunc(max);
        let min_x = isNaN(this.getDecimalNum(min)) ? 0 : this.getDecimalNum(min);
        let max_x = isNaN(this.getDecimalNum(max)) ? 0 : this.getDecimalNum(max);
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
    },
    /**
     * 获取数值的小数部分
     * @param {Integer} data 
     * @returns 范围内的小数
     */
    getDecimalNum: function (data) {
        return Number(data.toString().split('.')[1]);
    },
    /**
    * 获取随机整数
    * @param {Integer} min 最小值
    * @param {Integer} max 最大值
    * @returns 一个范围内的数值
    */
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    /**
    * 校验方块是否破坏成功.
    * @param {Block} block 方块对象
    * @returns 布尔值，方块是否破坏成功.
    */
    getCheckBlock: function (block) {
        let boole = false;
        let blockObtain = mc.getBlock(block.pos);
        if (blockObtain != undefined && blockObtain.name != "") {
            if (block.type != blockObtain.type) {
                boole = true;
            }
        }
        return boole
    },
    /**
    * 给玩家播放指定音效.
    * @param {Player} player 玩家对象
    * @param {int} Sound 音乐名称位置
    */
    setPlaySound: function (player, Sound) {
        mc.runcmdEx(`playsound ${soundList[Sound]} "${player.realName}"`);
    },
    /**
     * 玩家切换手持物品监听设置.
     */
    playerSwitchHandheld: function () {
        setInterval(() => {
            let onlinePlayrArray = mc.getOnlinePlayers();
            onlinePlayrArray.forEach(player => {
                if (!player.isSimulatedPlayer()) {
                    let playerHand = player.getHand();
                    let itemUid = 0;
                    let allAvailableItem = queryData.getAllAvailableItems();
                    if (!playerHand.isNull() && allAvailableItem.includes(playerHand.type)) {
                        let itemNbt = playerHand.getNbt();
                        let itemTagNbt = itemNbt.getTag("tag");
                        if (itemTagNbt == undefined) {
                            itemNbt.setTag("tag", new NbtCompound({}));
                            itemTagNbt = itemNbt.getTag("tag");
                        }
                        let itemUidTag = itemTagNbt.getTag("uid");
                        if (itemUidTag == undefined) {
                            itemNbt.getTag("tag").setString("uid", Date.now().toString(36));
                            playerHand.setNbt(itemNbt);
                        }
                        if (!playerHand.isNull()) {
                            itemUid = playerHand.getNbt().getTag("tag").getData("uid");
                        }
                    }

                    if (playerHandItemEvent[player.xuid] == undefined) {

                        if (!playerHand.isNull()) {
                            playerHandItemEvent[player.xuid] = {
                                "item": playerHand,
                                "itemUid": itemUid
                            }
                            playerSwitchHandheldEvent(player, undefined, playerHand);
                        }
                    } else {

                        if (playerHandItemEvent[player.xuid].itemUid != itemUid) {
                            playerSwitchHandheldEvent(player, playerHandItemEvent[player.xuid].item, playerHand);
                            playerHandItemEvent[player.xuid] = {
                                "item": playerHand,
                                "itemUid": itemUid
                            };
                        }
                    }
                }
            });
        }, 100 * 2);
    }
}

/**
 * JSON数据差异对比
 */
const arrayContrast = {
    /**
     * 深拷贝
     * @param {*} source 
     * @returns 
     */
    deepClone: function (source) {
        if (typeof source === 'function' || typeof source === 'undefined') {
            return
        }
        if (typeof source === 'string') {
            return source
        }
        if (typeof source === 'number') {
            return source * 1
        }
        if (typeof source === 'boolean') {
            return new Boolean(source)
        }
        if (typeof source !== 'object') return;

        if (source instanceof RegExp) {
            return new RegExp(source)
        }
        if (source instanceof Date) {
            return new Date(source)
        }
        const target = (source instanceof Array) ? [] : {};
        for (let key in source) {
            if (typeof source[key] === 'object') {
                target[key] = this.deepClone(source[key])
            } else {
                target[key] = source[key];
            }
        }
        return target

    },
    /**
     * 获取数组之间的差异.
     * @param {Array} newObj 新的数组
     * @param {Array} oldObj 旧的数组
     * @param {String} brigedProp key
     * @returns 差异数组
     */
    diffArray: function (newObj, oldObj, brigedProp) {
        if (typeof newObj !== 'object' || typeof oldObj !== 'object') return
        const newSource = this.deepClone(newObj);
        const oldSouce = this.deepClone(oldObj);
        const addElem = [];
        const delElem = [];
        const newSourceIndex = [];
        const oldSourceIndex = [];
        oldSouce.forEach((elem, _oldIndex) => {
            oldSourceIndex.push(elem[brigedProp])

        });
        newSource.forEach((item, _newIndex) => {
            newSourceIndex.push(item[brigedProp])
        });

        newSourceIndex.forEach(item => {
            if (!oldSourceIndex.includes(item)) {
                addElem.push(newSource.find(itm => itm[brigedProp] === item))
            }
        });
        oldSourceIndex.forEach(item => {
            if (!newSourceIndex.includes(item)) {
                delElem.push(oldSouce.find(itm => itm[brigedProp] === item))
            }
        });
        return {
            addElem,
            delElem
        }
    }
    //此部分代码来源于：https://blog.csdn.net/obj_null/article/details/121472268
}

/**
 * 玩家输入指令事件监听.
 * 异常及调试使用.
 */
mc.listen("onPlayerCmd", (player, cmd) => {
    if (player.isOP() && cmd == 'cc') {
        let LLVision = ll.versionString();
        let item = player.getHand();
        /*
        let en = mc.spawnMob("fengyun:armor_stand_a",player.pos);
        let newEntityNbt = en.getNbt();
        newEntityNbt.setString("CustomName", "测试")
        newEntityNbt.setFloat("CustomNameVisible", 1);
        en.setNbt(newEntityNbt);
        */
        let DebugMsg;
        if (item != undefined && item.name != "") {
            let nbt = item.getNbt();
            DebugMsg = `LL版本：${LLVision}\n插件版本：${pluginsVersion}\n手持物Nbt：\n${nbt.toString()}`;
            //log(nbt.toString())
        } else {
            DebugMsg = `LL版本：${LLVision}\n插件版本：${pluginsVersion}\n手持物Nbt：无}`;
        }
        player.tell(`${Format.Bold}${Format.Green}---information---\n${Format.Red}${DebugMsg}\n${Format.Green}请将以上内容截图发送给开发者!`);
        return false;
    }
    if (player.isOP() && cmd == 'incc') {
        if (opState[player.xuid]) {
            opState[player.xuid] = false;
            player.tell('你已经退出调试模式，成功率已调整');
        } else {
            opState[player.xuid] = true;
            player.tell('你已经进入调试模式，成功率已调整为100%');
        }
        return false;
    }
    if (player.isOP() && cmd == "cr") {
        let item = player.getHand();
        item.setDamage(0);
        return false;
    }
    if (cmd == "uplore") {
        let item = player.getHand();
        loreSet.setItemLore(item, player);
        player.refreshItems();
        return false;
    }
    if (cmd == "spc") {//解决经验宝石和https://www.minebbs.com/resources/spc.5245/冲突.
        playerTpSpc[player.xuid] = true;
        setTimeout(() => {
            playerTpSpc[player.xuid] = false;
        }, 1000);
    }
});

/**
 * 共享函数
 */
const shareFunction = {
    getPlayerCD: function (player) {
        return playerGemCountDown[player.xuid];
    },
    getReelItem: function (player, lvl) {
        let reelItem = generate.setReelItem(lvl, player, 1, 0);
        return reelItem;
    },
    getGemItem: function (player, gemName, quantity) {
        let gemItem = generate.setGemItem(gemName, player, parseInt(quantity), 0);
        return gemItem;
    },
    getGemName: function () {
        return ["vampiregem", "powergem", "durablegem", "explosiveGem", "experienceGem", "transferGem"];
    },
    getArtifactStoneItem: function (player, name, amount) {
        return generate.setArtifactStone(player, name, amount);
    },
    getFragmentsItem: function (player, name, amount) {
        return generate.setFragments(player, name, amount);
    }
}

function versionUpdateModifyProfile() {
    let Config = false;
    let ArtifactUpConfig = false;
    let ReelUpConfig = false;
    let GemUpConfig = false;
    //135版本更新
    if (ConfigJson.removeOldItems == undefined) {
        ConfigJson.removeOldItems = false;
        Config = true;
    }
    //136版本更新
    if (GemConfig.explosiveGem == undefined) {
        GemConfig.explosiveGem = { "maxLevel": 4, "droppingProbability": 0.15, "describe": "使用弓箭攻击时有几率触发爆炸！", "triggerProbability": [10, 20, 60, 80], "CDTime": [120, 80, 40, 10], "relatedData": [1, 2, 3, 4], "successProbability": [10, 5, 1, 0.1], "DropEntityList": ["minecraft:creeper"] };
        File.writeTo(pluginPath + "data/gemDataConfig.json", JSON.stringify(GemConfig, null, "\t"));
    }
    //137版本更新
    if (GemConfig.experienceGem == undefined) {
        GemConfig.experienceGem = { "maxLevel": 5, "droppingProbability": 0.15, "describe": "获得额外的经验", "triggerProbability": [10, 20, 60, 80, 100], "CDTime": [10, 5, 3, 2, 1], "relatedData": [10, 20, 30, 40, 50], "successProbability": [10, 5, 2.5, 1, 0.1], "DropEntityList": ["minecraft:witch"] };
        File.writeTo(pluginPath + "data/gemDataConfig.json", JSON.stringify(GemConfig, null, "\t"));
    }
    //140版本更新
    if (GemConfig.transferGem == undefined) {
        GemConfig.transferGem = { "maxLevel": 1, "droppingProbability": 0, "describe": "迁移数据!", "successProbability": [100], "relatedData": [1], "DropEntityList": [] };
        File.writeTo(pluginPath + "data/gemDataConfig.json", JSON.stringify(GemConfig, null, "\t"));
    }
    //149版本更新
    if (ConfigJson.accurateShielding == undefined) {
        ConfigJson.accurateShielding = true;
        Config = true;
    }
    //151版本更新
    if (ConfigJson.relatedItems == undefined) {
        ConfigJson.relatedItems = {
            "reel": "minecraft:field_masoned_banner_pattern",
            "gemStone": "minecraft:quartz",
            "godStoneDebris": "minecraft:disc_fragment_5",
            "godStone": "minecraft:music_disc_11"
        }
        Config = true;
    }
    //154版本更新
    if (ConfigJson.version == undefined) {
        ConfigJson.version = "0.0.1";
        for (let key in ArtifactConfig) {
            if (ArtifactConfig[key].composeFallback == undefined) {
                ArtifactConfig[key].composeFallback = 1000000;
            }
        }
        let reelData = ReelConfig.DataEachLevel;
        reelData.forEach(data => {
            if (data.toItemGuarantee == undefined) {
                data.toItemGuarantee = 200000;
                data.tonextLevelGuarantee = 200000;
            }
        });
        Config = true;
        ReelUpConfig = true;
        ArtifactUpConfig = true;
    }
    if (ConfigJson.version == "0.0.1") {
        ConfigJson.version = "0.0.2"
        if (File.exists(pluginPath + "data/player/lotteryFallback.json")) {
            File.writeTo(pluginPath + "data/player/lotteryFallback.json", JSON.stringify({}, null, "\t"));
        }
        for (let key in GemConfig) {
            if (GemConfig[key].Guarantee == undefined) {
                GemConfig[key].Guarantee = gemDataConfig[key].Guarantee;
            }
        }
        Config = true;
        GemUpConfig = true;
    }
    //157
    if (ConfigJson.version == "0.0.2") {
        ConfigJson.version = "0.0.3"
        let blockArray = ReelConfig.blockList
        let json = {};
        blockArray.forEach(type => {
            json[type] = ReelConfig.droppingProbability
        });
        ReelConfig.blockList = json;
        delete ReelConfig.droppingProbability;

        ReelUpConfig = true;
        Config = true;
    }
    if (Config) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigJson, null, "\t"));
    }
    if (ReelUpConfig) {
        File.writeTo(pluginPath + "data/reelDataConfig.json", JSON.stringify(ReelConfig, null, "\t"));
    }
    if (ArtifactUpConfig) {
        File.writeTo(pluginPath + "data/artifactStoneDataConfig.json", JSON.stringify(ArtifactConfig, null, "\t"));
    }
    if (GemUpConfig) {
        File.writeTo(pluginPath + "data/gemDataConfig.json", JSON.stringify(GemConfig, null, "\t"));
    }
}

//------监听事件注册
mc.listen("onMobDie", entityDieEvent);
mc.listen("onOpenContainer", openContainerEvent);
mc.listen("onServerStarted", serverStartedEvent);
mc.listen("onSetArmor", setArmorEvent);
mc.listen("onAttackEntity", attackEntityEvent);
mc.listen("onRespawn", respawnEvent);
mc.listen("onPreJoin", preJoinEvent);
mc.listen("onJoin", joinEvent);
mc.listen("onLeft", leftEvent)
mc.listen("onProjectileHitEntity", projectileHitEntityEvent);
mc.listen("onProjectileCreated", projectileCreatedEvent);
mc.listen("onProjectileHitBlock", projectileHitBlockEvent);
mc.listen("onDestroyBlock", playerDestroyBlockEvent);
mc.listen("onExperienceAdd", experienceAddEvent);
mc.listen("onMobHurt", mobHurtEvent);

//共享接口
ll.export(shareFunction.getPlayerCD, "intensify", "cd");
ll.export(shareFunction.getGemName, "intensify", "gemname");
ll.export(shareFunction.getGemItem, "intensify", "gem");
ll.export(shareFunction.getReelItem, "intensify", "reel");
ll.export(shareFunction.getFragmentsItem, "intensify", "fragments");
ll.export(shareFunction.getArtifactStoneItem, "intensify", "artifactStone");

/**
 * 监听使用情况.
 * "onMobDie"-实体死亡事件监听
 * "onOpenContainer"-玩家打开容器事件监听
 * "onServerStarted"-服务器启动完成监听
 * "onSetArmor"-玩家装备栏变化监听
 * "onAttackEntity"-玩家攻击实体监听
 * "onRespawn"-玩家复活监听
 * "onPreJoin"-玩家完全进入游戏监听
 * "onDestroyBlock"-玩家破坏方块完成监听
 * "onJoin"-玩家完全进入游戏监听
 * "onLeft"-玩家离开游戏监听
 * "onProjectileHitBlock"-弹射物命中方块监听
 * "onProjectileHitEntity"-弹射物命中实体监听
 * "onProjectileCreated"-弹射物创建监听
 * "onExperienceAdd"-玩家获得经验事件监听
 * "onMobHurt"-实体受伤事件监听
 * 
 * 版本相关
 * 134
 * --宝石--
 * 移除移速宝石.
 * 新增吸血宝石.
 * 部分宝石增加CD机制.
 * 可自定义部分宝石等级及数值.
 * --卷轴--
 * 卷轴全面改为给玩家buff.
 * 可自定义卷轴等级及效果.
 * 移除旧卷轴的全部功能.
 * 修改卷轴升级方式.
 * 修复手机版2个卷轴就能升级的bug.
 * --其他--
 * 随机数支持4位小数点.
 * 和低于1.3.4的插件物品不兼容.
 * 修改合成方式为摆放好后打开容器合成.
 * 增加api方便其他插件调用.
 * 135
 * 新增移除旧版强化装备插件的物品nbt开关.
 * 修复物品只有宝石数据时导致的报错.
 * 136
 * 修复打开其他容器报错.
 * 增加爆炸宝石，可用于弓.
 * 137
 * 修复昨天更新爆炸宝石时移除了的吸血宝石.
 * 修复宝石装备上物品时获取到的几率错误的问题.
 * 修复一个刷屏报错的bug.
 * 新增经验宝石.
 * 1，此宝石所有护甲可用。
 * 2，身穿多个装备包含有此宝石的时候数据将会叠加
 * 包括：触发概率增加，增加量增加，cd时间增加。
 * 138
 * 修复耐久宝石在护甲上无效的bug.
 * 修改部分内部描述.
 * 139
 * 删除部分log信息.
 * 修复对空格名字玩家的错误.
 * 140
 * 尝试修复玩家重生后buff设置的问题.
 * 新增转移宝石.
 * 141
 * 修复转移宝石对远程物品的显示错误.
 * 修复耐久宝石在工具上无效的问题.
 * 转移宝石支持自定义概率和掉落的生物.
 * 142
 * 修复卷轴升级时清除错误格子的问题.
 * 适配新Api，避免报错.
 * 143
 * 新增神器石和神器碎片，暂时只提供api生成.
 * 144
 * 给buff变更为使用LLSE的Api.
 * 爆炸增加爆炸源.
 * 145
 * 修复移除buff的错误.
 * 146
 * 修复buff对照表的错误（坑爹的gpt3.5）
 * 147
 * 修复神器石跳过同类型附魔的问题.
 * 148
 * 神器石、碎片支持指令获取.
 * 新增调试模式，进入后概率会变为100%。指令为/incc.
 * 149
 * 新增精准附魔的工具是否掉落卷轴开关.
 * 150
 * 设置物品耐久适配1.20.1.（耐久宝石）
 * 151
 * 尝试处理Lore不兼容其他插件的问题.
 * 修复玩家射箭后马上下线导致的报错.
 * 当配置文件buffID为""时将不会给buff.
 * 
 * 新增自定义卷轴宝石等物品类型的配置.
 * 提示：修改后旧的物品将会失效！
 * 此功能由： Allen13n 赞助推出.
 * 152
 * 修复拿有耐久宝石的护甲攻击生物导致的装备不可用.
 * 新增op指令/cr用来重置手持物耐久.
 * 153
 * 解决经验宝石和https://www.minebbs.com/resources/spc.5245/冲突.
 * 修复玩家射箭后马上下线导致的报错.
 * 154
 * 尝试给卷轴、神器石碎片、宝石加入保底功能.
 * 尝试移除卷轴宝石数量限制.
 * 155
 * 修复解除宝石放置数量限制后转移宝石导致的bug，转移宝石只能单个放置.
 * 156
 * 修复保底的两个错误.
 * 157
 * 卷轴掉落方块支持单独设置概率.
 * 卷轴升级成功后将会放置在投掷器最后一格，避免覆盖掉第一格的物品.如果最后一格有物品将会生成掉落物
 */