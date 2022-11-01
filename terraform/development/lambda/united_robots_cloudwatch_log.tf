resource "aws_cloudwatch_log_group" "wire_united_robots_lambda" {
  name = "/aws/lambda/${var.functions.wire_united_robots.lambda_name}-${var.environment}"

  retention_in_days = 30

  tags = merge(
    var.functions.wire_united_robots.tags,
    { "environment" : var.environment }
  )
}

resource "aws_cloudwatch_log_group" "wire_united_robots_rss_feed_lambda" {
  name = "/aws/lambda/${var.functions.wire_united_robots_rss_feed.lambda_name}-${var.environment}"

  retention_in_days = 30

  tags = merge(
    var.functions.wire_united_robots_rss_feed.tags,
    { "environment" : var.environment }
  )
}

