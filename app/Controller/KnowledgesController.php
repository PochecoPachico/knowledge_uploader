<?php
class KnowledgesController extends AppController {
  public function index() {
    $this->set("data", $this->Knowledge->find("all"));
  }
}
