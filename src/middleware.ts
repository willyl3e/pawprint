import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }: { token: JWT | null; req: NextRequest }) => {
      if (!token || !("role" in token)) return false; // Ensure token exists and has a role property

      const routeRoleMap: Record<string, string[]> = {
        "/admin": ["editor", "writer"],
        "/admin/approve": ["editor"],
        "/admin/recall": ["editor"],
        "/api/approve": ["editor"],
        "/api/recall": ["editor"],
      };

      const path = req.nextUrl.pathname;

      for (const route in routeRoleMap) {
        if (path.startsWith(route)) {
          return routeRoleMap[route].includes(token.role as string); // Explicitly cast token.role to string
        }
      }

      return false;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/admin/approve", "/admin/recall", "/api/approve", "/api/recall"], // Specify the routes to protect
};
