import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Sobre Nosotros
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-[#027046]">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-base text-gray-500 hover:text-[#027046]">
                  Trabaja con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Servicio al Cliente
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-[#027046]">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-gray-500 hover:text-[#027046]">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-[#027046]">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-[#027046]">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Síguenos
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#027046]">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#027046]">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#027046]">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Teba. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}