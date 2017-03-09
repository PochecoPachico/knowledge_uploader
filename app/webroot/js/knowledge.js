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

var add_progress_bar = function(file_num, file_name) {
  var progress_bar_content = '<div class="ui indicating progress" id="file_' + file_num + '"><div class="bar"></div><div class="label">' + file_name + ' : <span>0</span>%</div></div>';
  $("#progress_bar_area").append(progress_bar_content);
  $("#file_" + file_num).progress({
    percent: 0
  });
}

var update_progress_bar = function(file_num,  percentage) {
  $("#file_" + file_num).progress({
    percent: percentage
  });
  $("#file_" + file_num + " span").text(percentage);
}

var delete_progress_bar = function(file_num) {
  $("#file_" + file_num).remove();
}

var send_to_server = function(files) {
  var fd = new FormData();

  // 処理が終了するまで離脱防止
  prevent_move(true);

  for (var i = 0; i < files.length; i++) {
    fd.append("knowledge_id", knowledge_id); 
    fd.append("task_id", task_id); 
    fd.append("file", files[i]); 
    if(check_duplicated_file(files[i].name)){
      alert("ファイル名が重複しています : " + files[i].name);
    } else {
      // プログレスバー表示
      add_progress_bar(i, files[i].name);
      $.ajax({
        url: "/groupware/KnowledgeFiles/register",
        xhr: function() {
          XHR = $.ajaxSettings.xhr();
          if (XHR.upload) {
            XHR.upload.addEventListener('progress',
              function(e) {
                percentage = parseInt(e.loaded / e.total * 10000) / 100;
                update_progress_bar(i, percentage);
              }, false);
          }
          return XHR;
        },
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
      // プログレスバー削除
      delete_progress_bar(i);
    }
  }
  // 離脱防止解除
  prevent_move(false);
}

var delete_file = function(id, file_name) {
  if (window.confirm("Delete file : " + file_name)) {
    // ページ離脱防止
    prevent_move(true);
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
    prevent_move(false);
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

var prevent_move = function(flag) {
  if (flag) {
    $(window).on("beforeunload", function(e) {
      return "ファイルのアップロードが完了してません\n再読込をしてもよろしいでしょうか?";
    });
  } else {
    $(window).off("beforeunload");
  }
  
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


