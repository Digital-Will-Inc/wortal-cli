# Wortal CLI

CLI utility used to manage Wortal projects. Can be integrated into your CI/CD pipeline to streamline the deployment
process. A Wortal API token is required to use this tool.

### Installation

Install the package as a dev dependency in your project:

```bash
npm install --save-dev @digital-will/wortal-cli
```

### Game Config

All game configuration is stored in the `.wortal.json` file in the root of your project. This file is generated
when you run `wortal install` and should be committed to your repository.

### Commands

#### `wortal install`

Installs the Wortal CLI into your project. This command will create a `.wortal.json` file in the root of your project.
If you are using the CLI in a CI/CD workflow you can skip this step.

---

#### `wortal upload`

Uploads the game to Wortal. This command will create a new revision of the game and upload the specified game bundle.
This needs to be a `.zip` archive with `index.html` at the root of the archive.

#### Arguments

| Argument   | Description             | Required |
|------------|-------------------------|----------|
| `--bundle` | Path to the game bundle | Yes      |
| `--notes`  | Release notes           | No       |
| `--token`  | API token               | No       |
| `--gameID` | Game ID                 | No       |

#### Example

```bash
// Dev environment
wortal upload --bundle ./build.zip --notes "Initial release"

// CI/CD workflow
wortal upload --bundle ./build.zip --notes "$RELEASE_NOTES" --token "$WORTAL_API_TOKEN" --gameID "$WORTAL_GAME_ID"
```

---

#### `wortal config`

Gets/sets the configuration for the Wortal CLI.

#### Arguments

| Argument | Description      |
|----------|------------------|
| `token`  | Wortal API token |

#### Example

```bash
wortal config get token
```

---

#### `wortal game`

Gets/sets the configuration for the game.

#### Arguments

| Argument | Description |
|----------|-------------|
| `gameID` | Game ID     |

#### Example

```bash
wortal game set gameID 99999
```

