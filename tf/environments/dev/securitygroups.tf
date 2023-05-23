resource "aws_security_group" "webservers-security_group" {
  vpc_id = aws_vpc.vpc.id
  name   = "webservers-security_group_${var.application_name}-${var.environment}"

  ingress {
    description = "http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "https"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    name = "webservers-security_group_${var.application_name}-${var.environment}"
  }
}
resource "aws_security_group" "resources-security_group" {
  vpc_id = aws_vpc.vpc.id
  name   = "resources-security_group_${var.application_name}-${var.environment}"

  ingress {
    description     = "mysql"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.webservers-security_group.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    name = "resources-security_group_${var.application_name}-${var.environment}"
  }
}

resource "aws_security_group" "ssh-security_group" {
  vpc_id = aws_vpc.vpc.id
  name   = "ssh-security_group_${var.application_name}-${var.environment}"

  ingress {
    description = "ssh"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    name = "ssh-security_group_${var.application_name}-${var.environment}"
  }
}
