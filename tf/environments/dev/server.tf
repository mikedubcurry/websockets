resource "aws_instance" "webserver" {
  ami                    = "ami-0889a44b331db0194"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.webservers-security_group.id, aws_security_group.ssh-security_group.id]
  subnet_id              = aws_subnet.public_subnet_1.id
  key_name               = "ec2-dev-key"

  tags = {
    Name = "webserver"
  }

  user_data = file("userdata.sh")
  #  user_data = <<-EOF
  #              #!/bin/bash
  #              sudo yum update -y
  #              sudo yum install -y git
  #              sudo yum install -y nginx
  #              wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  #              export NVM_DIR="$HOME/.nvm"
  #              [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  #              echo "
  #                  export NVM_DIR="/.nvm"
  #                  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  #                  " >> /home/ec2-user/.bashrc
  #              nvm install v20
  #              sudo systemctl enable nginx
  #              sudo systemctl start nginx
  #              sudo su - ec2-user << 'EOF'
  #              git clone https://github.com/mikedubcurry/testapp.git /home/ec2-user/testapp
  #              cd testapp
  #              
  #              sudo mv ./testapp.conf /etc/nginx/conf.d/
  #              sudo systemctl restart nginx
  #              touch .env
  #              echo "PORT=3000" >> .env
  #              npm install
  #              npm run build
  #              npm run start
  #              EOF
}


