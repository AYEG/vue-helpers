import { mount, createLocalVue } from '@vue/test-utils'
import ModalWrapper from 'src/components/ModalWrapper'
import quasar from 'quasar'

const localVue = createLocalVue()
localVue.use(quasar)

describe('ModalWrapper.vue', () => {
  it('Displays title in modal header', () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    expect(wrapper.find('.modal-header').text()).toBe('Test modal')
  })

  it('Shows and hides the modal using the value prop', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    expect(wrapper.isVisible()).toBe(false)

    wrapper.setProps({value: true})

    await wrapper.vm.$nextTick()

    expect(wrapper.isVisible()).toBe(true)
  })

  it('Makes it possible to utilize all the props of QModal', () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
      },
      attrs: {
        contentCss: {midWidth: '40vw'},
        minimized: true,
        position: 'left',
      },
    })

    const qModal = wrapper.find({name: 'QModal'})
    expect(qModal.vm.$props.minimized).toBe(true)
    expect(qModal.vm.$props.contentCss).toEqual({'midWidth': '40vw'})
    expect(qModal.vm.$props.position).toBe('left')
  })

  it('Shows full screen loading screen when isLoading prop is true', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
        isLoading: false,
      },
    })

    const loading = wrapper.find({name: 'QInnerLoading'})

    expect(loading.element.nodeType).toBe(Node.COMMENT_NODE)
    wrapper.setProps({showLoading: true})

    await wrapper.vm.$nextTick()
    expect(loading.find('.q-inner-loading').isVisible()).toBe(true)
  })

  it('Validates it opens and closes the modal correctly using v-modal', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    wrapper.setMethods({$emit: jest.fn()})

    const qModal = wrapper.find({name: 'QModal'})

    // default closed correct
    expect(qModal.props().value).toBe(false)

    // prop: close to open
    wrapper.setProps({value: true})
    expect(qModal.props().value).toBe(true)

    // prop: open to close
    wrapper.setProps({value: false})
    expect(qModal.props().value).toBe(false)

    wrapper.find('.confirm').trigger('click')
    expect(wrapper.vm.$emit).toBeCalledWith('submit')

    wrapper.find('.abort').trigger('click')
    expect(wrapper.vm.$emit).toBeCalledWith('input', false)
  })

  it('Validates it opens and closes the modal correctly using refs', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })
    const qModal = wrapper.find({name: 'QModal'})

    // default closed correct
    expect(qModal.props().value).toBe(false)

    wrapper.vm.open()

    wrapper.update()

    expect(qModal.props().value).toBe(true)

    wrapper.vm.close()

    wrapper.update()

    expect(qModal.props().value).toBe(false)
  })
})
