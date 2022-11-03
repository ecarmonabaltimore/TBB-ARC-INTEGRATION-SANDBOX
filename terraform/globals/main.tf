module "s3" {
  source       = "./s3"
  tfstate_name = var.tfstate_name
}

#module "dynamodb" {
#  source       = "./dynamodb"
#  tfstate_name = var.tfstate_name
#}
