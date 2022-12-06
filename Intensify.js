//-----基础信息定义
const StrengthenItemsDefaultJson = { "weapon": ["minecraft:wooden_sword", "minecraft:stone_sword", "minecraft:iron_sword", "minecraft:golden_sword", "minecraft:diamond_sword", "minecraft:netherite_sword"], "armor": ["minecraft:leather_helmet", "minecraft:leather_chestplate", "minecraft:leather_leggings", "minecraft:leather_boots", "minecraft:chainmail_helmet", "minecraft:chainmail_chestplate", "minecraft:chainmail_leggings", "minecraft:chainmail_boots", "minecraft:iron_helmet", "minecraft:iron_chestplate", "minecraft:iron_leggings", "minecraft:iron_boots", "minecraft:golden_helmet", "minecraft:golden_chestplate", "minecraft:golden_leggings", "minecraft:golden_boots", "minecraft:diamond_helmet", "minecraft:diamond_chestplate", "minecraft:diamond_leggings", "minecraft:diamond_boots", "minecraft:netherite_helmet", "minecraft:netherite_chestplate", "minecraft:netherite_leggings", "minecraft:netherite_boots"] };
const itemGemTable = [
    {},
    { "gemName": "MovingGem", "gemExplain": "MovingGemExplain", "maxLvl": 2, "lvl": [0, 0.08, 0.13], "AvailableTypes": "armor" },
    { "gemName": "PowerGem", "gemExplain": "PowerGemExplain", "maxLvl": 2, "lvl": [0, 1, 2], "AvailableTypes": "weapon" },
    { "gemName": "DurableGem", "gemExplain": "DurableGemExplain", "maxLvl": 1, "lvl": [0, "∞"] }
]
const ComparisonTable = [{}, { "name": "Ⅰ", "Weapon": 1, "Armor": 1, "exp": 1, "probability": 1 }, { "name": "Ⅱ", "Weapon": 2, "Armor": 3, "exp": 2, "probability": 2 }, { "name": "Ⅲ", "Weapon": 3, "Armor": 5, "exp": 4, "probability": 4 }, { "name": "Ⅳ", "Weapon": 4, "Armor": 10, "exp": 6, "probability": 6 }, { "name": "∞", "Weapon": 5, "Armor": 20, "exp": 8, "probability": 8 }];
const SoundList = ["random.anvil_use", "random.anvil_break", "random.anvil_land"];
const pluginName = "Intensify";
const PluginsIntroduction = '强化你的装备!';
const pluginPath = "./plugins/Intensify/";
const PluginsVersion = [0, 2, 9];
const PluginsOtherInformation = { "插件作者": "清漪花开" };

//------插件信息注册
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation)

/**
 * 插件数据库加载及删除语言文件.
 * 读取各项配置文件.
 */
let db = new KVDatabase(pluginPath + "db")
if (File.exists(pluginPath + "language/language.json")) {
    File.delete(pluginPath + "language");
}
if (!File.exists(pluginPath + "data/EquipmentData.json")) {
    File.writeTo(pluginPath + "data/EquipmentData.json", JSON.stringify(StrengthenItemsDefaultJson, null, "\t"));
}
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify({
        "PSuccess": 10,
        "ScrollUpgrade": {
            "twoReelProbability": 40,
            "threeReelProbability": 30,
            "fourReelProbability": 20,
            "fiveReelProbability": 10
        },
        "ItemUpgrade": {
            "zeroItemUpgrade": 40,
            "oneItemUpgrade": 30,
            "twoItemUpgrade": 20,
            "threeItemUpgrade": 10,
            "fourItemUpgrade": 5
        },
        "BlockReelDropList": {
            "minecraft:stone": {
                "DropRange": 1,
                "MaximumRandomNumber": 1000
            }
        },
        "EntityGemDropList": {
            "minecraft:zombie": {
                "DropRange": 1,
                "MaximumRandomNumber": 1000
            }
        },
        "seckilltopvp": true,
        "seckilltopve": true,
        "durableGemsFall": false,
        "seckillWhiteList": [
            "minecraft:ender_dragon"
        ]
    }, null, "\t"));
}
let StrengthenItemsJson = JSON.parse(File.readFrom(pluginPath + "data/EquipmentData.json"));
let ConfigJson = JSON.parse(File.readFrom(pluginPath + "Config.json"));
let ConfigItemWeapon = StrengthenItemsJson.weapon;
let ConfigItemArmor = StrengthenItemsJson.armor;
let EntityseckillWhiteList = ConfigJson.seckillWhiteList;
let Coolingtime = true;
versionUpdateModifyProfile();

