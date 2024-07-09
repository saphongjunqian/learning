Echo "Deploying webapp"
$api = "https://api.cf.us10-001.hana.ondemand.com"
if ($args.Length -eq 1) {
    $api = $args[0]
    if (-not [System.Uri]::IsWellFormedUriString($api, [System.UriKind]::Absolute)) {
        Write-Host "Invalid web URL. Exiting..."
        exit 1
    }
}
Echo "=========================================================="
Echo "1. Building webapp"
Echo "=========================================================="
Set-Location -Path "englishdictation"
npm ci
npm run build:prod
Set-Location -Path ".."
Echo "=========================================================="
Echo "2. Copy resources"
Echo "=========================================================="
if (Test-Path ".\router\dist") {
    Remove-Item -Path ".\router\dist" -Recurse -Force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Empty destination folder failed. Exiting..."
        exit 1
    }
}
Copy-Item -Path ".\englishdictation\dist\browser\" -Destination ".\router\dist\" -Recurse -Force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Copy resources failed. Exiting..."
    exit 1
}
Echo "=========================================================="
Echo "3. Cloud foundry login"
Echo "=========================================================="
Set-Location -Path "router"
Copy-Item -Path ".\xs-app.json" -Destination ".\dist\" -Force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Copy resources failed. Exiting..."
    exit 1
}
cf login -a $api
Echo "=========================================================="
Echo "4. Create instances of service"
Echo "=========================================================="
cf create-service xsuaa application webapp_englishdict-xsuaa -c xs-security.json
cf create-service destination lite webapp_englishdict-dest -c destination.json
Echo "=========================================================="
Echo "5. Deploy to cloud foundry"
Echo "=========================================================="
npm ci
npm run deploy
Echo "=========================================================="
Echo "6. Clear temprary files"
Echo "=========================================================="
if (Test-Path ".\dist") {
    Remove-Item -Path ".\dist" -Recurse -Force
}
Echo "=========================================================="
Echo "7. DONE"
Echo "=========================================================="
Set-Location -Path ".."
