//--------------基础信息定义--------------
const pluginName = 'TaskSystem';
const pluginDescribe = '任务系统';
const pluginVersion = [0, 0, 8];
const pluginOther = { "作者": "清漪花开" };
const pluginConfigPath = './plugins/TaskSystem/';

//--------------基础配置文件--------------
const configJson = { "cmd": "playjust", "CmdDescription": "打开任务系统", "TimeReset": 3 };
const ServerEntityList = { "zombie": "僵尸", "skeleton": "小白" };
const TaskType = ["日常任务", "限时任务", "逃杀任务", "全服任务"];
const JudgmentExample = { "日常任务": {}, "限时任务": {}, "逃杀任务": {}, "全服任务": {} }
//--------------写入基础配置文件--------------
if (!File.exists(pluginConfigPath)) {//判断文件夹是否存在
    File.writeTo(pluginConfigPath + 'config.json', JSON.stringify(configJson, null, "\t"));//格式化写入基础配置文件
    File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify({}, null, "\t"));
    File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify({}, null, "\t"));
    File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify({}, null, "\t"));
    File.writeTo(pluginConfigPath + 'Data/EntityList.json', JSON.stringify(ServerEntityList, null, "\t"));
}
let basicProfile = JSON.parse(File.readFrom(pluginConfigPath + 'config.json'));//读取基础配置文件
let PlayerTaskData = JSON.parse(File.readFrom(pluginConfigPath + 'Data/PlayerTaskData.json'));
let ServerTaskData = JSON.parse(File.readFrom(pluginConfigPath + 'Data/ServerTaskData.json'));
let EntityList = JSON.parse(File.readFrom(pluginConfigPath + 'Data/EntityList.json'));
let PlayerTaskReceiving = JSON.parse(File.readFrom(pluginConfigPath + 'Data/PlayerTaskReceiving.json'));
let TimeReset = false;
let pid = 0;

mc.regPlayerCmd(basicProfile.cmd, basicProfile.CmdDescription, (player, args) => {
    if (JSON.stringify(PlayerTaskData[player.xuid]) == JSON.stringify(JudgmentExample)) {
        TaskForm_1(player)
    } else {
        TaskForm_0(player)
    }
})

