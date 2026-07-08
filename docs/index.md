# minimal-tmux-status

A minimal tmux status bar plugin with a prefix key indicator. Inspired by [zellij](https://github.com/zellij-org/zellij)'s prefix indicator - the status bar shows when the prefix key is pressed, so you never second-guess whether tmux is listening.

Available in [nixpkgs](https://search.nixos.org/packages?query=minimal-tmux-status) as `pkgs.tmuxPlugins.minimal-tmux-status`, via [TPM](https://github.com/tmux-plugins/tpm), or directly from the [flake](https://github.com/niksingh710/minimal-tmux-status).

## Preview

When the prefix is **not** pressed, the status bar is clean and minimal:

![unpressed prefix](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/a7783229-cd8c-435d-8bf5-fa7ffa3f43ea)

When the prefix **is** pressed, the indicator lights up:

![pressed prefix](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/831113d7-6ba5-43f6-908b-2158b99f0ffe)

## How It Works

The plugin is a single bash script (`minimal.tmux`) that runs on tmux startup and sets status bar options. The core mechanism is the **prefix indicator** - it uses tmux's `#{?client_prefix,...,...}` format specifier to conditionally show the indicator string when the prefix key is active:

```
#{?client_prefix,INDICATOR,}
```

So the left status shows the indicator only when the prefix is pressed, and nothing when it's not. The right side shows the session name (`#S`) by default.

### Window Status

The window status format detects SSH sessions and shows the remote hostname instead of the command name:

```
#I:#{?#{m:ssh*,#{pane_current_command}},
  #(ps -t #{pane_tty} -o args= | grep "^ssh " | sed "s/.* //"),
  #W
}
```

This means: if the pane is running `ssh`, extract the hostname from the process args; otherwise show the window name. The current window is highlighted with arrows and an optional expanded (fullscreen) icon.

## Installation

### NixOS / Home Manager (recommended)

The plugin is in nixpkgs:

```nix
programs.tmux.plugins = [
  {
    plugin = pkgs.tmuxPlugins.minimal-tmux-status;
    extraConfig = ''
      set -g @minimal-tmux-use-arrow true
      set -g @minimal-tmux-right-arrow ""
      set -g @minimal-tmux-left-arrow ""
    '';
  }
];
```

### Via Flake

```nix
{
  inputs.minimal-tmux-status.url = "github:niksingh710/minimal-tmux-status";

  outputs = { self, nixpkgs, minimal-tmux-status, ... }: {
    homeConfigurations.myuser = ... {
      programs.tmux.plugins = [
        {
          plugin = minimal-tmux-status.packages.${system}.default;
          extraConfig = ''
            set -g @minimal-tmux-bg "#282727"
          '';
        }
      ];
    };
  };
}
```

### Via TPM

Add to `~/.tmux.conf`:

```bash
set -g @plugin 'niksingh710/minimal-tmux-status'
```

Press `prefix` + <kbd>I</kbd> to install, then reload:

```bash
tmux source-file ~/.tmux.conf
```

## Quick Configuration

The most common tweaks:

```bash
# Colors (defaults: bg=#698DDA, fg=#000000)
set -g @minimal-tmux-bg "#282727"
set -g @minimal-tmux-fg "#c8c093"

# Arrow-style current window (defaults: no arrows)
set -g @minimal-tmux-use-arrow true
set -g @minimal-tmux-right-arrow ""
set -g @minimal-tmux-left-arrow ""

# Position (default: bottom)
set -g @minimal-tmux-status "top"

# Indicator string (default: " tmux ")
set -g @minimal-tmux-indicator-str "  tmux  "
```

See [Configuration](configuration.md) for the full options reference and [Integration](integration.md) for stylix and ndots examples.

## Tips

### Toggle the status bar

Add to your tmux config:

```bash
bind-key b set-option status
```

Now `prefix + b` toggles the status bar on/off.

### Auto-install TPM

Put this before `run '~/.tmux/plugins/tpm/tpm'` in `.tmux.conf` to auto-install TPM on first start:

```bash
if "test ! -d ~/.tmux/plugins/tpm" \
   "run 'git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm && ~/.tmux/plugins/tpm/bin/install_plugins'"
```
