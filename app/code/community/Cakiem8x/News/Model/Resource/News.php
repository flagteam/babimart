<?php

class Cakiem8x_News_Model_Resource_News extends Mage_Core_Model_Resource_Db_Abstract {

    /**
     * Initialize connection and define main table and primary key
     */
    
    protected function _construct() {
        $this->_init('cakiem8x_news/news', 'news_id');
    }

}
