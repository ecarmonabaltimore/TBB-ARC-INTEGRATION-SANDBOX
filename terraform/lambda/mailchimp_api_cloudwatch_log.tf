resource "aws_cloudwatch_log_group" "integration_mailchimp_api_lambda" {
  name = "/aws/lambda/${var.functions.integration_mailchimp_api.lambda_name}-${var.environment}"

  retention_in_days = 30

  tags = merge(
    var.functions.integration_mailchimp_api.tags,
    { "environment" : var.environment }
  )
}
