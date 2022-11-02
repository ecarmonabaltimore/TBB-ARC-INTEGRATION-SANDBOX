terraform {
  backend "s3" {
    bucket = "tbb-middleware-tfstate-bucket-sandbox"
    key    = "terraform.tfstate"
    region = "us-east-1"

    dynamodb_table = "tbb-middleware-tfstate-table"
    encrypt        = true
  }
}

data "external" "bundle_name" {
  program = ["bash", "${path.root}/scripts/bundle_name.sh"]
}

module "globals" {
  source       = "./globals"
  tfstate_name = var.tfstate_name
}

module "development" {
  source               = "./development"
  aws_account_id       = local.aws_account_id
  environment          = local.environment_sandbox
  functions            = var.functions
  aws_region           = local.aws_region
  s3_deployment_bucket = module.globals.deployment_bucket_name
  s3_bundle_filename   = data.external.bundle_name.result["bundleName"]
}

module "production" {
  source               = "./production"
  aws_account_id       = local.aws_account_id
  environment          = local.environment_prod
  functions            = var.functions
  aws_region           = local.aws_region
  s3_deployment_bucket = module.globals.deployment_bucket_name
  s3_bundle_filename   = data.external.bundle_name.result["bundleName"]
}
