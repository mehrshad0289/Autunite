
$Dir="./ali"
#FTP site and credentials
$ftp = "ftp://autunite.ai/"
$user = "frontend@autunite.ai"
$pass = "Ali.34425255"  

$webclient = New-Object System.Net.WebClient 
$webclient.Credentials = New-Object System.Net.NetworkCredential($user,$pass)  

#list every sql server trace file 
foreach($item in (dir $Dir "*.*")){ 
    
    $uri = New-Object System.Uri($ftp+$item.Name) 
    Write-Host $uri  $item.FullName
    $webclient.UploadFile($uri, $item.FullName)
} 






## Pause it ##
Write-Host -NoNewLine 'Press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
