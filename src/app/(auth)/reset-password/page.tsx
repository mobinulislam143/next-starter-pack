import AuthWrapper from "@/components/auth/AuthWrapper";
import ResetPassword from "@/components/auth/ResetPassword";


export default function Page() {


    return (
        <div >
            <AuthWrapper>
                <ResetPassword />
            </AuthWrapper>
        </div>
    );
}