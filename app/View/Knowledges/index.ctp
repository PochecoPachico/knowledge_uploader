<?php
pr($data);
?>

<?php
echo $this->Form->create("KnowledgeFile", array(
  "url" => array("controller" => "KnowledgeFiles", "action" => "register"),
  "type" => "file"));
echo $this->Form->hidden("task_id", array("value" => $data["Knowledge"]["task_id"]));
echo $this->Form->hidden("knowledge_id", array("value" => $data["Knowledge"]["id"]));
echo $this->Form->input("file", array("type" => "file"));
echo $this->Form->end("submit");
