import { readdir, writeFile } from 'fs-extra'
import { capitalCase } from 'change-case'

export type IconInfo = {
  name: string
  src: string
  color: string
}

const iconTemplate = (data: IconInfo) => `
  {
    name: "${data.name}",
    src: "${data.src}",
    color: "${data.color}"
  }
`

const iconList = (data: IconInfo[]) => `
  [
    ${data.map(iconTemplate).join(',\n')}
  ]
`

;(async () => {
  const icons = await readdir('public/apps')
  const iconInfos: IconInfo[] = []
  for (const icon of icons) {
    const name = capitalCase(icon.replace('.svg', '').replaceAll('-', ' '))
    const src = `/apps/${icon}`
    const color = 'transparent'
    iconInfos.push({ name, src, color })
  }
  const output = `
    export type IconInfo = {
      name: string
      src: string
      color: string
    }
    export const iconList = ${iconList(iconInfos)}
  `
  await writeFile('src/data/index.ts', output, { encoding: 'utf8', flag: 'w' })
})()
