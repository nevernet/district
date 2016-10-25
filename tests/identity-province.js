const fs = require('fs');
const util = require('util');
const mysql = require('mysql')

// var str = '11  北京市 \
// 12  天津市 \
// 13  河北省 \
// 14  山西省 \
// 15  内蒙古自治区 \
// 21  辽宁省 \
// 22  吉林省 \
// 23  黑龙江省 \
// 31  上海市 \
// 32  江苏省 \
// 33  浙江省 \
// 34  安徽省 \
// 35  福建省 \
// 36  江西省 \
// 37  山东省 \
// 41  河南省 \
// 42  湖北省 \
// 43  湖南省 \
// 44  广东省 \
// 46  海南省 \
// 50  重庆市 \
// 51  四川省 \
// 52  贵州省 \
// 53  云南省 \
// 54  西藏自治区 \
// 61  陕西省 \
// 62  甘肃省 \
// 63  青海省 \
// 64  宁夏回族自治区 \
// 65  新疆维吾尔自治区 \
// 71  台湾省 \
// 81  香港特别行政区 \
// 82  澳门特别行政区 ';

fs.readFile('identity-province.txt', 'utf8', (err, data) => {
    if (err) throw err;

    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(/\s+/i);
        if (line.length != 2) continue;
        // console.log(line[0].trim(), line[1].trim());
        console.log(util.format("provinceMap[%s] = \"%s\"", line[0], line[1]));
    }
});


var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'guestbook',
    charset: 'utf8'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT * from apo_areacode', function (err, rows, fields) {
    if (err) throw err;

    //   console.log(rows[19]);

    rows.forEach(function (row) {
        fs.appendFile('indentity-zone.txt', util.format("zoneMap[%s] = \"%s\"\n", row.zone, row.description), (err) => {
            if (err) throw err;
        });
    }, this);

});

connection.end();