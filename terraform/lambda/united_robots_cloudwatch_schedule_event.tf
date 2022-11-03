resource "aws_cloudwatch_event_rule" "wire_united_robots_rss_feed_event_rule" {
  name                = "wire-united_robots-rss-feed-${var.environment}-trigger"
  description         = "trigger lambda ${var.functions.wire_united_robots_rss_feed.lambda_name}-${var.environment} at 10:03am and 07:03pm (EST time) every day"
  schedule_expression = "cron(3 14,23 ? * * *)"
  is_enabled          = true

  tags = merge(
    var.functions.wire_united_robots_rss_feed.tags,
    { "environment" : var.environment }
  )
}

resource "aws_cloudwatch_event_target" "wire_united_robots_rss_feed_event_target" {
  rule      = aws_cloudwatch_event_rule.wire_united_robots_rss_feed_event_rule.name
  target_id = "target_wire_united_robots_rss_feed_${var.environment}_trigger"
  arn       = aws_lambda_function.wire_united_robots_rss_feed.arn
}

resource "aws_lambda_permission" "wire_united_robots_rss_feed_lambda_permission" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = "${var.functions.wire_united_robots_rss_feed.lambda_name}-${var.environment}"
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.wire_united_robots_rss_feed_event_rule.arn
}
