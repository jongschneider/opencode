import { tool } from "@opencode-ai/plugin";

export const search = tool({
  description: `Search code using ast-grep's structural AST pattern matching.

Use for code patterns hard to match with regex (formatting-agnostic).

Metavariables:
- $VAR: matches single AST node
- $$$VAR: matches zero or more nodes

Go examples:
- if err != nil { $$$BODY } - find error handling blocks
- func $NAME($$$PARAMS) error { $$$BODY } - find functions returning error
- if $ERR := $CALL; $ERR != nil { $$$BODY } - find init-statement error checks
- defer $EXPR - find all defers
- go func() { $$$BODY }() - find goroutine lambdas
- $FUNC($$$ARGS) - find all calls (unqualified)
- fmt.Println($A, $B) - find qualified calls (use fixed arity, not $$$)

Go caveat: $$$VAR does not work in args of qualified calls (e.g. pkg.Func($$$ARGS) won't match). Use fixed-arity metavars like pkg.Func($A) or pkg.Func($A, $B) instead.`,

  args: {
    pattern: tool.schema.string().describe("AST pattern to match"),
    path: tool.schema
      .string()
      .optional()
      .describe("Path to search (default: .)"),
    lang: tool.schema
      .enum([
        "typescript",
        "tsx",
        "javascript",
        "python",
        "rust",
        "go",
        "java",
        "c",
        "cpp",
        "csharp",
        "kotlin",
        "swift",
        "ruby",
        "lua",
        "elixir",
        "html",
        "css",
        "json",
        "yaml",
      ])
      .optional()
      .describe("Language (auto-detected if omitted)"),
    json: tool.schema.boolean().optional().describe("Output as JSON"),
  },

  async execute(args) {
    const cmd = ["ast-grep", "run", "--pattern", args.pattern];
    if (args.lang) cmd.push("--lang", args.lang);
    if (args.json) cmd.push("--json");
    cmd.push(args.path ?? ".");

    const result = await Bun.$`${cmd}`.nothrow().quiet();
    if (result.exitCode !== 0 && result.stderr.toString().trim()) {
      return `Error: ${result.stderr.toString()}`;
    }
    return result.stdout.toString() || "No matches found.";
  },
});

export const rewrite = tool({
  description: `Transform code using ast-grep pattern matching.

Rewrites matched patterns with replacement. Uses same metavariables from search pattern.

Example: pattern="fmt.Println($MSG)" rewrite="log.Info($MSG)"

Go caveat: $$$VAR does not work in args of qualified calls. Use fixed-arity metavars instead (e.g. fmt.Println($A) not fmt.Println($$$ARGS)).`,

  args: {
    pattern: tool.schema.string().describe("AST pattern to match"),
    rewrite: tool.schema
      .string()
      .describe("Replacement pattern (use same metavariables)"),
    path: tool.schema
      .string()
      .optional()
      .describe("Path to transform (default: .)"),
    lang: tool.schema.string().optional().describe("Language hint"),
  },

  async execute(args) {
    const cmd = [
      "ast-grep",
      "run",
      "--pattern",
      args.pattern,
      "--rewrite",
      args.rewrite,
      "--update-all",
    ];
    if (args.lang) cmd.push("--lang", args.lang);
    cmd.push(args.path ?? ".");

    const result = await Bun.$`${cmd}`.nothrow().quiet();
    if (result.exitCode !== 0 && result.stderr.toString().trim()) {
      return `Error: ${result.stderr.toString()}`;
    }
    return result.stdout.toString() || "No changes needed.";
  },
});
