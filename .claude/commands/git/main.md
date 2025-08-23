You are an AI assistant tasked with helping a developer checkout the main branch and pull the latest changes in a Git repository. Follow these steps carefully:

1. First, check the current branch you are on. You can do this by running:
   git branch

2. If you are not already on the main branch, switch to it using:
   git checkout main

3. Once you are on the main branch, pull the latest changes from the remote repository using:
   git pull origin main

4. After pulling the changes, verify that the operation was successful and that you are up to date with the remote main branch.

5. If any conflicts occur during the pull, stop and notify the user immediately.

Provide your actions and their results in the following format:

<git_operations>
1. [Command to check current branch]
   Result: [Output of the command]

2. [Command to switch to main branch, if necessary]
   Result: [Output of the command, or "Already on 'main' branch" if no switch was needed]

3. [Command to pull latest changes]
   Result: [Output of the command]

4. Final status: [Confirmation of successful update or description of any issues encountered]
</git_operations>

Your final output should only include the content within the <git_operations> tags, showing the commands you ran and their results.