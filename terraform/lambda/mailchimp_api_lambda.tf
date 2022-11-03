resource "aws_lambda_function" "integration_mailchimp_api" {
  function_name    = "${var.functions.integration_mailchimp_api.lambda_name}-${var.environment}"
  description      = "Middleware for Mailchimp API integration with ARCxp"
  role             = aws_iam_role.integration_mailchimp_api_role.arn
  depends_on       = [aws_iam_role_policy_attachment.integration_mailchimp_api_attachment]
  timeout          = 60
  runtime          = "nodejs16.x"
  s3_bucket        = var.s3_files.integration_mailchimp_api.bucket_name
  s3_key           = var.s3_files.integration_mailchimp_api.key
  source_code_hash = var.s3_files.integration_mailchimp_api.output_base64sha256
  handler          = terraform.workspace == "prod" ? "${var.functions.integration_mailchimp_api.handler_path}" : "${var.functions.integration_mailchimp_api.handler_path}${var.environment}"

  tags = merge(
    var.functions.integration_mailchimp_api.tags,
    { "environment" : var.environment }
  )

  environment {
    variables = {
      API_MAILCHIMP      = local.ssm_mailchimp_api.API_MAILCHIMP
      SERVER_PREFIX      = local.ssm_mailchimp_api.SERVER_PREFIX
      LIST_ID            = local.ssm_mailchimp_api.LIST_ID
      PIANO_CONSENT      = local.ssm_mailchimp_api.PIANO_CONSENT
      PIANO_KEY          = local.ssm_mailchimp_api.PIANO_KEY
      PIANO_PAYMENT      = local.ssm_mailchimp_api.PIANO_PAYMENT
      PIANO_PRIVATE      = local.ssm_mailchimp_api.PIANO_PRIVATE
      PIANO_SUBSCRIPTION = local.ssm_mailchimp_api.PIANO_SUBSCRIPTION
      PIANO_USER         = local.ssm_mailchimp_api.PIANO_USER
      REGION             = local.ssm_mailchimp_api.REGION
    }
  }
}
