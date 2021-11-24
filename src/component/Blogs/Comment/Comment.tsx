import React, { useContext } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { IBlog } from '../../../utils/Typescript';
import CommentList from './CommentList';
import FormComment from './FormComment';

type IProps = {
    blog_id: string,
    blog_user_id: string
}

const Comment: React.FC<IProps> = ({blog_id, blog_user_id} : IProps) => {
    const {state} = useContext(DataContext);
    return (
        <div className="comment my-5">
            {state.user._id && <FormComment blog_id={blog_id} blog_user_id={blog_user_id} type="Submit"/>}
            <CommentList blog_id={blog_id} blog_user_id={blog_user_id}/>
        </div>
    );
};

export default Comment;