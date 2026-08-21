export interface ArmouryTool {
  name: string;
  desc: string;
  usage: string;
  deps?: string;
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
        "usage": "mkcd <path>"
      },
      {
        "name": "up",
        "desc": "go up N directory levels (default 1)",
        "usage": "up [n]"
      },
      {
        "name": "lsd",
        "desc": "ls with details, human sizes, and git status",
        "usage": "lsd [path]",
        "deps": "eza"
      },
      {
        "name": "fcd",
        "desc": "fuzzy-select directory and cd into it",
        "usage": "fcd [path]",
        "deps": "fzf"
      },
      {
        "name": "ftext",
        "desc": "fuzzy-search file contents and open in $EDITOR",
        "usage": "ftext [query]",
        "deps": "fzf"
      },
      {
        "name": "permsof",
        "desc": "human-readable permissions and octal mode",
        "usage": "permsof <file>"
      },
      {
        "name": "extract",
        "desc": "smart extractor for .tar.gz, .zip, .bz2, .7z, .rar",
        "usage": "extract <archive>"
      },
      {
        "name": "compress",
        "desc": "compress files or folders to zip, tar.gz, or tar.bz2",
        "usage": "compress <type> <output> <target>"
      },
      {
        "name": "duh",
        "desc": "disk usage breakdown of current directory",
        "usage": "duh [depth]"
      },
      {
        "name": "sizeof",
        "desc": "exact size of a file or directory in MB/GB",
        "usage": "sizeof <target>"
      },
      {
        "name": "findbig",
        "desc": "find files larger than size threshold (default 100M)",
        "usage": "findbig [size] [path]"
      },
      {
        "name": "emptydirs",
        "desc": "list (and optionally prune) all empty directories",
        "usage": "emptydirs [path] [--delete]"
      },
      {
        "name": "dupfind",
        "desc": "find duplicate files via SHA256 checksums",
        "usage": "dupfind [path]"
      },
      {
        "name": "bak",
        "desc": "create a timestamped .bak copy of any file",
        "usage": "bak <file>"
      },
      {
        "name": "cwd",
        "desc": "copy current working directory path to clipboard",
        "usage": "cwd"
      },
      {
        "name": "clipcopy",
        "desc": "copy entire file contents to clipboard",
        "usage": "clipcopy <file>"
      },
      {
        "name": "clip",
        "desc": "pipe stdin or file directly to clipboard",
        "usage": "clip [file]"
      },
      {
        "name": "watchrun",
        "desc": "run command on file changes",
        "usage": "watchrun <path> -- <cmd>",
        "deps": "entr"
      },
      {
        "name": "treelist",
        "desc": "tree representation with optional depth limit",
        "usage": "treelist [depth] [path]",
        "deps": "eza"
      },
      {
        "name": "recent",
        "desc": "list recently modified files",
        "usage": "recent [n]"
      },
      {
        "name": "swap",
        "desc": "atomically swap two filenames",
        "usage": "swap <file1> <file2>"
      },
      {
        "name": "trash",
        "desc": "safely move files to system trash / recycle bin",
        "usage": "trash <file...>"
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
        "usage": "gacp <message>"
      },
      {
        "name": "gcamend",
        "desc": "amend last commit message without touching staged files",
        "usage": "gcamend <new-message>"
      },
      {
        "name": "gdiffstage",
        "desc": "inspect staged diff before committing",
        "usage": "gdiffstage"
      },
      {
        "name": "gitundo",
        "desc": "undo last commit while keeping files safely staged",
        "usage": "gitundo"
      },
      {
        "name": "branchclean",
        "desc": "delete local branches already merged into main",
        "usage": "branchclean"
      },
      {
        "name": "branchage",
        "desc": "list local branches sorted by last commit age",
        "usage": "branchage"
      },
      {
        "name": "gswitch",
        "desc": "fuzzy-pick branch to checkout (local & remote)",
        "usage": "gswitch",
        "deps": "fzf"
      },
      {
        "name": "grecentbranch",
        "desc": "fuzzy-switch to recently checked out branches",
        "usage": "grecentbranch [n]",
        "deps": "fzf"
      },
      {
        "name": "gstash",
        "desc": "fuzzy-search and apply/pop git stashes",
        "usage": "gstash",
        "deps": "fzf"
      },
      {
        "name": "grebase",
        "desc": "interactive rebase last N commits",
        "usage": "grebase [n]"
      },
      {
        "name": "gpr",
        "desc": "open GitHub PR creation page for current branch",
        "usage": "gpr",
        "deps": "gh"
      },
      {
        "name": "greview",
        "desc": "open the last open PR for current branch in browser",
        "usage": "greview",
        "deps": "gh"
      },
      {
        "name": "gopen",
        "desc": "open current repository on GitHub / GitLab in browser",
        "usage": "gopen"
      },
      {
        "name": "gclone",
        "desc": "clone repository and cd directly into directory",
        "usage": "gclone <repo-url> [dir]"
      },
      {
        "name": "gwip",
        "desc": "quick work-in-progress checkpoint commit",
        "usage": "gwip"
      },
      {
        "name": "gunwip",
        "desc": "undo last WIP checkpoint commit",
        "usage": "gunwip"
      },
      {
        "name": "gitprune",
        "desc": "delete local branches whose remotes were deleted",
        "usage": "gitprune"
      },
      {
        "name": "prdiff",
        "desc": "diff current branch against main/master",
        "usage": "prdiff [base]"
      },
      {
        "name": "gitconflicts",
        "desc": "list all files with unresolved merge conflict markers",
        "usage": "gitconflicts"
      },
      {
        "name": "gitignore",
        "desc": "fetch gitignore template from gitignore.io",
        "usage": "gitignore <language>"
      },
      {
        "name": "gitcontributors",
        "desc": "ranked author contribution list by commit count",
        "usage": "gitcontributors"
      },
      {
        "name": "gstats",
        "desc": "per-author commit counts and lines added/deleted",
        "usage": "gstats [--since <date>]"
      },
      {
        "name": "gitsize",
        "desc": "total disk footprint of .git object database",
        "usage": "gitsize"
      },
      {
        "name": "gitlog-today",
        "desc": "view all commits made today across branches",
        "usage": "gitlog-today"
      },
      {
        "name": "gitlog-graph",
        "desc": "ASCII branch topology graph with commit hashes",
        "usage": "gitlog-graph"
      },
      {
        "name": "gitbranch-rename",
        "desc": "rename current branch locally and on remote",
        "usage": "gitbranch-rename <new-name>"
      },
      {
        "name": "gcleanup",
        "desc": "prune remotes, delete merged branches, tidy module",
        "usage": "gcleanup"
      },
      {
        "name": "worktree",
        "desc": "fuzzy-manage git worktrees: add, switch, or remove",
        "usage": "worktree <add|switch|remove>",
        "deps": "fzf"
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
        "usage": "dockernuke <container>"
      },
      {
        "name": "dockerclean-images",
        "desc": "remove dangling & untagged images",
        "usage": "dockerclean-images"
      },
      {
        "name": "dclean",
        "desc": "deep-clean unused containers, networks, and build cache",
        "usage": "dclean"
      },
      {
        "name": "dockerlogs",
        "desc": "tail container logs with timestamps and color",
        "usage": "dockerlogs <container> [lines]"
      },
      {
        "name": "dsh",
        "desc": "fuzzy-pick running container and open interactive shell",
        "usage": "dsh [container]",
        "deps": "fzf"
      },
      {
        "name": "dimages",
        "desc": "fuzzy-pick a local image to run, inspect, or delete",
        "usage": "dimages",
        "deps": "fzf"
      },
      {
        "name": "dockersizes",
        "desc": "list Docker images sorted by disk size",
        "usage": "dockersizes"
      },
      {
        "name": "dvols",
        "desc": "human-readable sizes of local Docker volumes",
        "usage": "dvols"
      },
      {
        "name": "dports",
        "desc": "show published port mappings for all running containers",
        "usage": "dports"
      },
      {
        "name": "dstats",
        "desc": "one-shot resource usage snapshot for all running containers",
        "usage": "dstats"
      },
      {
        "name": "dhealth",
        "desc": "show health status of all containers with healthchecks",
        "usage": "dhealth"
      },
      {
        "name": "dcup",
        "desc": "bring up docker-compose services in the background",
        "usage": "dcup"
      },
      {
        "name": "dcdown",
        "desc": "tear down docker-compose services",
        "usage": "dcdown"
      },
      {
        "name": "dbuild",
        "desc": "build image tagging with current directory name",
        "usage": "dbuild [tag]"
      },
      {
        "name": "denv",
        "desc": "dump all environment variables of a running container",
        "usage": "denv <container>"
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
        "deps": "fzf"
      },
      {
        "name": "kns",
        "desc": "set current namespace without changing context",
        "usage": "kns <namespace>"
      },
      {
        "name": "klogs",
        "desc": "fuzzy-pick pod and stream live logs",
        "usage": "klogs [pod]",
        "deps": "fzf"
      },
      {
        "name": "kexec",
        "desc": "fuzzy-pick pod and launch interactive sh/bash",
        "usage": "kexec [pod]",
        "deps": "fzf"
      },
      {
        "name": "kdesc",
        "desc": "fuzzy-pick and describe a pod",
        "usage": "kdesc [pod]",
        "deps": "fzf"
      },
      {
        "name": "ktop",
        "desc": "show pods sorted by CPU or memory usage",
        "usage": "ktop [cpu|memory]"
      },
      {
        "name": "kevents",
        "desc": "stream recent namespace events sorted by timestamp",
        "usage": "kevents [namespace]"
      },
      {
        "name": "kport",
        "desc": "port-forward from localhost to selected pod",
        "usage": "kport <local-port> <pod> <remote-port>"
      },
      {
        "name": "krestart",
        "desc": "rollout-restart a picked deployment",
        "usage": "krestart",
        "deps": "fzf"
      },
      {
        "name": "kscale",
        "desc": "scale a picked deployment to a given replica count",
        "usage": "kscale <replicas>",
        "deps": "fzf"
      },
      {
        "name": "kdel",
        "desc": "force-delete a picked (possibly stuck) pod",
        "usage": "kdel",
        "deps": "fzf"
      },
      {
        "name": "ksecret",
        "desc": "decode and print the data of a picked secret",
        "usage": "ksecret",
        "deps": "fzf"
      },
      {
        "name": "kcp",
        "desc": "copy a file to/from a picked pod",
        "usage": "kcp <local-path> <pod-path>",
        "deps": "fzf"
      },
      {
        "name": "dbforward",
        "desc": "port-forward to a picked k8s DB service with connect hint",
        "usage": "dbforward <local-port> <remote-port>",
        "deps": "fzf"
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
        "usage": "mkvite <app-name> [template]"
      },
      {
        "name": "vitedev",
        "desc": "start the Vite dev server and open the browser",
        "usage": "vitedev"
      },
      {
        "name": "vitebuild",
        "desc": "production build with dist bundle size breakdown",
        "usage": "vitebuild"
      },
      {
        "name": "viteclean",
        "desc": "wipe node_modules/dist/lockfile and reinstall clean",
        "usage": "viteclean"
      },
      {
        "name": "reactcomp",
        "desc": "scaffold a React component with barrel export (TS-aware)",
        "usage": "reactcomp <ComponentName> [dir]"
      },
      {
        "name": "viteenv",
        "desc": "copy .env.example -> .env if .env does not exist",
        "usage": "viteenv"
      },
      {
        "name": "vitelint",
        "desc": "run ESLint + Prettier check + TypeScript typecheck in one pass",
        "usage": "vitelint [--fix]"
      },
      {
        "name": "mkviteapi",
        "desc": "scaffold a companion Express or Fastify API folder",
        "usage": "mkviteapi [name] [--fastify]"
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
        "usage": "goclean"
      },
      {
        "name": "gobuild",
        "desc": "build a Go binary (output name defaults to directory name)",
        "usage": "gobuild [output]"
      },
      {
        "name": "goxbuild",
        "desc": "cross-compile a Go binary for a target OS and architecture",
        "usage": "goxbuild <GOOS> <GOARCH> [output]"
      },
      {
        "name": "goupdate",
        "desc": "upgrade all direct and indirect dependencies to latest",
        "usage": "goupdate"
      },
      {
        "name": "gotest",
        "desc": "run go test -v with clean formatting",
        "usage": "gotest [./...]"
      },
      {
        "name": "gorace",
        "desc": "run tests with the race detector enabled",
        "usage": "gorace [./...]"
      },
      {
        "name": "gobench",
        "desc": "run Go benchmarks with memory allocation metrics",
        "usage": "gobench [bench-regex]"
      },
      {
        "name": "covreport",
        "desc": "generate and open interactive HTML test coverage report",
        "usage": "covreport"
      },
      {
        "name": "gocover-func",
        "desc": "show coverage percentage per function",
        "usage": "gocover-func"
      },
      {
        "name": "gonew",
        "desc": "scaffold minimal Go project with starter main.go",
        "usage": "gonew <module-name>"
      },
      {
        "name": "gomodwhy",
        "desc": "explain why a dependency is required by the module graph",
        "usage": "gomodwhy <package>"
      },
      {
        "name": "gomod-name",
        "desc": "print the module name from go.mod",
        "usage": "gomod-name"
      },
      {
        "name": "gowatch",
        "desc": "re-run Go test suite whenever any .go file changes",
        "usage": "gowatch",
        "deps": "entr"
      },
      {
        "name": "goenv",
        "desc": "show all Go environment variables in aligned table",
        "usage": "goenv"
      },
      {
        "name": "golist",
        "desc": "list all packages in the current module",
        "usage": "golist"
      },
      {
        "name": "goversion",
        "desc": "Go version and key paths (GOROOT, GOPATH, GOMODCACHE)",
        "usage": "goversion"
      },
      {
        "name": "govscan",
        "desc": "scan dependencies for known vulnerabilities via govulncheck",
        "usage": "govscan"
      },
      {
        "name": "goimpl",
        "desc": "show go doc for a type or interface implementation",
        "usage": "goimpl <TypeName>"
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
        "usage": "npmclean"
      },
      {
        "name": "npmscripts",
        "desc": "list all runnable scripts from package.json with keys",
        "usage": "npmscripts"
      },
      {
        "name": "npmoutdated",
        "desc": "show outdated dependencies in current project",
        "usage": "npmoutdated"
      },
      {
        "name": "npmsize",
        "desc": "calculate total disk usage of node_modules directory",
        "usage": "npmsize"
      },
      {
        "name": "nodeversion",
        "desc": "print active Node.js, npm, yarn, and pnpm versions",
        "usage": "nodeversion"
      },
      {
        "name": "nvmuse",
        "desc": "switch Node.js version via nvm or fnm",
        "usage": "nvmuse <version>"
      },
      {
        "name": "tscheck",
        "desc": "run TypeScript typecheck without emitting files",
        "usage": "tscheck"
      },
      {
        "name": "npxrun",
        "desc": "run a package with npx without interactive prompt",
        "usage": "npxrun <package> [args...]"
      },
      {
        "name": "npmglobal",
        "desc": "list globally installed npm packages with depth 0",
        "usage": "npmglobal"
      },
      {
        "name": "npmlink",
        "desc": "link this package globally or into a target project",
        "usage": "npmlink [target-dir]"
      },
      {
        "name": "noderepl",
        "desc": "Node.js REPL with project node_modules on NODE_PATH",
        "usage": "noderepl"
      },
      {
        "name": "npmaudit",
        "desc": "run npm audit with clean summary",
        "usage": "npmaudit"
      },
      {
        "name": "nodeinfo",
        "desc": "summary of the current Node project (name, scripts, deps)",
        "usage": "nodeinfo"
      },
      {
        "name": "npmdedup",
        "desc": "deduplicate and flatten the npm dependency tree",
        "usage": "npmdedup"
      },
      {
        "name": "npmwatch",
        "desc": "watch files and re-run an npm script on change",
        "usage": "npmwatch [script]",
        "deps": "entr"
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
        "usage": "venvcreate"
      },
      {
        "name": "pyvenv",
        "desc": "create .venv and activate it (uses uv if available)",
        "usage": "pyvenv"
      },
      {
        "name": "pyclean",
        "desc": "remove all __pycache__ directories, .pyc, and .pytest_cache",
        "usage": "pyclean"
      },
      {
        "name": "pyfreeze",
        "desc": "dump sorted pip freeze directly to requirements.txt",
        "usage": "pyfreeze"
      },
      {
        "name": "pipinstall",
        "desc": "install packages from requirements.txt with uv / pip",
        "usage": "pipinstall"
      },
      {
        "name": "pyversion",
        "desc": "Python/pip versions and active venv path",
        "usage": "pyversion"
      },
      {
        "name": "pycheck",
        "desc": "lint with ruff/flake8 and type-check with mypy",
        "usage": "pycheck [path]"
      },
      {
        "name": "pytest-run",
        "desc": "run pytest with verbose output and duration rankings",
        "usage": "pytest-run [args...]"
      },
      {
        "name": "pywatch",
        "desc": "watch .py files and re-run pytest on change",
        "usage": "pywatch [test-path]",
        "deps": "entr"
      },
      {
        "name": "pydeps",
        "desc": "list all installed pip packages in a compact table",
        "usage": "pydeps"
      },
      {
        "name": "pyupgrade",
        "desc": "upgrade all packages from requirements.txt to latest",
        "usage": "pyupgrade"
      },
      {
        "name": "pyrequirements-diff",
        "desc": "diff pip freeze output against requirements.txt",
        "usage": "pyrequirements-diff"
      },
      {
        "name": "pyrun",
        "desc": "run a Python script using the active venv interpreter",
        "usage": "pyrun <script.py> [args...]"
      },
      {
        "name": "pyprofile",
        "desc": "profile a script with cProfile, print top hotspots",
        "usage": "pyprofile <script.py> [args...]"
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
        "usage": "m2size"
      },
      {
        "name": "gradlesize",
        "desc": "report size of the local Gradle cache",
        "usage": "gradlesize"
      },
      {
        "name": "jarinfo",
        "desc": "inspect a JAR manifest and top-level contents",
        "usage": "jarinfo <path-to-jar>"
      },
      {
        "name": "javaver",
        "desc": "fuzzy-pick and switch JAVA_HOME (jenv/sdkman aware)",
        "usage": "javaver",
        "deps": "fzf"
      },
      {
        "name": "mvntree",
        "desc": "print the Maven dependency tree for the current project",
        "usage": "mvntree"
      },
      {
        "name": "gemclean",
        "desc": "uninstall old/duplicate gem versions, keeping only latest",
        "usage": "gemclean"
      },
      {
        "name": "rbver",
        "desc": "fuzzy-pick and switch the active Ruby version",
        "usage": "rbver",
        "deps": "fzf"
      },
      {
        "name": "rboutdated",
        "desc": "list outdated gems from the current Gemfile.lock",
        "usage": "rboutdated"
      },
      {
        "name": "rspecf",
        "desc": "re-run only the last-failed RSpec examples",
        "usage": "rspecf [args...]"
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
        "usage": "pgc"
      },
      {
        "name": "myc",
        "desc": "connect to MySQL using MYSQL_* env vars (or defaults)",
        "usage": "myc"
      },
      {
        "name": "redisc",
        "desc": "connect to Redis using REDIS_* env vars",
        "usage": "redisc"
      },
      {
        "name": "pgdump",
        "desc": "dump the current Postgres database to a timestamped .sql file",
        "usage": "pgdump <database>"
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
        "usage": "killport <port> [port...]"
      },
      {
        "name": "portwho",
        "desc": "show process name and PID listening on a port",
        "usage": "portwho <port>"
      },
      {
        "name": "openports",
        "desc": "listening ports flagged by network exposure (0.0.0.0 / ::)",
        "usage": "openports"
      },
      {
        "name": "portscan",
        "desc": "scan a TCP port range using socket /dev/tcp (no nmap needed)",
        "usage": "portscan <host> <start> [end]"
      },
      {
        "name": "certcheck",
        "desc": "TLS certificate expiry date and days remaining for domain",
        "usage": "certcheck <domain>"
      },
      {
        "name": "tlscheck",
        "desc": "full TLS certificate chain info, cipher suite, and SANs",
        "usage": "tlscheck <domain>"
      },
      {
        "name": "dnscheck",
        "desc": "lookup A, AAAA, CNAME, and MX DNS records for domain",
        "usage": "dnscheck <domain>"
      },
      {
        "name": "myip",
        "desc": "display your public-facing IP address",
        "usage": "myip"
      },
      {
        "name": "localip",
        "desc": "display your local LAN IP address",
        "usage": "localip"
      },
      {
        "name": "ipinfo",
        "desc": "IP geolocation, ASN, org, and timezone via ipinfo.io",
        "usage": "ipinfo [ip]"
      },
      {
        "name": "httpstatus",
        "desc": "fetch HTTP response status code for URL",
        "usage": "httpstatus <url>"
      },
      {
        "name": "apihit",
        "desc": "GET URL with formatted JSON output and latency timing",
        "usage": "apihit <url>"
      },
      {
        "name": "headers",
        "desc": "show full HTTP response headers for a URL",
        "usage": "headers <url>"
      },
      {
        "name": "curltime",
        "desc": "detailed HTTP timing: DNS / TCP / TLS / TTFB / total",
        "usage": "curltime <url>"
      },
      {
        "name": "apiwatch",
        "desc": "poll an endpoint; log HTTP status + response time each hit",
        "usage": "apiwatch <url> [interval-seconds]"
      },
      {
        "name": "apimock",
        "desc": "spin up a local mock REST API server from a JSON file",
        "usage": "apimock <file.json> [port]"
      },
      {
        "name": "apidiff",
        "desc": "diff two JSON API responses (URLs or local files)",
        "usage": "apidiff <a> <b>",
        "deps": "jq"
      },
      {
        "name": "openapipp",
        "desc": "validate and lint an OpenAPI/Swagger spec with Redocly",
        "usage": "openapipp <spec-file>"
      },
      {
        "name": "tunnel",
        "desc": "open a quick ngrok tunnel to a local port",
        "usage": "tunnel <port>"
      },
      {
        "name": "flushdns",
        "desc": "flush local operating system DNS resolver cache",
        "usage": "flushdns"
      },
      {
        "name": "tcpcheck",
        "desc": "verify TCP port reachability on remote host",
        "usage": "tcpcheck <host> <port>"
      },
      {
        "name": "pingcheck",
        "desc": "send 5 pings to host with latency summary",
        "usage": "pingcheck <host>"
      },
      {
        "name": "weather",
        "desc": "terminal weather forecast for city via wttr.in",
        "usage": "weather [city]"
      },
      {
        "name": "shorten",
        "desc": "create shortened URL using is.gd service",
        "usage": "shorten <url>"
      },
      {
        "name": "sshconfig",
        "desc": "list all configured Host entries in ~/.ssh/config",
        "usage": "sshconfig"
      },
      {
        "name": "proxy",
        "desc": "toggle http_proxy / https_proxy environment variables",
        "usage": "proxy <on [host:port]|off|status>"
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
        "usage": "passgen [length]"
      },
      {
        "name": "pubkey",
        "desc": "display contents of your SSH public keys (~/.ssh/*.pub)",
        "usage": "pubkey"
      },
      {
        "name": "genssh",
        "desc": "generate a new ed25519 SSH keypair",
        "usage": "genssh <key-name> [email]"
      },
      {
        "name": "b64e",
        "desc": "encode input string to base64",
        "usage": "b64e <text>"
      },
      {
        "name": "b64d",
        "desc": "decode base64 string to plaintext",
        "usage": "b64d <base64-string>"
      },
      {
        "name": "urlencode",
        "desc": "percent-encode text for URL queries",
        "usage": "urlencode <text>"
      },
      {
        "name": "urldecode",
        "desc": "decode percent-encoded URL string",
        "usage": "urldecode <text>"
      },
      {
        "name": "hashfile",
        "desc": "compute MD5, SHA1, and SHA256 checksums of file",
        "usage": "hashfile <file>"
      },
      {
        "name": "genuuid",
        "desc": "generate a random UUID v4",
        "usage": "genuuid"
      },
      {
        "name": "jwtdecode",
        "desc": "decode JWT payload and header without secret validation",
        "usage": "jwtdecode <jwt-token>",
        "deps": "jq"
      },
      {
        "name": "dotenv-check",
        "desc": "lint .env for duplicate keys, empty values, and unquoted secrets",
        "usage": "dotenv-check [file]"
      },
      {
        "name": "licensegen",
        "desc": "generate a LICENSE file (MIT or Apache 2.0)",
        "usage": "licensegen <mit|apache2> [author] [year]"
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
        "usage": "mem"
      },
      {
        "name": "cpu",
        "desc": "snapshot of CPU / process activity",
        "usage": "cpu"
      },
      {
        "name": "cpuwatch",
        "desc": "live CPU load monitor, refreshes every second",
        "usage": "cpuwatch [interval-seconds]"
      },
      {
        "name": "memwatch",
        "desc": "live memory usage monitor, refreshes every second",
        "usage": "memwatch [interval-seconds]"
      },
      {
        "name": "sysinfo",
        "desc": "one-screen OS, CPU, RAM, disk, uptime summary",
        "usage": "sysinfo"
      },
      {
        "name": "pidtree",
        "desc": "process tree for a PID",
        "usage": "pidtree <pid>"
      },
      {
        "name": "fkill",
        "desc": "fuzzy-pick a process and kill it",
        "usage": "fkill",
        "deps": "fzf"
      },
      {
        "name": "now",
        "desc": "current date and time (YYYY-MM-DD HH:MM:SS)",
        "usage": "now"
      },
      {
        "name": "timer",
        "desc": "countdown with terminal audio/bell",
        "usage": "timer <seconds> [label]"
      },
      {
        "name": "diskusage",
        "desc": "interactive disk usage via ncdu or df/du",
        "usage": "diskusage [path]",
        "deps": "ncdu"
      },
      {
        "name": "envdiff",
        "desc": "diff two .env files by key=value pairs",
        "usage": "envdiff <file1> <file2>"
      },
      {
        "name": "ports",
        "desc": "list listening TCP/UDP ports with PID/process",
        "usage": "ports"
      },
      {
        "name": "cronlist",
        "desc": "list (numbered) crontab entries",
        "usage": "cronlist"
      },
      {
        "name": "cronadd",
        "desc": "append a new cron job with schedule validation",
        "usage": "cronadd \"<schedule>\" \"<command>\""
      },
      {
        "name": "cronrm",
        "desc": "fuzzy-pick and remove a cron job",
        "usage": "cronrm",
        "deps": "fzf"
      },
      {
        "name": "cronedit",
        "desc": "open the crontab in $EDITOR",
        "usage": "cronedit"
      },
      {
        "name": "cronhuman",
        "desc": "translate a 5-field cron expression to plain English",
        "usage": "cronhuman \"<min> <hour> <dom> <month> <dow>\""
      },
      {
        "name": "cronnext",
        "desc": "show the next N scheduled run times for an expression",
        "usage": "cronnext \"<schedule>\" [count]"
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
        "usage": "envload [file]"
      },
      {
        "name": "envswitch",
        "desc": "load a named env profile from ~/.sharmory/envprofiles/",
        "usage": "envswitch [profile-name]"
      },
      {
        "name": "envgen",
        "desc": "generate a .env.example from .env — keeps keys, strips values",
        "usage": "envgen [src] [out]"
      },
      {
        "name": "envrequire",
        "desc": "assert required env vars exist (fails CI if missing)",
        "usage": "envrequire VAR1 VAR2 ..."
      },
      {
        "name": "envexport",
        "desc": "print export KEY=\"value\" lines from a .env file",
        "usage": "envexport [file]"
      },
      {
        "name": "envmask",
        "desc": "print a .env file with secret-looking values partially masked",
        "usage": "envmask [file]"
      },
      {
        "name": "envsync",
        "desc": "compare .env vs .env.example and report keys missing from either side",
        "usage": "envsync [env] [example]"
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
        "usage": "note <text|today|list|search <text>>"
      },
      {
        "name": "todo",
        "desc": "append or list entries in ~/todo.md; mark done with todo done <pattern>",
        "usage": "todo [text]"
      },
      {
        "name": "todogrep",
        "desc": "find TODO/FIXME/HACK/XXX comments across the codebase",
        "usage": "todogrep [dir]"
      },
      {
        "name": "hist",
        "desc": "fuzzy-search shell history and paste selection",
        "usage": "hist",
        "deps": "fzf"
      },
      {
        "name": "mkproject",
        "desc": "scaffold Go, Node, or Python project with git",
        "usage": "mkproject <name> [go|node|python]"
      },
      {
        "name": "mktemplate",
        "desc": "create a new project from a custom template in ~/.sharmory/templates/",
        "usage": "mktemplate <template> <project>"
      },
      {
        "name": "ffind",
        "desc": "find files by name or search file contents for text",
        "usage": "ffind <text> | ffind -f <filename>"
      },
      {
        "name": "cheat",
        "desc": "interactive cheatsheet lookup via tldr or man",
        "usage": "cheat <command>",
        "deps": "tldr"
      },
      {
        "name": "calc",
        "desc": "quick arithmetic expression evaluator in terminal",
        "usage": "calc <expression>"
      },
      {
        "name": "qr",
        "desc": "generate ASCII QR code directly in terminal",
        "usage": "qr <text-or-url>"
      },
      {
        "name": "jsonpp",
        "desc": "pretty-print raw JSON file with indentation and colors",
        "usage": "jsonpp <file.json>",
        "deps": "jq"
      },
      {
        "name": "diffjson",
        "desc": "semantic diff of two JSON files (normalized with jq)",
        "usage": "diffjson <file1.json> <file2.json>",
        "deps": "jq"
      },
      {
        "name": "diffdir",
        "desc": "recursively diff two directories",
        "usage": "diffdir <dir-a> <dir-b>"
      },
      {
        "name": "epoch",
        "desc": "convert between Unix epoch and human date",
        "usage": "epoch [epoch|date]"
      },
      {
        "name": "retry",
        "desc": "retry command N times with exponential backoff",
        "usage": "retry <max-attempts> <cmd...>"
      },
      {
        "name": "basec",
        "desc": "convert a number between hex, decimal, octal, and binary",
        "usage": "basec <number>"
      },
      {
        "name": "colorconv",
        "desc": "convert hex color to RGB or RGB to hex",
        "usage": "colorconv <#rrggbb> | colorconv <r> <g> <b>"
      },
      {
        "name": "bench",
        "desc": "time N runs of a command and report min/max/avg",
        "usage": "bench <runs> <command...>"
      },
      {
        "name": "openat",
        "desc": "open $EDITOR at a specific file and line",
        "usage": "openat <file>[:<line>]"
      },
      {
        "name": "serve",
        "desc": "serve the current directory over HTTP",
        "usage": "serve [port]"
      },
      {
        "name": "speed",
        "desc": "internet speed test (speedtest-cli, fast, or curl fallback)",
        "usage": "speed"
      },
      {
        "name": "sshcopy",
        "desc": "copy your SSH public key to a remote host authorized_keys",
        "usage": "sshcopy <user@host> [identity-file]"
      },
      {
        "name": "alias-list",
        "desc": "list user-defined aliases in a clean aligned table",
        "usage": "alias-list [pattern]"
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
        "usage": "jenk-crumb"
      },
      {
        "name": "jenk-build",
        "desc": "trigger parameterized Jenkins build for a job",
        "usage": "jenk-build <job-name>"
      },
      {
        "name": "jenk-logs",
        "desc": "stream live console output of last build for a job",
        "usage": "jenk-logs <job-name>"
      },
      {
        "name": "jenk-jobs",
        "desc": "list all accessible job names on configured Jenkins server",
        "usage": "jenk-jobs"
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
        "usage": "sharmory"
      },
      {
        "name": "sharmory-doctor",
        "desc": "verify active shell environment and optional tool status",
        "usage": "sharmory doctor"
      },
      {
        "name": "sharmory-setup",
        "desc": "interactive installer for optional dependencies (fzf, jq, eza, tldr, entr)",
        "usage": "sharmory-setup"
      },
      {
        "name": "sharmory-bench",
        "desc": "measure cold-start sourcing duration in milliseconds",
        "usage": "sharmory bench [runs]"
      },
      {
        "name": "sharmory-update",
        "desc": "download and hot-reload the latest Sharmory release",
        "usage": "sharmory-update"
      }
    ]
  }
];
