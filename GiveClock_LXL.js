logger.setConsole(true);
function qingyi_lxl_onJoin(player) {
    if (!player.hasTag('已送钟')) {
        player.addTag('已送钟');
        let clock_nbt = NBT.parseSNBT('{"Count":1b,"Damage":0s,"Name":"minecraft:clock","WasPickedUp":0b,"tag":{"minecraft:item_lock":2b,"minecraft:keep_on_death":1b}}');
        let clock_item = mc.newItem(clock_nbt);
        let give_clock = player.giveItem(clock_item);
        if (give_clock) {
            logger.log('[GiveClock] >>> ' + player.name + '给予成功');
        }
    }
}

function qingyi_lxl_onUseItemOn(player, item, block, side) {
    let a = JSON.parse(item.getNbt().toString());
    let b = JSON.parse(block.getNbt().toString());
    if (a.Name == "minecraft:clock" && a.tag["minecraft:item_lock"] == 2) {
        if (b.name == "minecraft:glow_frame" || b.name == "minecraft:frame") {
            return false;
        }
    }
}

//进入游戏监听
mc.listen("onJoin", qingyi_lxl_onJoin)
//对方块使用物品监听
mc.listen("onUseItemOn", qingyi_lxl_onUseItemOn)
setTimeout(function(){logger.log('[INFO] [GiveClock] >>> 加载成功，版本：v0.0.2');},5000);