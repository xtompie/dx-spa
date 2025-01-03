<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<script> const App = {}; </script>
<?php array_map(fn($f) => require $f, glob(__DIR__ . '/src/*/_library.php')); ?>
<?php array_map(fn($f) => require $f, glob(__DIR__ . '/src/*/_export.php')); ?>
<script> App.Boot(); </script>
</body>
</html>
