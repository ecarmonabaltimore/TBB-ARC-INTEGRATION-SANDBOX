#resource "aws_dynamodb_table" "terraform_statelock" {
#  name           = "${var.tfstate_name}-table"
#  read_capacity  = 5
#  write_capacity = 5
#  hash_key       = "LockID"

#  attribute {
#    name = "LockID"
#    type = "S"
#  }

 # tags = { "dynamo_tfstate" : "TBB_INT" }
#}