/**
 * 语言文件写入及加载.
 */
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
        "EquipmentWeapon": JSON.stringify(["§2-------==属性==-------", "§3{0} 阶武器", "§4额外伤害:+{1}", "§6技能:有{4}%几率直接击杀!", "-------锻造信息-------", "锻造玩家:{2}", "锻造时间:{3}"]),
        "EquipmentArmor": JSON.stringify(["§2-------==属性==-------", "§3{0} 阶护具", "§4生命上限:+{1}", "§2额外经验+{4}", "-------锻造信息-------", "锻造玩家:{2}", "锻造时间:{3}"]),
        "SkillTips1": "§6触发技能：一击必杀！",
        "gem1": JSON.stringify(["§1-------==宝石==-------", "§2{0}级{1}", "§6效果:{2}+{3}", "§3PS:此宝石最高等级为:{4}级"]),
        "MovingGem": "移速宝石",
        "PowerGem": "暴击宝石",
        "DurableGem": "耐久宝石",
        "MovingGemExplain": "移动速度",
        "PowerGemExplain": "额外伤害",
        "DurableGemExplain": "物品耐久",
        "TessellationTipsErr1": "§4镶嵌失败。宝石已消失！",
        "TessellationTipsErr2": "§4已达到最大等级，无法镶嵌！",
        "TessellationTipsErr3": "§4此宝石无法用于此物品！",
        "TessellationTipsErr4": "§4没找到强化信息，请先使用强化卷轴强化后再镶嵌宝石！",
        "gemLore1": JSON.stringify(["§1-------==宝石==-------", "§2移速宝石", "§3可镶嵌在鞋子上", "§7成功几率：10%", "§6效果:增加移速"]),
        "gemLore2": JSON.stringify(["§1-------==宝石==-------", "§4暴击宝石", "§3可镶嵌在武器上", "§7成功几率：10%", "§6效果:增加伤害"]),
        "gemLore3": JSON.stringify(["§1-------==宝石==-------", "§6耐久宝石", "§3可镶嵌在任何装备上", "§7成功几率：10%", "§6效果:物品无限耐久"]),
        "Command": "强化你的装备吧!",
        "formtitle1": "强化武器-OP",
        "formcontent1": "请选择你要添加的类型",
        "formarms1": "武器",
        "formprotective1": "防具",
        "formcontent2": "请选择你要添加的物品",
        "reelFailed": "卷轴升级失败，卷轴消失！",
        "failedEquip": "装备强化失败，卷轴消失！",
        "ReinforceSuccess": "装备强化成功！",
        "ScrollUSucceeded": "卷轴升级成功！",
        "placeGamErr": "放置宝石过多，无法强化！",
        "026UPLog": "配置文件已经重置，请重新添加装备！"
    },
    "zh_TW": {
        "StrengtheningReel1": "§3一級强化卷軸",
        "StrengtheningReel1explain": JSON.stringify(["§2-------介紹-------", "§3一級强化卷軸", "可用於:原始裝備", "§6使用效果:裝備變為一階", "-------====-------", "§3一階裝備:", "§2護甲類裝備:+1生命", "§4攻擊類武器:+1攻擊", "PS:加攻擊是指在攻擊時\n對目標造成額外的真實傷害！"]),
        "StrengtheningReel2": "§9二級强化卷軸",
        "StrengtheningReel2explain": JSON.stringify(["§2-------介紹-------", "§9二級强化卷軸", "可用於:一階裝備", "§6使用效果:裝備變為二階", "-------====-------", "§9二階裝備:", "§2護甲類裝備:+3生命", "§4攻擊類武器:+2攻擊", "PS:加攻擊是指在攻擊時\n對目標造成額外的真實傷害！"]),
        "StrengtheningReel3": "§1三級强化卷軸",
        "StrengtheningReel3explain": JSON.stringify(["§2-------介紹-------", "§1三級强化卷軸", "可用於:二階裝備", "§6使用效果:裝備變為三階", "-------====-------", "§1三階裝備:", "§2護甲類裝備:+5生命", "§4攻擊類武器:+3攻擊", "PS:加攻擊是指在攻擊時\n對目標造成額外的真實傷害！"]),
        "StrengtheningReel4": "§4四級强化卷軸",
        "StrengtheningReel4explain": JSON.stringify(["§2-------介紹-------", "§4四級强化卷軸", "可用於:三階裝備", "§6使用效果:裝備變為四階", "-------====-------", "§4四階裝備:", "§2護甲類裝備:+10生命", "§4攻擊類武器:+4攻擊", "PS:加攻擊是指在攻擊時\n對目標造成額外的真實傷害！"]),
        "StrengtheningReel5": "§6終極强化卷軸",
        "StrengtheningReel5explain": JSON.stringify(["§2-------介紹-------", "§6終極强化卷軸", "可用於:四階裝備", "§6使用效果:裝備變為終極", "-------====-------", "§6終極裝備:", "§2護甲類裝備:+20生命", "§4攻擊類武器:+5攻擊", "PS:加攻擊是指在攻擊時\n對目標造成額外的真實傷害！"]),
        "EquipmentWeapon": JSON.stringify(["§2-------==内容==-------", "§3{0}階武器", "§4額外傷害:+{1}", "§6技能:有{4}%幾率直接擊殺！", "-------鍛造資訊-------", "鍛造玩家:{2}", "鍛造時間:{3}"]),
        "EquipmentArmor": JSON.stringify(["§2-------==内容==-------", "§3{0}階護具", "§4生命上限:+{1}", "§2額外經驗+{4}", "-------鍛造資訊-------", "鍛造玩家:{2}", "鍛造時間:{3}"]),
        "SkillTips1": "§6觸發技能:一擊必殺！",
        "gem1": JSON.stringify(["§1-------==寶石==-------", "§2{0}級{1}", "§6效果:{2}+{3}", "§3PS:此寶石最高等級為:{4}級"]),
        "MovingGem": "移速寶石",
        "PowerGem": "暴擊寶石",
        "DurableGem": "耐久寶石",
        "MovingGemExplain": "移動速度",
        "PowerGemExplain": "額外傷害",
        "DurableGemExplain": "物品耐久",
        "TessellationTipsErr1": "§4鑲嵌失敗。寶石已消失！",
        "TessellationTipsErr2": "§4已達到最大等級,無法鑲嵌！",
        "TessellationTipsErr3": "§4此寶石無法用於此物品！",
        "TessellationTipsErr4": "§4沒找到强化資訊,請先使用强化卷軸强化後再鑲嵌寶石！",
        "gemLore1": JSON.stringify(["§1-------==寶石==-------", "§2移速寶石", "§3可鑲嵌在鞋子上", "§7成功幾率:10%", "§6效果:新增移速"]),
        "gemLore2": JSON.stringify(["§1-------==寶石==-------", "§4暴擊寶石", "§3可鑲嵌在武器上", "§7成功幾率:10%", "§6效果:新增傷害"]),
        "gemLore3": JSON.stringify(["§1-------==寶石==-------", "§6耐久寶石", "§3可鑲嵌在任何裝備上", "§7成功幾率:10%", "§6效果:物品無限耐久"]),
        "Command": "强化你的裝備吧！",
        "formtitle1": "强化武器-OP",
        "formcontent1": "請選擇你要添加的類型",
        "formarms1": "武器",
        "formprotective1": "防具",
        "formcontent2": "請選擇你要添加的物品",
        "reelFailed": "卷軸陞級失敗,卷軸消失！",
        "failedEquip": "裝備强化失敗,卷軸消失！",
        "ReinforceSuccess": "裝備强化成功！",
        "ScrollUSucceeded": "卷軸陞級成功！",
        "placeGamErr": "放置寶石過多,無法强化！",
        "026UPLog": "設定檔已經重置,請重新添加裝備！"
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
        "EquipmentWeapon": JSON.stringify(["§2-------==attribute==-------", "§3{0} stratum arms", "§4Additional damage:+{1}", "§6Skill: {4}% chance to kill directly!", "-------Forging information-------", "Forging Players:{2}", "Forging time:{3}"]),
        "EquipmentArmor": JSON.stringify(["§2-------==attribute==-------", "§3{0} stratum protective clothing", "§4Maximum Life:+{1}", "§1Additional EXP+{4}", "-------Forging information-------", "Forging Players:{2}", "Forging time:{3}"]),
        "SkillTips1": "§6Trigger Skill: Kill with one strike!",
        "gem1": JSON.stringify(["§1-------==gemstone==-------", "§2{0}levl{1}", "§6effect:{2}+{3}", "§3PS:The highest level of this gem is:{4}levl"]),
        "MovingGem": "Speed shifting gem",
        "PowerGem": "Critical Hit Gem",
        "DurableGem": "Durable gemstone",
        "MovingGemExplain": "Moving speed",
        "PowerGemExplain": "Additional damage",
        "DurableGemExplain": "Durability",
        "TessellationTipsErr1": "§4Tessellation failed. The gem has disappeared!",
        "TessellationTipsErr2": "§4The maximum level has been reached, unable to inlay!",
        "TessellationTipsErr3": "§4This gem can't be used for this item!",
        "TessellationTipsErr4": "§4No enhancement information found. Please use the enhancement scroll to strengthen before inlaying gems!",
        "gemLore1": JSON.stringify(["§1-------==Gem==-------", "§2Speed shifting gem", "§3Can be inlaid on shoes", "§7Success probability: 10%", "Effect: increase movement speed"]),
        "gemLore2": JSON.stringify(["§1-------==Gem==-------", "§4Critical Hit Gem", "§3Embedded in weapons", "§7Success probability: 10%", "Effect: increase damage"]),
        "gemLore3": JSON.stringify(["§1-------==Gem==-------", "§6Durable gemstone", "§3Embedded on any equipment", "§7Success probability: 10%", "Effect: unlimited durability"]),
        "Command": "Strengthen your equipment!",
        "formtitle1": "Strengthening weapons-OP",
        "formcontent1": "Please choose the type you want to add",
        "formarms1": "arms",
        "formprotective1": "Armor",
        "formcontent2": "Please select the item you want to add",
        "reelFailed": "Scroll upgrade failed!",
        "failedEquip": "Equipment strengthening failed, and the scroll disappeared!",
        "ReinforceSuccess": "Equipment strengthening succeeded!",
        "ScrollUSucceeded": "Scroll upgrade succeeded!",
        "placeGamErr": "Too many gems placed, unable to strengthen!",
        "026UPLog": "The configuration file has been reset, please add equipment again!"
    }
});

