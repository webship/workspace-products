Bring a product to green before a push: the checks it declares, then its pipeline on this machine.

The launch line is for Claude Code, the default; the text between the triple quotes can be given to another AI CLI as it is.

```
claude --permission-mode bypassPermissions """
Bring the product <product> of the products folder to green before it is pushed
# ~/workspace/products/<product> · a git checkout · container-based (DDEV by default)
# nothing is pushed, merged, reset or removed in this session

1. bash cmd-tools-checks.sh <product> --list
   tell me which checks the product declares
2. bash cmd-tools-checks.sh <product>
   every declared check; tell me which are red, with the first lines of each
3. bash cmd-tools-gitlab-ci-local.sh <product> --doctor
   stop and tell me if the runner or the container engine is missing
4. bash cmd-tools-gitlab-ci-local.sh <product> --list
5. bash cmd-tools-gitlab-ci-local.sh <product>
   if the whole pipeline cannot run here, say why and run: bash cmd-tools-gitlab-ci-local.sh <product> --slim

Report: the checks (passed, failed, not declared), the pipeline (GREEN or RED, which jobs ran,
which could not run here). A red job is a result: do not hide it, do not allow it to fail.
Then ask me whether to fix what is red.
"""
```
