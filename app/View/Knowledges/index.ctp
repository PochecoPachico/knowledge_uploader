<?php
pr($data);
?>

<?php
echo $this->Form->create("Knowledge", array(
  "url" => array("controller" => "Knowledges", "action" => "register"),
  "type" => "file"));
echo $this->Form->hidden("task_id", array("value" => $data["Knowledge"]["task_id"]));
echo $this->Form->input("file", array("type" => "file"));
echo $this->Form->end("submit");
