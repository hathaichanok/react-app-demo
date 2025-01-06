import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Container, List, Pagination, Toolbar, Typography } from '@mui/material';
import { Post } from '../../interfaces/Post';
import { PostItem } from '../../components/PostItem';
import { PostAdd } from '@mui/icons-material';
import { GetApi } from '../../utils/apiHandler';

const PostsPage: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;

    useEffect(() => {
        const fetchPosts = async (page: number) => {
            try {
                const data = await GetApi(`/posts?page=${page}&size=${pageSize}`);
                //console.log(data);
                setPosts(data.content);
                setTotal(data.totalElements);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts(currentPage);
    }, [currentPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    };

    return (
    <Container>
      <Toolbar style={{ position: "sticky", display: "flex", justifyContent: "space-between" }}>
          <Typography align='left' variant="h5" gutterBottom>
              Posts ({total})
          </Typography>
      </Toolbar>
      
      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <>
          <List>
            {posts.map((post) => (
              <PostItem 
                post={post}
                owner={post.user}
              />
            ))}
          </List>
          <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
            <Pagination 
              count={Math.ceil(total / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </>
      )}
    </Container>
    );
};

export default PostsPage;
