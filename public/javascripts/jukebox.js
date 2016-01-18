// YoutubeのJSファイルをロードします。
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YoutubeのJSファイルがロードされ実行されると、
// onYouTubeIframeAPIReadyメソッドが呼ばれるので、
// 再生準備を行います。
var player;
var videoindex = 0;

function onYouTubeIframeAPIReady() {
  var videoId = '';

  // 先頭のビデオID取得
 getPlayVideoId();
  
  // "player"という文字列は、divのID属性の値を指定します。
  player = new YT.Player('player', {
    height: '230',
    width: '350',
    videoId: $('#videoId').val(),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function getPlayVideoId(index) {
  $.ajax({
      type: "GET",
      url: "/api/getPlayVideoId",
      dataType: "json",
      async : false,
      error: function(req, status, error) {
        console.log("error");
      },
      success: function(result) {
        $('#videoId').val(result.videoId);
        $('#objectId').val(result._id);
      }
  });  
}

function deleteVideo(id) {
  var val = '';
  
  $.ajax({
      type: "DELETE",
      url: "/api/movies/" + id,
      dataType: "json",
      async : false,
      error: function(req, status, error) {
        console.log("error");
      },
      success: function() {
        window.location.reload();
      }
  });  
}

function updatePlayCount() {
  $.ajax({
      type: "get",
      url: "/api/updatePlayCount/" + $('#objectId').val(),
      dataType: "json",
      async : false,
      error: function(req, status, error) {
        console.log("error");
      },
      success: function() {
        console.log("ok");
      }
  });  
}

// 再生が可能になると呼び出されます。
function onPlayerReady(event) {
 //   if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
 //       && navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
        // 再生を開始します。
        event.target.playVideo();
 //   } else {
        // iphone, android の場合自動再生は行わない。
 //   }
}

// 再生した、停止したなどのプレーヤーのステータスが変わった場合に
// 呼び出されます。
function onPlayerStateChange(event) {
  // 再生が終わったら、alertしてみます

  switch (event.data) {
    case YT.PlayerState.ENDED:
      console.log('再生終了');

      // 再生回数の更新
      updatePlayCount();

      // 次のVideoId取得
      getPlayVideoId();

      // 取得したVideoIDの再生
      player.loadVideoById($('#videoId').val());
      
      break;
    case YT.PlayerState.PLAYING:
      console.log('再生中');
      break;
    case YT.PlayerState.PAUSED:
      console.log('停止中');
      break;
    case YT.PlayerState.BUFFERING:
      console.log('バッファリング中。。。');
      break;
    case YT.PlayerState.CUED:
      console.log('頭出し済');
      break;
  }
}

$(function() {
  // 再生
  $('#play').click(function() {
    player.playVideo();
  });
  // 一時停止
  $('#pause').click(function() {
    player.pauseVideo();
  });
  // 1分前へ
  $('#prev').click(function() {
    // 現在の再生時間取得
    var currentTime = player.getCurrentTime();
    // シークバーの移動
    player.seekTo(currentTime - 60);
  });
  // 1分先へ
  $('#next').click(function() {
    // 現在の再生時間取得
    var currentTime = player.getCurrentTime();
    // シークバーの移動
    player.seekTo(currentTime + 60);
  });
  // 音量アップ(+10)
  $('#volup').click(function() {
    // 現在の音量取得
    var currentVol = player.getVolume();
    player.setVolume(currentVol + 10);
  });
  // 音量ダウン(-10)
  $('#voldown').click(function() {
    // 現在の音量取得
    var currentVol = player.getVolume();
    player.setVolume(currentVol - 10);
  });
  // ミュート
  $('#mute').click(function() {
    // ミュートされているかどうか
    if(player.isMuted()) {
      // ミュートの解除
      player.unMute();
    } else {
      // ミュート
      player.mute();
    }
  });
});
