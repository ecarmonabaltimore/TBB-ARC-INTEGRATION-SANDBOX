resource "aws_lambda_function" "wire_ledeai" {
  function_name    = "${var.functions.wire_ledeai.lambda_name}-${var.environment}"
  description      = "Middleware for LedeAI integration with ARCxp"
  role             = aws_iam_role.wire_ledeai_role.arn
  depends_on       = [aws_iam_role_policy_attachment.wire_ledeai_attachment]
  timeout          = 60
  runtime          = "nodejs16.x"
  s3_bucket        = var.s3_files.wire_ledeai.bucket_name
  s3_key           = var.s3_files.wire_ledeai.key
  source_code_hash = var.s3_files.wire_ledeai.output_base64sha256
  handler          = var.functions.wire_ledeai.handler_path

  tags = merge(
    var.functions.wire_ledeai.tags,
    { "environment" : var.environment }
  )

  environment {
    variables = {
      ARC_API_URL       = local.ssm_ledeai_prod.ARC_API_URL
      ARC_API_KEY       = local.ssm_ledeai_prod.ARC_API_KEY
      CLIENT_SECRET_KEY = local.ssm_ledeai_prod.CLIENT_SECRET_KEY
      SECRET_KEY        = local.ssm_ledeai_prod.SECRET_KEY
    }
  }
}

resource "aws_lambda_function" "wire_ledeai_rss_feed" {
  function_name    = "${var.functions.wire_ledeai_rss_feed.lambda_name}-${var.environment}"
  description      = "Middleware for LedeAI RSS Feed integration with ARCxp"
  role             = aws_iam_role.wire_ledeai_rss_feed_role.arn
  depends_on       = [aws_iam_role_policy_attachment.wire_ledeai_rss_feed_attachment]
  timeout          = 60
  runtime          = "nodejs16.x"
  s3_bucket        = var.s3_files.wire_ledeai_rss_feed.bucket_name
  s3_key           = var.s3_files.wire_ledeai_rss_feed.key
  source_code_hash = var.s3_files.wire_ledeai_rss_feed.output_base64sha256
  handler          = var.functions.wire_ledeai_rss_feed.handler_path

  tags = merge(
    var.functions.wire_ledeai_rss_feed.tags,
    { "environment" : var.environment }
  )

  environment {
    variables = {
      ARC_API_URL       = local.ssm_ledeai_prod.ARC_API_URL
      ARC_API_KEY       = local.ssm_ledeai_prod.ARC_API_KEY
      RSS_API_URL       = local.ssm_ledeai_prod.RSS_API_URL
      CLIENT_SECRET_KEY = local.ssm_ledeai_prod.CLIENT_SECRET_KEY
      SECRET_KEY        = local.ssm_ledeai_prod.SECRET_KEY
    }
  }
}
