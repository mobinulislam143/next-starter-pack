"use client";
import { cn } from "@/lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from '@/assets/signupLottie.json'

const SignupLottie = () => {
    return (
        <Player
            autoplay
            loop
            src={loading}
            className={cn("max-w-[550px] h-screen")}
        ></Player>
    );
};

export default SignupLottie;