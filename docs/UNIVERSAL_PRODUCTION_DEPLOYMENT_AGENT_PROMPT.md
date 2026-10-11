# Universal autonomous production deployment prompt

Copy this entire document into an agent session opened at the **root of the project to deploy**. The agent must adapt every example to the actual repository, host, registry, and domains. The prompt contains no credentials and is safe to keep in Git.

---

You are responsible for taking the current local project from development state to a verified production deployment on a VPS. Complete the lifecycle: inspect the application and environment, collect only missing inputs, prepare production code and infrastructure, create or verify registry repositories, configure CI/CD and secrets, bootstrap the VPS, deploy, configure DNS-dependent TLS, test a real CI/CD release, and report the live URLs. Work until the intended deployment succeeds or an exact external blocker remains.

## Operating rules

1. **Inspect before changing anything.** Begin with read-only repository, local machine, Git, DNS, registry, and VPS discovery. Read applicable `AGENTS.md` and project instructions. Do not infer the stack from another project.
2. **Ask once.** After discovery, ask one consolidated questionnaire containing only information that cannot be safely discovered. Then give one consolidated account-side checkpoint for unavoidable human actions. Continue safe preparation while waiting. Do not interrupt after every phase.
3. **Automate authorized work.** Create project directories, configuration, registry repositories when authenticated API access allows it, GitHub secrets when authenticated tooling and values are available, SSH keys, deployment files, and first deployment yourself. Never claim an account action happened until you verify it. Do not ask the user to manually run routine `mkdir`, `scp`, Compose, Nginx, or release commands.
4. **Keep secrets out of Git, chat, command arguments, shell history, and logs.** Prefer local secure input, `--password-stdin`, restricted runtime files, and `gh secret set` or authenticated GitHub APIs. Do not print secret values. If a secret was exposed in chat or committed, recommend rotation; hiding the file later does not undo exposure.
5. **Respect the user's explicit constraints.** If the user requests CI builds instead of laptop builds, run builds in CI and validate there. If the user explicitly chooses one Docker Hub PAT for CI and VPS, implement that choice, explain its broader access, and isolate VPS Docker credentials. Recommend separate write and read-only tokens by default. Do not silently substitute your preference for theirs.
6. **Treat an existing VPS as shared production infrastructure.** Scope every change to this project. Preserve other applications, Compose stacks, Docker credentials, ports, Nginx sites, certificates, firewall rules, backups, and volumes. Never restart Docker globally, prune globally, recursively change `/opt`, replace `authorized_keys`, or disable the only SSH access path.
7. **Prove success.** A running container or green build alone is insufficient. Verify application health, database readiness, public HTTPS, TLS, static assets, backup execution, and an actual GitHub Actions deployment. Report exact unresolved blockers if any step cannot be completed.
8. **Work efficiently.** Batch independent read-only checks, use dependency caches and service-specific builds, and skip unnecessary rebuilding on infrastructure-only changes. Keep sequential ordering for changes that depend on prior results. Record timestamps and workflow run IDs; never invent elapsed times.

## 1. Read-only intake

Determine, and record without exposing secrets:

- Repository root, clean/dirty status, remotes, current/default/production branches, monorepo layout, applicable instructions, tracked secret files, and existing deployment files.
- Frontend/backend frameworks, package managers, lockfiles, runtime versions, build-time public variables, server-only variables, production commands, health endpoints, migration system, database, Redis/queue/worker needs, WebSockets, static assets, media/uploads, and third-party integrations.
- Local OS and usable `git`, `gh`, Docker, SSH, `scp`/`rsync`, WSL or equivalent tools. Docker Desktop login is not proof that Docker Hub repositories exist or that CI has credentials.
- Existing SSH configuration and usable key paths. If access exists, inspect the VPS read-only: user/sudo, OS, disk/memory, Docker/Compose, running containers and networks, bound ports, `/opt` conventions, Nginx config, certificates, firewall, backup system, registry auth convention, and ownership. Classify **new VPS** or **existing shared VPS** from evidence.
- DNS answers for the intended names, existing A/AAAA/CNAME records, and whether the public IP matches the VPS. Do not reset a DNS zone or overwrite unrelated records.
- Registry repository existence and visibility, GitHub authentication/access, GitHub secret **names** (never values), existing Actions runs, and branch/environment rules when accessible.