/**
 * 玩家输入指令事件监听.
 * 异常及调试使用.
 */
mc.listen("onPlayerCmd", (player1, cmd) => {
    if (player1.isOP() && cmd == 'cc') {
        let LLVision = ll.versionString();
        let item = player1.getHand();
        let DebugMsg;
        if (item != undefined && item.name != "") {
            let nbt = item.getNbt();
            DebugMsg = `LL版本：${LLVision}\n插件版本：${PluginsVersion}\n手持物Nbt：\n${nbt.toString()}`;
        } else {
            DebugMsg = `LL版本：${LLVision}\n插件版本：${PluginsVersion}\n手持物Nbt：无}`;
        }
        player1.tell(`${Format.Bold}${Format.Green}---information---\n${Format.Red}${DebugMsg}\n${Format.Green}请将以上内容截图发送给开发者!`);
        return false;
    }
});

/**
 * 玩家破坏方块事件监听.
 * 主要用于判断玩家是否破坏的是石头.
 * 然后再通过随机数判断是否给强化卷轴.
 */
mc.listen("onDestroyBlock", (player, block) => {
    setTimeout(() => {
        if (block.name != "" && DeterminationBrokenBlocks(block)) {
            let BlockData = ConfigJson.BlockReelDropList[block.type];
            if (BlockData != undefined) {
                if (specifiedRangeRandomNumber(0, BlockData.MaximumRandomNumber) < BlockData.DropRange) {
                    let pos = block.pos;
                    newItem = mc.newItem(generateNewNbt("intensify", 1, i18n.trl(player.langCode, "StrengtheningReel1",)));
                    newItem.setLore(JSON.parse(i18n.trl(player.langCode, "StrengtheningReel1explain",)))
                    mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid)
                }

            }
        }
    }, 20);
});

/**
 * 操作容器监听.
 * 主要用于强化卷轴合成升级.
 */
mc.listen("onContainerChange", (player, block, _slotNum, _oldItem, _newItem) => {
    if (block.type == "minecraft:dropper") {
        ContainerListeningProcessing(player, block);
    }
});

/**
 * 方块接受玩家互动监听.
 * 主要用于校验，避免玩家卡BUG.
 */
mc.listen("onBlockInteracted", (player, block) => {
    if (block.type == "minecraft:dropper") {
        ContainerListeningProcessing(player, block);
    }
});

/**
 * 实体受伤事件监听.
 * 用来处理玩家手持强化道具攻击伤害.
 */
mc.listen("onMobHurt", (mob, source, _damage, cause) => {
    if (source != undefined && source.isPlayer() && cause == 2) {
        let addedDamageBool = true;
        let player = source.toPlayer();
        let playerHanditem = player.getHand();
        let itemInformation = upgradeItem(playerHanditem);
        if (itemInformation.boolean && itemInformation.type == "Weapon") {
            let gemDamage = 0;
            if (itemInformation.gemtype != undefined && parseInt(itemInformation.gemtype) == 2) {
                gemDamage = itemGemTable[parseInt(itemInformation.gemtype)].lvl[parseInt(itemInformation.gemlvl)];
            }
            let itemdata = ComparisonTable[itemInformation.lvl];
            let Newdamage = itemdata.Weapon;
            if (mob.isPlayer() && ConfigJson.seckilltopvp) {
                if (specifiedRangeRandomNumber(0, 1000) <= itemdata.probability * 10 && !listJudgment(mob.type)) {
                    addedDamageBool = false;
                    setTimeout(() => {
                        sengTell(player, "SkillTips1", [], 0);
                        mob.kill();
                    }, 50);
                }
            } else if (!mob.isPlayer() && ConfigJson.seckilltopve) {
                if (specifiedRangeRandomNumber(0, 1000) <= itemdata.probability * 10 && !listJudgment(mob.type)) {
                    addedDamageBool = false;
                    setTimeout(() => {
                        sengTell(player, "SkillTips1", [], 0);
                        mob.kill();
                    }, 50);
                }
            }
            if (addedDamageBool) {
                setTimeout(() => {
                    mob.hurt(Newdamage + gemDamage, 5);
                }, 500);
            }
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
                let Move = 0;
                let armorContainer = player.getArmor();
                let containerAllList = armorContainer.getAllItems();
                containerAllList.forEach(item => {
                    if (item.name != "") {
                        let itemInformation = upgradeItem(item);
                        if (itemInformation.boolean) {
                            HP += ComparisonTable[parseInt(itemInformation.lvl)].Armor;
                            if (parseInt(itemInformation.gemtype) == 1) {
                                Move = itemGemTable[1].lvl[itemInformation.gemlvl];
                            }
                        }
                    }
                });
                let playerHPData = db.get("HP");
                if (playerHPData == undefined) {
                    db.set("HP", {});
                    db.set("Move", {});
                    playerHPData = db.get("HP");
                }
                if (playerHPData[player.xuid] == undefined) {
                    playerHPData[player.xuid] = 0;
                    db.set("HP", playerHPData);
                }
                if (playerHPData[player.xuid] > HP) {
                    setPlayerHP(player, playerHPData[player.xuid] - HP, "remove", 0);
                    playerHPData[player.xuid] = HP;
                    db.set("HP", playerHPData);
                } else if (playerHPData[player.xuid] < HP) {
                    setPlayerHP(player, HP - playerHPData[player.xuid], "add", 0);
                    playerHPData[player.xuid] = HP;
                    db.set("HP", playerHPData);
                }

                let playerMoveData = db.get("Move");
                if (playerMoveData[player.xuid] == undefined) {
                    playerMoveData[player.xuid] = 0;
                    db.set("Move", playerMoveData);
                }
                if (playerMoveData[player.xuid] > Move) {
                    setPlayerMove(player, playerMoveData[player.xuid], "remove")
                    playerMoveData[player.xuid] = Move;
                    db.set("Move", playerMoveData);
                } else if (playerMoveData[player.xuid] < Move) {
                    setPlayerMove(player, Move, "add")
                    playerMoveData[player.xuid] = Move;
                    db.set("Move", playerMoveData);
                }
                equipmentDescriptionCorrection(player);
            });
        }
    }, 1000);
    setCommand();
});

