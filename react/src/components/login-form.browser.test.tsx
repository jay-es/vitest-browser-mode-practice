import { test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "@vitest/browser/context";
import LoginForm from "./login-form";

test("送信ボタンがクリックされるとユーザー名とパスワードで onSubmit が呼び出される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  const user = { username: "michelle", password: "smith" };

  await page.getByLabelText(/username/i).fill(user.username);
  await page.getByLabelText(/password/i).fill(user.password);
  await page.getByText(/submit/i).click();

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(user);
});

test("ユーザー名が提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await page.getByLabelText(/password/i).fill("anything");
  await page.getByText(/submit/i).click();

  const errorMessage = page.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/username is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("パスワードが提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await page.getByLabelText(/username/i).fill("anything");
  await page.getByText(/submit/i).click();

  const errorMessage = page.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/password is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});
