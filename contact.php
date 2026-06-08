<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

/* ---- Honeypot ---- */
if (!empty($_POST['website'])) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
}

/* ---- Sanitize & validate ---- */
$nom     = trim(strip_tags($_POST['nom']     ?? ''));
$prenom  = trim(strip_tags($_POST['prenom']  ?? ''));
$email   = trim($_POST['email']              ?? '');
$tel     = trim(strip_tags($_POST['telephone'] ?? ''));
$qualite = trim(strip_tags($_POST['qualite'] ?? ''));
$sujet   = trim(strip_tags($_POST['sujet']   ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));
$rgpd    = !empty($_POST['rgpd']);

$errors = [];
if (strlen($nom) < 2)        $errors[] = 'Nom invalide.';
if (strlen($prenom) < 2)     $errors[] = 'Prénom invalide.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email invalide.';
if (empty($sujet))           $errors[] = 'Veuillez choisir un objet.';
if (strlen($message) < 10)  $errors[] = 'Message trop court.';
if (!$rgpd)                  $errors[] = 'Veuillez accepter les conditions.';

if ($errors) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit;
}

/* ---- Rate limiting (simple file-based) ---- */
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lockFile = sys_get_temp_dir() . '/hadrun_rl_' . md5($ip) . '.txt';
$now      = time();
if (file_exists($lockFile) && ($now - (int)file_get_contents($lockFile)) < 60) {
    http_response_code(429);
    echo json_encode(['error' => 'Trop de tentatives. Réessayez dans 1 minute.']);
    exit;
}
file_put_contents($lockFile, (string)$now);

/* ---- Send email ---- */
$to      = 'contact@hadrun.re';
$subject = '[HADRUN] ' . mb_substr($sujet, 0, 80);

$body  = "Nouvelle demande via le formulaire hadrun.re\n";
$body .= str_repeat('-', 50) . "\n\n";
$body .= "Nom       : $prenom $nom\n";
$body .= "Email     : $email\n";
if ($tel) $body .= "Téléphone : $tel\n";
$body .= "Qualité   : $qualite\n";
$body .= "Objet     : $sujet\n\n";
$body .= "Message :\n$message\n\n";
$body .= str_repeat('-', 50) . "\n";
$body .= "Envoyé le " . date('d/m/Y à H:i') . " depuis " . $ip . "\n";

$headers  = "From: noreply@hadrun.re\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur d\'envoi.']);
}
