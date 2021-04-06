const fs = require("fs");
const request = require("request-promise");


const fetchData = async options => {
  const result = await request(options)
  return result
}

module.exports = {
  async getXFTTS(options) {
    const data = await fetchData(options)
    return data
  }
}