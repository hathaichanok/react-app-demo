import { Avatar, Box, Breadcrumbs, Button, Container, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetApi } from "../../utils/apiHandler";
import { UserData } from "../../interfaces/User";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetApi('/users/' + id)
    .then((data) => {
      setUser(new UserData(data).getUser());
    })

  }, [id]);

  if (!user) {
    return <p>Loading post details...</p>;
  }

  const viewPost = () => {
    navigate('/app/users/'+id+'/posts');
  }

  return (
    <Container style={{paddingTop: '20px'}}>
        <Breadcrumbs>
            <Link underline="always" color="inherit" href="/app/users">
                Users
            </Link>
            <Typography sx={{ color: 'text.primary' }}>{user.name}</Typography>
        </Breadcrumbs>
        <Box sx={{ margin: 5 }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "8px", justifyContent: "start" }}>
              <Avatar>
                  {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h4" color="textSecondary">
              {user.name} ({user.username})
              </Typography>
            </div>
            <Button variant="outlined" onClick={viewPost}>
                Posts
            </Button>
          </div>
          <List>
              <ListItem key={user.id}>
                  <ListItemText
                      primary='Contact'
                      secondary={
                      <>
                          <Typography variant="body2" color="textSecondary">
                          Email: {user.email}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                          Phone: {user.phone}
                          </Typography>
                      </>
                      }
                  />
              </ListItem>
              <ListItem key={user.id}>
                  <ListItemText
                      primary='Website'
                      secondary={
                      <>
                          <Link href='#' underline="hover" target="_blank">
                              {user.website}
                          </Link>
                      </>
                      }
                  />
              </ListItem>
              <ListItem key={user.id}>
                  <ListItemText
                      primary='Address'
                      secondary={
                      <>
                          <Typography variant="body2" color="textSecondary">
                          {user.address.getFullAddressInfo()}
                          </Typography>
                          <Link href={user.address.getGeoLink()} underline="hover" target="_blank">
                              {'Open in map'}
                          </Link>
                      </>
                      }
                  />
              </ListItem>
              <ListItem key={user.id}>
                  <ListItemText
                      primary='Company'
                      secondary={
                      <>
                          <Typography variant="body2" color="textSecondary">
                          {user.company.getFullCompanyInfo()}
                          </Typography>
                      </>
                      }
                  />
              </ListItem>
          </List>
        </Box>
    </Container>
  );
};

export default UserDetailPage;
