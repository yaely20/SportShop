import axios from 'axios'

const baseUrl ="http://localhost:4000/user"

export const fetchUser=async()=>{
    const response = await axios.get(baseUrl)
    return response.data
}

export const deleteOneUser=async(id)=>{
    const response = await axios.delete(`${baseUrl}/ ${id}`)
    return response.data
}

export const addOneUser=async(user)=>{
    const response = await axios.post(`${baseUrl}/`,user)
    return response.data
}

export const login=async(user)=>{

    const response = await axios.post(`${baseUrl}/login`, user)
    return response
}
export const updateOneUser=async(id,user)=>{
    debugger
    const response = await axios.put(`${baseUrl}/${id}`,user)
    return response.data
}
