import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-8">
        Lo sentimos, la página que buscas no existe o ha sido removida.
      </p>
      <Link href="/">
        <Button className="bg-[#027046] hover:bg-[#025a38]">
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </Link>
    </div>
  );
}