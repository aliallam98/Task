import { AvalibleRoles } from "../../middleware/auth";
export const endpoint = {
    user: [AvalibleRoles.user],
    admins:[AvalibleRoles.admin,AvalibleRoles.superAdmin],
    both:[AvalibleRoles.admin,AvalibleRoles.superAdmin,AvalibleRoles.user]
};
