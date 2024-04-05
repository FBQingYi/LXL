//-----基础信息定义
const pluginName = "CustomFishing";
const PluginsIntroduction = '自定义钓鱼!';
const pluginPath = "./plugins/CustomFishing/";
const PluginsVersion = [0, 1, 1];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const itemDataJson = {
    "物品1": {//此项配置名称，不可重复。
        "Type": "item",//此项配置类型，目前支持"item"，"llmoney"，"exp"，"buff"
        "itemType": "minecraft:emerald",//给予的物品标准类型名
        "probability": 0.0001,//钓上来的几率
        "minimum": 1,//给予的最少数量
        "maximum": 3,//给予的最大数量
        "damage": 0,//物品的耐久值，0为满耐久，1为消耗一点依此类推
        "sound": ""//钓上来时播放的音乐
    },
    "物品2": {
        "Type": "item",
        "itemType": "minecraft:wooden_sword",
        "probability": 0.0001,
        "minimum": 1,
        "maximum": 1,
        "damage": 0,
        "sound": "",
        "gives": {//对接gives插件
            "state": false,//是否开启
            "name": "空军木剑",//显示名称
            "data": [
                {
                    "n": "9",//附魔id
                    "l": "20"//附魔等级
                }
            ]
        }
    },
    "物品3": {
        "Type": "reel",
        "lvl": 1,
        "probability": 0.0001,
        "sound": ""
    },
    "物品4": {
        "Type": "gem",
        "itemType": "vampiregem",//宝石名称
        "probability": 0.0001,
        "minimum": 1,
        "maximum": 1,
        "sound": ""
    },
    "物品5": {
        "Type": "fragments",
        "itemType": "神一级石碎片",
        "probability": 0.0001,
        "minimum": 1,
        "maximum": 1,
        "sound": ""
    },
    "经济1": {
        "Type": "llmoney",//此项配置类型
        "probability": 0.0001,
        "minimum": 10,
        "maximum": 300,
        "sound": ""
    },
    "经验1": {
        "Type": "exp",
        "probability": 0.0001,
        "minimum": 10,
        "maximum": 300,
        "sound": ""
    },
    "buff1": {
        "Type": "buff",//此项配置类型
        "buffID": 1,//buff的数字id
        "probability": 0.0001,
        "buffTime": 10,//buff持续时间
        "buffLvl": 1,//buff等级
        "display": "测试显示",//提示时显示的名称
        "sound": ""
    }
};
const configJson = {
    "enableScope": false,
    "gives": false,
    "DockingIntensify": false,
    "economicType": "llmoney",
    "version": "0.0.3",
    "rarity": {//处理海之眷顾
        "rare": [//稀有物品
            0,//权重起始值(不包含此值物品)
            1,//权重结束值（包含此值物品）
            1//权重每级增加百分比
        ],
        "ordinary": [//普通物品
            1.1,
            30,
            1//权重每级减少百分比
        ],
        "waste": [//垃圾物品
            30.1,
            100,
            9//权重每级减少百分比
        ]
    },
    "coordinateData": [
        {
            "pos1": [
                1,
                60,
                1
            ],
            "pos2": [
                100,
                600,
                100
            ],
            "singleCost": 1000,
            "itemList": [
                "物品1",
                "物品2"
            ]
        }
    ]
};

i18n.load(pluginPath + "language/language.json", "zh_CN", {
    "zh_CN": {
        "moneyTips": "§3你获得了{0} 金币",
        "expTips": "§3你获得了{0} 经验值",
        "buffTips": "§3你获得了 {0} -BUFF {1} 秒",
        "errorTips": "§4你的经济不支持你在这里消费!",
        "givesErrorTips": "没找到前置插件gives!",
        "configTips": "配置文件有更新,请前往论坛查看示例注释！",
        "Intensifyerr": "未找到前置插件Intensify.js，请前往下载或者在配置文件Config.json中将DockingIntensify设置为false",
    },
    "zh_TW": {
        "moneyTips": "§3你獲得了 {0} 金幣",
        "expTips": "§3你獲得了 {0} 經驗值",
        "buffTips": "§3你獲得了 -BUFF {0} {1} 秒",
        "errorTips": "§4你的經濟不支持你在這裡消費！",
        "givesErrorTips": "找不到依賴插件'gives'",
        "configTips": "配置文件已更新。請在論壇中檢查示例評論！",
        "Intensifyerr": "未找到前置挿件Intensify.js,請前往下載或者在設定檔Config.json中將DockingIntensify設定為false",
    },
    "en": {
        "moneyTips": "§3You got {0} coins",
        "expTips": "§3You got {0} experience points",
        "buffTips": "§3You got -BUFF {0} for {1} seconds",
        "errorTips": "§4Your economy is too low to shop here!",
        "givesErrorTips": "Cannot find the dependency plugin 'gives'",
        "configTips": "The configuration file has been updated. Please check the example comments on the forum!",
        "Intensifyerr": "The front-end plug-in Intensify.js is not found. Please go to download it or set DockingIntensify to false in the configuration file Config.json",
    }
});

