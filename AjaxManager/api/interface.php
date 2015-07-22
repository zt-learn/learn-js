<?php
require_once "../../api/config/load.php";

$cmd = $_GET['cmd'];

$shop = new \model\Shop();
switch ($cmd) {
    /*获取所有商品信息*/
    case 'shopInfo':
        $data = $shop->getShopInfo();
        echo json_encode($data);
        break;

    /*获取此商品的信息*/
    case 'getProductInfo':
        $productCode = $_GET['productCode'];
        $data['price'] = $shop->getProductPrice($productCode);
        $data['qty'] = $shop->getProductQty($productCode);
        echo json_encode($data);
        break;

    /*修改此商品的信息*/
    case 'updateProduct':
        $productCode = $_GET['productCode'];
        $price = $_GET['price'];
        $qty = $_GET['qty'];
        $shop->setProductQty($productCode, $qty);
        $shop->setProductPrice($productCode, $price);
        header("Location: http://127.0.0.1/mkhexa/manager");
        exit;
        break;

    /*获取此商品的计划*/
    case 'getPlan':
        $productCode = $_GET['productCode'];
        $data = $shop->getProductAllPlan($productCode);
        echo json_encode($data);
        break;

    /*删除此商品的计划*/
    case 'delPlan':
        $productCode = $_GET['productCode'];
        $planId = $_GET['planId'];
        $shop->delProductOnePlan($productCode, $planId);
        header("Location: http://127.0.0.1/mkhexa/manager");
        exit;
        break;

    /*增加此商品的计划*/
    case 'addPlan':
        $productCode = $_GET['productCode'];

        $dateTag = $_GET['dateTag'];
        $weekTag = $_GET['weekTag'];
        $timeTag = $_GET['timeTag'];
        $date = [];
        $week = [];
        $time = [];

        $price = $_GET['price'];
        $percent = $_GET['percent'];
        $startTime = $_GET['startTime'];
        if (isset($_GET['endTime'])) {
            $endTime = $_GET['endTime'];
        }

        if ($dateTag) {
            $date = [
                'startTime' => $startTime,
                'discount' => $price,
                'percent' => $percent
            ];
        }
        if ($weekTag) {
            $week = [
                'startTime' => $startTime,
                'discount' => $price,
                'percent' => $percent
            ];
        }
        if ($timeTag) {
            $time = [
                'startTime' => $startTime,
                'endTime' => $endTime,
                'discount' => $price,
                'percent' => $percent
            ];
        }

        $planInfo = [
            'on' => 1,
            'dateTag' => $dateTag,
            'date' => $date,
            'weekTag' => $weekTag,
            'week' => $week,
            'timeTag' => $timeTag,
            'time' => $time
        ];

        $shop->addProductOnePlan($productCode, $planInfo);
        break;
}

