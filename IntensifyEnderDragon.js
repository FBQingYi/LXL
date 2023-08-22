/**
 * 插件信息定义.
 */
const pluginName = "IntensifyEnderDragon";
const PluginsIntroduction = '强化末影龙!';
const pluginPath = "./plugins/IntensifyEnderDragon/";
const PluginsVersion = [1, 1, 3];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const ConfigDataJson = {
    "BasicSettings": {
        "DockingGives": false, //对接gives
        "DockingIntensify": false, //对接Intensify
        "DockingIntensifyMonster": false, //对接IntensifyMonster
        "MinAttackersQuantity": 1 //打龙时在末地最小玩家数量（仅生存模式）
    },
    "StageEvolution": { //每阶段数据
        "MaxStageEvolution": 2, //总阶段数
        "StageEvolutionData": [
            {
                "check": 1,//第1阶段
                "StageEvolutionName": "第一阶段", //阶段提示名称
                "Health": 600, //末影龙血量
                "EnterHealth": 100,//多少血量进入此阶段
                "NumberPlayersAddHealth": 100, //每多一个玩家增加的额外血量（进第一阶段时的玩家数量）
                "DoesReturnBlood": true, //此阶段是否恢复生命值
                "DragonReturnTime": 10, //末影龙每几秒回血一次
                "DragonReturnhpr": 2, //每次回血回多少
                "AdditionalDamage": 1, //玩家受到末影龙伤害时额外的真实伤害
                "ShareDamageDistance": 10, //共享伤害范围半径，以受伤玩家为中心
                "ImmuneToRangedDamage": true, //是否免疫远程伤害
                "ExplosiveDamage": false,//是否受到爆炸伤害
                "Thunderbolt": true, //玩家是否挨雷劈
                "RevivalCrystal": false, //复活末影水晶
                "RevivalCrystalTime": 100, //复活时间（单位s）
                "scale": 1,//此阶段模型大小
                "ItemsThatCanCauseDamage": [ //此阶段可以对末影龙造成伤害的物品
                    "minecraft:netherite_sword"
                ],
                "SkillsAtThisStage": [ //此阶段的技能（就是下面配置文件的key）
                    "BuffData",
                    "TakeOff",
                    "Scabbing"
                ],
                "SummonedCreature": {
                    "Switch": true, //是否启用召唤生物(末影龙阶段切换时召唤)
                    "ENtityData": [
                        {
                            "type": "ordinary", //模式-原版生物
                            "entityType": "minecraft:zombie", //生物的标准类型名
                            "callNumber": 5 //召唤数量
                        },
                        {
                            "type": "intensify", //模式-强化生物
                            "entityType": "minecraft:zombie", //生物的标准类型名
                            "entityUniqueName": "zombie1", //强化生物配置文件里的唯一Uname
                            "callNumber": 5 //召唤数量
                        }
                    ]
                }
            },
            {
                "check": 2,//第2阶段
                "StageEvolutionName": "第二阶段", //阶段提示名称
                "Health": 1200, //末影龙血量
                "EnterHealth": 200,//多少血量进入此阶段
                "NumberPlayersAddHealth": 200, //每多一个玩家增加的额外血量（进第一阶段时的玩家数量）
                "DoesReturnBlood": true, //此阶段是否恢复生命值
                "DragonReturnTime": 5, //末影龙每几秒回血一次
                "DragonReturnhpr": 2, //每次回血回多少
                "AdditionalDamage": 5, //玩家受到末影龙伤害时额外的真实伤害
                "ShareDamageDistance": 20, //共享伤害范围半径，以受伤玩家为中心
                "ImmuneToRangedDamage": false, //是否免疫远程伤害
                "ExplosiveDamage": false,//是否受到爆炸伤害
                "Thunderbolt": true, //玩家是否挨雷劈
                "RevivalCrystal": true, //复活末影水晶
                "RevivalCrystalTime": 100, //复活时间（单位s）
                "scale": 1,//此阶段模型大小
                "ItemsThatCanCauseDamage": [ //此阶段可以对末影龙造成伤害的物品
                    "minecraft:netherite_sword"
                ],
                "SkillsAtThisStage": [ //此阶段的技能（就是下面配置文件的key）
                    "BuffData",
                    "Explosion",
                    "TakeOff",
                    "Disarm",
                    "Scabbing",
                    "Brambles",
                    "BloodReturning"
                ],
                "SummonedCreature": {
                    "Switch": true, //是否启用召唤生物(末影龙阶段切换时召唤)
                    "ENtityData": [
                        {
                            "type": "ordinary", //模式-原版生物
                            "entityType": "minecraft:zombie", //生物的标准类型名
                            "callNumber": 20 //召唤数量
                        },
                        {
                            "type": "intensify", //模式-强化生物
                            "entityType": "minecraft:zombie", //生物的标准类型名
                            "entityUniqueName": "zombie1", //强化生物配置文件里的唯一Uname
                            "callNumber": 10 //召唤数量
                        }
                    ]
                }
            }
        ]
    },
    "BuffData": { //技能-随机给玩家deBUFF
        "RandomDebuff": true, //是否启用随机DeBuff
        "RandomDebuffProbability": 10, //随机给debuff的概率
        "CycleTime": 20,//循环时间（s）
        "DebuffArray": [ //buff数据
            {
                "BuffId": 2, //buff的数字id
                "BuffLvl": 3, //buff的等级
                "BuffTime": 20, //buff的持续时间（单位s）
                "weight": 10 //此配置的权重
            },
            {
                "BuffId": 4, //buff的数字id
                "BuffLvl": 3, //buff的等级
                "BuffTime": 20, //buff的持续时间（单位s）
                "weight": 20 //此配置的权重
            }
        ]
    },
    "Explosion": { //技能-随机给玩家制造爆炸
        "ExplosionSwitch": true, //随机爆炸是否开启
        "ExplosiveDamageBlock": false, //随机爆炸是否破坏方块
        "RandomExplosionProbability": 40, //随机爆炸概率
        "CycleTime": 20,//循环时间（s）
        "ExplosivePower": 5, //爆炸威力
        "ExplosionRadius": 10, //爆炸半径
        "ExplosiveCountDown": 10 //收到提示后多少秒爆炸
    },
    "TakeOff": { //技能-随机给玩家体验高空跳伞
        "TakeOffSwitch": true, //玩家随机起飞是否开启
        "CycleTime": 20,//循环时间（s）
        "RandomTakeoffProbability": 10, //随机起飞概率
        "TakeOffRange": 20, //起飞范围半径，以末影龙为中心
        "TakeoffAltitude": 30, //起飞高度，玩家Y轴增加
        "SlowFallingTime": 20 //起飞后漂浮buff的时长
    },
    "Disarm": { //技能-随机解除玩家的手持物品
        "DisarmSwitch": true, //解除武器是否开启
        "IntensifyEffective": true, //是否对强化插件的物品生效
        "DisarmingProbability": 1, //解除武器触发概率
        "DropOffset": { //被解除武器后物品生成的相对玩家位置
            "x": 3,
            "z": 2
        }
    },
    "Scabbing": { //技能-随机让玩家坦诚相见
        "ScabbingSwitch": true, //玩家被攻击是否消耗护甲额外耐久
        "IntensifyEffective": false, //是否对强化插件的物品生效
        "ArmorProbability": 10, //消耗装备耐久的概率
        "SingleReductionDamage": 2 //单次额外消耗的耐久
    },
    "Brambles": {//技能-荆棘，受到攻击随机返回真伤
        "BramblesSwitch": true, //是否开启真伤荆棘
        "Probability": 20,//随机概率
        "Percentage": 20//返回受到伤害的百分之几(无减免的数据S)
    },
    "BloodReturning": {//技能-随机时间段内被攻击回血
        "Duration": 20,//持续时间（s）
        "CycleTime": 200,//循环时间（s）
        "Probability": 20,//随机概率
        "Restore": 30//每次被攻击恢复量
    },
    "AreaAttack": {//技能-路径范围攻击
        "AreaAttackSwitch": true, //是否开启范围路径攻击
        "WarningParticles": "",//预警粒子
        "HarmfulParticles": "",//伤害粒子
        "ScopeMethod": {//选中方式
            "Circular": {//圆形范围
                "MaxDistance": 10,//最大半径
                "DamageAmount": 30//单个玩家受到的伤害量
            },
            "StraightLine": {//直线范围
                "MaxDistance": 10,//路径最大距离
                "DamageAmount": 40//单个玩家受到的伤害量
            }
        }
    },
    "Trophy": [ //根据伤害排名来给奖励
        { //第一名奖励
            "check": 1,//第一名奖励
            "Exp": 10000, //奖励经验数量
            "Economy": { //经济项
                "EconomyName": "llmoney", //经济核心
                "Economy": 10000, //奖励经济数量
                "Describe": "金币"
            },
            "Intensify": { //对接强化插件奖励
                "Reel": { //卷轴项
                    "Stacking": false, //卷轴是否可堆叠（请谨慎，如果不可堆叠请填写false）
                    "ReelData": [
                        {
                            "ReelLvl": 1,
                            "Number": 10
                        },
                        {
                            "ReelLvl": 2,
                            "Number": 5
                        }
                    ]
                },
                "Gem": { //宝石项
                    "Stacking": false, //宝石是否可堆叠（请谨慎，如果不可堆叠请填写false）
                    "Data": [
                        {
                            "Name": "powergem",
                            "Number": 10
                        }
                    ]
                },
                "FragmentsGodStones": { //神器石碎片项
                    "Stacking": false, //神器石碎片是否可堆叠（请谨慎，如果不可堆叠请填写false）
                    "Data": [
                        {
                            "Name": "神一级石碎片",
                            "Number": 10
                        }
                    ]
                }
            },
            "Item": [ //物品奖励
                {
                    "Spoils": "ordinary", //原版物品
                    "SpoilsTypeName": "minecraft:stone", //物品标准类型名
                    "SpoilsqQantity": 1 //获得的数量
                },
                {
                    "Spoils": "gives", //对接gives获得的物品
                    "SpoilsTypeName": "minecraft:wooden_sword", //物品标准类型名
                    "DisplayName": "", //物品显示名称，""时为不设置
                    "SpoilsqQantity": 1, //获得的数量
                    "Lore": ["来自末地的神剑", "因击杀末影龙获得"],
                    "Curse": {
                        "Enchantments": [ //附魔数据
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
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigDataJson, null, "\t"));
}

let Config = JSON.parse(File.readFrom(pluginPath + "Config.json").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""));

let GivesApi, GetReelApi, GetFragmentsApi, GetGemApi, SpawnEntityApi;
let SkillBuffData, SkillExplosion, SkillTakeOff, SkillBloodReturning
let StageRecord = {};
let InjuryRecordData = {};
let ProhibitAttackPhase = false;
let OverallSituationEnderDragon;

/**
 * 语言文件写入及加载.
 */
i18n.load(pluginPath + "language/language.json", "en", {
    "zh_CN": {
        "Intensify_load_err": "强化插件加载出错,已默认关闭对接强化插件.",
        "Gives_load_err": "Gives插件加载出错,已默认关闭对接gives插件.",
        "IntensifyMonster_load_err": "强化生物插件加载出错,已默认关闭对接强化生物插件.",
        "ExplosionTips": "即将在:\n{0}处发生爆炸",
        "DisarmTips": "§4缴械：§3{0}\n掉落位置：{1}",
        "BloodReturningTips_enter": "末影龙触发了神灵的庇佑，现阶段攻击一次他将恢复{0}生命值",
        "BloodReturningTips_exit": "神灵庇佑结束了，可以正常攻击了",
    },
    "en": {}
});

/**
 * 判断是否需要加载前置插件.
 */
if (Config.DockingGives) {
    if (ll.require("gives.js")) {
        GivesApi = ll.import("NewItemNbt");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("Gives_load_err", ll.language));
            Config.DockingGives = false;
        }, 1000 * 5);
    }
}
if (Config.DockingIntensify) {
    if (ll.require("Intensify.js")) {
        GetReelApi = ll.import("intensify", "reel");
        GetGemApi = ll.import("intensify", "gem");
        GetFragmentsApi = ll.import("intensify", "fragments");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("Intensify_load_err", ll.language));
            Config.DockingIntensify = false;
        }, 1000 * 5);
    }
}
if (Config.DockingIntensifyMonster) {
    if (ll.require("IntensifyMonster.js")) {
        SpawnEntityApi = ll.import("intensifyMonster", "spawn");
    } else {
        setTimeout(() => {
            logger.error(i18n.get("IntensifyMonster_load_err", ll.language));
            Config.DockingIntensifyMonster = false;
        }, 1000 * 5);
    }
}

