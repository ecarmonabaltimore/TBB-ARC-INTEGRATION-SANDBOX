resource "aws_api_gateway_rest_api" "middleware_integration" {
  name        = "api-gateway-middlewares-integration-${var.environment}"
  description = "Proxy to handle requests from integrations"

  tags = merge(
    { "environment" : var.environment,
      "middlewares" : "TBB_INT",
    "integration" : "TBB_INT" }
  )
}
