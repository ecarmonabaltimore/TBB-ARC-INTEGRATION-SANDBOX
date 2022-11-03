data "external" "bundle_data_integration_mailchimp_api" {
  program = ["bash", "${path.root}/scripts/middleware_bundle_data.sh"]

  query = {
    bucketName         = "${var.s3_deployment_bucket}",
    bucketPrefix       = "${var.functions.integration_mailchimp_api.s3_prefix}",
    bundleFilename     = "${var.s3_bundle_filename}",
    environment        = "${var.environment}",
    middlewareRootPath = "${var.functions.integration_mailchimp_api.root_path}",
  }
}

resource "null_resource" "build_bundle_integration_mailchimp_api" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    interpreter = [
      "/bin/bash",
      "-c"
    ]

    command = <<EOF
      cd ${var.functions.integration_mailchimp_api.root_path} && npm install
    EOF
  }
}

data "archive_file" "bundle_integration_mailchimp_api" {
  type        = "zip"
  source_dir  = var.functions.integration_mailchimp_api.root_path
  output_path = "${var.functions.integration_mailchimp_api.root_path}/bundle.zip"

  depends_on = [
    null_resource.build_bundle_integration_mailchimp_api
  ]

}

resource "null_resource" "push_image_to_s3_integration_mailchimp_api" {
  triggers = {
    bundle_filename = "${data.external.bundle_data_integration_mailchimp_api.result["fileName"]}"
  }

  provisioner "local-exec" {
    interpreter = [
      "/bin/bash",
      "-c"
    ]

    command = <<EOF
      aws s3 cp \
        ${var.functions.integration_mailchimp_api.root_path}/bundle.zip \
        s3://${var.s3_deployment_bucket}/${var.functions.integration_mailchimp_api.s3_prefix}/${var.environment}/${data.external.bundle_data_integration_mailchimp_api.result["fileName"]}-${var.environment}.zip \
        --acl private
    EOF
  }
}
