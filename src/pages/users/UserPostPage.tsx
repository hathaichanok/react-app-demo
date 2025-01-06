import { Breadcrumbs, Button, Container, Link, List, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import { PostItem } from "../../components/PostItem";
import { GetApi } from "../../utils/apiHandler";
import { PostAdd } from "@mui/icons-material";
import { CreatePostModal } from "../../components/CreatePostModal";

const UserPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    GetApi(`/users/${id}/posts`)
    .then((data) => {
        setUser(data.user);
        setPosts(data.posts)
    });
  }, [id]);

  if (!user) {
    return <p>Loading user posts...</p>;
  }

  return (
    <Container style={{paddingTop: '20px'}}>
        <Toolbar style={{ position: "sticky", display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs>
              <Link underline="always" color="inherit" href="/app/users">
                  Users
              </Link>
              <Link underline="always" color="inherit" href={"/app/users/" + id}>
                  {user.name}
              </Link>
              <Typography sx={{ color: 'text.primary' }}>Posts</Typography>
          </Breadcrumbs>

          <Button variant="outlined" startIcon={<PostAdd />} onClick={() => { setOpen(true) }}>
              Add Post
          </Button>
        </Toolbar>
        
        <h3>Owner: {user.name}</h3>
        <List>
          {posts.map((post) => (
            <PostItem 
              post={post}
              owner={user}
            />
          ))}
        </List>

        {open && (
          <CreatePostModal 
            user={user}
            open={open}
            onClose={() => {setOpen(false)}}
          />
        )}
    </Container>
  );
};

export default UserPostPage;
