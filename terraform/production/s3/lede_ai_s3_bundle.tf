data "external" "bundle_data_wire_ledeai" {
  program = ["bash", "${path.root}/scripts/middleware_bundle_data.sh"]

  query = {
    bucketName         = "${var.s3_deployment_bucket}",
    bucketPrefix       = "${var.functions.wire_ledeai.s3_prefix}",
    bundleFilename     = "${var.s3_bundle_filename}",
    environment        = "${var.environment}",
    middlewareRootPath = "${var.functions.wire_ledeai.root_path}",
  }
}

resource "null_resource" "push_image_to_s3_wire_ledeai" {
  triggers = {
    bundle_filename = "${data.external.bundle_data_wire_ledeai.result["fileName"]}"
  }

  provisioner "local-exec" {
    interpreter = [
      "/bin/bash",
      "-c"
    ]

    command = <<EOF
      cd ${var.functions.wire_ledeai.root_path}
      npm install && npm run build && cp -r ./node_modules ./dist/
      zip -9 -r -q bundle.zip ./dist/*
      aws s3 cp \
        bundle.zip \
        s3://${var.s3_deployment_bucket}/${var.functions.wire_ledeai.s3_prefix}/${var.environment}/${data.external.bundle_data_wire_ledeai.result["fileName"]}-${var.environment}.zip \
        --acl private
    EOF
  }
}

data "local_file" "bundle_wire_ledeai" {
  filename = "${var.functions.wire_ledeai.root_path}/bundle.zip"

  depends_on = [
    null_resource.push_image_to_s3_wire_ledeai
  ]
}
