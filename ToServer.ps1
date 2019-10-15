$env:Path += ";C:\Program Files\nodejs\"
# npm run build:ssr
pause
winscp.exe Uncle /keepuptodate "C:\Users\Annaniks LLC\Desktop\gift4u\dist" /var/www/unclerazor/dist /defaults 
pause 
plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord stop"
plink -ssh root@95.216.203.186 -pw qtAKreHUqe3wVmsTgxgh "sudo service supervisord start"