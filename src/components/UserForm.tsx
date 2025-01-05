import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { User } from '../interfaces/User';

const UserForm: React.FC = () => {
    const [user, setUser] = useState<User>(
        {
            id: 0,
            name: "",
            username: "",
            email: "",
            address: {
              street: "",
              suite: "",
              city: "",
              zipcode: "",
              geo: {
                lat: "",
                lng: "",
              },
            },
            phone: "",
            website: "",
            company: {
              name: "",
              catchPhrase: "",
              bs: "",
            },
        }
    );

    const handleChange = (field: string, value: any) => {
        setUser((prevUser) => ({
          ...prevUser,
          [field]: value,
        }));
    };

    return (
        <>
            <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
                <Typography align='left' variant="h6" gutterBottom>
                    Add User
                </Typography>
                <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={user.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={user.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={user.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            value={user.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            label="Website"
                            value={user.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                        />
                    </Grid>
                </Grid>

                <Typography align='left' gutterBottom>
                    Address
                </Typography>
                <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Street"
                        value={user.address.street}
                        onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            address: { ...prevUser.address, street: e.target.value },
                        }))
                        }
                    />
                    </Grid>
                    <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Suite"
                        value={user.address.suite}
                        onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            address: { ...prevUser.address, street: e.target.value },
                        }))
                        }
                    />
                    </Grid>
                    <Grid size={6}>
                    <TextField
                        fullWidth
                        label="City"
                        value={user.address.city}
                        onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            address: { ...prevUser.address, city: e.target.value },
                        }))
                        }
                    />
                    </Grid>
                    <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Zipcode"
                        value={user.address.zipcode}
                        onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            address: { ...prevUser.address, zipcode: e.target.value },
                        }))
                        }
                    />
                    </Grid>
                </Grid>

                <Typography align='left' gutterBottom>
                    <b>Company</b>
                </Typography>
                <Grid container columnSpacing={2} rowSpacing={3}>
                    <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Company Name"
                        value={user.company.name}
                        onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            company: { ...prevUser.company, name: e.target.value },
                        }))
                        }
                    />
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 3, textAlign: "center" }}>
                    <Button variant="contained" color="primary" onClick={() => console.log(user)}>
                    Submit
                    </Button>
                </Box>
            </Box>
        </>
    )
};

export default UserForm;