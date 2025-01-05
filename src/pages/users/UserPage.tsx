import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Collapse, Container, IconButton, Link, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Delete, Visibility, PersonAddAlt1 } from '@mui/icons-material';
import { ThemeButtonDanger, ThemeButtonPrimary } from '../../components/ThemeButton';
import { User } from '../../interfaces/User';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { UserAvatar } from '../../components/UserAvatar';


function UserDataRow(props: { 
  user: any, 
  onDelete: (user: User) => void,
  onView: (id: number) => void
}) {
    const { user, onDelete, onView } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{backgroundColor: "#F2F2F2"}}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <div style={{ display: "flex", gap: "8px", justifyContent: "start" }}>
              <UserAvatar user = {user}/> {user.name}
            </div>
          </TableCell>
          <TableCell align="center">
            {user.username}
          </TableCell>
          <TableCell align="center">{user.email}</TableCell>
          <TableCell align="center">{user.phone}</TableCell>
          <TableCell>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                <ThemeButtonPrimary onClick={() => {
                  onView(user.id);
                }}><Visibility />View</ThemeButtonPrimary>
                <ThemeButtonDanger onClick={() => {
                    onDelete(user);
                }}><Delete />Delete</ThemeButtonDanger>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <List>
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
                                {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
                                </Typography>
                                <Link href={'https://maps.google.com/?q='+user.address.geo.lat+','+user.address.geo.lng} underline="hover" target="_blank">
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
                                {user.company.name} - {user.company.catchPhrase}
                                </Typography>
                            </>
                            }
                        />
                    </ListItem>
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

const UsersPage: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const navigate = useNavigate();

    const onClickDelete = (user: User) => {
        setSelectedUser(user);
        setOpen(true);
    }

    const onClickView = (id: number) => {
      navigate('/app/users/' + id);
    }

    const handleDeleteUser = async () => {
        try {
          const response = await fetch(`/users/${selectedUser!.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete user');
    
          // Update the local state after successful deletion
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser!.id));
        } catch (error: any) {
          console.error('Error deleting user:', error.message);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              const response = await fetch('/users');
              if (!response.ok) {
                throw new Error('Failed to fetch users');
              }
              const data = await response.json();
              //console.log(data);
              setUsers(data);
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const addUser = () => {
        navigate('/app/users/create');
    }

    return (
    <Container>
        <Toolbar style={{ position: "sticky", display: "flex", justifyContent: "space-between" }}>
            <Typography align='left' variant="h5" gutterBottom>
                Users ({users.length})
            </Typography>
            <Button variant="outlined" startIcon={<PersonAddAlt1 />} onClick={addUser}>
                Add User
            </Button>
        </Toolbar>
      
      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => (
                    <UserDataRow key={user.id} 
                      user={user} 
                      onDelete={onClickDelete}
                      onView={onClickView}
                    />
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
      )}

      {open && (
        <ConfirmationDialog 
            heading={'Delete user'}
            body={`Do you want to delete ${selectedUser!.name}?`}
            open = {open}
            onClose = {() => {setOpen(false)}}
            onConfirm= {handleDeleteUser}
        />
      )}
    </Container>
    );
};

export default UsersPage;
