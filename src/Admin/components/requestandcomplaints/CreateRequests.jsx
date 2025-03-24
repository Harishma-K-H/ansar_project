import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Button, Typography, Box, Modal, ThemeProvider, createTheme, } from '@mui/material';
import axios from 'axios'; // Import Axios
import { toast } from "react-toastify";
import { Article } from '@mui/icons-material';
import BASE_URL from '../../../utils/baseUrl';

function CreateRequests()
{
    const [formData, setFormData] = useState({
        typeOfRequest: '',
        allRequest: '',
        notes: '',
        staffId: '',

    });
    const [typesOfRequest, setTypesOfRequest] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [openModal, setOpenModal] = useState(false);  // For opening modal
    const [staffIds, setStaffIds] = useState([]);
const getAccessToken = () => localStorage.getItem('admin_access_token');
const getRefreshToken = () => localStorage.getItem('admin_refresh_token');
// Function to refresh the access token
const refreshToken = async () =>
{
    try
    {
        const refresh_token = getRefreshToken();
        if (!refresh_token)
        {
            console.error("No refresh token found. Redirecting to login...");
            window.location.href = "/admin/login";
            return null;
        }

        console.log("Refreshing access token...");
        const response = await axios.post(`${ BASE_URL }/api/token/refresh/`, { refresh: refresh_token });

        if (response.status === 200)
        {
            const newAccessToken = response.data.access; // Ensure this matches your backend response
            localStorage.setItem('admin_access_token', newAccessToken);
            console.log("Access token refreshed successfully.");
            return newAccessToken;
        }
    } catch (error)
    {
        console.error("Token refresh failed. Redirecting to login...", error);
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
        window.location.href = "/admin/login"; // Redirect to login if refresh fails
        return null;
    }
};

// Function to make authenticated API requests
const apiRequest = async (method, url, data = null, retry = true) =>
{
    let access_token = getAccessToken();
    try
    {
        const response = await axios({
            method,
            url: `${ BASE_URL }${ url }`,
            data,
            headers: { Authorization: `Bearer ${ access_token }` },
        });
        return response;
    } catch (error)
    {
        if (error.response && error.response.status === 401 && retry)
        {
            console.warn("Access token expired. Attempting to refresh...");
            access_token = await refreshToken();
            if (access_token)
            {
                return apiRequest(method, url, data, false); // Retry request once with new token
            }
        }
        throw error;
    }
};
    useEffect(() =>
    {
        axios.get(`${ BASE_URL }/api/types-of-request/`)
            .then((response) => setTypesOfRequest(response.data))
            .catch(() => setTypesOfRequest([]));
    }, []);
    useEffect(() =>
        {
        apiRequest("GET", "/api/check-staff-id/?data=DepartmentHead")
                .then((response) => setStaffIds(response.data.staff_ids || []))
                .catch(() => setStaffIds([]));
        }, []);

    const handleTypeOfRequestChange = (e) =>
    {
        const typeOfRequestId = e.target.value;
        setFormData({ ...formData, typeOfRequest: typeOfRequestId, allRequest: '' });

        axios.get(`${ BASE_URL }/api/allrequests/${ typeOfRequestId }/`)
            .then((response) => setAllRequests(response.data))
            .catch(() => setAllRequests([]));
    };

    const handleInputChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const payload = {
            staff_id: formData.staffId,
            issue_request: formData.allRequest,
            notes: formData.notes,
            type_of_request: formData.typeOfRequest,
            created_by:"Admin"
        };

        try
        {
            const response = await axios.post(`${ BASE_URL }/api/requests/submit/`, payload);

            if (response.status === 201)
            {
                toast.success("Submitted successfully")
                setFormData({ typeOfRequest: '', issue: '', notes: '', staffId: '' });
                setOpenModal(false)
            } else
            {
                toast.warning("failed to submit")
            }
        } catch (error)
        {
            console.error('Error submitting the request:', error);
            toast.error("failed to submit, got errror")
        }
    };

    const customTheme = createTheme({
        palette: {
            primary: {
                main: "#877bdc",
            },
        },
    });

    return (
        <ThemeProvider theme={customTheme}>
            <div>
                {/* Button to open the modal */}
                <Button variant="contained" size="sm" color="primary" onClick={() => setOpenModal(true)}>
                    Add
                </Button>

                {/* Modal for Request Form */}
                                <Modal
                                    open={openModal}
                                    onClose={() => setOpenModal(false)}
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"
                                >
                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                        width: 600,
                                        borderRadius: 2,
                                        height: 'auto',
                                    }}>
                                        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                                            Requests
                                        </Typography>
                
                                        {/* Staff ID Dropdown */}
                                        <Select
                                            fullWidth
                                            value={formData.staffId}
                                            onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                                            displayEmpty
                                            sx={{
                                                marginBottom: 2,
                                                bgcolor: "#f5f5f5", // Light background
                                                borderRadius: 1, // Rounded corners
                                                "& .MuiSelect-select": { padding: "12px" }, // Padding inside dropdown
                                                "&:hover": { bgcolor: "#e0e0e0" }, // Hover effect
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        bgcolor: "#fff", // White background for dropdown
                                                        borderRadius: 1,
                                                        boxShadow: 3, // Soft shadow
                                                        maxHeight: 300, // Limit height
                                                        overflowY: "auto", // Scroll if many items
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="" disabled>Select Staff ID</MenuItem>
                                            {staffIds.map((id) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                    sx={{
                                                        fontSize: "14px",
                                                        padding: "10px",
                                                        "&:hover": { bgcolor: "#f0f0f0" } // Light hover effect
                                                    }}
                                                >
                                                    {id}
                                                </MenuItem>
                                            ))}
                                        </Select>
                        <Select
                            value={formData.typeOfRequest}
                            onChange={handleTypeOfRequestChange}
                            fullWidth
                            displayEmpty
                            sx={{ marginBottom: 2 }}
                        >
                            <MenuItem value="" disabled hidden>Select Type of Request</MenuItem>
                            {typesOfRequest.map((type) => (
                                <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                            ))}
                        </Select>

                        <Select
                            value={formData.allRequest}
                            onChange={(e) => setFormData({ ...formData, allRequest: e.target.value })}
                            fullWidth
                            displayEmpty
                            disabled={!formData.typeOfRequest}
                            sx={{ marginBottom: 2 }}
                        >
                            <MenuItem value="" disabled hidden>Select Request</MenuItem>
                            {allRequests.map((issue) => (
                                <MenuItem key={issue.id} value={issue.id}>{issue.name}</MenuItem>
                            ))}
                        </Select>

                        <TextField
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            label="Notes (optional)"
                            multiline
                            fullWidth
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        />

                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}

export default CreateRequests;
