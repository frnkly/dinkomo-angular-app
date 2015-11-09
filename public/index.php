<?php

// Helper class.
require '../lib/asset.php';

?>
<!doctype html>
<html lang="en" data-ng-app="learn">
<head>
    <meta charset="utf-8">
    <title>A Collection of Cultures - Di Nkɔmɔ</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="author" content="Francis Amankrah">
	<meta name="description" content="Di Nkɔmɔ: A Collection of Cultures">
	<meta name="keywords" content="Di Nkɔmɔ, Twi, Akan, Ghana">
	<meta name="robots" content="index, follow">

    <meta property="og:title" content="Di Nkɔmɔ: A Collection of Cultures">
	<meta property="og:desc" content="Di Nkɔmɔ: A Collection of Cultures">
	<meta property="og:type" content="website">
    
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
