import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import ModalWrapper from 'src/components/ModalWrapperElements/ModalWrapper'
import createTestApp from 'tests/helpers/create-test-app'
import TestModalWrapper from 'tests/unit/wrappers/TestModalWrapper'

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
    const transition = wrapper.find({ name: 'ExtendedTransitionStub' })

    wrapper.setProps({ value: true })
    await localVue.nextTick()
    transition.vm.triggerEnterHooks()

    expect(wrapper.find('.modal-header').text()).to.equal('Test modal')
    expect(wrapper.find('.modal-header').isVisible()).to.equal(true)

    wrapper.setProps({ title: '' })
    expect(wrapper.find('.modal-header').isVisible()).to.equal(false)
  })

  it('Shows and hides the modal using the value prop', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    expect(wrapper.isVisible()).to.equal(false)

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.isVisible()).to.equal(true)
  })

  it('Makes it possible to utilize all the props of QModal', () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
      },
      attrs: {
        contentCss: { midWidth: '40vw' },
        minimized: true,
        position: 'left',
      },
    })

    const qModal = wrapper.find({ name: 'QModal' })
    expect(qModal.vm.$props.minimized).to.equal(true)
    expect(qModal.vm.$props.contentCss).to.eql({ midWidth: '40vw' })
    expect(qModal.vm.$props.position).to.equal('left')
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

    const loading = wrapper.find({ name: 'QInnerLoading' })

    expect(loading.element.nodeType).to.equal(Node.COMMENT_NODE)
    wrapper.setProps({ showLoading: true })

    await wrapper.vm.$nextTick()
    expect(loading.find('.q-inner-loading').isVisible()).to.equal(true)
  })

  it('Validates it opens and closes the modal correctly using v-model', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })

    wrapper.setMethods({ $emit: sinon.fake() })

    const qModal = wrapper.find({ name: 'QModal' })
    const transition = wrapper.find({ name: 'ExtendedTransitionStub' })

    // default closed correct
    expect(qModal.props().value).to.equal(false)

    // prop: close to open
    wrapper.setProps({ value: true })
    await localVue.nextTick()
    transition.vm.triggerEnterHooks()

    expect(qModal.emitted('show')).to.eql([[undefined]])
    expect(qModal.props().value).to.equal(true)

    // prop: open to close
    wrapper.setProps({ value: false })
    await localVue.nextTick()
    transition.vm.triggerLeaveHooks()

    expect(qModal.emitted('hide')).to.eql([[undefined]])
    expect(qModal.props().value).to.equal(false)

    const submitBtn = wrapper.find('[data-name="submit-modal-wrapper"]')
    const abortBtn = wrapper.find('[data-name="abort-modal-wrapper"]')

    const buttonsElement = wrapper.find({ name: 'ModalWrapperButtons' })

    // test buttons
    submitBtn.trigger('click')
    await qModal.vm.$nextTick()
    expect(buttonsElement.emitted('submit')[0]).to.eql([])

    abortBtn.trigger('click')
    await qModal.vm.$nextTick()
    expect(buttonsElement.emitted('close')[0]).to.eql([])
  })

  it('Validates it opens and closes the modal correctly using refs', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
    })
    const qModal = wrapper.find({ name: 'QModal' })

    // default closed correct
    expect(qModal.props().value).to.equal(false)

    wrapper.vm.show()

    await wrapper.vm.$nextTick()

    expect(qModal.props().value).to.equal(true)

    wrapper.vm.hide()

    await wrapper.vm.$nextTick()

    expect(qModal.props().value).to.equal(false)
  })

  it('Passes all modal events to next parent', async () => {
    const wrapper = mount(TestModalWrapper, {
      localVue,
    })

    wrapper.setMethods({ atShow: sinon.fake(), atHide: sinon.fake(), atEscape: sinon.fake() })
    const qModal = wrapper.find({ name: 'QModal' })

    expect(wrapper.vm.atShow).not.to.have.been.called
    expect(wrapper.vm.atHide).not.to.have.been.called
    expect(wrapper.vm.atEscape).not.to.have.been.called

    qModal.vm.$emit('escape-key')
    qModal.vm.$emit('show')
    qModal.vm.$emit('hide')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.atShow).to.have.been.called
    expect(wrapper.vm.atHide).to.have.been.called
    expect(wrapper.vm.atEscape).to.have.been.called
  })
})
