output "wire_united_robots_invoke_arn" {
  value = {
    wire_united_robots : "${aws_lambda_function.wire_united_robots.invoke_arn}",
  }
  description = "Object with strings representing the invoke arn"
  sensitive   = false
}

output "integration_mailchimp_api_invoke_arn" {
  value = {
    integration_mailchimp_api : "${aws_lambda_function.integration_mailchimp_api.invoke_arn}",
  }
  description = "Object with strings representing the invoke arn"
  sensitive   = false
}
