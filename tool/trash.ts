import { tool } from "@opencode-ai/plugin";

export const remove = tool({
  description: `Move files and directories to the system trash instead of permanently deleting them.

Use this instead of rm. Supports multiple paths in one call. Recoverable via system trash.`,

  args: {
    paths: tool.schema
      .array(tool.schema.string())
      .describe("File or directory paths to trash"),
    verbose: tool.schema
      .boolean()
      .optional()
      .describe("Explain what is being done (default: true)"),
  },

  async execute(args) {
    if (args.paths.length === 0) {
      return "Error: no paths provided";
    }

    const cmd = ["trash"];
    if (args.verbose !== false) cmd.push("--verbose");
    cmd.push(...args.paths);

    const result = await Bun.$`${cmd}`.nothrow().quiet();
    const stdout = result.stdout.toString().trim();
    const stderr = result.stderr.toString().trim();

    if (result.exitCode !== 0) {
      return `Error: ${stderr || "trash command failed"}`;
    }

    return stdout || `Trashed ${args.paths.length} item(s)`;
  },
});
