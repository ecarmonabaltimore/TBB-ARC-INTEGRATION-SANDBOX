variable "tfstate_name" {
  description = "name of the DynamoDB table for Terraform AWS Backend."
  type        = string
  default     = "TBB-middleware-tfstate"
}
