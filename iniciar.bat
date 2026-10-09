@echo off
title Ronaldo Mecanico — Servidor Local de Desenvolvimento
chcp 65001 > nul
cls

echo ========================================================
echo   RONALDO MECÂNICO - SERVIDOR LOCAL E TESTE DE PWA
echo ========================================================
echo.
echo  [1] Iniciando servidor local na porta 8080...
echo  [2] Pressione Ctrl+C para encerrar o servidor.
echo.

where npx >nul 2>&1
if %errorlevel% equ 0 (
    echo  Executando via npx http-server...
    npx -y http-server . -p 8080 -c-1 -o
) else (
    where python >nul 2>&1
    if %errorlevel% equ 0 (
        echo  Executando via Python...
        start http://localhost:8080
        python -m http.server 8080
    ) else (
        echo  [ERRO] Nem Node.js/npx nem Python foram encontrados no sistema.
        echo  Por favor, abra o arquivo index.html no seu navegador ou instale o Node.js.
        pause
    )
)
