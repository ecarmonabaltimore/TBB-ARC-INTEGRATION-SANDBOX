output "wire_ledeai_file" {
  description = "wire LedeAI deployment information"
  sensitive   = false
  value = {
    wire_ledeai : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_ledeai.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_ledeai.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${base64sha256(data.local_file.bundle_wire_ledeai.content)}"
    },
    wire_ledeai_rss_feed : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_ledeai_rss_feed.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_ledeai.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${base64sha256(data.local_file.bundle_wire_ledeai.content)}"
    }
  }

  depends_on = [
    data.external.bundle_data_wire_ledeai,
    null_resource.push_image_to_s3_wire_ledeai,
    data.local_file.bundle_wire_ledeai
  ]
}

output "wire_united_robots_file" {
  description = "wire United Robots deployment information"
  sensitive   = false
  value = {
    wire_united_robots : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_united_robots.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_united_robots.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${base64sha256(data.local_file.bundle_wire_united_robots.content)}"
    },
    wire_united_robots_rss_feed : {
      bucket_name : "${var.s3_deployment_bucket}",
      key : "${var.functions.wire_united_robots.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_united_robots.result["fileName"]}-${var.environment}.zip",
      output_base64sha256 : "${base64sha256(data.local_file.bundle_wire_united_robots.content)}"
    }
  }

  depends_on = [
    data.external.bundle_data_wire_united_robots,
    null_resource.push_image_to_s3_wire_united_robots,
    data.local_file.bundle_wire_united_robots
  ]
}