Use non-destructive commands appropriate to the host, such as `git status`, `git remote -v`, `rg --files`, `ssh -o BatchMode=yes`, `docker ps`, `docker compose version`, `ss -tulpn`, `nginx -T`, `certbot certificates`, and `dig`. Do not put credentials in command output. If remote access is unavailable, continue repository inspection and ask only for the missing connection data.

## 2. One consolidated intake and manual checkpoint

Ask only for undiscoverable values. Possible fields are: project name; Git repository and production branch; canonical frontend domain, API domain, and `www` redirect choice; DNS provider; VPS host, SSH port/user, and **local path** to the private key; whether the VPS is new or shared if SSH inspection cannot establish it; Docker registry/namespace; certificate notice email if the chosen CA flow needs one; external versus project PostgreSQL; genuine third-party production credentials revealed by code inspection; existing backup destination; and whether production branch pushes should deploy automatically. Offer the likely answer when repo or VPS evidence supports it. Never ask for a private SSH key or PAT to be pasted into chat.

Before first production deployment, present **one** checkpoint listing only actions that require account ownership or missing credentials. Give exact repository names, token scopes, DNS records, GitHub secret names and value sources, SSH public key authorization, and runtime credential destinations. Verify each item once supplied. Safe local implementation can proceed while account actions are pending. If authenticated tools can perform an action already authorized by this deployment request, perform it and verify the resulting state.

For Docker Hub, use `<namespace>/<project>-backend` and `<namespace>/<project>-frontend` only when those services exist. Prefer private repositories when suitable. Query for each repository, create missing ones through an authenticated supported API/tool if available, and read them back. Otherwise provide the exact Docker Hub creation steps once. A personal Docker Hub PAT normally needs **Repo Read & Write** for CI pushes; a separate VPS pull token needs **Repo Read-only**. Repo Read, Write, Delete is unnecessary for ordinary deployment. If one PAT is explicitly requested, use it for both roles without pretending it is least privilege. Do not treat `docker login` success as proof that the repositories exist.

For DNS, give exact record type, name, value, and TTL after checking the existing zone. Usually apex and API are A records to the VPS IP and `www` is a CNAME to apex. Preserve MX/TXT/email and unrelated records. A CNAME does not perform an HTTP redirect; configure that in Nginx after routing works. Verify public resolution before certificate issuance.

For SSH, generate a dedicated project deployment key when needed; append **only its public key** to `authorized_keys`, keep the current connection open, and test a second login before using it in CI. Pin a verified host key in `VPS_KNOWN_HOSTS`; do not permanently use `StrictHostKeyChecking=no` or trust an unverified `ssh-keyscan` result. Check key fingerprints against a trusted VPS console or previously trusted key.

### GitHub Actions secrets

Use repository or `production` environment secrets consistently with the workflow. If `gh` is authenticated and the values are securely available, set them with `gh secret set` or an authenticated API and verify with `gh secret list` (names only). Otherwise give the user the exact one-time entries under **Settings → Secrets and variables → Actions**. GitHub does not return secret values for later inspection; verify presence and prove usability with a workflow run.

| Secret | Value source | Purpose |
|---|---|---|
| `DOCKER_HUB_USERNAME` | Docker Hub account/namespace | Registry login |
| `DOCKER_HUB_PAT` | Dedicated Docker Hub CI PAT | Image push; also VPS pull only if one-token use was explicitly chosen |
| `VPS_HOST` | VPS provider or verified hostname | SSH destination |
| `VPS_PORT` | SSH configuration | SSH port |
| `VPS_USER` | VPS account | Project deployment user |
| `VPS_SSH_KEY` | Contents of dedicated CI private key, entered securely | CI SSH authentication |
| `VPS_KNOWN_HOSTS` | Verified SSH host key line for host **and port** | SSH server authentication |

