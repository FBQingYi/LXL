//金币限制武器工具等
const item_list_money = { 10000: ["minecraft:netherite_sword", "minecraft:netherite_hoe", "minecraft:netherite_axe", "minecraft:netherite_pickaxe", "minecraft:netherite_shovel", "minecraft:thrown_trident"], 6000: ["minecraft:diamond_sword", "minecraft:diamond_hoe", "minecraft:diamond_axe", "minecraft:diamond_pickaxe", "minecraft:diamond_shovel"], 3500: ["minecraft:golden_sword", "minecraft:golden_hoe", "minecraft:golden_axe", "minecraft:golden_pickaxe", "minecraft:golden_shovel"], 3200: ["minecraft:iron_sword", "minecraft:iron_hoe", "minecraft:iron_axe", "minecraft:iron_pickaxe", "minecraft:iron_shovel"], 1000: ["minecraft:stone_sword", "minecraft:stone_hoe", "minecraft:stone_axe", "minecraft:stone_pickaxe", "minecraft:stone_shovel"], 100: ["minecraft:wooden_sword", "minecraft:wooden_hoe", "minecraft:wooden_axe", "minecraft:wooden_pickaxe", "minecraft:wooden_shovel"] }
//击杀怪物获得金币列表
const mob_list = { "Skeleton": 1, "Zombie": 1, "Spider": 1, "Creeper": 2, "Zombie Villager": 1 }
//可编辑书snbt数据
const book_bsnbt = '{"Count":1b,"Damage":0s,"Name":"minecraft:writable_book","WasPickedUp":0b,"tag":{"pages":[{"photoname":"","text":"    欢迎来到这个全新的世界，请详细阅读此书，可能会对你之后在这个世界生存有一定的帮助！\n    公元2087年，以风云为首的重启党在腐竹出巡时造反，期间成功夺得服务器部分权限，但是没想到腐竹早就有所准备，在重启党即将成功完全占领服务器时，服务器发生了翻天覆地的变化，自此，服务器来到了一个全新的纪元，肝帝纪元！\n    在这个纪元中，一切都变得异常困难，你的背包和末影箱不再安全。希望你能坚持到最后！"},{"photoname":"","text":"肝帝纪元规则介绍：\n1，你只能通过手/和相关武器工具进行攻击和破坏。\n2，你受到伤害有50%的几率掉落背包物品，如果这个伤害来自玩家，那么几率将会变为100%。\n3，你要小心不能死亡，不然会随机掉落你的金币。\n4，吃食物的时候如果你的金币大于等于5，那么将会自动扣款并给你一个随机的buff/debuff。\n5，在你对生物进行攻击时，有几率攻击无效，请小心。\n————————>请翻页——————>>>"},{"photoname":"","text":"6,如果你的金币不够，那么你将不 能使用武器/工具以及钓鱼。\n7，使用钓竿每次会消耗1金币，不管你是钓鱼还是干啥。\n8，如果你攻击了村民或者铁傀儡，那么将会扣除你20金币并警告你不要恶意攻击。\n9，pvp攻击每次扣除5金币，如果金币不足那么你的攻击将会无效。\n10，你可以通过指令/jineng来购买武器的技能，1个玩家只能购买一次，请谨慎选择。\n11，玩家只有使用下界合金剑才能攻击末影龙且伤害有几率无效"},{"photoname":"","text":"12，跨世界时会扣除金币，如果余额不足那么将会计入欠账模式，后期逐步扣款。\n13，末影龙死亡后，将在击杀他的玩家为中心引发一个半径100的球形区域的爆炸。\n14，击杀末影龙的玩家将会获得屠龙者的称号，玩家可使用/jineng指令实时查询他的位置。\n15.击杀屠龙者后，你将会获得一次死亡免掉金币的机会，并且会获得解脱者称号。你还能获得屠龙者末影箱的随机物品一个， 如果末影箱没有物品你将会获得他"},{"photoname":"","text":"的全部金币。\n16，末影龙会根据玩家数量进行强化，当末地多进入一 个玩家时，属性会在当前状态下*2，离开时会/2，以此类推。\n17，当末地没有玩家时，末影龙的属性将会恢复到默认状态。"},{"photoname":"","text":"武器技能介绍：\n真实伤害：\n此技能分为3个等级，分别在原始的伤害上增加1/2/3点伤害，此技能造成的伤害无视 任何防御，CD时间为60/50/40秒。\n爆炸攻击：\n此技能会在被攻击的生物处造成爆炸，分为3个等级，伤害分别是1/2/3，范围是2/3/4 为半径的球形，CD时间为80/70/60.（此技能无法在末地使用）。\n\n------>请翻页---->>"},{"photoname":"","text":"神圣守护：\n 此技能会使被你的攻击的对象回血，分为3个等级，分别恢复2/3/4滴血，CD时间为190/180/170（可超过血量上限）。\n取你装备：\n此 技能分为4个等级，分别能取1/2/3/4件装备，如果你只有一级，但是他有4件装备，那么你只能获得1件但是他会失去全部。CD时间为240/230/220/210秒"},{"photoname":"","text":"金币来源介绍：\n击杀：\n骷髅 1金币\n僵尸 1金币\n蜘蛛 1金币\n苦力怕 2金币\n破坏：\n原木 1金币（每天200个上限）\n草方块 1金币\n煤炭 1金币\n石头 1金币\n铁矿石 2金币\n金矿石 2金币\n钻石矿石 3金币"},{"photoname":"","text":"近战武器/工具解锁：\n100金币\n木剑/斧/稿/锄/铲\n1000金币\n石剑/斧/稿/锄/铲\n3200金币\n铁剑/斧/镐/锄/铲\n3500金币\n金剑/斧/稿/锄/铲\n6000金币\n钻石剑/斧/稿/锄/铲\n10000金币\n下界合金剑/斧/稿/锄/铲\n三叉戟"},{"photoname":"","text":"远程武器解锁：\n1000金币\n钓鱼\n2000金币\n弓箭/弩箭\n3000金币\n三叉戟"}]}}'
//进服给书的snbt数据
const book_sNbt = '{"Count":1b,"Damage":0s,"Name":"minecraft:written_book","WasPickedUp":0b,"tag":{"author":"未知作者","generation":0,"pages":[{"photoname":"","text":"    欢迎来到这个全新的世界，请详细阅读此书，可能会对你之后在这个世界生存有一定的帮助！\n    公元2087年，以风云为首的重启党在腐竹出巡时造反，期间成功夺得服务器部分权限，但是没想到腐竹早就有所准备，在重启党即将成功完全占领服务器时，服务器发生了翻天覆地的变化，自此，服务器来到了一个全新的纪元，肝帝纪元！\n    在这个纪元中，一切都变得异常困难，你的背包和末影箱不再安全。希望你能坚持到最后！"},{"photoname":"","text":"肝帝纪元规则介绍：\n1，你只能通过手/ 和相关武器工具进行攻击和破坏。\n2，你受到伤害有50%的几率掉落背包物品，如果这个伤害来自玩家，那么几率将会变为100%。\n3， 你要小心不能死亡，不然会随机掉落你的金币。\n4，吃食物的时候如果你的金币大于等于5，那么将会自动扣款并给你一个随机的buff/debuff。\n5，在你对生物进行攻击时，有几率攻击无效，请小心。\n————————>请翻页——————>>>"},{"photoname":"","text":"6,如果你的金币不够，那么你将不能使用武器/工具以及钓鱼。\n7，使用钓竿每次会消耗1金币，不管你是钓鱼还是干啥。\n8，如 果你攻击了村民或者铁傀儡，那么将会扣除你20金币并警告你不要恶意攻击。\n9，pvp攻击每次扣除5金币，如果金币不足那么你的攻击 将会无效。\n10，你可以通过指令/jineng来购买武器的技能，1个玩家只能购买一次，请谨慎选择。\n11，玩家只有使用下界合金剑才能攻击末影龙且伤害有几率无效"},{"photoname":"","text":"12，跨世界时会扣除金币，如果余额不足那么将会计入欠账模式，后期逐步 扣款。\n13，末影龙死亡后，将在击杀他的玩家为中心引发一个半径100的球形区域的爆炸。\n14，击杀末影龙的玩家将会获得屠龙者的 称号，玩家可使用/jineng指令实时查询他的位置。\n15.击杀屠龙者后，你将会获得一次死亡免掉金币的机会，并且会获得解脱者称号。你还能获得屠龙者末影箱的随机物品一个，如果末影箱没有物品你将会获得他"},{"photoname":"","text":"的全部金币。\n16，末影龙 会根据玩家数量进行强化，当末地多进入一个玩家时，属性会在当前状态下*2，离开时会/2，以此类推。\n17，当末地没有玩家时，末影龙的属性将会恢复到默认状态。"},{"photoname":"","text":"武器技能介绍：\n真实伤害：\n此技能分为3个等级，分别在原始的伤害上增加1/2/3点伤害，此技能造成的伤害无视任何防御，CD时间为60/50/40秒。\n爆炸攻击：\n此技能会在被攻击的生物处造成爆炸，分为3个等级，伤害分别是1/2/3，范围是2/3/4为半径的球形，CD时间为80/70/60.（此技能无法在末地使用）。\n\n------>请翻页---->>"},{"photoname":"","text":"神圣守护：\n此技能会使被你的攻击的对象回血，分为3个等级，分别恢复2/3/4滴血，CD时间为190/180/170（可超过血量上限）。\n取你装备：\n此技能分为4个等级，分别能取1/2/3/4件装备，如果你只有一级，但是他有4件装备，那么你只能获 得1件但是他会失去全部。CD时间为240/230/220/210秒"},{"photoname":"","text":"金币来源介绍：\n击杀：\n骷髅 1金币\n僵尸 1金 币\n蜘蛛 1金币\n苦力怕 2金币\n破坏：\n原木 1金币（每天200个上限）\n草方块 1金币\n煤炭 1金币\n石头 1金币\n铁矿石 2金币\n 金矿石 2金币\n钻石矿石 3金币"},{"photoname":"","text":"近战武器/工具解锁：\n100金币\n木剑/斧/稿/锄/铲\n1000金币\n石剑/斧/稿/锄/铲\n3200金币\n铁剑/斧/镐/锄/铲\n3500金币\n金剑/斧/稿/锄/铲\n6000金币\n钻石剑/斧/稿/锄/铲\n10000金币\n下界合金剑/ 斧/稿/锄/铲\n三叉戟"},{"photoname":"","text":"远程武器解锁：\n1000金币\n钓鱼\n2000金币\n弓箭/弩箭\n3000金币\n三叉戟"}],"title":"肝帝纪元","xuid":"2535472786510192"}}'
//buff/debuff列表
const buff_list = ["speed", "slowness", "haste", "mining_fatigue", "strength", "instant_health", "instant_damage", "jump_boost", "nausea", "regeneration", "resistance", "fire_resistance", "water_breathing", "invisibility", "blindness", "night_vision", "hunger", "weakness", "poison", "wither", "health_boost", "absorption", "saturation", "levitation", "fatal_poison", "slow_falling", "conduit_power", "bad_omen", "village_hero"]
//武器技能伤害及CD列表
const attack_art = { "真实伤害": { 1: { "伤害": 1, "CD": 60 }, 2: { "伤害": 2, "CD": 50 }, 3: { "伤害": 3, "CD": 40 } }, "爆炸攻击": { 1: { "伤害": 1, "范围": 2, "CD": 80 }, 2: { "伤害": 2, "范围": 3, "CD": 70 }, 3: { "伤害": 3, "范围": 4, "CD": 60 } }, "取你装备": { 1: { "CD": 240 }, 2: { "CD": 230 }, 3: { "CD": 220 }, 4: { "CD": 210 } }, "神圣守护": { 1: { "治疗量": 2, "CD": 190 }, 2: { "治疗量": 3, "CD": 180 }, 3: { "治疗量": 4, "CD": 170 } } }
//武器技能强化价格
const item_strengthen = { "真实伤害": { 2: 5000, 3: 10000 }, "爆炸攻击": { 2: 10000, 3: 15000 }, "取你装备": { 2: 15000, 3: 30000, 4: 50000 }, "神圣守护": { 2: 10000, 3: 15000 } };
//末影龙原始属性
const EnderDragon_attribute = '{"Armor":[{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b},{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b},{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b},{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b}],"AttackTime":0s,"Attributes":[{"Base":0f,"Current":0f,"DefaultMax":1024f,"DefaultMin":-1024f,"Max":1024f,"Min":-1024f,"Name":"minecraft:luck"},{"Base":200f,"Current":200f,"DefaultMax":200f,"DefaultMin":0f,"Max":200f,"Min":0f,"Name":"minecraft:health"},{"Base":0f,"Current":0f,"DefaultMax":16f,"DefaultMin":0f,"Max":16f,"Min":0f,"Name":"minecraft:absorption"},{"Base":100f,"Current":100f,"DefaultMax":100f,"DefaultMin":0f,"Max":100f,"Min":0f,"Name":"minecraft:knockback_resistance"},{"Base":0.3f,"Current":0.3f,"DefaultMax":3.40282e+38f,"DefaultMin":0f,"Max":3.40282e+38f,"Min":0f,"Name":"minecraft:movement"},{"Base":0.02f,"Current":0.02f,"DefaultMax":3.40282e+38f,"DefaultMin":0f,"Max":3.40282e+38f,"Min":0f,"Name":"minecraft:underwater_movement"},{"Base":0.02f,"Current":0.02f,"DefaultMax":3.40282e+38f,"DefaultMin":0f,"Max":3.40282e+38f,"Min":0f,"Name":"minecraft:lava_movement"},{"Base":16f,"Current":16f,"DefaultMax":2048f,"DefaultMin":0f,"Max":2048f,"Min":0f,"Name":"minecraft:follow_range"},{"Base":3f,"Current":3f,"DefaultMax":3f,"DefaultMin":3f,"Max":3f,"Min":3f,"Name":"minecraft:attack_damage"}],"BodyRot":89.6083f,"Chested":0b,"Color":0b,"Color2":0b,"Dead":0b,"DeathTime":0s,"FallDistance":0f,"Fire":0s,"HurtTime":0s,"Invulnerable":0b,"IsAngry":0b,"IsAutonomous":1b,"IsBaby":0b,"IsEating":0b,"IsGliding":0b,"IsGlobal":1b,"IsIllagerCaptain":0b,"IsOrphaned":0b,"IsOutOfControl":0b,"IsPregnant":0b,"IsRoaring":0b,"IsScared":0b,"IsStunned":0b,"IsSwimming":0b,"IsTamed":0b,"IsTrusting":0b,"LastDimensionId":2,"LeasherID":-1l,"LootDropped":0b,"Mainhand":[{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b}],"MarkVariant":0,"Motion":[0.41062f,-0.0801882f,0.0189916f],"NaturalSpawn":0b,"Offhand":[{"Count":0b,"Damage":0s,"Name":"","WasPickedUp":0b}],"OnGround":0b,"OwnerNew":-1l,"Persistent":1b,"PortalCooldown":0,"Pos":[-3.61875f,72.6525f,0.525409f],"Rotation":[89.6083f,0f],"Saddled":0b,"Sheared":0b,"ShowBottom":0b,"Sitting":0b,"SkinID":0,"SpawnedByNight":0b,"Strength":0,"StrengthMax":0,"Surface":0b,"Tags":[],"TargetID":-1l,"TradeExperience":0,"TradeTier":0,"UniqueID":-197568495580l,"Variant":0,"boundX":0,"boundY":0,"boundZ":0,"canPickupItems":0b,"definitions":["+minecraft:ender_dragon","+","-dragon_flying","+dragon_sitting"],"hasBoundOrigin":0b,"hasSetCanPickupItems":1b,"identifier":"minecraft:ender_dragon"}';
//魔咒列表
const Enchant = { "列表": ["水下速掘", "节肢杀手", "爆炸保护", "引雷", "深海探索者", "效率", "摔落保护", "火焰附加", "火焰保护", "火矢", "时运", "冰霜行者", "穿刺", "无限", "击退", "抢夺", "忠诚", "海之眷顾", "饵钓", "经验修补", "多重射击", "穿透", "力量", "弹射物保护", "保护", "冲击", "快速装填", "水下呼吸", "激流", "锋利", "精准采集", "亡灵杀手", "灵魂疾行", "荆棘", "耐久"], "价格": [2000, 3000, 4000, 3000, 3000, 8000, 5000, 5000, 3000, 1000, 10000, 3000, 6000, 1000, 3000, 15000, 1000, 15000, 10000, 10000, 6000, 6000, 13000, 4000, 9000, 6000, 3000, 3000, 3000, 9000, 4000, 6000, 2000, 8000, 12000], "ID": [8, 11, 3, 32, 7, 15, 2, 13, 1, 21, 18, 25, 29, 22, 12, 14, 31, 23, 24, 26, 33, 34, 19, 4, 0, 20, 35, 6, 30, 9, 16, 10, 36, 5, 17] };
//朝向表
const player_direction = ["北方", "东方", "南方", "西方"];
//武器技能cd倒计时
var attack_time = {};
//原木破坏记录
var wreck_log = {};
//玩家挂机判断
var player_move = [{}, {}];
//爆炸分析开关
var baoz = 0;
//tk记录
var tk = 0;
//末影龙强化次数记录
var EnderDragonIn = 0;
//调试输出开关
logger.setConsole(true);
//循环函数开服调用
qingyi_lxl_PlayerPos_testing();
qingyi_lxl_Sidebar();
qingyi_lxl_time();

