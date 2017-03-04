<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
<?php echo $this->Html->css("semantic.min"); ?>
<?php echo $this->Html->script("semantic.min"); ?>

<?php
echo $this->Form->create("KnowledgeFile", array(
  "url" => array("controller" => "KnowledgeFiles", "action" => "register"),
  "type" => "file"));
echo $this->Form->hidden("task_id", array("value" => $data["Knowledge"]["task_id"]));
echo $this->Form->hidden("knowledge_id", array("value" => $data["Knowledge"]["id"]));
echo $this->Form->input("file", array("type" => "file"));
echo $this->Form->end("submit");
?>
<div id="fileList"></div>

<?php echo $this->html->script("knowledge"); ?>

<script>load_file_list("<?php echo $data["Knowledge"]["task_id"]; ?>")</script>
