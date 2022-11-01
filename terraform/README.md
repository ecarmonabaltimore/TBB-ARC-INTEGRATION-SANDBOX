# The Middleware infrastructure

You will find in this folder the code of all the middlewares infrastructure developed for The Baltimore Banner.

## Warning

It must be taken into account that the isolated folders approach is used to differentiate 
the deployed resources between environments, having said that it is imperative 
that resources are first provisioned in the development environment (development folder)
after this design/architecture meets the requirements, it is processed to establish the 
same architecture for the production environment (production folder).

## Quick Start

### Pre-requisite installed packages:

- aws-cli
- bash
- curl
- jq
- zip

### Terraform

#### Usage

```sh
export AWS_ACCESS_KEY_ID=xxxxxx
export AWS_SECRET_ACCESS_KEY=xxxx
```

```sh
terraform init
terraform plan
```

## Requirements

| Name       | Version    |
| ---------- | ---------  |
| terraform  | ~> 1.2.7   |
| aws-cli    | ~> 1.22.81 |
| bash       | ~> 5.1.16  |
| curl       | ~> 7.85.0  |
| jq         | ~> 1.6     |
| zip        | ~> 3.0     |

## Providers

| Name | Version |
| ---- | ------- |
| aws  | ~> 4.26 |

## Inputs

No inputs.

## Outputs

No output.

## Folders
### development
Here is described the infrastructure that will undergo constant changes due to
development, take this environment to refine and adjust the infrastructure to 
meet the requested requirements.

### globals
Here are described only those resources that will be used globally, this means 
that they will be used equally by the development environment and the production 
environment.

Take into consideration that to date they are only described in this folder:

- An S3 bucket where all the bundles of the different middleware that are developed will be stored.
- An S3 bucket to store the `terraform.tfstate` (remote backend).
- A DynamoDB table to block parallel executions of terraform (remote backend).

### production

This folder describes the infrastructure of middlewares in production, take into
account that any change you want to make in this folder must first be tested 
in the development environment (development folder), after fulfilling the 
requirements, proceed to add the changes in this folder.

### Scripts

There are two scripts which are designed to facilitate the process of resource 
deployment. The first and simplest is `bundle_name.sh` and the second most 
complex is `middleware_bundle_data.sh`.

#### `bundle_name.sh`

This script has the purpose of exposing 3 variables to the Terraform environment.

- `hash` - its value being the hash of the current commit.
- `timestamp` - being its value a UTC timestamp string in [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) format.
- `bundleName` - the bundle name will depend on the timestamp and hash of the current commit.

#### `middleware_bundle_data.sh`

This script decides if there are any middleware changes in the current commit, 
if so the bundle name `bundleName` used will be the one returned by 
`bundle_name.sh`, if there are no middleware changes in the current commit, it
looks for the last image uploaded to the S3 bucket and takes the name, as well
as downloads the bundle so that it is available for the Terraform environment. 
This script only exposes the following variable to terraform:

- `fileName` - the name of the default that the middleware zip bundle should have.
