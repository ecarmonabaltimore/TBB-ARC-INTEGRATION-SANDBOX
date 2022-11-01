resource "aws_cloudwatch_log_group" "wire_ledeai_lambda" {
  name = "/aws/lambda/${var.functions.wire_ledeai.lambda_name}-${var.environment}"

  retention_in_days = 30

  tags = merge(
    var.functions.wire_ledeai.tags,
    { "environment" : var.environment }
  )
}

resource "aws_cloudwatch_log_group" "wire_ledeai_rss_feed_lambda" {
  name = "/aws/lambda/${var.functions.wire_ledeai_rss_feed.lambda_name}-${var.environment}"

  retention_in_days = 30

  tags = merge(
    var.functions.wire_ledeai_rss_feed.tags,
    { "environment" : var.environment }
  )
}