//侧边栏显示
function qingyi_lxl_Sidebar() {
    try {
        setTimeout(qingyi_lxl_Sidebar, 1000);
        let player_list = mc.getOnlinePlayers();
        if (JSON.stringify(player_list) != "[]") {
            for (var i = 0; i < player_list.length; i++) {
                let json = {}
                json["§l§5平均延迟"] = player_list[i].getDevice().avgPing;
                json["§l§5丢包率"] = player_list[i].getDevice().avgPacketLoss;
                json["§l§2" + player_list[i].getDevice().os] = 0;
                json["§l§6金币余额"] = money.get(player_list[i].xuid);
                if (tk > 20) {
                    tk = 20;
                }
                json["§l§3游戏Tick"] = tk;
                if (player_list[i].hasTag("真实伤害")) {
                    json["真实伤害"] = attack_time[player_list[i].name]["真实伤害"];
                }
                if (player_list[i].hasTag("爆炸攻击")) {
                    json["爆炸攻击"] = attack_time[player_list[i].name]["爆炸攻击"];
                }
                if (player_list[i].hasTag("取你装备")) {
                    json["取你装备"] = attack_time[player_list[i].name]["取你装备"];
                }
                if (player_list[i].hasTag("神圣守护")) {
                    json["神圣守护"] = attack_time[player_list[i].name]["神圣守护"];
                }
                player_list[i].setSidebar("§l§3--肝帝纪元--", json)
                tk = 0;
                if (attack_time[player_list[i].name]["真实伤害"] > 0) {
                    attack_time[player_list[i].name]["真实伤害"] -= 1;
                }
                if (attack_time[player_list[i].name]["爆炸攻击"] > 0) {
                    attack_time[player_list[i].name]["爆炸攻击"] -= 1;
                }
                if (attack_time[player_list[i].name]["取你装备"] > 0) {
                    attack_time[player_list[i].name]["取你装备"] -= 1;
                }
                if (attack_time[player_list[i].name]["神圣守护"] > 0) {
                    attack_time[player_list[i].name]["神圣守护"] -= 1;
                }
            }
        }
    } catch (err) {
        setTimeout(qingyi_lxl_Sidebar, 1000);
    }
}

