var task_id;
var knowledge_id;

var knowledge_init = function(t_id, k_id) {
  task_id = t_id;
  knowledge_id = k_id;
  load_file_list(task_id);
}

var load_file_list = function(task_id) {
  $.ajax({
    type: "GET",
    url: "/groupware/knowledges/fileList/" + task_id,
    success: function(msg){
      $("#fileList").html(msg);
    }
  });
}

var constructData = function(files) {
  var fd = new FormData();
  var uploadData = {
    file: files[0],
    knowledge_id: knowledge_id
  }; 
  console.debug(uploadData);
  fd.append("file", files[0]);
  // fd.append("knowledge", uploadData);
  return fd;
}

var sendToServer = function(files) {
  var fd = new FormData();

  fd.append("knowledge_id", knowledge_id); 
  fd.append("task_id", task_id); 
  fd.append("file", files[0]); 

  $.ajax({
    url: "/groupware/KnowledgeFiles/register",
    type: "POST",
    processData: false,
    contentType: false,
    data: fd,
    success: function(msg) {
      console.debug(msg);
      load_file_list(task_id);
    }
  });
}

// ページ全体のドラッグアンドドロップイベントを無効にする
$(document).on("dragenter", function(e) {
  // これ以上イベントを伝えない
  e.stopPropagation();
  // デフォルトの挙動をキャンセル
  e.preventDefault();
  $(this).css('border', '2px dotted #008000');
});

$(document).on("dragover", function(e) {
  e.stopPropagation();
  e.preventDefault();
  $(this).css('border', '2px solid #008000');
});

$(document).on("drop", function(e) {
  e.preventDefault();
  $(this).css('border', '2px solid #008000');
});

// drop_areaにドロップした時
$("#drop_area").on("dragenter", function(e) {
  e.stopPropagation();
  e.preventDefault();
  $(this).css('border', '2px solid #0B85A1');
});

$("#drop_area").on("dragover", function(e) {
  e.stopPropagation();
  e.preventDefault();
  $(this).css('border', '2px solid #0B85A1');
});

$("#drop_area").on("drop", function(e) {
  var files = e.originalEvent.dataTransfer.files;
  e.preventDefault();
  sendToServer(files);
});
