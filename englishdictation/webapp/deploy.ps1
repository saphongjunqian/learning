Echo "Deploying webapp"
$api = "https://api.cf.us10-001.hana.ondemand.com"
if ($args.Length -eq 1) {
    $api = $args[0]
    if (-not [System.Uri]::IsWellFormedUriString($api, [System.UriKind]::Absolute)) {
        Write-Host "Invalid web URL. Exiting..."
        exit 1
    }
}

Echo "================================================================="
Echo "1. Building webapp"
Echo "================================================================="
Set-Location -Path "englishdictation"
npm ci
npm run build:prod
Set-Location -Path ".."

Echo "================================================================="
Echo "2. Copy resources"
Echo "================================================================="
if (Test-Path ".\router\resources") {
    Remove-Item -Path ".\router\resources" -Recurse -Force
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Empty destination folder failed. Exiting..."
        exit 1
    }
}
Copy-Item -Path ".\englishdictation\dist\" -Destination ".\router\resources\" -Recurse -Force
if ($LASTEXITCODE -ne 0) {
    Write-Host "Copy resources failed. Exiting..."
    exit 1
}

Echo "================================================================="
Echo "3. Building MTA resources"
Echo "================================================================="
mbt build --mtar archive
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Exiting..."
    exit 1
}

Echo "================================================================="
Echo "4. Cloud foundry login"
Echo "================================================================="
cf login -a $api
if ($LASTEXITCODE -ne 0) {
    Write-Host "Login failed. Exiting..."
    exit 1
}

Echo "================================================================="
Echo "5. Deploy to cloud foundry"
Echo "================================================================="
cf deploy mta_archives/archive.mtar --retries 1

Echo "================================================================="
Echo "6. Clear temprary files"
Echo "================================================================="
if (Test-Path ".\router\resources") {
    Remove-Item -Path ".\router\resources" -Recurse -Force
}

Echo "================================================================="
Echo "7. DONE"
Echo "================================================================="
