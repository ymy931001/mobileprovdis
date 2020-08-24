const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
  return config;
};



// let qiniu = require('qiniu'); // 需要加载qiniu模块的
// const accessKey = 'Js6wMMyc8VOlgYh-3MAuWGIFQzui5ayAOhAcIDAJ';
// const secretKey = 'hW7Pli3mbbrpgTYuMLe6ohoa_vleqV4vRpQ25kKl';
// const bucket = 'disinfection';

// router.post('/token', async (ctx, next) => {
//   let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//   console.log(mac)
//   let options = {
//     scope: bucket,
//     expires: 3600 * 24
//   };
//   let putPolicy = new qiniu.rs.PutPolicy(options);
//   let uploadToken = putPolicy.uploadToken(mac);
//   if (uploadToken) {
//     ctx.body = Code('re_success', uploadToken)
//   } else {
//     ctx.body = Code('re_error')
//   }
// })