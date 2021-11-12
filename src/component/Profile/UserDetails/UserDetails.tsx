import React from 'react';
import {IUserDetails} from '../../../utils/Typescript'
import { BiEdit } from "react-icons/bi";
import UserBlogs from './UserBlogs';

type IProps ={
    user: IUserDetails
}

const UserDetails: React.FC<IProps> = ({user} : IProps) => {
    const {_id, name, email, avatar, blogCount} = user
    return (
        <div className="row">
            <div className="col-md-3 g-2">
                <div className="card p-4 d-flex justify-content-center align-items-center">
                    {/* <BiEdit className="d-flex align-self-end"/> */}
                    <img src={avatar} alt="ävatar" className="w-25"/>
                    <h3 className="mt-3">{name}</h3>
                    <p>{email}</p>
                    <h4>Total Blogs: {blogCount}</h4>
                </div>
            </div>
            <div className="col-md-9 g-2">
                <UserBlogs id={_id}/>
            </div>
        </div>
    );
};

export default UserDetails;