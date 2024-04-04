const PluginsName = 'gives';
const PluginsIntroduction = '一个用于强化give指令功能的插件';
const PluginsVersion = [0, 3, 1];
const PluginsOtherInformation = { "插件作者": "清漪花开", "开源地址": "https://github.com/FBQingYi/LLSE/blob/main/gives.js" };
let itemCmdType;

//命令注册
function CommandRegistration() {
    let Command = mc.newCommand("gives", "给你一个原版无法实现的give！", PermType.GameMasters);
    Command.mandatory("玩家对象", ParamType.Player);
    Command.mandatory("物品对象", ParamType.Item);
    Command.mandatory("数量", ParamType.Int);
    Command.optional("显示名称", ParamType.String);
    Command.optional("Lore", ParamType.JsonValue);
    Command.optional("附魔数据", ParamType.JsonValue);
    Command.overload(["玩家对象", "物品对象", "数量", "显示名称", "附魔数据", "Lore"]);
    Command.overload(["玩家对象", "物品对象", "数量", "显示名称", "附魔数据"]);
    Command.overload(["玩家对象", "物品对象", "数量", "附魔数据"]);
    Command.overload(["玩家对象", "物品对象", "数量", "附魔数据", "Lore"]);

    Command.setCallback((_cmd, _origin, output, results) => {
        setTimeout(function () {
            let it;
            if (results.附魔数据 == undefined || results.附魔数据 == "") {
                it = NewItemNbt(itemCmdType, results.显示名称, "", results.数量)
            } else {
                it = NewItemNbt(itemCmdType, results.显示名称, JSON.parse(results.附魔数据), results.数量)
            }
            
            if (results.Lore != undefined) {
                let lore = JSON.parse(results.Lore).lore;
                it.setLore(lore);
            }
            let playerList = results.玩家对象;
            let playerName = "";
            for (let i in playerList) {
                let player = playerList[i];
                player.giveItem(it);
                playerName += `${player.name} `;
            }
        }, 10)
        output.success(`ok`)
    });
    Command.setup();
}

/**
 * 修改物品nbt
 * @param {Item} item 物品对象
 * @param {String} itemDIsplayName 显示名称
 * @param {Array} itemEnch 魔咒列表 
 * @param {Int} itemCount 数量
 * @returns 
 */
function NewItemNbt(item, itemDIsplayName, itemEnch, itemCount) {
    let nbt = item.getNbt();
    let nbt1 = "";
    if (itemDIsplayName == undefined) {
        nbt1 = new NbtCompound({
            "Damage": new NbtInt(0),
            "RepairCost": new NbtInt(1),
            "ench": new NbtList([]),
        })
    } else {
        nbt1 = new NbtCompound({
            "Damage": new NbtInt(0),
            "RepairCost": new NbtInt(1),
            "display": new NbtCompound({
                "Name": new NbtString(itemDIsplayName)
            }),
            "ench": new NbtList([]),
        })
    }
    if (itemEnch != "" && itemEnch != {} && JSON.stringify(itemEnch) != "{}") {
        if (itemEnch.Enchantments != undefined) {
            for (let i = 0; i < itemEnch.Enchantments.length; i++) {
                let nbt2 = new NbtCompound({
                    "id": new NbtShort(parseInt(itemEnch.Enchantments[i].n)),
                    "lvl": new NbtShort(parseInt(itemEnch.Enchantments[i].l))
                })
                let ench = nbt1.getTag("ench");
                ench.addTag(nbt2);
            }
        }
    }
    nbt.setTag("tag", nbt1);
    nbt.setTag("Count", new NbtByte(parseInt(itemCount)));
    return mc.newItem(nbt);
}

mc.listen("onPlayerCmd", (_player, cmd) => {
    if (cmd.split(' ')[0] == 'gives' || cmd.split(' ')[0] == '/gives') {
        itemCmdType = mc.newItem('minecraft:' + cmd.split(' ')[2], 1)
    }
})

mc.listen("onCmdBlockExecute", (cmd, _pos, _isMinecart) => {
    if (cmd.split(' ')[0] == 'gives' || cmd.split(' ')[0] == '/gives') {
        itemCmdType = mc.newItem('minecraft:' + cmd.split(' ')[2], 1)
    }
})

mc.listen("onServerStarted", () => { CommandRegistration() })

ll.export(NewItemNbt, "NewItemNbt");
ll.registerPlugin(PluginsName, PluginsIntroduction, PluginsVersion, PluginsOtherInformation)

/**
 * 031
 * NewItemNbt函数直接返回物品对象.
 */