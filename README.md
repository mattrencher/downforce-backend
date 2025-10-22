██████╗  ██████╗ ██╗   ██╗███████╗███████╗███████╗███████╗
██╔══██╗██╔═══██╗██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝
██████╔╝██║   ██║██║   ██║█████╗  ███████╗█████╗  ███████╗
██╔══██╗██║   ██║██║   ██║██╔══╝  ╚════██║██╔══╝  ╚════██║
██████╔╝╚██████╔╝╚██████╔╝███████╗███████║███████╗███████║
╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝

Downforce Backend — quick & fun guide
====================================

What is this?
- This repo contains the backend services powering the Downforce application.
- It is primarily a server-side codebase (APIs, services, and data access layers).
- This README is intentionally playful while covering how to get started and how automation/Copilot can assist.

Quick ASCII roadmap
- Start local -> Run tests -> Make small PR -> Automations help -> Maintain quality

Get started (detect-first approach)
1. Detect the stack (automation or developer):
   - If package.json exists: run `npm ci` then `npm test` (or the project's test script)
   - If pyproject.toml or requirements.txt exists: run `python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt && pytest`
   - If go.mod exists: run `go test ./...`
   - If docker-compose.yml exists: run `docker-compose up --build`
2. Run the app:
   - If there is a `start` or `dev` script in package.json: `npm run dev`
   - If dockerized: `docker-compose up`
3. Check CI:
   - See `.github/workflows` for the test and lint pipelines.

Common workflows
- Make a small change (fix/feature)
  - Branch: copilot/<short-description>
  - Commit: short subject + body explaining why
  - Include tests
  - Run lint and tests
  - Open PR, reference issue if applicable

- Fixing a bug
  - Add a regression test that fails
  - Fix the code to satisfy the test
  - Run full test suite

Developer notes for Copilot/autos
- Always detect stack and obey existing scripts.
- Try to follow established patterns and naming conventions found in the codebase.
- Prefer non-invasive changes: add new functions instead of modifying large existing ones when possible.
- Update docs when adding or changing public behavior.

Fun little diagram (ASCII)
          .----.      .------.
         /      \----/        \
        |  Client  ->  Backend  |
         \      /----\        /
          '----'      '------'
    (HTTP requests)   (Business logic, DB, auth)

Contribution guide
- Fork -> Branch -> PR
- Keep PRs concise and focused
- Add tests for new behavior
- If you're unsure, open an issue to discuss

Contact and code of conduct
- Maintainer: @mattrencher
- Be respectful. Explain design decisions and ask questions.

Parting ASCII gift
   _/_/_/    _/    _/   _/    _/   _/    _/
  _/    _/  _/_/  _/  _/_/  _/  _/_/  _/
 _/_/_/   _/  _/ _/ _/  _/ _/ _/  _/ _/
_/    _/ _/    _/_/ _/   _/_/ _/   _/ _/
_/    _/ _/     _/  _/    _/  _/    _/ _/

Happy hacking — may your PRs be small and your tests green! 🚀
