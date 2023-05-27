#!/bin/bash

# update yum, install git, nginx
sudo yum update -y

sudo yum install -y git

sudo yum install -y nginx

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# make nvm available to root and ec2-user
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cat <<EOF >> /home/ec2-user/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF

# install node
nvm install v20

# install pm2 for socket.io
npm install -g @socket.io/pm2


# as ec2-user
sudo su - ec2-user << 'EOF'

# clone repo
git clone https://github.com/mikedubcurry/websockets.git /home/ec2-user/app

# move nginx config file
cd app/app
sudo mv ./testapp.conf /etc/nginx/conf.d/

# start nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# create .env file
touch .env
echo "NODE_ENV=dev" >> .env
echo "PORT=3000" >> .env

# install dependencies, build, and start app
npm install
pm2 start "npm run build && npm run start" --name app

EOF
