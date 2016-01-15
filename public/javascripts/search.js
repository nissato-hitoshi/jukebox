function search(pageToken) {
  var params = {
    keyword : $('#keyword').val()  
  };
  
  if (pageToken != '' ) {
    params.pageToken =  pageToken;
  }
  
  $.ajax({
      type: "POST",
      url: "/search",
      data: params,
      dataType: "html",
      error: function(req, status, error) {
        alert(error);
      },
      success: function(data) {
        $('#search-container').html(data);
      }
  });
}

function addVideo(val) {
  var url = '/api/movies';
  var val;
  
  val = decodeURIComponent($("#" + val).val());

  $.ajax({
      type: "POST",
      url: url,
      contentType: 'application/JSON',
      data: val,
      dataType: "json",
      error: function(req, status, error) {
        alert(" 登録に失敗しました。: " + error.message);
      },
      success: function(data) {
        alert(" 登録されました。");
      }
  });
}
