# Copilot / Automation Instructions for contributors and tooling

Purpose
- Give precise, deterministic guidance for automations and Copilot-style assistants to safely make useful changes to this repository.
- Provide detection steps so automation can adapt to the project's language and toolchain.
- Provide a PR checklist to ensure quality, consistency and safety.

Quick principles
- Do not introduce secrets or leak private keys, tokens, or credentials in commits or PR descriptions.
- Prefer small, focused changes. Make many small PRs rather than one large PR.
- Run tests and linters locally (or in the CI run) before opening a PR.
- When in doubt, open an issue and link it from the PR.

Repository detection algorithm (for automation)
1. Look for repository roots/files to detect stack:
   - package.json → Node.js / npm / pnpm / yarn
   - pyproject.toml or requirements.txt → Python
   - go.mod → Go
   - Gemfile → Ruby
   - rust Cargo.toml → Rust
   - Dockerfile or docker-compose.yml → container-first local dev
   - .github/workflows/*.yml → CI pipelines and steps
2. Choose the canonical runner based on detection:
   - Node.js: prefer package.json's scripts (npm ci / npm test)
   - Python: prefer poetry or pytest if pyproject.toml shows it; else use pytest
   - Go: go test ./...
3. If multiple ecosystems are present, prioritize the one that appears in the most files or the repo root language summary in GitHub.

Before editing code (automation checklist)
- Run the detection algorithm and record the detected stack in the PR body.
- Install dependencies using the repo's recommended method (.nvmrc, .node-version, pyenv, etc).
- Run tests: use repository's test script, else run sensible default (npm test, pytest, go test).
- Run linters/formatters if present (.eslintrc, .prettierrc, .flake8, golangci-lint).
- Preserve existing file and directory structure and naming conventions.

Commit, branch, and PR rules
- Branch naming: copilot/<short-descriptor>-<ticket-number?> or feature/copilot-...
  Example: copilot/fix-async-timeout-#123
- Commit message format:
  - Short summary (50 chars or less)
  - Blank line
  - More detailed explanation (wrap at 72 chars)
  - Footer: "Closes #<issue>" when appropriate
  Example:
    Fix race condition in X handler

    Use mutex to avoid concurrent writes to Y.

    Closes #123
- PR template should include:
  - Short summary
  - What changed
  - Tests run (commands and results)
  - Checklist (tests, lint, docs, changelog)
  - Link to related issue(s)

PR body checklist (automation should fill these sections)
- Stack detected: <detected stack(s)>
- Commands to reproduce locally:
  - Install: <command>
  - Run tests: <command>
- Tests run: <pass/fail>
- Lint run: <pass/fail>
- Documentation updated: yes/no
- Security considerations reviewed: yes/no

Testing guidelines
- Add tests for non-trivial behavior changes.
- Keep changes backwards-compatible unless the PR explicitly states a breaking change.
- For database migrations: include quick rollback notes and test in a staging-like environment.

Documentation and READMEs
- Always update README or relevant docs for user-facing changes or new dev scripts.
- If adding new environment variables, update .env.example or doc with purpose and format (do not add secrets).

CI and workflows
- If adding or modifying workflows, include an explanation in the PR body and ensure jobs are limited to the minimum privileges required.
- Avoid running workflows that write to production systems automatically, unless explicitly authorized.

Code review guidance for maintainers
- Verify tests and linters pass in CI.
- Ensure PR scope is small and goal is clear.
- Check for hard-coded secrets or credentials.
- Prefer requesting changes over merging untested code.

Security and sensitive data
- Never commit .env files with real secrets.
- Use GitHub Secrets, HashiCorp Vault, or other secret stores for CI and runtime secrets.
- If a secret is accidentally committed, rotate it immediately and follow the repository's incident steps.

When to open an issue (instead of a PR)
- If the change is ambiguous or may affect multiple subsystems.
- If the change requires approval from project maintainers or owners.
- If it requires access to private infra or secrets for testing.

Contact
- Primary maintainer: @mattrencher (repo owner)
- Use issues for coordination and major changes.
