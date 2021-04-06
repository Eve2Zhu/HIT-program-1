const fs = require("fs");
const crypto = require("crypto");
const request = require("request-promise");

const xfUrl = "http://api.xfyun.cn/v1/service/v1/tts";
const xfAppid = "5ac43002";
const xfApiKey = "17319b09879a73a79b7e7bc3c9e95c05";

module.exports = {
  /** 语音合成 - 腾讯 */
  async ttsXF(ctx) {
    let formData = decodeURI(ctx.request.querystring)
    console.log(formData)
    var jsonOri = {
      auf: "audio/L16;rate=16000",
      aue: "raw",
      voice_name: "xiaoyan",
      speed: "50",
      volume: "50",
      pitch: "50",
      engine_type: "intp65",
      text_type: "text"
    };
    var param = Buffer.from(JSON.stringify(jsonOri)).toString("base64");
    var curTime = Date.parse(new Date())
      .toString()
      .slice(0, -3);
    var checkSum = crypto
      .createHash("md5")
      .update(xfApiKey + curTime + param)
      .digest("hex");

    var options = {
      uri: xfUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-Param": param,
        "X-Appid": xfAppid,
        "X-CurTime": curTime,
        "X-CheckSum": checkSum
      },
      form: formData,
      resolveWithFullResponse: true,
      encoding: null
    };

    await request(options)
      .then(response => {
        if (response.statusCode == 200) {
          let headers = response.headers;
          if (headers["content-type"] == "audio/mpeg") {
            fs.writeFile(`${headers.sid}.wav`, response.body, function(err) {
              if (err) return console.error(err);
            });
            ctx.body = {
              status: 'ok',
              message: '合成成功!',
              sid: headers.sid
            }
          } else {
            ctx.body = {
              status: 'fail',
              message: response.body
            }
          }
        } else {
          ctx.body = {
            status: 'fail',
            message: '第三方接口调用失败!'
          }
        }
      })
  }
};