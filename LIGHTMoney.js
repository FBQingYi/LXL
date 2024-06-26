//--------------基础信息定义--------------
const pluginName = 'LIGHTMoney';
const pluginDescribe = '自用经济核心';
const pluginVersion = [0, 0, 3];
const pluginOther = { "版权归属": "LIGHT服务器" };
const pluginConfigPath = './plugins/LIGHTMoney/';
const BotQQ = 3301683738;
const groupID = 770428976;
const wsUrl = 'ws://127.0.0.1:6096';
let wsc = new WSClient();
let reload = true;
let db;

//共享函数
function LIGHTMoney(type, int, xuid) {
    let playerBalance = db.get(xuid);
    if (playerBalance == undefined) {
        db.set(xuid, 0);//置零
        playerBalance = 0;
    }
    switch (type) {
        case "add":
            if (int > 0) {
                return db.set(xuid, amend(playerBalance, int, "+"));
            }
            break;
        case "remove":
            if (playerBalance >= int) {
                return db.set(xuid, amend(playerBalance, int, "-"));
            }
            break;
        case "query":
            return playerBalance;
    }
}

//链接ws服务器处理群数据
function WsLink() {
    wsc.connect(wsUrl);
    wsc.listen("onTextReceived", (msg) => {
        let MsgJson = JSON.parse(msg);
        if (MsgJson.message_type == "group" && MsgJson.post_type == "message") {
            if (MsgJson.raw_message.substr(0, 1) == "/") {
                let MsgSenderQQ = MsgJson.sender.user_id;
                let url = `http://zc.qingyimc.cn/queryUserByQQ?qq=${MsgSenderQQ}`;
                network.httpGet(url, (status, result) => {
                    if (status == '200') {
                        let QueryResults = JSON.parse(result).xboxid;
                        let playerXuid = data.name2xuid(QueryResults);
                        if (playerXuid != undefined) {
                            let GroupCmd = MsgJson.raw_message;
                            let playerBalance = db.get(playerXuid);
                            if (GroupCmd == '/lmoney') {
                                queryMoney(playerBalance, MsgSenderQQ)
                            } else if (GroupCmd.substr(0, 4) == "/pay") {
                                accounts(MsgJson, playerXuid)
                            }
                        } else {
                            QingYiLxLWsMsg(groupID, `[CQ:at,qq=${MsgSenderQQ}] 未在服务器找到你的唯一ID！`);
                        }
                    }
                });
            }
        }
    })
}

//群指令查询
function queryMoney(playerBalance, MsgSenderQQ) {
    if (playerBalance != undefined) {
        QingYiLxLWsMsg(groupID, `[CQ:at,qq=${MsgSenderQQ}] 当前Y币为：${format(playerBalance, 4)}`);
    } else {
        QingYiLxLWsMsg(groupID, `[CQ:at,qq=${MsgSenderQQ}] 未查询到你的Y币余额！`);
    }
}

