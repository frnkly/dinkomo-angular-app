<?php

// Helper class.
require '../lib/asset.php';

?>
<!doctype html>
<html lang="en" ng-app="learn">
<head>
    <meta charset="utf-8">
    <title>Di Nkomo Learning App</title>
    <link rel="stylesheet" href="<?= Asset::rev('learn.css') ?>">
</head>
<body ng-controller="GeneralController">

    <p>Nothing here {{'yet' + '!'}}, {{ name }}</p>

    <div class="" ng-controller="TestController">

    </div>

    <script type="text/javascript" src="<?= Asset::rev('learn.js') ?>"></script>
    <!-- <script type="text/javascript" src="temp/angular.min.js"></script>
    <script type="text/javascript" src="temp/app.js?<?= time() ?>"></script>
    <script type="text/javascript" src="temp/GeneralController.js?<?= time() ?>"></script>
    <script type="text/javascript" src="temp/TestController.js?<?= time() ?>"></script> -->
</body>
</html>
