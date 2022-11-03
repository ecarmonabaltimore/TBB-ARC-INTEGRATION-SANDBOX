resource "aws_iam_role" "wire_united_robots_role" {
  name               = "${var.functions.wire_united_robots.lambda_name}-role-${var.environment}"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})

  tags = merge(
    var.functions.wire_united_robots.tags,
    { "environment" : var.environment }
  )
}

resource "aws_iam_policy" "wire_united_robots_policy" {
  name        = "${var.functions.wire_united_robots.lambda_name}-role-${var.environment}-policy"
  path        = "/"
  description = "AWS IAM Policy for managing aws wire united_robots lambda role"
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
        Resource = "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.functions.wire_united_robots.lambda_name}-${var.environment}:*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "wire_united_robots_attachment" {
  role       = aws_iam_role.wire_united_robots_role.name
  policy_arn = aws_iam_policy.wire_united_robots_policy.arn
}
