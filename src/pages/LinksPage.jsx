import React, { useContext } from "react"
import { mainURL } from "../api"
import Loader from "../components/common/Loader"
import LinksList from "../components/LinksList"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

const LinksPage = () => {
    const [links, setLinks] = React.useState([])
    const { token } = useContext(AuthContext)

    const { loading, request } = useHttp()

    const getLinks = React.useCallback(async () => {
        try {
            const fetchedLinks = await request(
                `${mainURL}/api/link`,
                "GET",
                null,
                {
                    Authorization: "Bearer " + token,
                }
            )
            setLinks(fetchedLinks)
        } catch (error) {}
    }, [token, request])

    React.useEffect(() => getLinks(), [getLinks])

    if (loading) {
        return <Loader />
    }

    return <>{!loading && <LinksList links={links} />}</>
}

export default LinksPage
