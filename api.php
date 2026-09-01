<!--
  Projeto: Sistema de Gestão e Mapeamento Visual de Ativos de TI
  Autora / Desenvolvedora: Maria Eduarda Fernandes de Sousa
  Copyright © 2026 - Todos os direitos reservados.
-->


<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$arquivo = __DIR__ . '/dados_inventario.json';

// Se receber POST (Salvar)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = file_get_contents('php://input');
    if (!empty($dados)) {
        file_put_contents($arquivo, $dados);
        echo '{"status":"sucesso"}';
    } else {
        echo '{"status":"erro","mensagem":"vazio"}';
    }
    exit;
}

// Se for GET (Carregar)
if (file_exists($arquivo) && filesize($arquivo) > 0) {
    echo file_get_contents($arquivo);
    exit;
}

// Se o arquivo ainda n�o existir, cria vazio
$padrao = '{"equipamentos":[],"manutencoes":[],"historico":[]}';
file_put_contents($arquivo, $padrao);
echo $padrao;
exit;
?>