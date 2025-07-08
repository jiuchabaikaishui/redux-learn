import { useSelector, useDispatch } from "react-redux";
import { selectNotificationIds, selectNotificationById, allNotificationsRead } from "./notificationsClice";
import AsyncPostAuthor from "../posts/AsyncPostAuthor";
import TimeAgo from "../../components/TimeAgo";
import { useLayoutEffect } from "react";

function NotificationExcerpt({notificationId}) {
    const notification = useSelector(state => selectNotificationById(state, notificationId))
    const notificationClassname = notification.isNew ? 'notification new' : 'notification'
    return <div className={notificationClassname}>
        <div>
            <b><AsyncPostAuthor userId={notification.user} showPrefix={false}></AsyncPostAuthor></b>{' '}
            <span>{notification.message}</span>
        </div>
        <TimeAgo timestamp={notification.date}></TimeAgo>
    </div>
}

export default function NotificationsList() {
    const notificationIds = useSelector(selectNotificationIds)
    
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        if (notificationIds.length > 0) {
            dispatch(allNotificationsRead())
        }
    }, [dispatch, notificationIds.length])
    
    return <section>
        <h2>Notifications</h2>
        {notificationIds.map((notificationId) => {
            return <NotificationExcerpt key={notificationId} notificationId={notificationId}></NotificationExcerpt>
        })}
    </section>
}