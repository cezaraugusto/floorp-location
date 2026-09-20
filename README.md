[npm-version-image]: https://img.shields.io/npm/v/floorp-location.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/floorp-location
[npm-downloads-image]: https://img.shields.io/npm/dm/floorp-location.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/floorp-location
[action-image]: https://github.com/cezaraugusto/floorp-location/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/floorp-location/actions
[npm-provenance-image]: https://img.shields.io/badge/provenance-verified-0971fe?logo=npm&logoColor=white
[npm-provenance-url]: https://www.npmjs.com/package/floorp-location

> Approximates the current location of the Floorp browser across platforms.

# floorp-location [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url] [![Provenance][npm-provenance-image]][npm-provenance-url]


- By default checks only `stable`.
- Supports macOS / Windows / Linux
- Works both as an ES module or CommonJS

## Installation

```bash
npm i floorp-location
```

## Support table

This table lists the default locations where Floorp is typically installed for each supported platform and channel. By default, only the Stable channel is checked.

<table>
  <thead>
    <tr>
      <th>Platform</th>
      <th>Channel</th>
      <th>Paths checked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/macos.png" /><br><strong>macOS</strong></td>
      <td align="center">Floorp (Stable)</td>
      <td>
        <ul>
          <li><code>/Applications/Floorp.app/Contents/MacOS/Floorp</code></li>
          <li><code>~/Applications/Floorp.app/Contents/MacOS/Floorp</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/windows.png" /><br><strong>Windows</strong></td>
      <td align="center">Floorp (Stable)</td>
      <td>
        <ul>
          <li><code>%LOCALAPPDATA%\Floorp\floorp.exe</code></li>
          <li><code>%PROGRAMFILES%\Floorp\floorp.exe</code></li>
          <li><code>%PROGRAMFILES(X86)%\Floorp\floorp.exe</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td align="center"><img alt="" width="64" height="64" src="https://cdn.jsdelivr.net/gh/extension-js/media@db5deb23fbfa85530f8146718812972998e13a4d/platform_logos/linux.png" /><br><strong>Linux/other</strong></td>
      <td align="center">Floorp (Stable)</td>
      <td>
        <ul>
          <li><code>floorp</code> (on <code>$PATH</code>)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Returns the first existing path found (given selected channels), or <code>null</code> if none are found.

## Usage

**Via Node.js (strict by default):**

```js
import floorpLocation from 'floorp-location'
import {
  locateFloorpOrExplain,
  getInstallGuidance,
  getFloorpVersion
} from 'floorp-location'

// Strict (Stable only)
console.log(floorpLocation())
// => "/Applications/Floorp.app/Contents/MacOS/Floorp" or null

// Throw with an install guide when not found
try {
  const bin = locateFloorpOrExplain({allowFallback: true})
  console.log(bin)

  // Cross-platform version (no exec by default)
  console.log(getFloorpVersion(bin)) // e.g. "128.0" or null

  // Opt-in: allow executing the binary (Linux/other)
  console.log(getFloorpVersion(bin, {allowExec: true}))
} catch (e) {
  console.error(String(e))
  // Or print getInstallGuidance() explicitly
}
```

**CommonJS:**

```js
const api = require('floorp-location')
const locateFloorp = api.default || api
```

**Via CLI:**

```bash
npx floorp-location

# Respect environment overrides
FLOORP_BINARY=/custom/path/to/floorp npx floorp-location

# Print browser version (empty + exit code 2 if unavailable)
npx floorp-location --floorp-version
npx floorp-location --browser-version

# Opt-in: allow executing the binary to fetch version
npx floorp-location --browser-version --allow-exec
```

### Environment overrides

If this environment variable is set and points to an existing binary, it takes precedence:

- `FLOORP_BINARY`

## API

- `default export locateFloorp(allowFallback?: boolean): string | null`
- `locateFloorpOrExplain(options?: boolean | { allowFallback?: boolean }): string`
- `getFloorpVersion(bin: string, opts?: { allowExec?: boolean }): string | null`
- `getInstallGuidance(): string`

## Related projects

- [brave-location](https://github.com/cezaraugusto/brave-location)
- [chrome-location2](https://github.com/cezaraugusto/chrome-location2)
- [chromium-location](https://github.com/cezaraugusto/chromium-location)
- [edge-location](https://github.com/cezaraugusto/edge-location)
- [firefox-location2](https://github.com/cezaraugusto/firefox-location2)
- [safari-location2](https://github.com/cezaraugusto/safari-location2)
- [opera-location2](https://github.com/cezaraugusto/opera-location2)
- [vivaldi-location2](https://github.com/cezaraugusto/vivaldi-location2)
- [waterfox-location](https://github.com/cezaraugusto/waterfox-location)
- [yandex-location](https://github.com/cezaraugusto/yandex-location)

## License

MIT (c) Cezar Augusto.


