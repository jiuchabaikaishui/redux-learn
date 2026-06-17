import { useSelector, useDispatch } from "react-redux";
import AsyncPostAuthor from "../posts/AsyncPostAuthor";
import TimeAgo from "../../components/TimeAgo";
import { useLayoutEffect } from "react";

import { allNotificationsRead, useGetNotificationsQuery, selectMetadataEntities } from "./notificationsSlice";

// function NotificationExcerpt({notificationId}) {
//     const notification = useSelector(state => selectNotificationById(state, notificationId))
//     const notificationClassname = notification.isNew ? 'notification new' : 'notification'
//     return <div className={notificationClassname}>
//         <div>
//             <b><AsyncPostAuthor userId={notification.user} showPrefix={false}></AsyncPostAuthor></b>{' '}
//             <span>{notification.message}</span>
//         </div>
//         <TimeAgo timestamp={notification.date}></TimeAgo>
//     </div>
// }

export default function NotificationsList() {
    const dispatch = useDispatch()
    const { data: notifications = [] } = useGetNotificationsQuery()
    console.log('useGetNotificationsQuery data: ', notifications);
    const notificationsMetadata = useSelector(selectMetadataEntities)

    useLayoutEffect(() => {
            dispatch(allNotificationsRead())
    })
    
    return <section>
        <h2>Notifications</h2>
        {notifications.map((notification) => {
            const metadata = notificationsMetadata[notification.id]
            console.log('notification: ', notification)
            console.log('metadata: ', metadata);
            const notificationClassname = metadata.isNew ? 'notification new' : 'notification'
            
            return <div className={ notificationClassname } key={ notification.id }>
                <div>
                    <b><AsyncPostAuthor userId={notification.user} showPrefix={false}></AsyncPostAuthor></b>{' '}
                    <span>{notification.message}</span>
                </div>
                <TimeAgo timestamp={notification.date}></TimeAgo>
            </div>
        })}
    </section>
    
    // return <section>
    //     <h2>Notifications</h2>
    //     {notificationIds.map((notificationId) => {
    //         return <NotificationExcerpt key={notificationId} notificationId={notificationId}></NotificationExcerpt>
    //     })}
    // </section>
}