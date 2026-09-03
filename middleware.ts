// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((request) => {
  const isAdminRoute = request.nextUrl.pathname.match(/^\/(en|ar)\/admin/);

  if (isAdminRoute && !request.auth) {
    const locale = request.nextUrl.pathname.split("/")[1];
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
