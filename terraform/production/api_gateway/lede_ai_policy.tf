resource "aws_lambda_permission" "wire_ledeai_api" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${var.functions.wire_ledeai.lambda_name}-${var.environment}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.middleware_integration.execution_arn}/*/*/${aws_api_gateway_resource.wire_ledeai_resource.path_part}"
}
