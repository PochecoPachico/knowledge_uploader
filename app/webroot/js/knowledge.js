var load_file_list = function(task_id) {
  $.ajax({
    type: "GET",
    url: "/groupware/knowledges/fileList/" + task_id,
    success: function(msg){
      $("#fileList").html(msg);
    }
  });
}
