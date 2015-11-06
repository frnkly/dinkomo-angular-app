<?php

// Helper class.
require '../lib/asset.php';

?>
<!doctype html>
<html lang="en" data-ng-app="learn">
<head>
    <meta charset="utf-8">
    <title>Di Nkomo Learning App</title>
    <link rel="stylesheet" href="<?= Asset::rev('learn.css') ?>">
</head>
<body>
    <div data-ng-controller="MainController" class="container">
        <aside data-ng-include="'/views/partials/navigation.html?' + assetVersion"></aside>
        <header data-ng-include="'/views/partials/header.html?' + assetVersion"></header>
        <section data-ng-view=""></section>
        <footer data-ng-include="'/views/partials/footer.html?' + assetVersion"></footer>
    </div>

    <script type="text/javascript" src="<?= Asset::rev('learn.js') ?>"></script>
</body>
</html>
