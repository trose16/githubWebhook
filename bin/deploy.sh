echo "Hello from deploy.sh"
ls
pwd
git pull origin master
echo "restarting server..."
node app.js
