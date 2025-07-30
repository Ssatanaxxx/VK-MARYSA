import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { FormEventHandler, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/User";
import { queryClient } from "../../api/queryClient";

export const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const RegisterMutation = useMutation({
    mutationFn: () => register(username, email, password)
  }, queryClient)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    RegisterMutation.mutate()
  }
  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя">
        <input required name="name" type="username" onChange={(e) => setUsername(e.target.value)} value={username} />
      </FormField>
      <FormField label="Email">
        <input required name="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </FormField>
      <FormField label="Пароль">
        <input required name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </FormField>

      {RegisterMutation.error && <span>{RegisterMutation.error.message}</span>}

      <Button type="submit" title="Зарегистрироваться" isLoading={RegisterMutation.isPending}>Зарегистрироваться</Button>
    </form>
  );
};
