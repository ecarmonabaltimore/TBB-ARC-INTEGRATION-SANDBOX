resource "aws_api_gateway_request_validator" "integration_mailchimp_api_validator" {
  name                        = "api-gateway-request-validator-integration-mailchimp"
  rest_api_id                 = aws_api_gateway_rest_api.middleware_integration.id
  validate_request_body       = false
  validate_request_parameters = true
}

resource "aws_api_gateway_resource" "integration_mailchimp_api_resource" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  parent_id   = aws_api_gateway_rest_api.middleware_integration.root_resource_id
  path_part   = "mailchimp-api"
}
resource "aws_api_gateway_method" "integration_mailchimp_api_method_options" {
  rest_api_id   = aws_api_gateway_rest_api.middleware_integration.id
  resource_id   = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "integration_mailchimp_api_method_options_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method = aws_api_gateway_method.integration_mailchimp_api_method_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

resource "aws_api_gateway_integration" "integration_mailchimp_api_method_options_integration" {
  rest_api_id      = aws_api_gateway_rest_api.middleware_integration.id
  resource_id      = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method      = aws_api_gateway_method.integration_mailchimp_api_method_options.http_method
  type             = "MOCK"
  content_handling = "CONVERT_TO_TEXT"
  uri              = var.invoke_arns.integration_mailchimp_api

  request_templates = {
    "application/json" : "{statusCode:200}"
  }
}

resource "aws_api_gateway_integration_response" "integration_mailchimp_api_method_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method = aws_api_gateway_method.integration_mailchimp_api_method_options.http_method
  status_code = "200"

  depends_on = [
    aws_api_gateway_integration.integration_mailchimp_api_method_options_integration
  ]
}

resource "aws_api_gateway_method" "integration_mailchimp_api_method_get" {
  rest_api_id   = aws_api_gateway_rest_api.middleware_integration.id
  resource_id   = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method   = "GET"
  authorization = "NONE"

  request_validator_id = aws_api_gateway_request_validator.integration_mailchimp_api_validator.id

  request_parameters = {
    "method.request.querystring.data" = true
  }
}

resource "aws_api_gateway_method_response" "integration_mailchimp_api_method_get_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method = aws_api_gateway_method.integration_mailchimp_api_method_get.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

resource "aws_api_gateway_integration" "integration_mailchimp_api_method_get_integration" {
  rest_api_id             = aws_api_gateway_rest_api.middleware_integration.id
  resource_id             = aws_api_gateway_resource.integration_mailchimp_api_resource.id
  http_method             = aws_api_gateway_method.integration_mailchimp_api_method_get.http_method
  integration_http_method = "GET"
  type                    = "AWS_PROXY"
  uri                     = var.invoke_arns.integration_mailchimp_api

}

resource "aws_api_gateway_deployment" "integration_mailchimp_api_deploy" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  stage_name  = var.environment

  depends_on = [
    aws_api_gateway_integration.integration_mailchimp_api_method_get_integration,
    aws_api_gateway_integration.integration_mailchimp_api_method_options_integration,
  ]
}
