import axiosSecure from "."

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