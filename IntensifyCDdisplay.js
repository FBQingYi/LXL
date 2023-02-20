let Talent = ll.require("Intensify.js");
let Intensify = ll.import("intensify", "cd");
let pid

function SidebarOver() {
    let playerList = mc.getOnlinePlayers();
    if (JSON.stringify(playerList) != "[]") {
        playerList.forEach(player => {
            let playerCd = Intensify(player);
            player.removeSidebar()
            //log(playerCd)
            let json = {}
            json["§l§5吸血宝石"] = playerCd.vampireGem;
            json["§l§3暴击宝石"] = playerCd.powerGem;
            json["§l§3爆炸宝石"] = playerCd.explosiveGem;
            json["§l§3经验宝石"] = playerCd.experienceGem;
            player.setSidebar("§l§3--测试之门--", json)
        });
    }

}

mc.listen("onServerStarted", () => {
    pid = setInterval(function () { SidebarOver() }, 1000);
});


