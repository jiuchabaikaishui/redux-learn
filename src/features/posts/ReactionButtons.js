import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    tada: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export default function ReactionButtons({post}) {
    const dispatch = useDispatch()
    return <div>
        {Object.entries(reactionEmoji).map(([stringName, emoji]) => {
            return <button key={stringName} onClick={() => dispatch(reactionAdded({postId: post.id, reaction: stringName}))}>
                {`${emoji}${post.reactions[stringName]}`}
            </button>
        })}
    </div>
}