//每小时执行检查
function qingyi_lxl_time() {
    setTimeout(qingyi_lxl_time, 1000 * 3600);
    var myDate = new Date();
    if (myDate.getHours() == 4) {
        wreck_log = {};
    }
    let player_list = mc.getOnlinePlayers();
    if (JSON.stringify(player_list) != "[]") {
        for (let i = 0; i < player_list.length; i++) {
            player_move = [{}, {}];
            let PlayerMoney = player_list[i].getExtraData("欠款");
            let xuid = player_list[i].xuid;
            if (PlayerMoney > 0) {
                let PlayerMoneyGet = money.get(xuid);
                if (PlayerMoneyGet > 0) {
                    if (PlayerMoney <= PlayerMoneyGet) {
                        if (money.reduce(xuid, PlayerMoney)) {
                            qingyi_lxl_remoney(player, PlayerMoney);
                        }
                    } else if (PlayerMoney > PlayerMoneyGet) {
                        if (money.reduce(xuid, PlayerMoneyGet)) {
                            qingyi_lxl_remoney(player, PlayerMoneyGet);
                        }
                    }
                }
            }
        }
    }
}

//玩家挂机检测
function qingyi_lxl_PlayerPos_testing() {
    setTimeout(qingyi_lxl_PlayerPos_testing, 1000 * 60);
    let playerList = mc.getOnlinePlayers();
    if (JSON.stringify(playerList) != "[]") {
        for (let i in playerList) {
            let player = playerList[i];
            if (player_move[0][player.name] == undefined) {
                player_move[0][player.name] = player.pos.x + ',' + player.pos.y + ',' + player.pos.z;
                player_move[1][player.name] = 0;
            }
            if (player_move[1][player.name] == 3) {
                player_move[1][player.name] = 0;
                player.disconnect('为了您的账号安全，以为您安全下线！')
            } else {
                if (player_move[0][player.name] == player.pos.x + ',' + player.pos.y + ',' + player.pos.z) {
                    if (!player.isOP()) {
                        player_move[1][player.name] += 1;
                    }
                } else {
                    player_move[0][player.name] = player.pos.x + ',' + player.pos.y + ',' + player.pos.z;
                }
            }
        }
    }
}