/**
 * 玩家获得经验事件监听.
 * 主要用来处理护甲中的额外经验效果.
 * 给玩家经验接口并未使用addExperience，因其会再次触发次事件.
 */
mc.listen("onExperienceAdd", (player, _exp) => {
    let armorContainer = player.getArmor();
    let containerAllList = armorContainer.getAllItems();
    let EXP = 0;
    if (Coolingtime) {
        containerAllList.forEach(item => {
            if (item.name != "") {
                let itemInformation = upgradeItem(item);
                if (itemInformation.boolean) {
                    EXP += ComparisonTable[parseInt(itemInformation.lvl)].exp;
                }
            }
        });
        player.setCurrentExperience(player.getCurrentExperience() + EXP);
        Coolingtime = false;
        setTimeout(() => {
            Coolingtime = true;
        }, 1000 * 5);
    }
})

/**
 * 玩家加入游戏监听.
 * 主要用来处理旧版本nbt数据不够的问题.
 */
mc.listen("onJoin", (player) => {
    let armorContainer = player.getArmor();
    let containerAllList = armorContainer.getAllItems();
    containerAllList.forEach(item => {
        if (item.name != "") {
            let handItemNbt = item.getNbt();
            let handItemNbtTag = handItemNbt.getTag("tag");
            if (handItemNbtTag != undefined) {
                let handItemNbtTagAddon = handItemNbtTag.getTag("addon");
                if (handItemNbtTagAddon != undefined) {
                    if (handItemNbtTagAddon.getTag("gemtype") == undefined) {
                        handItemNbtTagAddon.setTag("gemtype", new NbtInt(0));
                        handItemNbtTagAddon.setTag("gemlvl", new NbtInt(0));
                        item.setNbt(handItemNbt);
                        player.refreshItems();
                    }
                }
            }
        }
    });
})

/**
 * 实体死亡监听.
 * 主要用来生成宝石.
 */
mc.listen("onMobDie", (mob, source, _cause) => {
    if (source != undefined && source.isPlayer() && mob.name != "") {
        let EntityData = ConfigJson.EntityGemDropList[mob.type];
        if (EntityData != undefined) {
            if (specifiedRangeRandomNumber(0, EntityData.MaximumRandomNumber) < EntityData.DropRange) {
                let player = source.toPlayer();
                let gemtype
                if (ConfigJson.durableGemsFall) {
                    gemtype = specifiedRangeRandomNumber(1, 4);
                } else {
                    gemtype = specifiedRangeRandomNumber(1, 3);
                }
                let newItem = mc.newItem(generateNewGemNbt(gemtype, 1, 1, player))
                let pos = mob.pos;
                if (gemtype == 1) {
                    newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore1",)));
                }
                if (gemtype == 2) {
                    newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore2",)));
                }
                if (gemtype == 3) {
                    newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore3",)));
                }
                mc.spawnItem(newItem, pos.x, pos.y + 1, pos.z, pos.dimid);
            }
        }
    }
})

/**
 * 注册命令函数，服务器启动时调用.
 */
function setCommand() {
    let Command = mc.newCommand("intensify", i18n.get("Command", ll.language), PermType.GameMasters);
    Command.setEnum("openAction", ["open"]);
    Command.setEnum("resetAction", ["reset"]);
    Command.setEnum("giveAction", ["give"]);
    Command.setEnum("intensifyAction", ["intensify"]);
    Command.setEnum("GemStoneAction", ["movinggem", "powergem", "durablegem"]);
    Command.mandatory("pattern", ParamType.Enum, "openAction", 1);
    Command.mandatory("pattern", ParamType.Enum, "resetAction", 1);
    Command.mandatory("pattern", ParamType.Enum, "giveAction", 1);
    Command.mandatory("GiveVolume", ParamType.Enum, "intensifyAction", 0);
    Command.mandatory("GemStone", ParamType.Enum, "GemStoneAction", 0);
    Command.mandatory("Player", ParamType.Player);
    Command.mandatory("amount", ParamType.Int);
    Command.mandatory("Health", ParamType.Int);
    Command.overload(["giveAction", "Player", "GemStone", "amount"]);
    Command.overload(["giveAction", "Player", "GiveVolume"]);
    Command.overload(["resetAction", "Player", "Health"]);
    Command.overload(["openAction"]);
    Command.setCallback((_cmd, origin, output, results) => {
        let playerList = results.Player;
        let playerName = "";
        let OutputBlooe = false;
        if (results.pattern == "open") {
            openOPForm(origin.player);
            OutputBlooe = true;
        } else {
            for (let i in playerList) {
                let player = playerList[i];
                if (results.pattern == "reset") {
                    setPlayerHP(player, parseInt(results.Health), "set", 20);
                    OutputBlooe = true;
                } else if (results.pattern == "give") {
                    let newItem;
                    let getItemBlooe = false;
                    if (results.GemStone == "movinggem") {
                        newItem = mc.newItem(generateNewGemNbt(1, 1, parseInt(results.amount), player));
                        newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore1",)));
                        getItemBlooe = true;
                    } else if (results.GemStone == "powergem") {
                        newItem = mc.newItem(generateNewGemNbt(2, 1, parseInt(results.amount), player));
                        newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore2",)));
                        getItemBlooe = true;
                    } else if (results.GemStone == "durablegem") {
                        newItem = mc.newItem(generateNewGemNbt(3, 1, parseInt(results.amount), player));
                        newItem.setLore(JSON.parse(i18n.trl(player.langCode, "gemLore3",)));
                        getItemBlooe = true;
                    }
                    if (results.GiveVolume == "intensify") {
                        newItem = mc.newItem(generateNewNbt("intensify", 1, i18n.trl(player.langCode, "StrengtheningReel1",)));
                        newItem.setLore(JSON.parse(i18n.trl(player.langCode, "StrengtheningReel1explain",)))
                        getItemBlooe = true;
                    }
                    if (getItemBlooe) {
                        OutputBlooe = true;
                        player.giveItem(newItem);
                        player.refreshItems();
                    }
                }
                playerName += `${player.realName} `;
            }
        }
        if (OutputBlooe) {
            output.success(`${playerName} ok`);
        } else {
            output.error(`${playerName} error`);
        }
    })
    Command.setup();
}

