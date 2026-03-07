"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const success = await login(data.email, data.password);
      if (!success) throw new Error("Invalid credentials");
      return success;
    },
    onSuccess: () => {
      toast.success("Welcome back!");
      router.push(redirectTo);
    },
    onError: () => {
      toast.error("Invalid credentials", {
        description: "Please check your email and password",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-md">
          {/* Brand */}
          <Link
            href="/"
            className="flex flex-col items-center gap-3 self-center"
          >
            <Image
              src="/logo-thehoodx.png"
              alt="The-Hoodx Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>

          <h2 className="mt-8 text-3xl text-center font-black uppercase tracking-tight">
            Sign In
          </h2>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 rounded-full border-border bg-muted/30 pl-11 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 rounded-full border-border bg-muted/30 pl-11 pr-11 text-sm focus-visible:border-foreground focus-visible:ring-foreground/20"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="h-12 w-full cursor-pointer rounded-full bg-black text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
          alt="Streetwear lifestyle"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-lg font-medium leading-relaxed text-white">
            &ldquo;Quality streetwear that feels as good as it looks. The-Hoodx
            has become my go-to for everyday fits.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-white/60">
            — Sarah K., Los Angeles
          </p>
        </div>
      </div>
    </div>
  );
}
