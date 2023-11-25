import axiosSecure from "."

//upload banner
export const uploadBanner = async (info) => {
    const { data } = await axiosSecure.post('/banners', info);
    return data;

}

//update isActive value;
export const updateBannerStatus = (id, status) => {
    const res = axiosSecure.patch(`/banners/${id}`, status);
    return res
}


//add test
export const addTest = (testInfo) => {
    const { data } = axiosSecure.post('/tests', testInfo);
    return data;
}