//玩家加入游戏
mc.listen("onPreJoin", (player) => {
    if (PlayerTaskData[player.xuid] == undefined) {
        PlayerTaskData[player.xuid] = JudgmentExample;
        PlayerTaskReceiving[player.xuid] = [];
        File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
        File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
    }
})
//实体死亡
mc.listen("onMobDie", (mob, source, cause) => {
    if (source != undefined && source.isPlayer() && !mob.isPlayer()) {
        let MobName = mob.type.split(':')[1];
        let player = source.toPlayer();
        if (PlayerTaskData[player.xuid]["日常任务"][MobName] != undefined) {
            let CurrentTask = PlayerTaskData[player.xuid]["日常任务"][MobName];
            if (CurrentTask.quantity - 1 == 0) {
                player.tell(`任务：${CurrentTask.describe} 完成，获得奖励：${CurrentTask.Money}`)
                money.add(player.xuid, CurrentTask.Money);
                delete PlayerTaskData[player.xuid]["日常任务"][MobName];
                File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
            } else {
                player.tell(`${CurrentTask.describe}  ${ServerTaskData["日常任务"][MobName].quantity - CurrentTask.quantity + 1}/${ServerTaskData["日常任务"][MobName].quantity}`, 5)
                PlayerTaskData[player.xuid]["日常任务"][MobName].quantity -= 1;
            }
        }
        if (PlayerTaskData[player.xuid]["限时任务"][MobName] != undefined) {
            let CurrentTask = PlayerTaskData[player.xuid]["限时任务"][MobName];
            if (CurrentTask.quantity - 1 == 0) {
                player.tell(`任务：${CurrentTask.describe} 完成，获得奖励：${CurrentTask.Money}`)
                money.add(player.xuid, CurrentTask.Money);
                delete PlayerTaskData[player.xuid]["限时任务"][MobName];
                File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
            } else {
                player.tell(`${CurrentTask.describe}  ${ServerTaskData["限时任务"][MobName].quantity - CurrentTask.quantity + 1}/${ServerTaskData["限时任务"][MobName].quantity}`, 5)
                PlayerTaskData[player.xuid]["限时任务"][MobName].quantity -= 1;
            }
        }
        if (PlayerTaskData[player.xuid]["全服任务"][MobName] != undefined) {
            let CurrentTask = PlayerTaskData[player.xuid]["全服任务"][MobName];
            if (CurrentTask.quantity - 1 == 0) {
                player.tell(`任务：${CurrentTask.describe} 完成，获得奖励：${CurrentTask.Money}`)
                money.add(player.xuid, CurrentTask.Money);
                DeletePlayerTaskData(CurrentTask.id, "全服任务")
                mc.broadcast(`[任务中心]>> 全服任务 中的 ${MobName} 任务已被${player.name}完成，\n[任务中心]>>任务ID: ${CurrentTask.id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
            } else {
                player.tell(`${CurrentTask.describe}  ${ServerTaskData["全服任务"][MobName].quantity - CurrentTask.quantity + 1}/${ServerTaskData["全服任务"][MobName].quantity}`, 5)
                PlayerTaskData[player.xuid]["全服任务"][MobName].quantity -= 1;
            }
        }
    }
})
//玩家死亡
mc.listen("onPlayerDie", (player, source) => {
    if (ServerTaskData["逃杀任务"][player.name] != undefined) {
        if (source == undefined || !source.isPlayer()) {
            DeletePlayerTaskData(ServerTaskData["逃杀任务"][player.name].id, "逃杀任务")
            mc.broadcast(`[任务中心]>> 逃杀任务 中的 ${player.name} 任务因玩家非击杀死亡，任务结束！，\n[任务中心]>>任务ID: ${ServerTaskData["逃杀任务"][player.name].id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
        } else if (source.isPlayer()) {
            let player2 = source.toPlayer();
            if (PlayerTaskData[player2.xuid]["逃杀任务"][player.name] == undefined) {
                DeletePlayerTaskData(PlayerTaskData[player2.xuid]["逃杀任务"][player.name].id, "逃杀任务")
                mc.broadcast(`[任务中心]>> 逃杀任务 中的 ${player.name} 任务因非任务玩家击杀死亡，任务结束！，\n[任务中心]>>任务ID: ${ServerTaskData["逃杀任务"][player.name].id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
            } else {
                money.add(player2.xuid, PlayerTaskData[player2.xuid]["逃杀任务"][player.name].Money);
                DeletePlayerTaskData(PlayerTaskData[player2.xuid]["逃杀任务"][player.name].id, "逃杀任务")
                mc.broadcast(`[任务中心]>> 逃杀任务 中的 ${player.name} 已被${player2.name}击杀，任务结束！，\n[任务中心]>>任务ID: ${ServerTaskData["逃杀任务"][player.name].id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
            }
        }
    }
})
//玩家下线
mc.listen("onLeft", (player) => {
    if (ServerTaskData["逃杀任务"] != undefined && JSON.stringify(ServerTaskData["逃杀任务"]) != '{}') {
        if (ServerTaskData["逃杀任务"][player.name] != undefined) {
            delete ServerTaskData["逃杀任务"][player.name];
            File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
            DeletePlayerTaskData(ServerTaskData["逃杀任务"][player.name].id, "逃杀任务")
            mc.broadcast(`[任务中心]>> 逃杀任务 中的 ${player.name} 任务因玩家下线导致任务失效！，\n[任务中心]>>任务ID: ${ServerTaskData["逃杀任务"][player.name].id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
        }
    }
})
//玩家攻击
mc.listen("onAttackEntity", (player, entity) => {
    if (player.hasTag('设置模式') && player.isOP() && !entity.isPlayer()) {
        let EntityName = entity.type.split(':')[1];
        if (EntityList[EntityName] == undefined) {
            let fm = mc.newCustomForm()
                .setTitle('任务系统-生物设置')
                .addInput('生物名称', '设置你想显示的名称')
            player.sendForm(fm, (player, data) => {
                if (data == undefined) {
                    return false;
                } else {
                    if (data[0] == '') {
                        player.tell('请输入名称！')
                    } else {
                        EntityList[EntityName] = data[0];
                        File.writeTo(pluginConfigPath + 'Data/EntityList.json', JSON.stringify(EntityList, null, "\t"));
                        player.tell('设置成功！')
                    }
                }
            })
        } else {
            player.tell('该生物已设置！')
        }
        return false;
    }
})
//后台指令监听
mc.listen("onConsoleCmd", (cmd) => {
    if (cmd == 'll reload TaskSystem.js' || cmd == 'll reload TaskSystem' || cmd == 'll reload' && pid != 0) {
        clearInterval(pid);
    }
})


/**
 * 系统任务主页
 * @param {*} player 玩家对象
 * @returns 无返回内容
 */
function TaskForm_1(player) {
    let form = mc.newSimpleForm()//创建表单对象
        .setTitle('任务系统')
        .setContent('请选择：')
        .addButton('§l§a[日常任务]')
        .addButton('§l§9[限时任务]')
        .addButton('§l§c[逃杀任务]')
        .addButton('§l§d[全服任务]');
    if (player.isOP()) {
        form.addButton('§l§6[任务设置]');
        form.addButton('§l§6[生物设置]');
    }
    player.sendForm(form, (player, id) => {
        if (id == undefined) {
            return false;
        } else {
            switch (id) {
                case 0:
                    DailyTasksForm(player)
                    break;
                case 1:
                    TimeLimitedTaskForm(player)
                    break;
                case 2:
                    EscapeMissionTaskForm(player)
                    break;
                case 3:
                    FullServerTaskForm(player)
                    break;
                case 4:
                    if (player.isOP()) {
                        OPSetServerTask(player)
                    }
                    break;
                case 5:
                    if (player.isOP()) {
                        if (player.hasTag('设置模式')) {
                            player.removeTag('设置模式')
                            player.tell('已经退出设置生物模式！')
                        } else {
                            player.addTag('设置模式')
                            player.tell('已进入设置生物模式，请去攻击生物吧！！建议创造模式！\n退出的话再点一次这个按钮即可！');
                        }
                    }
                    break;
            }
        }
    })
}

/**
 * 任务设置面板
 * @param {*} player 玩家对象
 */
function OPSetServerTask(player) {
    let fm = mc.newCustomForm()
        .setTitle('任务系统-设置')
        .addDropdown('任务类型', TaskType)
        .addInput('任务描述')
        .addSwitch('已有任务管理模式', false);
    player.sendForm(fm, (player, data) => {
        if (data == undefined) {
            return false;
        } else if (!data[2]) {
            let TaskEntityList = [];
            for (let i in EntityList) {
                TaskEntityList[TaskEntityList.length] = EntityList[i];
            }
            if (data[0] == 0) {
                let fm = mc.newCustomForm()
                    .setTitle('任务系统-日常任务设置')
                    .addDropdown('任务生物', TaskEntityList)
                    .addInput('击杀数量', '20', '20')
                    .addInput('奖励金币', '', '200');
                player.sendForm(fm, (player, data1) => {
                    if (data1 == undefined) {
                        return false;
                    } else {
                        if (ServerTaskData["日常任务"] == undefined) {
                            ServerTaskData["日常任务"] = {};
                        }
                        if (ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] == undefined) {
                            ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] = {}
                            ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].id = system.randomGuid();
                            ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].describe = data[1];
                            ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].quantity = parseInt(data1[1]);
                            ServerTaskData["日常任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].Money = parseInt(data1[2]);
                            player.tell('设置成功！');
                            File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
                        } else {
                            player.tell('设置失败，已存在相同任务！');
                        }
                    }
                })
            } else if (data[0] == 1) {
                let fm = mc.newCustomForm()
                    .setTitle('任务系统-限时任务设置')
                    .addDropdown('任务生物', TaskEntityList)
                    .addInput('击杀数量', '20', '20')
                    .addInput('任务时长', '单位是分钟', '60')
                    .addInput('奖励金币', '', '200');
                player.sendForm(fm, (player, data1) => {
                    if (data1 == undefined) {
                        return false;
                    } else {
                        if (ServerTaskData["限时任务"] == undefined) {
                            ServerTaskData["限时任务"] = {};
                        }
                        if (ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] == undefined) {
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] = {}
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].id = system.randomGuid();
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].describe = data[1];
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].quantity = parseInt(data1[1]);
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].StopTime = parseInt(data1[2]);
                            ServerTaskData["限时任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].Money = parseInt(data1[3]);
                            player.tell('设置成功！');
                            File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
                        } else {
                            player.tell('设置失败，已存在相同任务！');
                        }
                    }
                })
            } else if (data[0] == 2) {
                let playerOnlineList = mc.getOnlinePlayers();
                let playerOnlineListName = [];
                playerOnlineList.forEach(OnlinePlayer => {
                    playerOnlineListName[playerOnlineListName.length] = OnlinePlayer.name;
                });
                let fm = mc.newCustomForm()
                    .setTitle('任务系统-逃生任务设置')
                    .addDropdown('任务玩家', playerOnlineListName)
                    .addInput('追杀时长', '单位是分钟', '60')
                    .addInput('奖励金币', '', '100');
                player.sendForm(fm, (player, data1) => {
                    if (data1 == undefined) {
                        return false;
                    } else {
                        if (ServerTaskData["逃杀任务"] == undefined) {
                            ServerTaskData["逃杀任务"] = {};
                        }
                        if (ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name] == undefined) {
                            ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name] = {}
                            ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name].id = system.randomGuid();
                            ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name].describe = data[1];
                            ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name].StopTime = parseInt(data1[1]);
                            ServerTaskData["逃杀任务"][playerOnlineList[data1[0]].name].Money = parseInt(data1[2]);
                            player.tell('设置成功！');
                            File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
                            mc.broadcast(`${playerOnlineList[data1[0]].name} 被设定为追杀人物，\n悬赏金额：${data1[2]} ，\n悬赏时长：${data1[1]}分钟。\n如果规定时间内未死亡，其将会获得奖励金币，追杀期间其下线任务结束，无奖励！`)
                        } else {
                            player.tell('设置失败，已存在相同任务！');
                        }
                    }
                })
            } else if (data[0] == 3) {
                let fm = mc.newCustomForm()
                    .setTitle('任务系统-全服任务设置')
                    .addDropdown('任务生物', TaskEntityList)
                    .addInput('击杀数量', '200', '200')
                    .addInput('奖励金币', '每个玩家获得的奖励', '100');
                player.sendForm(fm, (player, data1) => {
                    if (data1 == undefined) {
                        return false;
                    } else {
                        if (ServerTaskData["全服任务"] == undefined) {
                            ServerTaskData["全服任务"] = {};
                        }
                        if (ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] == undefined) {
                            ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])] = {}
                            ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].id = system.randomGuid();
                            ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].describe = data[1];
                            ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].quantity = parseInt(data1[1]);
                            ServerTaskData["全服任务"][getObjectKey(EntityList, TaskEntityList[data1[0]])].Money = parseInt(data1[2]);
                            player.tell('设置成功！');
                            File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
                        } else {
                            player.tell('设置失败，已存在相同任务！');
                        }
                    }
                })
            }
        } else if (data[2]) {
            let fm = mc.newSimpleForm()
                .setTitle('任务系统-已有任务管理')
                .setContent('请选择任务：');
            let CurrentSelection = ServerTaskData[TaskType[data[0]]];
            let CurrentSelectionTaskList = [];
            for (let i in CurrentSelection) {
                CurrentSelectionTaskList[CurrentSelectionTaskList.length] = i;
                fm.addButton(`${i}\n${CurrentSelection[i].describe}`)
            }
            player.sendForm(fm, (player, id0) => {
                if (id0 == undefined) {
                    return false;
                } else {
                    let CurrentTask = CurrentSelection[CurrentSelectionTaskList[id0]];
                    let fm = mc.newSimpleForm()
                        .setTitle('任务系统-已有任务管理')
                        .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${CurrentTask.Money}\n任务数量：${CurrentTask.quantity}`)
                        .addButton('删除任务');
                    player.sendForm(fm, (player, id1) => {
                        if (id1 == undefined) {
                            return false;
                        } else {
                            if (id1 == 0) {
                                delete ServerTaskData[TaskType[data[0]]][CurrentSelectionTaskList[id0]];
                                File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
                                DeletePlayerTaskData(CurrentTask.id, TaskType[data[0]])
                                player.tell('已删除任务：' + CurrentTask.describe)
                                mc.broadcast(`[任务中心]>>${TaskType[data[0]]} 中的 ${CurrentSelectionTaskList[id0]} 任务已被删除，\n[任务中心]>>任务ID: ${CurrentTask.id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
                            }
                        }
                    })
                }
            })
        }
    })
}

/**
 * 日常任务处理
 * @param {*} player 玩家对象
 */
function DailyTasksForm(player) {
    let DailyTasks = ServerTaskData["日常任务"];
    let TaskPlayerChoiceList = [];
    let fm = mc.newSimpleForm()
        .setTitle('任务系统-日常任务')
        .setContent('请选择：');
    for (let TaskName in DailyTasks) {
        TaskPlayerChoiceList[TaskPlayerChoiceList.length] = TaskName;
        fm.addButton(`${TaskName}\n${DailyTasks[TaskName].describe} 奖励：${DailyTasks[TaskName].Money}`);
    }
    player.sendForm(fm, (player, id0) => {
        if (id0 == undefined) {
            return false;
        } else {
            let CurrentTask = DailyTasks[TaskPlayerChoiceList[id0]];
            if (JSON.stringify(PlayerTaskReceiving[player.xuid]).indexOf(CurrentTask.id) == -1) {
                let fm1 = mc.newSimpleForm()
                    .setTitle('任务系统-日常任务')
                    .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${CurrentTask.Money}\n任务数量：${CurrentTask.quantity}`)
                    .addButton('领取任务')
                    .addButton('回到游戏');
                player.sendForm(fm1, (player, id1) => {
                    if (id1 == undefined) {
                        return false;
                    } else {
                        if (id1 == 0) {
                            if (PlayerTaskData[player.xuid] == undefined) {
                                PlayerTaskData[player.xuid] = {}
                            }
                            if (PlayerTaskData[player.xuid]["日常任务"] == undefined) {
                                PlayerTaskData[player.xuid]["日常任务"] = {};
                            }
                            if (PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]] == undefined) {
                                PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]] = {}
                            }
                            PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]].id = CurrentTask.id;
                            PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]].describe = CurrentTask.describe;
                            PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]].quantity = CurrentTask.quantity;
                            PlayerTaskData[player.xuid]["日常任务"][TaskPlayerChoiceList[id0]].Money = CurrentTask.Money;
                            PlayerTaskReceiving[player.xuid][PlayerTaskReceiving[player.xuid].length] = CurrentTask.id;
                            player.tell('任务领取成功！')
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
                        } else if (id1 == 1) {
                            return false;
                        }
                    }
                })
            } else {
                player.tell('你已经领取过了！无法再次领取！')
            }
        }
    })
}


