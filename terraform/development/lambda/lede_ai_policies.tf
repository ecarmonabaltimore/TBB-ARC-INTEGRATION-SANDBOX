resource "aws_iam_role" "wire_ledeai_role" {
  name               = "${var.functions.wire_ledeai.lambda_name}-role-${var.environment}"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})

  tags = merge(
    var.functions.wire_ledeai.tags,
    { "environment" : var.environment }
  )
}

resource "aws_iam_policy" "wire_ledeai_policy" {
  name        = "${var.functions.wire_ledeai.lambda_name}-role-${var.environment}-policy"
  path        = "/"
  description = "AWS IAM Policy for managing aws wire LedeAI lambda role"
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
        Resource = "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.functions.wire_ledeai.lambda_name}-${var.environment}:*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "wire_ledeai_attachment" {
  role       = aws_iam_role.wire_ledeai_role.name
  policy_arn = aws_iam_policy.wire_ledeai_policy.arn
}

resource "aws_iam_role" "wire_ledeai_rss_feed_role" {
  name               = "${var.functions.wire_ledeai_rss_feed.lambda_name}-role-${var.environment}"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})

  tags = merge(
    var.functions.wire_ledeai_rss_feed.tags,
    { "environment" : var.environment }
  )
}

resource "aws_iam_policy" "wire_ledeai_rss_feed_policy" {
  name        = "${var.functions.wire_ledeai_rss_feed.lambda_name}-role-${var.environment}-policy"
  path        = "/"
  description = "AWS IAM Policy for managing aws wire LedeAI RSS Feed lambda role"
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
        Resource = "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:log-group:/aws/lambda/${var.functions.wire_ledeai_rss_feed.lambda_name}-${var.environment}:*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "wire_ledeai_rss_feed_attachment" {
  role       = aws_iam_role.wire_ledeai_rss_feed_role.name
  policy_arn = aws_iam_policy.wire_ledeai_rss_feed_policy.arn
}

