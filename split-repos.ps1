# split-repos.ps1
# Crea los repositorios individuales en GitHub y hace push de cada subdirectorio
# Uso: .\split-repos.ps1 -GithubToken "ghp_xxxxxxxxxxxx"

param(
    [Parameter(Mandatory=$true)]
    [string]$GithubToken
)

$Owner = "vrayiRAX"
$Headers = @{
    Authorization  = "Bearer $GithubToken"
    Accept         = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

# Mapeo: <nombre-repo> → <prefijo-directorio-en-monorepo>
$Repos = [ordered]@{
    "vrakben-frontend"          = "Frontend"
    "vrakben-bff"               = "bff"
    "vrakben-ms-auth"           = "ms-auth-server"
    "vrakben-ms-catalog"        = "ms-catalog"
    "vrakben-ms-orders"         = "ms-order-management"
    "vrakben-ms-stock"          = "ms-stock"
    "vrakben-ms-eureka"         = "ms-eureka-server"
    "vrakben-ms-shopping-cart"  = "ms-shopping-cart"
    "vrakben-ms-appointments"   = "ms-appointment-scheduler"
    "vrakben-ms-job-orders"     = "ms-job-orders"
    "vrakben-ms-procurement"    = "ms-supplier-procurement"
    "vrakben-ms-vehicle"        = "ms-vehicle-history"
}

foreach ($repoName in $Repos.Keys) {
    $prefix = $Repos[$repoName]
    Write-Host "`n━━━ Procesando: $repoName (/$prefix) ━━━" -ForegroundColor Cyan

    # 1. Crear repo en GitHub (ignorar error si ya existe)
    $body = @{
        name        = $repoName
        description = "VraKBen-CORP microservice: $prefix"
        private     = $false
        auto_init   = $false
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" `
            -Method Post -Headers $Headers -Body $body -ContentType "application/json"
        Write-Host "  ✅ Repo creado: https://github.com/$Owner/$repoName" -ForegroundColor Green
    } catch {
        if ($_.Exception.Response.StatusCode -eq 422) {
            Write-Host "  ⏭️  Repo ya existe, continuando..." -ForegroundColor Yellow
        } else {
            Write-Host "  ❌ Error creando repo: $_" -ForegroundColor Red
            continue
        }
    }

    # 2. Push del subdirectorio como rama main del repo individual
    $remoteUrl = "https://$GithubToken@github.com/$Owner/$repoName.git"
    Write-Host "  📤 Haciendo git subtree push --prefix=$prefix ..." -ForegroundColor Blue

    $result = git subtree push --prefix="$prefix" $remoteUrl main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Push exitoso a $repoName" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Push con advertencias (puede ser que ya esté actualizado):" -ForegroundColor Yellow
        Write-Host "  $result"
    }
}

Write-Host "`n🎉 Separación de monorepo completada." -ForegroundColor Magenta
Write-Host "Los repositorios individuales están en: https://github.com/$Owner" -ForegroundColor Magenta
