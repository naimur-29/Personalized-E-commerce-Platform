import CustomerRegistrationForm from "@/features/auth/components/CustomerRegistrationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerRegistration() {
  return (
    <section className="flex items-center justify-center min-h-screen p-[12px]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Create account</CardTitle>
        </CardHeader>

        <CardContent>
          <CustomerRegistrationForm />
        </CardContent>
      </Card>
    </section>
  );
}
