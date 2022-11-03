resource "aws_s3_bucket" "deployment_bucket" {
  bucket = "tbb-middleware-deployment-bucket"
  tags   = { "bucket_deployment" : "TBB_INT" }
}

resource "aws_s3_bucket_acl" "deployment_bucket_acl" {
  bucket = aws_s3_bucket.deployment_bucket.id
  acl    = "private"
}
