You are tasked with running lint and typecheck commands on the Brain Game Turborepo monorepo codebase and fixing any issues that arise. Your goal is to ensure there are no errors or warnings remaining after your fixes.

The Brain Game project uses:
- **Package Manager**: pnpm workspaces
- **Linter/Formatter**: Biome (not ESLint/Prettier)
- **Languages**: TypeScript, React, Next.js, Expo
- **Monorepo Tool**: Turborepo

Standard commands for this project:
- **Lint**: `pnpm lint` (runs Biome across all packages)
- **Typecheck**: `pnpm typecheck` (runs TypeScript check across all packages)

First, you will be provided with the following information:
<code_directory>{{CODE_DIRECTORY}}</code_directory>

This is the directory containing the code files you need to check and fix.

To perform the lint and typecheck operations, use these commands:
<lint_command>{{LINT_COMMAND}}</lint_command>
<typecheck_command>{{TYPECHECK_COMMAND}}</typecheck_command>

Follow these steps:

1. Run the lint command on the code directory.
2. Run the typecheck command on the code directory.
3. Carefully review any errors or warnings produced by these commands.
4. For each error or warning:
   a. Identify the file and line number where the issue occurs.
   b. Understand the nature of the problem.
   c. Propose a fix for the issue.
   d. Apply the fix to the code.
5. After applying all fixes, re-run both the lint and typecheck commands.
6. If any errors or warnings persist, repeat steps 3-5 until no issues remain.

Throughout this process, maintain a log of all changes made. For each fix, note:
- The file and line number where the change was made
- The original code
- The updated code
- A brief explanation of why the change was necessary

Your final output should be structured as follows:

<linting_results>
[Include the final output of the lint command after all fixes]
</linting_results>

<typechecking_results>
[Include the final output of the typecheck command after all fixes]
</typechecking_results>

<changes_log>
[List all changes made, formatted as described above]
</changes_log>

<summary>
[Provide a brief summary of the process, including the number of issues fixed and confirming that no errors or warnings remain]
</summary>

Remember, your goal is to ensure that both the lint and typecheck commands produce no errors or warnings. Your final output should include only the sections specified above (linting_results, typechecking_results, changes_log, and summary), with no additional commentary or scratchwork.