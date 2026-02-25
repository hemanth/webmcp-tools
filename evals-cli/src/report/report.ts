/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Config, WebmcpConfig } from "../types/config.js";
import { Message, TestResult, TestResults } from "../types/evals.js";
import { matchesArgument } from "../matcher.js";

// --- Base Styled Shell ---
function renderHtmlShell(
    title: string,
    configHtml: string,
    testResults: TestResults
): string {
    const passRate = (
        (testResults.passCount / (testResults.passCount + testResults.failCount)) * 100
    ).toFixed(1);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #f8f9fa;
            --surface: #ffffff;
            --text-primary: #202124;
            --text-secondary: #5f6368;
            --border-color: #dadce0;
            --primary: #1a73e8;
            
            --pass-bg: #e6f4ea;
            --pass-text: #137333;
            --fail-bg: #fce8e6;
            --fail-text: #c5221f;
            --error-bg: #fef7e0;
            --error-text: #b06000;
            
            --chat-user-bg: #e8f0fe;
            --chat-model-bg: #f1f3f4;
            --chat-system-bg: #fff3e0;
        }

        body {
            font-family: 'Roboto', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-primary);
            margin: 0;
            padding: 32px;
            line-height: 1.5;
        }

        h1 {
            font-size: 28px;
            font-weight: 400;
            margin-top: 0;
            margin-bottom: 24px;
            color: var(--text-primary);
        }

        h2, h3 {
            font-weight: 500;
            margin-top: 0;
        }

        .card {
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
        }

        .metric-grid {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
        }

        .metric {
            display: flex;
            flex-direction: column;
        }

        .metric-label {
            font-size: 12px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
        }

        .metric-value {
            font-size: 24px;
            font-weight: 400;
        }

        .config-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 16px;
        }

        .config-list li {
            display: flex;
            flex-direction: column;
        }

        .config-list strong {
            font-size: 12px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        code, pre {
            font-family: 'Roboto Mono', monospace;
            font-size: 13px;
            background: #f1f3f4;
            padding: 2px 6px;
            border-radius: 4px;
        }

        pre {
            padding: 16px;
            margin: 8px 0;
            overflow-x: auto;
            border: 1px solid var(--border-color);
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .test-row details {
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
        }

        .test-summary {
            padding: 16px 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fafafa;
            font-weight: 500;
            user-select: none;
        }
        
        .test-summary:hover {
            background: #f1f3f4;
        }

        .test-content {
            padding: 24px;
            border-top: 1px solid var(--border-color);
        }

        .badge {
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge.pass { background: var(--pass-bg); color: var(--pass-text); }
        .badge.fail { background: var(--fail-bg); color: var(--fail-text); }
        .badge.error { background: var(--error-bg); color: var(--error-text); }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
        }

        th, td {
            text-align: left;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }

        th {
            background: #fafafa;
            font-weight: 500;
            color: var(--text-secondary);
        }

        /* Chat bubbles */
        .chat-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;
            margin-bottom: 24px;
        }

        .chat-bubble {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .chat-bubble-user {
            align-self: flex-end;
            background: var(--chat-user-bg);
            border-color: #d2e3fc;
        }

        .chat-bubble-model {
            align-self: flex-start;
            background: var(--chat-model-bg);
        }

        .chat-bubble-system {
            align-self: center;
            background: var(--chat-system-bg);
            border-color: #ffe0b2;
            width: 100%;
            text-align: center;
            font-style: italic;
        }

        .chat-header {
            font-size: 12px;
            font-weight: 500;
            color: var(--text-secondary);
            margin-bottom: 4px;
            text-transform: uppercase;
        }
        
        h4 {
            margin-top: 24px;
            margin-bottom: 8px;
            color: var(--text-secondary);
            font-weight: 500;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 4px;
        }
    </style>
</head>
<body>
    <h1>${title}</h1>
    
    <div class="card">
        <h2>Configuration</h2>
        ${configHtml}
    </div>

    <div class="card">
        <h2>Summary</h2>
        <div class="metric-grid">
            <div class="metric">
                <span class="metric-label">Total Evals</span>
                <span class="metric-value">${testResults.testCount}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Passed</span>
                <span class="metric-value" style="color: var(--pass-text)">${testResults.passCount}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Failed</span>
                <span class="metric-value" style="color: var(--fail-text)">${testResults.failCount}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Errors</span>
                <span class="metric-value" style="color: var(--error-text)">${testResults.errorCount}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Pass Rate</span>
                <span class="metric-value">${passRate}%</span>
            </div>
        </div>
    </div>

    <h2>Evaluation Details</h2>
    <ul class="details-list">
        ${renderDetails(testResults.results)}
    </ul>
</body>
</html>`;
}

// --- Specific Report Generators ---

export function renderReport(config: Config, testResults: TestResults): string {
    const configHtml = `
    <ul class="config-list">
        <li><strong>Tool Definitions</strong> <code>${config.toolSchemaFile}</code></li>
        <li><strong>Evals File</strong> <code>${config.evalsFile}</code></li>
        <li><strong>Backend Engine</strong> <code>${config.backend || 'Native'}</code></li>
        <li><strong>Model</strong> <code>${config.model}</code></li>
    </ul>`;

    return renderHtmlShell("Local Configuration Evaluation Results", configHtml, testResults);
}

export function renderWebmcpReport(config: WebmcpConfig, testResults: TestResults): string {
    const configHtml = `
    <ul class="config-list">
        <li><strong>Target URL</strong> <code>${config.url}</code></li>
        <li><strong>Evals File</strong> <code>${config.evalsFile}</code></li>
        <li><strong>Backend Engine</strong> <code>${config.backend}</code></li>
        <li><strong>Model</strong> <code>${config.model}</code></li>
    </ul>`;

    return renderHtmlShell("WebMCP Evaluation Results", configHtml, testResults);
}

// --- Detail Renders ---

function renderDetails(testResults: Array<TestResult>): string {
    return testResults.map((t, i) => renderDetail(i + 1, t)).join("");
}

function renderDetail(testNumber: number, testResult: TestResult): string {
    const outcomeClass = testResult.outcome.toLowerCase();

  const functionNameOutcome =
      testResult.test.expectedCall?.[0]?.functionName === testResult.response?.functionName
          ? "pass" : "fail";

  const argsOutcome = matchesArgument(
      testResult.test.expectedCall?.[0]?.arguments,
    testResult.response?.args,
    ) ? "pass" : "fail";

    return `
    <li class="test-row">
        <details>
            <summary class="test-summary">
                <span>Test #${testNumber}</span>
                <span class="badge ${outcomeClass}">${testResult.outcome}</span>
            </summary>
            
            <div class="test-content">
                <h4>Message History Context</h4>
                <div class="chat-container">
                    ${renderMessages(testResult.test.messages)}
                </div>

                <h4>Execution Output</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Expected Target</th>
                            <th>Actual Output</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Function Name</strong></td>
                            <td><code>${testResult.test.expectedCall?.[0]?.functionName || 'null'}</code></td>
                            <td><code>${testResult.response?.functionName || 'null'}</code></td>
                            <td><span class="badge ${functionNameOutcome}">${functionNameOutcome}</span></td>
                        </tr>
                        <tr>
                            <td><strong>Arguments Payload</strong></td>
                            <td><pre>${JSON.stringify(testResult.test.expectedCall?.[0]?.arguments || null, null, 2)}</pre></td>
                            <td><pre>${JSON.stringify(testResult.response?.args || null, null, 2)}</pre></td>
                            <td><span class="badge ${argsOutcome}">${argsOutcome}</span></td>
                        </tr>
                    </tbody>
                </table>

                ${testResult.outcome === 'error' ? `
                    <h4>Pipeline Error Trace</h4>
                    <pre style="color: var(--fail-text); border-color: var(--fail-bg); background: #fdf5f5;">${JSON.stringify(testResult.response, null, 2)}</pre>
                ` : ''}
            </div>
        </details>
    </li>`;
}

function renderMessages(messages: Array<Message>): string {
    return messages.map(renderMessage).join("");
}

function renderMessage(message: Message): string {
    let contentHtml = "";
    let bubbleClass = "";
    let headerTitle = "";

  switch (message.type) {
    case "message":
          contentHtml = `<div>${message.content.replace(/\\n/g, '<br>')}</div>`;
          bubbleClass = message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model';
          headerTitle = message.role === 'user' ? 'User Instruction' : 'Agent Thinking/Reply';
          if (message.role === 'system' as any) {
              bubbleClass = 'chat-bubble-system';
              headerTitle = 'System Instruction';
          }
      break;

    case "functioncall":
          contentHtml = `<pre>${JSON.stringify({ function: message.name, args: message.arguments }, null, 2)}</pre>`;
          bubbleClass = 'chat-bubble-model';
          headerTitle = `Tool Execution: ${message.name}`;
      break;

    case "functionresponse":
          contentHtml = `<pre>${JSON.stringify(message.response, null, 2)}</pre>`;
          bubbleClass = 'chat-bubble-user';
          headerTitle = `Tool Result: ${message.name}`;
      break;
  }

  return `
    <div class="chat-bubble ${bubbleClass}">
        <div class="chat-header">${headerTitle}</div>
        ${contentHtml}
    </div>`;
}
