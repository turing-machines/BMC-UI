import { createFileRoute, redirect } from "@tanstack/react-router";
import { type AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/lib/api/set";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      const redirectPath = (search as { redirect: string }).redirect || "/info";
      redirect({ to: redirectPath, throw: true });
    }
  },
  component: Login,
});

function Login() {
  const { t } = useTranslation();
  const { mutate: mutateLogin, isPending } = useLoginMutation();
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const rememberMe = (
      form.elements.namedItem("rememberMe") as HTMLInputElement
    ).checked;

    mutateLogin(
      { username, password },
      {
        onSuccess: (data) => {
          setMessage("");
          login(username, data.id, rememberMe);

          // force refresh the same page, natively
          window.location.reload();
        },
        onError: (error) => {
          const msg =
            (error as AxiosError).code === "ERR_BAD_REQUEST"
              ? t("login.errorCredentials")
              : t("login.errorUnknown");
          setMessage(msg);
        },
      }
    );
  };

  return (
    <div className="flex h-128 w-full items-center justify-center md:h-220">
      <main className="size-full rounded-md bg-white p-10 pt-20 shadow-md md:h-auto md:w-96 md:pt-10 dark:bg-neutral-900">
        <h3 className="mb-8 text-center text-3xl font-bold">
          {t("login.header")}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="username"
              name="username"
              label={t("login.username")}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="current-password"
              name="password"
              label={t("login.password")}
            />
          </div>
          <div className="mb-4 flex items-center">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              aria-label={t("login.remember")}
            />
            <label
              htmlFor="rememberMe"
              className="not-sr-only ml-2 text-sm font-semibold"
            >
              {t("login.remember")}
            </label>
          </div>
          <div className="mb-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              isLoading={isPending}
            >
              {t("login.submit")}
            </Button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-red-500" id="responseMessage">
              {message}
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
