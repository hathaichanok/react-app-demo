import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { TextField, Button, Box, Typography } from '@mui/material';
import { PostApi } from '../utils/apiHandler';
import { useNavigate } from 'react-router-dom';

interface UserForm {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: AddressForm;
    company: CompanyForm
}

interface GeoForm {
    lat: string;
    lng: string;
}
  
interface AddressForm {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoForm;
}
  
interface CompanyForm {
    name: string;
    catchPhrase: string;
    bs: string;
}

const UserForm: React.FC = () => {
    const [userForm, setUserForm] = useState<UserForm>(
        {
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

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (field: string, value: any) => {
        setUserForm((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User submitted:", userForm);

        PostApi('/users', JSON.stringify(userForm))
        .then(() => {
            navigate('/app/users/');
        })
    };

    return (
        <Box 
            sx={{ padding: 3, maxWidth: 800, margin: "auto" }}
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" gutterBottom>Create User</Typography>
                <Grid container spacing={2}>
                    <Typography variant="h6" gutterBottom>User Info</Typography>
                    <Grid size={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={userForm.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Username"
                            name="username"
                            value={userForm.username}
                            onChange={(e) => handleChange("username", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={userForm.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Phone"
                            name="phone"
                            value={userForm.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Website"
                            name="website"
                            value={userForm.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="h6" gutterBottom>Address</Typography>
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Street"
                            name="address.street"
                            value={userForm.address.street}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: { ...prevUser.address, street: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Suite"
                            name="address.suite"
                            value={userForm.address.suite}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: { ...prevUser.address, suite: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="City"
                            name="address.city"
                            value={userForm.address.city}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: { ...prevUser.address, city: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Zipcode"
                            name="address.zipcode"
                            value={userForm.address.zipcode}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: { ...prevUser.address, zipcode: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Latitude"
                            name="address.geo.lat"
                            value={userForm.address.geo.lat}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: {
                                        ...prevUser.address,
                                        geo: { ...prevUser.address.geo, lat: e.target.value },
                                    }
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Longitude"
                            name="address.geo.lng"
                            value={userForm.address.geo.lng}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    address: {
                                        ...prevUser.address,
                                        geo: { ...prevUser.address.geo, lng: e.target.value },
                                    }
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="h6" gutterBottom>Company</Typography>
                    </Grid>
                   
                    <Grid size={12}>
                        <TextField
                            label="Company Name"
                            name="company.name"
                            value={userForm.company.name}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    company: { ...prevUser.company, name: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="Catch Phrase"
                            name="company.catchPhrase"
                            value={userForm.company.catchPhrase}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    company: { ...prevUser.company, catchPhrase: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={6}>
                        <TextField
                            label="BS"
                            name="company.bs"
                            value={userForm.company.bs}
                            onChange={(e) =>
                                setUserForm((prevUser) => ({
                                    ...prevUser,
                                    company: { ...prevUser.company, bs: e.target.value },
                                }))
                            }
                            fullWidth
                        />
                    </Grid>

                    <Grid size={12}>
                        <Button variant="contained" type="submit" >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
        </Box>
    );
};

export default UserForm;
