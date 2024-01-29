import { AvalibleRoles } from "../../middleware/auth";
export const endpoint = {
    user: [AvalibleRoles.user],
    admins:[AvalibleRoles.admin,AvalibleRoles.superAdmin],
    superAdmin:[AvalibleRoles.superAdmin],
    both:[AvalibleRoles.admin,AvalibleRoles.superAdmin,AvalibleRoles.user]
};


export const permissions = {
    canGetAll :"Get-All",
    canDeletePost:"Delete-Post",
    canControlRole:"Control-Role"
}