import { createAccessControl } from "better-auth/plugins/access";

import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { UserRole } from "./generated/prisma";

const statements = {
  //we merge with with old statements to avoid overriden roles.
  ...defaultStatements,
  posts: ["create", "read", "delete", "update", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statements);

// create roles
export const roles = {
  // I am giving previledge to this user, I am saying
  // he can create psots,read, but delete and update its own one only.
  [UserRole.USER]: ac.newRole({
    posts: ["create", "read", "delete:own", "update:own"],
  }),

  //here admins, can do all and even delete posts of other people, update
  // and including them.
  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
    posts: ["create", "read", "delete", "update", "update:own", "delete:own"],
  }),
};
