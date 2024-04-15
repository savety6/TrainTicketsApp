import { signIn, auth } from "@/util/AuthLib"

type Props = {}

const Login = async () => {
    const session = await auth()

    console.log("Session: ", session)

    const handleGitHubLogin = async () => {
        "use server"
        await signIn("github")
    }
    return (
        <div>
            <h1>Login</h1>
            <form action="">
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
            <form action={handleGitHubLogin}>
                <button>GitHub</button>
            </form>
        </div>
    )
}

export default Login