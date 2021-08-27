import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Persmissions check if someone meets a criteria - Yes or No.
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean or a filter
export const rules = {
  canManageProducts({ session }): ListAccessArgs {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }

    // Otherwise they should only see available products
    return { status: 'AVAILABLE' };
  },
  canOrder({ session }): ListAccessArgs {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }): ListAccessArgs {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission
    if (permissions.canManageCart({ session })) {
      return true;
    }

    // 2. If not, do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers({ session }): ListAccessArgs {
    if (!isSignedIn({ session })) {
      return false;
    }

    // 1. Do they have the permission
    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // 2. Otherwise they may only update themselves
    return { id: session.itemId };
  },
};
