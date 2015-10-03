<?php

// Helper class.
require '../lib/asset.php';

?>
<!doctype html>
<html lang="en" ng-app="app">
<head>
    <meta charset="utf-8">
    <title>Di Nkomo Learning App</title>
    <link rel="stylesheet" href="<?= Asset::rev('learn.css') ?>">
</head>
<body ng-controller="GeneralController">

    <p>Nothing here {{'yet' + '!'}}, {{ name }}</p>

    <script type="text/javascript" src="<?= Asset::rev('learn.js') ?>"></script>
</body>
</html>
