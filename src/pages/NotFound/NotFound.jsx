import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className='flex justify-center mx-auto'>
            <Helmet><title>RinTrack - Not Found</title></Helmet>
            <img src='/course-error.png' alt='Not Found' className='w-72 my-4' />
        </div>
    );
};

export default NotFound;