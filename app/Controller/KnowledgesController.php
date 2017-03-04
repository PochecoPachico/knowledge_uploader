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
      if (is_uploaded_file($post_param["Knowledge"]["file"]["tmp_name"])) {
        if (move_uploaded_file($post_param["Knowledge"]["file"]["tmp_name"], $upload_dir . $post_param["Knowledge"]["file"]["name"])) {
          echo "Success";
        } else {
          echo "Failed";
        }
      }
    }
  }

  // 存在しなければディレクトリを作成
  protected function _createDirectory($dir) {
    if (!file_exists($dir))
      mkdir($dir);
  }
}
