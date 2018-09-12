import { mount } from '@vue/test-utils'
import createTestApp from 'test/helpers/create-test-app'
import ModalWrapper from 'src/components/ModalWrapper'
import TestModalWrapper from 'test/unit/wrappers/TestModalWrapper'

const localVue = createTestApp()

describe('ModalWrapper.vue', () => {
  it('Displays title in modal header and hides element when empty', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
      },
    })
    const transition = wrapper.find({name: 'ExtendedTransitionStub'})

    wrapper.setProps({value: true})
    await localVue.nextTick()
    transition.vm.triggerEnterHooks()

    expect(wrapper.find('.modal-header').text()).toBe('Test modal')
    expect(wrapper.find('.modal-header').isVisible()).toBe(true)

    wrapper.setProps({title: ''})
    expect(wrapper.find('.modal-header').isVisible()).toBe(false)
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

  it('Validates it opens and closes the modal correctly using v-model', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    wrapper.setMethods({$emit: jest.fn()})

    const qModal = wrapper.find({name: 'QModal'})
    const transition = wrapper.find({name: 'ExtendedTransitionStub'})

    // default closed correct
    expect(qModal.props().value).toBe(false)

    // prop: close to open
    wrapper.setProps({value: true})
    await localVue.nextTick()
    transition.vm.triggerEnterHooks()

    expect(qModal.emitted('show')).toEqual([[undefined]])
    expect(qModal.props().value).toBe(true)

    // prop: open to close
    wrapper.setProps({value: false})
    await localVue.nextTick()
    transition.vm.triggerLeaveHooks()

    expect(qModal.emitted('hide')).toEqual([[undefined]])
    expect(qModal.props().value).toBe(false)

    // test submit
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

    await wrapper.vm.$nextTick()

    expect(qModal.props().value).toBe(true)

    wrapper.vm.close()

    await wrapper.vm.$nextTick()

    expect(qModal.props().value).toBe(false)
  })

  it('Passes all modal events to next parent', async () => {
    const wrapper = mount(TestModalWrapper, {
      localVue,
    })

    wrapper.setMethods({atShow: jest.fn(), atHide: jest.fn(), atEscape: jest.fn()})
    const qModal = wrapper.find({name: 'QModal'})

    expect(wrapper.vm.atShow).not.toHaveBeenCalled()
    expect(wrapper.vm.atHide).not.toHaveBeenCalled()
    expect(wrapper.vm.atEscape).not.toHaveBeenCalled()

    qModal.vm.$emit('escape-key')
    qModal.vm.$emit('show')
    qModal.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.atShow).toHaveBeenCalled()
    expect(wrapper.vm.atHide).toHaveBeenCalled()
    expect(wrapper.vm.atEscape).toHaveBeenCalled()
  })
})
