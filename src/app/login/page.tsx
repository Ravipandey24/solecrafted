import SignInForm from "@/components/auth/SignInForm";
import SignOutForm from "@/components/auth/SignOutForm";
import SignUpForm from "@/components/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserAuth } from "@/lib/auth/utils";


const page = async () => {
  const { session } = await getUserAuth();
  console.log(session);

  if (session) {
    return (
      <Card className="fixed w-[calc(100vw-3.5rem)] md:w-[400px]">
        <CardContent className="py-5">
          <SignOutForm></SignOutForm>
        </CardContent>
      </Card>
    );
  }

  return (
    <Tabs
      defaultValue="signin"
      className="fixed w-[calc(100vw-3.5rem)] md:w-[400px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <AuthCard authType="signin"></AuthCard>
      </TabsContent>
      <TabsContent value="signup">
        <AuthCard authType="signup"></AuthCard>
      </TabsContent>
    </Tabs>
  );
};

const AuthCard = ({ authType }: { authType: "signin" | "signup" }) => {
  return (
    <Card>
      <CardContent className="py-5">
        {authType === "signin" ? (
          <SignInForm></SignInForm>
        ) : (
          <SignUpForm></SignUpForm>
        )}
      </CardContent>
      {/* <CardFooter className="flex flex-col justify-start">
        <span className="mt-4 flex text-sm w-full">
          {authType === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link href={"/auth/" + authType}>
            <h4 className="hover:underline ml-2 capitalize">{authType}</h4>
          </Link>
        </span>
      </CardFooter> */}
    </Card>
  );
};

export default page;
