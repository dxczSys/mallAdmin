/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://192.168.3.10:9001/api/';
  window.SITE_CONFIG['uploadUrl'] = window.SITE_CONFIG['baseUrl'] + 'file/fileUploads'
  window.SITE_CONFIG['fileUrl'] = 'http://192.168.3.10:9004/' + 'filename='

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
