import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PageHero from '../components/PageHero.vue'

describe('PageHero', () => {
  it('renders title, subtitle and badge', () => {
    const wrapper = mount(PageHero, {
      props: {
        title: 'Open Source Projects',
        subtitle: 'Built with passion',
        badge: '9 projects'
      },
      global: { stubs: { UiIcon: true } }
    })
    expect(wrapper.text()).toContain('Open Source Projects')
    expect(wrapper.text()).toContain('Built with passion')
    expect(wrapper.text()).toContain('9 projects')
    expect(wrapper.find('.page-hero-title').exists()).toBe(true)
  })

  it('hides the badge when not provided', () => {
    const wrapper = mount(PageHero, {
      props: { title: 'X' },
      global: { stubs: { UiIcon: true } }
    })
    expect(wrapper.find('.page-hero-badge').exists()).toBe(false)
  })
})
