import {expect, test, describe} from 'vitest'

import floorpLocation, {getInstallGuidance} from '../src/index'

describe('floorp-location module', () => {
  it('returns string or null', () => {
    const res = floorpLocation()

    expect(typeof res === 'string' || res === null).toBe(true)
  })

  it('getInstallGuidance renders caller-provided install steps in order', () => {
    const msg = getInstallGuidance({
      steps: [
        {
          summary: 'Install Floorp for Testing (recommended)',
          command: 'npx extension install floorp'
        },
        {
          summary: 'Install Floorp',
          command: 'npx extension install floorp-stable'
        }
      ]
    })

    expect(msg).toMatch(
      new RegExp(
        '1\\) Install Floorp for Testing \\(recommended\\)\\n' +
          ' {3}npx extension install floorp'
      )
    )
    expect(msg).toMatch(
      /2\) Install Floorp\n {3}npx extension install floorp-stable/
    )
    expect(msg).not.toMatch(/Install Floorp from the official site/)
    expect(msg).toMatch(/We couldn't find a Floorp browser/)
  })

  it('getInstallGuidance with empty steps keeps the default hint', () => {
    expect(getInstallGuidance({steps: []})).toBe(getInstallGuidance())
  })
})
