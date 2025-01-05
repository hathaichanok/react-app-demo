import { Breadcrumbs, Container, Link, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import { PostItem } from "../../components/PostItem";

const UserPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`/users/${id}/posts`)
    .then((response) => response.json())
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
        <Breadcrumbs>
            <Link underline="always" color="inherit" href="/app/users">
                Users
            </Link>
            <Link underline="always" color="inherit" href={"/app/users/" + id}>
                {user.name}
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Posts</Typography>
        </Breadcrumbs>
        
        <h3>Owner: {user.name}</h3>
        <List>
          {posts.map((post) => (
            <PostItem 
              post={post}
              owner={user}
            />
          ))}
        </List>
    </Container>
  );
};

export default UserPostPage;
