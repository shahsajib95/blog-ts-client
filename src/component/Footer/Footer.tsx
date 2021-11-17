import moment from 'moment';
import React from 'react';

const Footer = () => {
    return (
        <div className="bg-color text-center py-2 ">
            © <a href="https://shahsajib.me/" target="_blank"><strong>ShahSajib</strong></a> {moment(new Date()).format('YYYY')}
        </div>
    );
};

export default Footer;