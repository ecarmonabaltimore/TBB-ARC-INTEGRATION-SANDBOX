resource "aws_api_gateway_resource" "wire_ledeai_resource" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  parent_id   = aws_api_gateway_rest_api.middleware_integration.root_resource_id
  path_part   = "ledeai"
}
resource "aws_api_gateway_method" "wire_ledeai_method_options" {
  rest_api_id   = aws_api_gateway_rest_api.middleware_integration.id
  resource_id   = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "wire_ledeai_method_options_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method = aws_api_gateway_method.wire_ledeai_method_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

resource "aws_api_gateway_integration" "wire_ledeai_method_options_integration" {
  rest_api_id      = aws_api_gateway_rest_api.middleware_integration.id
  resource_id      = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method      = aws_api_gateway_method.wire_ledeai_method_options.http_method
  type             = "MOCK"
  content_handling = "CONVERT_TO_TEXT"
  uri              = var.invoke_arns.wire_ledeai

  request_templates = {
    "application/json" : "{statusCode:200}"
  }
}

resource "aws_api_gateway_integration_response" "wire_ledeai_method_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method = aws_api_gateway_method.wire_ledeai_method_options.http_method
  status_code = "200"

  depends_on = [
    aws_api_gateway_integration.wire_ledeai_method_options_integration
  ]
}

resource "aws_api_gateway_method" "wire_ledeai_method_get" {
  rest_api_id   = aws_api_gateway_rest_api.middleware_integration.id
  resource_id   = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "wire_ledeai_method_get_response" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  resource_id = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method = aws_api_gateway_method.wire_ledeai_method_get.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
  }
}

resource "aws_api_gateway_integration" "wire_ledeai_method_get_integration" {
  rest_api_id             = aws_api_gateway_rest_api.middleware_integration.id
  resource_id             = aws_api_gateway_resource.wire_ledeai_resource.id
  http_method             = aws_api_gateway_method.wire_ledeai_method_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.invoke_arns.wire_ledeai

}

resource "aws_api_gateway_deployment" "wire_ledeai_deploy" {
  rest_api_id = aws_api_gateway_rest_api.middleware_integration.id
  stage_name  = var.environment

  depends_on = [
    aws_api_gateway_integration.wire_ledeai_method_get_integration,
    aws_api_gateway_integration.wire_ledeai_method_options_integration,
  ]
}
