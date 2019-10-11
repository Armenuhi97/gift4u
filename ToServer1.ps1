# $env:Path += ";C:\Program Files\nodejs\"
# npm run build:ssr
# pause
# winscp.exe Mediq /keepuptodate "C:\Users\Annaniks LLC\Desktop\uncle-razor\dist" /var/www/uncle/dist /defaults 
# pause 
# # plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord stop"
# # plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord start"
$env:Path += ";C:\Program Files\nodejs\"
# npm run build:ssr
# pause
ng build --prod
pause
winscp.exe Annaniks /keepuptodate "C:\Users\PC\Desktop\gift4u\dist" /var/www/giftweb /defaults 
pause 
# plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord stop"
# plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord start"
