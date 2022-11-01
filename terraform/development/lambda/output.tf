output "wire_ledeai_invoke_arn" {
  value = {
    wire_ledeai : "${aws_lambda_function.wire_ledeai.invoke_arn}",
    wire_ledeai_rss_feed : "${aws_lambda_function.wire_ledeai_rss_feed.invoke_arn}"
  }
  description = "Object with strings representing the invoke arn"
  sensitive   = false
}

output "wire_united_robots_invoke_arn" {
  value = {
    wire_united_robots : "${aws_lambda_function.wire_united_robots.invoke_arn}",
  }
  description = "Object with strings representing the invoke arn"
  sensitive   = false
}

