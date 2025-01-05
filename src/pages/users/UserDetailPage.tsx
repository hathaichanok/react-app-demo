import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [id]);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <Container style={{paddingTop: '20px'}}>
        <Breadcrumbs>
            <Link underline="always" color="inherit" href="/app/users">
                Users
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{user.name}</Typography>
        </Breadcrumbs>
        <div>
        <h1>User Detail</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>Address: {user.address.street}, {user.address.city}</p>
        <Link underline="always" color="inherit" href={"/app/users/" + user.id + "/posts"}>
                Posts
        </Link>
        </div>
    </Container>
  );
};

export default UserDetailPage;
