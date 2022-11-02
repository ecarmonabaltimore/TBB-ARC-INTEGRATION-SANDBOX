resource "aws_s3_bucket" "s3_tfstate" {
  bucket        = "${var.tfstate_name}-bucket-sandbox"
  force_destroy = true

  tags = { "bucket_tfstate" : "TBB_INT" }
}

resource "aws_s3_bucket_acl" "s3_tfstate_acl" {
  bucket = aws_s3_bucket.s3_tfstate.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "s3_tfstate_public_access_block" {
  bucket = aws_s3_bucket.s3_tfstate.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "s3_tfstate_versioning" {
  bucket = aws_s3_bucket.s3_tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}
