<?php
class KnowledgeFilesController extends AppController {

  // TODO: 重複ファイルの処理
  public function register() {
    $this->autoRender = false;
    if ($this->request->is("post")) {
      $post_param = $this->request->data;
      // FormDataで送信された値は$_FILEで扱う
      $file = $_FILES["file"];
      $upload_dir = "/Applications/MAMP/htdocs/knowledge_files/" . $post_param["task_id"] . "/"; 
      $this->_createDirectory($upload_dir);
      $this->_saveFile($upload_dir, $file["tmp_name"], $file["name"]);
    }
    // 整形
    $formatted_data["KnowledgeFile"] = array(
      "knowledge_id" => $post_param["knowledge_id"],
      "file_name" => $file["name"],
      "size" => $file["size"],
    );
    if ($this->KnowledgeFile->save($formatted_data)) {
        echo "Success";
    } else {
        echo "Failed";
    }
  }

  public function delete() {
    $this->autoRender = false;
    if ($this->request->is("post")) {
      $post_param = $this->request->data;
      $upload_dir = "/Applications/MAMP/htdocs/knowledge_files/" . $post_param["task_id"] . "/"; 
      $this->_deleteFile($upload_dir, $post_param["file_name"]);
      if ($this->KnowledgeFile->delete($post_param["id"])) {
        echo "Success";
      } else {
        echo "Failed";
      }
    }
  }

  protected function _saveFile($upload_dir, $tmp_name, $file_name){
    if (is_uploaded_file($tmp_name)) {
      if (move_uploaded_file($tmp_name, $upload_dir . $file_name)) {
        chmod($upload_dir . $file_name, 0644);
        echo "Success";
      } else {
        echo "Failed";
      }
    }
  }

  protected function _deleteFile($upload_dir, $file_name) {
    if (unlink($upload_dir . $file_name)) {
      echo "Success";
    } else {
      echo "Failed";
    }
  }

  // 存在しなければディレクトリを作成
  protected function _createDirectory($dir) {
    if (!file_exists($dir))
      mkdir($dir);
  }
}
