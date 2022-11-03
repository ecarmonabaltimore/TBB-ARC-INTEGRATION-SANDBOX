output "wire_united_robots_file" {
  description = "wire United Robots deployment information"
  sensitive   = false
  value = {
    wire_united_robots : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_united_robots.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_united_robots.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${data.archive_file.bundle_wire_united_robots.output_base64sha256}"
    },
    wire_united_robots_rss_feed : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_united_robots.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_united_robots.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${data.archive_file.bundle_wire_united_robots.output_base64sha256}"
    }
  }

  depends_on = [
    data.external.bundle_data_wire_united_robots,
    null_resource.build_bundle_wire_united_robots,
    data.archive_file.bundle_wire_united_robots,
    null_resource.push_image_to_s3_wire_united_robots
  ]
}

output "integration_mailchimp_api_file" {
  description = "integration Mailchimp API deployment information"
  sensitive   = false
  value = {
    integration_mailchimp_api : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.integration_mailchimp_api.s3_prefix}/${var.environment}/${data.external.bundle_data_integration_mailchimp_api.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${data.archive_file.bundle_integration_mailchimp_api.output_base64sha256}"
    }
  }

  depends_on = [
    data.external.bundle_data_integration_mailchimp_api,
    null_resource.build_bundle_integration_mailchimp_api,
    data.archive_file.bundle_integration_mailchimp_api,
    null_resource.push_image_to_s3_integration_mailchimp_api
  ]
}
