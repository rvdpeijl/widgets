<?php

$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

switch ($method) {
  case 'PUT':
    rest_put($request);  
    break;
  case 'POST':
    rest_post($request);  
    break;
  case 'GET':
    rest_get($request);  
    break;
  case 'HEAD':
    rest_head($request);  
    break;
  case 'DELETE':
    rest_delete($request);  
    break;
  case 'OPTIONS':
    rest_options($request);    
    break;
  default:
    rest_error($request);  
    break;
}

function rest_put($request)
{
    $input = file_get_contents("php://input");
    $product = json_decode($input);
    $type = $product->type;
    $color = $product->color;

    echo $type;
}

function rest_get($request)
{
    $input = file_get_contents("php://input");
    echo $input;
}

?>