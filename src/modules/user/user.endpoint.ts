import { roles } from "../../middleware/auth";


export const endpoint = {
    user: [roles.user],
    admins:[roles.admin,roles.superAdmin],
    both:[roles.admin,roles.superAdmin,roles.user]
};
