export type Tool = { name: string; desc: string };
export type Category = {
  id: string;
  index: string;
  name: string;
  sigil: string;
  blurb: string;
  tools: Tool[];
};

export const CATEGORIES: Category[] = [
  {
    id: "nav",
    index: "01",
    name: "NAVIGATION & FILES",
    sigil: "~/",
    blurb: "Move through a filesystem like you own it. Find, size, compress, restore.",
    tools: [
      { name: "mkcd", desc: "make a directory and cd into it in one step" },
      { name: "up", desc: "go up N directory levels" },
      { name: "fcd", desc: "fuzzy-pick a subdirectory and cd into it" },
      { name: "ftext", desc: "fuzzy-search file contents, open the match in $EDITOR" },
      { name: "extract", desc: "auto-extract any archive by extension" },
      { name: "compress", desc: "tar.gz or zip a file or directory" },
      { name: "findbig", desc: "find files above a size threshold" },
      { name: "dupfind", desc: "find duplicate files by MD5" },
      { name: "emptydirs", desc: "locate and prune empty directories" },
      { name: "bak", desc: "timestamped backup copy of a file" },
      { name: "duh", desc: "disk usage here, sorted by size" },
      { name: "watchrun", desc: "re-run a command whenever a path changes" },
    ],
  },
  {
    id: "git",
    index: "02",
    name: "GIT",
    sigil: "⌥",
    blurb: "Undo, prune, checkpoint, inspect. The commands you retype every single day.",
    tools: [
      { name: "gitundo", desc: "undo the last commit, keep changes staged" },
      { name: "gacp", desc: "add + commit + push, guarded on main" },
      { name: "gwip", desc: "checkpoint commit for uncommitted work" },
      { name: "gunwip", desc: "roll the checkpoint back, staged" },
      { name: "branchclean", desc: "delete branches already merged into main" },
      { name: "branchage", desc: "local branches sorted by last activity" },
      { name: "gitprune", desc: "drop tracking branches whose remote is gone" },
      { name: "gswitch", desc: "fuzzy branch switcher, local + remote" },
      { name: "prdiff", desc: "diff the current branch against base" },
      { name: "gitconflicts", desc: "list files with unresolved conflicts" },
      { name: "gitcontributors", desc: "commit counts per author" },
      { name: "gitsize", desc: "total size of the .git directory" },
    ],
  },
  {
    id: "containers",
    index: "03",
    name: "DOCKER & KUBERNETES",
    sigil: "▣",
    blurb: "Daemon triage without memorising four flags per command.",
    tools: [
      { name: "dockernuke", desc: "force stop and remove a container" },
      { name: "dclean", desc: "reclaim all unused docker data" },
      { name: "dsh", desc: "fuzzy-pick a container, drop into a shell" },
      { name: "dockerlogs", desc: "tail container logs with timestamps" },
      { name: "dockersizes", desc: "human-readable local image sizes" },
      { name: "k8sctx", desc: "fuzzy-switch context and namespace" },
      { name: "klogs", desc: "fuzzy-pick a pod, stream its logs" },
      { name: "kexec", desc: "fuzzy-pick a pod, exec a shell" },
      { name: "ktop", desc: "pods by CPU / memory pressure" },
      { name: "kevents", desc: "namespace events, most recent last" },
    ],
  },
  {
    id: "lang",
    index: "04",
    name: "GO / NODE / PYTHON",
    sigil: "{}",
    blurb: "Per-language chores collapsed into one verb each.",
    tools: [
      { name: "covreport", desc: "go test with coverage, opens the HTML report" },
      { name: "goclean", desc: "tidy, vet and format in one pass" },
      { name: "gomodwhy", desc: "explain why a module is in the graph" },
      { name: "gobench", desc: "benchmarks with memory stats" },
      { name: "gonew", desc: "scaffold a minimal new module" },
      { name: "gowatch", desc: "re-run tests on .go save" },
      { name: "npmclean", desc: "nuke node_modules + lockfile, reinstall" },
      { name: "npmscripts", desc: "list scripts defined in package.json" },
      { name: "npmoutdated", desc: "outdated deps, compact form" },
      { name: "venvcreate", desc: "create and activate ./venv" },
      { name: "pyclean", desc: "remove __pycache__ and .pyc recursively" },
      { name: "pyfreeze", desc: "freeze packages into requirements.txt" },
    ],
  },
  {
    id: "net",
    index: "05",
    name: "NETWORKING",
    sigil: "◇",
    blurb: "Is it me, is it DNS, is it the cert? Answer in one line.",
    tools: [
      { name: "killport", desc: "kill whatever is squatting on a port" },
      { name: "portwho", desc: "which process is listening on a port" },
      { name: "certcheck", desc: "TLS expiry date and days remaining" },
      { name: "dnscheck", desc: "A, CNAME and MX records for a domain" },
      { name: "httpstatus", desc: "status code plus what it actually means" },
      { name: "apihit", desc: "curl with pretty JSON, timing and status" },
      { name: "tcpcheck", desc: "raw TCP reachability on host:port" },
      { name: "myip", desc: "public-facing IP address" },
      { name: "localip", desc: "local network IP address" },
      { name: "flushdns", desc: "flush the local DNS cache" },
      { name: "shorten", desc: "shorten a URL via is.gd" },
      { name: "weather", desc: "because the terminal is your homepage" },
    ],
  },
  {
    id: "sec",
    index: "06",
    name: "SECURITY & ENCODING",
    sigil: "✱",
    blurb: "Keys, hashes, encodings. No browser tab required.",
    tools: [
      { name: "passgen", desc: "random base64 password" },
      { name: "genssh", desc: "new ed25519 keypair" },
      { name: "pubkey", desc: "print your SSH public keys" },
      { name: "b64e / b64d", desc: "base64 encode and decode" },
      { name: "urlencode / urldecode", desc: "URL encode and decode" },
      { name: "hashfile", desc: "MD5, SHA1 and SHA256 of a file" },
      { name: "genuuid", desc: "random UUID v4" },
    ],
  },
  {
    id: "sys",
    index: "07",
    name: "SYSTEM & PRODUCTIVITY",
    sigil: "▤",
    blurb: "Processes, notes, JSON, env files, timers. The long tail.",
    tools: [
      { name: "mem", desc: "current physical memory usage" },
      { name: "cpu", desc: "snapshot of CPU / process activity" },
      { name: "pidtree", desc: "process tree for a PID" },
      { name: "fkill", desc: "fuzzy-pick a process and kill it" },
      { name: "jsonpp", desc: "pretty-print JSON from file or stdin" },
      { name: "envload", desc: "load a .env into the current shell" },
      { name: "note", desc: "append a timestamped line to your notes" },
      { name: "timer", desc: "countdown with a terminal bell" },
      { name: "calc", desc: "arithmetic without leaving the prompt" },
      { name: "qr", desc: "QR code straight into the terminal" },
      { name: "cheat", desc: "tldr with a man-page fallback" },
    ],
  },
  {
    id: "ci",
    index: "08",
    name: "CI / JENKINS",
    sigil: "⟳",
    blurb: "Trigger, tail, inspect. Driven by JENKINS_URL, USER and TOKEN.",
    tools: [
      { name: "jenk-build", desc: "trigger a job build" },
      { name: "jenk-logs", desc: "tail console output for a build" },
      { name: "jenk-jobs", desc: "list jobs and their last result" },
      { name: "jenk-crumb", desc: "fetch a CSRF crumb" },
      { name: "sharmory-update", desc: "pull the latest armoury, in place" },
    ],
  },
];

export const TOTAL_TOOLS = CATEGORIES.reduce((n, c) => n + c.tools.length, 0);

export const SHIPPED = 98;

export const REPO = "https://github.com/hariharen9/sharmory";