/**
 * 容器事件统一处理，主要用于强化和升级.
 * @param {{Player}} player 玩家对象
 * @param {Block} block 方块对象
 */
function ContainerListeningProcessing(player, block) {
    if (block.type == "minecraft:dropper") {
        let Container = block.getContainer();
        let item1 = upgradeItem(Container.getItem(0));
        if (item1.boolean && item1.type == "intensify" && item1.itemType == "minecraft:field_masoned_banner_pattern") {
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
        } else if (item1.boolean && item1.type == "gem" && item1.itemType == "minecraft:quartz") {
            GemEnhancement(player, item1, Container);
        }
    }
}

/**
 * OP添加物品窗口.
 * @param {Player} player 玩家对象
 */
function openOPForm(player) {
    if (player != undefined && player.isOP()) {
        let fm = mc.newSimpleForm()
            .setTitle(i18n.trl(player.langCode, "formtitle1",))
            .setContent(i18n.trl(player.langCode, "formcontent1",))
            .addButton(i18n.trl(player.langCode, "formarms1",))
            .addButton(i18n.trl(player.langCode, "formprotective1",));
        player.sendForm(fm, (player, id) => {
            if (id == undefined) {
                return;
            } else {
                let getPlayerInventoryList = player.getInventory().getAllItems();
                let playerInventory = [];
                let playerInventoryType = [];
                getPlayerInventoryList.forEach(item => {
                    if (item.name != "") {
                        playerInventory[playerInventory.length] = `${item.type}\n${item.name}`;
                        playerInventoryType[playerInventoryType.length] = item.type;
                    }
                });
                if (playerInventoryType != []) {
                    OPSetItemForm(player, playerInventory, playerInventoryType, id);
                }
            }
        })
    }
}

/**
 * 玩家选择类型后弹窗选择物品.
 * @param {Player} player 玩家对象
 * @param {Array} itemListDisplay 背包物品显示列表
 * @param {Array} itemList 物品type名称列表
 * @param {int} type 添加类型
 */
function OPSetItemForm(player, itemListDisplay, itemList, type) {
    let fm = mc.newCustomForm()
        .setTitle(i18n.trl(player.langCode, "formtitle1",))
        .addLabel(i18n.trl(player.langCode, "formcontent2",));
    itemListDisplay.forEach(itemType => {
        fm.addSwitch(itemType);
    });
    player.sendForm(fm, (player, data) => {
        if (data == undefined) {
            return false;
        } else {
            let CumulativeList = [];
            for (let i = 0; i < data.length;) {
                data = data.filter(Boolean);
                if (data[i]) {
                    CumulativeList.push(itemList[i]);
                }
                i++;
            }
            if (CumulativeList != []) {
                if (type == 0) {
                    ConfigItemWeapon.push.apply(ConfigItemWeapon, CumulativeList);
                    ConfigItemWeapon = Array.from(new Set(ConfigItemWeapon));
                } else if (type == 1) {
                    ConfigItemArmor.push.apply(ConfigItemArmor, CumulativeList);
                    ConfigItemArmor = Array.from(new Set(ConfigItemArmor));
                }
                File.writeTo(pluginPath + "data/EquipmentData.json", JSON.stringify(StrengthenItemsJson, null, "\t"));
            }
        }
    });
}

/**
 * 判断是否是升级物品.
 * @param {item} item 物品对象
 * @returns 物品是否是升级物品及相关信息
 */
function upgradeItem(item) {
    let bool = { "boolean": false, "itemType": item.type };
    if (item.name != "") {
        let handItemNbt = item.getNbt();
        let handItemNbtTag = handItemNbt.getTag("tag");
        if (handItemNbtTag != undefined) {
            let handItemNbtTagAddon = handItemNbtTag.getTag("addon");
            if (handItemNbtTagAddon != undefined) {
                if (item.type == "minecraft:quartz") {
                    bool = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "lvl": handItemNbtTagAddon.getTag("lvl").toString(), "itemType": item.type, "gemtype": handItemNbtTagAddon.getTag("gemtype").toString() };
                } else if (item.type == "minecraft:field_masoned_banner_pattern") {
                    bool = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "lvl": handItemNbtTagAddon.getTag("lvl").toString(), "itemType": item.type };
                } else {
                    bool = { "boolean": true, "type": handItemNbtTagAddon.getTag("type").toString(), "lvl": handItemNbtTagAddon.getTag("lvl").toString(), "itemType": item.type, "gemtype": handItemNbtTagAddon.getTag("gemtype").toString(), "gemlvl": handItemNbtTagAddon.getTag("gemlvl").toString() };
                }
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
function sengTell(player, key, list, type) {
    let args = Array.from(list);
    let msg = i18n.trl(player.langCode, key, ...args)
    player.tell(`[${pluginName}] ${msg}`, type);
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
 * 生成一个宝石nbt
 * @param {int} type 宝石类型
 * @param {int} lvl 宝石等级
 * @returns 新的NBT
 */
function generateNewGemNbt(type, lvl, amount, player) {
    let nbt1 = new NbtCompound({
        "Damage": new NbtInt(0),
        "RepairCost": new NbtInt(1),
        "display": new NbtCompound({
            "Name": new NbtString(i18n.trl(player.langCode, itemGemTable[type].gemName))
        }),
        "ench": new NbtList([]),
        "addon": new NbtCompound({
            "type": new NbtString("gem"),
            "gemtype": new NbtInt(type),
            "lvl": new NbtInt(lvl)
        })
    })
    let NewItem = mc.newItem("minecraft:quartz", 1);
    let nbt = NewItem.getNbt();
    nbt.setTag("tag", nbt1);
    nbt.setByte("Count", amount);
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
                let RandomValue = specifiedRangeRandomNumber(0, 100);
                if (item1.lvl == 1 && ConfigJson.ScrollUpgrade.twoReelProbability > RandomValue) {
                    ArticlesGeneratedContainer(Container, player, index1, index2, lvl, language1, language2);
                } else if (item1.lvl == 2 && ConfigJson.ScrollUpgrade.threeReelProbability > RandomValue) {
                    ArticlesGeneratedContainer(Container, player, index1, index2, lvl, language1, language2);
                } else if (item1.lvl == 3 && ConfigJson.ScrollUpgrade.fourReelProbability > RandomValue) {
                    ArticlesGeneratedContainer(Container, player, index1, index2, lvl, language1, language2);
                } else if (item1.lvl == 4 && ConfigJson.ScrollUpgrade.fiveReelProbability > RandomValue) {
                    ArticlesGeneratedContainer(Container, player, index1, index2, lvl, language1, language2);
                } else {
                    Container.removeItem(0, 1);
                    Container.removeItem(index1, 1);
                    Container.removeItem(index2, 1);
                    sengTell(player, "reelFailed", [], 0);
                    playSound(player, 1);
                }

            }
        }
    }
}


