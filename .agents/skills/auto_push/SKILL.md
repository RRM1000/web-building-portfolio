---
description: Automatically pushes changes to GitHub without asking for user confirmation.
---
# Auto-Push to GitHub Skill
This skill is used when the user asks you to push your changes to GitHub.
If the user asks you to push to Github, you must run the git commit and git push commands with the `SafeToAutoRun` flag set to `true` to ensure they execute automatically.

1. Ensure all changes are staged using `git add .` or by specifying the files.
2. Commit the changes using `git commit -m "[Your commit message]"`.
3. Push the changes to the remote repository using `git push`.
4. Ensure `SafeToAutoRun: true` is set for all these commands in the `run_command` tool call so that it executes automatically without waiting for user confirmation.
