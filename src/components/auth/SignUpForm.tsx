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
  SignUpFormType,
  signUpFormSchema,
} from "@/lib/validations/client-vals";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Icons } from "../icons";

const SignUpForm = ({}) => {
  const [isSendingRequest, setSendingRequest] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();

  async function onSubmit(formData: SignUpFormType) {
    setSendingRequest(true);
    try {
      const payload = signUpFormSchema.parse(formData)
      const res = await axios.post("/api/login/signup", payload);
      if (res.data?.success) {
        toast({
          title: "Registered Succesfully!!",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Invalid Input!',
        });
        return;
      }
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.error,
        });
        return;
      }
      toast({
        title: "Something went wrong!!",
      });
    } finally {
      setSendingRequest(false);
      form.reset({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full" disabled={isSendingRequest} type="submit">
          <span>Submit</span>
          {isSendingRequest && <Icons.spinner className="ml-2"></Icons.spinner>}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
