module.exports = async ctx => {
  const title = '语音接口服务器'
  await ctx.render('index', {
    title
  })
}