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
}


