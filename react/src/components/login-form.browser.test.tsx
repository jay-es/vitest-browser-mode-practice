import { test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent, page } from "@vitest/browser/context";

import LoginForm from "./login-form";

test("送信ボタンがクリックされるとユーザー名とパスワードで onSubmit が呼び出される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  const user = { username: "michelle", password: "smith" };

  await userEvent.type(page.getByLabelText(/username/i), user.username);
  await userEvent.type(page.getByLabelText(/password/i), user.password);
  await userEvent.click(page.getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(user);
});

test("ユーザー名が提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(page.getByLabelText(/password/i), "anything");
  await userEvent.click(page.getByText(/submit/i));

  const errorMessage = page.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/username is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("パスワードが提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(page.getByLabelText(/username/i), "anything");
  await userEvent.click(page.getByText(/submit/i));

  const errorMessage = page.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/password is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});
