# PERF_COST_DIAGNOSIS-e8d4e463-b07c-45bd-9c73-2f783cf70d24

Key Metrics:
- API TTFB avg: 16ms (https://api.braingame.com)
- API latency avg: ~20ms
- Server CPU idle: 96%
- Memory usage: ~400MB used of 10GB
- Bundle build blocked due to font downloads (requires offline fonts)
- Container density: single Node process

Hotspots & Gaps:
- Minimal API routes, so latency dominated by network overhead
- Build process stalls on external font fetch, increasing CI time
- No caching layer for health checks, but negligible impact

Costs:
- Cloud run ephemeral instance estimated $0.002 per request
- Static site hosting negligible (<$0.001 per request)

Flame graph snapshot:
```
(Not available in environment)
```

30‑Day Optimisation Roadmap:
1. Disable font download in Next.js build to avoid network stalls.
2. Set up CDN caching for API responses and static assets.
3. Instrument server with profiling (node --prof) to capture flame graphs.
4. Monitor container CPU/memory with Prometheus; tune autoscaling.
5. Implement request tracing to detect slow paths.
6. Evaluate serverless deployment for lower idle cost.

