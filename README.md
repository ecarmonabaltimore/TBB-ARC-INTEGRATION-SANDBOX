# Baltimore-Banner-Middlewares

The intention of this repository is to contain all the middleware and the code 
of the AWS infrastructure in a single place, that way you can study faster what
are the current integrations for The Baltimore Banner webpage and the resources that 
exist in the AWS account from The Baltimore Banner team.

This repository contains two important folders:

- middleware
- terraforming

## Folders

### middleware

In this folder, you must create a folder for each integration that must be 
carried out, each folder will represent a bundle and from said bundle you can
deploy multiples lambda functions in AWS.

You can create middlewares with the programming language you feel comfortable 
with, just keep in mind that in terraform you must build the bundle with 
shell commands.

### terraform

All the resources to be deployed or already deployed are found, the Terraform 
tool is used to create the entire infrastructure as code.

If you want to know more about the terraform section go to the 
[README.md](terraform/README.md) of the terraform folder.

## Clone the repo

`git clone git@github.com:wizeline/Baltimore-Banner-Middlewares.git`

## ARCxp Documentation

Most middleware will use at least one ARCxp API, so we provide a link to the 
documentation for the different APIs that ARCxp has.

[ARCxp API's](https://baltimorebanner.arcpublishing.com/alc/arc-products/developer/user-documentation/api-documentation-index/)

If you are unable to view the ARCxp documentation immediately contact your PM 
requesting access.
# TBB-ARC-INTEGRATION-SANDBOX
