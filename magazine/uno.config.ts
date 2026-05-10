import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    colors: {
      washi: '#FAFAF7',
      sumi: '#2D2D2D',
      cha: '#8B7355',
      kin: '#C4A35A',
      kare: '#D4C5B2',
      akebono: '#F5EDE3',
      sakura: '#F0E6DC',
      iwa: '#6B6B6B',
    },
    fontFamily: {
      sans: '"Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif',
    },
  },
  shortcuts: {
    'card': 'rounded-lg p-6 shadow-sm',
    'divider': 'w-full h-px bg-kare',
  },
})
