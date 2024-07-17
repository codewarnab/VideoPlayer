import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
 
const CourseDescription = () => {
    const { descriptionId } = useParams();
    const [description, setDescription] = useState({});
    useEffect(() => {
        const fetchDescriptions = async () => {
            try {
              if (!descriptionId) {
                console.error("descriptionId is required");
                return;
              }
                const response = await axios.get(`/description/getDescriptions?descriptionId=${descriptionId}`);
                console.log(response.data);
                setDescription(response.data);
            } catch (error) {
            }
        };

        fetchDescriptions();
    }, [descriptionId]);
  return (
    <div>
      <Link to={`${description.ytPlayListId}`}>
      <button className='p-5 bg-black text-white w-20' >Play</button>
      </Link>
    </div>
  )
}
 
export default CourseDescription