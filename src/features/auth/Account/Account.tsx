import { useQuery } from "@tanstack/react-query"
import { fethMe } from "../../../api/UserSchema"
import { Loader } from "../Loader"
import { AuthForm } from "../AuthForm/AuthForm"

export const Account = () => {
    const meQuery = useQuery({
        queryFn: () => fethMe(),
        queryKey: ["users", "me"]
    })

    switch (meQuery.status) {
        case "pending":
            return <Loader />
        case "error":
            return <AuthForm />
        case "success":
            return <NoteForm />
    }
}