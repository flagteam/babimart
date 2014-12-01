<?php
/**
 * @author Flagteam Kazu
 */
class Flag_Brands_Model_Catalog_Category extends Mage_Catalog_Model_Category {

    public function getProductCollection()
    {
        $collection = Mage::getResourceModel('catalog/product_collection')
            ->setStoreId($this->getStoreId());
        return $collection;
    }

}