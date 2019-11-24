<?php 
$file = file_get_contents("countries.json");
$country = $_GET["q"];
$result = array();
foreach (json_decode($file, true) as $key => $value) {
    if (strpos(strtolower($value["country"]), strtolower($country)) !== false)
    $result[]= $value["country"];
}
echo json_encode($result);
?>