let stratServer = 0;
function QingYiLxlCmdBlockExecute(cmd, pos, isMinecart) {
    if (cmd.indexOf('rename') != -1) {
        let je = cmd.split(" ");
        let content = je[3];
        if (je[1] == '@p') {
            if (je[2] == 'add') {
                let xuid = QingYiLxlEuclideanMetric(pos)
                if (xuid != "") {
                    let player = mc.getPlayer(xuid);
                    player.rename(content + player.realName);
                }
            } else if (je[2] == 'remove') {
                let xuid = QingYiLxlEuclideanMetric(pos)
                if (xuid != "") {
                    let player = mc.getPlayer(xuid);
                    player.rename(player.realName);
                }
            }
        } else if (je[1] == '@a') {
            if (je[2] == 'add') {
                let playerList = mc.getOnlinePlayers();
                for (let i in playerList) {
                    playerList[i].rename(content + playerList[i].realName);
                }
            } else if (je[2] == 'remove') {
                let playerList = mc.getOnlinePlayers();
                for (let i in playerList) {
                    playerList[i].rename(playerList[i].realName);
                }
            }
        } else if (je[1] == '@r') {
            let player = QingYiLxlRandom();
            if (je[2] == 'add') {
                player.rename(content + player.realName);
            } else if (je[2] == 'remove') {
                player.rename(player.realName);
            }
        }
        return false;
    } else if (cmd.indexOf('fighting') != -1) {
        let je = cmd.split(" ");
        if (je[1] == "start") {
            let out = Math.floor(Math.random() * 100000);
            stratServer = out;
            let playerList = mc.getOnlinePlayers();
            for (let i in playerList) {
                let player = playerList[i];
                money.set(player.xuid, out);
            }
        } else if (je[1] == "over") {
            let playerList = mc.getOnlinePlayers();
            for (let i in playerList) {
                let player = playerList[i];
                money.set(player.xuid, 0);
            }
        }
        return false;
    }
}

function QingYiLxlRandom() {
    let playerList = mc.getOnlinePlayers();
    let RandomInt = Math.floor(Math.random() * (playerList.length + 1));
    return playerList[RandomInt];
}

function QingYiLxlEuclideanMetric(pos) {
    let PlayerList = mc.getOnlinePlayers();
    let x = pos.x;
    let y = pos.y;
    let z = pos.z;
    let dim = pos.dim;
    let Pjson1 = {};
    let Pjson = [];
    let pdjg = "";
    for (let i in PlayerList) {
        let player = PlayerList[i];
        let playerX = player.pos.x;
        let playerY = player.pos.y;
        let playerZ = player.pos.z;
        let playerDim = player.pos.dim;
        if (playerDim == dim) {
            let xj;
            let yj;
            let zj;
            if (playerX >= x) {
                xj = (playerX - x) * 2;
            } else {
                xj = (x - playerX) * 2;
            }
            if (playerY >= y) {
                yj = (playerY - y) * 2;
            } else {
                yj = (y - playerY) * 2;
            }
            if (playerZ >= z) {
                zj = (playerZ - z) * 2;
            } else {
                zj = (z - playerZ) * 2;
            }
            let a = xj + yj + zj;
            let jieguo = Math.sqrt(a);
            Pjson1[player.xuid] = jieguo;
            Pjson[i] = jieguo;
        }
    }
    let minimum = Math.min.apply(Math, Pjson.map(function (o) { return o }));
    for (let i in Pjson1) {
        if (Pjson1[i] == minimum) {
            pdjg = i;
        }
    }
    return pdjg
}

function QingYiLxlJoin(player) {
    if (stratServer == 0) {
        player.kill();
    }else{
        if(stratServer != money.get(player.xuid)){
            player.kill();
        }
    }
}

mc.listen("onJoin", QingYiLxlJoin)
mc.listen("onCmdBlockExecute", QingYiLxlCmdBlockExecute)