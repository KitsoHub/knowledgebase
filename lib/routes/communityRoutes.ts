import { UserRole } from "../clerk/roles";

/**
 * Central role map for community routes.
 * Keys are route prefixes, values are allowed roles.
 */
export const COMMUNITY_ROUTE_ROLE_MAP: Record<string, UserRole[]> = {
  "/community/admin": ["admin"],

  "/community/resources": ["admin", "moderator", "member"],

  "/community": ["admin", "moderator", "member", "viewer"], // default dashboard
};
