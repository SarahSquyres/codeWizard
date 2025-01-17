import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER } from '../../utils/mutations';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import '../../components/Profile/Profile.css'
import Auth from '../../utils/auth';

const Profile = () => {

  const score = localStorage.getItem("scores");
  
  const { username } = useParams();

  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.me || data?.user || {};
  console.log(user)

  const [deleteUser] = useMutation(DELETE_USER);

  async function deleteMe(test) {
    
    try {
      // Does this give the username of who's logged in
      //delete user has a button but need to test functionality 
      const { data } = await deleteUser({
        
        variables: { test }
      }); 
      
      Auth.logout(); 
    } catch (err) {
      console.log(err)
    }
  }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <Navigate to="/" />;

  }


  return (
    <div>
      <div className='flex-row justify-center mb-3'>
        <h2 className="Banner mb-5">
          Great work {user.username ? `${user.username}` : ''}!
        </h2>

        <div className='row'>

            {/* PROFILE CARD / EXAMPLE SHELL */}
            <div className='profileCard col-sm-3' >
              <img className="profileIcon" src={require('../../assets/wizardUser.png')} alt="Card image cap" />
              <ul className='list-group list-group-flush'>
                <li className="list-group-item"><h5 className='ScoreType'> Your score is: {score} </h5> </li>
              </ul>
              <ul className='list-group list-group-flush'>
                <Link className="btn btn-primary" as={Link} to='/'> <h6>Retake Quiz </h6> </Link>
              </ul>
              
              </div>


        </div>

        <div className='deleteContainer'>
            
        <Link className='btn btn-secondary' onClick={(e)=>deleteMe(user._id)}><h6 className='type'>Delete Profile</h6></Link>

        </div>
    

      </div>

    </div>
  );
};

export default Profile;