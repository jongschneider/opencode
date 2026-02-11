---
description: Review changes with parallel @code-review subagents
agent: plan
---
Review the code changes using THREE (3) @code-reviewer subagents and correlate results into a summary ranked by severity. Use the provided user guidance to steer the review and focus on specific code paths, changes, and/or areas of concern. Once all three @code-reviewer subagents return their findings and you have correlated and summarized the results, consult the @oracle subagent to perform a deep review on the findings focusing on accuracy and correctness by evaluating the surrounding code, system, subsystems, abstractions, and overall architecture of each item. Apply any recommendations from the oracle. NEVER SKIP ORACLE REVIEW.

Guidance: $ARGUMENTS

Review uncommitted changes by default. If no uncommitted changes, review the last commit.

## Pull Request Reviews

If the user provides a pull request URL or identifier, fetch it and review.

### Bitbucket

The `bitbucket` CLI is provided by [bitbucket-mcp](https://github.com/MatanYemini/bitbucket-mcp) wrapped with [mcporter](https://github.com/steipete/mcporter/) to produce a standalone CLI binary.

Parse the URL format `https://bitbucket.org/{workspace}/{repo-slug}/pull-requests/{id}` to extract workspace, repo-slug, and pull-request-id. Then run:
```
bitbucket getPullRequest --workspace <workspace> --repo-slug <repo-slug> --pull-request-id <id>
bitbucket getPullRequestDiff --workspace <workspace> --repo-slug <repo-slug> --pull-request-id <id>
```
Use the PR description from `getPullRequest` for context and the diff from `getPullRequestDiff` for the actual review.

### GitHub
If the user provides a GitHub PR link or number, use `gh` CLI to fetch it.
