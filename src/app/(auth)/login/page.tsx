import AuthWrapper from "@/components/auth/AuthWrapper";
import Login from "@/components/auth/login";


export default function Page() {


    return (
        <div >
            <AuthWrapper>
                <Login />
            </AuthWrapper>
        </div>
    );
}