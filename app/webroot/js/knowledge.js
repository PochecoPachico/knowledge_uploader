var task_id;
var knowledge_id;
var file_list;

var knowledge_init = function(t_id, k_id, f_list) {
  task_id = t_id;
  knowledge_id = k_id;
  file_list = f_list;
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

var check_duplicated_file = function(file_name) {
  return !(file_list.indexOf(file_name) == -1);
}

var sendToServer = function(files) {
  var fd = new FormData();

  for (var i = 0; i < files.length; i++) {
    fd.append("knowledge_id", knowledge_id); 
    fd.append("task_id", task_id); 
    fd.append("file", files[i]); 
    if(check_duplicated_file(files[i].name)){
      alert("ファイル名が重複しています : " + files[i].name);
    } else {
      $.ajax({
        url: "/groupware/KnowledgeFiles/register",
        type: "POST",
        processData: false,
        contentType: false,
        data: fd,
        success: function(msg) {
          load_file_list(task_id);
        }
      });
    }
  }
}

var delete_file = function(id, file_name) {
  var data = {
    id: id.toString(),
    file_name: file_name,
    task_id: task_id
  };
  $.ajax({
    url: "/groupware/KnowledgeFiles/delete",
    type: "POST",
    data: data,
    success: function(msg) {
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
  $(this).css('border', '2px dotted #008000');
});

$(document).on("drop", function(e) {
  e.preventDefault();
  $(this).css('border', '2px dotted #008000');
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
  $(this).css('border', '2px dotted #008000');
});

$("#drop_area").on("dragleave", function(e) {
  e.preventDefault();
  $(this).css('border', '2px dotted #008000');
});

$("#drop_area").on("dragend", function(e) {
  e.preventDefault();
  $(this).css('border', '2px dotted #008000');
});


