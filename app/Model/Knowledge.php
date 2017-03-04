<?php
class Knowledge extends AppModel {
  public $name = "Knowledge";
  public $hasMany = array(
    "KnowledgeFile"
  );
}
