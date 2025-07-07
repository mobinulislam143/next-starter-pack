import AuthWrapper from "@/components/auth/AuthWrapper";
import Otp from "@/components/auth/Otp";

export default function Page() {
    return (
        <div>
            <AuthWrapper>
                <Otp/>
            </AuthWrapper>
        </div>
    );
}