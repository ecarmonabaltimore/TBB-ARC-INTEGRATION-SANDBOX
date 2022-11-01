module "s3" {
  source               = "./s3"
  aws_account_id       = var.aws_account_id
  aws_region           = var.aws_region
  functions            = var.functions
  environment          = var.environment
  s3_deployment_bucket = var.s3_deployment_bucket
  s3_bundle_filename   = var.s3_bundle_filename
}

module "lambda" {
  source         = "./lambda"
  aws_account_id = var.aws_account_id
  aws_region     = var.aws_region
  functions      = var.functions
  environment    = var.environment

  s3_files = merge(
    module.s3.wire_ledeai_file,
    module.s3.wire_united_robots_file
  )

  depends_on = [
    module.s3
  ]
}

module "api_getaway" {
  source         = "./api_gateway"
  aws_account_id = var.aws_account_id
  aws_region     = var.aws_region
  environment    = var.environment
  functions      = var.functions

  invoke_arns = merge(
    module.lambda.wire_ledeai_invoke_arn,
    module.lambda.wire_united_robots_invoke_arn
  )

  depends_on = [
    module.lambda
  ]
}
