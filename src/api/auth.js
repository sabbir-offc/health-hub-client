import axiosSecure from "."


export const getToken = async (email) => {
    const { data } = await axiosSecure.post(`/jwt`, { email })
    console.log('Token received from server------>', data)
    return data
}

// Save user data in database
export const saveUser = async (user, userInfo) => {
    const currentUser = {
        name: user?.displayName,
        email: user?.email,
        role: 'patient',
        status: 'active',
        image: userInfo?.image,
        upazilla: userInfo?.upazilla,
        district: userInfo?.district,
        blood: userInfo?.blood
    }
    console.log(currentUser)
    const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser)

    return data
}

//update userInfo 
export const updateUserInfo = async (userInfo, id) => {
    const { data } = await axiosSecure.put(`/users/update/${id}`, userInfo);
    return data
}

// Clear token from browser
export const clearCookie = async () => {
    const { data } = await axiosSecure.get('/logout')
    return data
}