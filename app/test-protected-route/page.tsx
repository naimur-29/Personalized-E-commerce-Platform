"use server";

import AuthorizeServerRoute from "@/components/AuthorizeServerRoute";
import ProtectedClientComponent from "@/components/ProtectedClientComponent";

export default async function TestProtectedRoutePage() {
  return (
    <AuthorizeServerRoute>
      <h1>Dashboard</h1>
      <ProtectedClientComponent />
    </AuthorizeServerRoute>
  );
}
