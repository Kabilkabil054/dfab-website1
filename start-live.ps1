$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontend = Join-Path $root "frontend"
$backend = Join-Path $root "backend"

Write-Host "Starting DFAB backend on http://127.0.0.1:8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root'; python -m uvicorn --app-dir backend server:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "Starting DFAB frontend on http://localhost:3000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$frontend'; npm start"

Write-Host "Both services were launched in new PowerShell windows."
