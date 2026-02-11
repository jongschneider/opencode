# opencode

Personal [OpenCode](https://opencode.ai) configuration — custom agents, tools, commands, skills, and plugins for an opinionated AI-assisted development workflow.

## Installation

Clone into your OpenCode config directory:

```sh
git clone git@github.com:jongschneider/opencode.git ~/.config/opencode
```

Install the plugin dependency:

```sh
cd ~/.config/opencode && bun install
```

### Prerequisites

- [OpenCode](https://opencode.ai) installed
- [Bun](https://bun.sh) runtime (for custom tools and plugins)
- [ast-grep](https://ast-grep.github.io) CLI (`brew install ast-grep`)
- [trash](https://github.com/sindresorhus/trash-cli) CLI (`brew install trash`)

## Structure

```
~/.config/opencode/
├── config.json          # App settings (theme, keybinds, MCP servers)
├── opencode.json        # Permissions and keybind overrides
├── AGENTS.md            # Global rules for all sessions
├── agent/               # Custom subagents
│   ├── code-reviewer.md #   Read-only code reviewer (bugs, structure, perf)
│   ├── oracle.md        #   Senior engineering advisor (claude-opus-4-5, extended thinking)
│   └── opencode-expert.md # OpenCode config/feature expert with source access
├── command/             # Slash commands
│   ├── build-skill.md   #   /build-skill — create or update agent skills
│   ├── code-review.md   #   /code-review — parallel 3x review + oracle validation
│   ├── commit.md        #   /commit — conventional commit from current changes
│   ├── index-knowledge.md # /index-knowledge — generate AGENTS.md knowledge base
│   ├── plan-spec.md     #   /plan-spec — dialogue-driven spec development
│   └── tmux.md          #   /tmux — interact with tmux sessions
├── skill/               # Loadable skill packages
│   ├── build-skill/     #   Skill authoring guide with scripts and references
│   ├── index-knowledge/ #   Hierarchical codebase documentation generator
│   ├── spec-planner/    #   Skeptical spec development with decision frameworks
│   └── tmux/            #   tmux session management and CLI testing
├── tool/                # Custom tools (TypeScript, via @opencode-ai/plugin)
│   ├── ast-grep.ts      #   AST-based code search and rewrite
│   └── trash.ts         #   Safe file deletion (trash instead of rm)
└── plugins/
    └── notification.js  # Sound notification on session idle / permission prompt
```

## Configuration

### `config.json`

Application-level settings:

- **Theme**: `catppuccin-macchiato`
- **Keybinds**: Vim-style navigation (`ctrl+u`/`ctrl+d` for half-page scroll), `ctrl+space` leader key
- **MCP servers**: VS Claude server (disabled by default)

### `opencode.json`

Permission rules for bash commands — a curated allowlist of safe read-only commands (`git`, `ls`, `grep`, `rg`, `go`, etc.) with destructive or write operations gated behind `ask` prompts (`git push`, `gh * create`, `xargs`, etc.).

### `AGENTS.md`

Global rules applied to every session:

- Prefer `ast-grep` over regex for structural code searches
- Never use `rm` — always use the `trash` tool

## Agents

| Agent | Model | Purpose |
|-------|-------|---------|
| **code-reviewer** | Default | Read-only code review focused on bugs, structure, and performance. No write access. |
| **oracle** | claude-opus-4-5 | Senior engineering advisor with extended thinking. Read-only. Provides architecture guidance, trade-off analysis, and implementation plans with effort estimates (S/M/L/XL). |
| **opencode-expert** | Default | OpenCode configuration specialist. Validates answers against the OpenCode source code before responding. |

## Commands

| Command | Description |
|---------|-------------|
| `/build-skill` | Create or update agent skills using the build-skill framework |
| `/code-review` | Run 3 parallel code-reviewer agents, correlate findings, then validate with oracle |
| `/commit` | Generate a conventional commit message from staged/unstaged changes |
| `/index-knowledge` | Generate hierarchical `AGENTS.md` documentation for a codebase |
| `/plan-spec` | Develop implementation-ready specs through iterative skeptical questioning |
| `/tmux` | List, read, or spin up tmux sessions for CLI testing |

## Custom Tools

### ast-grep (`tool/ast-grep.ts`)

Structural code search and rewrite using [ast-grep](https://ast-grep.github.io). Matches AST patterns rather than text, so it's agnostic to formatting and comments. Exports two tools:

- **search** — find code matching an AST pattern
- **rewrite** — transform matched patterns with replacement expressions

### trash (`tool/trash.ts`)

Safe file deletion that moves files to the system trash instead of permanently deleting them. Wraps the `trash` CLI.

## Plugins

### notification (`plugins/notification.js`)

Plays a system sound (`Glass.aiff`) when:

- A main session becomes idle (subagent sessions are excluded)
- A permission prompt is shown

## Credit

Heavily inspired by (read: stolen from) [dmmulroy/.dotfiles](https://github.com/dmmulroy/.dotfiles).

## License

MIT
