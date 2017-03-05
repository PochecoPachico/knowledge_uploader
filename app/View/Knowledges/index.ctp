<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
<?php echo $this->Html->css("semantic.min"); ?>
<?php echo $this->Html->css("knowledge"); ?>
<?php echo $this->Html->script("semantic.min"); ?>

<div id="drop_area"><strong>Drag & Drop</strong></div>
<div id="fileList"></div>

<?php echo $this->html->script("knowledge"); ?>

<script>knowledge_init("<?php echo $data["Knowledge"]["task_id"]; ?>", <?php echo $data["Knowledge"]["id"]; ?>)</script>
