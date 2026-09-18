import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.match(/^\/(en|ar)\/admin/);

  if (isAdminRoute) {
    const session = await auth();
    if (!session) {
      const locale = request.nextUrl.pathname.split("/")[1];
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
