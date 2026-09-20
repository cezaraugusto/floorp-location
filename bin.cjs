#!/usr/bin/env node

'use strict'

const api = require('./dist/index.cjs')

const locateFloorp = api.default || api
const {getFloorpVersion} = api
const {getInstallGuidance} = api

const argv = process.argv.slice(2)
const allowFallback = argv.includes('--fallback') || argv.includes('-f')
const printBrowserVersion =
  argv.includes('--floorp-version') || argv.includes('--browser-version')

const allowExec = argv.includes('--allow-exec')

try {
  const floorpPath =
    (typeof locateFloorp === 'function' && locateFloorp(allowFallback)) ||
    (typeof locateFloorp === 'function' && locateFloorp(true)) ||
    null

  if (!floorpPath) {
    const guidance =
      (typeof getInstallGuidance === 'function' && getInstallGuidance()) ||
      'Floorp not found.'

    console.error(guidance)
    process.exit(1)
  }

  if (printBrowserVersion && typeof getFloorpVersion === 'function') {
    const v = getFloorpVersion(floorpPath, {allowExec})

    if (!v) {
      console.log('')
      process.exit(2)
    }

    console.log(String(v))
    process.exit(0)
  }

  console.log(String(floorpPath))
} catch (e) {
  console.error(String(e?.message ? e.message : e))
  process.exit(1)
}