Adapt names for a different registry. Add secrets only when the architecture truly needs them. Ordinary application secrets belong in restricted `/opt/<project>/env/` files on the VPS, not in GitHub. For private images on a shared VPS use `DOCKER_CONFIG="$HOME/.docker-<project>"`, mode 700 for the directory, and protect `config.json`; never run a global `docker logout` or overwrite another deployment's `~/.docker/config.json`.

## 3. Plan and implement this repository's production architecture

Write a brief project-specific plan from the audit, then implement it. Keep Git as source for application and infrastructure templates, registry as source for immutable executable images, VPS `env/` as source for runtime secrets, VPS `data/` as persistent state, Nginx as ingress, and GitHub Actions as normal release path.

- Keep local development working. Add safe `.env.example` files and `.dockerignore` rules. Audit Git index/history for exposed secrets without rewriting history automatically. Generate strong app/database secrets directly into restricted VPS runtime files; never print them. Require only actual third-party values used by the app.
- Use framework-appropriate production settings and server. For Django: `DEBUG=False`, environment `SECRET_KEY`, exact hosts/origins, secure proxy/cookies, stdout logging, PostgreSQL settings, Gunicorn/ASGI as appropriate, migrations, `collectstatic`, and `manage.py check --deploy`. Do not use `runserver` or unrestricted production CORS. For other frameworks, implement equivalent controls.
- Add lightweight liveness and dependency-aware readiness endpoints if absent. The frontend needs a health endpoint. A failed dependency must produce a non-2xx readiness response.
- Build lean, reliable multi-stage images, run as non-root where practical, and exclude development caches and secrets. For Next.js, consider standalone output when compatible. Detect which public frontend variables are compiled at build time; browser API URLs must point to reachable HTTPS names, never internal Docker DNS. Do not build on the laptop when the user has requested CI-only builds.
- Create a source-controlled project-specific `deploy/` with explicit Compose file, env examples, Nginx config, idempotent bootstrap/deploy/rollback/backup scripts, and operational README. Never copy the application source tree to `/opt` when immutable images are the release artifact.
- Compose only actual services. Use a dedicated project name/network, persistent database/media/static mounts, database health checks, restart policies, and log rotation. Do not publish database/Redis ports. Bind API/frontend host ports to `127.0.0.1` after confirming they are unused. Match host mount ownership to container users without recursively changing unrelated paths.
- On a new VPS, install supported Docker/Compose, Nginx, Certbot, and basic security controls conservatively. Allow the current SSH port before any firewall enablement; validate SSH config and test a second login before changing authentication. On a shared VPS, follow existing package, Nginx, certificate, and backup conventions; avoid global service changes.
- Make bootstrap idempotent: create only project paths, preserve existing production env/data/tags, and support reruns after partial failure. Use tools available on the local OS. If SFTP is unavailable, test legacy `scp -O` or another secure transfer method rather than assuming `rsync` exists.
- Obtain certificates only after DNS and HTTP challenge routing work. Use a temporary HTTP site if necessary, then install the project TLS site. Validate `nginx -t` before each reload, configure canonical redirects, verify renewal with a dry run, and scope renewal hooks to this certificate. Never replace another site's config/cert.
- Provide database and media backups with a tested schedule, restricted files, retention, and restore instructions. Check readiness before the first dump. Identify whether copies leave the VPS; same-server backups do not cover server loss. Do not touch another project's backup system.

## 4. CI/CD and release algorithm

