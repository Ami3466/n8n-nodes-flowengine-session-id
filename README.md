# n8n-nodes-flowengine-session-id

> **The Missing Link for AI Agent Setup in n8n**

This n8n community node eliminates the friction of setting up Session IDs for AI Agents with Memory. No more custom Code nodes. No more complex expressions. Just drag, drop, and connect.

## The Problems This Solves

### 🔧 The "Setup Friction" Problem
When you add an AI Agent node with Memory in n8n, it requires a `sessionId`. Most users end up writing custom Code nodes or wrestling with expressions just to generate a simple UUID. **This node does it in one click.**

### 🔄 The "Loop Amnesia" Problem
Inside loops, n8n's context can reset, causing AI agents to lose track of conversation history between iterations. **This node persists the session ID across the entire loop using workflow static data.**

## Installation

### Community Nodes (Recommended)
1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-flowengine-session-id`
4. Agree to the risks and click **Install**

### Manual Installation
```bash
npm install n8n-nodes-flowengine-ai-session-id
```

## Usage

### Mode 1: Generate New ID
The simplest use case. Creates a fresh UUID v4 for each execution.

**When to use:**
- Starting a new conversation with an AI Agent
- Each workflow execution should be a new session
- Simple, stateless AI interactions

**Output:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Mode 2: Manage Loop Session
Persists a single session ID across multiple loop iterations using `getWorkflowStaticData`.

**When to use:**
- Processing multiple items in a loop with the same AI Agent
- Building multi-turn conversations within a single workflow run
- Any scenario where you need the AI to "remember" across iterations

**Configuration:**
| Parameter | Description |
|-----------|-------------|
| Session Key | A unique key to identify this session in static data (e.g., `customerSupportSession`) |
| Reset Session | Force generate a new ID, replacing any existing one |

**Output:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Example Workflows

### Basic AI Agent Setup
```
[Trigger] → [AI Session ID] → [AI Agent with Memory]
                    ↓
           { sessionId: "uuid" }
```

### Loop with Persistent Memory
```
[Trigger] → [Split In Batches] → [AI Session ID (Manage Loop)] → [AI Agent] → [Loop]
                                              ↓
                                 Same sessionId for all iterations
```

## Technical Details

- **Zero External Dependencies**: Uses Node.js native `crypto.randomUUID()` - no `uuid` package required
- **n8n API Version**: 1
- **Minimum Node.js**: 18.0.0
- **License**: MIT

## Node Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Mode | Dropdown | Generate New ID | Choose between fresh ID generation or loop persistence |
| Session Key | String | `aiAgentSession` | Key for static data storage (only in Manage Loop mode) |
| Reset Session | Boolean | `false` | Force new ID generation (only in Manage Loop mode) |

## Why This Exists

Every n8n user building AI workflows hits the same wall: "Where do I get the session ID from?" The official documentation shows expressions and Code nodes, but that's friction that slows down prototyping and frustrates new users.

This node is the answer. It's tiny, focused, and does exactly one thing well.

## Contributing

Issues and pull requests are welcome at [GitHub](https://github.com/flowengine/n8n-nodes-flowengine-ai-session-manager).

## License

[MIT](LICENSE) © FlowEngine