function OnMobHurt(mob, source, damage, cause) {
    let intercept = true;
    if (mob.type == "minecraft:ender_dragon") {
        OverallSituationEnderDragon = mob;
        //判断末影龙是否有阶段记录，没有则重置为初始阶段.
        if (StageRecord[mob.uniqueId] == undefined) {
            StageRecord[mob.uniqueId] = -1;
        }
        //判断伤害是否无来源或者是荆棘伤害
        if (source == undefined && cause == 18) {
            intercept = false;
        } else {
            let terminusPlayer = Query.GetTerminusPlayerArray();
            //判断末地人数是否能够攻击
            if (terminusPlayer.length < Config.BasicSettings.MinAttackersQuantity) {
                intercept = false;
            } else {
                //判断是否是最后阶段
                if (StageRecord[mob.uniqueId] + 1 <= Config.StageEvolution.MaxStageEvolution) {
                    //获取下一阶段切换血量
                    let nextStageHealth = Config.StageEvolution.StageEvolutionData[StageRecord[mob.uniqueId] + 1].EnterHealth;
                    //判断生命值是否可以进入下一阶段
                    if (mob.health < nextStageHealth) {
                        PhaseSwitching(mob, Config.StageEvolution.StageEvolutionData[StageRecord[mob.uniqueId] + 1]);
                    }
                }

            }
        }
    }
    return intercept;
}


