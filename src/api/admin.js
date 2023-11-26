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