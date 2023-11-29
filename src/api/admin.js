
import axiosSecure from "."
import { axiosPublic } from "../hooks/useAxiosPublic";

//upload banner
export const uploadBanner = async (info) => {
    const { data } = await axiosSecure.post('/banners', info);
    return data;

}

//update isActive value;
export const updateBannerStatus = async (id, status) => {
    const { data } = await axiosSecure.patch(`/banners/${id}`, status);
    return data
}


//add test
export const addTest = async (testInfo) => {
    const { data } = await axiosSecure.post('/tests', testInfo);

    return data;
}
//get all tests
export const getAllTests = async (sortField) => {
    if (sortField) {
        const { data } = await axiosSecure(`/tests?sort=${sortField}`);
        return data;
    }
    const { data } = await axiosSecure(`/tests`);
    return data;
}
//delete a single test
export const deleteTest = async (id) => {
    const { data } = await axiosSecure.delete(`/tests/${id}`);
    return data;
}

//get single test details
export const singleTest = async (id) => {
    const { data } = await axiosSecure(`/tests/${id}`);
    return data;
}

//update a single test details 
export const updateTestDetails = async (id, updatedData) => {
    const { data } = await axiosSecure.put(`/test/update/${id}`, updatedData);
    return data;
}

//get district
export const getDistricts = async () => {
    const { data } = await axiosPublic('/districts');
    return data;
}

//get all users 
export const getAllUsers = async () => {
    const { data } = await axiosSecure('/users');
    return data
}

//update user status 
export const updateUserStatus = async (id, status) => {

    const { data } = await axiosSecure.patch(`/user/status/${id}`, { status });
    return data;
}

//update user role 
export const updateUserRole = async (id, role) => {
    const { data } = await axiosSecure.patch(`/user/role/${id}`, { role });
    return data

}

//get reservation under a tes;
export const getAllReservation = async (id, searchText) => {
    const { data } = await axiosSecure(`/reservation/${id}?search=${searchText}`);
    return data;
}


//update reservation status
export const updateReservationStatus = async (id, result) => {
    const { data } = await axiosSecure.patch(`/reservation/result/${id}`, result);
    return data;
}