if (!File.exists(pluginPath + "itemData.json")) {
    File.writeTo(pluginPath + "itemData.json", JSON.stringify(itemDataJson, null, "\t"));
}
if (!File.exists(pluginPath + "config.json")) {
    File.writeTo(pluginPath + "config.json", JSON.stringify(configJson, null, "\t"));
}

let itemData = JSON.parse(File.readFrom(pluginPath + "itemData.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));
let config = JSON.parse(File.readFrom(pluginPath + "config.json"));
let probabilityArray = [];
let GuardianWeight = {};
let GetNewItemNbt, getReelNbt, getFragmentsNbt, getgemNbt, LIGHTMoney;

/**
 * 查询类
 */
const query = {
    /**
     * 获取所有范围.
     * @returns 查询结果
     */
    getAllRange: function () {
        let scopeRecord = [];
        config.coordinateData.forEach(data => {
            scopeRecord.push({
                "pos1": data.pos1,
                "pos2": data.pos2
            });
        });
        return scopeRecord;
    },
    /**
     * 获取区域所有配置权重.
     * @param {Array} itemList 范围内的配置项目
     * @returns 查询到的权重数据.
     */
    getRegionalItemWeight: function (itemList) {
        let returnData = [];
        for (let key in itemData) {
            if (itemList.includes(key)) {
                let probability = itemData[key].probability;
                returnData.push({
                    "name": key,
                    "weight": probability
                })
            }
        }
        return returnData;
    },
    /**
    * 获取所有配置权重
    */
    probability: function () {
        for (let key in itemData) {
            let probability = itemData[key].probability;
            probabilityArray.push({
                "name": key,
                "weight": probability
            })
        }
    },
    /**
     * 获取随机项目
     * @param {Array} items 权重数据
     * @returns 选择的权重文件
     */
    getRandomItem: function (items) {
        let totalWeight = 0;
        for (let i = 0; i < items.length; i++) {
            totalWeight += parseFloat(items[i].weight);
        }
        const rand = Math.random() * totalWeight;
        let cumulativeWeight = 0.0;
        for (let i = 0; i < items.length; i++) {
            cumulativeWeight += items[i].weight;
            if (rand < cumulativeWeight) {
                return items[i];
            }
        }
    },
    /**
    * 解决小数点后数值漂移的运算.
    * @param {Number} num1 数值1
    * @param {Number} num2 数值2
    * @param {String} symbol 字符格式的运算符号
    * @returns Number
    */
    EconomicCalculation: function (num1, num2, symbol) {
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
    },
    /**
    * 判断坐标点是否在指定范围内.
    * @param {Array} point 需要判断的坐标
    * @param {Json} range 需要判断的范围
    * @returns 判断结果
    */
    isPointInRange: function (point, range) {
        let [x1, y1, z1] = range.pos1;
        let [x2, y2, z2] = range.pos2;
        let deltaX = x2 - x1;
        let deltaY = y2 - y1;
        let deltaZ = z2 - z1;
        let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
        let unitX = deltaX / length;
        let unitY = deltaY / length;
        let unitZ = deltaZ / length;
        let [x, y, z] = point;
        let proj = (x - x1) * unitX + (y - y1) * unitY + (z - z1) * unitZ;
        return proj >= 0 && proj <= length;
    },
    /**
     * 获取海之眷顾对应的权重文件.
     * @param {Int} lvl 海之眷顾等级
     * @param {Array} weightFile 现有权重文件
     * @returns NewArray新的权重文件
     */
    getConfigItemweight: function (lvl, weightFile) {
        if (GuardianWeight[`${lvl}`] == undefined) {
            let rarity = config.rarity;
            let newWeightFile = [];
            for (let key in rarity) {
                let data = rarity[key];
                for (let i = 0; i < weightFile.length; i++) {
                    let arrayData = weightFile[i];
                    let weight = arrayData.weight;
                    let name = arrayData.name;
                    if (weight > data[0] && data[1] >= weight) {
                        let finalWeight;
                        let coefficient = data[2]
                        let percentage = this.EconomicCalculation(coefficient, 100, "/");
                        let gradeRatio = this.EconomicCalculation(lvl, percentage, "*");
                        let addWeight = this.EconomicCalculation(weight, gradeRatio, "*");
                        if (key == "rare") {
                            finalWeight = this.EconomicCalculation(weight, addWeight, "+");
                        } else {
                            finalWeight = this.EconomicCalculation(weight, addWeight, "-");
                        }
                        newWeightFile.push({
                            "name": name,
                            "weight": finalWeight
                        })
                    }
                }
            }
            GuardianWeight[`${lvl}`] = newWeightFile;
            return GuardianWeight[`${lvl}`];
        } else {
            return GuardianWeight[`${lvl}`];
        }
    },
    /**
     * 查询物品的海之眷顾附魔等级.
     * @param {Item} item 物品对象
     * @returns 查询到的等级
     */
    getItemLuckOfTheSeaLvl: function (item) {
        let lvl = 0;
        let handNbt = item.getNbt();
        let handNbtTag = handNbt.getTag("tag");
        let handNbtEnch = handNbtTag.getTag("ench");
        let enchArray = JSON.parse(handNbtEnch.toString());
        enchArray.forEach(data => {
            if (data.id == 23) {
                lvl = data.lvl;
            }
        });
        return lvl;
    }
}
/**
 * 玩家应该获得的奖励
 */
const reward = {
    /**
     * 奖励类型判断
     * @param {Json} rangedItems 选中的配置
     * @param {Item} item 物品对象
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     */
    modeJudgment: function (rangedItems, item, player, entity) {
        let mode = itemData[rangedItems.name].Type;
        switch (mode) {
            case "item":
                this.givePlayerItem(rangedItems, item);
                break;
            case "llmoney":
                this.givePlayerllmoney(rangedItems, player, entity);
                break;
            case "exp":
                this.givePlayerexp(rangedItems, player, entity);
                break;
            case "buff":
                this.givePlayerbuff(rangedItems, player, entity);
                break;
            case "reel":
                this.givePlayerReel(rangedItems, player, item);
                break;
            case "gem":
                this.givePlayergem(rangedItems, player, item);
                break;
            case "fragments":
                this.givePlayerFragments(rangedItems, player, item);
                break;
        }
    },
    /**
     * 物品奖励.
     * @param {Json} rangedItems 选中的配置
     * @param {Item} item 物品对象
     */
    givePlayerItem: function (rangedItems, item) {
        let itemType = itemData[rangedItems.name].itemType;
        let itemDamage = itemData[rangedItems.name].damage;
        let randomNum = Math.floor(Math.random() * (itemData[rangedItems.name].maximum - itemData[rangedItems.name].minimum + 1) + itemData[rangedItems.name].minimum);
        let givesData = itemData[rangedItems.name].gives;
        if (config.gives && givesData != undefined && givesData.state) {
            let name = undefined;
            if (givesData.name != "") {
                name = givesData.name;
            }
            let Enchantments = {
                "Enchantments": givesData.data
            }
            let newNbt = GetNewItemNbt(mc.newItem(itemType, 1), name, Enchantments, randomNum);
            item.set(mc.newItem(newNbt, randomNum));
            item.setDamage(itemDamage);
        } else {
            item.set(mc.newItem(itemType, randomNum));
            item.setDamage(itemDamage);
        }
    },
    /**
     * 经济奖励.
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     */
    givePlayerllmoney: function (rangedItems, player, entity) {
        let randomNum = Math.floor(Math.random() * (itemData[rangedItems.name].maximum - itemData[rangedItems.name].minimum + 1) + itemData[rangedItems.name].minimum);
        Deduction(player, "add", randomNum)
        player.tell(i18n.trl(player.langCode, "moneyTips", randomNum));
        entity.remove();
    },
    /**
     * 经验值奖励.
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     */
    givePlayerexp: function (rangedItems, player, entity) {
        let randomNum = Math.floor(Math.random() * (itemData[rangedItems.name].maximum - itemData[rangedItems.name].minimum + 1) + itemData[rangedItems.name].minimum);
        player.addExperience(randomNum);
        player.tell(i18n.trl(player.langCode, "expTips", randomNum));
        entity.remove();
    },
    /**
     * buff奖励.
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Entity} entity 实体对象
     */
    givePlayerbuff: function (rangedItems, player, entity) {
        let buffID = itemData[rangedItems.name].buffID;
        let buffTime = itemData[rangedItems.name].buffTime;
        let buffLVL = itemData[rangedItems.name].buffLvl;
        player.addEffect(buffID, buffTime * 20, buffLVL, false);
        player.tell(i18n.trl(player.langCode, "buffTips", itemData[rangedItems.name].display, buffTime));
        entity.remove();
    },
    /**
     * 卷轴奖励
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Item} item 物品对象
     */
    givePlayerReel: function (rangedItems, player, item) {
        let reelItem = getReelNbt(player, itemData[rangedItems.name].lvl);
        item.set(reelItem);
    },
    /**
     * 宝石奖励
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Item} item 物品对象
     */
    givePlayergem: function (rangedItems, player, item) {
        let randomNum = Math.floor(Math.random() * (itemData[rangedItems.name].maximum - itemData[rangedItems.name].minimum + 1) + itemData[rangedItems.name].minimum);
        let gemItem = getgemNbt(player, itemData[rangedItems.name].itemType, randomNum);
        item.set(gemItem);
    },
    /**
     * 神器石碎片奖励
     * @param {Json} rangedItems 选中的配置
     * @param {Player} player 玩家对象
     * @param {Item} item 物品对象
     */
    givePlayerFragments: function (rangedItems, player, item) {
        let randomNum = Math.floor(Math.random() * (itemData[rangedItems.name].maximum - itemData[rangedItems.name].minimum + 1) + itemData[rangedItems.name].minimum);
        let newItem = getFragmentsNbt(player, itemData[rangedItems.name].itemType, randomNum);
        item.set(newItem);
    },
    /**
     * 播放提示音.
     * @param {String} music 音乐名称
     */
    playMusic: function (music, player) {
        if (music != "") {
            mc.runcmdEx(`playsound ${music} "${player.realName}"`);
        }
    }
}

/**
 * 局域模式下.
 * @param {Player} player 玩家对象
 * @param {Entity} entity 实体对象
 * @param {Item} item 物品对象
 * @returns 是否拦截
 */
function enableScopeMode(player, entity, item) {
    let enPos = entity.pos;
    let pos = [parseInt(enPos.x), parseInt(enPos.y), parseInt(enPos.z)];
    let allScope = query.getAllRange();
    for (let i = 0; i < allScope.length; i++) {
        let scope = allScope[i];
        if (query.isPointInRange(pos, scope)) {
            let itemList = config.coordinateData[i].itemList;
            let money = config.coordinateData[i].singleCost;
            if (Deduction(player, "remove", money)) {
                let WeightData = query.getRegionalItemWeight(itemList);
                let playerHand = player.getHand();
                let rangedItems;
                if (playerHand.isEnchanted) {
                    let lvl = query.getItemLuckOfTheSeaLvl(playerHand);
                    if (lvl == 0) {
                        rangedItems = query.getRandomItem(WeightData);
                    } else {
                        let newWeightFile = query.getConfigItemweight(lvl, WeightData);
                        rangedItems = query.getRandomItem(newWeightFile);
                    }
                } else {
                    rangedItems = query.getRandomItem(WeightData);
                }
                reward.modeJudgment(rangedItems, item, player, entity);
                let music = itemData[rangedItems.name].sound;
                reward.playMusic(music, player);
                break;
            } else {
                entity.remove();
                player.tell(i18n.get("errorTips", player.langCode));
                return false;
            }
        }
    }
}

/**
 * 全局模式下执行.
 * @param {*} player 玩家对象
 * @param {*} item 物品对象
 * @param {*} entity 实体对象
 */
function globalSchema(player, item, entity) {
    let playerHand = player.getHand();
    let rangedItems;
    if (playerHand.isEnchanted) {
        let lvl = query.getItemLuckOfTheSeaLvl(playerHand);
        if (lvl == 0) {
            rangedItems = query.getRandomItem(probabilityArray);
        } else {
            let newWeightFile = query.getConfigItemweight(lvl, probabilityArray);
            rangedItems = query.getRandomItem(newWeightFile);
        }
    } else {
        rangedItems = query.getRandomItem(probabilityArray);
    }
    reward.modeJudgment(rangedItems, item, player, entity)
    let music = itemData[rangedItems.name].sound;
    reward.playMusic(music, player);
}

/**
 * 玩家钓鱼事件监听及分发.
 */
mc.listen("onPlayerPullFishingHook", (player, entity, item) => {
    if (item != undefined && entity != undefined) {
        if (config.enableScope) {
            enableScopeMode(player, entity, item);
        } else {
            globalSchema(player, item, entity);
        }
    }
})

/**
 * 服务器启动完成监听
 */
mc.listen("onServerStarted",()=>{
    ExternalFunction();
})

/**
 * 操作玩家经济.
 * @param {Player} player 扣款的玩家对象
 * @param {String} mode 模式
 * @param {Int} number 金额
 * @returns 操作结果
 */
function Deduction(player, mode, number) {
    switch (mode) {
        case "add":
            if (config.economicType == "llmoney") {
                return player.addMoney(number);
            } else if (config.economicType == "lmoney") {
                return LIGHTMoney("add", number, player.xuid);
            }

        case "remove":
            if (config.economicType == "llmoney") {
                return player.reduceMoney(number);
            } else if (config.economicType == "lmoney") {
                return LIGHTMoney("remove", number, player.xuid);
            }
    }
}

/**
 * 配置文件更新.
 */
function ProfileDetection() {
    let configConfig = false;
    let itemDConfig = false;
    if (config.version == undefined) {
        config.version = "0.0.1";
        for (let key in itemData) {
            if (itemData[key].sound == undefined) {
                itemData[key].sound = "";
                itemDConfig = true;
            }
        }
        configConfig = true;
    }

    if (config.version == "0.0.1") {
        config.version = "0.0.2";
        config.gives = false;
        configConfig = true;
    }

    if (config.version == "0.0.2") {
        config.version = "0.0.3";
        for (let key in itemData) {
            if (itemData[key].Type == undefined) {
                itemData[key].Type = "item";
                itemData[key].itemType = key;
                itemData[key].damage = 0;
                itemDConfig = true;
            }
        }
        config.gives = true;
        configConfig = true;
    }
    if (config.version == "0.0.3") {
        config.version = "0.0.4";
        config.rarity = {
            "rare": [0, 1, 1],
            "ordinary": [1.1, 30, 1],
            "waste": [30.1, 100, 9]
        }
        configConfig = true;
    }

    if (config.version == "0.0.4") {
        config.version = "0.0.5";
        config.DockingIntensify = false;
        config.economicType = "llmoney";

        configConfig = true;
    }

    if (configConfig || itemDConfig) {
        setTimeout(() => {
            logger.warn(i18n.get("configTips", ll.language));
        }, 1000 * 5);
    }
    if (configConfig) {
        File.writeTo(pluginPath + "config.json", JSON.stringify(config, null, "\t"));
    }
    if (itemDConfig) {
        File.writeTo(pluginPath + "itemData.json", JSON.stringify(itemData, null, "\t"));
    }
}

//------插件信息注册
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation);
query.probability();
ProfileDetection();

/**
 * 外部函数判断导入.
 */
function ExternalFunction() {
    let allPlugins = ll.listPlugins();
    if (config.gives) {
        if (allPlugins.includes("gives")) {
            GetNewItemNbt = ll.import("NewItemNbt");
        } else {
            setTimeout(() => {
                logger.error(i18n.get("givesErrorTips", ll.language));
                Config.gives = false;
            }, 1000 * 5);
        }
    }
    
    if (config.DockingIntensify) {
        if (allPlugins.includes("Intensify")) {
            getReelNbt = ll.import("intensify", "reel");
            getFragmentsNbt = ll.import("intensify", "fragments");
            getgemNbt = ll.import("intensify", "gem");
        } else {
            setTimeout(() => {
                logger.error(i18n.get("Intensifyerr", ll.language));
                config.DockingIntensify = false;
            }, 1000 * 5);
        }
    }
    
    if (File.exists("./plugins/LIGHTMoney/LIGHTMoney.js") && config.economicType == "lmoney") {
        LIGHTMoney = ll.import("LIGHTMoney");
    }
}



/**
 * 002
 * 增加区域配置.
 * 增加音效提示.
 * 003
 * 对接gives插件.
 * 004
 * 新增经济，经验值，buff奖励类型.
 * 优化部分代码.
 * 加入语言文件.
 * 物品类型新增耐久值设置.
 * 调整配置文件.
 * 修复一个配置冲突导致的bug.
 * 005
 * 尝试修复一个跳出循环导致的bug.
 * 006
 * 支持海之眷顾附魔.
 * 对接强化插件.
 * 011
 * 适配ll3
 */
