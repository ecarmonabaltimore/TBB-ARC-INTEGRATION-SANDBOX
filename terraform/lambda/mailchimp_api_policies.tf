resource "aws_iam_role" "integration_mailchimp_api_role" {
  name               = "${var.functions.integration_mailchimp_api.lambda_name}-role-${var.environment}"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})

  tags = merge(
    var.functions.integration_mailchimp_api.tags,
    { "environment" : var.environment }
  )
}

resource "aws_iam_policy" "integration_mailchimp_api_policy" {
  name        = "${var.functions.integration_mailchimp_api.lambda_name}-role-${var.environment}-policy"
  path        = "/"
  description = "AWS IAM Policy for managing aws Mailchimp API integration lambda role"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "logs:CreateLogGroup"
        Resource = "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.functions.integration_mailchimp_api.lambda_name}-${var.environment}:*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "integration_mailchimp_api_attachment" {
  role       = aws_iam_role.integration_mailchimp_api_role.name
  policy_arn = aws_iam_policy.integration_mailchimp_api_policy.arn
}
