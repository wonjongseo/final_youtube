//__dirname = 파일까지의 전체 경로
const path = require("path");
//path.resolve = 입력하는 파트들을 모아서 경로로 만들어줌,

//webpack cli help to use webpack in console
// 오래된 코드만 이해할 수 있다
// enrty 우리가 처리하고 자하는 파일 ( 섹시 자바스립트  소스코드 main.js)
// client폴더의 파일들은 서버가 아니라 브라우저에서 실행될 파일들
// entry의 파일을 설정한 output에 맞게 구식 코드로 변환해줌

//rules 각각의 파일 종유레 따라 어떤 전환을 하는지 결정하는 것
//webpack은 loader를 통해 전환시킴
module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js"),
    },
    module: {
        rules: [
            {
                test: /\.js$/, //all js file 를 변환시키겠다
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]], // npm i babel-loader
                    },
                }, // we use babel loader to transform sexy js to old js
            },
        ],
    },
};
