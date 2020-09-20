if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => {
      console.log('Service worker registered.', reg);
    });
}


    $('#wicon').attr('src', "./img/dummy.png");
    document.getElementById("send-button").onclick = function() { 
    var lat = "34.751371" 
    var lon = "135.9331174"

    get_weather(lat, lon);

    }
    function get_weather(lat, lon){
       $('#wicon').attr('src', "./img/load.png");
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lang=en&lat=" + lat + "&lon=" + lon,
          "method": "GET",
          "headers": {
             "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
             "x-rapidapi-key": "56756eeb34msh2020ed539edf055p142e7bjsna604afc4a2aa"
          }
       }
       $.ajax(settings).done(function (response) {
          var magic_num = 1;
          var datetime = String(JSON.stringify(response["data"][magic_num]["datetime"]).slice(1,-1));
          //var datetime = "2020-9-26";
          console.log(datetime)
          var day = Number(datetime.split("-")[2])
          console.log(day);

        //   var no_data_flag = false;
          var end_flag = true;
          var tmp = 0;
        //   var tmp = day - 19;
        //   if (tmp < 0){
        //      tmp = 0;
        //      no_data_flag = true;
        //   }

          console.log(tmp);
          var datetime = JSON.stringify(response["data"][magic_num-tmp]["datetime"]);
        　var weather_code = JSON.stringify(response["data"][magic_num-tmp]["weather"]["code"]);
          var max_temp = JSON.stringify(response["data"][magic_num-tmp]["max_temp"]);
          var weather_name = JSON.stringify(response["data"][magic_num-tmp]["weather"]["description"]);
          var weather_icon =  code2icon(weather_code);
          var iconurl = "https://openweathermap.org/img/wn/" + weather_icon + "@2x.png";
          console.log(response);
          console.log(datetime);
          console.log(weather_icon)
          console.log(weather_name);
          $('#wicon').attr('src', iconurl);

          if (end_flag){
            document.getElementById('result0').innerHTML = "宴は終わった…<br>とりあえず明日の天気でも見てろ^^"
          }
        //   if (no_data_flag){
        //      document.getElementById('result0').innerHTML = "2020-9-19 の天気はまだ配信されていません！<br>代わりに" + datetime.slice(1,-1) +" の天気でも見てろ^^"
        //   }
        //   else{
        //      document.getElementById('result0').innerHTML = datetime.slice(1, -1) + " の天気予報やで！"
        //   }
          document.getElementById('result1').innerHTML = "天気：" + String(weather_name.slice(1,-1))
          document.getElementById('result2').innerHTML = "最高気温：" + String(max_temp) + "℃"

       });
             }
       function code2icon(code){
          var dic = { 2:"11d",3:"09d", 5:"09d", 6:"13d", 7:"50d", 800:"01d", 801:"02d", 802:"03d", 803:"04d", 804:"04d"};
          var tmp
          var icon
          tmp = String(code).slice(0,1);
          if (tmp == "8"){
             tmp = String(code).slice(0,3);
          }
          icon = dic[tmp]
          return icon;
       }

       //--omikuji--
       jQuery( function() {
          jQuery( '#jquery-ui-effect' ) . click( function() {
             jQuery( '#jquery-ui-effect' ) . effect( 'explode', '', 700 );
                var mikuji = draw_omikuji();
               sleep(1, function () {
                document.getElementById('omikuji').innerHTML = mikuji
                });
          } );
       } );

       function draw_omikuji() {
          const condition = [["生焼けの",2], ["極上の",5], ["焼け過ぎた",- 1], ["ミディアムレアな",3], ["炭火焼き",4], ["スーパーの",1], ["腐った",-2], ["冷凍の",0]];
          const niku = [["牛肉",4],["神戸ビーフ",5],["豚肉",3],["鶏肉",2],["成型肉",1]];
          const adjectives = ["まるで", "さながら", "さしずめ"]
          const bui = ["カルビ","ザブトン","リブロース","サーロイン","ナカバラ","トモバラ","カイノミ","ヒレ","シャトーブリアン","ランプ","イチボ","メガネ","ウチモモ","ソトモモ","なか肉","友三角","シンシン","マルカワ","スネ"]
          const NumberOFcond = Math.floor(Math.random() * condition.length);
          const NumberOFniku = Math.floor(Math.random() * niku.length);
          const NumberOFbui = Math.floor(Math.random() * bui.length);

          var score = condition[NumberOFcond][1] + niku[NumberOFniku][1];
          if (score < 2) {
             var tex = "<br>あなたの今日の運勢は<br>" + adjectives[2] + "<br>" + condition[NumberOFcond][0] + niku[NumberOFniku][0] + "<br>ラッキー部位は " + bui[NumberOFbui] +"!";
          }
          else if(score < 6) {
             var tex = "<br>あなたの今日の運勢は<br>" + adjectives[1] + "<br>" + condition[NumberOFcond][0] + niku[NumberOFniku][0] + "<br>ラッキー部位は " + bui[NumberOFbui] +"!";
          }
          else{
             var tex = "<br>あなたの今日の運勢は<br>" + adjectives[0] + "<br>" + condition[NumberOFcond][0] + niku[NumberOFniku][0] + "<br>ラッキー部位は " + bui[NumberOFbui] +"!";
          }
          return tex
       }
       
       function sleep(waitSec, callbackFunc) {
       
          // 経過時間（秒）
          var spanedSec = 0;
       
          // 1秒間隔で無名関数を実行
          var id = setInterval(function () {
       
             spanedSec++;
       
             // 経過時間 >= 待機時間の場合、待機終了。
             if (spanedSec >= waitSec) {
       
                   // タイマー停止
                   clearInterval(id);
       
                   // 完了時、コールバック関数を実行
                   if (callbackFunc) callbackFunc();
             }
          }, 1000);
       
       }
