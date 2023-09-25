import axios from 'axios'
const server = 'http://localhost:8081/video'

const editVideo = async (params) => {
    params.imageUrl && delete params.imageUrl
    return await axios({
        method: 'post',
        url: server + '/editData',
        data: {
            ...params
        },
    }).then(res => res.data)
}


const upload = async (params) => {
    params.imageUrl && delete params.imageUrl
    return await axios({
        method: 'post',
        url: server + '/uploadData',
        data: {
            ...params
        },
    }).then(res => res.data)
}

const getAll = async () => {
    return await axios({
        method: 'get',
        url: server + '/all',
    }).then(res => res.data)
}


const getAllAuditing = async (auditing) => {
    return await axios({
        method: 'post',
        url: server + '/allAuditing',
        data: { 'auditing': auditing }
    }).then(res => res.data)
}

const videoAuditing = async (uid, auditing) => {
    return await axios({
        method: 'post',
        url: server + '/auditing',
        data: { 'auditing': auditing, 'uid': uid }
    }).then(res => res.data)
}

const deleteVideo = async (uid) => {
    return await axios({
        method: 'delete',
        url:`${server}/delete/${uid}`,
    }).then(res => res.data)
}

const getVideoDeatil = async (params) => {
    return await axios({
        method: 'post',
        url: server + `/detail/${params}`,
    }).then(res => res.data)
}

const computeVideo = (url) => {
    return `${server}/${url}`
}

const computeVideoDownload = (url) => {
    return `${server}/${url}/download`
}

const computeCover = (url) => {
    return `${server}/${url}/cover`
}

const getVideoCover = async (params) => {
    return await axios({
        method: 'get',
        url: server + `/cover/${params}`,
    }).then(res => res.data)
}

const search = async (params) => {
    params = encodeURI(params)
    return await axios({
        method: 'get',
        url: server + `/search/${params}`
    }).then(res => res.data)
}


export {
    upload,
    getAll,
    computeVideo,
    getVideoDeatil,
    getVideoCover,
    computeCover,
    search,
    computeVideoDownload,
    getAllAuditing,
    videoAuditing,
    deleteVideo,
    editVideo
}