/**
 * 强化成功在容器内生成新的物品
 * @param {Container} Container 容器对象
 * @param {player} player 玩家对象
 * @param {int} index1 容器序号1
 * @param {int} index2 容器序号2
 * @param {int} lvl 强化后等级
 * @param {string} language1 语言文件1
 * @param {string} language2 语言文件2
 */
function ArticlesGeneratedContainer(Container, player, index1, index2, lvl, language1, language2) {
    setTimeout(() => {
        newItem = mc.newItem(generateNewNbt("intensify", lvl, i18n.trl(player.langCode, language1,)));
        newItem.setLore(JSON.parse(i18n.trl(player.langCode, language2,)))
        Container.removeItem(0, 1);
        Container.removeItem(index1, 1);
        Container.removeItem(index2, 1);
        Container.setItem(0, newItem);
    }, 100);
    sengTell(player, "ScrollUSucceeded", [], 0);
    playSound(player, 0);
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
            if (ConfigJson.ItemUpgrade.zeroItemUpgrade > specifiedRangeRandomNumber(0, 100)) {
                setTimeout(() => {
                    let nbt;
                    if (StrengthenItemsJson.weapon.indexOf(item.type) != -1) {
                        nbt = setEquipmentNbt(item, "Weapon", TargetLevel);
                    } else if (StrengthenItemsJson.armor.indexOf(item.type) != -1) {
                        nbt = setEquipmentNbt(item, "Armor", TargetLevel);
                    }
                    let newItem = mc.newItem(nbt);
                    SetLore(newItem, player);
                    Container.removeItem(0, 1);
                    Container.removeItem(2, 1);
                    Container.setItem(0, newItem);
                }, 100);
                sengTell(player, "ReinforceSuccess", [], 0);
                playSound(player, 0)
            } else {
                Container.removeItem(0, 1);
                sengTell(player, "failedEquip", [], 0);
                playSound(player, 1)
            }
        }
    } else if (item1.boolean && item2.boolean && item2.type != "intensify") {
        if (item1.lvl == TargetLevel && item2.lvl == TargetLevel - 1) {
            let RandomValue = specifiedRangeRandomNumber(0, 100);
            if (item1.lvl == 2 && ConfigJson.ItemUpgrade.oneItemUpgrade > RandomValue) {
                GenerateEnhancementItems(item, TargetLevel, Container, player);
            } else if (item1.lvl == 3 && ConfigJson.ItemUpgrade.twoItemUpgrade > RandomValue) {
                GenerateEnhancementItems(item, TargetLevel, Container, player);
            } else if (item1.lvl == 4 && ConfigJson.ItemUpgrade.threeItemUpgrade > RandomValue) {
                GenerateEnhancementItems(item, TargetLevel, Container, player);
            } else if (item1.lvl == 5 && ConfigJson.ItemUpgrade.fourItemUpgrade > RandomValue) {
                GenerateEnhancementItems(item, TargetLevel, Container, player);
            } else {
                Container.removeItem(0, 1);
                sengTell(player, "failedEquip", [], 0);
                playSound(player, 1)
            }
        }
    }
}

/**
 * 生成强化后的物品对象
 * @param {Item} item 物品对象
 * @param {int} TargetLevel 目标等级
 * @param {Container} Container 容器对象
 * @param {player} player 玩家对象
 */
function GenerateEnhancementItems(item, TargetLevel, Container, player) {
    setTimeout(() => {
        let nbt = item.getNbt();
        nbt.getTag("tag").getTag("addon").setInt("lvl", TargetLevel);
        newItem = mc.newItem(nbt);
        SetLore(newItem, player);
        Container.removeItem(0, 1);
        Container.removeItem(2, 1);
        Container.setItem(0, newItem);
    }, 100);
    sengTell(player, "ReinforceSuccess", [], 0);
    playSound(player, 0)
}

/**
 * 物品镶嵌宝石处理.
 * @param {player} player 玩家对象
 * @param {string} item1 物品1的数据
 * @param {Container} Container 容器对象
 */
