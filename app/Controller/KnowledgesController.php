<?php
class KnowledgesController extends AppController {
  public function index($id) {
    $this->set("data", $this->_fetchKnowledgeById($id));
  }
  
  public function fileList($id) {
    $this->autoLayout = false;
    $file_list = $this->_fetchKnowledgeById($id)["KnowledgeFile"];
    $this->set("file_list", $file_list);
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
