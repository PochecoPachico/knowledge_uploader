<?php
class KnowledgeFilesController extends AppController {
  public function register() {
    $this->autoRender = false;
    if ($this->request->is("post")) {
      $post_param = $this->request->data;
      $upload_dir = "/Applications/MAMP/htdocs/knowledge_files/" . $post_param["KnowledgeFile"]["task_id"] . "/"; 
      $this->_createDirectory($upload_dir);
      $this->_saveFile($upload_dir, $post_param["KnowledgeFile"]["file"]["tmp_name"], $post_param["KnowledgeFile"]["file"]["name"]);
    }
    // 整形
    $formatted_data["KnowledgeFile"] = array(
      "knowledge_id" => $post_param["KnowledgeFile"]["knowledge_id"],
      "file_name" => $post_param["KnowledgeFile"]["file"]["name"],
      "size" => $post_param["KnowledgeFile"]["file"]["size"],
    );
    debug($formatted_data);
    if ($this->KnowledgeFile->save($formatted_data)) {
        echo "Success";
    } else {
        echo "Failed";
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
