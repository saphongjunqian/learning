Echo "Un-Deploying webapp"
$api = "https://api.cf.us10-001.hana.ondemand.com"
if ($args.Length -eq 1) {
    $api = $args[0]
    if (-not [System.Uri]::IsWellFormedUriString($api, [System.UriKind]::Absolute)) {
        Write-Host "Invalid web URL. Exiting..."
        exit 1
    }
}
Echo "=========================================================="
Echo "1. Cloud foundry login"
Echo "=========================================================="
Set-Location -Path "router"
cf login -a $api
Echo "=========================================================="
Echo "2. Delete app & services"
Echo "=========================================================="
cf delete -r webapp_englishdict-approuter 
cf delete-service webapp_englishdict-xsuaa
cf delete-service webapp_englishdict-dest
Echo "=========================================================="
Echo "3. DONE"
Echo "=========================================================="
Set-Location -Path ".."
