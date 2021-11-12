import React, { useContext } from 'react';
import {IUserDetails} from '../../../utils/Typescript'
import UserBlogs from '../UserDetails/UserBlogs';
type IProps ={
    user: IUserDetails
}

const OtherUserDetails: React.FC<IProps> = ({user} : IProps) => {
    const {name,  avatar, blogCount, _id} = user
    return (
        <div className="row">
            <div className="col-md-3 g-2">
                <div className="card p-4 d-flex justify-content-center align-items-center">
                    <img src={avatar} alt="avatar" className="w-25"/>
                    <h3 className="mt-3">{name}</h3>
                    <h4>Total Blogs: {blogCount}</h4>
                </div>
            </div>
            <div className="col-md-9 g-2">
                <UserBlogs id={_id}/>
            </div>
        </div>
    );
};

export default OtherUserDetails;