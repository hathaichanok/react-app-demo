import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Post } from "../interfaces/Post"
import { UserAvatar } from "./UserAvatar";
import { User } from "../interfaces/User";
import { Feed } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const PostItem = (props: {
    post: Post
    owner: User
}) => {

    const { post, owner } = props;
    const navigate = useNavigate();

    const viewPost = () => {
        navigate('/app/posts/' + post.id);
    }

    return (
        <>
        <ListItem 
            key={post.id}
        >
            <ListItemButton onClick={viewPost}>
                <ListItemIcon>
                    <Feed />
                </ListItemIcon>
                <ListItemText
                    primary={<b>{post.title}</b>}
                    secondary={
                        <>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "start" }}>
                                Posted by: <UserAvatar user = {owner}/> {owner.name}
                            </div>
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
        <Divider style={{ marginTop: '10px' }} />
        </>
    )
}