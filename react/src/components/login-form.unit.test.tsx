import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./login-form";

test("送信ボタンがクリックされるとユーザー名とパスワードで onSubmit が呼び出される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);
  const user = { username: "michelle", password: "smith" };

  await userEvent.type(screen.getByLabelText(/username/i), user.username);
  await userEvent.type(screen.getByLabelText(/password/i), user.password);
  await userEvent.click(screen.getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(user);
});

test("ユーザー名が提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/password/i), "anything");
  await userEvent.click(screen.getByText(/submit/i));

  const errorMessage = screen.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/username is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});

test("パスワードが提供されていない状態で送信ボタンがクリックされるとエラーメッセージが表示される", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await userEvent.type(screen.getByLabelText(/username/i), "anything");
  await userEvent.click(screen.getByText(/submit/i));

  const errorMessage = screen.getByRole("alert");
  expect(errorMessage).toHaveTextContent(/password is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});
