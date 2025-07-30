import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { FormEventHandler, useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const LoginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["users", "me"]})
    },
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault(),
      LoginMutation.mutate()
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input required name="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
      </FormField>
      <FormField label="Пароль">
        <input required name="password" onChange={(e) => setPassword(e.target.value)} value={password} type="password" />
      </FormField>

      {LoginMutation.error && <span>{LoginMutation.error.message}</span>}
      <Button type="submit" title="Войти" isLoading={LoginMutation.isPending}>Войти</Button>
    </form>
  );
};
