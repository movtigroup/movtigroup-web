// composables/useCollaborations.ts
// Single source of truth for our open-source collaborations — used by the
// Projects page slider, the homepage section and the Collaborations page.
// tag/description come from i18n so both locales stay complete.
export interface Collab {
  name: string
  tag: string
  description: string
  url: string
  icon:
    | { kind: 'brand'; value: string; raw?: boolean }
    | { kind: 'ui'; value: string }
}

export const useCollaborations = () => {
  const { t } = useI18n()

  return computed<Collab[]>(() => [
    {
      name: 'Cherry Studio',
      tag: t('collaborations.items.cherry.tag'),
      description: t('collaborations.items.cherry.desc'),
      url: 'https://github.com/CherryHQ/cherry-studio',
      icon: { kind: 'brand', value: 'cherrystudio-color', raw: true }
    },
    {
      name: 'Hermes Agent',
      tag: t('collaborations.items.hermes.tag'),
      description: t('collaborations.items.hermes.desc'),
      url: 'https://github.com/NousResearch/hermes-agent',
      icon: { kind: 'brand', value: 'nousresearch' }
    },
    {
      name: 'Kilo Code',
      tag: t('collaborations.items.kilo.tag'),
      description: t('collaborations.items.kilo.desc'),
      url: 'https://github.com/kilo-org/kilo',
      icon: { kind: 'brand', value: 'kilocode' }
    },
    {
      name: 'Dirac.run',
      tag: t('collaborations.items.dirac.tag'),
      description: t('collaborations.items.dirac.desc'),
      url: 'https://github.com/dirac-run/dirac',
      icon: { kind: 'ui', value: 'atom' }
    }
  ])
}