/**
 * 限时任务处理
 * @param {*} player 玩家对象
 */
function TimeLimitedTaskForm(player) {
    let DailyTasks = ServerTaskData["限时任务"];
    let TaskPlayerChoiceList = [];
    let fm = mc.newSimpleForm()
        .setTitle('任务系统-限时任务')
        .setContent('请选择：');
    for (let TaskName in DailyTasks) {
        TaskPlayerChoiceList[TaskPlayerChoiceList.length] = TaskName;
        fm.addButton(`${TaskName}\n${DailyTasks[TaskName].describe} 时长：${DailyTasks[TaskName].StopTime}分钟 奖励：${DailyTasks[TaskName].Money}`);
    }
    player.sendForm(fm, (player, id0) => {
        if (id0 == undefined) {
            return false;
        } else {
            let CurrentTask = DailyTasks[TaskPlayerChoiceList[id0]];
            if (JSON.stringify(PlayerTaskReceiving[player.xuid]).indexOf(CurrentTask.id) == -1) {
                let fm1 = mc.newSimpleForm()
                    .setTitle('任务系统-限时任务')
                    .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${CurrentTask.Money}\n任务数量：${CurrentTask.quantity}\n任务限时：${CurrentTask.StopTime}`)
                    .addButton('领取任务')
                    .addButton('回到游戏');
                player.sendForm(fm1, (player, id1) => {
                    if (id1 == undefined) {
                        return false;
                    } else {
                        if (id1 == 0) {
                            if (PlayerTaskData[player.xuid] == undefined) {
                                PlayerTaskData[player.xuid] = {}
                            }
                            if (PlayerTaskData[player.xuid]["限时任务"] == undefined) {
                                PlayerTaskData[player.xuid]["限时任务"] = {};
                            }
                            if (PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]] == undefined) {
                                PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]] = {}
                            }
                            PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]].id = CurrentTask.id;
                            PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]].describe = CurrentTask.describe;
                            PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]].quantity = CurrentTask.quantity;
                            PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]].StopTime = CurrentTask.StopTime;
                            PlayerTaskData[player.xuid]["限时任务"][TaskPlayerChoiceList[id0]].Money = CurrentTask.Money;
                            player.tell('任务领取成功！')
                            PlayerTaskReceiving[player.xuid][PlayerTaskReceiving[player.xuid].length] = CurrentTask.id;
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                        } else if (id1 == 1) {
                            return false;
                        }
                    }
                })
            } else {
                player.tell('你已经领取过了！无法再次领取！')
            }
        }
    })
}

/**
 * 逃生任务处理
 * @param {*} player 玩家对象
 */
function EscapeMissionTaskForm(player) {
    let DailyTasks = ServerTaskData["逃杀任务"];
    let TaskPlayerChoiceList = [];
    let fm = mc.newSimpleForm()
        .setTitle('任务系统-逃杀任务')
        .setContent('请选择：');
    for (let TaskName in DailyTasks) {
        TaskPlayerChoiceList[TaskPlayerChoiceList.length] = TaskName;
        fm.addButton(`${TaskName}\n${DailyTasks[TaskName].describe} 奖励：${DailyTasks[TaskName].Money}`);
    }
    player.sendForm(fm, (player, id0) => {
        if (id0 == undefined) {
            return false;
        } else {
            let CurrentTask = DailyTasks[TaskPlayerChoiceList[id0]];
            if (JSON.stringify(PlayerTaskReceiving[player.xuid]).indexOf(CurrentTask.id) == -1) {
                if (player.name == TaskPlayerChoiceList[id0]) {
                    player.tell('不可自己追杀自己！')
                } else {
                    let fm1 = mc.newSimpleForm()
                        .setTitle('任务系统-逃杀任务')
                        .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${CurrentTask.Money} \n任务限时：${CurrentTask.StopTime}`)
                        .addButton('领取任务')
                        .addButton('回到游戏');
                    player.sendForm(fm1, (player, id1) => {
                        if (id1 == undefined) {
                            return false;
                        } else {
                            if (id1 == 0) {
                                if (PlayerTaskData[player.xuid] == undefined) {
                                    PlayerTaskData[player.xuid] = {}
                                }
                                if (PlayerTaskData[player.xuid]["逃杀任务"] == undefined) {
                                    PlayerTaskData[player.xuid]["逃杀任务"] = {};
                                }
                                if (PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]] == undefined) {
                                    PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]] = {}
                                }
                                PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]].id = CurrentTask.id;
                                PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]].describe = CurrentTask.describe;
                                PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]].StopTime = CurrentTask.StopTime;
                                PlayerTaskData[player.xuid]["逃杀任务"][TaskPlayerChoiceList[id0]].Money = CurrentTask.Money;
                                PlayerTaskReceiving[player.xuid][PlayerTaskReceiving[player.xuid].length] = CurrentTask.id;
                                File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
                                player.tell('任务领取成功！')
                                File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                            } else if (id1 == 1) {
                                return false;
                            }
                        }
                    })
                }
            } else {
                player.tell('你已经领取过了！无法再次领取！')
            }
        }
    })
}

