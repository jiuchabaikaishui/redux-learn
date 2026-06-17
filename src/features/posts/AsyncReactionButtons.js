// import { useDispatch } from "react-redux";
// import { reactionAdded } from "./asyncPostsSlice";

import { useAddReactionMutation } from "../api/apiSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    tada: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

export default function AsyncReactionButtons({post}) {
    // const dispatch = useDispatch()
    const [addReaction] = useAddReactionMutation()
    console.log('AsyncReactionButtons post: ', post);
    
    return <div>
        {Object.entries(reactionEmoji).map(([stringName, emoji]) => {
            return <button key={stringName} onClick={() => addReaction({postId: post.id, reaction: stringName})}>
                {`${emoji}${post.reactions[stringName]}`}
            </button>
        })}
    </div>
}