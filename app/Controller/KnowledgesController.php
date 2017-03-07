<?php
class KnowledgesController extends AppController {
  public function index($id) {
    $this->set("data", $this->_fetchKnowledgeById($id));
  }
  
  public function fileList($id) {
    $this->autoLayout = false;
    $data = $this->_fetchKnowledgeById($id);
    $this->set("file_list", $data["KnowledgeFile"]);
    $this->set("task_id", $data["Knowledge"]["task_id"]);
  }

  protected function _fetchKnowledgeById($task_id) {
    $conditions = array(
      "Knowledge.task_id" => $task_id
    );
    return $this->Knowledge->find("first", array(
          "conditions" => $conditions
        )
    ); 
  }
}