/**
 * 全服任务处理
 * @param {*} player 玩家对象
 */
function FullServerTaskForm(player) {
    let DailyTasks = ServerTaskData["全服任务"];
    let TaskPlayerChoiceList = [];
    let fm = mc.newSimpleForm()
        .setTitle('任务系统-全服任务')
        .setContent('请选择：');
    for (let TaskName in DailyTasks) {
        TaskPlayerChoiceList[TaskPlayerChoiceList.length] = TaskName;
        fm.addButton(`${TaskName}\n${DailyTasks[TaskName].describe} 奖励：${DailyTasks[TaskName].Money}`);
    }
    player.sendForm(fm, (player, id0) => {
        if (id0 == undefined) {
            return false;
        } else {
            let CurrentTask = DailyTasks[TaskPlayerChoiceList[id0]];
            if (JSON.stringify(PlayerTaskReceiving[player.xuid]).indexOf(CurrentTask.id) == -1) {
                let fm1 = mc.newSimpleForm()
                    .setTitle('任务系统-全服任务')
                    .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${CurrentTask.Money}\n任务数量：${CurrentTask.quantity}`)
                    .addButton('领取任务')
                    .addButton('回到游戏');
                player.sendForm(fm1, (player, id1) => {
                    if (id1 == undefined) {
                        return false;
                    } else {
                        if (id1 == 0) {
                            if (PlayerTaskData[player.xuid] == undefined) {
                                PlayerTaskData[player.xuid] = {}
                            }
                            if (PlayerTaskData[player.xuid]["全服任务"] == undefined) {
                                PlayerTaskData[player.xuid]["全服任务"] = {};
                            }
                            if (PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]] == undefined) {
                                PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]] = {}
                            }
                            PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]].id = CurrentTask.id;
                            PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]].describe = CurrentTask.describe;
                            PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]].quantity = CurrentTask.quantity;
                            PlayerTaskData[player.xuid]["全服任务"][TaskPlayerChoiceList[id0]].Money = CurrentTask.Money;
                            PlayerTaskReceiving[player.xuid][PlayerTaskReceiving[player.xuid].length] = CurrentTask.id;
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
                            player.tell('任务领取成功！')
                            File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                        } else if (id1 == 1) {
                            return false;
                        }
                    }
                })
            } else {
                player.tell('你已经领取过了！无法再次领取！')
            }
        }
    })
}

/**
 * 已接任务详情
 * @param {*} player 玩家对象
 * @returns 无返回内容
 */
function TaskForm_0(player) {
    let daily = '';
    let TimeLimit = '';
    let escape = '';
    let whole = '';
    let form = mc.newSimpleForm()//创建表单对象
    let PlayerTaskList = PlayerTaskData[player.xuid];
    form.setTitle('任务系统-当前进度')
    let FormMsh = ""
    if (PlayerTaskList["日常任务"] != undefined && JSON.stringify(PlayerTaskList["日常任务"]) != '{}') {
        let dailyList = PlayerTaskList["日常任务"];
        for (let i in dailyList) {
            daily += `${i}:${dailyList[i].describe}  ${ServerTaskData["日常任务"][i].quantity - dailyList[i].quantity}/${ServerTaskData["日常任务"][i].quantity}\n`;
        }
        FormMsh += `§l§a[日常任务]\n${daily}\n`
    }
    if (PlayerTaskList["限时任务"] != undefined && JSON.stringify(PlayerTaskList["限时任务"]) != '{}') {
        let TimeLimitList = PlayerTaskList["限时任务"];
        for (let i in TimeLimitList) {
            TimeLimit += `${i}:${TimeLimitList[i].describe}  ${ServerTaskData["限时任务"][i].quantity - TimeLimitList[i].quantity}/${ServerTaskData["限时任务"][i].quantity} 剩余时间：${TimeLimitList[i].StopTime} 分钟\n`;
        }
        FormMsh += `§l§9[限时任务]\n${TimeLimit}\n`
    }
    if (PlayerTaskList["逃杀任务"] != undefined && JSON.stringify(PlayerTaskList["逃杀任务"]) != '{}') {
        let escapeList = PlayerTaskList["逃杀任务"];
        for (let i in escapeList) {
            escape += `${i}:${escapeList[i].describe} 剩余时间：${ServerTaskData["逃杀任务"][i].StopTime} 分钟\n`;
        }
        FormMsh += `§l§c[逃杀任务]\n${escape}\n`
    }
    if (PlayerTaskList["全服任务"] != undefined && JSON.stringify(PlayerTaskList["全服任务"]) != '{}') {
        let wholeList = PlayerTaskList["全服任务"];
        for (let i in wholeList) {
            whole += `${i}:${wholeList[i].describe}   ${ServerTaskData["全服任务"][i].quantity - wholeList[i].quantity}/${ServerTaskData["全服任务"][i].quantity}\n`;
        }
        FormMsh += `§l§d[全服任务]\n${whole}\n`
    }
    form.setContent(FormMsh)
    form.addButton('[任务中心]')
    form.addButton('[任务管理]')
    form.addButton('[回到游戏]');
    player.sendForm(form, (player, id) => {
        if (id == undefined || id == 2) {
            return false;
        } else if (id == 0) {
            TaskForm_1(player)
        } else if (id == 1) {
            let fm = mc.newCustomForm()
                .setTitle('任务系统-已接任务管理')
                .addDropdown('任务类型', TaskType)
            player.sendForm(fm, (player, data) => {
                if (data == undefined) {
                    return false;
                } else {
                    let fm = mc.newSimpleForm()
                        .setTitle('任务系统-已有任务管理')
                        .setContent('请选择任务：');
                    let CurrentSelection = PlayerTaskList[TaskType[data[0]]];
                    let CurrentSelectionTaskList = [];
                    for (let i in CurrentSelection) {
                        CurrentSelectionTaskList[CurrentSelectionTaskList.length] = i;
                        fm.addButton(`${i}\n${CurrentSelection[i].describe}`)
                    }
                    player.sendForm(fm, (player, id) => {
                        if (id == undefined) {
                            return false;
                        } else {
                            let CurrentTask = CurrentSelection[CurrentSelectionTaskList[id]];
                            let fm = mc.newSimpleForm()
                                .setTitle('任务系统-已有任务管理')
                                .setContent(`任务描述：${CurrentTask.describe}\n任务奖励：${ServerTaskData[TaskType[data[0]]][CurrentSelectionTaskList[id]].Money}\n任务数量：${CurrentTask.quantity}`)
                                .addButton('删除任务');
                            player.sendForm(fm, (player, id1) => {
                                if (id1 == undefined) {
                                    return false;
                                } else {
                                    if (id1 == 0) {
                                        delete PlayerTaskList[TaskType[data[0]]][CurrentSelectionTaskList[id]];
                                        File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                                        player.tell('已删除任务：' + TaskType[data[0]] + CurrentTask.describe)
                                    }
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

//计时器
function timer() {
    pid = setInterval(function () {
        for (let name in ServerTaskData["逃杀任务"]) {
            if (ServerTaskData["逃杀任务"][name].StopTime - 1 == 0) {
                DeletePlayerTaskData(ServerTaskData["逃杀任务"][name].id, "逃杀任务")
                mc.broadcast(`[任务中心]>>逃杀任务 中的 ${name} 任务因倒计时结束被删除，\n[任务中心]>>任务ID: ${ServerTaskData["逃杀任务"][name].id} \n[任务中心]>>目前任务已结束，将清理各位玩家的接取数据！`)
                if (mc.getPlayer(name) != undefined) {
                    money.add(mc.getPlayer(name).xuid, ServerTaskData["逃杀任务"][name].Money);
                }
            } else {
                ServerTaskData["逃杀任务"][name].StopTime -= 1;
            }
        }
        File.writeTo(pluginConfigPath + 'Data/ServerTaskData.json', JSON.stringify(ServerTaskData, null, "\t"));
        for (let xuid in PlayerTaskData) {
            if (PlayerTaskData[xuid]["限时任务"] != undefined && JSON.stringify(PlayerTaskData[xuid]["限时任务"]) != '{}') {
                let TimeLimitedTask = PlayerTaskData[xuid]["限时任务"];
                for (let details in TimeLimitedTask) {
                    let TaskDetails = TimeLimitedTask[details];
                    if (TaskDetails.StopTime - 1 == 0) {
                        DeletePlayerTaskData(TaskDetails.id, "限时任务")
                        if (mc.getPlayer(xuid) != undefined) {
                            mc.getPlayer(xuid).tell('限时任务：' + details + '已结束！');
                        }
                    } else {
                        TaskDetails.StopTime -= 1;
                    }
                }
            }
        }
        File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
        if (!TimeReset) {
            if (system.getTimeObj().h == basicProfile.TimeReset) {
                TimeReset = true;
                if (ServerTaskData["日常任务"] != undefined && JSON.stringify(ServerTaskData["日常任务"]) != '{}') {
                    for (let i in ServerTaskData["日常任务"]) {
                        let id = ServerTaskData["日常任务"][i].id;
                        for (let xuid in PlayerTaskReceiving) {
                            PlayerTaskReceiving[xuid].forEach((id1, key) => {
                                if (id1 == id) {
                                    PlayerTaskReceiving[xuid].splice(key, 1);
                                }
                            });
                        }
                    }
                    File.writeTo(pluginConfigPath + 'Data/PlayerTaskReceiving.json', JSON.stringify(PlayerTaskReceiving, null, "\t"));
                }
            }
        } else {
            if (system.getTimeObj().h == basicProfile.TimeReset + 1) {
                TimeReset = false;
            }
        }
    }, 1000 * 60)
}

/**
 * 系统删除任务和删除玩家已接任务数据
 * @param {*} TaskId 任务唯一Id
 * @param {*} TaskTypeData 任务类型
 * 
 */
function DeletePlayerTaskData(TaskId, TaskTypeData) {
    for (let xuid in PlayerTaskData) {
        if (JSON.stringify(PlayerTaskData[xuid][TaskTypeData]) != '{}') {
            let PlayerTaskList = PlayerTaskData[xuid][TaskTypeData];
            for (let i in PlayerTaskList) {
                if (PlayerTaskList[i].id == TaskId) {
                    delete PlayerTaskList[i];
                    File.writeTo(pluginConfigPath + 'Data/PlayerTaskData.json', JSON.stringify(PlayerTaskData, null, "\t"));
                }
            }
        }
    }
}

/**
 * 通过对象值来寻找键(key)
 * @param {Object} object 查找的值
 * @param {*} value 需要寻找的键
 * @returns 对象中查找到的key
 */
let getObjectKey = (object, value) => {
    return Object.keys(object).find(key => object[key] == value);
}

timer()
ll.registerPlugin(pluginName, pluginDescribe, pluginVersion, pluginOther);