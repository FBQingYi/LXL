/**
 * 插件信息定义.
 */
const pluginName = "IntensifyEnderDragon";
const PluginsIntroduction = '强化末影龙!';
const pluginPath = "./plugins/IntensifyEnderDragon/";
const PluginsVersion = [0, 0, 5];
const PluginsOtherInformation = { "插件作者": "清漪花开" };
const ConfigDataJson = {
    "DockingGives": false,
    "DockingIntensify": false,
    "MinAttackersQuantity": 1,
    "IntermediateStage": 600,
    "AdvancedStage": 1200,
    "LifeRatio": 0.1,
    "DragonReturnTime": 10,
    "DragonReturnhpr": 2,
    "ExplosivePower": 5,
    "ExplosionRadius": 10,
    "ExplosiveDamageBlock": false,
    "ExplosiveCountDown": 10,
    "ShareDamageDistance": 10,
    "RandomExplosionProbability": 40,
    "RandomTakeoffProbability": 10,
    "TakeOffRange": 20,
    "TakeoffAltitude": 30,
    "SlowFallingTime": 20,
    "AdditionalDamage": 1,
    "ArmorBreaker": true,
    "ArmorBreakerToSE": false,
    "ArmorProbability": 10,
    "SingleReductionDamage": 2,
    "RandomDebuff": true,
    "RandomDebuffProbability": 10,
    "DebuffMaxTime": 10,
    "DebuffMinTime": 5,
    "DebuffMaxLvL": 3,
    "DebuffMinLvL": 1,
    "ProfileVersion": "0.0.4",
    "DebuffArray": [
        "slowness",
        "mining_fatigue",
        "instant_damage",
        "nausea",
        "blindness",
        "hunger",
        "weakness",
        "poison",
        "wither",
        "bad_omen",
        "darkness"
    ],
    "WhetherDisarm": true,
    "DisarmingProbability": 1,
    "DropOffset": {
        "x": 3,
        "z": 2
    },
    "ItemsThatCanCauseDamage": [
        "minecraft:netherite_sword"
    ],
    "KillerReward": {
        "xp": 200,
        "LLmoney": 0,
        "scoreName": "money",
        "scoreMoney": 0,
        "NameEconomicSystem": "金币",
        "DropMode": 0,
        "DropItemArray": [
            {
                "ItemType": "initial",
                "ItemTypeNmae": "minecraft:stone",
                "DropQuantity": 32,
                "DroppingProbability": 100
            },
            {
                "ItemType": "intensify",
                "ReelGrade": 1,
                "DropQuantity": 1,
                "DroppingProbability": 100,
            },
            {
                "ItemType": "gives",
                "ItemTypeNmae": "minecraft:stone",
                "DisplayName": "打末影龙送的",
                "DropQuantity": 32,
                "DroppingProbability": 100,
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
};

let ResetRecord = 0;
let enderDragonState = 0;
let StagePrompt = { "YuzhuBlessingTips": true, "RemovePlayerTakeOff": true, "StopRandomExplosion": true };
let BloodReturnTask, ExplosiveMission, PlayerTakeoffMission, PlayerSetectionTask, getReelNbt, GetNewItemNbt, Invincible;
logger.setConsole(true);

if (File.exists(pluginPath + "language/language.json")) {
    File.delete(pluginPath + "language");
}
if (!File.exists(pluginPath + "Config.json")) {
    File.writeTo(pluginPath + "Config.json", JSON.stringify(ConfigDataJson, null, "\t"));
}

let Config = JSON.parse(File.readFrom(pluginPath + "Config.json"));

i18n.load(pluginPath + "language/language.json", "zh_CN", {
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
        "phase2Tips": "§l§2末影龙进入第二阶段\n此阶段爆炸无法对其造成伤害。",
        "phase3Tips": "§l§5末影龙进入终极阶段\n此阶段只有近战才能对其造成伤害。",
        "UnableCauseDamage": "§l§4此物品无法对末影龙造成伤害!",
        "SharedDamageTips": "§l§6你收到了来自{0}的共享伤害{1}点",
        "LastShadowDragonStage": "§l§4因末地未检出玩家，末影龙阶段和生命已重置!",
        "TakeOffBlessing": "§l§3你收到了末影龙的起飞祝福!",
        "blastTips": "§l§3末影龙{0}秒后即将在{1}处召唤爆炸，请注意!",
        "RemovePlayerTakeOff": "§l§g因末影龙惊扰到了HIM，已经移除其让玩家起飞的功能!",
        "YuzhuBlessingTips": "§l§g因受到腐竹的祝福，末影龙已经停止回血。加把劲，干翻他！！！",
        "StopRandomExplosion": "§l§g你们受到了插件开发者的祝福，末影龙已经停止随机造成爆炸!",
        "SetDebuffTips": "§l§c你受到了魔影龙的仇视，获得{0} {1}级 {2}秒",
        "WhetherDisarmTips": "§l§c你被末影龙使用了去你武器技能，物品掉落点{0}",
        "AdvancedTips": "§l§6末影龙开始进阶，获得无敌金身直至进阶结束!",
        "InsufficientPeopleTips": "§l§c因攻击人数不足，暂不能对末影龙造成伤害。\n至少需要{0}人！",
        "Intensifyerr": "未找到前置插件Intensify.js，请前往下载或者在配置文件Config.json中将DockingIntensify设置为false",
        "giveserr": "未找到前置插件gives.js，请前往下载或者在配置文件Config.json中将DockingGives设置为false",
        "configUp": "版本配置文件更新，请前往Config.json查看！",
        "getScoreObjErr": "获取计分板对象出错，请检测是否有此名称的计分板!",
        "rewardTips": "§l§6{0}杀末影龙获得了\n{1}经验值\n{2} {3}，\n其他奖励已生成掉落物！",
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
        "phase2Tips": "§l§2Last Shadow Dragon enters the second stage \n Explosion at this stage cannot cause damage to them.",
        "phase3Tips": "§l§5Last Shadow Dragon enters the final stage\nOnly melee can damage them at this stage.",
        "UnableCauseDamage": "§l§4This item cannot cause damage to the Shadow Dragon!",
        "SharedDamageTips": "§l§6You received {1} points of shared damage from {0}",
        "LastShadowDragonStage": "§l§4Since no player has been detected in the end place, the end shadow dragon stage and life have been reset!",
        "TakeOffBlessing": "§l§3You have received the blessing of the last shadow dragon!",
        "blastTips": "§l§3The last shadow dragon will summon an explosion at {1} in {0} seconds, please pay attention!",
        "RemovePlayerTakeOff": "§l§gBecause the last shadow dragon disturbed HIM, its function of letting players take off has been removed!",
        "YuzhuBlessingTips": "§l§gWith the blessing of the rotten bamboo, the last shadow dragon has stopped returning blood. Come on, kill him!!!",
        "StopRandomExplosion": "§l§gYou have received the blessing of the plug-in developer. The end shadow dragon has stopped random explosion!",
        "SetDebuffTips": "§l§cYou are hated by the Shadow Dragon, and gain {0} {1} level {2} seconds",
        "WhetherDisarmTips": "§l§cYou have been used by the last shadow dragon to destroy your weapon skill, and the drop point of the item {0}",
        "AdvancedTips": "§l§6The last shadow dragon starts to advance, and gains the invincible golden body until the end of the advance!",
        "InsufficientPeopleTips": "§l§cDue to the insufficient number of attackers, you can't cause damage to the end shadow dragon temporarily.\nAt least {0} people are required!",
        "Intensifyerr": "The front-end plug-in Intensify.js was not found. Please go to download or set DockingIntensify to false in the configuration file Config.json",
        "giveserr": "The front plug-in gives.js is not found. Please go to download or set DockingGives to false in the configuration file Config.json",
        "configUp": "Version configuration file update, please go to Config.json to check!",
        "getScoreObjErr": "Error getting scoreboard object, please check whether there is a scoreboard with this name!",
        "rewardTips": "§l§6{0} Kill the Shadow Dragon and gain  n {1} experience value  n {2} {3}.  n Other rewards have generated dropped objects!",
    }
});

/**
 * 判断是否需要加载前置插件及语言文件.
 * 判断生成概率是否需要限制.
 */
if (Config.DockingIntensify) {
    if (ll.require("Intensify.js")) {
        getReelNbt = ll.import("generateNewNbt");
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

/**
 * 实体受伤监听.
 */
mc.listen("onMobHurt", (mob, source, damage, cause) => {
    let WhetherIntercept = true;
    if (mob.type == "minecraft:ender_dragon") {
        if (parseInt(damage) >= mob.health && enderDragonState != 3) {
            if (BloodReturnTask != undefined) {
                clearInterval(BloodReturnTask);
            }
        }
        WhetherIntercept = EnderDragonInjuryTreatment(mob, source, cause);
    } else if (mob.isPlayer() && source != undefined) {
        if (source.type == "minecraft:ender_dragon") {
            PlayerInjuryTreatment(mob, source);
        }
    }
    return WhetherIntercept;
})

/**
 * 获取在末地的人数.
 * @returns 在末地的人数
 */
function GetEnderPlayerQuantity() {
    let playerQuantity = 0;
    let OnlinePlayerArray = mc.getOnlinePlayers();
    OnlinePlayerArray.forEach(player => {
        if (player.pos.dimid == 2) {
            playerQuantity += 1;
        }
    });
    return playerQuantity;
}

/**
 * 玩家受伤事件处理.
 * @param {Entity} mob 受伤的实体对象
 * @param {Entity} source 攻击的实体对象
 * @returns 布尔值
 */
function PlayerInjuryTreatment(mob, source) {
    let WhetherIntercept = true;
    if (source.type == "minecraft:ender_dragon") {
        let record = mob.health;
        setTimeout(() => {
            mob.hurt(Config.AdditionalDamage, 2);
        }, 51);
        setTimeout(() => {
            let player = mc.getPlayer(mob.toPlayer().xuid);
            CauseDamagePlayersRange(player, record - player.health);
        }, 70);
        let player = mc.getPlayer(mob.toPlayer().xuid);
        if (player != undefined) {
            if (player.pos.dimid == 2) {
                if (Config.RandomDebuff) {
                    let random = specifiedRangeRandomNumber(0, 100);
                    if (random < Config.RandomDebuffProbability) {
                        let buffTime = specifiedRangeRandomNumber(Config.DebuffMinTime, Config.DebuffMaxTime);
                        let bufflvl = specifiedRangeRandomNumber(Config.DebuffMinLvL, Config.DebuffMaxLvL);
                        let buffname = Config.DebuffArray[specifiedRangeRandomNumber(0, Config.DebuffArray.length)];
                        mc.runcmdEx(`effect "${player.realName}" ${buffname} ${buffTime} ${bufflvl} false`);
                        player.tell(i18n.trl(player.langCode, "SetDebuffTips", buffname, bufflvl, buffTime), 5);
                    }
                }

                if (Config.WhetherDisarm) {
                    let random = specifiedRangeRandomNumber(0, 100);
                    if (random < Config.DisarmingProbability) {
                        let playerHand = player.getHand();
                        if (!playerHand.isNull()) {
                            let DropOffsetX = Config.DropOffset.x;
                            let DropOffsetZ = Config.DropOffset.z;
                            if (mc.spawnItem(playerHand, player.pos.x + DropOffsetX, player.pos.y, player.pos.z + DropOffsetZ, player.pos.dimid)) {
                                playerHand.setNull()
                                player.refreshItems()
                                player.tell(i18n.trl(player.langCode, "WhetherDisarmTips", `${parseInt(player.pos.x + DropOffsetX)}, ${parseInt(player.pos.y)} ,${parseInt(player.pos.z + DropOffsetZ)}`), 5);
                            }
                        }
                    }
                }

                if (Config.ArmorBreaker) {
                    let playerArmor = player.getArmor();
                    let playerArmorAllItem = playerArmor.getAllItems();
                    playerArmorAllItem.forEach(item => {
                        if (!item.isNull()) {
                            let random = specifiedRangeRandomNumber(0, 100);
                            if (Config.ArmorBreakerToSE) {
                                if (random < Config.ArmorProbability) {
                                    item.setDamage(item.damage + Config.SingleReductionDamage);
                                }
                            } else if (!isIntensify(item)) {
                                if (random < Config.ArmorProbability) {
                                    item.setDamage(item.damage + Config.SingleReductionDamage);
                                }
                            }
                        }
                    });
                }
            }
        }
    }
    return WhetherIntercept;
}

/**
 * 末影龙受伤事件处理.
 * @param {Entity} mob 受伤的实体对象
 * @param {Entity} source 攻击的实体对象
 * @param {int} cause 伤害类型
 * @returns 布尔值
 */
function EnderDragonInjuryTreatment(mob, source, cause) {
    let WhetherIntercept = true;
    WhetherIntercept = Invincible;
    if (source != undefined && source.isPlayer()) {
        let player = source.toPlayer();
        if (enderDragonState != 0) {
            let playerHand = player.getHand();
            if (!playerHand.isNull()) {
                if (!Config.ItemsThatCanCauseDamage.includes(playerHand.type)) {
                    WhetherIntercept = false;
                    player.tell(i18n.get("UnableCauseDamage", player.langCode));
                }
            }
        }
    } else if (source == undefined && enderDragonState != 0) {
        if (cause == 10 || cause == 11) {
            WhetherIntercept = false;
        }
    }
    if (GetEnderPlayerQuantity() < Config.MinAttackersQuantity) {
        TerminalBroadcasting(i18n.trl(ll.language, "InsufficientPeopleTips", Config.MinAttackersQuantity));
        WhetherIntercept = false;
    }
    if (enderDragonState == 0) {
        if (mob.health < 100 && mob.health > 1) {
            Invincible = false;
            TerminalBroadcasting(i18n.get("AdvancedTips", ll.language));
            LimitPositionTheLastShadowDragon(mob, 3);
            enderDragonState = 2;
            mob.setHealth(GetHPAtThisStage(enderDragonState));
            mob.setMaxHealth(GetHPAtThisStage(enderDragonState));
            setTimeout(() => {
                TerminalBroadcasting(i18n.get("phase2Tips", ll.language));
                Invincible = true;
            }, 1000 * 3);
        }
    } else if (enderDragonState == 2) {
        if (mob.health < 100 && mob.health > 1) {
            TerminalBroadcasting(i18n.get("AdvancedTips", ll.language));
            LimitPositionTheLastShadowDragon(mob, 5);
            Invincible = false;
            enderDragonState = 3;
            mob.setHealth(GetHPAtThisStage(enderDragonState));
            mob.setMaxHealth(GetHPAtThisStage(enderDragonState));
            setTimeout(() => {
                TerminalBroadcasting(i18n.get("phase3Tips", ll.language));
                Invincible = true;
            }, 1000 * 5);
        }
        if (cause != 3 && cause != 2) {
            WhetherIntercept = false;
        }
    } else if (enderDragonState == 3) {
        if (mob.health < 80 && StagePrompt.YuzhuBlessingTips) {
            StagePrompt.YuzhuBlessingTips = false;
            TerminalBroadcasting(i18n.get("YuzhuBlessingTips", ll.language));
            clearInterval(BloodReturnTask);
        }
        if (mob.health < 50 && StagePrompt.RemovePlayerTakeOff) {
            StagePrompt.RemovePlayerTakeOff = false;
            TerminalBroadcasting(i18n.get("RemovePlayerTakeOff", ll.language));
            clearInterval(PlayerTakeoffMission);
        }
        if (mob.health < 30 && StagePrompt.StopRandomExplosion) {
            StagePrompt.StopRandomExplosion = false;
            TerminalBroadcasting(i18n.get("StopRandomExplosion", ll.language));
            clearInterval(ExplosiveMission);
        }
        if (cause != 2) {
            WhetherIntercept = false;
        }
    }
    return WhetherIntercept;
}

/**
 * 实体死亡监听.
 */
mc.listen("onMobDie", (mob, source, cause) => {
    if (mob.type == "minecraft:ender_dragon") {
        if (BloodReturnTask != undefined) {
            clearInterval(BloodReturnTask);
        }
        if (enderDragonState == 3) {
            if (source != undefined && source.isPlayer()) {
                let player = source.toPlayer();
                let rewardJson = Config.KillerReward;
                player.addExperience(rewardJson.xp);
                if (Config.KillerReward.scoreName != "") {
                    let scoreboardObj = mc.getScoreObjective(Config.KillerReward.scoreName);
                    if (scoreboardObj != undefined) {
                        scoreboardObj.addScore(player, Config.KillerReward.scoreMoney);
                        TerminalBroadcasting(i18n.trl(player.langCode, "rewardTips", player.realName, rewardJson.xp, Config.KillerReward.scoreMoney, Config.KillerReward.NameEconomicSystem));
                    } else {
                        logger.error(i18n.trl(ll.language, "getScoreObjErr",));
                    }
                }
                if (Config.KillerReward.LLmoney > 0) {
                    Player.addMoney(Config.KillerReward.LLmoney);
                    TerminalBroadcasting(i18n.trl(player.langCode, "rewardTips", player.realName, rewardJson.xp, Config.KillerReward.LLmoney, Config.KillerReward.NameEconomicSystem));
                }

                AwardGeneration(mob, rewardJson);
            }
        }
        LastShadowDragonReturnsBlood();
        enderDragonState = 0;
        StagePrompt = { "YuzhuBlessingTips": true, "RemovePlayerTakeOff": true, "StopRandomExplosion": true };
    }
});

/**
 * 生成奖励掉落物.
 * @param {Entity} entity 实体对象
 * @param {JSONObj} rewardJson 奖励配置文件
 */
function AwardGeneration(entity, rewardJson) {
    let DropsArray = rewardJson.DropItemArray;
    if (rewardJson.DropMode == 0) {
        DropsArray.forEach(ItemJson => {
            let random = specifiedRangeRandomNumber(0, 100);
            switch (ItemJson.ItemType) {
                case "initial":
                    if (random < ItemJson.DroppingProbability) {
                        let item = mc.newItem(ItemJson.ItemTypeNmae, ItemJson.DropQuantity);
                        mc.spawnItem(item, entity.pos);
                    }
                    break;
                case "intensify":
                    if (Config.DockingIntensify) {
                        if (random < ItemJson.DroppingProbability && ItemJson.ReelGrade < 6) {
                            let newItem = mc.newItem(getReelNbt("intensify", ItemJson.ReelGrade, i18n.trl(ll.language, "StrengtheningReel" + ItemJson.ReelGrade)));
                            newItem.setLore(JSON.parse(i18n.get(`StrengtheningReel${ItemJson.ReelGrade}explain`, ll.language)));
                            for (let i = 0; i < ItemJson.DropQuantity; i++) {
                                mc.spawnItem(newItem, entity.pos);
                            }
                        }
                    }
                    break;
                case "gives":
                    if (Config.DockingGives) {
                        let temporaryItem = mc.newItem(ItemJson.ItemTypeNmae, 1);
                        let itemNewNbt = GetNewItemNbt(temporaryItem, ItemJson.itemDIsplayName, ItemJson.Curse, ItemJson.DropQuantity);
                        let item = mc.newItem(itemNewNbt);
                        mc.spawnItem(item, entity.pos);
                    }
                    break;
                default:
                    break;
            }
        });
    } else if (rewardJson.DropMode == 1) {
        let random = specifiedRangeRandomNumber(0, DropsArray.length);
        let ItemJson = DropsArray[random];
        switch (ItemJson.ItemType) {
            case "initial":
                let item = mc.newItem(ItemJson.ItemTypeNmae, ItemJson.DropQuantity);
                mc.spawnItem(item, entity.pos);
                break;
            case "intensify":
                if (Config.DockingIntensify) {
                    let newItem = mc.newItem(getReelNbt("intensify", ItemJson.ReelGrade, i18n.trl(ll.language, "StrengtheningReel" + ItemJson.ReelGrade,)));
                    newItem.setLore(JSON.parse(i18n.get(`StrengtheningReel${ItemJson.ReelGrade}explain`, ll.language)));
                    for (let i = 0; i < ItemJson.DropQuantity; i++) {
                        mc.spawnItem(newItem, entity.pos);
                    }
                }
                break;
            case "gives":
                if (Config.DockingGives) {
                    let temporaryItem = mc.newItem(ItemJson.ItemTypeNmae, 1);
                    let itemNewNbt = GetNewItemNbt(temporaryItem, ItemJson.itemDIsplayName, ItemJson.Curse, ItemJson.DropQuantity);
                    let item = mc.newItem(itemNewNbt);
                    mc.spawnItem(item, entity.pos);
                }
                break;
            default:
                break;
        }
    }
}

/**
 * 玩家跨世界监听.
 */
mc.listen("onChangeDim", (player, dimid) => {
    if (dimid == 2) {
        CycleReset();
    }
});

/**
 * 计算当前阶段末影龙的血量.
 * @param {int} stage 低级阶段
 * @returns 计算后的血量
 */
function GetHPAtThisStage(stage) {
    let playerQuantity = GetEnderPlayerQuantity();
    if (stage == 2) {
        if (playerQuantity > 2) {
            let FirstCalculation = EconomicCalculation(Config.IntermediateStage, playerQuantity, "*");
            let SecondCalculation = EconomicCalculation(Config.LifeRatio, FirstCalculation, "*");
            return parseInt(SecondCalculation) + Config.IntermediateStage;
        } else {
            return Config.IntermediateStage;
        }
    } else if (stage == 3) {
        if (playerQuantity > 2) {
            let FirstCalculation = EconomicCalculation(Config.AdvancedStage, playerQuantity, "*");
            let SecondCalculation = EconomicCalculation(Config.LifeRatio, FirstCalculation, "*");
            return parseInt(SecondCalculation) + Config.AdvancedStage;
        } else {
            return Config.AdvancedStage;
        }
    }
}

/**
 * 判断重置末影龙状态.
 */
function CycleReset() {
    let pid = setInterval(() => {
        if (enderDragonState == 0 && ResetRecord == 0) {
            StagePrompt = { "YuzhuBlessingTips": true, "RemovePlayerTakeOff": true, "StopRandomExplosion": true };
            let allEntityArray = mc.getAllEntities();
            allEntityArray.forEach(entity => {
                if (entity.type == "minecraft:ender_dragon") {
                    entity.setHealth(200);
                    entity.setMaxHealth(200);
                    ResetRecord = 1;
                    clearInterval(pid);
                }
            });
        }
    }, 1000);
}

/**
 * 判断物品是否是强化物品.
 * @param {Item} item 物品对象
 * @returns 布尔值
 */
function isIntensify(item) {
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

/**
 * 给在末地的玩家发送一条消息.
 * @param {String} msg 广播的消息
 */
function TerminalBroadcasting(msg) {
    let OnlinePlayerArray = mc.getOnlinePlayers();
    OnlinePlayerArray.forEach(player => {
        if (player.pos.dimid == 2) {
            player.tell(msg);
        }
    });
}

/**
 * 对玩家附近的玩家造成伤害.
 * @param {Player} player1 受伤的玩家对象
 * @param {int} hurt 伤害值
 */
function CauseDamagePlayersRange(player1, hurt) {
    let pos = player1.pos;
    let OnlinePlayerArray = mc.getOnlinePlayers();
    OnlinePlayerArray.forEach(player => {
        if (player.pos.dimid == 2 && hurt != 0) {
            if (player.distanceTo(pos) <= Config.ShareDamageDistance) {
                player.hurt(hurt);
                player.tell(i18n.trl(player.langCode, "SharedDamageTips", player1.realName, hurt), 5);
            }
        }
    });
}

/**
 * 定时任务
 * 末影龙回血.
 */
function LastShadowDragonReturnsBlood() {
    BloodReturnTask = setInterval(() => {
        if (enderDragonState >= 2) {
            let allEntityArray = mc.getAllEntities();
            allEntityArray.forEach(entity => {
                if (entity.type == "minecraft:ender_dragon") {
                    if (entity.health < entity.maxHealth) {
                        entity.setHealth(entity.health + Config.DragonReturnhpr);
                    }
                }
            })
        }
    }, 1000 * Config.DragonReturnTime)
}

/**
 * 定时任务.
 * 检测末地是否还有玩家.
 */
ScheduledTasks();
function ScheduledTasks() {
    PlayerSetectionTask = setInterval(() => {
        let count = 0;
        let OnlinePlayerArray = mc.getOnlinePlayers();
        OnlinePlayerArray.forEach(player => {
            if (player.pos.dimid == 2) {
                count += 1;
            }
        });
        if (count == 0) {
            ResetRecord = 0;
            if (enderDragonState != 0) {
                enderDragonState = 0;
                StopScheduledTask();
                setTimeout(() => {
                    mc.broadcast(i18n.get("LastShadowDragonStage", ll.language));
                    ScheduledTasks();
                }, 100);
            }
        }
    }, 1000);
    ExplosiveMission = setInterval(() => {
        let allEntityArray = mc.getAllEntities();
        allEntityArray.forEach(entity => {
            if (entity.type == "minecraft:ender_dragon") {
                let random1 = specifiedRangeRandomNumber(0, 100);
                if (random1 < Config.RandomExplosionProbability && enderDragonState != 0) {
                    RandomPlayerExplodesTheHead(entity);
                }
            }
        })
    }, 1000 * 5);
    PlayerTakeoffMission = setInterval(() => {
        let allEntityArray = mc.getAllEntities();
        allEntityArray.forEach(entity => {
            if (entity.type == "minecraft:ender_dragon") {
                let random2 = specifiedRangeRandomNumber(0, 100);
                if (random2 < Config.RandomTakeoffProbability && enderDragonState != 0) {
                    TakeOffPlayer(entity);
                }
            }
        });
    }, 1000 * 10);
}

/**
 * 停止计时任务函数.
 */
function StopScheduledTask() {
    if (PlayerSetectionTask != undefined) {
        clearInterval(PlayerSetectionTask);
    }
    if (ExplosiveMission != undefined) {
        clearInterval(ExplosiveMission);
    }
    if (PlayerTakeoffMission != undefined) {
        clearInterval(PlayerTakeoffMission);
    }
    if (BloodReturnTask != undefined) {
        clearInterval(BloodReturnTask);
    }
}

/**
 * 随机在一个玩家处制造爆炸.
 */
function RandomPlayerExplodesTheHead(entity) {
    let OnlinePlayerArray = mc.getOnlinePlayers();
    let DestinationPlayerArray = [];
    OnlinePlayerArray.forEach(player => {
        if (player.pos.dimid == 2 && player.distanceTo(entity.pos) < 50) {
            DestinationPlayerArray.push(player);
        }
    });
    if (JSON.stringify(DestinationPlayerArray) != "[]") {
        let random3 = specifiedRangeRandomNumber(0, DestinationPlayerArray.length);
        let player1 = DestinationPlayerArray[random3];
        let pos = player1.pos;
        TerminalBroadcasting(i18n.trl(player1.langCode, "blastTips", Config.ExplosiveCountDown, `${parseInt(player1.pos.x)} ,${parseInt(player1.pos.y)} ,${parseInt(player1.pos.z)}`));
        setTimeout(() => {
            if (pos != undefined && pos.dimid == 2 && enderDragonState != 0) {
                mc.explode(pos, null, Config.ExplosivePower, Config.ExplosionRadius, Config.ExplosiveDamageBlock, false);
            }
        }, 1000 * Config.ExplosiveCountDown);
    }
}

/**
 * 随机起飞一名玩家.
 */
function TakeOffPlayer(entity) {
    let OnlinePlayerArray = mc.getOnlinePlayers();
    let DestinationPlayerArray = [];
    OnlinePlayerArray.forEach(player => {
        if (player.pos.dimid == 2 && player.distanceTo(entity.pos) < Config.TakeOffRange) {
            DestinationPlayerArray.push(player);
        }
    });
    if (JSON.stringify(DestinationPlayerArray) != "[]") {
        let random3 = specifiedRangeRandomNumber(0, DestinationPlayerArray.length);
        let player1 = DestinationPlayerArray[random3];
        player1.teleport(player1.pos.x, parseInt(player1.pos.y) + Config.TakeoffAltitude, player1.pos.z, player1.pos.dimid);
        player1.tell(i18n.get("TakeOffBlessing", player1.langCode), 5);
        mc.runcmdEx(`effect "${player1.realName}" slow_falling ${Config.SlowFallingTime} 1 false`);
    }
}
/**
 * 限制末影龙位置.
 * @param {Entity} entity 实体对象
 * @param {int} time 限制时间(秒)
 */
function LimitPositionTheLastShadowDragon(entity, time) {
    let pos = mc.newFloatPos(entity.pos.x, entity.pos.y + 2, entity.pos.z, entity.pos.dimid);
    let pid = setInterval(() => {
        entity.teleport(entity.pos);
        mc.spawnParticle(pos, 'minecraft:mob_block_spawn_emitter');
    }, 20);
    setTimeout(() => {
        mc.explode(entity.pos, null, 1, 10, false, false);
        clearInterval(pid);
    }, 1000 * time);
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
    * 解决小数点后数值漂移的运算.
    * @param {*} num1 数值1
    * @param {*} num2 数值2
    * @param {*} symbol 字符格式的运算符号
    * @returns Number
    */
function EconomicCalculation(num1, num2, symbol) {
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
 * 版本配置更新
 */
FourProfileUpdate();
function FourProfileUpdate() {
    let UPEntityConfig = false;
    if (Config.KillerReward.LLmoney == undefined) {
        Config.KillerReward.LLmoney = 0;
        Config.KillerReward.scoreName = "money";
        Config.KillerReward.scoreMoney = 0;
        Config.KillerReward.NameEconomicSystem = "金币";
        Config.ProfileVersion = "0.0.4";
        UPEntityConfig = true;
    }
    if (Config.ProfileVersion == "0.0.4") {
        let debuffArray = Config.DebuffArray;
        for (let i = 0; i < debuffArray.length; i++) {
            if (debuffArray[i] == "unluck") {
                debuffArray.splice(i, 1);
                Config.DebuffArray = debuffArray;
            }
        }
        Config.ProfileVersion = "0.0.5";
        UPEntityConfig = true;
    }

    if (UPEntityConfig) {
        File.writeTo(pluginPath + "Config.json", JSON.stringify(Config, null, "\t"));
        setTimeout(() => {
            logger.error(i18n.trl(ll.language, "configUp",));
        }, 1000 * 6);
    }
}
ll.registerPlugin(pluginName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation);

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
 */