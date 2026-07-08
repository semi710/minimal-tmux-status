# Configuration

All options are tmux user options prefixed with `@minimal-tmux-`. Set them via `set -g` in your tmux config or via `extraConfig` in home-manager.

## Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `@minimal-tmux-bg` | color | `#698DDA` | Background color of the status indicator and current window |
| `@minimal-tmux-fg` | color | `#000000` | Foreground color of the status indicator and current window |
| `@minimal-tmux-status` | `top` \| `bottom` | `bottom` | Position of the status bar |
| `@minimal-tmux-justify` | `left` \| `centre` \| `right` | `centre` | Justification of the status content |
| `@minimal-tmux-indicator` | bool | `true` | Show the prefix indicator |
| `@minimal-tmux-indicator-str` | string | ` tmux ` | Text shown when prefix is pressed |
| `@minimal-tmux-right` | bool | `true` | Show the right side of the status bar |
| `@minimal-tmux-left` | bool | `true` | Show the left side of the status bar |
| `@minimal-tmux-status-right` | string | `#S` | Content of the right status (session name by default) |
| `@minimal-tmux-status-left` | string | *(see code)* | Content of the left status (prefix indicator by default) |
| `@minimal-tmux-status-right-extra` | string | `""` | Extra text appended to the right status |
| `@minimal-tmux-status-left-extra` | string | `""` | Extra text appended to the left status |
| `@minimal-tmux-use-arrow` | bool | `false` | Enable arrow-style current window indicator |
| `@minimal-tmux-right-arrow` | string | `` | Right arrow character (when `use-arrow` is true) |
| `@minimal-tmux-left-arrow` | string | `` | Left arrow character (when `use-arrow` is true) |
| `@minimal-tmux-expanded-icon` | string | `󰊓 ` | Icon shown for zoomed (fullscreen) windows |
| `@minimal-tmux-show-expanded-icon-for-all-tabs` | bool | `false` | Show expanded icon on all tabs, not just the current one |
| `@minimal-tmux-window-status-format` | string | *(see code)* | Format string for non-current windows |

## Colors

The `bg` and `fg` options control the indicator and current-window highlight. They accept any hex color:

```bash
set -g @minimal-tmux-bg "#698DDA"  # blue (default)
set -g @minimal-tmux-fg "#000000"  # black (default)
```

To match your terminal theme, use the color values from your theme. For example, with [stylix](https://github.com/danth/stylix):

```bash
set -g @minimal-tmux-bg "#${config.lib.stylix.colors.base01}"
set -g @minimal-tmux-fg "#${config.lib.stylix.colors.base06}"
```

## Arrows

When `@minimal-tmux-use-arrow` is `true`, the current window gets arrow-style borders using the left and right arrow characters. Common choices:

| Style | Left | Right |
|---|---|---|
| Rounded | `` | `` |
| Edged | `` | `` |
| Triangle | `◤` | `◢` |

```bash
set -g @minimal-tmux-use-arrow true
set -g @minimal-tmux-right-arrow ""
set -g @minimal-tmux-left-arrow ""
```

## Status Content

### Left side

By default, the left side shows the prefix indicator. Override `@minimal-tmux-status-left` to change it, or use `@minimal-tmux-status-left-extra` to add text after it:

```bash
# Add a clock to the left
set -g @minimal-tmux-status-left-extra " #(date +%H:%M) "
```

### Right side

By default, the right side shows the session name (`#S`). Override it or add extra text:

```bash
# Show session name + datetime
set -g @minimal-tmux-status-right "#S"
set -g @minimal-tmux-status-right-extra " %Y-%m-%d %H:%M "
```

### String length

If your status text gets cut off, increase the length limits:

```bash
set -g status-right-length 50
set -g status-left-length 50
```

## Window Status

The default window status format shows the window number and either the SSH hostname (if the pane is running ssh) or the window name:

```
 #I:#{?#{m:ssh*,#{pane_current_command}},
  #(ps -t #{pane_tty} -o args= | grep "^ssh " | sed "s/.* //"),
  #W
}
```

Override with `@minimal-tmux-window-status-format` if you want a different format.

### Expanded icon

When a window is zoomed (fullscreen via `prefix + z`), an icon is shown. By default it only appears on the current window. Set `@minimal-tmux-show-expanded-icon-for-all-tabs` to `true` to show it on all tabs:

```bash
set -g @minimal-tmux-expanded-icon "󰊓 "
set -g @minimal-tmux-show-expanded-icon-for-all-tabs true
```
