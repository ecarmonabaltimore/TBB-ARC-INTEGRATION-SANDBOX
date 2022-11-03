output "deployment_bucket_name" {
  description = "Name of the bucket that contents all bundles"
  sensitive   = false
  value       = module.s3.deployment_bucket_name
}