//拦截床爆炸
function qingyi_lxl_BedExplode(e) {
    if (e.dimid == 2 && baoz == 0) {
        mc.broadcast('在 ' + e.dim + ' 由床引发的爆炸已被拦截！')
        return false;
    }
}

//重生锚爆炸拦截
function qingyi_lxl_RespawnAnchorExplode(e, player) {
    mc.broadcast('玩家： ' + player.name + ' 在 ' + e.dim + ' 由重生锚引起的爆炸已被拦截！')
    return false;
}

//箭，钓竿金币限制
function qingyi_lxl_SpawnProjectile(entity, itme_name) {
    if (itme_name == "minecraft:fishing_hook") {
        let money1 = money.get(data.name2xuid(entity.name))
        if (money1 < 1000) {
            mc.getPlayer(entity.name).tell('余额不足，无法钓鱼');
            return false;
        } else {
            money.reduce(data.name2xuid(entity.name), 1)
        }
    } else if (itme_name == "minecraft:arrow") {
        let money1 = money.get(data.name2xuid(entity.name))
        if (money1 < 2000) {
            mc.getPlayer(entity.name).tell('余额不足，无法使用');
            return false;
        }
    } else if (itme_name == "minecraft:thrown_trident") {
        let money1 = money.get(data.name2xuid(entity.name))
        if (money1 < 3000) {
            mc.getPlayer(entity.name).tell('余额不足，无法使用');
            return false;
        }
    }
}

//玩家破坏加金币
function qingyi_lxl_addmoney(player, block) {
    let ssint = 0;
    if (block.name == "minecraft:coal_ore" || block.name == "minecraft:stone") {
        ssint = 1;
    } else if (block.name == "minecraft:iron_ore" || block.name == "minecraft:gold_ore") {
        ssint = 2;
    } else if (block.name == "minecraft:diamond_ore") {
        ssint = 3;
    } else if (block.name == "minecraft:grass" || block.name == "minecraft:log") {
        if (wreck_log[player.name] == undefined) {
            wreck_log[player.name] = 0;
        }
        if (wreck_log[player.name] <= 300) {
            wreck_log[player.name] += 1;
            ssint = 1;
        }
    }
    if (ssint != 0) {
        player.sendText('§l§6你获得了： ' + ssint + ' 金币', 5);
        money.add(player.xuid, ssint);
    }
}

//破坏方块事件监听及拦截
function qingyi_lxl_DestroyBlock(player, block) {
    let item_name = JSON.parse(player.getHand().getNbt().toString()).Name;
    if (item_name != "") {
        let money1 = money.get(player.xuid)
        let jg = false;
        for (key in item_list_money) {
            if (money1 >= key) {
                for (let i = 0; i < item_list_money[key].length; i++) {
                    if (item_list_money[key][i] == item_name) {
                        qingyi_lxl_addmoney(player, block)
                        jg = true;
                    }
                }
            }
        }
        return jg;
    } else {
        qingyi_lxl_addmoney(player, block)
    }
}

//攻击事件监听及拦截
function qingyi_lxl_Attack(player, entity) {
    let player_item_json = JSON.parse(player.getHand().getNbt().toString());
    let item_name = player_item_json.Name;
    if (item_name != "") {
        let money1 = money.get(player.xuid)
        let jg = false;
        for (key in item_list_money) {
            if (money1 >= key) {
                for (let i = 0; i < item_list_money[key].length; i++) {
                    if (item_list_money[key][i] == item_name) {
                        let sjs = Math.floor(Math.random() * 20);
                        if (sjs >= 8) {
                            if (entity.name == "Ender Dragon") {
                                if (item_name != "minecraft:netherite_sword") {
                                    return false;
                                } else {
                                    let sjs1 = Math.floor(Math.random() * 10);
                                    if (sjs1 > 5) {
                                        jg = true;
                                    }
                                }
                            } else {
                                jg = true;
                            }
                        }
                    }
                }
            }
        }
        return jg;

    } else if (entity.name == "Ender Dragon" || entity.name == "Ender Crystal") {
        return false;
    }
}

//食用给buff并扣分
function qingyi_lxl_Eat(player, item) {
    let buff = buff_list[Math.floor(Math.random() * buff_list.length)];
    let time_s = Math.floor(Math.random() * 60);
    let leve = Math.floor(Math.random() * 4);
    if (money.reduce(player.xuid, 5)) {
        mc.runcmdEx('effect "' + player.name + '" ' + buff + ' ' + time_s + ' ' + leve + ' true');
        player.tell('§l§3你食用了： ' + item.name + ' 获得了' + time_s + ' 秒 ' + leve + ' 级 ' + buff + ' 效果，扣除5金币！', 1);
    }
}

//受伤处理
function qingyi_lxl_MobHurt(mob, source, damage) {
    try {
        if (source.type == "minecraft:player") {
            if (mob.name == "Villager" || mob.name == "Iron Golem") {
                let player = source.toPlayer();
                player.sendText('§l§3你攻击了： ' + mob.name + ' 扣除20金币！请不要恶意攻击！', 5);
                money.reduce(player.xuid, 20);
                return false;
            } else if (mob.isPlayer()) {
                if (money.reduce(source.toPlayer().xuid, 5)) {
                    qingyi_lxl_MobHurt_clearItem(source, mob, damage);
                } else {
                    source.toPlayer().sendText('§l§3你的余额不足，无法攻击！');
                    return false;
                }
            } else {
                qingyi_lxl_MobHurt_hurtitem(source, mob, damage);
            }
        } else {
            if (Math.floor(Math.random() * 10) >= 5) {
                qingyi_lxl_MobHurt_clearItem(source, mob, damage);
            }
        }
    } catch (err) {
    }
}