function GemEnhancement(player, item1, Container) {
    let item2 = upgradeItem(Container.getItem(2));
    let item = upgradeItem(Container.getItem(0));
    if (item.count > 10) {
        playSound(player, 2);
        sengTell(player, "placeGamErr", [], 0);
        return false;
    } else {
        let item1Type = parseInt(item1.gemtype);
        if (item2.boolean) {
            let typeBoolean = false;
            if (item1Type == 1 && item2.itemType.indexOf("_boots") != -1) {
                typeBoolean = true;
            } else if (item1Type == 2 && item2.type == "Weapon") {
                typeBoolean = true;
            } else if (item1Type == 3) {
                typeBoolean = true;
            }
            if (typeBoolean) {
                let item = Container.getItem(2);
                if (item2.type != "intensify" && item2.type != "gem") {
                    let nbt = item.getNbt();
                    if (parseInt(item2.gemtype) == 0) {
                        nbt.getTag("tag").getTag("addon").setInt("gemtype", parseInt(item1.gemtype));
                        item2.gemtype = item1.gemtype;
                    }
                    if (item1.gemtype == item2.gemtype) {
                        if (parseInt(item2.gemlvl) < itemGemTable[parseInt(item2.gemtype)].maxLvl) {
                            if (specifiedRangeRandomNumber(0, 100) < ConfigJson.PSuccess) {
                                nbt.getTag("tag").getTag("addon").setInt("gemlvl", parseInt(item2.gemlvl) + 1);
                                newItem = mc.newItem(nbt);
                                SetLore(newItem, player);
                                Container.removeItem(0, 1);
                                Container.removeItem(2, 1);
                                Container.setItem(0, newItem);
                                playSound(player, 0)
                            } else {
                                Container.removeItem(0, 1);
                                playSound(player, 1)
                                sengTell(player, "TessellationTipsErr1", [], 0);
                            }
                        } else {
                            sengTell(player, "TessellationTipsErr2", [], 0);
                        }
                    } else {
                        sengTell(player, "TessellationTipsErr3", [], 0);
                    }
                }
            } else {
                sengTell(player, "TessellationTipsErr3", [], 0);
            }
        } else {
            sengTell(player, "TessellationTipsErr4", [], 0);
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
    let nbt2 = new NbtCompound({
        "type": new NbtString(type),
        "lvl": new NbtInt(lvl),
        "gemtype": new NbtInt(0),
        "gemlvl": new NbtInt(0)
    })
    let nbt1 = new NbtCompound({
        "addon": new NbtCompound({
            "type": new NbtString(type),
            "lvl": new NbtInt(lvl),
            "gemtype": new NbtInt(0),
            "gemlvl": new NbtInt(0)
        })
    })
    let nbt = item.getNbt();
    if (nbt.getTag('tag') != undefined) {
        nbt.getTag('tag').setTag("addon", nbt2);
    } else {
        nbt.setTag("tag", nbt1);
    }
    return nbt;
}

/**
 * 设置玩家生命值
 * @param {player} player 玩家对象
 * @param {int} HP 增加的最大生命值
 * @param {string} pattern 模式
 */
function setPlayerHP(player, HP, pattern, data) {
    let PlayerHealth = player.health;
    let playerMaxHealth = player.maxHealth;
    if (pattern == "add") {
        HP = playerMaxHealth + HP;
    } else if (pattern == "remove") {
        HP = playerMaxHealth - HP;
    } else if (pattern == "set") {
        HP = data;
    }
    if (HP <= 0) {
        HP = 2
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

/**
 * 设置玩家移速
 * @param {player} player 玩家对象
 * @param {int} move 变动移速
 * @param {string} pattern 模式
 */
function setPlayerMove(player, move, pattern) {
    let playerNbt = player.getNbt();
    let playerNbtAttributes = playerNbt.getTag("Attributes");
    for (let i = 0; i < playerNbtAttributes.getSize(); i++) {
        let playerNbtAttributesObj = playerNbtAttributes.getTag(i);
        if (playerNbtAttributesObj.getTag("Name") == "minecraft:movement") {
            let playerBaseMove = parseFloat(playerNbtAttributesObj.getTag("Base")).toString();
            if (pattern == "add") {
                move = parseFloat(amend(playerBaseMove, move, "+"));
            } else if (pattern == "remove") {
                move = parseFloat(amend(playerBaseMove, move, "-"));
            }
            if (move < 0.1) {
                move = 0.1
            }
            playerNbtAttributesObj.setFloat("Base", move)
            playerNbtAttributesObj.setFloat("Current", move)
            playerNbtAttributesObj.setFloat("DefaultMin", move)
            playerNbtAttributesObj.setFloat("Min", move)
        }
    }
    player.setNbt(playerNbt);
}

/**
 * 设置物品对象的Lore
 * @param {Item} item 物品对象
 * @param {player} player 玩家对象
 */
function SetLore(item, player) {
    item.setLore(ReturnToNormalLore(item, player));
    player.refreshItems();
}

/**
 * 查询物品正常的Lore
 * @param {Item} item 物品对象
 * @returns 返回正常的Lore
 */
function ReturnToNormalLore(item, player) {
    let item2 = upgradeItem(item);
    let TargetLevel = item2.lvl;
    let GemLore, DescriptionText
    if (item2.gemlvl != 0) {
        let GemData = itemGemTable[parseInt(item2.gemtype)];
        GemLore = JSON.parse(i18n.trl(player.langCode, "gem1", item2.gemlvl, i18n.trl(player.langCode, GemData.gemName), i18n.trl(player.langCode, GemData.gemExplain), GemData.lvl[parseInt(item2.gemlvl)], GemData.maxLvl));
    }
    if (item2.type == "Armor") {
        DescriptionText = JSON.parse(i18n.trl(player.langCode, "EquipmentArmor", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Armor, player.realName, system.getTimeStr(), ComparisonTable[TargetLevel].exp));
    } else if (item2.type == "Weapon") {
        DescriptionText = JSON.parse(i18n.trl(player.langCode, "EquipmentWeapon", ComparisonTable[TargetLevel].name, ComparisonTable[TargetLevel].Weapon, player.realName, system.getTimeStr(), ComparisonTable[TargetLevel].probability));
    }
    if (GemLore != undefined) {
        GemLore.unshift(4, 0);
        Array.prototype.splice.apply(DescriptionText, GemLore);
    }
    return DescriptionText;
}

/**
 * 解决小数点后数值漂移的运算
 * @param {int} num1 数值1
 * @param {int} num2 数值2
 * @param {string} symbol 字符格式的运算符号
 * @returns 
 */
function amend(num1, num2, symbol) {
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
 * 判断重置物品耐久
 * @param {Item} item 物品对象
 * @param {Player} player 玩家对象
 */
function itemDurableRepair(item, player) {
    if (item.damage > 50) {
        item.setDamage(0);
        player.refreshItems();
    }
}

/**
 * 给玩家播放指定音效.
 * @param {Player} player 玩家对象
 * @param {int} Sound 音乐名称位置
 */
function playSound(player, Sound) {
    mc.runcmdEx(`playsound ${SoundList[Sound]} ${player.realName}`);
}

/**
 * 一击必杀生物列表判定.
 * @param {String} key 需要判断的实体标准类型
 * @returns Bool值
 */
function listJudgment(key) {
    let keyBool = false;
    EntityseckillWhiteList.forEach(seckillType => {
        if (seckillType == key) {
            keyBool = true;
        }
    });
    return keyBool
}

/**
 * 校验方块是否破坏成功.
 * @param {Block} block 方块对象
 * @returns 布尔值，方块是否破坏成功.
 */
function DeterminationBrokenBlocks(block) {
    let boole = false;
    let blockObtain = mc.getBlock(block.pos);
    if (blockObtain != undefined && blockObtain.name != "") {
        if (block.type != blockObtain.type) {
            boole = true;
        }
    }
    return boole
}

/**
 * 版本更新时修改物品的显示数据.
 * @param {Player} player 玩家对象
 */
function equipmentDescriptionCorrection(player) {
    let armorContainer = player.getArmor();
    let containerAllList = armorContainer.getAllItems();
    let playerHand = player.getHand();
    let refreshItemsPlayer = false;
    containerAllList.forEach(item => {
        if (item.name != "") {
            let itemInformation = upgradeItem(item);
            if (itemInformation.boolean) {
                if (itemInformation.type == "Armor") {
                    if (parseInt(itemInformation.gemtype) == 3) {
                        itemDurableRepair(item, player);
                    }
                    let DescriptionText = ReturnToNormalLore(item, player);
                    let itemNbt = JSON.parse(item.getNbt().toString());
                    let Lore2 = itemNbt.tag.display.Lore;
                    for (let i = 0; i < DescriptionText.length - 3; i++) {
                        if (Lore2[i] != DescriptionText[i]) {
                            refreshItemsPlayer = true;
                        }
                    }
                    if (refreshItemsPlayer) {
                        SetLore(item, player);
                    }
                }
            }
        }
    });
    if (playerHand.name != "") {
        let playerHandInformation = upgradeItem(playerHand);
        if (playerHandInformation.boolean) {
            if (playerHandInformation.type == "Weapon") {
                if (parseInt(playerHandInformation.gemtype) == 3) {
                    itemDurableRepair(playerHand, player);
                }
                let DescriptionText = ReturnToNormalLore(playerHand, player);
                let itemNbt = JSON.parse(playerHand.getNbt().toString());
                let Lore2 = itemNbt.tag.display.Lore;
                for (let i = 0; i < DescriptionText.length - 3; i++) {
                    if (Lore2[i] != DescriptionText[i]) {
                        refreshItemsPlayer = true;
                    }
                }
                if (refreshItemsPlayer) {
                    SetLore(playerHand, player);
                }
            }
        }
    }
    if (refreshItemsPlayer) {
        player.refreshItems();
    }
}

/**
 * 版本更新自动更新配置文件.
 */
function versionUpdateModifyProfile() {
    let UPConfig = false;
    //017版本更新
    if (ConfigJson.seckilltopvp == undefined) {
        ConfigJson.seckilltopvp = true;
        UPConfig = true;
    }
    //018版本更新
    if (ConfigJson.seckilltopve == undefined) {
        ConfigJson.seckilltopve = true;
        UPConfig = true;
    }
    //019版本更新
    if (ConfigJson.seckillWhiteList == undefined) {
        ConfigJson.seckillWhiteList = ["minecraft:ender_dragon"];
        UPConfig = true;
    }
    //020版本更新
    if (ConfigJson.RSProbability == undefined) {
        ConfigJson.RSProbability = 15;
        ConfigJson.ESProbability = 10;
        UPConfig = true;
    }
    //024版本更新
    if (ConfigJson.ItemUpgrade == undefined) {
        ConfigJson.ScrollUpgrade = {
            "twoReelProbability": 40,
            "threeReelProbability": 30,
            "fourReelProbability": 20,
            "fiveReelProbability": 10
        }
        ConfigJson.ItemUpgrade = {
            "zeroItemUpgrade": 40,
            "oneItemUpgrade": 30,
            "twoItemUpgrade": 20,
            "threeItemUpgrade": 10,
            "fourItemUpgrade": 5
        }
        delete ConfigJson.RSProbability;
        delete ConfigJson.ESProbability;
        UPConfig = true;
    }
    if (ConfigJson.RSProbability != undefined) {
        delete ConfigJson.RSProbability;
        delete ConfigJson.ESProbability;
        UPConfig = true;
    }
    //025版本更新
    if (ConfigJson.BlockReelDropList == undefined) {
        ConfigJson.BlockReelDropList = {
            "minecraft:stone": {
                "DropRange": 1,
                "MaximumRandomNumber": 1000
            }
        }
        ConfigJson.EntityGemDropList = {
            "minecraft:zombie": {
                "DropRange": 1,
                "MaximumRandomNumber": 1000
            }
        }
        ConfigJson.durableGemsFall = false;
        delete ConfigJson.SProbability;
        delete ConfigJson.GProbability;
        UPConfig = true;
    }
    //026版本更新
    if (JSON.stringify(StrengthenItemsJson).indexOf('\\n') != -1) {
        File.writeTo(pluginPath + "data/EquipmentData.json", JSON.stringify(StrengthenItemsDefaultJson, null, "\t"));
        setTimeout(() => {
            log(i18n.trl(ll.language, "026UPLog", []));
        }, 1000 * 5);
    }
    if (UPConfig) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigJson, null, "\t"));
    }
}

ll.export(generateNewNbt, "generateNewNbt");


/**
 * 更新记录
 * 002:
 * *修改终极武器名称，方便匹配多语言.
 * *护具类新增获得额外经验效果，修改装备描述.
 * 003:
 * *修改武器伤害为额外伤害是真实伤害，修改武器描述.
 * *增加武器技能.
 * 004:
 * *新增宝石系统.
 * 015：
 * *修复附魔装备强化被清除附魔.
 * *新增耐久宝石，完善指令系统.
 * 016:
 * 增加配置文件，可修改各种几率以及可强化物品.
 * 新增OP指令，可在游戏内添加可强化物品.
 * 017：
 * 完善指令,新增一击必杀用于pvp开关.
 * 新增共享函数，支持其他插件生成卷轴.
 * 使用玩家真实名称，避免和其他插件冲突.
 * 018:
 * 新增一击必杀用于pve的开关
 * 019:
 * 新增一击必杀对生物类型白名单，白名单生物不会触发.
 * 020：
 * 新增卷轴合成几率和装备使用卷轴强化成功几率.
 * 修复游戏内指令说明英文的问题.
 * 添加装备时增加名称显示.
 * 021
 * 修复020版本强化成功吞装备的严重BUG.
 * 完善成功提示.
 * 022
 * 修复一击必杀的判定BUG.
 * 023
 * 屏蔽弹射物伤害触发相关技能.
 * 024
 * 卷轴相关强化几率细分化
 * 025
 * 完善配置文件.
 * 支持腐竹自定义卷轴和宝石掉落的概率和对象.
 * 限制宝石放入投掷器的数量，避免崩服.
 * 设置获取额外的经验技能cd，cd时间为5s，减少重复几率.
 * 耐久宝石加入配置文件可选择是否掉落.
 * 026
 * 修复新增装备记录的标准类型名错误的问题.
 * 027
 * 修复耐久宝石导致的报错.
 * 修复重置物品耐久判断的问题.
 * 新增繁体中文.
 * 028
 * 支持批量添加物品.
 * 加入破坏方块校验,避免和其他插件的冲突.
 * 完善cc指令输出内容.
 * 029
 * 玩家打开投掷器时进行校验,避免卡BUG.
 */

/**
 * 待修复BUG
 * 死亡掉落情况下玩家血量可能会出现bug.
 * 
 * ---------------------
 * 
 * 待增加功能
 * 对弓箭等远程武器加强.
 */