import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import { UserAvatar } from "../../components/UserAvatar";
import { ThemeButtonDanger } from "../../components/ThemeButton";
import { Delete } from "@mui/icons-material";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { DeleteApi, GetApi } from "../../utils/apiHandler";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetApi(`/posts/${id}`)
    .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <p>Loading user details...</p>;
  }

  const handleDeletePost = async () => {
    try {
        await DeleteApi('/posts', post.id)
        navigate('/app/posts/');
  
      } catch (error: any) {
        console.error('Error deleting post:', error.message);
      }
  }

  return (
    <>
    <Container style={{paddingTop: '20px', textAlign: 'left'}}>
        <Breadcrumbs>
            <Link underline="always" color="inherit" href="/app/posts">
                Posts
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{post.id}</Typography>
        </Breadcrumbs>
        <div>
            <h3>Title: {post.title}</h3>
            <span>{post.body}</span>
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "start", marginTop: '50px' }}>
            Posted by: <UserAvatar user = {post.user}/> {post.user.name}
        </div>
        <ThemeButtonDanger onClick={() => {
            setOpen(true);
        }}><Delete />Delete</ThemeButtonDanger>
    </Container>

    {open && (
        <ConfirmationDialog 
            heading={'Delete post'}
            body={`Do you want to delete ${post.title}?`}
            open = {open}
            onClose = {() => {setOpen(false)}}
            onConfirm= {handleDeletePost}
        />
     )}
    </>
  );
};

export default PostDetailPage;