//装备技能攻击
function qingyi_lxl_MobHurt_hurtitem(source, entity, damage) {
    let player = source.toPlayer();
    let player_item = player.getHand().getNbt().toString();
    let player_item_json = JSON.parse(player.getHand().getNbt().toString());
    if (player_item.indexOf("Lore") != -1) {
        let Lore = player_item_json.tag.display.Lore;
        if (Lore != undefined && Lore[0] == "技能列表：") {
            if (Lore[0] == "技能列表：") {
                let jn = Lore[1];
                if (player.hasTag(jn)) {
                    let jn_dj = Lore[2];
                    if (jn == "真实伤害" && attack_time[player.name][Lore[1]] == 0) {
                        let cd = attack_art[jn][jn_dj]["CD"];
                        let sh = attack_art[jn][jn_dj]["伤害"];
                        attack_time[player.name][jn] = cd;
                        damage = damage + sh;
                        entity.hurt(damage)
                        return false;
                    } else if (jn == "爆炸攻击" && attack_time[player.name][Lore[1]] == 0) {
                        let cd = attack_art[jn][jn_dj]["CD"];
                        let sh = attack_art[jn][jn_dj]["伤害"];
                        let fw = attack_art[jn][jn_dj]["范围"];
                        attack_time[player.name][jn] = cd;
                        mc.explode(entity.pos, null, sh, fw, false, false)
                    } else if (jn == "取你装备" && attack_time[player.name][Lore[1]] == 0) {
                        if (!entity.getArmor().isEmpty()) {
                            let entity_kj = entity.getArmor().getAllItems();
                            let ii = 1;
                            for (let i = 0; i < entity_kj.length; i++) {
                                let item_dx = entity_kj[i];
                                if (ii <= jn_dj) {
                                    if (player.giveItem(item_dx)) {
                                        ii += 1;
                                    }
                                }
                            }
                            entity.getArmor().removeAllItems()
                            entity.refreshItems()
                            let cd = attack_art[jn][jn_dj]["CD"];
                            attack_time[player.name][jn] = cd;
                        }
                    } else if (jn == "神圣守护" && attack_time[player.name][Lore[1]] == 0) {
                        let nbt = entity.getNbt();
                        let getHealth = entity.health;
                        let RestoreLife = attack_art[jn][jn_dj]["治疗量"];
                        let jg = getHealth + RestoreLife;
                        for (let i = 0; i < 14; i++) {
                            if (nbt.getTag("Attributes").getTag(i).getTag("Name").toString() == "minecraft:health") {
                                nbt.getTag("Attributes").getTag(i).getTag("Current").set(jg);
                                entity.setNbt(nbt);
                            }
                        }
                        return false;
                    }
                } else {
                    player.sendText("你无法使用这个武器的技能！");
                    return false;
                }
            }
        }
    }
}

//受到伤害随机掉装备
function qingyi_lxl_MobHurt_clearItem(source, entity, damage) {
    if (entity.isPlayer()) {
        let ct = entity.toPlayer().getInventory();
        if (!ct.isEmpty()) {
            let player_allitem = ct.getAllItems();
            let dy = [];
            let int_a = 0;
            for (let i = 0; i < player_allitem.length; i++) {
                if (player_allitem[i].name != "") {
                    dy[int_a] = i;
                    int_a += 1;
                }
            }
            let sjs = dy[Math.floor(Math.random() * dy.length)];
            let ct_item = ct.getItem(sjs);
            let attack_en = entity.pos;
            let aa = mc.spawnItem(ct_item, attack_en.x + 2, attack_en.y + 2, attack_en.z + 1, attack_en.dimid)
            if (aa != undefined) {
                let remove = ct.removeItem(sjs, ct_item.count);
                entity.toPlayer().refreshItems();
            }
        } else {
            damage += 1;
            entity.hurt(damage)
            return false;
        }
    }
}

//跨纬度扣分
function qingyi_lxl_ChangDim(player, dimid) {
    if (dimid == 0) {
        dimid = '主世界';
        player.tell('§l§3你因使用了传送门前往： ' + dimid + ' 扣除10金币过路费！', 5);
        if (!money.reduce(player.xuid, 50)) {
            qingyi_lxl_remoney(player, 50, true)
        }
    } else if (dimid == 1) {
        dimid = '下界';
        player.tell('§l§3你因使用了传送门前往： ' + dimid + ' 扣除50金币过路费！', 5);
        if (!money.reduce(player.xuid, 100)) {
            qingyi_lxl_remoney(player, 100, true)
        }
    } else if (dimid == 2) {
        dimid = '末地';
        player.tell('§l§3你因使用了传送门前往： ' + dimid + ' 扣除200金币过路费！', 5);
        qingyi_lxl_ChangDim_EnderDragon(true);
        if (!money.reduce(player.xuid, 200)) {
            qingyi_lxl_remoney(player, 200, true)
        }
    }
}

//末影龙状态处理
function qingyi_lxl_ChangDim_EnderDragon(Boolean) {
    let PlayerList = mc.getOnlinePlayers();
    var rezulto = EnderDragonIn;
    let i1 = 0;
    if (JSON.stringify(PlayerList) != "[]") {
        for (let i = 0; i < PlayerList.length; i++) {
            if (PlayerList[i].pos.dimid == 2) {
                i1 += 1;
            }
        }
    }
    if (i1 == 0) {
        let EntityList = mc.getAllEntities();
        if (JSON.stringify(EntityList) != "[]") {
            for (let i = 0; i < EntityList.length; i++) {
                if (EntityList[i].name == "Ender Dragon") {
                    let entity = EntityList[i];
                    entity.setNbt(NBT.parseSNBT(EnderDragon_attribute))
                }
            }
        }
    } else if (i1 > EnderDragonIn) {
        rezulto = i1 - EnderDragonIn + 1;
    } else if (i1 < EnderDragonIn) {
        rezulto = EnderDragonIn - i1 + 1;
    }
    let EntityList = mc.getAllEntities();
    if (JSON.stringify(EntityList) != "[]") {
        for (let i in EntityList) {
            if (EntityList[i].name == "Ender Dragon") {
                logger.log(EntityList[i].getNbt().toSNBT())
                let entity = EntityList[i];
                let nbt = entity.getNbt();
                logger.log(nbt.toString())
                for (let i = 0; i < 14; i++) {
                    if (nbt.getTag("Attributes").getTag(i).getTag("Name").toString() == "minecraft:health") {
                        let Current = nbt.getTag("Attributes").getTag(i).getTag("Current").toString();
                        logger.log(Current)
                        let Calculation = Current;
                        if (Boolean) {
                            EnderDragonIn += 1;
                            Calculation = parseInt(Current) * rezulto;
                        } else {
                            EnderDragonIn -= 1;
                            Calculation = parseInt(Current) / rezulto;
                        }
                        nbt.getTag("Attributes").getTag(i).getTag("Current").set(Calculation);
                        entity.setNbt(nbt);
                    }
                    if (nbt.getTag("Attributes").getTag(i).getTag("Name").toString() == "minecraft:attack_damage") {
                        let AttackDamage = nbt.getTag("Attributes").getTag(i).getTag("Current").toString();
                        let CalculationA = AttackDamage;
                        if (Boolean) {
                            CalculationA = parseInt(AttackDamage) * rezulto;
                        } else {
                            CalculationA = parseInt(AttackDamage) / rezulto;
                        }
                        nbt.getTag("Attributes").getTag(i).getTag("Current").set(CalculationA);
                        entity.setNbt(nbt);
                    }
                }
            }
        }
    }

}

