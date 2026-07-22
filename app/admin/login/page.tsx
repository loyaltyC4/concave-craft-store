import { AdminLoginForm } from "components/admin/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24">
      <h1 className="mb-6 text-2xl font-semibold text-[#f3f1ea]">
        Fingerboard Lab admin
      </h1>
      <AdminLoginForm />
    </div>
  );
}