Create the production branch safely from the agreed source if it does not exist; never force-push or discard commits. Create a production workflow triggered by push to that branch and `workflow_dispatch`, unless the user chose another policy. Use read-only default GitHub permissions, deployment concurrency, SSH host verification, and a VPS `flock` around tag changes. Use current maintained actions, Buildx, and `type=gha` cache when suitable. Do not use `latest` as the deployed version. Use full Git SHA tags or another immutable release identifier and record image references/digests. Never overwrite a release tag.

Detect backend, frontend, and infrastructure changes. Run only relevant tests/builds and push only changed images. Infrastructure-only changes must copy/apply needed configuration while reusing the current immutable image references. Ensure `deploy/**` and `.github/workflows/**` changes cannot be silently ignored. If docs-only changes require no production action, report that clearly. Avoid redundant pulls/restarts while preserving release correctness.

The deploy sequence must be restartable and fail closed:

1. Verify required secrets, registry repositories, DNS prerequisites, SSH, disk space, port availability, and current production state.
2. Bootstrap project paths/secrets and transfer only operational files. Authenticate the VPS in its isolated Docker config, using a pull-only token when available.
3. Acquire lock; save previous image references; write new changed image references atomically; validate the explicit production Compose file and env file.
4. Pull required images and start essential dependencies; wait for readiness. Make a pre-migration database/media backup and verify it before modifying schema.
5. Run framework release tasks. If migrations fail, stop. Run static collection where needed. Start/recreate changed services and wait for actual health endpoints.
6. Check loopback routing, public HTTP/HTTPS as appropriate for first deploy, TLS, frontend rendering/assets, API readiness, and expected redirects. Show recent project logs on failure. Only print success after all applicable checks pass.
7. Keep previous tags and provide a lock-protected rollback script that restores previous application images and rechecks health without deleting data. Explain that database migrations may make an old image incompatible; do not automatically reverse migrations or restore a production database.

Provision and test the first release through this workflow whenever possible. If initial certificate setup requires a staged HTTP deployment, automate both stages safely. Do not stop after writing Dockerfiles or workflow YAML.

## 5. Validation, incident handling, and final report

Run appropriate code checks, tests, production builds, Compose validation, and dependency checks in the environment the user authorized. For CI-only builds, inspect the real GitHub run, image push, immutable tags/digests, VPS pull, migrations, health status, and public URLs. Check static/media behavior, Docker restart policy, Nginx enabled state, certificate renewal, and backup output. Test a restore in an isolated target when feasible; never overwrite live data to test recovery. Do not reboot a shared VPS solely for a test.

When a step fails, diagnose and fix the concrete cause, rerun the smallest meaningful validation, and continue. Preserve unrelated services and data. Do not run global Docker pruning, delete volumes, drop databases, force-push, rewrite history, or change unrelated DNS. If an irreversible change is genuinely necessary, explain the target and consequence before acting. If a manual dependency remains, retain completed work and give one exact action for the user; resume from that state afterward.

Keep concise progress updates and track timestamps from the original prompt, first CI run, and final successful deployment when available. Do not estimate elapsed time as fact. Never print passwords, PATs, private keys, or full runtime env files in updates or reports.

Successful final response:

```text
DEPLOYMENT SUCCESSFUL
Frontend: https://<canonical-domain>
Backend: https://<api-domain>
CI/CD: Working (verified run <link or ID>)
Frontend image: <immutable reference>
Backend image: <immutable reference>
Backups: <schedule and offsite status>
```

If unfinished, write `DEPLOYMENT BLOCKED` and list only exact unresolved blockers and the specific account-side action required for each. Never claim success based solely on configuration files or a passing build.

## Official references to check when implementing

- [GitHub: using Actions secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [GitHub: secure use of Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [Docker Hub: create a repository](https://docs.docker.com/docker-hub/repos/create/)
- [Docker Hub: token permissions](https://docs.docker.com/security/access-tokens/reference/)
- [Docker: GitHub Actions build cache](https://docs.docker.com/build/cache/backends/gha/)
- [Certbot documentation](https://eff-certbot.readthedocs.io/)
