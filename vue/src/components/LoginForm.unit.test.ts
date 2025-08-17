import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue'

test('送信ボタンがクリックされるとユーザー名とパスワードで onSubmit が呼び出される', async () => {
  const handleSubmit = vi.fn()
  const wrapper = mount(LoginForm, {
    props: { onSubmit: handleSubmit },
  })
  const user = { username: 'michelle', password: 'smith' }

  await wrapper.find('input[type="text"]').setValue(user.username)
  await wrapper.find('input[type="password"]').setValue(user.password)
  await wrapper.find('form').trigger('submit')

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(user.username, user.password)
})

test('ユーザー名が提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される', async () => {
  const handleSubmit = vi.fn()
  const wrapper = mount(LoginForm, {
    props: { onSubmit: handleSubmit },
  })

  await wrapper.find('input[type="password"]').setValue('anything')
  await wrapper.find('form').trigger('submit')

  const errorMessage = wrapper.find('[role="alert"]')
  expect(errorMessage.text()).toMatch(/username is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})

test('パスワードが提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される', async () => {
  const handleSubmit = vi.fn()
  const wrapper = mount(LoginForm, {
    props: { onSubmit: handleSubmit },
  })

  await wrapper.find('input[type="text"]').setValue('anything')
  await wrapper.find('form').trigger('submit')

  const errorMessage = wrapper.find('[role="alert"]')
  expect(errorMessage.text()).toMatch(/password is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})
