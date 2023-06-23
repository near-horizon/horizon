# Scripts

This directory contains utility shell scripts that are used as
helpers for performing dev tasks when working with the staging
environment and/or quick fixes for production.

Each script is mostly self explanatory by virtue of it's filename
so here are explanations for some slightly more ambiguous ones:

- [single_widget_deploy.sh](./single_widget_deploy.sh) - This script
  creates a new temporary directory and copies over only the file that
  you pass to it as a parameter and deploys it to the SocialDB contract
  under the account ID that is also provided as a parameter
- [widget_delete.sh](./widget_delete.sh) - This script completely removes
  a widget from the SocialDB contract given the widget's name and account
  ID under which it's stored
