variable "aws_account_id" {
  description = "AWS account ID"
  type        = string
}

variable "aws_region" {
  description = "AWS region to Deploy"
  type        = string
}

variable "environment" {
  description = "environment"
  type        = string
  default     = "sandbox"
}

variable "functions" {
  description = "Map of lambdas configurations"
  type        = map(any)
}

variable "s3_bundle_filename" {
  description = "bundle name composed of date (RFC 3339 format) and Git hash"
  type        = string
}

variable "s3_deployment_bucket" {
  description = "Name of the bucket that contents all bundles"
  type        = string
}
