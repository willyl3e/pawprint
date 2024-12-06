import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth({
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => {
      if (!token) return false;

      const routeRoleMap: Record<string, string[]> = {
        "/admin":["editor", "writer"],
        "/admin/approve": ["editor"],
        "/admin/recall": ["editor"],
        "/api/approve": ["editor"],
        "/api/recall":["editor"]
      };

      const path = req.nextUrl.pathname;

      for (const route in routeRoleMap) {
        if (path.startsWith(route)) {
          return routeRoleMap[route].includes(token.role);
        }
      }

      return false;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/admin/approve", "/admin/recall", "/api/approve", "/api/recall"], // Specify the routes to protect
};
/*

export { default } from "next-auth/middleware"

export const config = { matcher: ["/admin/:path*"] }*/