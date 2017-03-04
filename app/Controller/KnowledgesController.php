<?php
class KnowledgesController extends AppController {
  public function index($id) {
    $conditions = array(
      "Knowledge.task_id" => $id
    );
    $this->set("data", $this->Knowledge->find("first", array(
          "conditions" => $conditions
        )
    ));
  }

  public function register() {
    $this->autoRender = false;
    if ($this->request->is("post")) {
      $post_param = $this->request->data;
      $upload_dir = "/Applications/MAMP/htdocs/knowledge_files/" . $post_param["Knowledge"]["task_id"] . "/"; 
      $this->_createDirectory($upload_dir);
      $this->_saveFile($upload_dir, $post_param["Knowledge"]["file"]["tmp_name"], $post_param["Knowledge"]["file"]["name"]);
    }
  }

  protected function _saveFile($upload_dir, $tmp_name, $file_name){
    if (is_uploaded_file($tmp_name)) {
      if (move_uploaded_file($tmp_name, $upload_dir . $file_name)) {
        echo "Success";
      } else {
        echo "Failed";
      }
    }
  }

  // 存在しなければディレクトリを作成
  protected function _createDirectory($dir) {
    if (!file_exists($dir))
      mkdir($dir);
  }
}
