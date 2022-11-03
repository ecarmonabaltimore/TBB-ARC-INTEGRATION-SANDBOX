# The Middleware infrastructure

You will find in this folder the code of all the middlewares infrastructure developed for The Baltimore Banner.

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
terraform workspace select default
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
### api_gateway

Describe all configuration relate with AWS api gateway. If a lambda 
requires an endpoint where to receive information, configurations must 
be added inside this folder.

### lambda

Describe all terraform configuration relate with AWS lambda. If a lambda 
is created, its configuration must be found inside this folder.

### s3

Describe all terraform configuration relate with AWS S3 bucket, mainly the 
S3 bucket where the bundles of the different integrations are uploaded.
If a new integration is added it is necessary to create a configuration 
under this folder.

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

## Workspaces

It must be taken into account that the workspace approach is used to isolate
the deployed resources between environments.

### default

This environment is described all the resources of the development environment, 
all those resources of the development environment point to an ARCxp Sanbdox 
environment.

### prod

This environment is describing all the resources of the production environment, 
all those resources of the development environment point to an ARCxp Production
environment.

Take into consideration that the Development environment is a mirror of the 
Production environment, so any changes that you want to make in Production must 
first work correctly in the Development environment.
