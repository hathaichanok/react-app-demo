import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../interfaces/User"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { PostApi } from "../utils/apiHandler";

interface PostData {
    title: string,
    body: string,
    user: User
}

export const CreatePostModal = (props: {
    user: User
    open: boolean
    onClose: (value?: string) => void
}) => {

    const { user, open, onClose } = props;
    const [post, setPost] = useState<PostData>({
        title: '',
        body: '',
        user: user
    })

    const handleClose = () => {
        onClose();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPost((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        PostApi('/posts', JSON.stringify(post))
        .then(() => {
            window.location.reload();
        })
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 600
                        }}
                    >
                        <TextField
                            label="Title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Body"
                            name="body"
                            value={post.body}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={8}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}