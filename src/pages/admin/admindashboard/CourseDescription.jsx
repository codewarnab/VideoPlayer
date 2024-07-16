import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CourseDescription = () => {
    const { descriptionId } = useParams();
    useEffect(() => {
        const fetchAllDescriptions = async () => {
            try {
                const response = await axios.get(`/description/getDescriptions?descriptionId=${descriptionId}`);
                console.log(response.data);
            } catch (error) {
            }
        };

        fetchAllDescriptions();
    }, [descriptionId]);
  return (
    <div></div>
  )
}

export default CourseDescription