import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className='flex justify-center mx-auto'>
             <Helmet>
              <title>RinTrack | Not Found</title>
            </Helmet>
            <Helmet><title>RinTrack - Not Found</title></Helmet>
            <img src='/loan-error.png' alt='Not Found' className='w-80' />
        </div>
    );
};

export default NotFound;