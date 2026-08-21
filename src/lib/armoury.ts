export interface ArmouryOutputLine {
  text: string;
  kind: "cmd" | "out" | "ok" | "warn";
}

export interface ArmouryTool {
  name: string;
  desc: string;
  usage: string;
  deps?: string;
  example?: string;
  output?: ArmouryOutputLine[];
  tags?: string[];
  related?: string[];
}

export interface ArmouryCategory {
  id: string;
  index: string;
  name: string;
  sigil: string;
  blurb: string;
  tools: ArmouryTool[];
}

export const REPO = "https://github.com/hariharen9/sharmory";
export const RAW_BASE = "https://raw.githubusercontent.com/hariharen9/sharmory/main";
export const TOTAL_TOOLS = 242;
export const SHIPPED = 242;

export const CATEGORIES: ArmouryCategory[] = [
  {
    "id": "files",
    "index": "01",
    "name": "NAVIGATION & FILES",
    "sigil": "⌘",
    "blurb": "Fast directory jumping, fuzzy search, safe backups, archive extraction, and size inspection.",
    "tools": [
      {
        "name": "mkcd",
        "desc": "make directory path and cd into it",
        "usage": "mkcd <path>",
        "example": "mkcd src/controllers/auth",
        "output": [
          {
            "text": "$ mkcd src/controllers/auth",
            "kind": "cmd"
          },
          {
            "text": "✓ Created directory: src/controllers/auth",
            "kind": "out"
          },
          {
            "text": "✓ Working directory is now: ~/project/src/controllers/auth",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "navigation",
          "filesystem"
        ],
        "related": [
          "up",
          "fcd",
          "cwd"
        ]
      },
      {
        "name": "up",
        "desc": "go up N directory levels (default 1)",
        "usage": "up [n]",
        "example": "up 3",
        "output": [
          {
            "text": "$ up 3",
            "kind": "cmd"
          },
          {
            "text": "✓ Moved up 3 levels to ~/project",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "navigation"
        ],
        "related": [
          "mkcd",
          "fcd",
          "cwd"
        ]
      },
      {
        "name": "lsd",
        "desc": "ls with details, human sizes, and git status",
        "usage": "lsd [path]",
        "deps": "eza",
        "example": "lsd [path]",
        "output": [
          {
            "text": "$ lsd [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ ls with details, human sizes, and git status",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "eza"
        ],
        "related": [
          "mkcd",
          "up",
          "fcd"
        ]
      },
      {
        "name": "fcd",
        "desc": "fuzzy-select directory and cd into it",
        "usage": "fcd [path]",
        "deps": "fzf",
        "example": "fcd [path]",
        "output": [
          {
            "text": "$ fcd [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-select directory and cd into it",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "fzf"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "ftext",
        "desc": "fuzzy-search file contents and open in $EDITOR",
        "usage": "ftext [query]",
        "deps": "fzf",
        "example": "ftext [query]",
        "output": [
          {
            "text": "$ ftext [query]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-search file contents and open in $EDITOR",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "fzf"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "permsof",
        "desc": "human-readable permissions and octal mode",
        "usage": "permsof <file>",
        "example": "permsof <file>",
        "output": [
          {
            "text": "$ permsof <file>",
            "kind": "cmd"
          },
          {
            "text": "✓ human-readable permissions and octal mode",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "extract",
        "desc": "smart extractor for .tar.gz, .zip, .bz2, .7z, .rar",
        "usage": "extract <archive>",
        "example": "extract <archive>",
        "output": [
          {
            "text": "$ extract <archive>",
            "kind": "cmd"
          },
          {
            "text": "✓ smart extractor for .tar.gz, .zip, .bz2, .7z, .rar",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "compress",
        "desc": "compress files or folders to zip, tar.gz, or tar.bz2",
        "usage": "compress <type> <output> <target>",
        "example": "compress <type> <output> <target>",
        "output": [
          {
            "text": "$ compress <type> <output> <target>",
            "kind": "cmd"
          },
          {
            "text": "✓ compress files or folders to zip, tar.gz, or tar.bz2",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "duh",
        "desc": "disk usage breakdown of current directory",
        "usage": "duh [depth]",
        "example": "duh [depth]",
        "output": [
          {
            "text": "$ duh [depth]",
            "kind": "cmd"
          },
          {
            "text": "✓ disk usage breakdown of current directory",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "sizeof",
        "desc": "exact size of a file or directory in MB/GB",
        "usage": "sizeof <target>",
        "example": "sizeof <target>",
        "output": [
          {
            "text": "$ sizeof <target>",
            "kind": "cmd"
          },
          {
            "text": "✓ exact size of a file or directory in MB/GB",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "findbig",
        "desc": "find files larger than size threshold (default 100M)",
        "usage": "findbig [size] [path]",
        "example": "findbig [size] [path]",
        "output": [
          {
            "text": "$ findbig [size] [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ find files larger than size threshold (default 100M)",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "emptydirs",
        "desc": "list (and optionally prune) all empty directories",
        "usage": "emptydirs [path] [--delete]",
        "example": "emptydirs [path] [--delete]",
        "output": [
          {
            "text": "$ emptydirs [path] [--delete]",
            "kind": "cmd"
          },
          {
            "text": "✓ list (and optionally prune) all empty directories",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "dupfind",
        "desc": "find duplicate files via SHA256 checksums",
        "usage": "dupfind [path]",
        "example": "dupfind [path]",
        "output": [
          {
            "text": "$ dupfind [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ find duplicate files via SHA256 checksums",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "bak",
        "desc": "create a timestamped .bak copy of any file",
        "usage": "bak <file>",
        "example": "bak <file>",
        "output": [
          {
            "text": "$ bak <file>",
            "kind": "cmd"
          },
          {
            "text": "✓ create a timestamped .bak copy of any file",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "cwd",
        "desc": "copy current working directory path to clipboard",
        "usage": "cwd",
        "example": "cwd",
        "output": [
          {
            "text": "$ cwd",
            "kind": "cmd"
          },
          {
            "text": "✓ copy current working directory path to clipboard",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "clipcopy",
        "desc": "copy entire file contents to clipboard",
        "usage": "clipcopy <file>",
        "example": "clipcopy <file>",
        "output": [
          {
            "text": "$ clipcopy <file>",
            "kind": "cmd"
          },
          {
            "text": "✓ copy entire file contents to clipboard",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "clip",
        "desc": "pipe stdin or file directly to clipboard",
        "usage": "clip [file]",
        "example": "clip [file]",
        "output": [
          {
            "text": "$ clip [file]",
            "kind": "cmd"
          },
          {
            "text": "✓ pipe stdin or file directly to clipboard",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "watchrun",
        "desc": "run command on file changes",
        "usage": "watchrun <path> -- <cmd>",
        "deps": "entr",
        "example": "watchrun <path> -- <cmd>",
        "output": [
          {
            "text": "$ watchrun <path> -- <cmd>",
            "kind": "cmd"
          },
          {
            "text": "✓ run command on file changes",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "entr"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "treelist",
        "desc": "tree representation with optional depth limit",
        "usage": "treelist [depth] [path]",
        "deps": "eza",
        "example": "treelist [depth] [path]",
        "output": [
          {
            "text": "$ treelist [depth] [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ tree representation with optional depth limit",
            "kind": "ok"
          }
        ],
        "tags": [
          "files",
          "eza"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "recent",
        "desc": "list recently modified files",
        "usage": "recent [n]",
        "example": "recent [n]",
        "output": [
          {
            "text": "$ recent [n]",
            "kind": "cmd"
          },
          {
            "text": "✓ list recently modified files",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "swap",
        "desc": "atomically swap two filenames",
        "usage": "swap <file1> <file2>",
        "example": "swap <file1> <file2>",
        "output": [
          {
            "text": "$ swap <file1> <file2>",
            "kind": "cmd"
          },
          {
            "text": "✓ atomically swap two filenames",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      },
      {
        "name": "trash",
        "desc": "safely move files to system trash / recycle bin",
        "usage": "trash <file...>",
        "example": "trash <file...>",
        "output": [
          {
            "text": "$ trash <file...>",
            "kind": "cmd"
          },
          {
            "text": "✓ safely move files to system trash / recycle bin",
            "kind": "ok"
          }
        ],
        "tags": [
          "files"
        ],
        "related": [
          "mkcd",
          "up",
          "lsd"
        ]
      }
    ]
  },
  {
    "id": "git",
    "index": "02",
    "name": "GIT & WORKTREES",
    "sigil": "⌥",
    "blurb": "Fast committing, branch cleanup, stash pickers, conflict checks, and PR flows.",
    "tools": [
      {
        "name": "gacp",
        "desc": "stage all, commit with message, and push to origin",
        "usage": "gacp <message>",
        "example": "gacp \"feat: implement OAuth2 authorization flow\"",
        "output": [
          {
            "text": "$ gacp \"feat: implement OAuth2 authorization flow\"",
            "kind": "cmd"
          },
          {
            "text": "  staged: 6 modified files, 2 untracked",
            "kind": "out"
          },
          {
            "text": "[feat/auth e83a129] feat: implement OAuth2 authorization flow",
            "kind": "out"
          },
          {
            "text": "✓ Pushed → origin/feat/auth (0 conflicts)",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "automation",
          "ship"
        ],
        "related": [
          "gcamend",
          "gdiffstage",
          "gitundo",
          "gpr"
        ]
      },
      {
        "name": "gcamend",
        "desc": "amend last commit message without touching staged files",
        "usage": "gcamend <new-message>",
        "example": "gcamend <new-message>",
        "output": [
          {
            "text": "$ gcamend <new-message>",
            "kind": "cmd"
          },
          {
            "text": "✓ amend last commit message without touching staged files",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gdiffstage",
          "gitundo"
        ]
      },
      {
        "name": "gdiffstage",
        "desc": "inspect staged diff before committing",
        "usage": "gdiffstage",
        "example": "gdiffstage",
        "output": [
          {
            "text": "$ gdiffstage",
            "kind": "cmd"
          },
          {
            "text": "✓ inspect staged diff before committing",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gitundo"
        ]
      },
      {
        "name": "gitundo",
        "desc": "undo last commit while keeping files safely staged",
        "usage": "gitundo",
        "example": "gitundo",
        "output": [
          {
            "text": "$ gitundo",
            "kind": "cmd"
          },
          {
            "text": "✓ Soft reset HEAD~1 completed.",
            "kind": "ok"
          },
          {
            "text": "ℹ️ All 4 modified files remain staged in your index.",
            "kind": "out"
          }
        ],
        "tags": [
          "git",
          "safety",
          "undo"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gunwip"
        ]
      },
      {
        "name": "branchclean",
        "desc": "delete local branches already merged into main",
        "usage": "branchclean",
        "example": "branchclean",
        "output": [
          {
            "text": "$ branchclean",
            "kind": "cmd"
          },
          {
            "text": "✓ delete local branches already merged into main",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "branchage",
        "desc": "list local branches sorted by last commit age",
        "usage": "branchage",
        "example": "branchage",
        "output": [
          {
            "text": "$ branchage",
            "kind": "cmd"
          },
          {
            "text": "✓ list local branches sorted by last commit age",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gswitch",
        "desc": "fuzzy-pick branch to checkout (local & remote)",
        "usage": "gswitch",
        "deps": "fzf",
        "example": "gswitch",
        "output": [
          {
            "text": "$ gswitch",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick branch to checkout (local & remote)",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "fzf"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "grecentbranch",
        "desc": "fuzzy-switch to recently checked out branches",
        "usage": "grecentbranch [n]",
        "deps": "fzf",
        "example": "grecentbranch [n]",
        "output": [
          {
            "text": "$ grecentbranch [n]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-switch to recently checked out branches",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "fzf"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gstash",
        "desc": "fuzzy-search and apply/pop git stashes",
        "usage": "gstash",
        "deps": "fzf",
        "example": "gstash",
        "output": [
          {
            "text": "$ gstash",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-search and apply/pop git stashes",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "fzf"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "grebase",
        "desc": "interactive rebase last N commits",
        "usage": "grebase [n]",
        "example": "grebase [n]",
        "output": [
          {
            "text": "$ grebase [n]",
            "kind": "cmd"
          },
          {
            "text": "✓ interactive rebase last N commits",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gpr",
        "desc": "open GitHub PR creation page for current branch",
        "usage": "gpr",
        "deps": "gh",
        "example": "gpr",
        "output": [
          {
            "text": "$ gpr",
            "kind": "cmd"
          },
          {
            "text": "✓ open GitHub PR creation page for current branch",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "gh"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "greview",
        "desc": "open the last open PR for current branch in browser",
        "usage": "greview",
        "deps": "gh",
        "example": "greview",
        "output": [
          {
            "text": "$ greview",
            "kind": "cmd"
          },
          {
            "text": "✓ open the last open PR for current branch in browser",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "gh"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gopen",
        "desc": "open current repository on GitHub / GitLab in browser",
        "usage": "gopen",
        "example": "gopen",
        "output": [
          {
            "text": "$ gopen",
            "kind": "cmd"
          },
          {
            "text": "✓ open current repository on GitHub / GitLab in browser",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gclone",
        "desc": "clone repository and cd directly into directory",
        "usage": "gclone <repo-url> [dir]",
        "example": "gclone <repo-url> [dir]",
        "output": [
          {
            "text": "$ gclone <repo-url> [dir]",
            "kind": "cmd"
          },
          {
            "text": "✓ clone repository and cd directly into directory",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gwip",
        "desc": "quick work-in-progress checkpoint commit",
        "usage": "gwip",
        "example": "gwip",
        "output": [
          {
            "text": "$ gwip",
            "kind": "cmd"
          },
          {
            "text": "✓ quick work-in-progress checkpoint commit",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gunwip",
        "desc": "undo last WIP checkpoint commit",
        "usage": "gunwip",
        "example": "gunwip",
        "output": [
          {
            "text": "$ gunwip",
            "kind": "cmd"
          },
          {
            "text": "✓ undo last WIP checkpoint commit",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitprune",
        "desc": "delete local branches whose remotes were deleted",
        "usage": "gitprune",
        "example": "gitprune",
        "output": [
          {
            "text": "$ gitprune",
            "kind": "cmd"
          },
          {
            "text": "✓ delete local branches whose remotes were deleted",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "prdiff",
        "desc": "diff current branch against main/master",
        "usage": "prdiff [base]",
        "example": "prdiff [base]",
        "output": [
          {
            "text": "$ prdiff [base]",
            "kind": "cmd"
          },
          {
            "text": "✓ diff current branch against main/master",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitconflicts",
        "desc": "list all files with unresolved merge conflict markers",
        "usage": "gitconflicts",
        "example": "gitconflicts",
        "output": [
          {
            "text": "$ gitconflicts",
            "kind": "cmd"
          },
          {
            "text": "✓ list all files with unresolved merge conflict markers",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitignore",
        "desc": "fetch gitignore template from gitignore.io",
        "usage": "gitignore <language>",
        "example": "gitignore <language>",
        "output": [
          {
            "text": "$ gitignore <language>",
            "kind": "cmd"
          },
          {
            "text": "✓ fetch gitignore template from gitignore.io",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitcontributors",
        "desc": "ranked author contribution list by commit count",
        "usage": "gitcontributors",
        "example": "gitcontributors",
        "output": [
          {
            "text": "$ gitcontributors",
            "kind": "cmd"
          },
          {
            "text": "✓ ranked author contribution list by commit count",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gstats",
        "desc": "per-author commit counts and lines added/deleted",
        "usage": "gstats [--since <date>]",
        "example": "gstats [--since <date>]",
        "output": [
          {
            "text": "$ gstats [--since <date>]",
            "kind": "cmd"
          },
          {
            "text": "✓ per-author commit counts and lines added/deleted",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitsize",
        "desc": "total disk footprint of .git object database",
        "usage": "gitsize",
        "example": "gitsize",
        "output": [
          {
            "text": "$ gitsize",
            "kind": "cmd"
          },
          {
            "text": "✓ total disk footprint of .git object database",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitlog-today",
        "desc": "view all commits made today across branches",
        "usage": "gitlog-today",
        "example": "gitlog-today",
        "output": [
          {
            "text": "$ gitlog-today",
            "kind": "cmd"
          },
          {
            "text": "✓ view all commits made today across branches",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitlog-graph",
        "desc": "ASCII branch topology graph with commit hashes",
        "usage": "gitlog-graph",
        "example": "gitlog-graph",
        "output": [
          {
            "text": "$ gitlog-graph",
            "kind": "cmd"
          },
          {
            "text": "✓ ASCII branch topology graph with commit hashes",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gitbranch-rename",
        "desc": "rename current branch locally and on remote",
        "usage": "gitbranch-rename <new-name>",
        "example": "gitbranch-rename <new-name>",
        "output": [
          {
            "text": "$ gitbranch-rename <new-name>",
            "kind": "cmd"
          },
          {
            "text": "✓ rename current branch locally and on remote",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "gcleanup",
        "desc": "prune remotes, delete merged branches, tidy module",
        "usage": "gcleanup",
        "example": "gcleanup",
        "output": [
          {
            "text": "$ gcleanup",
            "kind": "cmd"
          },
          {
            "text": "✓ prune remotes, delete merged branches, tidy module",
            "kind": "ok"
          }
        ],
        "tags": [
          "git"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      },
      {
        "name": "worktree",
        "desc": "fuzzy-manage git worktrees: add, switch, or remove",
        "usage": "worktree <add|switch|remove>",
        "deps": "fzf",
        "example": "worktree <add|switch|remove>",
        "output": [
          {
            "text": "$ worktree <add|switch|remove>",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-manage git worktrees: add, switch, or remove",
            "kind": "ok"
          }
        ],
        "tags": [
          "git",
          "fzf"
        ],
        "related": [
          "gacp",
          "gcamend",
          "gdiffstage"
        ]
      }
    ]
  },
  {
    "id": "docker",
    "index": "03",
    "name": "DOCKER & CONTAINERS",
    "sigil": "⎈",
    "blurb": "Container triage, volume reclamation, healthchecks, compose helpers, and image inspection.",
    "tools": [
      {
        "name": "dockernuke",
        "desc": "stop and force-delete container by name or port",
        "usage": "dockernuke <container>",
        "example": "dockernuke api-gateway",
        "output": [
          {
            "text": "$ dockernuke api-gateway",
            "kind": "cmd"
          },
          {
            "text": "⏳ Stopping container \"api-gateway\"...",
            "kind": "out"
          },
          {
            "text": "⏳ Removing container and associated anonymous mounts...",
            "kind": "out"
          },
          {
            "text": "✓ Container api-gateway deleted. Ports and memory reclaimed.",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker",
          "cleanup",
          "containers"
        ],
        "related": [
          "dclean",
          "dockerclean-images",
          "dsh",
          "dhealth"
        ]
      },
      {
        "name": "dockerclean-images",
        "desc": "remove dangling & untagged images",
        "usage": "dockerclean-images",
        "example": "dockerclean-images",
        "output": [
          {
            "text": "$ dockerclean-images",
            "kind": "cmd"
          },
          {
            "text": "✓ remove dangling & untagged images",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dclean",
          "dockerlogs"
        ]
      },
      {
        "name": "dclean",
        "desc": "deep-clean unused containers, networks, and build cache",
        "usage": "dclean",
        "example": "dclean",
        "output": [
          {
            "text": "$ dclean",
            "kind": "cmd"
          },
          {
            "text": "✓ deep-clean unused containers, networks, and build cache",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dockerlogs"
        ]
      },
      {
        "name": "dockerlogs",
        "desc": "tail container logs with timestamps and color",
        "usage": "dockerlogs <container> [lines]",
        "example": "dockerlogs <container> [lines]",
        "output": [
          {
            "text": "$ dockerlogs <container> [lines]",
            "kind": "cmd"
          },
          {
            "text": "✓ tail container logs with timestamps and color",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dsh",
        "desc": "fuzzy-pick running container and open interactive shell",
        "usage": "dsh [container]",
        "deps": "fzf",
        "example": "dsh [container]",
        "output": [
          {
            "text": "$ dsh [container]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick running container and open interactive shell",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker",
          "fzf"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dimages",
        "desc": "fuzzy-pick a local image to run, inspect, or delete",
        "usage": "dimages",
        "deps": "fzf",
        "example": "dimages",
        "output": [
          {
            "text": "$ dimages",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick a local image to run, inspect, or delete",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker",
          "fzf"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dockersizes",
        "desc": "list Docker images sorted by disk size",
        "usage": "dockersizes",
        "example": "dockersizes",
        "output": [
          {
            "text": "$ dockersizes",
            "kind": "cmd"
          },
          {
            "text": "✓ list Docker images sorted by disk size",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dvols",
        "desc": "human-readable sizes of local Docker volumes",
        "usage": "dvols",
        "example": "dvols",
        "output": [
          {
            "text": "$ dvols",
            "kind": "cmd"
          },
          {
            "text": "✓ human-readable sizes of local Docker volumes",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dports",
        "desc": "show published port mappings for all running containers",
        "usage": "dports",
        "example": "dports",
        "output": [
          {
            "text": "$ dports",
            "kind": "cmd"
          },
          {
            "text": "✓ show published port mappings for all running containers",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dstats",
        "desc": "one-shot resource usage snapshot for all running containers",
        "usage": "dstats",
        "example": "dstats",
        "output": [
          {
            "text": "$ dstats",
            "kind": "cmd"
          },
          {
            "text": "✓ one-shot resource usage snapshot for all running containers",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dhealth",
        "desc": "show health status of all containers with healthchecks",
        "usage": "dhealth",
        "example": "dhealth",
        "output": [
          {
            "text": "$ dhealth",
            "kind": "cmd"
          },
          {
            "text": "✓ show health status of all containers with healthchecks",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dcup",
        "desc": "bring up docker-compose services in the background",
        "usage": "dcup",
        "example": "dcup",
        "output": [
          {
            "text": "$ dcup",
            "kind": "cmd"
          },
          {
            "text": "✓ bring up docker-compose services in the background",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dcdown",
        "desc": "tear down docker-compose services",
        "usage": "dcdown",
        "example": "dcdown",
        "output": [
          {
            "text": "$ dcdown",
            "kind": "cmd"
          },
          {
            "text": "✓ tear down docker-compose services",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "dbuild",
        "desc": "build image tagging with current directory name",
        "usage": "dbuild [tag]",
        "example": "dbuild [tag]",
        "output": [
          {
            "text": "$ dbuild [tag]",
            "kind": "cmd"
          },
          {
            "text": "✓ build image tagging with current directory name",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      },
      {
        "name": "denv",
        "desc": "dump all environment variables of a running container",
        "usage": "denv <container>",
        "example": "denv <container>",
        "output": [
          {
            "text": "$ denv <container>",
            "kind": "cmd"
          },
          {
            "text": "✓ dump all environment variables of a running container",
            "kind": "ok"
          }
        ],
        "tags": [
          "docker"
        ],
        "related": [
          "dockernuke",
          "dockerclean-images",
          "dclean"
        ]
      }
    ]
  },
  {
    "id": "k8s",
    "index": "04",
    "name": "KUBERNETES",
    "sigil": "☸",
    "blurb": "Context switching, pod shell execution, rollouts, scaling, and secret decoding.",
    "tools": [
      {
        "name": "k8sctx",
        "desc": "fuzzy-switch cluster context and namespace",
        "usage": "k8sctx",
        "deps": "fzf",
        "example": "k8sctx",
        "output": [
          {
            "text": "$ k8sctx",
            "kind": "cmd"
          },
          {
            "text": "✓ Switched to context: gke_prod_us-central1",
            "kind": "ok"
          },
          {
            "text": "✓ Default namespace: billing-service",
            "kind": "out"
          }
        ],
        "tags": [
          "k8s",
          "fzf",
          "context",
          "cluster"
        ],
        "related": [
          "kns",
          "klogs",
          "kexec",
          "ktop"
        ]
      },
      {
        "name": "kns",
        "desc": "set current namespace without changing context",
        "usage": "kns <namespace>",
        "example": "kns <namespace>",
        "output": [
          {
            "text": "$ kns <namespace>",
            "kind": "cmd"
          },
          {
            "text": "✓ set current namespace without changing context",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s"
        ],
        "related": [
          "k8sctx",
          "klogs",
          "kexec"
        ]
      },
      {
        "name": "klogs",
        "desc": "fuzzy-pick pod and stream live logs",
        "usage": "klogs [pod]",
        "deps": "fzf",
        "example": "klogs [pod]",
        "output": [
          {
            "text": "$ klogs [pod]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick pod and stream live logs",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "kexec"
        ]
      },
      {
        "name": "kexec",
        "desc": "fuzzy-pick pod and launch interactive sh/bash",
        "usage": "kexec [pod]",
        "deps": "fzf",
        "example": "kexec [pod]",
        "output": [
          {
            "text": "$ kexec [pod]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick pod and launch interactive sh/bash",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kdesc",
        "desc": "fuzzy-pick and describe a pod",
        "usage": "kdesc [pod]",
        "deps": "fzf",
        "example": "kdesc [pod]",
        "output": [
          {
            "text": "$ kdesc [pod]",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick and describe a pod",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "ktop",
        "desc": "show pods sorted by CPU or memory usage",
        "usage": "ktop [cpu|memory]",
        "example": "ktop [cpu|memory]",
        "output": [
          {
            "text": "$ ktop [cpu|memory]",
            "kind": "cmd"
          },
          {
            "text": "✓ show pods sorted by CPU or memory usage",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kevents",
        "desc": "stream recent namespace events sorted by timestamp",
        "usage": "kevents [namespace]",
        "example": "kevents [namespace]",
        "output": [
          {
            "text": "$ kevents [namespace]",
            "kind": "cmd"
          },
          {
            "text": "✓ stream recent namespace events sorted by timestamp",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kport",
        "desc": "port-forward from localhost to selected pod",
        "usage": "kport <local-port> <pod> <remote-port>",
        "example": "kport <local-port> <pod> <remote-port>",
        "output": [
          {
            "text": "$ kport <local-port> <pod> <remote-port>",
            "kind": "cmd"
          },
          {
            "text": "✓ port-forward from localhost to selected pod",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "krestart",
        "desc": "rollout-restart a picked deployment",
        "usage": "krestart",
        "deps": "fzf",
        "example": "krestart",
        "output": [
          {
            "text": "$ krestart",
            "kind": "cmd"
          },
          {
            "text": "✓ rollout-restart a picked deployment",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kscale",
        "desc": "scale a picked deployment to a given replica count",
        "usage": "kscale <replicas>",
        "deps": "fzf",
        "example": "kscale <replicas>",
        "output": [
          {
            "text": "$ kscale <replicas>",
            "kind": "cmd"
          },
          {
            "text": "✓ scale a picked deployment to a given replica count",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kdel",
        "desc": "force-delete a picked (possibly stuck) pod",
        "usage": "kdel",
        "deps": "fzf",
        "example": "kdel",
        "output": [
          {
            "text": "$ kdel",
            "kind": "cmd"
          },
          {
            "text": "✓ force-delete a picked (possibly stuck) pod",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "ksecret",
        "desc": "decode and print the data of a picked secret",
        "usage": "ksecret",
        "deps": "fzf",
        "example": "ksecret",
        "output": [
          {
            "text": "$ ksecret",
            "kind": "cmd"
          },
          {
            "text": "✓ decode and print the data of a picked secret",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "kcp",
        "desc": "copy a file to/from a picked pod",
        "usage": "kcp <local-path> <pod-path>",
        "deps": "fzf",
        "example": "kcp <local-path> <pod-path>",
        "output": [
          {
            "text": "$ kcp <local-path> <pod-path>",
            "kind": "cmd"
          },
          {
            "text": "✓ copy a file to/from a picked pod",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      },
      {
        "name": "dbforward",
        "desc": "port-forward to a picked k8s DB service with connect hint",
        "usage": "dbforward <local-port> <remote-port>",
        "deps": "fzf",
        "example": "dbforward <local-port> <remote-port>",
        "output": [
          {
            "text": "$ dbforward <local-port> <remote-port>",
            "kind": "cmd"
          },
          {
            "text": "✓ port-forward to a picked k8s DB service with connect hint",
            "kind": "ok"
          }
        ],
        "tags": [
          "k8s",
          "fzf"
        ],
        "related": [
          "k8sctx",
          "kns",
          "klogs"
        ]
      }
    ]
  },
  {
    "id": "vite",
    "index": "05",
    "name": "VITE & REACT",
    "sigil": "⚡",
    "blurb": "Fast Vite+React scaffolding, component generator, dev server, and build checks.",
    "tools": [
      {
        "name": "mkvite",
        "desc": "scaffold a Vite+React app (create, strip boilerplate, install, git init)",
        "usage": "mkvite <app-name> [template]",
        "example": "mkvite client-portal react-ts",
        "output": [
          {
            "text": "$ mkvite client-portal react-ts",
            "kind": "cmd"
          },
          {
            "text": "✓ Initialized Vite 6 + React + TypeScript in ./client-portal",
            "kind": "out"
          },
          {
            "text": "✓ Stripped starter bloat & boilerplate",
            "kind": "out"
          },
          {
            "text": "✓ Initialized git repository with .gitignore",
            "kind": "ok"
          },
          {
            "text": "🚀 Ready: cd client-portal && vitedev",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite",
          "react",
          "frontend",
          "scaffold"
        ],
        "related": [
          "vitedev",
          "vitebuild",
          "reactcomp",
          "mkviteapi"
        ]
      },
      {
        "name": "vitedev",
        "desc": "start the Vite dev server and open the browser",
        "usage": "vitedev",
        "example": "vitedev",
        "output": [
          {
            "text": "$ vitedev",
            "kind": "cmd"
          },
          {
            "text": "✓ start the Vite dev server and open the browser",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitebuild",
          "viteclean"
        ]
      },
      {
        "name": "vitebuild",
        "desc": "production build with dist bundle size breakdown",
        "usage": "vitebuild",
        "example": "vitebuild",
        "output": [
          {
            "text": "$ vitebuild",
            "kind": "cmd"
          },
          {
            "text": "✓ production build with dist bundle size breakdown",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "viteclean"
        ]
      },
      {
        "name": "viteclean",
        "desc": "wipe node_modules/dist/lockfile and reinstall clean",
        "usage": "viteclean",
        "example": "viteclean",
        "output": [
          {
            "text": "$ viteclean",
            "kind": "cmd"
          },
          {
            "text": "✓ wipe node_modules/dist/lockfile and reinstall clean",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "vitebuild"
        ]
      },
      {
        "name": "reactcomp",
        "desc": "scaffold a React component with barrel export (TS-aware)",
        "usage": "reactcomp <ComponentName> [dir]",
        "example": "reactcomp <ComponentName> [dir]",
        "output": [
          {
            "text": "$ reactcomp <ComponentName> [dir]",
            "kind": "cmd"
          },
          {
            "text": "✓ scaffold a React component with barrel export (TS-aware)",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "vitebuild"
        ]
      },
      {
        "name": "viteenv",
        "desc": "copy .env.example -> .env if .env does not exist",
        "usage": "viteenv",
        "example": "viteenv",
        "output": [
          {
            "text": "$ viteenv",
            "kind": "cmd"
          },
          {
            "text": "✓ copy .env.example -> .env if .env does not exist",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "vitebuild"
        ]
      },
      {
        "name": "vitelint",
        "desc": "run ESLint + Prettier check + TypeScript typecheck in one pass",
        "usage": "vitelint [--fix]",
        "example": "vitelint [--fix]",
        "output": [
          {
            "text": "$ vitelint [--fix]",
            "kind": "cmd"
          },
          {
            "text": "✓ run ESLint + Prettier check + TypeScript typecheck in one pass",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "vitebuild"
        ]
      },
      {
        "name": "mkviteapi",
        "desc": "scaffold a companion Express or Fastify API folder",
        "usage": "mkviteapi [name] [--fastify]",
        "example": "mkviteapi [name] [--fastify]",
        "output": [
          {
            "text": "$ mkviteapi [name] [--fastify]",
            "kind": "cmd"
          },
          {
            "text": "✓ scaffold a companion Express or Fastify API folder",
            "kind": "ok"
          }
        ],
        "tags": [
          "vite"
        ],
        "related": [
          "mkvite",
          "vitedev",
          "vitebuild"
        ]
      }
    ]
  },
  {
    "id": "go",
    "index": "06",
    "name": "GO DEVELOPMENT",
    "sigil": "◈",
    "blurb": "Module tidying, benchmark loops, cross-compilation, test runners, and vulnerability auditing.",
    "tools": [
      {
        "name": "goclean",
        "desc": "run gofmt, go vet, and go mod tidy in one pass",
        "usage": "goclean",
        "example": "goclean",
        "output": [
          {
            "text": "$ goclean",
            "kind": "cmd"
          },
          {
            "text": "✓ run gofmt, go vet, and go mod tidy in one pass",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "gobuild",
          "goxbuild",
          "goupdate"
        ]
      },
      {
        "name": "gobuild",
        "desc": "build a Go binary (output name defaults to directory name)",
        "usage": "gobuild [output]",
        "example": "gobuild [output]",
        "output": [
          {
            "text": "$ gobuild [output]",
            "kind": "cmd"
          },
          {
            "text": "✓ build a Go binary (output name defaults to directory name)",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "goxbuild",
          "goupdate"
        ]
      },
      {
        "name": "goxbuild",
        "desc": "cross-compile a Go binary for a target OS and architecture",
        "usage": "goxbuild <GOOS> <GOARCH> [output]",
        "example": "goxbuild <GOOS> <GOARCH> [output]",
        "output": [
          {
            "text": "$ goxbuild <GOOS> <GOARCH> [output]",
            "kind": "cmd"
          },
          {
            "text": "✓ cross-compile a Go binary for a target OS and architecture",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goupdate"
        ]
      },
      {
        "name": "goupdate",
        "desc": "upgrade all direct and indirect dependencies to latest",
        "usage": "goupdate",
        "example": "goupdate",
        "output": [
          {
            "text": "$ goupdate",
            "kind": "cmd"
          },
          {
            "text": "✓ upgrade all direct and indirect dependencies to latest",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gotest",
        "desc": "run go test -v with clean formatting",
        "usage": "gotest [./...]",
        "example": "gotest [./...]",
        "output": [
          {
            "text": "$ gotest [./...]",
            "kind": "cmd"
          },
          {
            "text": "✓ run go test -v with clean formatting",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gorace",
        "desc": "run tests with the race detector enabled",
        "usage": "gorace [./...]",
        "example": "gorace [./...]",
        "output": [
          {
            "text": "$ gorace [./...]",
            "kind": "cmd"
          },
          {
            "text": "✓ run tests with the race detector enabled",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gobench",
        "desc": "run Go benchmarks with memory allocation metrics",
        "usage": "gobench [bench-regex]",
        "example": "gobench [bench-regex]",
        "output": [
          {
            "text": "$ gobench [bench-regex]",
            "kind": "cmd"
          },
          {
            "text": "✓ run Go benchmarks with memory allocation metrics",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "covreport",
        "desc": "generate and open interactive HTML test coverage report",
        "usage": "covreport",
        "example": "covreport",
        "output": [
          {
            "text": "$ covreport",
            "kind": "cmd"
          },
          {
            "text": "✓ generate and open interactive HTML test coverage report",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gocover-func",
        "desc": "show coverage percentage per function",
        "usage": "gocover-func",
        "example": "gocover-func",
        "output": [
          {
            "text": "$ gocover-func",
            "kind": "cmd"
          },
          {
            "text": "✓ show coverage percentage per function",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gonew",
        "desc": "scaffold minimal Go project with starter main.go",
        "usage": "gonew <module-name>",
        "example": "gonew <module-name>",
        "output": [
          {
            "text": "$ gonew <module-name>",
            "kind": "cmd"
          },
          {
            "text": "✓ scaffold minimal Go project with starter main.go",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gomodwhy",
        "desc": "explain why a dependency is required by the module graph",
        "usage": "gomodwhy <package>",
        "example": "gomodwhy <package>",
        "output": [
          {
            "text": "$ gomodwhy <package>",
            "kind": "cmd"
          },
          {
            "text": "✓ explain why a dependency is required by the module graph",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gomod-name",
        "desc": "print the module name from go.mod",
        "usage": "gomod-name",
        "example": "gomod-name",
        "output": [
          {
            "text": "$ gomod-name",
            "kind": "cmd"
          },
          {
            "text": "✓ print the module name from go.mod",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "gowatch",
        "desc": "re-run Go test suite whenever any .go file changes",
        "usage": "gowatch",
        "deps": "entr",
        "example": "gowatch",
        "output": [
          {
            "text": "$ gowatch",
            "kind": "cmd"
          },
          {
            "text": "✓ re-run Go test suite whenever any .go file changes",
            "kind": "ok"
          }
        ],
        "tags": [
          "go",
          "entr"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "goenv",
        "desc": "show all Go environment variables in aligned table",
        "usage": "goenv",
        "example": "goenv",
        "output": [
          {
            "text": "$ goenv",
            "kind": "cmd"
          },
          {
            "text": "✓ show all Go environment variables in aligned table",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "golist",
        "desc": "list all packages in the current module",
        "usage": "golist",
        "example": "golist",
        "output": [
          {
            "text": "$ golist",
            "kind": "cmd"
          },
          {
            "text": "✓ list all packages in the current module",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "goversion",
        "desc": "Go version and key paths (GOROOT, GOPATH, GOMODCACHE)",
        "usage": "goversion",
        "example": "goversion",
        "output": [
          {
            "text": "$ goversion",
            "kind": "cmd"
          },
          {
            "text": "✓ Go version and key paths (GOROOT, GOPATH, GOMODCACHE)",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "govscan",
        "desc": "scan dependencies for known vulnerabilities via govulncheck",
        "usage": "govscan",
        "example": "govscan",
        "output": [
          {
            "text": "$ govscan",
            "kind": "cmd"
          },
          {
            "text": "✓ scan dependencies for known vulnerabilities via govulncheck",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      },
      {
        "name": "goimpl",
        "desc": "show go doc for a type or interface implementation",
        "usage": "goimpl <TypeName>",
        "example": "goimpl <TypeName>",
        "output": [
          {
            "text": "$ goimpl <TypeName>",
            "kind": "cmd"
          },
          {
            "text": "✓ show go doc for a type or interface implementation",
            "kind": "ok"
          }
        ],
        "tags": [
          "go"
        ],
        "related": [
          "goclean",
          "gobuild",
          "goxbuild"
        ]
      }
    ]
  },
  {
    "id": "node",
    "index": "07",
    "name": "NODE / NPM",
    "sigil": "⬢",
    "blurb": "Deep cleanups, package size breakdowns, nvm switcher, audit runs, and repl setup.",
    "tools": [
      {
        "name": "npmclean",
        "desc": "delete node_modules + lockfile and clean install",
        "usage": "npmclean",
        "example": "npmclean",
        "output": [
          {
            "text": "$ npmclean",
            "kind": "cmd"
          },
          {
            "text": "✓ delete node_modules + lockfile and clean install",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmscripts",
          "npmoutdated",
          "npmsize"
        ]
      },
      {
        "name": "npmscripts",
        "desc": "list all runnable scripts from package.json with keys",
        "usage": "npmscripts",
        "example": "npmscripts",
        "output": [
          {
            "text": "$ npmscripts",
            "kind": "cmd"
          },
          {
            "text": "✓ list all runnable scripts from package.json with keys",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmoutdated",
          "npmsize"
        ]
      },
      {
        "name": "npmoutdated",
        "desc": "show outdated dependencies in current project",
        "usage": "npmoutdated",
        "example": "npmoutdated",
        "output": [
          {
            "text": "$ npmoutdated",
            "kind": "cmd"
          },
          {
            "text": "✓ show outdated dependencies in current project",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmsize"
        ]
      },
      {
        "name": "npmsize",
        "desc": "calculate total disk usage of node_modules directory",
        "usage": "npmsize",
        "example": "npmsize",
        "output": [
          {
            "text": "$ npmsize",
            "kind": "cmd"
          },
          {
            "text": "✓ calculate total disk usage of node_modules directory",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "nodeversion",
        "desc": "print active Node.js, npm, yarn, and pnpm versions",
        "usage": "nodeversion",
        "example": "nodeversion",
        "output": [
          {
            "text": "$ nodeversion",
            "kind": "cmd"
          },
          {
            "text": "✓ print active Node.js, npm, yarn, and pnpm versions",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "nvmuse",
        "desc": "switch Node.js version via nvm or fnm",
        "usage": "nvmuse <version>",
        "example": "nvmuse <version>",
        "output": [
          {
            "text": "$ nvmuse <version>",
            "kind": "cmd"
          },
          {
            "text": "✓ switch Node.js version via nvm or fnm",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "tscheck",
        "desc": "run TypeScript typecheck without emitting files",
        "usage": "tscheck",
        "example": "tscheck",
        "output": [
          {
            "text": "$ tscheck",
            "kind": "cmd"
          },
          {
            "text": "✓ run TypeScript typecheck without emitting files",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npxrun",
        "desc": "run a package with npx without interactive prompt",
        "usage": "npxrun <package> [args...]",
        "example": "npxrun <package> [args...]",
        "output": [
          {
            "text": "$ npxrun <package> [args...]",
            "kind": "cmd"
          },
          {
            "text": "✓ run a package with npx without interactive prompt",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npmglobal",
        "desc": "list globally installed npm packages with depth 0",
        "usage": "npmglobal",
        "example": "npmglobal",
        "output": [
          {
            "text": "$ npmglobal",
            "kind": "cmd"
          },
          {
            "text": "✓ list globally installed npm packages with depth 0",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npmlink",
        "desc": "link this package globally or into a target project",
        "usage": "npmlink [target-dir]",
        "example": "npmlink [target-dir]",
        "output": [
          {
            "text": "$ npmlink [target-dir]",
            "kind": "cmd"
          },
          {
            "text": "✓ link this package globally or into a target project",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "noderepl",
        "desc": "Node.js REPL with project node_modules on NODE_PATH",
        "usage": "noderepl",
        "example": "noderepl",
        "output": [
          {
            "text": "$ noderepl",
            "kind": "cmd"
          },
          {
            "text": "✓ Node.js REPL with project node_modules on NODE_PATH",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npmaudit",
        "desc": "run npm audit with clean summary",
        "usage": "npmaudit",
        "example": "npmaudit",
        "output": [
          {
            "text": "$ npmaudit",
            "kind": "cmd"
          },
          {
            "text": "✓ run npm audit with clean summary",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "nodeinfo",
        "desc": "summary of the current Node project (name, scripts, deps)",
        "usage": "nodeinfo",
        "example": "nodeinfo",
        "output": [
          {
            "text": "$ nodeinfo",
            "kind": "cmd"
          },
          {
            "text": "✓ summary of the current Node project (name, scripts, deps)",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npmdedup",
        "desc": "deduplicate and flatten the npm dependency tree",
        "usage": "npmdedup",
        "example": "npmdedup",
        "output": [
          {
            "text": "$ npmdedup",
            "kind": "cmd"
          },
          {
            "text": "✓ deduplicate and flatten the npm dependency tree",
            "kind": "ok"
          }
        ],
        "tags": [
          "node"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      },
      {
        "name": "npmwatch",
        "desc": "watch files and re-run an npm script on change",
        "usage": "npmwatch [script]",
        "deps": "entr",
        "example": "npmwatch [script]",
        "output": [
          {
            "text": "$ npmwatch [script]",
            "kind": "cmd"
          },
          {
            "text": "✓ watch files and re-run an npm script on change",
            "kind": "ok"
          }
        ],
        "tags": [
          "node",
          "entr"
        ],
        "related": [
          "npmclean",
          "npmscripts",
          "npmoutdated"
        ]
      }
    ]
  },
  {
    "id": "python",
    "index": "08",
    "name": "PYTHON",
    "sigil": "🐍",
    "blurb": "Virtualenv management, bytecode cleanup, requirements syncing, and test profiling.",
    "tools": [
      {
        "name": "venvcreate",
        "desc": "create and activate a ./venv virtual environment",
        "usage": "venvcreate",
        "example": "venvcreate",
        "output": [
          {
            "text": "$ venvcreate",
            "kind": "cmd"
          },
          {
            "text": "✓ create and activate a ./venv virtual environment",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "pyvenv",
          "pyclean",
          "pyfreeze"
        ]
      },
      {
        "name": "pyvenv",
        "desc": "create .venv and activate it (uses uv if available)",
        "usage": "pyvenv",
        "example": "pyvenv",
        "output": [
          {
            "text": "$ pyvenv",
            "kind": "cmd"
          },
          {
            "text": "✓ create .venv and activate it (uses uv if available)",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyclean",
          "pyfreeze"
        ]
      },
      {
        "name": "pyclean",
        "desc": "remove all __pycache__ directories, .pyc, and .pytest_cache",
        "usage": "pyclean",
        "example": "pyclean",
        "output": [
          {
            "text": "$ pyclean",
            "kind": "cmd"
          },
          {
            "text": "✓ remove all __pycache__ directories, .pyc, and .pytest_cache",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyfreeze"
        ]
      },
      {
        "name": "pyfreeze",
        "desc": "dump sorted pip freeze directly to requirements.txt",
        "usage": "pyfreeze",
        "example": "pyfreeze",
        "output": [
          {
            "text": "$ pyfreeze",
            "kind": "cmd"
          },
          {
            "text": "✓ dump sorted pip freeze directly to requirements.txt",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pipinstall",
        "desc": "install packages from requirements.txt with uv / pip",
        "usage": "pipinstall",
        "example": "pipinstall",
        "output": [
          {
            "text": "$ pipinstall",
            "kind": "cmd"
          },
          {
            "text": "✓ install packages from requirements.txt with uv / pip",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pyversion",
        "desc": "Python/pip versions and active venv path",
        "usage": "pyversion",
        "example": "pyversion",
        "output": [
          {
            "text": "$ pyversion",
            "kind": "cmd"
          },
          {
            "text": "✓ Python/pip versions and active venv path",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pycheck",
        "desc": "lint with ruff/flake8 and type-check with mypy",
        "usage": "pycheck [path]",
        "example": "pycheck [path]",
        "output": [
          {
            "text": "$ pycheck [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ lint with ruff/flake8 and type-check with mypy",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pytest-run",
        "desc": "run pytest with verbose output and duration rankings",
        "usage": "pytest-run [args...]",
        "example": "pytest-run [args...]",
        "output": [
          {
            "text": "$ pytest-run [args...]",
            "kind": "cmd"
          },
          {
            "text": "✓ run pytest with verbose output and duration rankings",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pywatch",
        "desc": "watch .py files and re-run pytest on change",
        "usage": "pywatch [test-path]",
        "deps": "entr",
        "example": "pywatch [test-path]",
        "output": [
          {
            "text": "$ pywatch [test-path]",
            "kind": "cmd"
          },
          {
            "text": "✓ watch .py files and re-run pytest on change",
            "kind": "ok"
          }
        ],
        "tags": [
          "python",
          "entr"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pydeps",
        "desc": "list all installed pip packages in a compact table",
        "usage": "pydeps",
        "example": "pydeps",
        "output": [
          {
            "text": "$ pydeps",
            "kind": "cmd"
          },
          {
            "text": "✓ list all installed pip packages in a compact table",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pyupgrade",
        "desc": "upgrade all packages from requirements.txt to latest",
        "usage": "pyupgrade",
        "example": "pyupgrade",
        "output": [
          {
            "text": "$ pyupgrade",
            "kind": "cmd"
          },
          {
            "text": "✓ upgrade all packages from requirements.txt to latest",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pyrequirements-diff",
        "desc": "diff pip freeze output against requirements.txt",
        "usage": "pyrequirements-diff",
        "example": "pyrequirements-diff",
        "output": [
          {
            "text": "$ pyrequirements-diff",
            "kind": "cmd"
          },
          {
            "text": "✓ diff pip freeze output against requirements.txt",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pyrun",
        "desc": "run a Python script using the active venv interpreter",
        "usage": "pyrun <script.py> [args...]",
        "example": "pyrun <script.py> [args...]",
        "output": [
          {
            "text": "$ pyrun <script.py> [args...]",
            "kind": "cmd"
          },
          {
            "text": "✓ run a Python script using the active venv interpreter",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      },
      {
        "name": "pyprofile",
        "desc": "profile a script with cProfile, print top hotspots",
        "usage": "pyprofile <script.py> [args...]",
        "example": "pyprofile <script.py> [args...]",
        "output": [
          {
            "text": "$ pyprofile <script.py> [args...]",
            "kind": "cmd"
          },
          {
            "text": "✓ profile a script with cProfile, print top hotspots",
            "kind": "ok"
          }
        ],
        "tags": [
          "python"
        ],
        "related": [
          "venvcreate",
          "pyvenv",
          "pyclean"
        ]
      }
    ]
  },
  {
    "id": "languages",
    "index": "09",
    "name": "JAVA, MAVEN & RUBY",
    "sigil": "☕",
    "blurb": "Java SDK switcher, Maven/Gradle cache inspection, Ruby gem cleanup, and RSpec helpers.",
    "tools": [
      {
        "name": "m2size",
        "desc": "report size of the local Maven repository cache",
        "usage": "m2size",
        "example": "m2size",
        "output": [
          {
            "text": "$ m2size",
            "kind": "cmd"
          },
          {
            "text": "✓ report size of the local Maven repository cache",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "gradlesize",
          "jarinfo",
          "javaver"
        ]
      },
      {
        "name": "gradlesize",
        "desc": "report size of the local Gradle cache",
        "usage": "gradlesize",
        "example": "gradlesize",
        "output": [
          {
            "text": "$ gradlesize",
            "kind": "cmd"
          },
          {
            "text": "✓ report size of the local Gradle cache",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "jarinfo",
          "javaver"
        ]
      },
      {
        "name": "jarinfo",
        "desc": "inspect a JAR manifest and top-level contents",
        "usage": "jarinfo <path-to-jar>",
        "example": "jarinfo <path-to-jar>",
        "output": [
          {
            "text": "$ jarinfo <path-to-jar>",
            "kind": "cmd"
          },
          {
            "text": "✓ inspect a JAR manifest and top-level contents",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "javaver"
        ]
      },
      {
        "name": "javaver",
        "desc": "fuzzy-pick and switch JAVA_HOME (jenv/sdkman aware)",
        "usage": "javaver",
        "deps": "fzf",
        "example": "javaver",
        "output": [
          {
            "text": "$ javaver",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick and switch JAVA_HOME (jenv/sdkman aware)",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages",
          "fzf"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      },
      {
        "name": "mvntree",
        "desc": "print the Maven dependency tree for the current project",
        "usage": "mvntree",
        "example": "mvntree",
        "output": [
          {
            "text": "$ mvntree",
            "kind": "cmd"
          },
          {
            "text": "✓ print the Maven dependency tree for the current project",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      },
      {
        "name": "gemclean",
        "desc": "uninstall old/duplicate gem versions, keeping only latest",
        "usage": "gemclean",
        "example": "gemclean",
        "output": [
          {
            "text": "$ gemclean",
            "kind": "cmd"
          },
          {
            "text": "✓ uninstall old/duplicate gem versions, keeping only latest",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      },
      {
        "name": "rbver",
        "desc": "fuzzy-pick and switch the active Ruby version",
        "usage": "rbver",
        "deps": "fzf",
        "example": "rbver",
        "output": [
          {
            "text": "$ rbver",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick and switch the active Ruby version",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages",
          "fzf"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      },
      {
        "name": "rboutdated",
        "desc": "list outdated gems from the current Gemfile.lock",
        "usage": "rboutdated",
        "example": "rboutdated",
        "output": [
          {
            "text": "$ rboutdated",
            "kind": "cmd"
          },
          {
            "text": "✓ list outdated gems from the current Gemfile.lock",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      },
      {
        "name": "rspecf",
        "desc": "re-run only the last-failed RSpec examples",
        "usage": "rspecf [args...]",
        "example": "rspecf [args...]",
        "output": [
          {
            "text": "$ rspecf [args...]",
            "kind": "cmd"
          },
          {
            "text": "✓ re-run only the last-failed RSpec examples",
            "kind": "ok"
          }
        ],
        "tags": [
          "languages"
        ],
        "related": [
          "m2size",
          "gradlesize",
          "jarinfo"
        ]
      }
    ]
  },
  {
    "id": "databases",
    "index": "10",
    "name": "DATABASES",
    "sigil": "🗄️",
    "blurb": "Instant interactive clients for Postgres, MySQL, Redis, and timestamped backups.",
    "tools": [
      {
        "name": "pgc",
        "desc": "connect to Postgres using PG* env vars (or defaults)",
        "usage": "pgc",
        "example": "pgc",
        "output": [
          {
            "text": "$ pgc",
            "kind": "cmd"
          },
          {
            "text": "Connecting to Postgres via $PGHOST:$PGPORT/$PGDATABASE...",
            "kind": "out"
          },
          {
            "text": "psql (16.2, server 16.2)",
            "kind": "out"
          },
          {
            "text": "postgres=#",
            "kind": "ok"
          }
        ],
        "tags": [
          "databases",
          "database",
          "postgres",
          "sql"
        ],
        "related": [
          "pgdump",
          "myc",
          "redisc",
          "dbforward"
        ]
      },
      {
        "name": "myc",
        "desc": "connect to MySQL using MYSQL_* env vars (or defaults)",
        "usage": "myc",
        "example": "myc",
        "output": [
          {
            "text": "$ myc",
            "kind": "cmd"
          },
          {
            "text": "✓ connect to MySQL using MYSQL_* env vars (or defaults)",
            "kind": "ok"
          }
        ],
        "tags": [
          "databases"
        ],
        "related": [
          "pgc",
          "redisc",
          "pgdump"
        ]
      },
      {
        "name": "redisc",
        "desc": "connect to Redis using REDIS_* env vars",
        "usage": "redisc",
        "example": "redisc",
        "output": [
          {
            "text": "$ redisc",
            "kind": "cmd"
          },
          {
            "text": "✓ connect to Redis using REDIS_* env vars",
            "kind": "ok"
          }
        ],
        "tags": [
          "databases"
        ],
        "related": [
          "pgc",
          "myc",
          "pgdump"
        ]
      },
      {
        "name": "pgdump",
        "desc": "dump the current Postgres database to a timestamped .sql file",
        "usage": "pgdump <database>",
        "example": "pgdump <database>",
        "output": [
          {
            "text": "$ pgdump <database>",
            "kind": "cmd"
          },
          {
            "text": "✓ dump the current Postgres database to a timestamped .sql file",
            "kind": "ok"
          }
        ],
        "tags": [
          "databases"
        ],
        "related": [
          "pgc",
          "myc",
          "redisc"
        ]
      }
    ]
  },
  {
    "id": "net",
    "index": "11",
    "name": "NETWORKING & APIS",
    "sigil": "◎",
    "blurb": "Port squatters, cert expiry, DNS queries, HTTP latency breakdowns, mock servers, and tunnels.",
    "tools": [
      {
        "name": "killport",
        "desc": "find process listening on port and terminate it",
        "usage": "killport <port> [port...]",
        "example": "killport 3000 8080",
        "output": [
          {
            "text": "$ killport 3000 8080",
            "kind": "cmd"
          },
          {
            "text": "🔄 Found process (PID: 41288) on port 3000",
            "kind": "out"
          },
          {
            "text": "⏳ Terminating process 41288...",
            "kind": "out"
          },
          {
            "text": "✅ Port 3000 is now free.",
            "kind": "ok"
          },
          {
            "text": "ℹ️ Port 8080 is not in use.",
            "kind": "out"
          }
        ],
        "tags": [
          "net",
          "network",
          "triage",
          "process"
        ],
        "related": [
          "portwho",
          "openports",
          "ports",
          "tcpcheck"
        ]
      },
      {
        "name": "portwho",
        "desc": "show process name and PID listening on a port",
        "usage": "portwho <port>",
        "example": "portwho <port>",
        "output": [
          {
            "text": "$ portwho <port>",
            "kind": "cmd"
          },
          {
            "text": "✓ show process name and PID listening on a port",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "openports",
          "portscan"
        ]
      },
      {
        "name": "openports",
        "desc": "listening ports flagged by network exposure (0.0.0.0 / ::)",
        "usage": "openports",
        "example": "openports",
        "output": [
          {
            "text": "$ openports",
            "kind": "cmd"
          },
          {
            "text": "✓ listening ports flagged by network exposure (0.0.0.0 / ::)",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "portscan"
        ]
      },
      {
        "name": "portscan",
        "desc": "scan a TCP port range using socket /dev/tcp (no nmap needed)",
        "usage": "portscan <host> <start> [end]",
        "example": "portscan <host> <start> [end]",
        "output": [
          {
            "text": "$ portscan <host> <start> [end]",
            "kind": "cmd"
          },
          {
            "text": "✓ scan a TCP port range using socket /dev/tcp (no nmap needed)",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "certcheck",
        "desc": "TLS certificate expiry date and days remaining for domain",
        "usage": "certcheck <domain>",
        "example": "certcheck sharmory.dev",
        "output": [
          {
            "text": "$ certcheck sharmory.dev",
            "kind": "cmd"
          },
          {
            "text": "Issuer: Let's Encrypt Authority X3",
            "kind": "out"
          },
          {
            "text": "Expires: Nov 02 14:22:10 2026 GMT",
            "kind": "out"
          },
          {
            "text": "✓ 76 days remaining (STATUS: HEALTHY)",
            "kind": "ok"
          }
        ],
        "tags": [
          "net",
          "security",
          "tls",
          "certificate"
        ],
        "related": [
          "tlscheck",
          "dnscheck",
          "httpstatus",
          "apihit"
        ]
      },
      {
        "name": "tlscheck",
        "desc": "full TLS certificate chain info, cipher suite, and SANs",
        "usage": "tlscheck <domain>",
        "example": "tlscheck <domain>",
        "output": [
          {
            "text": "$ tlscheck <domain>",
            "kind": "cmd"
          },
          {
            "text": "✓ full TLS certificate chain info, cipher suite, and SANs",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "dnscheck",
        "desc": "lookup A, AAAA, CNAME, and MX DNS records for domain",
        "usage": "dnscheck <domain>",
        "example": "dnscheck <domain>",
        "output": [
          {
            "text": "$ dnscheck <domain>",
            "kind": "cmd"
          },
          {
            "text": "✓ lookup A, AAAA, CNAME, and MX DNS records for domain",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "myip",
        "desc": "display your public-facing IP address",
        "usage": "myip",
        "example": "myip",
        "output": [
          {
            "text": "$ myip",
            "kind": "cmd"
          },
          {
            "text": "✓ display your public-facing IP address",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "localip",
        "desc": "display your local LAN IP address",
        "usage": "localip",
        "example": "localip",
        "output": [
          {
            "text": "$ localip",
            "kind": "cmd"
          },
          {
            "text": "✓ display your local LAN IP address",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "ipinfo",
        "desc": "IP geolocation, ASN, org, and timezone via ipinfo.io",
        "usage": "ipinfo [ip]",
        "example": "ipinfo 8.8.8.8",
        "output": [
          {
            "text": "$ ipinfo 8.8.8.8",
            "kind": "cmd"
          },
          {
            "text": "IP:      8.8.8.8",
            "kind": "out"
          },
          {
            "text": "Org:     AS15169 Google LLC",
            "kind": "out"
          },
          {
            "text": "City:    Mountain View, California, US",
            "kind": "out"
          },
          {
            "text": "Timezone: America/Los_Angeles",
            "kind": "out"
          }
        ],
        "tags": [
          "net",
          "network",
          "geo",
          "recon"
        ],
        "related": [
          "myip",
          "localip",
          "dnscheck"
        ]
      },
      {
        "name": "httpstatus",
        "desc": "fetch HTTP response status code for URL",
        "usage": "httpstatus <url>",
        "example": "httpstatus <url>",
        "output": [
          {
            "text": "$ httpstatus <url>",
            "kind": "cmd"
          },
          {
            "text": "✓ fetch HTTP response status code for URL",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "apihit",
        "desc": "GET URL with formatted JSON output and latency timing",
        "usage": "apihit <url>",
        "example": "apihit https://api.github.com/zen",
        "output": [
          {
            "text": "$ apihit https://api.github.com/zen",
            "kind": "cmd"
          },
          {
            "text": "HTTP/2 200 OK (84ms)",
            "kind": "out"
          },
          {
            "text": "\"Practicality beats purity.\"",
            "kind": "ok"
          }
        ],
        "tags": [
          "net",
          "network",
          "http",
          "api"
        ],
        "related": [
          "apiwatch",
          "apidiff",
          "curltime",
          "httpstatus"
        ]
      },
      {
        "name": "headers",
        "desc": "show full HTTP response headers for a URL",
        "usage": "headers <url>",
        "example": "headers <url>",
        "output": [
          {
            "text": "$ headers <url>",
            "kind": "cmd"
          },
          {
            "text": "✓ show full HTTP response headers for a URL",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "curltime",
        "desc": "detailed HTTP timing: DNS / TCP / TLS / TTFB / total",
        "usage": "curltime <url>",
        "example": "curltime <url>",
        "output": [
          {
            "text": "$ curltime <url>",
            "kind": "cmd"
          },
          {
            "text": "✓ detailed HTTP timing: DNS / TCP / TLS / TTFB / total",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "apiwatch",
        "desc": "poll an endpoint; log HTTP status + response time each hit",
        "usage": "apiwatch <url> [interval-seconds]",
        "example": "apiwatch <url> [interval-seconds]",
        "output": [
          {
            "text": "$ apiwatch <url> [interval-seconds]",
            "kind": "cmd"
          },
          {
            "text": "✓ poll an endpoint; log HTTP status + response time each hit",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "apimock",
        "desc": "spin up a local mock REST API server from a JSON file",
        "usage": "apimock <file.json> [port]",
        "example": "apimock <file.json> [port]",
        "output": [
          {
            "text": "$ apimock <file.json> [port]",
            "kind": "cmd"
          },
          {
            "text": "✓ spin up a local mock REST API server from a JSON file",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "apidiff",
        "desc": "diff two JSON API responses (URLs or local files)",
        "usage": "apidiff <a> <b>",
        "deps": "jq",
        "example": "apidiff <a> <b>",
        "output": [
          {
            "text": "$ apidiff <a> <b>",
            "kind": "cmd"
          },
          {
            "text": "✓ diff two JSON API responses (URLs or local files)",
            "kind": "ok"
          }
        ],
        "tags": [
          "net",
          "jq"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "openapipp",
        "desc": "validate and lint an OpenAPI/Swagger spec with Redocly",
        "usage": "openapipp <spec-file>",
        "example": "openapipp <spec-file>",
        "output": [
          {
            "text": "$ openapipp <spec-file>",
            "kind": "cmd"
          },
          {
            "text": "✓ validate and lint an OpenAPI/Swagger spec with Redocly",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "tunnel",
        "desc": "open a quick ngrok tunnel to a local port",
        "usage": "tunnel <port>",
        "example": "tunnel <port>",
        "output": [
          {
            "text": "$ tunnel <port>",
            "kind": "cmd"
          },
          {
            "text": "✓ open a quick ngrok tunnel to a local port",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "flushdns",
        "desc": "flush local operating system DNS resolver cache",
        "usage": "flushdns",
        "example": "flushdns",
        "output": [
          {
            "text": "$ flushdns",
            "kind": "cmd"
          },
          {
            "text": "✓ flush local operating system DNS resolver cache",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "tcpcheck",
        "desc": "verify TCP port reachability on remote host",
        "usage": "tcpcheck <host> <port>",
        "example": "tcpcheck <host> <port>",
        "output": [
          {
            "text": "$ tcpcheck <host> <port>",
            "kind": "cmd"
          },
          {
            "text": "✓ verify TCP port reachability on remote host",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "pingcheck",
        "desc": "send 5 pings to host with latency summary",
        "usage": "pingcheck <host>",
        "example": "pingcheck <host>",
        "output": [
          {
            "text": "$ pingcheck <host>",
            "kind": "cmd"
          },
          {
            "text": "✓ send 5 pings to host with latency summary",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "weather",
        "desc": "terminal weather forecast for city via wttr.in",
        "usage": "weather [city]",
        "example": "weather [city]",
        "output": [
          {
            "text": "$ weather [city]",
            "kind": "cmd"
          },
          {
            "text": "✓ terminal weather forecast for city via wttr.in",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "shorten",
        "desc": "create shortened URL using is.gd service",
        "usage": "shorten <url>",
        "example": "shorten <url>",
        "output": [
          {
            "text": "$ shorten <url>",
            "kind": "cmd"
          },
          {
            "text": "✓ create shortened URL using is.gd service",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "sshconfig",
        "desc": "list all configured Host entries in ~/.ssh/config",
        "usage": "sshconfig",
        "example": "sshconfig",
        "output": [
          {
            "text": "$ sshconfig",
            "kind": "cmd"
          },
          {
            "text": "✓ list all configured Host entries in ~/.ssh/config",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      },
      {
        "name": "proxy",
        "desc": "toggle http_proxy / https_proxy environment variables",
        "usage": "proxy <on [host:port]|off|status>",
        "example": "proxy <on [host:port]|off|status>",
        "output": [
          {
            "text": "$ proxy <on [host:port]|off|status>",
            "kind": "cmd"
          },
          {
            "text": "✓ toggle http_proxy / https_proxy environment variables",
            "kind": "ok"
          }
        ],
        "tags": [
          "net"
        ],
        "related": [
          "killport",
          "portwho",
          "openports"
        ]
      }
    ]
  },
  {
    "id": "security",
    "index": "12",
    "name": "SECURITY & ENCODING",
    "sigil": "🔒",
    "blurb": "Password generators, SSH keys, Base64/URL en/decoding, JWT inspection, and checksums.",
    "tools": [
      {
        "name": "passgen",
        "desc": "generate cryptographically random password (default 24 chars)",
        "usage": "passgen [length]",
        "example": "passgen [length]",
        "output": [
          {
            "text": "$ passgen [length]",
            "kind": "cmd"
          },
          {
            "text": "✓ generate cryptographically random password (default 24 chars)",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "pubkey",
          "genssh",
          "b64e"
        ]
      },
      {
        "name": "pubkey",
        "desc": "display contents of your SSH public keys (~/.ssh/*.pub)",
        "usage": "pubkey",
        "example": "pubkey",
        "output": [
          {
            "text": "$ pubkey",
            "kind": "cmd"
          },
          {
            "text": "✓ display contents of your SSH public keys (~/.ssh/*.pub)",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "genssh",
          "b64e"
        ]
      },
      {
        "name": "genssh",
        "desc": "generate a new ed25519 SSH keypair",
        "usage": "genssh <key-name> [email]",
        "example": "genssh <key-name> [email]",
        "output": [
          {
            "text": "$ genssh <key-name> [email]",
            "kind": "cmd"
          },
          {
            "text": "✓ generate a new ed25519 SSH keypair",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "b64e"
        ]
      },
      {
        "name": "b64e",
        "desc": "encode input string to base64",
        "usage": "b64e <text>",
        "example": "b64e \"api-key:sec_91823901\"",
        "output": [
          {
            "text": "$ b64e \"api-key:sec_91823901\"",
            "kind": "cmd"
          },
          {
            "text": "YXBpLWtleTpzZWNfOTE4MjM5MDE=",
            "kind": "ok"
          }
        ],
        "tags": [
          "security",
          "encoding",
          "base64"
        ],
        "related": [
          "b64d",
          "urlencode",
          "jwtdecode",
          "hashfile"
        ]
      },
      {
        "name": "b64d",
        "desc": "decode base64 string to plaintext",
        "usage": "b64d <base64-string>",
        "example": "b64d <base64-string>",
        "output": [
          {
            "text": "$ b64d <base64-string>",
            "kind": "cmd"
          },
          {
            "text": "✓ decode base64 string to plaintext",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "urlencode",
        "desc": "percent-encode text for URL queries",
        "usage": "urlencode <text>",
        "example": "urlencode <text>",
        "output": [
          {
            "text": "$ urlencode <text>",
            "kind": "cmd"
          },
          {
            "text": "✓ percent-encode text for URL queries",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "urldecode",
        "desc": "decode percent-encoded URL string",
        "usage": "urldecode <text>",
        "example": "urldecode <text>",
        "output": [
          {
            "text": "$ urldecode <text>",
            "kind": "cmd"
          },
          {
            "text": "✓ decode percent-encoded URL string",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "hashfile",
        "desc": "compute MD5, SHA1, and SHA256 checksums of file",
        "usage": "hashfile <file>",
        "example": "hashfile <file>",
        "output": [
          {
            "text": "$ hashfile <file>",
            "kind": "cmd"
          },
          {
            "text": "✓ compute MD5, SHA1, and SHA256 checksums of file",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "genuuid",
        "desc": "generate a random UUID v4",
        "usage": "genuuid",
        "example": "genuuid",
        "output": [
          {
            "text": "$ genuuid",
            "kind": "cmd"
          },
          {
            "text": "✓ generate a random UUID v4",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "jwtdecode",
        "desc": "decode JWT payload and header without secret validation",
        "usage": "jwtdecode <jwt-token>",
        "deps": "jq",
        "example": "jwtdecode <jwt-token>",
        "output": [
          {
            "text": "$ jwtdecode <jwt-token>",
            "kind": "cmd"
          },
          {
            "text": "✓ decode JWT payload and header without secret validation",
            "kind": "ok"
          }
        ],
        "tags": [
          "security",
          "jq"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "dotenv-check",
        "desc": "lint .env for duplicate keys, empty values, and unquoted secrets",
        "usage": "dotenv-check [file]",
        "example": "dotenv-check [file]",
        "output": [
          {
            "text": "$ dotenv-check [file]",
            "kind": "cmd"
          },
          {
            "text": "✓ lint .env for duplicate keys, empty values, and unquoted secrets",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      },
      {
        "name": "licensegen",
        "desc": "generate a LICENSE file (MIT or Apache 2.0)",
        "usage": "licensegen <mit|apache2> [author] [year]",
        "example": "licensegen <mit|apache2> [author] [year]",
        "output": [
          {
            "text": "$ licensegen <mit|apache2> [author] [year]",
            "kind": "cmd"
          },
          {
            "text": "✓ generate a LICENSE file (MIT or Apache 2.0)",
            "kind": "ok"
          }
        ],
        "tags": [
          "security"
        ],
        "related": [
          "passgen",
          "pubkey",
          "genssh"
        ]
      }
    ]
  },
  {
    "id": "system",
    "index": "13",
    "name": "SYSTEM & CRON",
    "sigil": "⚙",
    "blurb": "Processes, memory monitors, timers, listening ports, and crontab management.",
    "tools": [
      {
        "name": "mem",
        "desc": "current physical memory usage",
        "usage": "mem",
        "example": "mem",
        "output": [
          {
            "text": "$ mem",
            "kind": "cmd"
          },
          {
            "text": "✓ current physical memory usage",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "cpu",
          "cpuwatch",
          "memwatch"
        ]
      },
      {
        "name": "cpu",
        "desc": "snapshot of CPU / process activity",
        "usage": "cpu",
        "example": "cpu",
        "output": [
          {
            "text": "$ cpu",
            "kind": "cmd"
          },
          {
            "text": "✓ snapshot of CPU / process activity",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpuwatch",
          "memwatch"
        ]
      },
      {
        "name": "cpuwatch",
        "desc": "live CPU load monitor, refreshes every second",
        "usage": "cpuwatch [interval-seconds]",
        "example": "cpuwatch [interval-seconds]",
        "output": [
          {
            "text": "$ cpuwatch [interval-seconds]",
            "kind": "cmd"
          },
          {
            "text": "✓ live CPU load monitor, refreshes every second",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "memwatch"
        ]
      },
      {
        "name": "memwatch",
        "desc": "live memory usage monitor, refreshes every second",
        "usage": "memwatch [interval-seconds]",
        "example": "memwatch [interval-seconds]",
        "output": [
          {
            "text": "$ memwatch [interval-seconds]",
            "kind": "cmd"
          },
          {
            "text": "✓ live memory usage monitor, refreshes every second",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "sysinfo",
        "desc": "one-screen OS, CPU, RAM, disk, uptime summary",
        "usage": "sysinfo",
        "example": "sysinfo",
        "output": [
          {
            "text": "$ sysinfo",
            "kind": "cmd"
          },
          {
            "text": "✓ one-screen OS, CPU, RAM, disk, uptime summary",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "pidtree",
        "desc": "process tree for a PID",
        "usage": "pidtree <pid>",
        "example": "pidtree <pid>",
        "output": [
          {
            "text": "$ pidtree <pid>",
            "kind": "cmd"
          },
          {
            "text": "✓ process tree for a PID",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "fkill",
        "desc": "fuzzy-pick a process and kill it",
        "usage": "fkill",
        "deps": "fzf",
        "example": "fkill",
        "output": [
          {
            "text": "$ fkill",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick a process and kill it",
            "kind": "ok"
          }
        ],
        "tags": [
          "system",
          "fzf"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "now",
        "desc": "current date and time (YYYY-MM-DD HH:MM:SS)",
        "usage": "now",
        "example": "now",
        "output": [
          {
            "text": "$ now",
            "kind": "cmd"
          },
          {
            "text": "✓ current date and time (YYYY-MM-DD HH:MM:SS)",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "timer",
        "desc": "countdown with terminal audio/bell",
        "usage": "timer <seconds> [label]",
        "example": "timer <seconds> [label]",
        "output": [
          {
            "text": "$ timer <seconds> [label]",
            "kind": "cmd"
          },
          {
            "text": "✓ countdown with terminal audio/bell",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "diskusage",
        "desc": "interactive disk usage via ncdu or df/du",
        "usage": "diskusage [path]",
        "deps": "ncdu",
        "example": "diskusage [path]",
        "output": [
          {
            "text": "$ diskusage [path]",
            "kind": "cmd"
          },
          {
            "text": "✓ interactive disk usage via ncdu or df/du",
            "kind": "ok"
          }
        ],
        "tags": [
          "system",
          "ncdu"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "envdiff",
        "desc": "diff two .env files by key=value pairs",
        "usage": "envdiff <file1> <file2>",
        "example": "envdiff <file1> <file2>",
        "output": [
          {
            "text": "$ envdiff <file1> <file2>",
            "kind": "cmd"
          },
          {
            "text": "✓ diff two .env files by key=value pairs",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "ports",
        "desc": "list listening TCP/UDP ports with PID/process",
        "usage": "ports",
        "example": "ports",
        "output": [
          {
            "text": "$ ports",
            "kind": "cmd"
          },
          {
            "text": "✓ list listening TCP/UDP ports with PID/process",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "cronlist",
        "desc": "list (numbered) crontab entries",
        "usage": "cronlist",
        "example": "cronlist",
        "output": [
          {
            "text": "$ cronlist",
            "kind": "cmd"
          },
          {
            "text": "✓ list (numbered) crontab entries",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "cronadd",
        "desc": "append a new cron job with schedule validation",
        "usage": "cronadd \"<schedule>\" \"<command>\"",
        "example": "cronadd \"0 3 * * *\" \"sharmory-update\"",
        "output": [
          {
            "text": "$ cronadd \"0 3 * * *\" \"sharmory-update\"",
            "kind": "cmd"
          },
          {
            "text": "✓ Validated cron expression: 0 3 * * * (At 03:00 AM every day)",
            "kind": "out"
          },
          {
            "text": "✓ Successfully appended job #4 to crontab",
            "kind": "ok"
          }
        ],
        "tags": [
          "system",
          "cron",
          "automation",
          "scheduler"
        ],
        "related": [
          "cronlist",
          "cronrm",
          "cronhuman",
          "cronnext"
        ]
      },
      {
        "name": "cronrm",
        "desc": "fuzzy-pick and remove a cron job",
        "usage": "cronrm",
        "deps": "fzf",
        "example": "cronrm",
        "output": [
          {
            "text": "$ cronrm",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-pick and remove a cron job",
            "kind": "ok"
          }
        ],
        "tags": [
          "system",
          "fzf"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "cronedit",
        "desc": "open the crontab in $EDITOR",
        "usage": "cronedit",
        "example": "cronedit",
        "output": [
          {
            "text": "$ cronedit",
            "kind": "cmd"
          },
          {
            "text": "✓ open the crontab in $EDITOR",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      },
      {
        "name": "cronhuman",
        "desc": "translate a 5-field cron expression to plain English",
        "usage": "cronhuman \"<min> <hour> <dom> <month> <dow>\"",
        "example": "cronhuman \"*/15 9-17 * * 1-5\"",
        "output": [
          {
            "text": "$ cronhuman \"*/15 9-17 * * 1-5\"",
            "kind": "cmd"
          },
          {
            "text": "📅 Plain English: \"Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday\"",
            "kind": "ok"
          }
        ],
        "tags": [
          "system",
          "cron",
          "translation"
        ],
        "related": [
          "cronnext",
          "cronlist",
          "cronadd"
        ]
      },
      {
        "name": "cronnext",
        "desc": "show the next N scheduled run times for an expression",
        "usage": "cronnext \"<schedule>\" [count]",
        "example": "cronnext \"<schedule>\" [count]",
        "output": [
          {
            "text": "$ cronnext \"<schedule>\" [count]",
            "kind": "cmd"
          },
          {
            "text": "✓ show the next N scheduled run times for an expression",
            "kind": "ok"
          }
        ],
        "tags": [
          "system"
        ],
        "related": [
          "mem",
          "cpu",
          "cpuwatch"
        ]
      }
    ]
  },
  {
    "id": "env",
    "index": "14",
    "name": "ENVIRONMENTS & SECRETS",
    "sigil": "🔑",
    "blurb": "Profile switching, .env generation, CI assertion requirements, and value masking.",
    "tools": [
      {
        "name": "envload",
        "desc": "load variables from a .env-style file into current shell",
        "usage": "envload [file]",
        "example": "envload [file]",
        "output": [
          {
            "text": "$ envload [file]",
            "kind": "cmd"
          },
          {
            "text": "✓ load variables from a .env-style file into current shell",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envswitch",
          "envgen",
          "envrequire"
        ]
      },
      {
        "name": "envswitch",
        "desc": "load a named env profile from ~/.sharmory/envprofiles/",
        "usage": "envswitch [profile-name]",
        "example": "envswitch [profile-name]",
        "output": [
          {
            "text": "$ envswitch [profile-name]",
            "kind": "cmd"
          },
          {
            "text": "✓ load a named env profile from ~/.sharmory/envprofiles/",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envload",
          "envgen",
          "envrequire"
        ]
      },
      {
        "name": "envgen",
        "desc": "generate a .env.example from .env — keeps keys, strips values",
        "usage": "envgen [src] [out]",
        "example": "envgen [src] [out]",
        "output": [
          {
            "text": "$ envgen [src] [out]",
            "kind": "cmd"
          },
          {
            "text": "✓ generate a .env.example from .env — keeps keys, strips values",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envload",
          "envswitch",
          "envrequire"
        ]
      },
      {
        "name": "envrequire",
        "desc": "assert required env vars exist (fails CI if missing)",
        "usage": "envrequire VAR1 VAR2 ...",
        "example": "envrequire VAR1 VAR2 ...",
        "output": [
          {
            "text": "$ envrequire VAR1 VAR2 ...",
            "kind": "cmd"
          },
          {
            "text": "✓ assert required env vars exist (fails CI if missing)",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envload",
          "envswitch",
          "envgen"
        ]
      },
      {
        "name": "envexport",
        "desc": "print export KEY=\"value\" lines from a .env file",
        "usage": "envexport [file]",
        "example": "envexport [file]",
        "output": [
          {
            "text": "$ envexport [file]",
            "kind": "cmd"
          },
          {
            "text": "✓ print export KEY=\"value\" lines from a .env file",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envload",
          "envswitch",
          "envgen"
        ]
      },
      {
        "name": "envmask",
        "desc": "print a .env file with secret-looking values partially masked",
        "usage": "envmask [file]",
        "example": "envmask [file]",
        "output": [
          {
            "text": "$ envmask [file]",
            "kind": "cmd"
          },
          {
            "text": "✓ print a .env file with secret-looking values partially masked",
            "kind": "ok"
          }
        ],
        "tags": [
          "env"
        ],
        "related": [
          "envload",
          "envswitch",
          "envgen"
        ]
      },
      {
        "name": "envsync",
        "desc": "compare .env vs .env.example and report keys missing from either side",
        "usage": "envsync [env] [example]",
        "example": "envsync .env .env.example",
        "output": [
          {
            "text": "$ envsync .env .env.example",
            "kind": "cmd"
          },
          {
            "text": "✓ Checking key parity between .env and .env.example...",
            "kind": "out"
          },
          {
            "text": "⚠️ Missing in .env.example: STRIPE_WEBHOOK_SECRET",
            "kind": "warn"
          },
          {
            "text": "⚠️ Missing in .env: DATABASE_REPLICA_URL",
            "kind": "warn"
          }
        ],
        "tags": [
          "env",
          "secrets",
          "sync"
        ],
        "related": [
          "envgen",
          "envrequire",
          "envload",
          "envmask"
        ]
      }
    ]
  },
  {
    "id": "prod",
    "index": "15",
    "name": "PRODUCTIVITY & WORKFLOW",
    "sigil": "⚡",
    "blurb": "Notes, todos, history search, JSON diffing, command benchmarks, local HTTP server, and retries.",
    "tools": [
      {
        "name": "note",
        "desc": "append a timestamped line to ~/notes; subcommands: today, list, search",
        "usage": "note <text|today|list|search <text>>",
        "example": "note <text|today|list|search <text>>",
        "output": [
          {
            "text": "$ note <text|today|list|search <text>>",
            "kind": "cmd"
          },
          {
            "text": "✓ append a timestamped line to ~/notes; subcommands: today, list, search",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "todo",
          "todogrep",
          "hist"
        ]
      },
      {
        "name": "todo",
        "desc": "append or list entries in ~/todo.md; mark done with todo done <pattern>",
        "usage": "todo [text]",
        "example": "todo [text]",
        "output": [
          {
            "text": "$ todo [text]",
            "kind": "cmd"
          },
          {
            "text": "✓ append or list entries in ~/todo.md; mark done with todo done <pattern>",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todogrep",
          "hist"
        ]
      },
      {
        "name": "todogrep",
        "desc": "find TODO/FIXME/HACK/XXX comments across the codebase",
        "usage": "todogrep [dir]",
        "example": "todogrep [dir]",
        "output": [
          {
            "text": "$ todogrep [dir]",
            "kind": "cmd"
          },
          {
            "text": "✓ find TODO/FIXME/HACK/XXX comments across the codebase",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "hist"
        ]
      },
      {
        "name": "hist",
        "desc": "fuzzy-search shell history and paste selection",
        "usage": "hist",
        "deps": "fzf",
        "example": "hist",
        "output": [
          {
            "text": "$ hist",
            "kind": "cmd"
          },
          {
            "text": "✓ fuzzy-search shell history and paste selection",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod",
          "fzf"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "mkproject",
        "desc": "scaffold Go, Node, or Python project with git",
        "usage": "mkproject <name> [go|node|python]",
        "example": "mkproject <name> [go|node|python]",
        "output": [
          {
            "text": "$ mkproject <name> [go|node|python]",
            "kind": "cmd"
          },
          {
            "text": "✓ scaffold Go, Node, or Python project with git",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "mktemplate",
        "desc": "create a new project from a custom template in ~/.sharmory/templates/",
        "usage": "mktemplate <template> <project>",
        "example": "mktemplate <template> <project>",
        "output": [
          {
            "text": "$ mktemplate <template> <project>",
            "kind": "cmd"
          },
          {
            "text": "✓ create a new project from a custom template in ~/.sharmory/templates/",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "ffind",
        "desc": "find files by name or search file contents for text",
        "usage": "ffind <text> | ffind -f <filename>",
        "example": "ffind <text> | ffind -f <filename>",
        "output": [
          {
            "text": "$ ffind <text> | ffind -f <filename>",
            "kind": "cmd"
          },
          {
            "text": "✓ find files by name or search file contents for text",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "cheat",
        "desc": "interactive cheatsheet lookup via tldr or man",
        "usage": "cheat <command>",
        "deps": "tldr",
        "example": "cheat <command>",
        "output": [
          {
            "text": "$ cheat <command>",
            "kind": "cmd"
          },
          {
            "text": "✓ interactive cheatsheet lookup via tldr or man",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod",
          "tldr"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "calc",
        "desc": "quick arithmetic expression evaluator in terminal",
        "usage": "calc <expression>",
        "example": "calc <expression>",
        "output": [
          {
            "text": "$ calc <expression>",
            "kind": "cmd"
          },
          {
            "text": "✓ quick arithmetic expression evaluator in terminal",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "qr",
        "desc": "generate ASCII QR code directly in terminal",
        "usage": "qr <text-or-url>",
        "example": "qr <text-or-url>",
        "output": [
          {
            "text": "$ qr <text-or-url>",
            "kind": "cmd"
          },
          {
            "text": "✓ generate ASCII QR code directly in terminal",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "jsonpp",
        "desc": "pretty-print raw JSON file with indentation and colors",
        "usage": "jsonpp <file.json>",
        "deps": "jq",
        "example": "jsonpp <file.json>",
        "output": [
          {
            "text": "$ jsonpp <file.json>",
            "kind": "cmd"
          },
          {
            "text": "✓ pretty-print raw JSON file with indentation and colors",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod",
          "jq"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "diffjson",
        "desc": "semantic diff of two JSON files (normalized with jq)",
        "usage": "diffjson <file1.json> <file2.json>",
        "deps": "jq",
        "example": "diffjson <file1.json> <file2.json>",
        "output": [
          {
            "text": "$ diffjson <file1.json> <file2.json>",
            "kind": "cmd"
          },
          {
            "text": "✓ semantic diff of two JSON files (normalized with jq)",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod",
          "jq"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "diffdir",
        "desc": "recursively diff two directories",
        "usage": "diffdir <dir-a> <dir-b>",
        "example": "diffdir <dir-a> <dir-b>",
        "output": [
          {
            "text": "$ diffdir <dir-a> <dir-b>",
            "kind": "cmd"
          },
          {
            "text": "✓ recursively diff two directories",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "epoch",
        "desc": "convert between Unix epoch and human date",
        "usage": "epoch [epoch|date]",
        "example": "epoch [epoch|date]",
        "output": [
          {
            "text": "$ epoch [epoch|date]",
            "kind": "cmd"
          },
          {
            "text": "✓ convert between Unix epoch and human date",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "retry",
        "desc": "retry command N times with exponential backoff",
        "usage": "retry <max-attempts> <cmd...>",
        "example": "retry <max-attempts> <cmd...>",
        "output": [
          {
            "text": "$ retry <max-attempts> <cmd...>",
            "kind": "cmd"
          },
          {
            "text": "✓ retry command N times with exponential backoff",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "basec",
        "desc": "convert a number between hex, decimal, octal, and binary",
        "usage": "basec <number>",
        "example": "basec <number>",
        "output": [
          {
            "text": "$ basec <number>",
            "kind": "cmd"
          },
          {
            "text": "✓ convert a number between hex, decimal, octal, and binary",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "colorconv",
        "desc": "convert hex color to RGB or RGB to hex",
        "usage": "colorconv <#rrggbb> | colorconv <r> <g> <b>",
        "example": "colorconv <#rrggbb> | colorconv <r> <g> <b>",
        "output": [
          {
            "text": "$ colorconv <#rrggbb> | colorconv <r> <g> <b>",
            "kind": "cmd"
          },
          {
            "text": "✓ convert hex color to RGB or RGB to hex",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "bench",
        "desc": "time N runs of a command and report min/max/avg",
        "usage": "bench <runs> <command...>",
        "example": "bench <runs> <command...>",
        "output": [
          {
            "text": "$ bench <runs> <command...>",
            "kind": "cmd"
          },
          {
            "text": "✓ time N runs of a command and report min/max/avg",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "openat",
        "desc": "open $EDITOR at a specific file and line",
        "usage": "openat <file>[:<line>]",
        "example": "openat <file>[:<line>]",
        "output": [
          {
            "text": "$ openat <file>[:<line>]",
            "kind": "cmd"
          },
          {
            "text": "✓ open $EDITOR at a specific file and line",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "serve",
        "desc": "serve the current directory over HTTP",
        "usage": "serve [port]",
        "example": "serve [port]",
        "output": [
          {
            "text": "$ serve [port]",
            "kind": "cmd"
          },
          {
            "text": "✓ serve the current directory over HTTP",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "speed",
        "desc": "internet speed test (speedtest-cli, fast, or curl fallback)",
        "usage": "speed",
        "example": "speed",
        "output": [
          {
            "text": "$ speed",
            "kind": "cmd"
          },
          {
            "text": "✓ internet speed test (speedtest-cli, fast, or curl fallback)",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "sshcopy",
        "desc": "copy your SSH public key to a remote host authorized_keys",
        "usage": "sshcopy <user@host> [identity-file]",
        "example": "sshcopy <user@host> [identity-file]",
        "output": [
          {
            "text": "$ sshcopy <user@host> [identity-file]",
            "kind": "cmd"
          },
          {
            "text": "✓ copy your SSH public key to a remote host authorized_keys",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      },
      {
        "name": "alias-list",
        "desc": "list user-defined aliases in a clean aligned table",
        "usage": "alias-list [pattern]",
        "example": "alias-list [pattern]",
        "output": [
          {
            "text": "$ alias-list [pattern]",
            "kind": "cmd"
          },
          {
            "text": "✓ list user-defined aliases in a clean aligned table",
            "kind": "ok"
          }
        ],
        "tags": [
          "prod"
        ],
        "related": [
          "note",
          "todo",
          "todogrep"
        ]
      }
    ]
  },
  {
    "id": "jenkins",
    "index": "16",
    "name": "CI / JENKINS",
    "sigil": "🏗️",
    "blurb": "Trigger builds, fetch crumb tokens, tail console logs, and inspect job status.",
    "tools": [
      {
        "name": "jenk-crumb",
        "desc": "fetch CSRF crumb for authenticated Jenkins API requests",
        "usage": "jenk-crumb",
        "example": "jenk-crumb",
        "output": [
          {
            "text": "$ jenk-crumb",
            "kind": "cmd"
          },
          {
            "text": "✓ fetch CSRF crumb for authenticated Jenkins API requests",
            "kind": "ok"
          }
        ],
        "tags": [
          "jenkins"
        ],
        "related": [
          "jenk-build",
          "jenk-logs",
          "jenk-jobs"
        ]
      },
      {
        "name": "jenk-build",
        "desc": "trigger parameterized Jenkins build for a job",
        "usage": "jenk-build <job-name>",
        "example": "jenk-build <job-name>",
        "output": [
          {
            "text": "$ jenk-build <job-name>",
            "kind": "cmd"
          },
          {
            "text": "✓ trigger parameterized Jenkins build for a job",
            "kind": "ok"
          }
        ],
        "tags": [
          "jenkins"
        ],
        "related": [
          "jenk-crumb",
          "jenk-logs",
          "jenk-jobs"
        ]
      },
      {
        "name": "jenk-logs",
        "desc": "stream live console output of last build for a job",
        "usage": "jenk-logs <job-name>",
        "example": "jenk-logs <job-name>",
        "output": [
          {
            "text": "$ jenk-logs <job-name>",
            "kind": "cmd"
          },
          {
            "text": "✓ stream live console output of last build for a job",
            "kind": "ok"
          }
        ],
        "tags": [
          "jenkins"
        ],
        "related": [
          "jenk-crumb",
          "jenk-build",
          "jenk-jobs"
        ]
      },
      {
        "name": "jenk-jobs",
        "desc": "list all accessible job names on configured Jenkins server",
        "usage": "jenk-jobs",
        "example": "jenk-jobs",
        "output": [
          {
            "text": "$ jenk-jobs",
            "kind": "cmd"
          },
          {
            "text": "✓ list all accessible job names on configured Jenkins server",
            "kind": "ok"
          }
        ],
        "tags": [
          "jenkins"
        ],
        "related": [
          "jenk-crumb",
          "jenk-build",
          "jenk-logs"
        ]
      }
    ]
  },
  {
    "id": "meta",
    "index": "17",
    "name": "Sharmory ⚔️",
    "sigil": "🛡️",
    "blurb": "Interactive HUD, catalog browser, health doctor, tool installer, and benchmarks.",
    "tools": [
      {
        "name": "sharmory",
        "desc": "interactive HUD catalog (fuzzy-search if fzf is present)",
        "usage": "sharmory",
        "example": "sharmory",
        "output": [
          {
            "text": "$ sharmory",
            "kind": "cmd"
          },
          {
            "text": "✓ interactive HUD catalog (fuzzy-search if fzf is present)",
            "kind": "ok"
          }
        ],
        "tags": [
          "meta"
        ],
        "related": [
          "sharmory-doctor",
          "sharmory-setup",
          "sharmory-bench"
        ]
      },
      {
        "name": "sharmory-doctor",
        "desc": "verify active shell environment and optional tool status",
        "usage": "sharmory doctor",
        "example": "sharmory doctor",
        "output": [
          {
            "text": "$ sharmory doctor",
            "kind": "cmd"
          },
          {
            "text": "✓ verify active shell environment and optional tool status",
            "kind": "ok"
          }
        ],
        "tags": [
          "meta"
        ],
        "related": [
          "sharmory",
          "sharmory-setup",
          "sharmory-bench"
        ]
      },
      {
        "name": "sharmory-setup",
        "desc": "interactive installer for optional dependencies (fzf, jq, eza, tldr, entr)",
        "usage": "sharmory-setup",
        "example": "sharmory-setup",
        "output": [
          {
            "text": "$ sharmory-setup",
            "kind": "cmd"
          },
          {
            "text": "✓ interactive installer for optional dependencies (fzf, jq, eza, tldr, entr)",
            "kind": "ok"
          }
        ],
        "tags": [
          "meta"
        ],
        "related": [
          "sharmory",
          "sharmory-doctor",
          "sharmory-bench"
        ]
      },
      {
        "name": "sharmory-bench",
        "desc": "measure cold-start sourcing duration in milliseconds",
        "usage": "sharmory bench [runs]",
        "example": "sharmory bench [runs]",
        "output": [
          {
            "text": "$ sharmory bench [runs]",
            "kind": "cmd"
          },
          {
            "text": "✓ measure cold-start sourcing duration in milliseconds",
            "kind": "ok"
          }
        ],
        "tags": [
          "meta"
        ],
        "related": [
          "sharmory",
          "sharmory-doctor",
          "sharmory-setup"
        ]
      },
      {
        "name": "sharmory-update",
        "desc": "download and hot-reload the latest Sharmory release",
        "usage": "sharmory-update",
        "example": "sharmory-update",
        "output": [
          {
            "text": "$ sharmory-update",
            "kind": "cmd"
          },
          {
            "text": "✓ download and hot-reload the latest Sharmory release",
            "kind": "ok"
          }
        ],
        "tags": [
          "meta"
        ],
        "related": [
          "sharmory",
          "sharmory-doctor",
          "sharmory-setup"
        ]
      }
    ]
  }
];
