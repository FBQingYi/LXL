const pluginName = 'tombstone';
const pluginDescribe = '墓碑';
const pluginVersion = [0, 0, 1];
const pluginOther = { "版权归属": "LIGHT服务器" };

let path = `./plugins/tombstone/data/`
let DeathDoNotDropQuery;
if (ll.require("hwsa.js")) {
    DeathDoNotDropQuery = ll.import("DeathDoNotDropQuery");
}

mc.listen("onPlayerDie", (player, _source) => {
    if (!DeathDoNotDropQuery(player)) {
        let allItemString = [];
        let pos = player.blockPos;
        let availablePos = getAvailablePos(pos);
        let fileName = `${availablePos.x}_${availablePos.y}_${availablePos.z}_${availablePos.dimid}.json`;
        let playerInventoryC = player.getInventory().getAllItems();
        let playerArmorC = player.getArmor().getAllItems();
        let playerOffHandI = player.getOffHand();
        playerInventoryC.forEach(item => {
            if (!item.isNull()) {
                let itemSNBT = item.getNbt().toSNBT();
                allItemString.push(itemSNBT);
            }
        });
        playerArmorC.forEach(item => {
            if (!item.isNull()) {
                let itemSNBT = item.getNbt().toSNBT();
                allItemString.push(itemSNBT);
            }
        });
        let itemSNBT = playerOffHandI.getNbt().toSNBT();
        allItemString.push(itemSNBT);
        let data = JSON.stringify(allItemString)
        File.writeTo(path + fileName, data);
        mc.setBlock(availablePos, "minecraft:skull");
        player.getInventory().removeAllItems();
        player.getArmor().removeAllItems();
        player.getOffHand().setNull();
        player.refreshItems();
    }
})

mc.listen("onDestroyBlock", (_player, block) => {
    if (block.type == "minecraft:skull") {
        let pos = block.pos;
        let fileName = `${pos.x}_${pos.y}_${pos.z}_${pos.dimid}.json`;
        let data = File.readFrom(path + fileName);
        if (data != undefined) {
            let itemAllSNBT = JSON.parse(data);
            itemAllSNBT.forEach(itemSNBT => {
                let nbt = NBT.parseSNBT(itemSNBT);
                mc.spawnItem(mc.newItem(nbt), pos);
            });
            block.destroy(false);
            File.delete(path + fileName);
            return false;
        }
    }
})

function getAvailablePos(pos) {
    let block = mc.getBlock(pos);
    if (block.isAir) {
        return pos;
    } else {
        let posArray = getAdjacentPoints([pos.x, pos.y, pos.z]);
        for (let i = 0; i < posArray.length; i++) {
            let posA1 = posArray[i];
            let block = mc.getBlock(posA1[0], posA1[1], posA1[2], pos.dimid);
            if (block.isAir) {
                return new IntPos(posA1[0], posA1[1], posA1[2], pos.dimid);
            }
        }
    }
}

function getAdjacentPoints([x, y, z]) {
    return [
        [x + 1, y, z],
        [x - 1, y, z],
        [x, y + 1, z],
        [x, y, z + 1],
        [x, y, z - 1],
    ];
}