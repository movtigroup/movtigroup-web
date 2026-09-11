// composables/useCollaborations.ts
// Single source of truth for our open-source collaborations — used by the
// Projects page slider, the homepage section and the Collaborations page.
export interface Collab {
  name: string
  tag: string
  description: string
  url: string
  icon:
    | { kind: 'brand'; value: string; raw?: boolean }
    | { kind: 'ui'; value: string }
}

export const useCollaborations = (): Collab[] => [
  {
    name: 'Cherry Studio',
    tag: 'AI Client — Desktop & Mobile',
    description:
      'Open-source AI productivity studio with smart chat, autonomous agents and 300+ assistants. MovtiGroup collaborates on both the desktop and the mobile applications — testing, localization and community support.',
    url: 'https://github.com/CherryHQ/cherry-studio',
    icon: { kind: 'brand', value: 'cherrystudio-color', raw: true }
  },
  {
    name: 'Hermes Agent',
    tag: 'AI Agent Framework',
    description:
      'Self-hosted AI agent framework by NousResearch with deep integration for developers and teams seeking full control. MovtiGroup contributes to development and testing.',
    url: 'https://github.com/NousResearch/hermes-agent',
    icon: { kind: 'brand', value: 'nousresearch' }
  },
  {
    name: 'Kilo Code',
    tag: 'AI Coding Assistant',
    description:
      'Open-source AI coding assistant with model routing, benchmarking, and autonomous coding capabilities. MovtiGroup contributes to model integration and testing.',
    url: 'https://github.com/kilo-org/kilo',
    icon: { kind: 'brand', value: 'kilocode' }
  },
  {
    name: 'Dirac.run',
    tag: 'AI Inference Platform',
    description:
      'Advanced AI agent platform for automated task execution, research, and multi-step problem solving. MovtiGroup contributes to optimization and deployment processes.',
    url: 'https://github.com/dirac-run/dirac',
    icon: { kind: 'ui', value: 'atom' }
  }
]
