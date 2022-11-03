data "external" "bundle_data_wire_united_robots" {
  program = ["bash", "${path.root}/scripts/middleware_bundle_data.sh"]

  query = {
    bucketName         = "${var.s3_deployment_bucket}",
    bucketPrefix       = "${var.functions.wire_united_robots.s3_prefix}",
    bundleFilename     = "${var.s3_bundle_filename}",
    environment        = "${var.environment}",
    middlewareRootPath = "${var.functions.wire_united_robots.root_path}",
  }
}

resource "null_resource" "build_bundle_wire_united_robots" {
  triggers = {
    always_run = "${timestamp()}"
  }

  provisioner "local-exec" {
    interpreter = [
      "/bin/bash",
      "-c"
    ]

    command = <<EOF
      cd ${var.functions.wire_united_robots.root_path} && npm install && npm run build && cp -r ./node_modules ./dist/
    EOF
  }
}

data "archive_file" "bundle_wire_united_robots" {
  type        = "zip"
  source_dir  = "${var.functions.wire_united_robots.root_path}/dist"
  output_path = "${var.functions.wire_united_robots.root_path}/bundle.zip"

  depends_on = [
    null_resource.build_bundle_wire_united_robots
  ]
}

resource "null_resource" "push_image_to_s3_wire_united_robots" {
  triggers = {
    bundle_filename = "${data.external.bundle_data_wire_united_robots.result["fileName"]}"
  }

  provisioner "local-exec" {
    interpreter = [
      "/bin/bash",
      "-c"
    ]

    command = <<EOF
      aws s3 cp \
        ${var.functions.wire_united_robots.root_path}/bundle.zip \
        s3://${var.s3_deployment_bucket}/${var.functions.wire_united_robots.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_united_robots.result["fileName"]}-${var.environment}.zip \
        --acl private
    EOF
  }
}
