import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth/register";
import { queryClient } from "@/api/queryClient";

export function useRegister() {
  return useMutation(
    {
      mutationFn: register,
      onSuccess: () => {
        alert("Регистрация успешна!");
      },
    },
    queryClient
  );
}