//击杀获得金币
function qingyi_lxl_MobDie(mob, source) {
    if (source != undefined) {
        if (mob.type != "minecraft:player" && source.type == "minecraft:player") {
            if (mob.name == "Ender Dragon") {
                let pos = mob.pos;
                mc.broadcast('§l§3玩家： ' + source.name + ' 成功击杀末影龙，因受到末影龙的诅咒，将在3秒后以该玩家为中心发生爆炸！！请其他玩家注意躲避！', 1);
                if (source.toPlayer().hasTag("解脱者")) {
                    source.toPlayer().removeTag('解脱者');
                }
                source.toPlayer().addTag("屠龙者");
                baoz = 1;
                setTimeout(function () { mc.explode(pos, null, 100, 100, false, true); }, 3000);
                setTimeout(function () { baoz = 0; }, 5000);
            } else {
                for (mob_name in mob_list) {
                    if (mob.name == mob_name) {
                        let player = mc.getPlayer(source.name);
                        player.tell('§l§6你获得了： ' + mob_list[mob.name] + ' 个金币！', 5);
                        money.add(player.xuid, mob_list[mob.name])
                    }
                }
            }
        }
    }
}

//玩家死亡事件处理
function qingyi_lxl_PlayerDie(player, source) {
    let GetMoney = money.get(player.xuid);
    let RemMoney = Math.floor(Math.random() * GetMoney);
    if (!player.hasTag('屠龙者') && !player.hasTag('解脱者') && money.reduce(player.xuid, RemMoney)) {
        mc.broadcast('§l§3玩家： ' + player.name + ' 因死亡随机扣除： ' + RemMoney + ' 金币', 1)
    }
    if (player.hasTag('屠龙者') && source.isPlayer()) {
        let player2 = source.toPlayer();
        let EnderChest = player.getEnderChest();
        if (!EnderChest.isEmpty()) {
            let EnderChestList = EnderChest.getAllItems();
            let ii = 0;
            let ItemName = {};
            for (let i = 0; i < EnderChestList.length; i++) {
                if (EnderChestList[i].name != "") {
                    ItemName[ii] = i;
                    ii += 1;
                }
            }
            let sjs = ItemName[Math.floor(Math.random() * ItemName.length)];
            let GetItem = EnderChest.getItem(sjs);
            if (player.giveItem(GetItem)) {
                EnderChest.removeItem(sjs, GetItem.count);
                mc.broadcast('§l§3玩家： ' + source.name + ' 成功击杀了屠龙者，获得其末影箱随机物品', 1);
            } else {
                mc.broadcast('§l§3玩家： ' + source.name + ' 成功击杀了屠龙者，但因其背包满了无法获得物品', 1);
            }
        } else {
            let PlayerMoney = money.get(player.xuid);
            if (PlayerMoney > 0) {
                if (money.reduce(player.xuid, PlayerMoney)) {
                    money.add(player2.xuid, PlayerMoney);
                    mc.broadcast('§l§3玩家： ' + source.name + ' 成功击杀了屠龙者，因屠龙者末影箱无物品，其将获得屠龙者的所有金币！', 1);
                }
            }
        }
        player2.addTag("解脱者");
        player.removeTag('屠龙者');
    } else if (player.hasTag('解脱者')) {
        player.removeTag('解脱者');
    }
}

//指令监听处理
function qingyi_lxl_PlayerCmd(player, cmd) {
    if (player.isOP() && cmd.indexOf("gmoney") != -1) {
        let name1 = "";
        if (cmd.indexOf('"') != -1) {
            let cmd1 = cmd.split('"');
            name1 = cmd1[1];
            money2 = cmd1[2].split(' ')[1];
            let player1 = mc.getPlayer(name1);
            if (money.add(player1.xuid, parseInt(money2))) {
                player.tell('成功！')
            } else {
                player.tell('失败！')
            }
        } else {
            let cmd1 = cmd.split(" ");
            name1 = cmd1[1];
            money2 = cmd1[2];
            let player1 = mc.getPlayer(name1);
            if (money.add(player1.xuid, parseInt(money2))) {
                player.tell('成功！')
            } else {
                player.tell('失败！')
            }
        }
        return false;
    } else if (cmd == "jineng") {
        let form = mc.newSimpleForm();
        form.setTitle("§l§6强化生存");
        form.setContent("§l§3提示：请选择购买还是强化\n§l§4请注意要手持需要购买技能的武器打开此窗口！");
        form.addButton("§l§3购买武器技能", "https://s3.bmp.ovh/imgs/2021/09/070c7d5cf30904a4.png");
        form.addButton("§l§3强化武器技能", "https://s3.bmp.ovh/imgs/2021/09/253edbaac602f3cd.png");
        form.addButton("§l§3打开附魔界面", "https://s3.bmp.ovh/imgs/2021/09/09c0e762cb9501ce.png");
        form.addButton("§l§3查屠龙者坐标", "https://s3.bmp.ovh/imgs/2021/09/290476a112a76340.png");
        form.addButton("§l§3获取新手引导书", "https://s3.bmp.ovh/imgs/2021/09/118b8910b2a261db.png");
        player.sendForm(form, qingyi_lxl_PlayerCmd_form);
        return false;
    } else if (player.isOP() && cmd == "d") {
        player.giveItem(mc.newItem(NBT.parseSNBT(book_bsnbt)));
    }
}

