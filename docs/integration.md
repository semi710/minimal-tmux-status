# Integration

## NixOS + Home Manager + Stylix

The plugin pairs well with [stylix](https://github.com/danth/stylix) for automatic theme-matched colors. Use `config.lib.stylix.colors` to pull colors from your active theme:

```nix
{ config, pkgs, ... }: {
  programs.tmux.plugins = [
    {
      plugin = pkgs.tmuxPlugins.minimal-tmux-status;
      extraConfig = ''
        set -g @minimal-tmux-bg "#${config.lib.stylix.colors.base01}"
        set -g @minimal-tmux-fg "#${config.lib.stylix.colors.base06}"
        set -g @minimal-tmux-use-arrow true
        set -g @minimal-tmux-right-arrow ""
        set -g @minimal-tmux-left-arrow ""
      '';
    }
  ];
}
```

This way the status bar automatically matches your stylix theme (e.g. kanagawa-dragon, catppuccin, gruvbox) with zero manual color tweaking.

## ndots

[ndots](https://ndots.semi.sh) uses this plugin across all its hosts. The shared tmux config is in `modules/home/shell/tmux.nix`:

```nix
programs.tmux.plugins = with pkgs.tmuxPlugins; [
  {
    plugin = minimal-tmux-status;
    extraConfig = ''
      set -g @minimal-tmux-bg "#282727"
      set -g @minimal-tmux-fg "#c8c093"
      set -g @minimal-tmux-use-arrow true
      set -g @minimal-tmux-right-arrow ""
      set -g @minimal-tmux-left-arrow ""
    '';
  }
  # ...other plugins
];
```

The Darwin host (jp-mbp) overrides the colors to use stylix:

```nix
set -g @minimal-tmux-bg "#${config.lib.stylix.colors.base01}"
set -g @minimal-tmux-fg "#${config.lib.stylix.colors.base06}"
```

## Plain tmux (no Nix)

Add to `~/.tmux.conf`:

```bash
# Via TPM
set -g @plugin 'niksingh710/minimal-tmux-status'

# Configuration
set -g @minimal-tmux-bg "#698DDA"
set -g @minimal-tmux-fg "#000000"
set -g @minimal-tmux-use-arrow true
set -g @minimal-tmux-right-arrow ""
set -g @minimal-tmux-left-arrow ""
set -g @minimal-tmux-status "top"
```

## With Other Plugins

The plugin sets `status-style`, `status-left`, `status-right`, `status-position`, `status-justify`, and `window-status-format` / `window-status-current-format`. If you use other status plugins, load this one **last** so its settings take effect, or load it first and let the other plugin override specific fields.

Common companions in ndots:

| Plugin | What it does |
|---|---|
| `better-mouse-mode` | Mouse support |
| `fzf-tmux-url` | `u` to fuzzy-pick URLs |
| `vim-tmux-navigator` | `Ctrl+hjkl` to move between tmux and vim |

```nix
programs.tmux.plugins = with pkgs.tmuxPlugins; [
  { plugin = minimal-tmux-status; extraConfig = '' ... ''; }
  better-mouse-mode
  { plugin = fzf-tmux-url; extraConfig = '' set -g @fzf-url-bind "u" ''; }
  { plugin = vim-tmux-navigator; extraConfig = '' ... ''; }
];
```
