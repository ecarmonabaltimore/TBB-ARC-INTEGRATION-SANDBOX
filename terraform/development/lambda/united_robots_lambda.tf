resource "aws_lambda_function" "wire_united_robots" {
  function_name    = "${var.functions.wire_united_robots.lambda_name}-${var.environment}"
  description      = "Middleware for united_robots integration with ARCxp"
  role             = aws_iam_role.wire_united_robots_role.arn
  depends_on       = [aws_iam_role_policy_attachment.wire_united_robots_attachment]
  timeout          = 60
  runtime          = "nodejs16.x"
  s3_bucket        = var.s3_files.wire_united_robots.bucket_name
  s3_key           = var.s3_files.wire_united_robots.key
  source_code_hash = var.s3_files.wire_united_robots.output_base64sha256
  handler          = var.functions.wire_united_robots.handler_path

  tags = merge(
    var.functions.wire_united_robots.tags,
    { "environment" : var.environment }
  )

  environment {
    variables = {
      ARC_API_URL       = local.ssm_united_robots_dev.ARC_API_URL
      ARC_API_KEY       = local.ssm_united_robots_dev.ARC_API_KEY
      CLIENT_SECRET_KEY = local.ssm_united_robots_dev.CLIENT_SECRET_KEY
      SECRET_KEY        = local.ssm_united_robots_dev.SECRET_KEY
    }
  }
}

resource "aws_lambda_function" "wire_united_robots_rss_feed" {
  function_name    = "${var.functions.wire_united_robots_rss_feed.lambda_name}-${var.environment}"
  description      = "Middleware for united_robots RSS Feed integration with ARCxp"
  role             = aws_iam_role.wire_united_robots_rss_feed_role.arn
  depends_on       = [aws_iam_role_policy_attachment.wire_united_robots_rss_feed_attachment]
  timeout          = 60
  runtime          = "nodejs16.x"
  s3_bucket        = var.s3_files.wire_united_robots_rss_feed.bucket_name
  s3_key           = var.s3_files.wire_united_robots_rss_feed.key
  source_code_hash = var.s3_files.wire_united_robots_rss_feed.output_base64sha256
  handler          = var.functions.wire_united_robots_rss_feed.handler_path

  tags = merge(
    var.functions.wire_united_robots_rss_feed.tags,
    { "environment" : var.environment }
  )

  environment {
    variables = {
      ARC_API_URL          = local.ssm_united_robots_dev.ARC_API_URL
      ARC_API_KEY          = local.ssm_united_robots_dev.ARC_API_KEY
      RSS_SINGLE_SALES_URL = local.ssm_united_robots_dev.RSS_SINGLE_SALES_URL
      RSS_SUMMARIES_URL    = local.ssm_united_robots_dev.RSS_SUMMARIES_URL
      CLIENT_SECRET_KEY    = local.ssm_united_robots_dev.CLIENT_SECRET_KEY
      SECRET_KEY           = local.ssm_united_robots_dev.SECRET_KEY
    }
  }
}