//选择界面选择后处理
function qingyi_lxl_PlayerCmd_form(player, id) {
    if (id == undefined) {
        return false;
    } else if (id == 0) {
        if (!player.hasTag("取你装备") && !player.hasTag("真实伤害") && !player.hasTag("爆炸攻击") && !player.hasTag("神圣守护")) {
            let player_name = player.getHand().name;
            if (player_name == "Wooden Sword" || player_name == "Stone Sword" || player_name == "Iron Sword" || player_name == "Diamond Sword" || player_name == "Golden Sword" || player_name == "Netherite Sword") {
                let item_json = JSON.parse(player.getHand().getNbt().toString())
                if (JSON.stringify(item_json).indexOf("Lore") == -1) {
                    let bd = mc.newSimpleForm();
                    bd.setTitle("§l§6武器技能购买界面");
                    bd.setContent("§l§3提示：以下三个技能只能购买一个\n§l§4请注意要手持需要购买技能的武器打开此窗口！");
                    bd.addButton("§l§3真实伤害 10000金", "https://s3.bmp.ovh/imgs/2021/09/e7cadbcf80cab7f9.png");
                    bd.addButton("§l§3爆炸攻击 15000金", "https://s3.bmp.ovh/imgs/2021/09/c43e957897b3de91.png");
                    bd.addButton("§l§3神圣守护 20000金", "https://s3.bmp.ovh/imgs/2021/09/27c6bebd486eb69a.png");
                    bd.addButton("§l§3取你装备 100000金", "https://s3.bmp.ovh/imgs/2021/09/e0d9bbfe35abed45.png");
                    player.sendForm(bd, qingyi_lxl_PlayerCmd_form1);
                } else {
                    player.sendText("§l§4此武器已有技能，无法再次获得！！");
                }
            } else {
                player.sendText("§l§4请手持木剑/石剑/铁剑/钻石剑/金剑/下界合金剑再输入指令！");
            }
            return false;
        } else {
            player.sendText("§l§4你已购买过武器技能，无法再次购买！");
            return false;
        }
    } else if (id == 1) {
        if (player.hasTag("取你装备") || player.hasTag("真实伤害") || player.hasTag("爆炸攻击") || player.hasTag("神圣守护")) {
            let player_name = player.getHand().name;
            if (player_name == "Wooden Sword" || player_name == "Stone Sword" || player_name == "Iron Sword" || player_name == "Diamond Sword" || player_name == "Golden Sword" || player_name == "Netherite Sword") {
                let item_json = JSON.parse(player.getHand().getNbt().toString());
                if (JSON.stringify(item_json).indexOf("Lore") != -1) {
                    let lore = item_json.tag.display.Lore;
                    if (parseInt(lore[2]) < 3 && lore[1] == "真实伤害" || lore[1] == "爆炸攻击" || lore[1] == "神圣守护") {
                        let from = mc.newSimpleForm();
                        from.setTitle("§l§6武器技能强化界面");
                        from.setContent("§l§3提示：价高不一定最好\n§l§4请注意要手持需要购买技能的武器打开此窗口！");
                        from.addButton("§l§3" + lore[1] + " " + item_strengthen[lore[1]][parseInt(lore[2]) + 1] + "", "https://s3.bmp.ovh/imgs/2021/09/253edbaac602f3cd.png");
                        player.sendForm(from, qingyi_lxl_PlayerCmd_form2);
                    } else if (parseInt(lore[2]) < 4 && lore[1] == "取你装备") {
                        let from = mc.newSimpleForm();
                        from.setTitle("§l§6武器技能强化界面");
                        from.setContent("§l§3提示：价高不一定最好\n§l§4请注意要手持需要购买技能的武器打开此窗口！");
                        from.addButton("§l§3" + lore[1] + " " + item_strengthen[lore[1]][parseInt(lore[2]) + 1] + "", "https://s3.bmp.ovh/imgs/2021/09/e0d9bbfe35abed45.png");
                        player.sendForm(from, qingyi_lxl_PlayerCmd_form2);
                    } else {
                        player.sendText("§l§4此武器技能已达到满级，无法强化！");
                    }
                } else {
                    player.sendText("§l§4此武器尚未拥有技能，无法强化！");
                }
            } else {
                player.sendText("§l§4请手持木剑/石剑/铁剑/钻石剑/金剑/下界合金剑再输入指令！");
            }
            return false;
        } else {
            player.sendText("§l§4你尚未购买过技能，无法强化！");
            return false;
        }
    } else if (id == 3) {
        let PlayerList = mc.getOnlinePlayers();
        let msg = '玩家不在线或未完成屠龙任务';
        for (let i = 0; i < PlayerList.length; i++) {
            if (PlayerList[i].hasTag("屠龙者")) {
                let pos = PlayerList[i].pos;
                msg = '玩家： ' + PlayerList[i].name + '在 ' + pos.dim + ' ' + Math.round(pos.x) + ' ' + pos.y + ' ' + Math.round(pos.z) + ' 朝向 ' + player_direction[PlayerList[i].direction]
            }
        }
        player.sendText("§l§6" + msg);
    } else if (id == 4) {
        player.giveItem(mc.newItem(NBT.parseSNBT(book_sNbt)));
    } else if (id == 2) {
        let from = mc.newCustomForm();
        from.setTitle("武器附魔选择界面");
        from.addLabel(`你的余额为：${money.get(player.xuid)}`);
        from.addLabel('附魔等级默认为5级');
        from.addDropdown('选择属性', Enchant.列表);
        player.sendForm(from, qingyi_lxl_PlayerCmd_form3);
    }
}

//附魔选择处理
function qingyi_lxl_PlayerCmd_form3(player, id) {
    if (id == undefined) {
        return false;
    } else {
        let money1 = money.get(player.xuid);
        if (money1 >= Enchant["价格"][id[2]]) {
            if (money.reduce(player.xuid, Enchant["价格"][id[2]])) {
                let item = player.getHand();
                let itemNbt = player.getHand().getNbt();
                let judge = itemNbt.getTag("tag");
                if (judge != undefined && judge != null) {
                    let judge1 = judge.getTag("ench");
                    if (judge1 != undefined && judge1 != null) {
                        let nbt2 = new NbtCompound({
                            "id": new NbtShort(Enchant.ID[id[2]]),
                            "lvl": new NbtShort(5)
                        })
                        judge1.addTag(nbt2);
                    } else {
                        let nbt = new NbtList([])
                        let nbt1 = new NbtCompound({
                            "id": new NbtShort(Enchant.ID[id[2]]),
                            "lvl": new NbtShort(5)
                        })
                        nbt.addTag(nbt1)
                        judge.setTag("ench", nbt);
                    }
                } else {
                    let nbt = new NbtCompound({
                        "Damage": new NbtInt(0),
                        "ench": new NbtList([])
                    })
                    let nbt1 = new NbtCompound({
                        "id": new NbtShort(Enchant.ID[id[2]]),
                        "lvl": new NbtShort(5)
                    })
                    nbt.getTag("ench").addTag(nbt1);
                    itemNbt.setTag("tag", nbt);
                }
                item.setNbt(itemNbt);
                player.refreshItems();
            }
        } else {
            player.tell(`§l§4你的余额不足，你还需要 ${Enchant["价格"][id[2]] - money1} 金币`, 1)
        }
    }
}

//强化弹窗选择处理
function qingyi_lxl_PlayerCmd_form2(player, id) {
    if (id == undefined) {
        return false;
    } else {
        let item_json = JSON.parse(player.getHand().getNbt().toString());
        let lore = item_json.tag.display.Lore;
        if (money.get(player.xuid) >= item_strengthen[lore[1]][parseInt(lore[2]) + 1]) {
            if (money.reduce(player.xuid, item_strengthen[lore[1]][parseInt(lore[2]) + 1])) {
                let item = player.getHand();
                let nbt = item.setLore(["技能列表：", lore[1], String(parseInt(lore[2]) + 1)]);
                player.giveItem(item);
                player.sendText("§l§5升级成功！");
            } else {
                player.sendText("§l§4扣款失败，无法强化！", 1);
            }
        } else {
            player.sendText("§l§4余额不足，无法强化！", 1);
        }
    }
}

//购买弹窗选择处理
function qingyi_lxl_PlayerCmd_form1(player, id) {
    if (id == undefined) {
        return false;
    } else if (id == 0) {
        if (money.get(player.xuid) >= 10000) {
            if (money.reduce(player.xuid, 10000)) {
                let item = player.getHand();
                let nbt = item.setLore(["技能列表：", "真实伤害", "1"]);
                player.giveItem(item);
                player.addTag("真实伤害");
                player.sendText("§l§5购买成功！");
            } else {
                player.sendText("§l§4扣款失败！");
            }
        } else {
            player.sendText("§l§4余额不足！")
        }
    } else if (id == 1) {
        if (money.get(player.xuid) >= 15000) {
            if (money.reduce(player.xuid, 15000)) {
                let item = player.getHand();
                let nbt = item.setLore(["技能列表：", "爆炸攻击", "1"]);
                player.giveItem(item);
                player.addTag("爆炸攻击");
                player.sendText("§l§5购买成功！");
            } else {
                player.sendText("§l§4扣款失败！");
            }
        } else {
            player.sendText("§l§4余额不足！");
        }
    } else if (id == 3) {
        if (money.get(player.xuid) >= 100000) {
            if (money.reduce(player.xuid, 100000)) {
                let item = player.getHand();
                let nbt = item.setLore(["技能列表：", "取你装备", "1"]);
                player.giveItem(item);
                player.addTag("取你装备");
                player.sendText("§l§5购买成功！");
            } else {
                player.sendText("§l§4扣款失败！");
            }
        } else {
            player.sendText("§l§4余额不足！");
        }
    } else if (id == 2) {
        if (money.get(player.xuid) >= 20000) {
            if (money.reduce(player.xuid, 20000)) {
                let item = player.getHand();
                let nbt = item.setLore(["技能列表：", "神圣守护", "1"]);
                player.giveItem(item);
                player.addTag("神圣守护");
                player.sendText("§l§5购买成功！");
            } else {
                player.sendText("§l§4扣款失败！");
            }
        } else {
            player.sendText("§l§4余额不足！");
        }
    }
}

