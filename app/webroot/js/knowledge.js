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

var send_to_server = function(files) {
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
      // 重複チェック用のファイル名の配列を更新
      file_list.push(files[i].name);
    }
  }
}

var delete_file = function(id, file_name) {
  if (window.confirm("Delete file : " + file_name)) {
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
    // 重複チェック用のファイル名の配列を更新
    file_list = remove_file_name(file_list, file_name);
  }
}

var remove_file_name = function(file_name_list, name) {
  remove_file_list = [];
  for (var i = 0; i < file_name_list.length; i++) {
    if (file_name_list[i] == name) continue;
    remove_file_list.push(file_name_list[i]);
  } 
  return remove_file_list;
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
  send_to_server(files);
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