function PhaseSwitching(entity, nextStageData) {
    //配置文件同阶段判断
    if (StageRecord[mob.uniqueId] + 1 == nextStageData.check) {

    }
}






/**
 * 查询集合
 */
const Query = {
    /**
     * 查询在末地的玩家列表.
     * @returns 在末地的非OP玩家对象数组
     */
    GetTerminusPlayerArray: function () {
        let TerminusPlayerArray = [];
        let AllOnlinePlayer = mc.getOnlinePlayers();
        AllOnlinePlayer.forEach(player => {
            if (!player.isSimulatedPlayer() && !player.isOP()) {
                TerminusPlayerArray.push(player);
            }
        });
        return TerminusPlayerArray;
    },
    /**
    * 判断物品是否是强化物品.
    * @param {Item} item 物品对象
    * @returns 布尔值
    */
    IsIntensify: function (item) {
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
    }
}

/**
 * 技能集合
 */
const Skill = {
    /**
     * 随机设置玩家的DEBUFF.
     */
    SetPlayerDEBuff: function () {
        if (Config.BuffData.RandomDebuff) {
            if (SkillBuffData == undefined) {
                SkillBuffData = setInterval(() => {
                    let PlayerArray = Query.GetTerminusPlayerArray();
                    PlayerArray.forEach(player => {
                        let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
                        let ConRandomNumbers = Config.BuffData.RandomDebuffProbability;
                        if (ConRandomNumbers >= RandomNumber) {
                            let BuffData = QingYi.WeightCalculation(Config.BuffData.DebuffArray);
                            if (BuffData != undefined) {
                                player.addEffect(BuffData.BuffId, BuffData.BuffTime * 20, BuffData.BuffLvl, false);
                            }
                        }
                    });

                }, Config.BuffData.CycleTime);
            } else {
                clearInterval(SkillBuffData);
                setTimeout(() => {
                    this.SetPlayerDEBuff();
                }, 10);
            }
        }
    },
    /**
     * 在末地随机地方制造爆炸.
     */
    SetExplosion: function () {
        if (Config.Explosion.ExplosionSwitch) {
            if (SkillExplosion == undefined) {
                SkillExplosion = setInterval(() => {
                    let PlayerArray = Query.GetTerminusPlayerArray();
                    let ExplosionLocation = "";
                    PlayerArray.forEach(player => {
                        let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
                        let ConRandomNumbers = Config.Explosion.RandomExplosionProbability;
                        if (ConRandomNumbers >= RandomNumber) {
                            ExplosionLocation += `${parseInt(player.pos.x)}-${parseInt(player.pos.y)}-${parseInt(player.pos.z)}\n`
                            setTimeout(() => {
                                mc.explode(player.pos, OverallSituationEnderDragon, Config.Explosion.ExplosivePower, Config.Explosion.ExplosionRadius, Config.Explosion.ExplosiveDamageBlock, false);
                            }, Config.Explosion.ExplosiveCountDown);
                        }
                    });
                    if (ExplosionLocation != "") {
                        QingYi.SetTerminusPlayerMes(PlayerArray, i18n.trl(ll.language, "ExplosionTips", ExplosionLocation));
                    }
                }, Config.Explosion.CycleTime);
            } else {
                clearInterval(SkillExplosion);
                setTimeout(() => {
                    this.SetExplosion();
                }, 10);
            }
        }
    },
    /**
     * 随机将玩家传送到高空.
     */
    SetTakeOff: function () {
        if (Config.TakeOff.TakeOffSwitch) {
            if (SkillTakeOff == undefined) {
                SetTakeOff = setInterval(() => {
                    let PlayerArray = Query.GetTerminusPlayerArray();
                    PlayerArray.forEach(player => {
                        if (OverallSituationEnderDragon.distanceTo(player.pos) <= Config.TakeOff.TakeOffRange) {
                            let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
                            let ConRandomNumbers = Config.TakeOff.RandomTakeoffProbability;
                            if (ConRandomNumbers >= RandomNumber) {
                                player.addEffect(24, Config.TakeOff.SlowFallingTime * 20, 2, false);
                                player.teleport(player.pos.x, player.pos.y + Config.TakeOff.TakeoffAltitude, player.pos.z, player.pos.dimid);
                            }
                        }
                    });
                }, Config.TakeOff.CycleTime)
            } else {
                clearInterval(SkillTakeOff);
                setTimeout(() => {
                    this.SetTakeOff();
                }, 10);
            }
        }
    },
    /**
     * 随机将玩家手持物品丢弃到地上.
     * @param {Player} player 玩家对象
     */
    SetDisarm: function (player) {
        if (Config.Disarm.DisarmSwitch) {
            let PlayerHandItem = player.getHand();
            let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
            let ConRandomNumbers = Config.Disarm.DisarmingProbability;
            if (ConRandomNumbers >= RandomNumber) {
                let DropOffsetX = Config.Disarm.DropOffset.x;
                let DropOffsetZ = Config.Disarm.DropOffset.z;
                if (!Config.Disarm.IntensifyEffective) {
                    if (!Query.IsIntensify(PlayerHandItem)) {
                        if (mc.spawnItem(PlayerHandItem, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                            player.tell(i18n.trl(player.langCode, "DisarmTips", PlayerHandItem.name, `${parseInt(player.pos.x) + DropOffsetX},${parseInt(player.pos.y)},${parseInt(player.pos.z) + DropOffsetZ}`));
                            PlayerHandItem.setNull();
                        }
                    }
                } else {
                    if (mc.spawnItem(PlayerHandItem, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                        player.tell(i18n.trl(player.langCode, "DisarmTips", PlayerHandItem.name, `${parseInt(player.pos.x) + DropOffsetX},${parseInt(player.pos.y)},${parseInt(player.pos.z) + DropOffsetZ}`));
                        PlayerHandItem.setNull();
                    }
                }
            }
            player.refreshItems();
        }
    },
    /**
     * 随机减少玩家护甲耐久（从头盔开始，每次只争对一件装备）.
     * @param {Player} player 玩家对象
     */
    SetScabbing: function (player) {
        if (Config.Scabbing.ScabbingSwitch) {
            let PlayerArmor = player.getArmor().getAllItems();
            for (let i in PlayerArmor) {
                let item = PlayerArmor[i];
                if (!item.isNull()) {
                    let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
                    let ConRandomNumbers = Config.Scabbing.ArmorProbability;
                    if (ConRandomNumbers >= RandomNumber) {
                        if (!Config.Scabbing.IntensifyEffective) {
                            if (!Query.IsIntensify(item)) {
                                item.setDamage(item.damage + Config.Scabbing.SingleReductionDamage);
                            }
                        } else {
                            item.setDamage(item.damage + Config.Scabbing.SingleReductionDamage);
                        }
                        player.refreshItems();
                        break;
                    }
                }
            }
        }
    },
    /**
     * 末影龙荆棘处理.
     * @param {Player} player 玩家对象
     * @param {Int} Damage 玩家造成的伤害量（护甲减免前）.
     */
    SetBrambles: function (player, Damage) {
        if (Config.Brambles.BramblesSwitch) {
            let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
            let ConRandomNumbers = Config.Brambles.Probability;
            if (ConRandomNumbers >= RandomNumber) {
                let BramblesDamage = Math.round(Damage * (Config.Brambles.Percentage / 100));
                if (InjuryRecordData[player.xuid] == undefined) {
                    InjuryRecordData[player.xuid] = 0;
                }
                InjuryRecordData[player.xuid] += BramblesDamage;
            }
        }
    },
    /**
     * 随机时间段内末影龙被攻击回血.
     */
    SetBloodReturning: function () {
        if (SkillBloodReturning == undefined) {
            SetBloodReturning = setInterval(() => {
                let RandomNumber = QingYi.GetRandomNum(0, 100, 4);
                let ConRandomNumbers = Config.BloodReturning.Probability;
                if (ConRandomNumbers >= RandomNumber && !ProhibitAttackPhase) {
                    ProhibitAttackPhase = true;
                    QingYi.SetTerminusPlayerMes(Query.GetTerminusPlayerArray(), i18n.trl(ll.language, "BloodReturningTips_enter", Config.BloodReturning.Restore));
                    setTimeout(() => {
                        ProhibitAttackPhase = false;
                        QingYi.SetTerminusPlayerMes(Query.GetTerminusPlayerArray(), i18n.get("BloodReturningTips_exit", ll.language));
                    }, Config.BloodReturning.Duration);
                }
            }, Config.BloodReturning.CycleTime);
        } else {
            clearInterval(SkillBloodReturning);
            setTimeout(() => {
                this.SetBloodReturning();
            }, 10);
        }
    }




    ,
    /**
     * 在无法攻击阶段被攻击增加生命值处理.
     */
    SetEnderDragonAddHealth: function () {
        if (ProhibitAttackPhase) {
            let entity = OverallSituationEnderDragon;
            let addHealth = Config.BloodReturning.Restore;
            if (addHealth != 0) {
                if (entity.health < entity.maxHealth) {
                    if (entity.maxHealth - entity.health > addHealth) {
                        entity.setHealth(entity.health + addHealth);
                    } else {
                        entity.setHealth(entity.maxHealth);
                    }
                }
            }
        }
    },
    /**
     * 对玩家造成数据文件中的伤害.
     * @param {Player} player 玩家对象.
     */
    SetPlayerTrueInjury: function (player) {
        setTimeout(() => {
            if (InjuryRecordData[player.xuid] != 0) {
                playerHurt(player.xuid, InjuryRecordData[player.xuid]);
            }
        }, 100);
    }
}



/**
 * 个人通用代码段
 */
const QingYi = {
    /**
     * 获取随机数（支持小数）
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @param {Integer} decimal 小数位数
     * @returns 随机数
     */
    GetRandomNum: function (min = 0, max = 100, decimal = 0) {
        if (ConfigJson.randomNumber.DecimalsSupported) {
            decimal = ConfigJson.randomNumber.Decimals;
        }
        let min_z = Math.trunc(min);
        let max_z = Math.trunc(max);
        let min_x = isNaN(this.GetDecimalNum(min)) ? 0 : this.GetDecimalNum(min);
        let max_x = isNaN(this.GetDecimalNum(max)) ? 0 : this.GetDecimalNum(max);
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
    GetDecimalNum: function (data) {
        return Number(data.toString().split('.')[1]);
    },
    /**
     * 选中随机的buff
     * @param {Array} Array 配置的buff数组
     * @returns 选中的buff数据
     */
    WeightCalculation: function (Array) {
        let totalWeight = Array.reduce((acc, buff) => acc + buff.weight, 0);
        let randomNum = Math.random() * totalWeight;
        let currentWeight = 0;
        let selectedBuff = null;
        for (let buff of Array) {
            currentWeight += buff.weight;
            if (randomNum <= currentWeight) {
                selectedBuff = buff;
                break;
            }
        }
        return selectedBuff;
    },
    /**
     * 给在末地的玩家发送消息
     * @param {Array} TerminusPlayer 在末地的玩家对象数组
     * @param {string} Mes 消息内容
     */
    SetTerminusPlayerMes: function (TerminusPlayer, Mes) {
        TerminusPlayer.forEach(player => {
            player.tell(Mes);
        });
    }
}

/**
 * 对应版本的代码
 * 2.14.1
 * 对指定玩家造成伤害.
 */
function playerHurt(xuid, hurt) {
    let allEntity = mc.getAllEntities();
    for (let i in allEntity) {
        let entity = allEntity[i];
        if (entity.isPlayer()) {
            let player2 = entity.toPlayer();
            if (xuid == player2.xuid) {
                entity.hurt(hurt, 2);
                break;
            }
        }
    }
}

/**
 * 002
 * 修复未获取到玩家对象导致的报错.
 * 尝试修复末影龙死亡时遇到插件回血触发的bug.
 * 003
 * 修复随机buff，碎甲，去你武器未判定伤害的bug.
 * 004
 * 新增击杀给予经济奖励.支持计分板和llmoney.
 * 005
 * 修复有空格名称的玩家收不到相关buff.
 * 彻底修复起飞，爆炸出现主世界玩家的情况.
 * 尝试修复第二条龙无奖励的问题.
 * 移除不可用的debuff.
 * 006
 * 修复增加玩家llmoney经济出现的错误.
 * 007
 * 适配新版强化装备插件.
 * 移除多余语言文件. 
 * 008
 * 尝试屏蔽荆棘伤害处理.
 * 009
 * 适配新的爆炸api.
 * 0010
 * 拦截荆棘伤害.
 * 011
 * 随机数支持4位小数.
 * 适配最新版强化插件.
 * 解除限制末影龙位置,避免出现末影龙消失.
 * 012
 * 修复制造爆炸时获取的玩家对象出错导致的报错.
 * 013
 * 修复屏蔽荆棘伤害时没做判断.
 * 113
 * 插件重构
 * 
 * 待修复bug
 */