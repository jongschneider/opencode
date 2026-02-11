## Code Search

For structural code searches -- finding function signatures, error handling patterns, interface implementations, call sites -- prefer the ast-grep tool (`ast-grep`) over regex-based grep. ast-grep matches the AST, so it's agnostic to formatting, whitespace, and comments.

Use grep/ripgrep for simple text/string searches. Use ast-grep when the pattern involves code structure.

## File Deletion

Never use `rm`. Always use the trash tool to move files to the system trash instead of permanently deleting them.

## tmux

When interacting with tmux sessions, always use detached mode and `capture-pane` to read output. Never attach to sessions directly.
