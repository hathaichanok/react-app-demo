import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Collapse, Container, IconButton, Link, List, ListItem, ListItemText, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Delete, Visibility, PersonAddAlt1 } from '@mui/icons-material';
import { ThemeButtonDanger, ThemeButtonPrimary } from '../../components/ThemeButton';
import { User, UserData } from '../../interfaces/User';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { UserAvatar } from '../../components/UserAvatar';
import { DeleteApi, GetApi } from '../../utils/apiHandler';


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

    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 10;

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
          await DeleteApi('/users', selectedUser!.id);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser!.id));
        } catch (error: any) {
          console.error('Error deleting user:', error.message);
        }
    };

    useEffect(() => {
        const fetchUsers = async (page: number) => {
            try {
              const data = await GetApi(`/users?page=${page}&size=${pageSize}`);
              setUsers(
                data.content.map((userData: any) => {
                  return new UserData(userData).getUser();
              }));

              setTotal(data.totalElements);
              //setUsers(data);
            } catch (error: any) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
        };
        fetchUsers(currentPage);
    }, [currentPage]);

    const addUser = () => {
        navigate('/app/users/create');
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    };

    return (
    <Container>
        <Toolbar style={{ position: "sticky", display: "flex", justifyContent: "space-between" }}>
            <Typography align='left' variant="h5" gutterBottom>
                Users ({total})
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
            body={`Do you want to delete ${selectedUser!.name} (${selectedUser!.email})?`}
            open = {open}
            onClose = {() => {setOpen(false)}}
            onConfirm= {handleDeleteUser}
        />
      )}

      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}>
        <Pagination 
          count={Math.ceil(total / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </Container>
    );
};

export default UsersPage;
