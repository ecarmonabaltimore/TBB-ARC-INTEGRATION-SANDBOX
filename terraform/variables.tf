data "aws_caller_identity" "current" {}

locals {
  aws_account_id = data.aws_caller_identity.current.account_id
  aws_region     = "us-east-1"
}

locals {
  environment_dev  = "dev"
  environment_prod = "prod"
}

variable "tfstate_name" {
  description = "name of the DynamoDB table for Terraform AWS Backend."
  type        = string
  default     = "tbb-middleware-tfstate"
}

variable "functions" {
  type        = map(any)
  description = "Map of ecr names."
  default = {
    wire_ledeai = {
      lambda_name  = "wire-ledeai"
      ssm_prefix   = "/tbb/wire/ledeai"
      root_path    = "./../middlewares/Lede_AI_Integration"
      s3_prefix    = "ledeai/wire"
      handler_path = "dist/index.getUUID"
      tags = {
        "wire-ledeai" : "TBB_INT"
      }
    },
    wire_ledeai_rss_feed = {
      lambda_name  = "wire-ledeai-rss-feed"
      ssm_prefix   = "/tbb/wire/ledeai"
      root_path    = "./../middlewares/Lede_AI_Integration"
      s3_prefix    = "ledeai/wire"
      handler_path = "dist/index.handleRSSFeed"
      tags = {
        "wire-ledeai-rss-feed" : "TBB_INT"
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