//群转账指令
function accounts(MsgJson, playerXuid) {
    try {
        let playerBalance = db.get(playerXuid);
        let addQQ = MsgJson.raw_message.split('qq=')[1].split(']')[0];
        let intmoney = parseFloat(MsgJson.raw_message.split('] ')[1]).toFixed(4);
        if (intmoney <= 0) {
            return;
        }
        let url = `http://zc.qingyimc.cn/queryUserByQQ?qq=${addQQ}`;
        network.httpGet(url, (status, result) => {
            if (status == '200') {
                let QueryResults = JSON.parse(result);
                if (QueryResults.xboxid == null) {
                    let PostMsg = `[系统] 转账失败\n未找到该玩家注册数据`;
                    QingYiLxLWsMsg(groupID, PostMsg);
                } else {
                    if (playerBalance != undefined && playerBalance > intmoney) {
                        db.set(playerXuid, amend(playerBalance, intmoney, "-"));
                        let playerXuid2 = data.name2xuid(QueryResults.xboxid);
                        if (playerXuid2 != undefined) {
                            let playerBalance2 = db.get(playerXuid2);
                            if (playerBalance2 == undefined) {
                                db.set(playerXuid2, 0);
                                playerBalance2 = 0;
                            }
                            db.set(playerXuid2, amend(playerBalance2, intmoney, "+"));
                            QingYiLxLWsMsg(groupID, "转账成功，当前余额：" + format(db.get(playerXuid), 4) + "\n转账金额为：" + format(intmoney, 4));
                        } else {
                            QingYiLxLWsMsg(groupID, `[CQ:at,qq=${MsgSenderQQ}] 未在服务器找到接收方的唯一ID！`);
                        }
                    } else {
                        QingYiLxLWsMsg(groupID, "转账失败，当前余额：" + format(playerBalance, 4) + "\n转账金额为：" + format(intmoney,4));
                    }

                }
            } else {
                let PostMsg = `[系统] 转账失败\n请求玩家id出错`;
                QingYiLxLWsMsg(groupID, PostMsg);
            }
        });
    } catch (error) {
        let PostMsg = `[系统] 转账失败\n请检查@目标或者金额是否正常！`;
        QingYiLxLWsMsg(groupID, PostMsg);
    }
}

/**
 * 解决小数点后数值漂移的运算
 * @param {*} num1 数值1
 * @param {*} num2 数值2
 * @param {*} symbol 字符格式的运算符号
 * @returns 
 */
function amend(num1, num2, symbol) {
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

//发送群消息
function QingYiLxLWsMsg(group, PostMsg) {
    let Msgjson = {
        "action": "send_group_msg",
        "params": {
            "group_id": group,
            "message": PostMsg,
            "auto_escape": false
        },
        "echo": "1254588"
    }
    wsc.send(JSON.stringify(Msgjson))
}

//服务器启动完成
mc.listen("onServerStarted", () => {
    WsLink();
    db = new KVDatabase(pluginConfigPath)
});

//后台指令监听
mc.listen("onConsoleCmd", (cmd) => {
    if (reload && cmd.indexOf('ll reload LIGHTMoney') != -1 || cmd == 'll reload') {
        reload = false;
        db.close();//关闭数据库
        setTimeout(() => {
            mc.runcmdEx(cmd);
        }, 1000);
        return false;
    } else if (reload && cmd == 'stop') {
        reload = false;
        db.close();//关闭数据库
        setTimeout(() => {
            mc.runcmdEx(cmd);
        }, 1000);
        return false;
    } else if (cmd.indexOf('lmoney set') != -1) {
        let name = cmd.split(' ')[2];
        let playerXuid2 = data.name2xuid(name);
        db.set(playerXuid2, parseFloat(cmd.split(' ')[3]).toFixed(4));
        return false;
    } else if (cmd.indexOf('lmoney add') != -1) {
        let name = cmd.split(' ')[2];
        let playerXuid2 = data.name2xuid(name);
        db.set(playerXuid2, amend(db.get(playerXuid2), parseFloat(cmd.split(' ')[3]).toFixed(4), "+"));
        return false;
    } else if (cmd.indexOf('lmoney remove') != -1) {
        let name = cmd.split(' ')[2];
        let playerXuid2 = data.name2xuid(name);
        let remove = amend(db.get(playerXuid2), parseFloat(cmd.split(' ')[3]).toFixed(4), "-");
        if (!remove < 0) {
            db.set(playerXuid2, parseFloat(remove));
        }
        return false;
    }
});

function format(num, cent) {
    num = parseFloat(num)
    return (num.toFixed(cent) + '').replace(/\d{1,4}(?=(\d{4})+(\.\d*)?$)/g, '$&,');
}

ll.export(LIGHTMoney, "LIGHTMoney");

ll.registerPlugin(pluginName, pluginDescribe, pluginVersion, pluginOther);