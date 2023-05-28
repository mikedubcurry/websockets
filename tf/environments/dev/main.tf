output "instance_ip_addr" {
    value = aws_instance.webserver.public_ip
}
