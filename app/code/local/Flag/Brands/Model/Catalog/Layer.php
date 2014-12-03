<?php
/**
 * @author Flagteam Kazu
 */
class Flag_Brands_Model_Catalog_Layer extends Mage_Catalog_Model_Layer {

    public function prepareProductCollection($collection)
    {
        parent::prepareProductCollection($collection);
        if(Mage::app()->getRequest()->getModuleName()=="brands"){
            $brand_id = Mage::registry('current_brand_id');

            $collection
                ->addAttributeToFilter('manufacturer', $brand_id)
                ->addAttributeToSelect('*');
        }

        return $this;

    }

}