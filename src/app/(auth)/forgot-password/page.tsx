import AuthWrapper from "@/components/auth/AuthWrapper";
import ForgetPass from "@/components/auth/ForgetPass";

export default function Page() {
    return (
        <div>
            <AuthWrapper>
                <ForgetPass/>
            </AuthWrapper>
        </div>
    );
}