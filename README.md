<p align="center" style="color:grey">

![image](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/f689e7c8-f081-421e-a7f4-3108f9a870eb)

<div align="center">

<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>

This is a theme/plugin for my Tmux Status bar.<br>
This is inspired from the zellij prefix indicator, that shows when the prefix key is pressed.<br>

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Bash](https://img.shields.io/badge/language-Bash-4EAA25.svg)
![Tmux](https://img.shields.io/badge/Tmux-3BBECC.svg)
![Stars](https://img.shields.io/github/stars/niksingh710/minimal-tmux-status.svg)
![Contributors](https://img.shields.io/github/contributors/niksingh710/minimal-tmux-status.svg)

<img width="2000" height="0">
</td>
</tbody>
</table>

> This theme was created with a focus on minimalism and essential elements, ensuring a clean and distraction-free Tmux status bar. Whether you're an experienced Tmux user or just getting started, this theme offers a seamless experience with support for the `prefix key press`.

<h3>📚 <a href="https://mtmux.semi.sh">mtmux.semi.sh</a> - Full Documentation</h3>
<sub>Configuration · Integration · Stylix · Nix</sub>

</div>
</p>

### Preview

<p align="center" style="color:grey">
<div align="center">

<video width="800" autoplay loop src="https://github.com/niksingh710/minimal-tmux-status/assets/60490474/5d5cece0-5edf-4035-bb2d-c46868c357d1"></video>

| Un pressed Prefix                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- |
| ![image](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/a7783229-cd8c-435d-8bf5-fa7ffa3f43ea) |
| **Pressed Prefix**                                                                                                |
| ![image](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/831113d7-6ba5-43f6-908b-2158b99f0ffe) |

</div>
</p>

  <details>
    <summary>More</summary>

![output](https://github.com/niksingh710/minimal-tmux-status/assets/60490474/d12e544b-3d4a-43a4-93fc-cf767201b761)

  </details>

### Variables to Configure

##### My Personal Configuration

![image](https://github.com/user-attachments/assets/e58cafed-295f-49d4-af15-86f67d580a76)

<details>
    <summary>Config</summary>

```tmux
# set -g @minimal-tmux-bg "#${config.stylix.base16Scheme.base01}" (or you can use it with pywal)
set -g @minimal-tmux-use-arrow true
set -g @minimal-tmux-right-arrow ""
set -g @minimal-tmux-left-arrow ""
```
</details>

<br>

```sh
# These are the default values used inside the plugin to achieve the preview shown above.

set -g @minimal-tmux-fg "#000000"
set -g @minimal-tmux-bg "#698DDA"
set -g @minimal-tmux-justify "centre"
set -g @minimal-tmux-indicator-str "  tmux  "
set -g @minimal-tmux-indicator true
set -g @minimal-tmux-status "bottom"

# Enables or disables the left and right status bar
set -g @minimal-tmux-right true
set -g @minimal-tmux-left true

# expanded icon (fullscreen icon)
set -g @minimal-tmux-expanded-icon "󰊓 "

# on all tabs (default is false)
# false will make it visible for the current tab only
set -g @minimal-tmux-show-expanded-icon-for-all-tabs true

# To add or remove extra text in status bar
set -g @minimal-tmux-status-right-extra ""
set -g @minimal-tmux-status-left-extra ""

# To make the selection box rounded () or edged <>
# Default is nothing, when set to true default is edged
set -g @minimal-tmux-use-arrow true
set -g @minimal-tmux-right-arrow ""
set -g @minimal-tmux-left-arrow ""

# Not recommended to change these values
set -g @minimal-tmux-status-right "#S"
set -g @minimal-tmux-status-left "refer to code"

# If getting strings cut in left status or right
# Here 20 is the length of the characters in the string
set -g status-right-length 20
set -g status-left-length 20
```

### Installation

#### As flake in Nix os

```nix
# tmux config
programs.tmux.plugins = [
  {
    plugin = pkgs.tmuxPlugins.minimal-tmux-status; # as now available in nixpkgs
    extraConfig = ''
      set -g @minimal-tmux-use-arrow true
      set -g @minimal-tmux-right-arrow ""
      set -g @minimal-tmux-left-arrow ""
    '';
  }
];
```

#### Via Tmux Plugin Manager (TPM)

I recommend using [Tmux Plugin Manager (TPM)](https://github.com/tmux-plugins/tpm) for easy installation:

1. Add the theme to your list of TPM plugins in your `~/.tmux.conf`:

   ```bash
   set -g @plugin 'niksingh710/minimal-tmux-status'
   ```

2. Press `prefix` + <kbd>I</kbd> (capital "i", as in Install) to fetch and install the plugin.

3. Reload your Tmux configuration:

   ```bash
   tmux source-file ~/.tmux.conf
   ```

That's it! Your Tmux Status Theme is now installed and ready to use.

### Tip

#### Toggle Status Bar

Add this line in your tmux config so that you can easily toggle tmux status bar with one keymap.

```
bind-key b set-option status
```

Now pressing `prefix+b` will toggle status bar

<details>

<summary style="font-weight: bold; font-size: 21px;"> Automatic tpm installation </summary>

One of the first things we do on a new machine is cloning our dotfiles. Not everything comes with them though, so for example `tpm` most likely won't be installed.

If you want to install `tpm` and plugins automatically when tmux is started, put the following snippet in `.tmux.conf` before the final `run '~/.tmux/plugins/tpm/tpm'`:

```
if "test ! -d ~/.tmux/plugins/tpm" \
   "run 'git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm && ~/.tmux/plugins/tpm/bin/install_plugins'"
```

</details>
