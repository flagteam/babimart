<?php
// we connect to example.com and port 3307
$link = mysql_connect('localhost', 'babimart_magento', 'magento@45321');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
echo 'Connected successfully';
mysql_close($link);