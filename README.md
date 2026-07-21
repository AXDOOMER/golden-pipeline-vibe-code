# Design for vibe code pipeline

- build should fail if a dependency lockfile is missing
- we need a quality gate on PRs so critical vulnerabilities that have fixes must be fixed by the developers before merging
- urgent fix tag can skip quality gate
- a report on the vulnerabilities of third party dependencies must be displayed on PRs. it must be updated on future changes. 
- docker files are allowed to be deployed with vulnerabilities as it's hard to control OS vulnerabilities
- docker files must be uploaded to the container registry after a commit on main (uploads a latest image)
- when a tag is created, an image with the corresponding tag is uploaded to the container registry
- if the image version already exists, the developer is informed of that
- there is a secret scan in every PR that checks up to 50 commits back in the history for leaked secrets. a report must be displayed on the PRs. 
- we are playing for GHAS and GitHub Secrets (the full GitHub security suite)
- if something is not covered by GHAS, we'll do it using open source and free actions like Grype or Trivy or something else such as Docker's own action to scan docker images for vulnerabilities. 
- dependencies are locked down to hashes and the current latest version. the version of this hash is in the CI/CD manifest as a comment after each hash. 
- languages that are not compiled or built, must perform lint in the CI pipeline. 
- CodeQL is used for code scanning, but semgrep can also be used. 
- Every security finding must be uploaded to the security tab of GitHub, but not if it's work that currently sits in a branch.
- a modern linter should be used with Python, like Ruff
- third party dependency scanning is always run first to reduce the blast radius malicious JS dependencies. you must take all the necessary measures to protect the project's source code and its secrets.

#  Directives 

--- 

Note to the AI agent: 

There are three test projects. AI should design a CI/CD pipeline without editing those projects. The CI/CD pipeline will build Dockerfiles found in those projects and will publish it according to the above rules. AI will not edit the readme file and it will tell the user what it did and why.

ADC credentials are stored at: /Users/axdoomer/.config/gcloud/application_default_credentials.json

Ues this to setup the CI/CD pipeline so images can be pushed to GCP's container registry.

--- 