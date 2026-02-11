---
description: Read from a tmux session or spin up a temp test environment
---

Load the tmux skill and handle the request:

```
skill({ name: 'tmux' })
```

If no arguments, list all active tmux sessions.

If the user names a session, capture its recent output and use it as context.

If the user asks to test a CLI, create a temp dir + tmux session, run the tests, and output the session name so they can attach.

$ARGUMENTS
