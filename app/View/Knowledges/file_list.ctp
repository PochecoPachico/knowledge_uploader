<div class="ui list">
<?php foreach($file_list as $file) { ?>
  <div class="item">
    <i class="file icon"></i>
    <div class="content">
      <div class="header"><?php echo $file["file_name"]; ?></div>
      <div class="dexcription"><?php echo $file["created"]; ?></div>
    </div>
  </div>
<?php } ?>
</div>
