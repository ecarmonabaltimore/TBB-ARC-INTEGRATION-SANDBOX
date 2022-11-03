data "aws_caller_identity" "current" {}

locals {
  aws_account_id = data.aws_caller_identity.current.account_id
  aws_region     = "us-east-1"
}

locals {
  environment_dev  = "dev"
  environment_prod = "prod"
}

variable "deployment_bucket_name" {
  description = "name of the S3 bucket for upload bundles"
  type        = string
  default     = "tbb-middleware-deployment-bucket"
}

variable "functions" {
  type        = map(any)
  description = "Map of ecr names."
  default = {
    integration_mailchimp_api = {
      lambda_name  = "integration-mailchimp"
      ssm_prefix   = "/tbb/integration/mailchimp-api"
      root_path    = "./../middlewares/MailChimp_API_Integration"
      s3_prefix    = "mailchimp-api/integration"
      handler_path = "src/handlers/mailchimp-dispatcher.dispatcherHandler"
      tags = {
        "integration-mailchimp" : "TBB_INT"
      }
    },
    wire_united_robots = {
      lambda_name  = "wire-united-robots"
      ssm_prefix   = "/tbb/wire/united-robots"
      root_path    = "./../middlewares/United_Robots_Integration"
      s3_prefix    = "united-robots/wire"
      handler_path = "dist/index.getUUID"
      tags = {
        "wire-united-robots" : "TBB_INT"
      }
    },
    wire_united_robots_rss_feed = {
      lambda_name  = "wire-united-robots-rss-feed"
      ssm_prefix   = "/tbb/wire/united-robots"
      root_path    = "./../middlewares/United_Robots_Integration"
      s3_prefix    = "united-robots/wire"
      handler_path = "dist/index.handleRSSFeed"
      tags = {
        "wire-united-robots-rss-feed" : "TBB_INT"
      }
    },
  }
}
