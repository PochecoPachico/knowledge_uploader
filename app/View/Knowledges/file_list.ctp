<div class="ui list">
<?php foreach($file_list as $file) { ?>
  <div class="item">
    <i class="file icon"></i>
    <div class="content">
      <div class="file_info" style="display: inline-block;">
        <div class="header"><a href="http://localhost:8888/knowledge_files/<?php echo $task_id . "/" . $file["file_name"]; ?>" download="<?php echo $file["file_name"]; ?>"><?php echo $file["file_name"]; ?></a></div>
        <div class="description"><?php echo $file["created"]; ?></div>
      </div>
      <button class="negative ui button" onclick="delete_file(<?php echo $file["id"]; ?>, '<?php echo $file["file_name"]; ?>')">delete</button>
    </div>
  </div>
<?php } ?>
</div>
