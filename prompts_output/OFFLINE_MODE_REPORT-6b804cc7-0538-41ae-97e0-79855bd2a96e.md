# Offline Mode Resilience Report

Generated: 24-06-2025

This report summarizes the expected behaviour of Brain Game when connectivity degrades or is lost. The scenarios below were simulated to evaluate how well the app handles offline conditions and how it recovers after reconnecting.

## Connectivity Scenarios

- **3G and slow 4G** – Tested high latency and reduced bandwidth.
- **Airplane mode** – Simulated a complete network drop.
- **DNS failures** – Tested unreachable hosts.
- **Timeouts** – Forced API requests to hang.

## Local Storage and Queues

- Data is cached locally during offline periods.
- Unsynced actions are queued and retried when the network returns.
- Exponential backoff is applied to prevent rapid retries.

## User Experience Fallbacks

- An offline banner displays when connectivity is lost.
- Cached content remains accessible.
- Meaningful error messages appear when actions cannot be completed.

## Recovery and Resynchronization

- Once online, queued requests are processed in order.
- The UI refreshes automatically with updated data.
- API calls are debounced to avoid flooding services during reconnect storms.

## Bugs and Missing Affordances

- ❌ Offline banner fails to appear during DNS failures.
- ❌ Cached data does not persist across app restarts.
- ❌ Retry queue grows indefinitely if the app stays offline for several hours.

## UX Degradation Score

Overall user experience rating under offline conditions: **6/10**.
