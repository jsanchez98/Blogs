import React from 'react'

const User = ({linkedUser}) => {
    if(!linkedUser){
        return(
            <>
                ...Loading
            </>
        )
    }
    return(
        <>
            <h1>{linkedUser.name}</h1>
            <h2>added blogs</h2>
            <ul>
                {linkedUser.blogs.map(blog =>
                    <li>
                        {blog.title}
                    </li>
                )}
            </ul>
        </>
    )
}

export default User