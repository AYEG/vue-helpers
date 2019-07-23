import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import ModalWrapper from 'src/components/ModalWrapperElements/ModalWrapper'
import createTestApp from 'tests/helpers/create-test-app'
import { QDialogStub } from '@laura-wert/vue-test-helpers'

const localVue = createTestApp()
describe('ModalWrapper.vue', () => {
  it('Displays title in modal header and hides element when empty', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
      },
      stubs: { QDialog: QDialogStub },
    })
    const transition = wrapper.find({ name: 'ExtendedTransitionStub' })

    wrapper.setProps({ value: true })
    await localVue.nextTick()
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
      stubs: { QDialog: QDialogStub },
    })
    expect(wrapper.isVisible()).to.equal(false)

    wrapper.setProps({ value: true })

    await wrapper.vm.$nextTick()

    expect(wrapper.isVisible()).to.equal(true)
  })

  it('Shows full screen loading screen when isLoading prop is true', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: true,
        title: 'Test modal',
        isLoading: false,
      },
      stubs: { QDialog: QDialogStub },
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
      stubs: { QDialog: QDialogStub },
    })

    wrapper.setMethods({ $emit: sinon.fake() })

    const qDialog = wrapper.find({ name: 'QDialog' })
    const transition = wrapper.find({ name: 'ExtendedTransitionStub' })

    // default closed correct
    expect(qDialog.props().value).to.equal(false)

    // prop: close to open
    wrapper.setProps({ value: true })
    await wrapper.vm.$nextTick()

    expect(qDialog.props().value).to.equal(true)

    // prop: open to close
    wrapper.setProps({ value: false })
    await localVue.nextTick()

    expect(qDialog.props().value).to.equal(false)

    const submitBtn = wrapper.find('[data-name="submit-modal-wrapper"]')
    const abortBtn = wrapper.find('[data-name="abort-modal-wrapper"]')

    const buttonsElement = wrapper.find({ name: 'ModalWrapperButtons' })

    // test buttons
    submitBtn.trigger('click')
    await qDialog.vm.$nextTick()
    expect(buttonsElement.emitted('submit')[0]).to.eql([])

    abortBtn.trigger('click')
    await qDialog.vm.$nextTick()
    expect(buttonsElement.emitted('close')[0]).to.eql([])
  })

  it('Validates it opens and closes the modal correctly using refs', async () => {
    const wrapper = mount(ModalWrapper, {
      localVue,
      propsData: {
        value: false,
        title: 'Test modal',
      },
      stubs: { QDialog: QDialogStub },
    })
    const QDialog = wrapper.find({ name: 'QDialog' })

    // default closed correct
    expect(QDialog.props().value).to.equal(false)

    wrapper.vm.show()

    await wrapper.vm.$nextTick()

    expect(QDialog.props().value).to.equal(true)

    wrapper.vm.hide()

    await wrapper.vm.$nextTick()

    expect(QDialog.props().value).to.equal(false)
  })
})
