data "aws_ssm_parameters_by_path" "ledeai_dev_ssm_parameters" {
  path            = "${var.functions.wire_ledeai.ssm_prefix}/${var.environment}"
  with_decryption = true
  recursive       = true
}

locals {
  ssm_ledeai_dev = zipmap([for key in data.aws_ssm_parameters_by_path.ledeai_dev_ssm_parameters.names : replace(key, "/${var.functions.wire_ledeai.ssm_prefix}/${var.environment}//", "")], data.aws_ssm_parameters_by_path.ledeai_dev_ssm_parameters.values)
}

data "aws_ssm_parameters_by_path" "united_robots_dev_ssm_parameters" {
  path            = "${var.functions.wire_united_robots.ssm_prefix}/${var.environment}"
  with_decryption = true
  recursive       = true
}

locals {
  ssm_united_robots_dev = zipmap([for key in data.aws_ssm_parameters_by_path.united_robots_dev_ssm_parameters.names : replace(key, "/${var.functions.wire_united_robots.ssm_prefix}/${var.environment}//", "")], data.aws_ssm_parameters_by_path.united_robots_dev_ssm_parameters.values)
}

variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
}

variable "aws_region" {
  description = "AWS region to Deploy"
  type        = string
}

variable "environment" {
  description = "Environment"
  type        = string
  default     = "dev"
}

variable "functions" {
  description = "Map of lambdas configurations"
  type        = map(any)
}

variable "s3_files" {
  description = "Map of lambdas S3 files"
  type        = map(any)
}
