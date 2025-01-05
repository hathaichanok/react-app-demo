import { Avatar } from "@mui/material";
import { User } from "../interfaces/User"

export const UserAvatar = (props: {
    user: User
}) => {
    const { user } = props;

    return (
        <Avatar sx={{ width: 20, height: 20 }} style={{fontSize: "14px"}}>
            {user.name.charAt(0)}
        </Avatar>
    )
}