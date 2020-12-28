# Kiosk

## Meta

- **State**: production
- **Production**:
  - **URL**: https://kiosk.work.damonzucconi.com/
  - **URL**: https://damonzucconi-kiosk.netlify.app/
- **Host**: https://app.netlify.com/sites/damonzucconi-kiosk/overview
- **Deploys**: Merged PRs to `dzucconi/kiosk#master` are automatically deployed to production. [Manually trigger a deploy](https://app.netlify.com/sites/damonzucconi-kiosk/deploys)

## Parameters

| Param      | Description                            | Type     | Default                                  |
| ---------- | -------------------------------------- | -------- | ---------------------------------------- |
| `id`       | Auspic.es collection ID                | `string` | `"49ee7cb3-a05a-463b-9ebb-5c1b59787d1b"` |
| `interval` | Time in milliseconds between refreshes | `number` | `900000` (15 minutes)                    |
