module.exports = {
// baseUrl:’/’,//根目录
    outputDir:'dist',//构建输出目录
    assetsDir:'assets',//静态资源目录
    lintOnSave:false,//是否开启静态 检测
    devServer:{
        open:true,
        host:'0.0.0.0',
        port:8080,
        https:false,
        hotOnly:false,
        hot:true,
        inline:true,
        proxy:{
            '/api':{
                target:'http://localhost:5000/api/',
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'',
                },
            }
        },
    },
    chainWebpack:config=>{
        // 修复HMR
        config.resolve.symlinks(true);
    },
    css:{
        // extract:true
    },

};
