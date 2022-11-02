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
  default     = "sandbox"
}

variable "functions" {
  description = "Map of lambdas configurations"
  type        = map(any)
}

variable "invoke_arns" {
  description = "Map of lambdas invoke arns"
  type        = map(any)
}
