<?php
class KnowledgeFile extends AppModel {
  public $name = "KnowledgeFile";
  public $useTable = "knowledge_files";
  public $validate = array(
    "file_name" => array(
      "rule" => "isUnique"
    )
  );
}
