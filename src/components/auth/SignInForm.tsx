"use client";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInFormType,
  signInFormSchema,
} from "@/lib/validations/auth-vals";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icons";
import { signIn } from "next-auth/react";
import z from "zod";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [isSendingRequest, setSendingRequest] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(formData: SignInFormType) {
    setSendingRequest(true);
    try {
      const payload = signInFormSchema.parse(formData);
      const response = await signIn("credentials", {
        redirect: false,
        ...payload,
      });
      console.log(response);
      
      if (response?.error) {
        toast({
          title: response.error,
        });
      } else {
        toast({
          title: "login successfull!",
        });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: error.message,
        });
        return;
      }
    } finally {
      setSendingRequest(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="password"
                    type={showPass ? "text" : "password"}
                    {...field}
                  />
                  <div
                    className="absolute right-9 text-gray-400 hover:cursor-pointer text-sm"
                    onClick={() => setShowPass((prev) => !prev)}
                  >
                    {showPass ? (
                      <Icons.hide></Icons.hide>
                    ) : (
                      <Icons.view></Icons.view>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isSendingRequest}>
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
