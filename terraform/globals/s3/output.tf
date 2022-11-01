output "deployment_bucket_name" {
  description = "Name of the bucket that contents all bundles"
  sensitive   = false
  value       = aws_s3_bucket.deployment_bucket.bucket
}
