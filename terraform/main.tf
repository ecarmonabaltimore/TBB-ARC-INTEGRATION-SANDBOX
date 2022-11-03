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

module "s3" {
  source               = "./s3"
  aws_account_id       = local.aws_account_id
  aws_region           = local.aws_region
  functions            = var.functions
  environment          = terraform.workspace == "prod" ? "prod" : "dev"
  s3_deployment_bucket = var.deployment_bucket_name
  s3_bundle_filename   = data.external.bundle_name.result["bundleName"]
}

module "lambda" {
  source         = "./lambda"
  aws_account_id = local.aws_account_id
  aws_region     = local.aws_region
  functions      = var.functions
  environment    = terraform.workspace == "prod" ? "prod" : "dev"

  s3_files = merge(
    module.s3.wire_united_robots_file,
    module.s3.integration_mailchimp_api_file
  )

  depends_on = [
    module.s3
  ]
}

module "api_getaway" {
  source         = "./api_gateway"
  aws_account_id = local.aws_account_id
  aws_region     = local.aws_region
  environment    = terraform.workspace == "prod" ? "prod" : "dev"
  functions      = var.functions

  invoke_arns = merge(
    module.lambda.wire_united_robots_invoke_arn,
    module.lambda.integration_mailchimp_api_invoke_arn
  )

  depends_on = [
    module.lambda
  ]
}
