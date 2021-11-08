import React, { useContext } from "react"
import { useHistory } from "react-router"
import { mainURL } from "../api"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useNotification } from "../hooks/notification.hook"
import Loader from "./common/Loader"

const LinkCard = ({ link }) => {
    console.log(link)
    const history = useHistory()
    const { token } = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const showNotif = useNotification()

    const onDelete = async (linkId) => {
        try {
            await request(`${mainURL}/api/link/${linkId}`, "DELETE", null, {
                Authorization: "Bearer " + token,
            })
            console.log("BASE URL: ", mainURL)
            showNotif("Link deleted")
            history.push("/links")
        } catch (error) {
            showNotif(error.message)
        }
    }
    if (loading) return <Loader />

    return (
        <div>
            <h3>
                Link:{" "}
                <strong style={{ color: link.color }}> {link.name}</strong>
            </h3>
            <p>
                Short Link:{" "}
                <a href={link.to} target='_blank' rel='noopener noreferrer'>
                    {link.to}
                </a>
            </p>
            <p>
                From:{" "}
                <a href={link.from} target='_blank' rel='noopener noreferrer'>
                    {link.from}
                </a>
            </p>
            <p>
                Clicks: <strong>{link.clicks}</strong>
            </p>
            <p>
                Date of creation:
                <i>
                    {" "}
                    {new Date(link.date).toLocaleDateString() +
                        ", at " +
                        new Date(link.date).toLocaleTimeString()}
                </i>
            </p>
            <button className='btn red' onClick={() => onDelete(link._id)}>
                Delete link
            </button>
        </div>
    )
}

export default LinkCard
