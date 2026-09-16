<?php
require 'conexion.php';

$error = '';
$logueado = false;
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // conecta con conectar(), busca el usuario por email con una consulta preparada
    // y comprueba la contraseña con password_verify(); pon $logueado a true si es correcto,
    // o $error con un mensaje si no lo es
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login con base de datos</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <header>
    <h1>DevMeetup 2026</h1>
    <p>Acceso administrador</p>
  </header>

  <main>

    <?php if ($logueado): ?>

      <p class="exito">Bienvenido, <?= htmlspecialchars($email) ?>. Login correcto.</p>

    <?php else: ?>

      <?php if ($error): ?>
        <p class="errores"><?= htmlspecialchars($error) ?></p>
      <?php endif; ?>

      <form method="post" action="index.php">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" value="<?= htmlspecialchars($email) ?>">

        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password">

        <button type="submit">Entrar</button>
      </form>

    <?php endif; ?>

  </main>

</body>
</html>
