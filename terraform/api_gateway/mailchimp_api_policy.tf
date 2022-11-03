resource "aws_lambda_permission" "integration_mailchimp_api_api" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${var.functions.integration_mailchimp_api.lambda_name}-${var.environment}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.middleware_integration.execution_arn}/*/*/${aws_api_gateway_resource.integration_mailchimp_api_resource.path_part}"
}