//上线处理
function qingyi_lxl_Join(player) {
    if (!player.hasTag('已给书')) {
        player.addTag('已给书');
        player.giveItem(mc.newItem(NBT.parseSNBT(book_sNbt)));
    }
    if (player.hasTag('屠龙者')) {
        let pos = player.pos;
        mc.broadcast('§l§2屠龙者： ' + player.name + ' 上线了！\n§l§2当前所在坐标： ' + pos.dim + ' ' + Math.round(pos.x) + ' ' + pos.y + ' ' + Math.round(pos.z) + '\n§l§2当前血量：' + player.health, 1)
    }
}

//载入游戏处理
function qingyi_lxl_PreJoin(player) {
    if (attack_time[player.name] == undefined) {
        attack_time[player.name] = {};
        for (let key in attack_art) {
            attack_time[player.name][key] = 0;
        }
    }
}

//扣款失败记录及补偿
function qingyi_lxl_remoney(player, money, boolean) {
    let PlayerMoney = player.getExtraData("欠款");
    if (boolean) {
        if (PlayerMoney == undefined) {
            player.setExtraData("欠款", money);
        } else {
            player.setExtraData("欠款", PlayerMoney + money);
        }
    } else {
        player.setExtraData("欠款", PlayerMoney - money);
        player.sendText("§l§6你已还款： " + money + " 金币", 1);
    }
}

//玩家重生监听处理
function qingyi_lxl_Respawn(player) {
    qingyi_lxl_ChangDim_EnderDragon(false)
}

//玩家离线监听处理
function qingyi_lxl_Left(player) {
    qingyi_lxl_ChangDim_EnderDragon(false)
}

//tk监听
function qingyi_lxl_Tick() {
    tk += 1;
}

/*---------------以下为监听器注册---------------*/

mc.listen("onTick", qingyi_lxl_Tick)
//玩家离开游戏监听
mc.listen("onLeft", qingyi_lxl_Left)
//玩家重生监听
mc.listen("onRespawn", qingyi_lxl_Respawn)
//玩家载入游戏监听
mc.listen("onPreJoin", qingyi_lxl_PreJoin)
//玩家死亡监听注册
mc.listen("onPlayerDie", qingyi_lxl_PlayerDie)
//玩家进入游戏监听
mc.listen("onJoin", qingyi_lxl_Join)
//玩家输入指令监听
mc.listen("onPlayerCmd", qingyi_lxl_PlayerCmd)
//生物死亡监听
mc.listen("onMobDie", qingyi_lxl_MobDie)
//跨纬度监听
mc.listen("onChangeDim", qingyi_lxl_ChangDim)
//生物受伤监听
mc.listen("onMobHurt", qingyi_lxl_MobHurt)
//食用物品监听
mc.listen("onEat", qingyi_lxl_Eat)
//攻击监听
mc.listen("onAttack", qingyi_lxl_Attack)
//破坏方块监听
mc.listen("onDestroyBlock", qingyi_lxl_DestroyBlock)
//抛射物监听
mc.listen("onSpawnProjectile", qingyi_lxl_SpawnProjectile)
//重生锚爆炸监听
mc.listen("onRespawnAnchorExplode", qingyi_lxl_RespawnAnchorExplode)
//床爆炸监听
mc.listen("onBedExplode", qingyi_lxl_BedExplode)
//加载提示
setTimeout(function () { logger.log('[INFO] [强化生存] >>> 加载成功，测试版本：v1.9.4，正式版本：0.0.5'); }, 5000);

/*
待办功能：
1，末影水晶自动复活（懒）
2，限制刷怪笼（暂无法实现）
*/


/*
已实现的功能：
1，金币限制，达到对应金币解锁相关装备
2，吃食物给buff，金币足够情况下将随机给buff
3，死亡随机扣除金币
4，跨世界时扣金币
5，只有下界合金剑能对末影龙照成伤害
6，玩家对末影龙的伤害有几率无效
7，末影龙死亡后将会以击杀者为中心半径100的球形范围内照成100点伤害并有火焰
8，玩家在pvp时100%随机掉落物品，pve时有50%的几率掉落物品，玩家无物品可掉落时将会受到真实伤害+1，无视任何护甲。
9，玩家pve时有攻击几率无效。
10，玩家只能使用空手/木制/石制/铁制/金制/钻石制/下界合金制作的物品来进行破坏，攻击。
11，三叉/弓箭/弩箭/钓竿需要金币达到3000/2000/1000才能解锁，并且钓鱼每次消耗1金币。
12，每次PVP攻击扣除5金币，余额不足将无法攻击!
13，玩家挖矿，击杀能获得金币(原木每天只能获取200个金币4点刷新)
14，玩家可使用指令来购买/强化装备技能
15，击杀末影龙的玩家位置可查询，上线全服通告
16，击败击杀末影龙的玩家获得其末影箱随机物品，但是如果背包满了将无法获得，如果屠龙者末影箱无物品，将会将其所有金币给击败者
17，解脱者（第一个击败屠龙者的玩家）有一次死亡免掉金币的机会（获得屠龙者称号后第一次被玩家击杀如果末影箱有物品不会扣金币）
18，在某些事件需要金币但是无法拦截的情况下有负资产记录，并且每小时检测一下余额进行扣款
19，末影龙会根据在末地的玩家来进行强化，当末地多进入一个玩家时，属性会在当前状态下*2，离开一个玩家时，属性会/2以此类推
20，当末地没有玩家并且末影龙没有死亡时，其状态将会恢复到原始默认状态
21，武器技能说明：
    1，真实伤害，分为3个等级，分别在原始伤害上增加1/2/3点伤害，造成真实伤害无视任何护甲。CD时间分别为60/50/40
    2，爆炸攻击，会在被攻击的生物处生成爆炸，分为3个等级，伤害分别为1/2/3，范围分别是2/3/4为半径的球形。CD时间分别是80/70/60（无法在末地使用）
    3，取你装备，本技能会直接拿取怪物身上的装备，分为4个等级，分别对应能拿取1/2/3/4件装备（如果你只有1级但是怪有4件装备你会获得他的一个装备，但是他所有装备会被清除）。CD时间分别是240/230/220/210
    4，神圣守护，本技能可以使被你攻击的对象回血，分为3个等级，分别恢复2/3/4滴血量，CD时间分别为190/180/170（暂时不确定是否能使用）
    提示：武器技能无法对玩家使用（不确定！）
*/